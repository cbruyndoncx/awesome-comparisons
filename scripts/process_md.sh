#!/usr/bin/env bash
set -euo pipefail

# Process markdown files in a directory with optional filters for ToDo/open tasks/patterns
# Usage: ./process_md.sh [options] <dir>
# Options:
#   -r, --recursive       Search directories recursively
#   -t, --has-todo        Only include files that contain "todo" (case-insensitive) or task lists
#   -o, --open-tasks      Only include files that contain unchecked task items (- [ ])
#   -p, --pattern <pat>   Only include files matching grep -Ei <pat>
#   -n, --dry-run         Print files that would be processed, don't run goose
#   -h, --help            Show this help
dir=""


shopt -s nullglob

glob_recursive=false
filter_has_todo=false
filter_open_tasks=false
pattern=""
dry_run=false

print_usage(){
  cat <<EOF
Usage: $0 [options] <dir>

Options:
  -r, --recursive       Search directories recursively (uses bash globstar; requires Bash 4+)
  -t, --has-todo        Only include files that contain the word "todo" (case-insensitive) or any markdown task list entries
  -o, --open-tasks      Only include files that contain unchecked markdown task items ("- [ ]")
  -p, --pattern <pat>   Only include files matching grep -Ei <pat> (extended regex, case-insensitive)
  -n, --dry-run         Print files that would be processed, don't run goose
  -h, --help            Show this help / usage information

Explanation / notes:
  - The --has-todo check looks for:
      * the literal word "todo" (case-insensitive), OR
      * any markdown task list line such as "- [ ] Task" or "- [x] Done"
    Use this when you want files that mention TODOs or contain task lists.
  - The --open-tasks check specifically looks for unchecked tasks (lines matching "- [ ]").
    Use this to target files that have outstanding work.
  - The --pattern PATTERN option passes PATTERN to "grep -Ei". Quote the pattern if it
    contains shell metacharacters. Example: -p 'TODO|FIXME'
  - Recursive search uses "shopt -s globstar" and the pattern "$dir"/**/*.md.
    If your environment uses an older Bash without globstar, use the recursive option together
    with find instead, or run without -r to process only a single directory level.
  - The script uses "goose" from PATH. If "goose" is not found, the script will fail; add it to PATH
    or modify the script to point to the goose binary.
  - Exit codes:
      0 - success or no files matched (dry-run or filters)
      2 - usage / invalid arguments

Examples:
  $0 ../datasets/other/data/                    # process all .md files in directory
  $0 -t ../datasets/other/data/                 # process only files with TODO or task lists
  $0 -o -r ../datasets/other/data/              # recursive, only files with open checkboxes
  $0 -p 'TODO|FIXME' ../datasets/other/data/    # pattern matching (quote the pattern)
  $0 -n -t ../datasets/other/data/              # dry run, preview matching files

Further enhancements you can add:
  - A --min-open N option to require at least N unchecked tasks in a file
  - An output summary showing filename + count of open tasks
  - Use "find" instead of globstar for portability
EOF
}

# parse args (simple loop to support long options)
while [[ $# -gt 0 ]]; do
  case "$1" in
    -r|--recursive)
      glob_recursive=true; shift;;
    -t|--has-todo)
      filter_has_todo=true; shift;;
    -o|--open-tasks)
      filter_open_tasks=true; shift;;
    -p|--pattern)
      if [[ -z "${2-}" ]]; then echo "Error: --pattern requires an argument"; exit 2; fi
      pattern="$2"; shift 2;;
    -n|--dry-run)
      dry_run=true; shift;;
    -h|--help)
      print_usage; exit 0;;
    --)
      shift; break;;
    -*)
      echo "Unknown option: $1"; print_usage; exit 2;;
    *)
      dir="$1"; shift; break;;
  esac
done

if [[ -z "${dir-}" ]]; then
  echo "Error: directory argument required\n"
  print_usage
  exit 2
fi

# enable recursive glob if requested
if [[ "$glob_recursive" == true ]]; then
  shopt -s globstar
  files=("$dir"/**/*.md)
else
  files=("$dir"/*.md)
fi

selected=()
for f in "${files[@]}"; do
  # skip if not a regular file (handles globs that don't match)
  [[ -f "$f" ]] || continue

  include=true

  if [[ "$filter_has_todo" == true ]]; then
    # match case-insensitive 'todo' word or unchecked task '- [ ]'
    if ! grep -Eqi 'todo' "$f" && ! grep -qE '^\s*-\s*\[\s*\]' "$f"; then
      include=false
    fi
  fi

  if [[ "$filter_open_tasks" == true ]]; then
    if ! grep -qE '^\s*-\s*\[\s*\]' "$f"; then
      include=false
    fi
  fi

  if [[ -n "$pattern" ]]; then
    if ! grep -Eqi -- "$pattern" "$f"; then
      include=false
    fi
  fi

  if [[ "$include" == true ]]; then
    selected+=("$f")
  fi
done

if (( ${#selected[@]} == 0 )); then
  echo "No .md files found in $dir matching the specified filters"
  exit 0
fi

if [[ "$dry_run" == true ]]; then
  echo "Dry run — files that would be processed:" 
  for f in "${selected[@]}"; do
    echo "  $f"
  done
  exit 0
fi

for filename in "${selected[@]}"; do
  echo "Processing: $filename"
  # Use proper quoting to prevent command injection
  goose run --recipe update_recipe.yaml --params "filename=${filename}" --no-session
done
