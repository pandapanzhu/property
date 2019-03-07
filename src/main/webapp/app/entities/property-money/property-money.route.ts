import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PropertyMoney } from 'app/shared/model/property-money.model';
import { PropertyMoneyService } from './property-money.service';
import { PropertyMoneyComponent } from './property-money.component';
import { PropertyMoneyDetailComponent } from './property-money-detail.component';
import { PropertyMoneyUpdateComponent } from './property-money-update.component';
import { PropertyMoneyDeletePopupComponent } from './property-money-delete-dialog.component';
import { IPropertyMoney } from 'app/shared/model/property-money.model';

@Injectable({ providedIn: 'root' })
export class PropertyMoneyResolve implements Resolve<IPropertyMoney> {
    constructor(private service: PropertyMoneyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPropertyMoney> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PropertyMoney>) => response.ok),
                map((propertyMoney: HttpResponse<PropertyMoney>) => propertyMoney.body)
            );
        }
        return of(new PropertyMoney());
    }
}

@Injectable({ providedIn: 'root' })
export class PropertyMoneyListResolve implements Resolve<IPropertyMoney[]> {
    constructor(private service: PropertyMoneyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPropertyMoney[]> {
        const id = route.params['userId'] ? route.params['userId'] : null;
        if (id) {
            return this.service.findAllByUserId(id).pipe(
                filter((response: HttpResponse<PropertyMoney[]>) => response.ok),
                map((propertyMoney: HttpResponse<PropertyMoney[]>) => propertyMoney.body)
            );
        }
        return null;
    }
}

export const propertyMoneyRoute: Routes = [
    {
        path: '',
        component: PropertyMoneyComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: '我的订单'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':userId/self',
        component: PropertyMoneyComponent,
        resolve: {
            pagingParams: PropertyMoneyListResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: '我的订单'
        },
        canActivate: [UserRouteAccessService]
    },

    {
        path: ':id/view',
        component: PropertyMoneyDetailComponent,
        resolve: {
            propertyMoney: PropertyMoneyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: '我的订单'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PropertyMoneyUpdateComponent,
        resolve: {
            propertyMoney: PropertyMoneyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: '我的订单'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PropertyMoneyUpdateComponent,
        resolve: {
            propertyMoney: PropertyMoneyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: '我的订单'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const propertyMoneyPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PropertyMoneyDeletePopupComponent,
        resolve: {
            propertyMoney: PropertyMoneyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: '我的订单'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
