import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PropertyServe } from 'app/shared/model/property-serve.model';
import { PropertyServeService } from './property-serve.service';
import { PropertyServeComponent } from './property-serve.component';
import { PropertyServeDetailComponent } from './property-serve-detail.component';
import { PropertyServeUpdateComponent } from './property-serve-update.component';
import { PropertyServeDeletePopupComponent } from './property-serve-delete-dialog.component';
import { IPropertyServe } from 'app/shared/model/property-serve.model';

@Injectable({ providedIn: 'root' })
export class PropertyServeResolve implements Resolve<IPropertyServe> {
    constructor(private service: PropertyServeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPropertyServe> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PropertyServe>) => response.ok),
                map((propertyServe: HttpResponse<PropertyServe>) => propertyServe.body)
            );
        }
        return of(new PropertyServe());
    }
}

@Injectable({ providedIn: 'root' })
export class PropertyServeListResolve implements Resolve<IPropertyServe[]> {
    constructor(private service: PropertyServeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPropertyServe[]> {
        const id = route.params['userId'] ? route.params['userId'] : null;
        if (id) {
            return this.service.findAllByUserId(id).pipe(
                filter((response: HttpResponse<IPropertyServe[]>) => response.ok),
                map((propertyServe: HttpResponse<IPropertyServe[]>) => this.newDate(propertyServe))
            );
        }
        return null;
    }

    newDate(propertyServe: HttpResponse<IPropertyServe[]>) {
        const body = propertyServe.body;
        for (const i in body) {
            if (body[i] !== null) {
                const date = body[i].createDate.format('YYYY-MM-DD');
                body[i].remark = date;
            }
        }
        return body;
    }
}

export const propertyServeRoute: Routes = [
    {
        path: '',
        component: PropertyServeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: '物业服务'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':userId/self',
        component: PropertyServeComponent,
        resolve: {
            pagingParams: PropertyServeListResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: '物业服务'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PropertyServeDetailComponent,
        resolve: {
            propertyServe: PropertyServeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: '物业服务'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PropertyServeUpdateComponent,
        resolve: {
            propertyServe: PropertyServeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: '物业服务'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PropertyServeUpdateComponent,
        resolve: {
            propertyServe: PropertyServeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: '物业服务'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const propertyServePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PropertyServeDeletePopupComponent,
        resolve: {
            propertyServe: PropertyServeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: '物业服务'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
