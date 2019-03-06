/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PropertyTestModule } from '../../../test.module';
import { PropertyServeDeleteDialogComponent } from 'app/entities/property-serve/property-serve-delete-dialog.component';
import { PropertyServeService } from 'app/entities/property-serve/property-serve.service';

describe('Component Tests', () => {
    describe('PropertyServe Management Delete Component', () => {
        let comp: PropertyServeDeleteDialogComponent;
        let fixture: ComponentFixture<PropertyServeDeleteDialogComponent>;
        let service: PropertyServeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PropertyTestModule],
                declarations: [PropertyServeDeleteDialogComponent]
            })
                .overrideTemplate(PropertyServeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PropertyServeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PropertyServeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
