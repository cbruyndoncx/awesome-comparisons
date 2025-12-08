import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SanitizerPipe } from "./sanitizer-pipe/sanitizer.pipe";
import { AsAnyPipe } from "./as-any.pipe";

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        SanitizerPipe,
        AsAnyPipe
    ],
    declarations: [
        SanitizerPipe,
        AsAnyPipe
    ],
    providers: [
        SanitizerPipe
    ]
})
export class PipesModule {
}