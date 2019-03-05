import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPropertyMoney } from 'app/shared/model/property-money.model';

@Component({
    selector: 'jhi-property-money-detail',
    templateUrl: './property-money-detail.component.html'
})
export class PropertyMoneyDetailComponent implements OnInit {
    propertyMoney: IPropertyMoney;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ propertyMoney }) => {
            this.propertyMoney = propertyMoney;
        });
    }

    previousState() {
        window.history.back();
    }
}
