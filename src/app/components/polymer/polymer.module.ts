import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaperCardComponent } from './paper-card/paper-card.component';
import { IronIconComponent } from './iron-icon/iron-icon.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { PaperIconButtonComponent } from './paper-icon-button/paper-icon-button.component';
import { PaperButtonComponent } from './paper-button/paper-button.component';
import { PaperDialogComponent } from './paper-dialog/paper-dialog.component';
import { PaperItemComponent } from './paper-item/paper-item.component';
import { PaperCheckboxComponent } from './paper-checkbox/paper-checkbox.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        PaperCardComponent,
        IronIconComponent,
        TooltipComponent,
        PaperIconButtonComponent,
        PaperButtonComponent,
        PaperDialogComponent,
        PaperItemComponent,
        PaperCheckboxComponent
    ],
    declarations: [
        PaperCardComponent,
        IronIconComponent,
        TooltipComponent,
        PaperIconButtonComponent,
        PaperButtonComponent,
        PaperDialogComponent,
        PaperItemComponent,
        PaperCheckboxComponent
    ]
})
export class PolymerModule {
}
