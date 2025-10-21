#!/usr/bin/env bash
set -euo pipefail

# This script runs the update_code_editors_recipe.yaml Goose recipe for
# each editor/tool listed below. It was generated to replace the old
# manual list of commented goose run commands.
#
# Single mapping list: each entry is "Topic|filename". This preserves
# order and keeps topics and filenames together in one place. The
# script runs the recipe with topic set to the display name, then
# optionally inserts the same text before the same heading in the
# mapped file (if configured).



# ------------------------------------------------------------------
# TOPIC -> FILE mapping (single list)
# Format: "Display Topic|filename.md"
# Keep entries in the order you want the recipe to run.
# ------------------------------------------------------------------
missing_editor_mapping=(  "Aider Desk|aider-desk.md"
)
mappingTestRan2=(
  "Aix Coder|aix-coder.md"
  "Amazon Q Developer IDE plugin|amazon_q_developer.md"
  "app.build|appdotbuild.md"
  "Ask Codi|ask-codi.md"
  "Augment Code|augment-code.md"
  "Brokk|brokk-ai-coder.md"
  "Cline|cline.md"

  "Continue|continue.md"
  "Devoxx Genie|devoxx-genie.md"
  "Firebase Studio|firebase_studio.md"
  "From021|from021.md"
  "GitHub Copilot Workspace|github_copilot_workspace.md"
  "GitHub Copilot|github_copilot.md"
  )
mapping=(

  "GPT-Pilot|gpt-pilot.md"
  "humanlayer (CodeLayer)|codelayer.md"
  "JetBrains AI Assistant|jetbrains_ai_assistant.md"
  "Jolt|jolt.md"
  "Marblism|marblism.md"
  "MarsX|marsx.md"
  "Mistral Code|mistral-code.md"
  "Nuanced|nuanced.md"
  "Ona (Formerly Gitpod)|ona_gitpod.md"
  "OpenCode|opencode.md"
  "Pear AI|pearai.md"
  "Pythagora|pythagora.md"
  "Refact|refact.md"
  "Refraction|refraction.md"
  "Replit|replit-ghostwriter.md"
  "Roo-Code|roo-code.md"
  "Runner H|runnerh.md"
  "Source AI|sourceai_dev.md"
  "Sourcegraph|sourcegraph.md"
  "Supermaven|supermaven.md"
  "Tabby|tabby.md"
  "Tabnine|tabnine.md"
  "Theia|theia.md"
  "Tooljet|tooljet.md"
  "Trae|trae.md"
  "Void Editor|void-editor.md"

  "Wrapifai|wrapifai.md"
  
)
mappingTestRan1=(
  "Windsurf|windsurf.md"
  "Zed|zed.md"
)

RECIPE="update_code_editors_recipe.yaml"

# ------------------------------------------------------------------
# INSERTION CONFIGURATION (SIMPLE)
# Use these globals if you want the same heading and text inserted
# into every mapped file after running the recipe for the topic.
# Leave INSERT_TEXT empty to disable insertion.
#
# Use $'...\n' quoting for multi-line text, e.g.
# INSERT_BEFORE=$'## Notes'
# INSERT_TEXT=$'> **Auto-update**: entries refreshed by recipe.\n'
# ------------------------------------------------------------------
#INSERT_BEFORE=$'## Rating'
#INSERT_TEXT=$'## Classification \n- Code/Editor\n'
INSERT_BEFORE=''
INSERT_TEXT=''

# ---- User editable: set INSERT_BEFORE and INSERT_TEXT above ----

# Helper: safely insert text before a heading (exact match) in a file
insert_before_heading() {
  local file="$1"
  local heading="$2"
  local text="$3"

  if [[ ! -f "$file" ]]; then
    echo "[insert] file not found: $file"
    return 1
  fi

  # Ensure text ends with a newline
  if [[ -n "$text" && "${text: -1}" != $'\n' ]]; then
    text+=$'\n'
  fi

  local tmp
  tmp=$(mktemp)

  awk -v H="$heading" -v T="$text" 'BEGIN{inserted=0}
  {
    if(!inserted && $0==H){print T; inserted=1}
    print
  }
  END{
    if(!inserted){exit 2}
  }' "$file" > "$tmp" || {
    local rc=$?
    if [[ $rc -eq 2 ]]; then
      echo "[insert] heading not found in $file: '$heading'"
      rm -f "$tmp"
      return 2
    else
      echo "[insert] awk failed for $file"
      rm -f "$tmp"
      return $rc
    fi
  }

  mv "$tmp" "$file"
  echo "[insert] inserted into $file before heading: $heading"
  return 0
}

# Iterate mapping: split into topic and filename
for entry in "${mapping[@]}"; do
  topic="${entry%%|*}"
  filename="${entry#*|}"

  echo "=========================================="
  echo "Running for: $topic | $filename"
  echo "========================================="

  goose run --recipe "$RECIPE" --params "topic=$topic" --params "filename=$filename" --no-session

  if [[ -n "$INSERT_TEXT" && -n "$INSERT_BEFORE" ]]; then
    echo "Applying global insertion to $filename"
    insert_before_heading "$filename" "$INSERT_BEFORE" "$INSERT_TEXT" || true
  else
    echo "No global insertion configured (set INSERT_TEXT and INSERT_BEFORE to enable)"
  fi

  echo
done

echo "All done."
