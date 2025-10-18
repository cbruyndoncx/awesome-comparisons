import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Select2Component } from "./select2/select2.component";
import { NumberInputComponent } from "./number-input/number-input.component";

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        Select2Component,
        NumberInputComponent
    ],
    declarations: [
        Select2Component,
        NumberInputComponent
    ],
    providers: []
})
export class InputModule {
}
