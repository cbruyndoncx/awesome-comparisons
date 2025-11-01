# Plan: Improve Markdown Column Expandability

Scope: Limit markdown table cells to three lines by default and add an accessible way to reveal the full content; advise on the appropriate UX approach.

## Tasks

- [x] Review current markdown column rendering and assess UX options
  > **Bash** `["bash","-lc","ls"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: listed root project files including `src/`, `lib/`, `plans/`, and documentation assets.
  > ---
  > **Bash** `["bash","-lc","cat .tessl/framework/plan-files.md"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: reviewed mandatory plan file procedures and documentation requirements.
  > ---
  > **Bash** `["bash","-lc","cat RULES.md"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: confirmed project references `tessl registry install` for rule updates.
  > ---
  > **Bash** `["bash","-lc","rg \"MARKDOWN\""]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: located numerous dataset references to `MARKDOWN` criteria types, indicating widespread usage.
  > ---
  > **Bash** `["bash","-lc","rg \"MARKDOWN\" src"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: confirmed generated comparison JSON files mark markdown-capable criteria for both table and detail views.
  > ---
  > **Bash** `["bash","-lc","ls src/app"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: inspected Angular app structure (`components/`, `redux/`, `shared/`, etc.).
  > ---
  > **Bash** `["bash","-lc","ls src/app/components"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: identified `comparison` and `output/generic-table` modules as likely touchpoints.
  > ---
  > **Bash** `["bash","-lc","ls src/app/components/comparison"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: confirmed presence of `comparison.template.html` used for table composition.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,160p' src/app/components/comparison/comparison.template.html"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: reviewed filter toolbar markup surrounding `<generictable>` invocation; noted relevant inputs/outputs.
  > ---
  > **Bash** `["bash","-lc","sed -n '160,320p' src/app/components/comparison/comparison.template.html"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: confirmed table component wiring and details dialog integration.
  > ---
  > **Bash** `["bash","-lc","rg \"generictable\" -n"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: pinpointed `generic-table` component definitions for deeper inspection.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/output/generic-table/generic-table.component.ts"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: evaluated component logic handling column metadata, search interactions, and render helpers.
  > - files: [src/app/components/output/generic-table/generic-table.component.ts](../src/app/components/output/generic-table/generic-table.component.ts)
  > ---
  > **Bash** `["bash","-lc","sed -n '200,400p' src/app/components/output/generic-table/generic-table.component.ts"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: noted label rendering utilities and edit link handling; no existing markdown truncation logic.
  > - files: [src/app/components/output/generic-table/generic-table.component.ts](../src/app/components/output/generic-table/generic-table.component.ts)
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/output/generic-table/generic-table.component.html"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: confirmed markdown cells render raw `tableText` or sanitized HTML without clamping or toggles.
  > - files: [src/app/components/output/generic-table/generic-table.component.html](../src/app/components/output/generic-table/generic-table.component.html)
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/output/generic-table/generic-table.component.css"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: reviewed table styling; no classes currently manage multi-line clamping.
  > - files: [src/app/components/output/generic-table/generic-table.component.css](../src/app/components/output/generic-table/generic-table.component.css)
  > ---
  > **Bash** `["bash","-lc","rg \"class CriteriaData\" -n"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: located `CriteriaData` definition to understand available text fields.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' lib/gulp/model/data/criteriaData.d.ts"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: verified `CriteriaData` exposes `tableText`, `summaryText`, and `html` for markdown content.
  > - files: [lib/gulp/model/data/criteriaData.d.ts](../lib/gulp/model/data/criteriaData.d.ts)
  > ---
  > **Bash** `["bash","-lc","date +%Y-%m-%d_%H-%M-%S"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: captured timestamp `2025-11-01_18-01-19` for plan file naming.
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Add File: plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md
  > +# Plan: Improve Markdown Column Expandability
  > +
  > +Scope: Limit markdown table cells to three lines by default and add an accessible way to reveal the full content; advise on the appropriate UX approach.
  > +
  > +## Tasks
  > +
  > +- [ ] Review current markdown column rendering and assess UX options
  > +- [ ] Implement component template logic for clamped display and expansion toggle
  > +- [ ] Add styling and helper logic to support clamping and expanded state
  > +- [ ] Document results and recommend next steps to the user
  > *** End Patch
  > ```
  > - outcome: created plan file with initial task list in `plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md`.
  > ---
  > UX assessment: the current table renders full markdown content, causing cells to expand indefinitely; user experience would benefit from a “Show more/Show less” toggle per cell instead of hover-only affordances, ensuring accessibility and discoverability.
- [x] Implement component helpers and template logic for clamped display and expansion toggle
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.ts
  > @@
  > -import { AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output } from '@angular/core';
  > +import { AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
  > @@
  >      public visibleCriteriaMap$: Observable<Record<string, Criteria>>;
  >  
  >      private table;
  >      private anchorsInitialised = false;
  > +    private expandedMarkdownCells = new Set<string>();
  > @@
  > -    ngOnChanges(changes): void {
  > +    ngOnChanges(changes: SimpleChanges): void {
  >          this.update();
  > +        if (changes?.items || changes?.index || changes?.columnKeys) {
  > +            this.expandedMarkdownCells.clear();
  > +        }
  >      }
  > @@
  >      public hasLabelFill(entry: CriteriaData | null | undefined): boolean {
  >          if (!this.labelColorsEnabled) {
  >              return false;
  >          }
  >          const labels = this.extractLabels(entry);
  >          return labels.some(label => !!label?.backgroundColor);
  >      }
  >  
  > +    public shouldTruncateMarkdown(entry: CriteriaData | null | undefined): boolean {
  > +        const text = this.getMarkdownPlainText(entry);
  > +        if (!text) {
  > +            return false;
  > +        }
  > +        const lineBreakCount = text.split(/\r?\n/).filter(segment => segment.trim().length > 0).length;
  > +        const normalized = text.replace(/\s+/g, ' ').trim();
  > +        if (!normalized) {
  > +            return false;
  > +        }
  > +        if (lineBreakCount > 3) {
  > +            return true;
  > +        }
  > +        return normalized.length > 240;
  > +    }
  > +
  > +    public isMarkdownExpanded(itemIndex: number, columnIndex: number): boolean {
  > +        const key = this.buildMarkdownCellId(itemIndex, columnIndex);
  > +        if (!key) {
  > +            return false;
  > +        }
  > +        return this.expandedMarkdownCells.has(key);
  > +    }
  > +
  > +    public toggleMarkdownExpansion(itemIndex: number, columnIndex: number): void {
  > +        const key = this.buildMarkdownCellId(itemIndex, columnIndex);
  > +        if (!key) {
  > +            return;
  > +        }
  > +        if (this.expandedMarkdownCells.has(key)) {
  > +            this.expandedMarkdownCells.delete(key);
  > +        } else {
  > +            this.expandedMarkdownCells.add(key);
  > +        }
  > +    }
  > +
  >      public resolveLabelCellFill(entry: CriteriaData | null | undefined): string | null {
  >          if (!this.hasLabelFill(entry)) {
  >              return null;
  >          }
  >          const labels = this.extractLabels(entry).filter(
  > @@
  >      private extractLabels(entry: CriteriaData | null | undefined): Label[] {
  >          if (!entry) {
  >              return [];
  >          }
  >          const labelArray = (entry as unknown as {labelArray?: Array<Label | null | undefined>}).labelArray || (entry as unknown as {labels?: any}).labels;
  > @@
  >          }
  >          // plain object
  >          if (typeof labelArray === 'object') {
  >              return Object.values(labelArray).filter((l): l is Label => !!l);
  >          }
  >          return [];
  >      }
  > +
  > +    private buildMarkdownCellId(itemIndex: number, columnIndex: number): string | null {
  > +        const rowIndex = this.getRowIndex(itemIndex);
  > +        if (rowIndex === null || rowIndex === undefined) {
  > +            return null;
  > +        }
  > +        const columnKey = this.getColumnKey(columnIndex);
  > +        const safeColumnKey = columnKey && columnKey.trim().length > 0 ? columnKey : `__index_${columnIndex}`;
  > +        return `${rowIndex}::${safeColumnKey}`;
  > +    }
  > +
  > +    private getMarkdownPlainText(entry: CriteriaData | null | undefined): string {
  > +        if (!entry) {
  > +            return '';
  > +        }
  > +        const plaintextCandidates = [
  > +            (entry as unknown as { tableText?: string }).tableText,
  > +            (entry as unknown as { summaryText?: string }).summaryText,
  > +            (entry as unknown as { text?: string }).text
  > +        ];
  > +        for (const candidate of plaintextCandidates) {
  > +            if (typeof candidate === 'string' && candidate.trim().length > 0) {
  > +                return candidate.trim();
  > +            }
  > +        }
  > +        const html = (entry as unknown as { html?: string }).html;
  > +        if (typeof html === 'string' && html.trim().length > 0) {
  > +            if (this.document) {
  > +                const container = this.document.createElement('div');
  > +                container.innerHTML = html;
  > +                return container.textContent ? container.textContent.trim() : '';
  > +            }
  > +            return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  > +        }
  > +        return '';
  > +    }
  >  }
  > *** End Patch
  > ```
  > - outcome: Added per-cell expansion tracking, truncation heuristic, and plain text extraction utilities to support the new UX.
  > - files: [src/app/components/output/generic-table/generic-table.component.ts](../src/app/components/output/generic-table/generic-table.component.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.ts
  > @@
  > -        const normalized = text.replace(/\s+/g, ' ').trim();
  > +        const lineBreakCount = text.split(/\r?\n/).filter(segment => segment.trim().length > 0).length;
  > +        const normalized = text.replace(/\s+/g, ' ').trim();
  > -        const explicitLineBreaks = normalized.split(/\r?\n/).length;
  > -        if (explicitLineBreaks > 3) {
  > +        if (lineBreakCount > 3) {
  >              return true;
  >          }
  >          return normalized.length > 240;
  >      }
  > *** End Patch
  > ```
  > - outcome: Corrected the truncation heuristic to respect original newline boundaries.
  > - files: [src/app/components/output/generic-table/generic-table.component.ts](../src/app/components/output/generic-table/generic-table.component.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.html
  > @@
  > -                        <td *ngIf="types[i] === 'MARKDOWN'">
  > -                            <ng-container *ngIf="entry?.tableText; else markdownHtml">
  > -                                {{entry?.tableText}}
  > -                            </ng-container>
  > -                            <ng-template #markdownHtml>
  > -                                <div [innerHtml]="entry?.html | sanitizeHtml"></div>
  > -                            </ng-template>
  > +                        <td *ngIf="types[i] === 'MARKDOWN'" class="markdown-cell"
  > +                            [class.markdown-cell--expanded]="isMarkdownExpanded(itemIndex, i)">
  > +                            <ng-template #markdownContent>
  > +                                <ng-container *ngIf="entry?.tableText; else markdownHtml">
  > +                                    {{entry?.tableText}}
  > +                                </ng-container>
  > +                            </ng-template>
  > +                            <ng-container *ngIf="shouldTruncateMarkdown(entry); else markdownNoClamp">
  > +                                <div class="markdown-cell__content"
  > +                                     [class.markdown-cell__content--clamped]="!isMarkdownExpanded(itemIndex, i)">
  > +                                    <ng-container *ngTemplateOutlet="markdownContent"></ng-container>
  > +                                </div>
  > +                                <button type="button"
  > +                                        class="markdown-cell__toggle"
  > +                                        (click)="toggleMarkdownExpansion(itemIndex, i)"
  > +                                        [attr.aria-expanded]="isMarkdownExpanded(itemIndex, i)">
  > +                                    {{isMarkdownExpanded(itemIndex, i) ? 'Show less' : 'Show more'}}
  > +                                </button>
  > +                            </ng-container>
  > +                            <ng-template #markdownNoClamp>
  > +                                <div class="markdown-cell__content markdown-cell__content--full">
  > +                                    <ng-container *ngTemplateOutlet="markdownContent"></ng-container>
  > +                                </div>
  > +                            </ng-template>
  > +                            <ng-template #markdownHtml>
  > +                                <div [innerHtml]="entry?.html | sanitizeHtml"></div>
  > +                            </ng-template>
  >                         </td>
  > *** End Patch
  > ```
  > - outcome: Reworked the markdown cell markup to embed the clamped content container and reveal/close control.
  > - files: [src/app/components/output/generic-table/generic-table.component.html](../src/app/components/output/generic-table/generic-table.component.html)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.html
  > @@
  > -                        <td *ngIf="types[i] === 'MARKDOWN'" class="markdown-cell"
  > -                            [class.markdown-cell--expanded]="isMarkdownExpanded(itemIndex, i)">
  > -                            <ng-template #markdownContent>
  > -                                <ng-container *ngIf="entry?.tableText; else markdownHtml">
  > -                                    {{entry?.tableText}}
  > -                                </ng-container>
  > -                            </ng-template>
  > -                            <ng-container *ngIf="shouldTruncateMarkdown(entry); else markdownNoClamp">
  > -                                <div class="markdown-cell__content"
  > -                                     [class.markdown-cell__content--clamped]="!isMarkdownExpanded(itemIndex, i)">
  > -                                    <ng-container *ngTemplateOutlet="markdownContent"></ng-container>
  > -                                </div>
  > -                                <button type="button"
  > -                                        class="markdown-cell__toggle"
  > -                                        (click)="toggleMarkdownExpansion(itemIndex, i)"
  > -                                        [attr.aria-expanded]="isMarkdownExpanded(itemIndex, i)">
  > -                                    {{isMarkdownExpanded(itemIndex, i) ? 'Show less' : 'Show more'}}
  > -                                </button>
  > -                            </ng-container>
  > -                            <ng-template #markdownNoClamp>
  > -                                <div class="markdown-cell__content markdown-cell__content--full">
  > -                                    <ng-container *ngTemplateOutlet="markdownContent"></ng-container>
  > -                                </div>
  > -                            </ng-template>
  > -                            <ng-template #markdownHtml>
  > -                                <div [innerHtml]="entry?.html | sanitizeHtml"></div>
  > -                            </ng-template>
  > +                        <td *ngIf="types[i] === 'MARKDOWN'" class="markdown-cell"
  > +                            [class.markdown-cell--expanded]="isMarkdownExpanded(itemIndex, i)">
  > +                            <ng-template #markdownContent>
  > +                                <ng-container *ngIf="entry?.tableText; else markdownHtml">
  > +                                    {{entry?.tableText}}
  > +                                </ng-container>
  > +                            </ng-template>
  > +                            <div class="markdown-cell__content"
  > +                                 [class.markdown-cell__content--clamped]="shouldTruncateMarkdown(entry) && !isMarkdownExpanded(itemIndex, i)">
  > +                                <ng-container *ngTemplateOutlet="markdownContent"></ng-container>
  > +                            </div>
  > +                            <button type="button"
  > +                                    class="markdown-cell__toggle"
  > +                                    *ngIf="shouldTruncateMarkdown(entry)"
  > +                                    (click)="toggleMarkdownExpansion(itemIndex, i)"
  > +                                    [attr.aria-expanded]="isMarkdownExpanded(itemIndex, i)">
  > +                                {{isMarkdownExpanded(itemIndex, i) ? 'Show less' : 'Show more'}}
  > +                            </button>
  > +                            <ng-template #markdownHtml>
  > +                                <div [innerHtml]="entry?.html | sanitizeHtml"></div>
  > +                            </ng-template>
  >                         </td>
  > *** End Patch
  > ```
  > - outcome: Simplified markdown cell rendering so the clamped container is always present while the toggle appears only when extra content exists.
  > - files: [src/app/components/output/generic-table/generic-table.component.html](../src/app/components/output/generic-table/generic-table.component.html)
  > ---
  > **Bash** `["bash","-lc","sed -n '120,220p' src/app/components/output/generic-table/generic-table.component.html"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Verified updated markdown cell markup renders the clamped container and toggle as expected.
  > - files: [src/app/components/output/generic-table/generic-table.component.html](../src/app/components/output/generic-table/generic-table.component.html)
- [x] Add styling for clamp and toggle control
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.css
  > @@
  > -.group-controls__toggle {
  > -    border: 1px solid var(--border-color, rgba(15, 23, 42, 0.12));
  > +.group-controls__toggle {
  > +    border: 1px solid var(--border-color, rgba(15, 23, 42, 0.12));
  > *** End Patch
  > ```
  > - outcome: Attempted placeholder patch; no changes were necessary, leaving table grouping styles untouched.
  > - files: [src/app/components/output/generic-table/generic-table.component.css](../src/app/components/output/generic-table/generic-table.component.css)
  > ---
  > **Bash** `["bash","-lc","tail -n 40 src/app/components/output/generic-table/generic-table.component.css"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: displayed file footer to position new markdown-specific styles.
  > - files: [src/app/components/output/generic-table/generic-table.component.css](../src/app/components/output/generic-table/generic-table.component.css)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.css
  > @@
  >  .unknown {
  >      background-color: var(--hover-color, lightgray);
  >      color: var(--text-color, white);
  >  }
  > +
  > +.markdown-cell {
  > +    position: relative;
  > +    min-width: 0;
  > +    word-break: break-word;
  > +}
  > +
  > +.markdown-cell__content {
  > +    white-space: normal;
  > +    overflow: hidden;
  > +}
  > +
  > +.markdown-cell__content--clamped {
  > +    display: -webkit-box;
  > +    -webkit-line-clamp: 3;
  > +    -webkit-box-orient: vertical;
  > +    overflow: hidden;
  > +}
  > +
  > +.markdown-cell__toggle {
  > +    margin-top: 4px;
  > +    padding: 0;
  > +    border: none;
  > +    background: none;
  > +    color: var(--link-color, #1565c0);
  > +    cursor: pointer;
  > +    font-size: 12px;
  > +}
  > +
  > +.markdown-cell__toggle:hover,
  > +.markdown-cell__toggle:focus {
  > +    text-decoration: underline;
  > +}
  > *** End Patch
  > ```
  > - outcome: Added clamping visuals and themed toggle styling for markdown cells.
  > - files: [src/app/components/output/generic-table/generic-table.component.css](../src/app/components/output/generic-table/generic-table.component.css)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.css
  > @@
  >  .markdown-cell__content--clamped {
  >      display: -webkit-box;
  >      -webkit-line-clamp: 3;
  >      -webkit-box-orient: vertical;
  >      overflow: hidden;
  >  }
  > +
  > +.markdown-cell__content--full {
  > +    display: block;
  > +}
  > *** End Patch
  > ```
  > - outcome: Ensured unclamped content uses block layout when expanded.
  > - files: [src/app/components/output/generic-table/generic-table.component.css](../src/app/components/output/generic-table/generic-table.component.css)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.css
  > @@
  > -.markdown-cell__content--full {
  > -    display: block;
  > -}
  > *** End Patch
  > ```
  > - outcome: Removed unused `.markdown-cell__content--full` style after consolidating markup.
  > - files: [src/app/components/output/generic-table/generic-table.component.css](../src/app/components/output/generic-table/generic-table.component.css)
- [x] Document results and recommend next steps to the user
  > **Bash** `["bash","-lc","cat plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Reviewed plan status before final documentation.
  > - files: [plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md](../plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md)
  > ---
  > **Bash** `["bash","-lc","rg \"Reworked the markdown cell markup\" -n plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Located existing log entry to append follow-up tooling notes.
  > - files: [plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md](../plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md)
  > ---
  > **Bash** `["bash","-lc","sed -n '260,360p' plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Inspected surrounding plan text to confirm placement for additional entries.
  > - files: [plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md](../plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md)
  > ---
  > **Bash** `["bash","-lc","rg \"ngcontainer\" -n plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Verified plan log accurately reflects the corrected Angular template tag spelling.
  > - files: [plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md](../plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md)
  > ---
  > **Bash** `["bash","-lc","rg \"Simplified markdown cell rendering\" -n plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Confirmed the new log location after simplifying the markdown template.
  > - files: [plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md](../plans/2025-11-01_18-01-19_markdown-cell-expand.plan.md)
  > ---
  > **Bash** `["bash","-lc","git status -sb"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Reported outstanding changes to source and plan files on branch `limit-markdown-display`.
  > ---
  > **Bash** `["bash","-lc","nl -ba src/app/components/output/generic-table/generic-table.component.ts | sed -n '1,220p'"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Captured line numbers for updated GenericTable logic including truncation helpers.
  > - files: [src/app/components/output/generic-table/generic-table.component.ts](../src/app/components/output/generic-table/generic-table.component.ts)
  > ---
  > **Bash** `["bash","-lc","nl -ba src/app/components/output/generic-table/generic-table.component.html | sed -n '100,220p'"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Captured line numbers for the markdown cell markup and toggle button.
  > - files: [src/app/components/output/generic-table/generic-table.component.html](../src/app/components/output/generic-table/generic-table.component.html)
  > ---
  > **Bash** `["bash","-lc","nl -ba src/app/components/output/generic-table/generic-table.component.css | tail -n 80"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Captured line numbers for new clamping styles.
  > - files: [src/app/components/output/generic-table/generic-table.component.css](../src/app/components/output/generic-table/generic-table.component.css)
  > ---
  > **Bash** `["bash","-lc","nl -ba src/app/components/output/generic-table/generic-table.component.ts | sed -n '220,320p'"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Captured extension of TypeScript diff to verify expansion state bookkeeping.
  > - files: [src/app/components/output/generic-table/generic-table.component.ts](../src/app/components/output/generic-table/generic-table.component.ts)
  > ---
  > **Bash** `["bash","-lc","nl -ba src/app/components/output/generic-table/generic-table.component.ts | sed -n '320,420p'"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Captured helper definitions for markdown cell keys and plain-text extraction.
  > - files: [src/app/components/output/generic-table/generic-table.component.ts](../src/app/components/output/generic-table/generic-table.component.ts)
  > ---
  > Documentation summary: Recorded plan updates, confirmed recent edits are captured, and prepared a user-facing summary with UX recommendations.
