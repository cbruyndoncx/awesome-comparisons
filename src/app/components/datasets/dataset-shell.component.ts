// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../specs/app/components/datasets/dataset-shell.spec.md
// (spec:d50b8247) (code:5768cb57)

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasetManifestService, DatasetManifestEntry } from './dataset-manifest.service';

@Component({
    selector: 'uc-dataset-shell',
    templateUrl: './dataset-shell.component.html',
    styleUrls: ['./dataset-shell.component.css']
})
export class DatasetShellComponent implements OnInit {
    datasets$: Observable<DatasetManifestEntry[]>;
    activeDataset$: Observable<DatasetManifestEntry>;

    constructor(private manifestService: DatasetManifestService) {}

    ngOnInit(): void {
        this.datasets$ = this.manifestService.getDatasets();
        this.activeDataset$ = this.manifestService.getActiveDataset();
    }

    onDatasetSelected(datasetId: string): void {
        this.manifestService.setActiveDataset(datasetId);
    }
}
