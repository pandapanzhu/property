import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPropertyServe } from 'app/shared/model/property-serve.model';

type EntityResponseType = HttpResponse<IPropertyServe>;
type EntityArrayResponseType = HttpResponse<IPropertyServe[]>;

@Injectable({ providedIn: 'root' })
export class PropertyServeService {
    public resourceUrl = SERVER_API_URL + 'api/property-serves';

    constructor(protected http: HttpClient) {}

    create(propertyServe: IPropertyServe): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(propertyServe);
        return this.http
            .post<IPropertyServe>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(propertyServe: IPropertyServe): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(propertyServe);
        return this.http
            .put<IPropertyServe>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPropertyServe>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPropertyServe[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    findAllByUserId(id: number): Observable<EntityArrayResponseType> {
        return this.http
            .get<IPropertyServe[]>(SERVER_API_URL + 'api/allPropertyServe' + `/${id}`, { observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(propertyServe: IPropertyServe): IPropertyServe {
        const copy: IPropertyServe = Object.assign({}, propertyServe, {
            createDate: propertyServe.createDate != null && propertyServe.createDate.isValid() ? propertyServe.createDate.toJSON() : null,
            update_date:
                propertyServe.update_date != null && propertyServe.update_date.isValid() ? propertyServe.update_date.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
            res.body.update_date = res.body.update_date != null ? moment(res.body.update_date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((propertyServe: IPropertyServe) => {
                propertyServe.createDate = propertyServe.createDate != null ? moment(propertyServe.createDate) : null;
                propertyServe.update_date = propertyServe.update_date != null ? moment(propertyServe.update_date) : null;
            });
        }
        return res;
    }
}
