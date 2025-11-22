import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Criteria, CriteriaTypes, CriteriaValue } from '../../../../../lib/gulp/model/model.module';
import { GitHubIntentService } from '../../../shared/services/github-intent.service';
import { DatasetManifestEntry } from '../../datasets/dataset-manifest.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

export interface AddEntryDialogData {
  dataset: DatasetManifestEntry;
  criteria: Array<Criteria>;
  featureGroups: any[];
  repository?: { owner: string; repo: string; branch: string };
}

interface CriteriaFormControl {
  criteria: Criteria;
  control: FormControl;
  group?: string;
}

@Component({
  selector: 'uc-add-entry-modal',
  templateUrl: './add-entry-modal.component.html',
  styleUrls: ['./add-entry-modal.component.scss']
})
export class AddEntryModalComponent implements OnInit, OnDestroy {
  entryForm: FormGroup;
  markdownPreview: string = '';
  criteriaControls: CriteriaFormControl[] = [];
  groupedCriteria: Map<string, CriteriaFormControl[]> = new Map();
  ungroupedCriteria: CriteriaFormControl[] = [];

  showPreview: boolean = false;
  filename: string = '';

  private destroy$ = new Subject<void>();

  readonly CriteriaTypes = CriteriaTypes;

  constructor(
    public dialogRef: MatDialogRef<AddEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEntryDialogData,
    private fb: FormBuilder,
    private githubIntentService: GitHubIntentService,
    private clipboard: Clipboard
  ) {
    this.entryForm = this.fb.group({});
  }

  ngOnInit(): void {
    console.log('=== Modal Initialization ===');
    console.log('Feature groups passed to modal:', this.data.featureGroups);
    console.log('Feature groups count:', this.data.featureGroups?.length);
    console.log('Total criteria:', this.data.criteria?.length);

    this.buildForm();
    this.updateFilename();
    this.updateMarkdown();

    console.log('=== After Form Build ===');
    console.log('Form initialized with controls:', Object.keys(this.entryForm.controls));
    console.log('Grouped criteria:', this.groupedCriteria);
    console.log('Grouped criteria count:', Array.from(this.groupedCriteria.values()).reduce((sum, arr) => sum + arr.length, 0));
    console.log('Ungrouped criteria count:', this.ungroupedCriteria.length);

    // Update markdown preview when form changes
    this.entryForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300)
      )
      .subscribe((values) => {
        console.log('Form values changed:', values);
        this.updateMarkdown();
        this.updateFilename();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm(): void {
    // Always create basic form controls first
    this.entryForm.addControl('_name', new FormControl('', Validators.required));
    this.entryForm.addControl('_url', new FormControl('', Validators.required));
    this.entryForm.addControl('_description', new FormControl(''));

    // Create form controls for each criteria
    const systemCriteriaIds = new Set(['id', 'description', 'RepositoryActive', 'Rating-Criteria']);

    this.data.criteria.forEach(criteria => {
      if (systemCriteriaIds.has(criteria.id)) {
        // Skip system criteria - already handled above
        return;
      }

      const control = this.createControlForCriteria(criteria);
      const formControlName = this.getFormControlName(criteria.id);
      this.entryForm.addControl(formControlName, control);

      const formControl: CriteriaFormControl = {
        criteria,
        control,
        group: this.findGroupForCriteria(criteria.id)
      };

      this.criteriaControls.push(formControl);

      // Organize by group
      if (formControl.group) {
        if (!this.groupedCriteria.has(formControl.group)) {
          this.groupedCriteria.set(formControl.group, []);
        }
        this.groupedCriteria.get(formControl.group)!.push(formControl);
      } else {
        this.ungroupedCriteria.push(formControl);
      }
    });
  }

  private createControlForCriteria(criteria: Criteria): FormControl {
    const defaultValue = this.getDefaultValueForType(criteria.type);
    return new FormControl(defaultValue);
  }

  private getDefaultValueForType(type: CriteriaTypes): any {
    switch (type) {
      case CriteriaTypes.LABEL:
        return [];
      case CriteriaTypes.TEXT:
      case CriteriaTypes.MARKDOWN:
        return '';
      case CriteriaTypes.RATING:
        return '';
      case CriteriaTypes.REPOSITORY:
        return '';
      default:
        return '';
    }
  }

  private findGroupForCriteria(criteriaId: string): string | undefined {
    for (const group of this.data.featureGroups) {
      console.log(`Checking group "${group.displayName || group.key}" for criteria "${criteriaId}"`, {
        hasChildren: !!group.children,
        childrenCount: group.children?.length,
        childrenIds: group.children?.map((c: any) => c.id),
        children: group.children
      });

      if (group.children && group.children.some((child: any) => child.id === criteriaId)) {
        const groupKey = group.displayName || group.key;
        console.log(`✓ Found group "${groupKey}" for criteria "${criteriaId}"`);
        return groupKey;
      }
    }
    console.log(`✗ No group found for criteria "${criteriaId}"`);
    return undefined;
  }

  getFormControlName(criteriaId: string): string {
    return `criteria_${criteriaId}`;
  }

  getControlValue(criteriaId: string): any {
    const controlName = this.getFormControlName(criteriaId);
    return this.entryForm.get(controlName)?.value;
  }

  toggleLabel(criteriaId: string, value: string): void {
    const controlName = this.getFormControlName(criteriaId);
    const control = this.entryForm.get(controlName);
    if (!control) return;

    const currentValues: string[] = control.value || [];
    const index = currentValues.indexOf(value);

    if (index > -1) {
      currentValues.splice(index, 1);
    } else {
      currentValues.push(value);
    }

    control.setValue([...currentValues]);
  }

  isLabelSelected(criteriaId: string, value: string): boolean {
    const controlName = this.getFormControlName(criteriaId);
    const currentValues: string[] = this.entryForm.get(controlName)?.value || [];
    return currentValues.includes(value);
  }

  getLabelValues(criteria: Criteria): string[] {
    if (!criteria.values) {
      console.warn('No values found for criteria:', criteria.id, criteria);
      return [];
    }
    const values = Array.from(criteria.values.keys());
    console.log('Label values for', criteria.id, ':', values);
    return values;
  }

  private updateFilename(): void {
    const name = this.entryForm.get('_name')?.value || '';
    if (name) {
      this.filename = this.githubIntentService.sanitizeFilename(name) + '.md';
    } else {
      this.filename = 'new-entry.md';
    }
  }

  private updateMarkdown(): void {
    this.markdownPreview = this.generateMarkdown();
  }

  private generateMarkdown(): string {
    const name = this.entryForm.get('_name')?.value || '';
    const url = this.entryForm.get('_url')?.value || '';
    const description = this.entryForm.get('_description')?.value || '';

    let markdown = `# ${this.data.dataset.displayLabel}\n\n`;

    // Add instruction for name/URL if empty
    if (!name && !url) {
      markdown += `<!-- Add the comparison entry name plus canonical URL. -->\n\n`;
    }
    markdown += `- ${name}${url ? ' - ' + url : ''}\n\n`;

    // Add instruction for description
    if (!description) {
      markdown += `<!-- Describe this comparison entry using one or two paragraphs. -->\n\n`;
    }

    if (description) {
      markdown += `${description}\n\n`;
    }

    markdown += `**Dataset ID:** ${this.data.dataset.id}\n\n`;

    // Process feature groups
    this.data.featureGroups.forEach(group => {
      const groupControls = this.groupedCriteria.get(group.displayName || group.key);
      if (!groupControls || groupControls.length === 0) return;

      markdown += `## ${group.displayName || group.key}\n\n`;

      // Add group description/tooltip as comment if available
      if (group.label?.tooltip || group.label?.value) {
        const groupDesc = group.label.tooltip || group.label.value;
        markdown += `<!-- ${groupDesc} -->\n\n`;
      }

      groupControls.forEach(({ criteria }) => {
        const section = this.buildCriteriaSection(criteria);
        if (section) {
          markdown += section;
        }
      });
    });

    // Process ungrouped criteria
    if (this.ungroupedCriteria.length > 0) {
      markdown += `## Additional Information\n\n`;
      this.ungroupedCriteria.forEach(({ criteria }) => {
        const section = this.buildCriteriaSection(criteria);
        if (section) {
          markdown += section;
        }
      });
    }

    return markdown;
  }

  private buildCriteriaSection(criteria: Criteria): string {
    const value = this.getControlValue(criteria.id);
    console.log(`Building section for ${criteria.id} (${criteria.type}):`, value);

    let section = `### ${criteria.name || criteria.id}\n`;

    // Add description as HTML comment if available
    if (criteria.description) {
      section += `<!-- ${criteria.description} -->\n`;
    }

    switch (criteria.type) {
      case CriteriaTypes.LABEL:
        const selectedLabels = Array.isArray(value) ? value : (value ? [value] : []);

        // Add instruction comment for LABEL types
        const labelValues = this.getLabelValues(criteria);
        const hasYes = labelValues.some(v => v.toLowerCase() === 'yes');
        const hasNo = labelValues.some(v => v.toLowerCase() === 'no');

        if (hasYes && hasNo) {
          section += `<!-- Keep only the label values that apply. Choose either Yes or No and remove the other, or delete both if unknown. Add any supporting notes using indented "- " entries beneath the kept values. -->\n`;
        } else {
          section += `<!-- Keep only the label values that apply to this comparison. Add any supporting notes using indented "- " entries beneath the kept values. -->\n`;
        }

        if (selectedLabels.length > 0) {
          selectedLabels.forEach((label: string) => {
            section += `- ${label}\n`;
          });
        } else {
          // If no values selected, show all available options
          labelValues.forEach((label: string) => {
            section += `- ${label}\n`;
          });
        }

        section += `<!-- Add any supporting notes as indented "- " entries beneath the kept values. -->\n`;
        break;

      case CriteriaTypes.TEXT:
        section += `<!-- Provide written details for ${criteria.name || criteria.id}. -->\n`;
        if (value && typeof value === 'string' && value.trim()) {
          const lines = value.split('\n');
          lines.forEach((line: string) => {
            section += `- ${line}\n`;
          });
        } else {
          section += `- \n`;
        }
        break;

      case CriteriaTypes.MARKDOWN:
        if (value && typeof value === 'string' && value.trim()) {
          const lines = value.split('\n');
          lines.forEach((line: string) => {
            section += `- ${line}\n`;
          });
        } else {
          section += `- \n`;
        }
        break;

      case CriteriaTypes.REPOSITORY:
        section += `<!-- List the relevant repository links for ${criteria.name || criteria.id} or remove if not applicable. -->\n`;
        if (value && typeof value === 'string' && value.trim()) {
          const lines = value.split('\n');
          lines.forEach((line: string) => {
            section += `- ${line}\n`;
          });
        } else {
          section += `- \n`;
        }
        break;

      case CriteriaTypes.RATING:
        section += `<!-- Provide the rating value for ${criteria.name || criteria.id} or remove if unknown. -->\n`;
        if (value && typeof value === 'string' && value.trim()) {
          section += `- ${value}\n`;
        } else {
          section += `- \n`;
        }
        break;

      default:
        section += `<!-- Add the appropriate content for ${criteria.name || criteria.id}. -->\n`;
        if (value && typeof value === 'string' && value.trim()) {
          section += `- ${value}\n`;
        } else {
          section += `- \n`;
        }
    }

    section += '\n';
    return section;
  }

  submitToGitHub(): void {
    if (!this.entryForm.get('_name')?.value || !this.entryForm.get('_url')?.value) {
      alert('Please provide at least a name and URL for the entry.');
      return;
    }

    const markdown = this.generateMarkdown();
    const name = this.entryForm.get('_name')?.value;

    // Determine repository info
    const repo = this.data.repository || {
      owner: 'cbruyndoncx',
      repo: 'awesome-comparisons',
      branch: 'main'
    };

    const filepath = `${this.data.dataset.sources.dataDir}/${this.filename}`;
    const message = `Add ${name} to ${this.data.dataset.displayLabel} comparisons`;
    const description = `This PR adds a new entry for ${name} to the ${this.data.dataset.displayLabel} dataset.`;

    this.githubIntentService.openNewFileIntent({
      owner: repo.owner,
      repo: repo.repo,
      branch: repo.branch,
      filepath,
      content: markdown,
      message,
      description
    });

    this.dialogRef.close({ action: 'submitted' });
  }

  downloadMarkdown(): void {
    const markdown = this.generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = this.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  copyToClipboard(): void {
    const markdown = this.generateMarkdown();
    const success = this.clipboard.copy(markdown);

    if (success) {
      alert('Markdown copied to clipboard!');
    } else {
      alert('Failed to copy to clipboard. Please try again.');
    }
  }

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }

  close(): void {
    this.dialogRef.close();
  }
}
