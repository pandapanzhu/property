import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPropertyServe } from 'app/shared/model/property-serve.model';

@Component({
    selector: 'jhi-property-serve-detail',
    templateUrl: './property-serve-detail.component.html'
})
export class PropertyServeDetailComponent implements OnInit {
    propertyServe: IPropertyServe;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ propertyServe }) => {
            this.propertyServe = propertyServe;
        });
    }

    previousState() {
        window.history.back();
    }
}
