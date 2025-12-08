import { NgModule } from '@angular/core';
// Provider imports
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ComparisonDetailsComponent } from './details/comparison.details.component';
import { ComparisonComponent } from './comparison.component';
import { PipesModule } from '../pipes/pipes.module';
import { InputModule } from '../input/input.module';
import { OutputModule } from '../output/output.module';
import { PolymerModule } from '../polymer/polymer.module';
import { ConfigurationService } from './configuration/configuration.service';
import { ComparisonSettingsComponent } from './settings/comparison.settings.component';
import { FocusedComparisonSheetComponent } from './sheet/focused-comparison-sheet.component';
import { AddEntryModalComponent } from './add-entry/add-entry-modal.component';
import { GitHubIntentService } from '../../shared/services/github-intent.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatDialogModule,
        ClipboardModule,
        InputModule,
        OutputModule,
        PipesModule,
        PolymerModule
    ],
    exports: [
        ComparisonComponent
    ],
    declarations: [
        ComparisonComponent,
        ComparisonDetailsComponent,
        ComparisonSettingsComponent,
        FocusedComparisonSheetComponent,
        AddEntryModalComponent
    ],
    providers: [
        ConfigurationService,
        GitHubIntentService,
        Title,
        HttpClient
    ]
})
export class ComparisonModule {
}
