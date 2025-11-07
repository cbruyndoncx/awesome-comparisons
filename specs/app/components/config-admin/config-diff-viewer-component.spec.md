# ConfigDiffViewerComponent

Angular component for rendering YAML document diffs with unified and side-by-side view modes, featuring syntax highlighting, metadata display, and accessibility controls.

## Target

[@generate](../../../../src/app/components/config-admin/config-diff-viewer.component.ts)

## Capabilities

### Diff Computation and Rendering

Computes diffs between original and modified YAML strings using diff2html library. Renders either unified or side-by-side representation based on view mode input. Virtualizes line rendering for large diffs to maintain performance during scrolling.

### View Mode Toggle

Supports toggling between unified and split view modes through toolbar controls. Persists view mode preferences by emitting viewModeChange events to parent component.

### Syntax Highlighting

Highlights YAML syntax using highlight.js or diff2html built-in syntax highlighter with YAML grammar support. Maintains consistent highlighting across both original and modified content.

### Toolbar Controls

Provides comprehensive toolbar with:
- View mode toggle (unified/split)
- Copy modified YAML to clipboard
- Download modified YAML as file
- Expand/collapse all diff sections
- Toggle whitespace visibility
- Toggle ignore case options

### Metadata Display

Shows metadata chips displaying:
- Line counts for original and modified content
- Addition and removal totals
- Last saved timestamp from input
- Diff computation statistics

### Options Management

Tracks diff rendering options including whitespace visibility and case sensitivity. Emits optionsChange events when toggles are updated for parent component persistence.

### Error Handling and Fallback

Shows fallback read-only code editor when diff generation fails. Displays error messaging with retry button functionality. Optionally integrates Monaco editor for enhanced fallback experience.

### Responsive Layout

Adapts to narrow widths with stacked view layout. Maintains minimum height to align with shell component layout requirements. Handles responsive toolbar reorganization.

### Accessibility

Ensures keyboard navigation between diff hunks. Provides focus management for toolbar controls. Includes ARIA labels and descriptions for all interactive elements.

### Performance Optimization

Debounces diff recomputation when inputs change. Implements virtual scrolling for large diffs. Provides renderDiff() method for manual diff updates.

## API

```typescript { .api }
@Component({
  selector: 'uc-config-diff-viewer',
  templateUrl: './config-diff-viewer.component.html',
  styleUrls: ['./config-diff-viewer.component.css']
})
export class ConfigDiffViewerComponent implements OnInit, OnChanges {
  // Input properties
  @Input() originalYaml: string = '';
  @Input() modifiedYaml: string = '';
  @Input() viewMode: 'unified' | 'split' = 'unified';
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() isBusy: boolean = false;
  @Input() lastSavedTimestamp?: Date;
  
  // Output events
  @Output() viewModeChange = new EventEmitter<'unified' | 'split'>();
  @Output() optionsChange = new EventEmitter<DiffOptions>();
  
  // Component state
  diffHtml: SafeHtml = '' as SafeHtml;
  diffStats: DiffStats = { additions: 0, deletions: 0, lineCount: 0 };
  isError: boolean = false;
  errorMessage: string = '';
  
  // Diff options
  diffOptions: DiffOptions = {
    ignoreWhitespace: false,
    ignoreCase: false,
    showWhitespace: false
  };
  
  // Lifecycle methods
  ngOnInit(): void;
  ngOnChanges(changes: SimpleChanges): void;
  
  // Diff computation
  renderDiff(): void;
  computeDiffStats(diff: string): DiffStats;
  
  // Toolbar actions
  setViewMode(mode: 'unified' | 'split'): void;
  copyToClipboard(): void;
  downloadYaml(): void;
  expandAllSections(): void;
  collapseAllSections(): void;
  toggleWhitespace(): void;
  toggleIgnoreCase(): void;
  retryDiffGeneration(): void;
  
  // Accessibility
  focusNextHunk(): void;
  focusPreviousHunk(): void;
  getHunkAriaLabel(hunkIndex: number): string;
  
  // Utility methods
  formatTimestamp(timestamp: Date): string;
}

export interface DiffOptions {
  ignoreWhitespace: boolean;
  ignoreCase: boolean;
  showWhitespace: boolean;
}

export interface DiffStats {
  additions: number;
  deletions: number;
  lineCount: number;
}
```

## Dependencies

### diff2html Library

JavaScript library for generating side-by-side and unified diff views from diff strings.
[@use](diff2html)

### highlight.js

Syntax highlighting library for YAML content within diff views.
[@use](highlight.js)

### Angular CDK Clipboard

Angular CDK clipboard module for copy-to-clipboard functionality.
[@use](@angular/cdk/clipboard)

### Angular Material Components

Material Design components for toolbar, buttons, toggles, cards, chips, and progress indicators.
[@use](@angular/material/toolbar)
[@use](@angular/material/button)
[@use](@angular/material/button-toggle)
[@use](@angular/material/icon)
[@use](@angular/material/tooltip)
[@use](@angular/material/progress-spinner)
[@use](@angular/material/slide-toggle)
[@use](@angular/material/card)
[@use](@angular/material/chips)

### Angular Common

Angular common module for pipes and directives.
[@use](@angular/common)
