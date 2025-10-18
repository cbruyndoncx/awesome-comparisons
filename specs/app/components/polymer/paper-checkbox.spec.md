# Paper Checkbox Component

Angular component that implements a paper-style checkbox with accessibility support and OnPush change detection.

## Target

[@describe](../../../src/app/components/polymer/paper-checkbox/paper-checkbox.component.ts)

## Capabilities

### OnPush Change Detection

Uses OnPush change detection strategy for optimized performance.

### Label Input

Accepts a label string input to display next to the checkbox.

### Checked State Input

Accepts a checked boolean input to control the checkbox state.

### Checked Change Output

Emits checkedChange events when the checkbox state changes, providing the new boolean state.

### Accessibility Support

Provides proper accessibility attributes through host bindings:
- Sets role="checkbox" for screen readers
- Maintains tabindex="0" for keyboard navigation  
- Updates aria-checked attribute to reflect current state

### Click and Keyboard Interaction

Handles click events and keyboard interactions to toggle the checkbox state and emit the new state through checkedChange.

### Class-Based Styling

Uses class bindings in the template to apply styling rather than direct DOM renderer access.

## API

```typescript { .api }
export class PaperCheckboxComponent {
  @Input() label: string;
  @Input() checked: boolean;
  @Output() checkedChange: EventEmitter<boolean>;
  
  @HostBinding('attr.role') role: string;
  @HostBinding('attr.tabindex') tabindex: number;
  @HostBinding('attr.aria-checked') ariaChecked: boolean;
}
```