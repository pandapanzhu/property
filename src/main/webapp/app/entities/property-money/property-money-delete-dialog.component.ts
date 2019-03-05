import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPropertyMoney } from 'app/shared/model/property-money.model';
import { PropertyMoneyService } from './property-money.service';

@Component({
    selector: 'jhi-property-money-delete-dialog',
    templateUrl: './property-money-delete-dialog.component.html'
})
export class PropertyMoneyDeleteDialogComponent {
    propertyMoney: IPropertyMoney;

    constructor(
        protected propertyMoneyService: PropertyMoneyService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.propertyMoneyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'propertyMoneyListModification',
                content: 'Deleted an propertyMoney'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-property-money-delete-popup',
    template: ''
})
export class PropertyMoneyDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ propertyMoney }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PropertyMoneyDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.propertyMoney = propertyMoney;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/property-money', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/property-money', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
