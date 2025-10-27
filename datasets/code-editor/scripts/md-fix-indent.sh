#!/usr/bin/env bash
set -euo pipefail

# md-fix-indent.sh
# Fix Markdown files so that indented comment lines following an unordered
# list item become proper nested unordered list items.
#
# Behavior:
# - For any line that begins with indentation followed by text (not starting with
#   '-', '*', or '+'), if the preceding non-blank line is a Markdown unordered
#   list item (starts with '-', '*', or '+'), the script will prefix the line
#   with the same indentation plus "- ".
# - Excludes template.md and zed.md by default.
#
# Usage:
#  ./md-fix-indent.sh           # dry-run, prints unified diffs for files that would change
#  ./md-fix-indent.sh --apply   # overwrite files in-place
#  ./md-fix-indent.sh --help    # show this message

APPLY=false
FILES=()
BASEDIR=$(dirname "$0")

while [[ $# -gt 0 ]]; do
  case "$1" in
    --apply) APPLY=true; shift ;;
    --help|-h) sed -n '1,240p' "$0"; exit 0 ;;
    --) shift; break;;
    *) FILES+=("$1"); shift;;
  esac
done

# default: all .md files in this directory, excluding template.md and zed.md
if [ ${#FILES[@]} -eq 0 ]; then
  # use rg to get files (faster), fallback to find if rg not available
  if command -v rg >/dev/null 2>&1; then
    mapfile -t FILES < <(rg --files -g "*.md" "$BASEDIR" | sed "s#^$BASEDIR/##" | rg -v "(^template\.md$|^zed\.md$)" || true)
  else
    mapfile -t FILES < <(find "$BASEDIR" -maxdepth 1 -type f -name "*.md" -printf "%f\n" | rg -v "(^template\.md$|^zed\.md$)" || true)
  fi
fi

if [ ${#FILES[@]} -eq 0 ]; then
  echo "No markdown files found."
  exit 0
fi

# create a temp awk file
awk_tmp=$(mktemp)
cat > "$awk_tmp" <<'AWK'
#!/usr/bin/awk -f
# For each file, keep track of previous non-blank line. If current line is
# indented text that does not start with a list marker, and previous non-blank
# line is a list marker, convert current line into a nested list item.
# Do NOT apply this transformation while inside the "## Notes" section.
BEGIN{ OFS="" }
{
  lines[NR] = $0
}
END{
  prev_nonblank = ""
  prev_nonblank_is_list = 0
  in_notes = 0
  for(i=1;i<=NR;i++){
    line = lines[i]
    if(line ~ /^[ \t]*$/){
      # blank line
      print line
      continue
    }

    # Toggle in_notes state when encountering a level-2 heading
    if(line ~ /^##[ \t]+Notes\b/){ in_notes = 1; print line; prev_nonblank = line; continue }
    if(in_notes == 1 && line ~ /^##[ \t]+/) { in_notes = 0 }

    # detect if previous non-blank was a list item
    if(prev_nonblank ~ /^[ \t]*([-*+])[ \t]+.*/){ prev_nonblank_is_list = 1 } else { prev_nonblank_is_list = 0 }

    # if we're in the Notes section, print verbatim
    if(in_notes == 1){
      print line
      prev_nonblank = line
      continue
    }

    # if current line begins with indentation followed by non-list content
    if(line ~ /^[ \t]+[^ \t\-\*\+].*/ && prev_nonblank_is_list){
      match(line,/^[ \t]*/); lead = substr(line, RSTART, RLENGTH)
      content = substr(line, RLENGTH+1)
      # Add a list marker with a single space after the indentation
      print lead "- " content
    } else {
      print line
    }
    # update prev_nonblank
    if(line !~ /^[ \t]*$/){ prev_nonblank = line }
  }
}
AWK
chmod +x "$awk_tmp"
trap 'rm -f "$awk_tmp"' EXIT

changed=()

for f in "${FILES[@]}"; do
  filepath="$BASEDIR/$f"
  new_content=$(awk -f "$awk_tmp" "$filepath")
  orig_content=$(cat "$filepath")
  if [ "$new_content" != "$orig_content" ]; then
    changed+=("$f")
    if [ "$APPLY" = true ]; then
      printf "%s" "$new_content" > "$filepath"
      echo "Updated: $f"
    else
      diff -u --label a/$f --label b/$f <(printf "%s" "$orig_content") <(printf "%s" "$new_content") || true
    fi
  fi
done

if [ ${#changed[@]} -eq 0 ]; then
  echo "No files to change."
else
  if [ "$APPLY" = false ]; then
    echo
    echo "Dry-run: ${#changed[@]} files would be changed. Re-run with --apply to overwrite files."
  else
    echo
    echo "Applied changes to ${#changed[@]} files."
  fi
fi
