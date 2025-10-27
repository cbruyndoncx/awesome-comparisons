// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../specs/app/components/datasets/dataset-shell.spec.md
// (spec:d50b8247) (code:5768cb57)

import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { DatasetManifestService, DatasetManifestEntry } from './dataset-manifest.service';
import { ThemeService, Theme } from '../../theme/theme.service';

@Component({
    selector: 'uc-dataset-shell',
    templateUrl: './dataset-shell.component.html',
    styleUrls: ['./dataset-shell.component.css']
})
export class DatasetShellComponent implements OnInit {
    datasets$: Observable<DatasetManifestEntry[]>;
    activeDataset$: Observable<DatasetManifestEntry>;
    currentTheme$: Observable<Theme>;
    resolvedTheme$: Observable<'light' | 'dark'>;
    selectedDatasetIndex$: Observable<number>;

    constructor(private manifestService: DatasetManifestService,
                private themeService: ThemeService) {}

    ngOnInit(): void {
        this.datasets$ = this.manifestService.getDatasets();
        this.activeDataset$ = this.manifestService.getActiveDataset().pipe(
            tap(dataset => this.themeService.syncWithDataset(dataset)),
            shareReplay({ bufferSize: 1, refCount: true })
        );
        this.currentTheme$ = this.themeService.currentTheme$;
        this.resolvedTheme$ = this.themeService.resolvedTheme$;
        this.selectedDatasetIndex$ = combineLatest([this.datasets$, this.activeDataset$]).pipe(
            map(([datasets, active]) => {
                const index = datasets.findIndex(dataset => dataset.id === active?.id);
                return index >= 0 ? index : 0;
            }),
            shareReplay({ bufferSize: 1, refCount: true })
        );
    }

    onDatasetSelected(datasetId: string): void {
        this.manifestService.setActiveDataset(datasetId);
    }

    onTabIndexChange(index: number, datasets: DatasetManifestEntry[]): void {
        const target = datasets[index];
        if (target) {
            this.onDatasetSelected(target.id);
        }
    }

    onThemeSelected(theme: Theme): void {
        this.themeService.setTheme(theme);
    }

    cycleTheme(): void {
        this.themeService.cycleTheme();
    }
}
