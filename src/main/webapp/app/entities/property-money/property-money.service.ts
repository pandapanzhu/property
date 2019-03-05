import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPropertyMoney } from 'app/shared/model/property-money.model';

type EntityResponseType = HttpResponse<IPropertyMoney>;
type EntityArrayResponseType = HttpResponse<IPropertyMoney[]>;

@Injectable({ providedIn: 'root' })
export class PropertyMoneyService {
    public resourceUrl = SERVER_API_URL + 'api/property-monies';

    constructor(protected http: HttpClient) {}

    create(propertyMoney: IPropertyMoney): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(propertyMoney);
        return this.http
            .post<IPropertyMoney>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(propertyMoney: IPropertyMoney): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(propertyMoney);
        return this.http
            .put<IPropertyMoney>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPropertyMoney>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPropertyMoney[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(propertyMoney: IPropertyMoney): IPropertyMoney {
        const copy: IPropertyMoney = Object.assign({}, propertyMoney, {
            createdDate:
                propertyMoney.createdDate != null && propertyMoney.createdDate.isValid() ? propertyMoney.createdDate.toJSON() : null,
            lastModifiedDate:
                propertyMoney.lastModifiedDate != null && propertyMoney.lastModifiedDate.isValid()
                    ? propertyMoney.lastModifiedDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
            res.body.lastModifiedDate = res.body.lastModifiedDate != null ? moment(res.body.lastModifiedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((propertyMoney: IPropertyMoney) => {
                propertyMoney.createdDate = propertyMoney.createdDate != null ? moment(propertyMoney.createdDate) : null;
                propertyMoney.lastModifiedDate = propertyMoney.lastModifiedDate != null ? moment(propertyMoney.lastModifiedDate) : null;
            });
        }
        return res;
    }
}
