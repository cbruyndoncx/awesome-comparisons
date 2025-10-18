# Select2 Component

Multi-select toggle button component for selecting criteria values.

## Target

[@describe](../../../src/app/components/input/select2/select2.component.ts)

## Capabilities

### Renders toggle buttons for multi-selection

Displays a list of toggle buttons that allow users to select multiple criteria values from the available options.

### Change detection optimization

Uses OnPush change detection strategy for improved performance.

### Configurable component inputs

Exposes inputs for customizing component behavior:
- options: Available selection options
- maximumSelectionLength: Limit on number of selections
- placeholder: Display text when no selections made
- tag: Component identifier
- name: Form control name
- active: Current selected values

### Selection event emission

Emits a result event when a value is toggled, allowing parent components to respond to selection changes.

### Selection state synchronization

Syncs selected state when the active input or change marker updates, ensuring UI reflects current selection state.

### Programmatic selection control

Provides addToGui method that allows parent components to mark a value as selected without triggering the result event emission.

## API

```typescript { .api }
@Component({
  selector: 'uc-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Select2Component {
  @Input() options: any[];
  @Input() maximumSelectionLength: number;
  @Input() placeholder: string;
  @Input() tag: string;
  @Input() name: string;
  @Input() active: any[];
  
  @Output() result = new EventEmitter<any>();
  
  addToGui(value: any): void;
}
```

## Dependencies

### Null-check helper utility

Used for validating and handling null/undefined values safely.
[@use](../../../src/app/shared/utils/null-check)