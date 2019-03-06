import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { LoginModalService, AccountService, Account } from 'app/core';
import { StuffService } from 'app/entities/stuff/stuff.service';
import { IStuff } from 'app/shared/model/stuff.model';
import { PropertyMoneyService } from 'app/entities/property-money/property-money.service';
import { IPropertyMoney } from 'app/shared/model/property-money.model';
import { PropertyServeService } from 'app/entities/property-serve/property-serve.service';
import { IPropertyServe } from 'app/shared/model/property-serve.model';

import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    stuff: IStuff;
    money: IPropertyMoney;
    serve: IPropertyServe;
    currentMoney: string = '0.00';

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private stuffService: StuffService,
        private propertyMoneyService: PropertyMoneyService,
        private propertyServeService: PropertyServeService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
            this.initData();
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    /**
    登录后的数据初始化
     */
    initData() {
        // 通过账号名称找到对应的用户
        this.stuffService
            .findByUserId(this.account.id)
            .subscribe((res: HttpResponse<IStuff>) => (this.stuff = res.body), 
                        (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.propertyMoneyService
            .findByUserId(this.account.id)
            .subscribe(
                (res: HttpResponse<IPropertyMoney>) => this.queryMoneySuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    queryMoneySuccess(data: IPropertyMoney, headers: HttpHeaders) {
        this.money = data;
        this.currentMoney =this.money==null ? '0.00' : this.money.isPay ? '0.00' : this.money.should + '';
    }

    onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    // 缴费弹框
    payProperty() {
        alert('您的账单将从余额自动扣除');
    }
}
