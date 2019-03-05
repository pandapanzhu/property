import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStuff } from 'app/shared/model/stuff.model';
import { StuffService } from './stuff.service';

@Component({
    selector: 'jhi-stuff-delete-dialog',
    templateUrl: './stuff-delete-dialog.component.html'
})
export class StuffDeleteDialogComponent {
    stuff: IStuff;

    constructor(protected stuffService: StuffService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stuffService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stuffListModification',
                content: 'Deleted an stuff'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stuff-delete-popup',
    template: ''
})
export class StuffDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stuff }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StuffDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.stuff = stuff;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/stuff', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/stuff', { outlets: { popup: null } }]);
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
