import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IStuff } from 'app/shared/model/stuff.model';
import { StuffService } from './stuff.service';

@Component({
    selector: 'jhi-stuff-update',
    templateUrl: './stuff-update.component.html'
})
export class StuffUpdateComponent implements OnInit {
    stuff: IStuff;
    isSaving: boolean;
    createDate: string;
    update_date: string;

    constructor(protected stuffService: StuffService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stuff }) => {
            this.stuff = stuff;
            this.createDate = this.stuff.createDate != null ? this.stuff.createDate.format(DATE_TIME_FORMAT) : null;
            this.update_date = this.stuff.update_date != null ? this.stuff.update_date.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.stuff.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.stuff.update_date = this.update_date != null ? moment(this.update_date, DATE_TIME_FORMAT) : null;
        if (this.stuff.id !== undefined) {
            this.subscribeToSaveResponse(this.stuffService.update(this.stuff));
        } else {
            this.subscribeToSaveResponse(this.stuffService.create(this.stuff));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStuff>>) {
        result.subscribe((res: HttpResponse<IStuff>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
