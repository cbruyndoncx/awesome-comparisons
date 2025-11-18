# Demo 3: Create New Comparison from Scratch - Video Script
## Project Management Tools Dataset

**Video Duration:** 10-12 minutes
**Format:** Screencast with voiceover
**Recording Tool:** OBS, Loom, or Camtasia

---

## Pre-Recording Setup

### Technical Setup
- [ ] Screen resolution: 1920x1080 (Full HD)
- [ ] Split screen setup:
  - IDE/Text editor (VS Code recommended) - 60% of screen
  - Terminal - 40% of screen
- [ ] Or: Record full IDE with integrated terminal
- [ ] Browser ready in background for final verification
- [ ] Repository at clean state
- [ ] Data for 3 PM tools researched and ready
- [ ] Notifications disabled

### Files to Have Ready
- [ ] Trello logo/data
- [ ] Asana logo/data
- [ ] Monday.com logo/data

---

## Video Structure

### Introduction (0:00 - 0:30)
**On Screen:** Title card + quick preview of end result
**Voiceover:**
> "In this demo, I'll show you how to create a complete new comparison dataset from scratch. We're going to build a Project Management Tools comparison with criteria for pricing, features, and integrations - and we'll have it live and working in just 10 minutes. Let's jump in!"

**Action:** Fade to IDE showing terminal

---

### Scene 1: Create Folder Structure (0:30 - 1:20)
**On Screen:** Terminal at repository root
**Voiceover:**
> "First, let's create the standard folder structure. Every dataset follows the same pattern, making it easy to stay organized."

**Action & Commands:**
```bash
cd datasets
mkdir project-management
mkdir project-management/config
mkdir project-management/data
touch project-management/dataset.yaml
touch project-management/description.md
touch project-management/config/comparison.yml
```

**Timing:**
- Type each command
- Brief pause to show output
- Show tree structure at end

**Voiceover (continued):**
> "Perfect! We now have our basic structure: a config folder for configuration, a data folder for entries, and our metadata files."

**Action:**
- Run `tree project-management` or `ls -R project-management`
- Show the structure clearly

**Camera/Cursor Notes:**
- Steady terminal view
- Commands typed at readable speed
- Highlight folder structure

---

### Scene 2: Configure Dataset Metadata (1:20 - 2:30)
**On Screen:** Open dataset.yaml in editor
**Voiceover:**
> "Now let's configure the dataset metadata. This tells the system basic information about our comparison."

**Action:**
1. Open `datasets/project-management/dataset.yaml`
2. Show empty file
3. Type or paste:

```yaml
id: project-management
name: "Project Management"
title: "Project Management Tools Comparison"
description: "Compare features and pricing of popular project management tools"
icon: "assignment"
theme: "blue"
```

**Timing:**
- Type at moderate speed or paste with explanation
- Pause on each field

**Voiceover (while typing):**
> "The ID matches our folder name. The name and title are what users will see. The icon is a Material Design icon name, and theme sets the color scheme."

**Action:**
- Save file (Ctrl+S, show save indicator)
- Optional: Briefly show Material Icons website

**Camera/Cursor Notes:**
- Clear syntax highlighting
- Zoom if text too small

---

### Scene 3: Write Dataset Description (2:30 - 3:20)
**On Screen:** Open description.md
**Voiceover:**
> "Let's add a description that explains what this comparison is about. This is just a markdown file."

**Action:**
1. Open `datasets/project-management/description.md`
2. Type or paste:

```markdown
# Project Management Tools Comparison

Find the perfect project management tool for your team. This comparison
covers the most popular PM tools across pricing, features, team size
support, and integrations.

## Included Tools

- Trello - Visual board-based project management
- Asana - Comprehensive task and project tracking
- Monday.com - Flexible work operating system

## Key Criteria

- **Pricing**: Free tier availability and paid plans
- **Team Features**: Collaboration and communication tools
- **Integrations**: Connect with your existing tools
```

**Timing:**
- Type key parts, paste longer sections
- Scroll to show full content

**Voiceover (continued):**
> "This description helps users understand what they'll find in the comparison."

**Camera/Cursor Notes:**
- Show markdown rendering (preview if available)

---

### Scene 4: Define Criteria (3:20 - 5:30)
**On Screen:** Open comparison.yml
**Voiceover:**
> "Now for the important part - defining what we want to compare. Let's create our criteria."

**Action:**
1. Open `datasets/project-management/config/comparison.yml`
2. Start typing criteria

**Show/Type (abbreviated, explain as you go):**

```yaml
criteria:
  - name: "Tool Name"
    searchable: true
    showInTable: true
    showInDetails: true
    type: "text"
```

**Voiceover:**
> "Each criterion has a name, and properties controlling its behavior. Let me add a few more..."

**Action:**
- Add 3-4 criteria with explanation
- Use speed-up effect for repetitive parts
- Show final list of ~10 criteria

**Key Criteria to Show:**
- Tool Name
- Rating
- Free Tier
- Starting Price
- Max Team Size
- Mobile Apps

**Timing:**
- Show creation of 2-3 in detail (20 sec each)
- Speed up for the rest (2x speed with "Adding more..." overlay)
- Show final complete list (10 sec)

**Camera/Cursor Notes:**
- Clear YAML indentation
- Highlight structure as you type

---

### Scene 5: Organize Into Groups (5:30 - 6:30)
**On Screen:** Continue in comparison.yml
**Voiceover:**
> "Let's organize these criteria into logical groups. I'll create three groups: General Info, Pricing, and Features."

**Action:**
Add groups section:

```yaml
groups:
  - name: "General Info"
    criteria:
      - "Tool Name"
      - "Best For"
      - "Rating"

  - name: "Pricing"
    criteria:
      - "Free Tier"
      - "Starting Price"

  - name: "Features"
    criteria:
      - "Max Team Size"
      - "Mobile Apps"
      - "Integrations"
```

**Timing:**
- Type first group in detail (15 sec)
- Speed up for other groups
- Show complete structure (10 sec)

**Voiceover (continued):**
> "Groups make it easy for users to find related information. Three to five groups is usually the sweet spot."

**Camera/Cursor Notes:**
- Show how criteria map to groups
- Clean YAML structure

---

### Scene 6: Add First Tool - Trello (6:30 - 7:30)
**On Screen:** Create trello.md file
**Voiceover:**
> "Now let's add our first tool - Trello. Each tool is just a simple markdown file."

**Action:**
1. Create `datasets/project-management/data/trello.md`
2. Start typing:

```markdown
# Trello - https://trello.com
Trello is a visual project management tool based on boards, lists, and
cards. Great for small teams and simple project tracking.

## General Info
### Tool Name
- Trello

### Rating
- 4.5

## Pricing
### Free Tier
- Yes - unlimited cards and up to 10 boards
```

**Timing:**
- Type header and description (15 sec)
- Show adding 3-4 criteria sections in detail (30 sec)
- Use speed-up or "..." for remaining sections (15 sec)

**Voiceover (key points):**
> "The header format is: Tool Name, dash, URL. Then a description, followed by sections matching our criteria exactly. Each criterion uses triple hash and a dash for the value."

**Camera/Cursor Notes:**
- Clear markdown syntax
- Show section structure

---

### Scene 7: Add Remaining Tools (7:30 - 8:30)
**On Screen:** Create asana.md and monday.md
**Voiceover:**
> "Once you have one entry as a template, the others are quick to add. Let me add Asana and Monday.com."

**Action:**
1. Create asana.md
2. Show header and a couple sections
3. Use time-lapse or speed-up effect (3x speed)
4. Create monday.md
5. Same approach - show structure, speed up details

**On-Screen Text During Speed-Up:**
- "Adding Asana..."
- "Adding Monday.com..."
- "Following the same pattern..."

**Timing:**
- 20 seconds per tool (mostly sped up)
- Show final file list in explorer

**Camera/Cursor Notes:**
- Fast but still followable
- Show file creation clearly

---

### Scene 8: Register in Manifest (8:30 - 9:15)
**On Screen:** Open datasets.manifest.json
**Voiceover:**
> "Almost done! We need to register our dataset in the manifest so the system knows about it."

**Action:**
1. Open `configuration/datasets.manifest.json`
2. Find the datasets object
3. Add new entry:

```json
"project-management": {
  "id": "project-management",
  "default": false,
  "shared": {
    "valueDisplays": "value-displays"
  }
}
```

**Timing:**
- Navigate to correct location (10 sec)
- Add entry (15 sec)
- Show proper JSON format (10 sec)

**Voiceover (continued):**
> "We're inheriting the value displays for emojis like checkmarks, but defining our own criteria since this is a unique comparison."

**Action:**
- Save file
- Verify JSON syntax (no errors)

**Camera/Cursor Notes:**
- Show JSON structure clearly
- Highlight comma placement

---

### Scene 9: Build and Test (9:15 - 10:30)
**On Screen:** Terminal and browser
**Voiceover:**
> "Time to see it in action! Let's process the data and start the dev server."

**Action:**
1. Terminal: `npm run prepare-data`
2. Show build output scrolling
3. Terminal: `npm start` (if not running)
4. Switch to browser
5. Navigate to http://localhost:4200
6. Click dataset selector
7. Find and select "Project Management"

**Timing:**
- Build: 15 seconds (speed up if too long)
- Server start: 10 seconds (or skip if already running)
- Browser navigation: 15 seconds
- Dataset switch: 10 seconds

**Voiceover (continued):**
> "And there it is! Our brand new Project Management comparison with all three tools, organized into our groups, ready to search and filter."

**Action:**
- Scroll through the comparison table
- Expand/collapse groups
- Click on a tool to show detail view
- Show that all criteria are working

**Camera/Cursor Notes:**
- Smooth scrolling
- Clear demonstration of features

---

### Scene 10: Quick Feature Demo (10:30 - 11:00)
**On Screen:** Comparison view with new dataset
**Voiceover:**
> "Let me quickly verify everything works. I can search..."

**Action:**
1. Search for "Trello"
2. Filter by "Free Tier = Yes"
3. View details of a tool
4. Show export button (don't need to export)

**Timing:**
- 10 seconds per feature
- Fast demonstration

**Voiceover (continued):**
> "...filter by criteria, view details, and export. Everything is fully functional!"

**Camera/Cursor Notes:**
- Quick but clear actions

---

### Conclusion (11:00 - 11:30)
**On Screen:** Split view: code + running app
**Voiceover:**
> "And that's it! In about 10 minutes, we created a complete comparison from scratch: defined the structure, created criteria, added three tools, registered it, and now it's live. You can add more tools anytime by creating more markdown files. The framework handles the rest."

**Action:**
- Show final file structure in explorer
- Show running app
- Fade to end card

**Camera/Cursor Notes:**
- Professional summary shots

---

### End Card (11:30 - 11:45)
**On Screen:** End card with info
**Display:**
```
✅ New Dataset Created!

Learn More:
📖 Tutorial Track C: Creating Datasets
🎬 All Demos: docs/demos/
🔗 Repository: [URL]

Create Your Own Comparison!
```

**Voiceover:**
> "Thanks for watching! Try creating your own comparison following this same pattern. Check out Tutorial Track C for more details. Happy comparing!"

---

## Recording Tips

### Before Recording
1. **Complete run-through:** Practice the entire flow 2-3 times
2. **Data ready:** Have all tool data prepared
3. **Clean state:** Start with a fresh repository state
4. **Terminal ready:** Commands in clipboard if needed
5. **Editor configured:** Syntax highlighting, readable font

### During Recording
1. **Pacing:** Type at moderate, readable speed
2. **Explain:** Narrate what you're doing and why
3. **Pauses:** After major actions, pause 1-2 seconds
4. **Errors:** If you make a typo, fix naturally and continue
5. **Context:** Remind viewers where you are in the process

### After Recording
1. **Speed up:** Use 1.5-2x speed for repetitive sections
2. **Overlays:** Add text overlays during time-lapses
3. **Transitions:** Smooth cuts between terminal and editor
4. **Captions:** Add subtitles for accessibility
5. **Chapters:** Add YouTube chapters for each scene

---

## Screen Layout Options

### Option 1: Split Screen
```
┌─────────────────────┬──────────────┐
│                     │              │
│   Editor            │   Terminal   │
│   (60%)             │   (40%)      │
│                     │              │
└─────────────────────┴──────────────┘
```

### Option 2: Full Editor with Integrated Terminal
```
┌──────────────────────────────────────┐
│                                      │
│   Editor (Full Screen)               │
│                                      │
├──────────────────────────────────────┤
│   Integrated Terminal (Bottom 30%)   │
└──────────────────────────────────────┘
```

### Option 3: Toggle Focus
- Show full editor when coding
- Show full terminal when running commands
- Use transitions when switching

**Recommended:** Option 2 (VS Code with integrated terminal)

---

## Alternative Voiceover (Casual Style)

### Introduction
> "Yo! Want to build a comparison from scratch? Let's create a Project Management tools comparison in like 10 minutes. From zero to fully functional. Let's go!"

### Folder Structure
> "First things first - folders. Every dataset needs the same setup... *[typing]* config, data, and some metadata files. Boom, structure done!"

### Configuration
> "Now the fun part - telling the system what we're comparing. I'll add some criteria like pricing, features, team size, that kind of stuff... *[typing]* ...there we go, got like 10 criteria defined."

### Adding Data
> "Time to add some actual tools. I'll start with Trello... *[typing]* ...just a markdown file with headers and dashes. Super simple. Let me add Asana and Monday.com too... *[time-lapse]* ...done!"

### Testing
> "Moment of truth - let's build and run this thing... *[waiting]* ...okay, loading up the browser... *[clicking]* ...and there it is! Our brand new comparison, fully working. That's so cool!"

### Conclusion
> "And that's how you go from nothing to a working comparison in 10 minutes. Pretty awesome, right? Try it yourself - link below!"

---

## B-Roll Suggestions

1. **Opening:** Montage of different comparison sites
2. **Folder creation:** Animated diagram of folder structure
3. **YAML editing:** Close-up of syntax highlighting
4. **Markdown files:** Side-by-side view of raw and rendered
5. **Build process:** Progress bars and activity indicators
6. **Final result:** Smooth tour of the finished comparison
7. **Closing:** Grid showing multiple created datasets

---

## YouTube Description Template

```
🚀 Demo 3: Create a New Comparison from Scratch

In this 10-minute demo, I create a complete Project Management Tools comparison from scratch - no existing code, just the framework.

What you'll see:
✅ Folder structure setup
✅ Dataset configuration (YAML)
✅ Defining 10 criteria
✅ Organizing into groups
✅ Adding 3 tool entries (markdown)
✅ Manifest registration
✅ Build, run, and verify

⏱️ Timestamps:
0:00 - Introduction
0:30 - Create folder structure
1:20 - Configure metadata
2:30 - Write description
3:20 - Define criteria
5:30 - Organize groups
6:30 - Add Trello entry
7:30 - Add Asana and Monday
8:30 - Register in manifest
9:15 - Build and test
10:30 - Feature demo
11:00 - Conclusion

📚 Learn More:
• Tutorial Track C (Administrator): [link]
• Creating Datasets Guide: [link]
• All Demos: [link]

💡 What comparison would YOU create? Comment below!

#AwesomeComparisons #Tutorial #WebDevelopment #ProjectManagement
```

---

## Publishing Checklist

- [ ] Video rendered at 1080p
- [ ] Audio clear and normalized
- [ ] Subtitles/captions added
- [ ] Chapters added for each scene
- [ ] Speed-up sections done smoothly
- [ ] Code/terminal is readable
- [ ] Thumbnail shows file structure + app
- [ ] Title optimized: "Build a Comparison in 10 Minutes"
- [ ] Description with all timestamps
- [ ] Links to repo and tutorials
- [ ] Tags: tutorial, yaml, markdown, web development

---

**Ready to show the full creation process? 🚀**
