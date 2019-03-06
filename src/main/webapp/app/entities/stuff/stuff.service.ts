import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStuff } from 'app/shared/model/stuff.model';

type EntityResponseType = HttpResponse<IStuff>;
type EntityArrayResponseType = HttpResponse<IStuff[]>;

@Injectable({ providedIn: 'root' })
export class StuffService {
    public resourceUrl = SERVER_API_URL + 'api/stuffs';

    constructor(protected http: HttpClient) {}

    create(stuff: IStuff): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stuff);
        return this.http
            .post<IStuff>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(stuff: IStuff): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stuff);
        return this.http
            .put<IStuff>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStuff>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStuff[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    findByEmail(email: string): Observable<EntityResponseType> {
        return this.http
            .get<IStuff>(SERVER_API_URL + 'api/stuff' + `/${email}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findByUserId(email: number): Observable<EntityResponseType> {
        return this.http
            .get<IStuff>(SERVER_API_URL + 'api/stuff' + `/${email}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(stuff: IStuff): IStuff {
        const copy: IStuff = Object.assign({}, stuff, {
            createDate: stuff.createDate != null && stuff.createDate.isValid() ? stuff.createDate.toJSON() : null,
            update_date: stuff.update_date != null && stuff.update_date.isValid() ? stuff.update_date.toJSON() : null
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
            res.body.forEach((stuff: IStuff) => {
                stuff.createDate = stuff.createDate != null ? moment(stuff.createDate) : null;
                stuff.update_date = stuff.update_date != null ? moment(stuff.update_date) : null;
            });
        }
        return res;
    }
}
