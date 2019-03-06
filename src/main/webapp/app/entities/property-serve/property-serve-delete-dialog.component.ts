import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPropertyServe } from 'app/shared/model/property-serve.model';
import { PropertyServeService } from './property-serve.service';

@Component({
    selector: 'jhi-property-serve-delete-dialog',
    templateUrl: './property-serve-delete-dialog.component.html'
})
export class PropertyServeDeleteDialogComponent {
    propertyServe: IPropertyServe;

    constructor(
        protected propertyServeService: PropertyServeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.propertyServeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'propertyServeListModification',
                content: 'Deleted an propertyServe'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-property-serve-delete-popup',
    template: ''
})
export class PropertyServeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ propertyServe }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PropertyServeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.propertyServe = propertyServe;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/property-serve', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/property-serve', { outlets: { popup: null } }]);
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
