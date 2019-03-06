/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PropertyTestModule } from '../../../test.module';
import { PropertyMoneyUpdateComponent } from 'app/entities/property-money/property-money-update.component';
import { PropertyMoneyService } from 'app/entities/property-money/property-money.service';
import { PropertyMoney } from 'app/shared/model/property-money.model';

describe('Component Tests', () => {
    describe('PropertyMoney Management Update Component', () => {
        let comp: PropertyMoneyUpdateComponent;
        let fixture: ComponentFixture<PropertyMoneyUpdateComponent>;
        let service: PropertyMoneyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PropertyTestModule],
                declarations: [PropertyMoneyUpdateComponent]
            })
                .overrideTemplate(PropertyMoneyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PropertyMoneyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PropertyMoneyService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PropertyMoney(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.propertyMoney = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PropertyMoney();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.propertyMoney = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
