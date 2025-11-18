// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../specs/app/components/config-admin/config-diff-viewer-component.spec.md
// (spec:acd08023) (code:9d344f36)

import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml, SecurityContext } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import * as Diff2Html from 'diff2html';
import hljs from 'highlight.js';
import { createPatch } from 'diff';

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
  diffHtml: string = '';
  diffStats: DiffStats = { additions: 0, deletions: 0, lineCount: 0 };
  isError: boolean = false;
  errorMessage: string = '';
  
  // Diff options
  diffOptions: DiffOptions = {
    ignoreWhitespace: false,
    ignoreCase: false,
    showWhitespace: false
  };

  private diffComputationTimeout?: number;

  constructor(
    private domSanitizer: DomSanitizer,
    private clipboard: Clipboard
  ) {}

  // Lifecycle methods
  ngOnInit(): void {
    this.renderDiff();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['originalYaml'] || changes['modifiedYaml'] || changes['viewMode']) {
      // Debounce diff recomputation
      if (this.diffComputationTimeout) {
        clearTimeout(this.diffComputationTimeout);
      }
      this.diffComputationTimeout = setTimeout(() => {
        this.renderDiff();
      }, 300);
    }
  }

  // Diff computation
  renderDiff(): void {
    try {
      this.isError = false;
      this.errorMessage = '';

      let originalContent = this.originalYaml;
      let modifiedContent = this.modifiedYaml;

      // Apply diff options
      if (this.diffOptions.ignoreCase) {
        originalContent = originalContent.toLowerCase();
        modifiedContent = modifiedContent.toLowerCase();
      }

      // Generate diff using diff library
      const diffString = createPatch('config.yaml', originalContent, modifiedContent, '', '');
      
      // Generate HTML using diff2html
      const diffConfig = {
        drawFileList: false,
        matching: 'lines',
        outputFormat: this.viewMode === 'split' ? 'side-by-side' : 'line-by-line',
        synchronisedScroll: true,
        highlight: true,
        fileListToggle: false,
        fileListStartVisible: false,
        fileContentToggle: false,
        compiledTemplates: {},
        rawTemplates: {},
        renderNothingWhenEmpty: false
      };

      const diffHtml = Diff2Html.html(diffString, diffConfig as Diff2Html.Diff2HtmlConfig);
      // Diff2Html is a trusted library generating diff HTML from configuration files
      // Sanitize the output for additional security
      const sanitized = this.domSanitizer.sanitize(SecurityContext.HTML, diffHtml);
      this.diffHtml = sanitized || '';
      
      // Compute statistics
      this.diffStats = this.computeDiffStats(diffString);
      
      // Apply syntax highlighting
      this.applySyntaxHighlighting();
      
    } catch (error) {
      this.isError = true;
      this.errorMessage = error instanceof Error ? error.message : 'Failed to generate diff';
      console.error('Diff generation failed:', error);
    }
  }

  computeDiffStats(diff: string): DiffStats {
    const lines = diff.split('\n');
    let additions = 0;
    let deletions = 0;
    let lineCount = 0;

    for (const line of lines) {
      if (line.startsWith('+') && !line.startsWith('+++')) {
        additions++;
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        deletions++;
      }
      if (!line.startsWith('@@') && !line.startsWith('+++') && !line.startsWith('---')) {
        lineCount++;
      }
    }

    return { additions, deletions, lineCount };
  }

  private applySyntaxHighlighting(): void {
    // Apply YAML syntax highlighting to code blocks
    setTimeout(() => {
      const codeBlocks = document.querySelectorAll('.d2h-code-line-ctn .d2h-code-line');
      codeBlocks.forEach(block => {
        if (block.textContent) {
          try {
            const highlighted = hljs.highlight(block.textContent, { language: 'yaml' });
            block.innerHTML = highlighted.value;
          } catch (e) {
            // Fallback to original content if highlighting fails
          }
        }
      });
    }, 100);
  }

  // Toolbar actions
  setViewMode(mode: 'unified' | 'split'): void {
    if (this.viewMode !== mode) {
      this.viewModeChange.emit(mode);
    }
  }

  copyToClipboard(): void {
    if (this.modifiedYaml) {
      this.clipboard.copy(this.modifiedYaml);
    }
  }

  downloadYaml(): void {
    if (this.modifiedYaml) {
      const blob = new Blob([this.modifiedYaml], { type: 'text/yaml' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'config.yaml';
      link.click();
      window.URL.revokeObjectURL(url);
    }
  }

  expandAllSections(): void {
    const collapsedSections = document.querySelectorAll('.d2h-file-collapse');
    collapsedSections.forEach(section => {
      (section as HTMLElement).click();
    });
  }

  collapseAllSections(): void {
    const expandedSections = document.querySelectorAll('.d2h-file-expand');
    expandedSections.forEach(section => {
      (section as HTMLElement).click();
    });
  }

  toggleWhitespace(): void {
    this.diffOptions = {
      ...this.diffOptions,
      showWhitespace: !this.diffOptions.showWhitespace
    };
    this.optionsChange.emit(this.diffOptions);
    this.renderDiff();
  }

  toggleIgnoreCase(): void {
    this.diffOptions = {
      ...this.diffOptions,
      ignoreCase: !this.diffOptions.ignoreCase
    };
    this.optionsChange.emit(this.diffOptions);
    this.renderDiff();
  }

  retryDiffGeneration(): void {
    this.renderDiff();
  }

  // Accessibility
  focusNextHunk(): void {
    const hunks = document.querySelectorAll('.d2h-code-wrapper');
    const currentFocus = document.activeElement;
    let currentIndex = -1;

    for (let i = 0; i < hunks.length; i++) {
      if (hunks[i].contains(currentFocus)) {
        currentIndex = i;
        break;
      }
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < hunks.length) {
      (hunks[nextIndex] as HTMLElement).focus();
    }
  }

  focusPreviousHunk(): void {
    const hunks = document.querySelectorAll('.d2h-code-wrapper');
    const currentFocus = document.activeElement;
    let currentIndex = -1;

    for (let i = 0; i < hunks.length; i++) {
      if (hunks[i].contains(currentFocus)) {
        currentIndex = i;
        break;
      }
    }

    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      (hunks[previousIndex] as HTMLElement).focus();
    }
  }

  getHunkAriaLabel(hunkIndex: number): string {
    return `Diff hunk ${hunkIndex + 1} of ${this.diffStats.lineCount}`;
  }

  // Utility methods
  formatTimestamp(timestamp: Date): string {
    if (!timestamp) {
      return '';
    }
    
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
      return 'Just now';
    }
  }

  sanitizeDiffHtml(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }
}
