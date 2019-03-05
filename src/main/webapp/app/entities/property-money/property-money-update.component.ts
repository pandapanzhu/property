import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPropertyMoney } from 'app/shared/model/property-money.model';
import { PropertyMoneyService } from './property-money.service';

@Component({
    selector: 'jhi-property-money-update',
    templateUrl: './property-money-update.component.html'
})
export class PropertyMoneyUpdateComponent implements OnInit {
    propertyMoney: IPropertyMoney;
    isSaving: boolean;
    createdDate: string;
    lastModifiedDate: string;

    constructor(protected propertyMoneyService: PropertyMoneyService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ propertyMoney }) => {
            this.propertyMoney = propertyMoney;
            this.createdDate = this.propertyMoney.createdDate != null ? this.propertyMoney.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastModifiedDate =
                this.propertyMoney.lastModifiedDate != null ? this.propertyMoney.lastModifiedDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.propertyMoney.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.propertyMoney.lastModifiedDate = this.lastModifiedDate != null ? moment(this.lastModifiedDate, DATE_TIME_FORMAT) : null;
        if (this.propertyMoney.id !== undefined) {
            this.subscribeToSaveResponse(this.propertyMoneyService.update(this.propertyMoney));
        } else {
            this.subscribeToSaveResponse(this.propertyMoneyService.create(this.propertyMoney));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPropertyMoney>>) {
        result.subscribe((res: HttpResponse<IPropertyMoney>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
