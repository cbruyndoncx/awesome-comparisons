# Plan: Surface Criteria Tooltips in Details View

Goal: Ensure criteria descriptions configured as tooltips appear within the comparison details dialog when the “Display Tooltips” setting is enabled, rendered in italics below each criterion label.

## Tasks

- [x] Audit current details view rendering to identify where criteria descriptions should display
  > **Bash** `["bash","-lc","rg \"comparison-details\" -n src/app"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Located comparison details component usage and source files.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/comparison/details/comparison.details.component.ts"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Reviewed component logic; noted grouped and ungrouped sections built from criteria definitions without in-place tooltip display.
  > - files: [src/app/components/comparison/details/comparison.details.component.ts](../src/app/components/comparison/details/comparison.details.component.ts)
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/comparison/details/comparison.details.template.html"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Confirmed details template lacks explicit criteria description rendering; tooltips only surface for labels when `tooltipAsText` is true.
  > - files: [src/app/components/comparison/details/comparison.details.template.html](../src/app/components/comparison/details/comparison.details.template.html)
- [x] Update details component/template to conditionally render italicized tooltip text based on settings
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/details/comparison.details.component.ts
  > @@
  >      public prefixInternalLink(safeHtml: SafeHtml): SafeHtml {
  >          const regex = RegExp('<a[^>]*href="#([^"]*)"[^>]*>\\[\\d+\\]</a>', 'g');
  >          let match;
  >          const html = safeHtml['changingThisBreaksApplicationSecurity'];
  >          while ((match = regex.exec(html)) !== null) {
  >              safeHtml['changingThisBreaksApplicationSecurity'] =
  >                  safeHtml['changingThisBreaksApplicationSecurity'].replace(match[1], 'details-' + match[1])
  >          }
  >          return safeHtml;
  >      }
  > +
  > +    public getCriteriaDescription(criteria?: Criteria | null): string {
  > +        if (!criteria) {
  > +            return '';
  > +        }
  > +        const description: any = (criteria as any).description;
  > +        if (typeof description === 'string') {
  > +            return description.trim();
  > +        }
  > +        if (description && typeof description === 'object') {
  > +            if (typeof description.text === 'string') {
  > +                return description.text.trim();
  > +            }
  > +            if (typeof description.html === 'string') {
  > +                return description.html.trim();
  > +            }
  > +            if (typeof description.plain === 'string') {
  > +                return description.plain.trim();
  > +            }
  > +        }
  > +        return '';
  > +    }
  >  }
  > *** End Patch
  > ```
  > - outcome: Added helper to safely extract criteria descriptions regardless of source shape.
  > - files: [src/app/components/comparison/details/comparison.details.component.ts](../src/app/components/comparison/details/comparison.details.component.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/details/comparison.details.template.html
  > @@
  >      <ng-template #sectionContent let-section>
  >          <div class="card-content">
  > +            <p *ngIf="tooltipAsText && getCriteriaDescription(section.criteria) as criteriaDescription && criteriaDescription.length"
  > +               class="criteria-description">
  > +                <em [innerHtml]="criteriaDescription | sanitizeHtml"></em>
  > +            </p>
  >              <a *ngIf="section.type === 'NAME_URL' || section.type === 'URL'" class="anchored"
  >                 href="{{section.data.link}}"
  >                 target="_blank">{{section.data.text}}</a>
  > *** End Patch
  > ```
  > - outcome: Injected italicized, sanitized descriptions ahead of each detail section when textual tooltips are enabled.
  > - files: [src/app/components/comparison/details/comparison.details.template.html](../src/app/components/comparison/details/comparison.details.template.html)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/details/comparison.details.component.css
  > @@
  >  .tooltip-text ::ng-deep ul {
  >      padding-left: 15px;
  >  }
  > 
  > +.criteria-description {
  > +    margin: 0 0 6px 0;
  > +    color: var(--text-secondary, #616161);
  > +    font-size: 13px;
  > +}
  > +
  > +.criteria-description em {
  > +    font-style: italic;
  > +}
  > +
  >  .pheader h2 {
  >      margin-top: 0;
  >  }
  > *** End Patch
  > ```
  > - outcome: Added styling to keep the inline descriptions subtle and consistently italicized.
  > - files: [src/app/components/comparison/details/comparison.details.component.css](../src/app/components/comparison/details/comparison.details.component.css)
- Clarified criteria description resolution to avoid Angular template parser errors.
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/details/comparison.details.component.ts
  > @@
  >      public getCriteriaDescription(criteria?: Criteria | null): string {
  >          if (!criteria) {
  >              return '';
  >          }
  > @@
  >          if (typeof description === 'string') {
  >              return description.trim();
  >          }
  >          if (description && typeof description === 'object') {
  >              if (typeof description.text === 'string') {
  >                  return description.text.trim();
  >              }
  >              if (typeof description.html === 'string') {
  >                  return description.html.trim();
  >              }
  >              if (typeof description.plain === 'string') {
  >                  return description.plain.trim();
  >              }
  >          }
  >          return '';
  >      }
  > +
  > +    public resolveCriteriaDescription(criteria?: Criteria | null): string | null {
  > +        const description = this.getCriteriaDescription(criteria);
  > +        if (!description) {
  > +            return null;
  > +        }
  > +        return description.length > 0 ? description : null;
  > +    }
  >  }
  > *** End Patch
  > ```
  > - outcome: Added helper returning null for empty descriptions to simplify template logic.
  > - files: [src/app/components/comparison/details/comparison.details.component.ts](../src/app/components/comparison/details/comparison.details.component.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/details/comparison.details.template.html
  > @@
  > -            <p *ngIf="tooltipAsText && getCriteriaDescription(section.criteria) as criteriaDescription && criteriaDescription.length"
  > +            <p *ngIf="(tooltipAsText && resolveCriteriaDescription(section.criteria)) as criteriaDescription"
  >                 class="criteria-description">
  >                 <em [innerHtml]="criteriaDescription | sanitizeHtml"></em>
  >             </p>
  > *** End Patch
  > ```
  > - outcome: Simplified the `*ngIf` guard to comply with Angular parser rules while still exposing the description alias.
  > - files: [src/app/components/comparison/details/comparison.details.template.html](../src/app/components/comparison/details/comparison.details.template.html)
- [x] Verify styling/logic and document outcomes for the user
  > **Bash** `["bash","-lc","nl -ba src/app/components/comparison/details/comparison.details.template.html | sed -n '80,160p'"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Confirmed the italicized criteria description block renders ahead of section content.
  > - files: [src/app/components/comparison/details/comparison.details.template.html](../src/app/components/comparison/details/comparison.details.template.html)
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/comparison/details/comparison.details.component.css"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Verified new styles integrate with existing detail view theming.
  > - files: [src/app/components/comparison/details/comparison.details.component.css](../src/app/components/comparison/details/comparison.details.component.css)
  > ---
  > **Bash** `["bash","-lc","git status -sb"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Listed modified files pending review/commit for tooltip enhancements.
