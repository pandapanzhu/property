import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPropertyServe } from 'app/shared/model/property-serve.model';
import { PropertyServeService } from './property-serve.service';

@Component({
    selector: 'jhi-property-serve-update',
    templateUrl: './property-serve-update.component.html'
})
export class PropertyServeUpdateComponent implements OnInit {
    propertyServe: IPropertyServe;
    isSaving: boolean;
    createDate: string;
    update_date: string;

    constructor(protected propertyServeService: PropertyServeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ propertyServe }) => {
            this.propertyServe = propertyServe;
            this.createDate = this.propertyServe.createDate != null ? this.propertyServe.createDate.format(DATE_TIME_FORMAT) : null;
            this.update_date = this.propertyServe.update_date != null ? this.propertyServe.update_date.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.propertyServe.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.propertyServe.update_date = this.update_date != null ? moment(this.update_date, DATE_TIME_FORMAT) : null;
        if (this.propertyServe.id !== undefined) {
            this.subscribeToSaveResponse(this.propertyServeService.update(this.propertyServe));
        } else {
            this.subscribeToSaveResponse(this.propertyServeService.create(this.propertyServe));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPropertyServe>>) {
        result.subscribe((res: HttpResponse<IPropertyServe>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
