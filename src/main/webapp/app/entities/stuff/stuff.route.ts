import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Stuff } from 'app/shared/model/stuff.model';
import { StuffService } from './stuff.service';
import { StuffComponent } from './stuff.component';
import { StuffDetailComponent } from './stuff-detail.component';
import { StuffUpdateComponent } from './stuff-update.component';
import { StuffDeletePopupComponent } from './stuff-delete-dialog.component';
import { IStuff } from 'app/shared/model/stuff.model';

@Injectable({ providedIn: 'root' })
export class StuffResolve implements Resolve<IStuff> {
    constructor(private service: StuffService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStuff> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Stuff>) => response.ok),
                map((stuff: HttpResponse<Stuff>) => stuff.body)
            );
        }
        return of(new Stuff());
    }
}

export const stuffRoute: Routes = [
    {
        path: '',
        component: StuffComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Stuffs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: StuffDetailComponent,
        resolve: {
            stuff: StuffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stuffs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: StuffUpdateComponent,
        resolve: {
            stuff: StuffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stuffs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: StuffUpdateComponent,
        resolve: {
            stuff: StuffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stuffs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stuffPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: StuffDeletePopupComponent,
        resolve: {
            stuff: StuffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stuffs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
