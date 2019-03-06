/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PropertyTestModule } from '../../../test.module';
import { PropertyServeUpdateComponent } from 'app/entities/property-serve/property-serve-update.component';
import { PropertyServeService } from 'app/entities/property-serve/property-serve.service';
import { PropertyServe } from 'app/shared/model/property-serve.model';

describe('Component Tests', () => {
    describe('PropertyServe Management Update Component', () => {
        let comp: PropertyServeUpdateComponent;
        let fixture: ComponentFixture<PropertyServeUpdateComponent>;
        let service: PropertyServeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PropertyTestModule],
                declarations: [PropertyServeUpdateComponent]
            })
                .overrideTemplate(PropertyServeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PropertyServeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PropertyServeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PropertyServe(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.propertyServe = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PropertyServe();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.propertyServe = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
