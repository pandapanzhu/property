/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PropertyTestModule } from '../../../test.module';
import { StuffUpdateComponent } from 'app/entities/stuff/stuff-update.component';
import { StuffService } from 'app/entities/stuff/stuff.service';
import { Stuff } from 'app/shared/model/stuff.model';

describe('Component Tests', () => {
    describe('Stuff Management Update Component', () => {
        let comp: StuffUpdateComponent;
        let fixture: ComponentFixture<StuffUpdateComponent>;
        let service: StuffService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PropertyTestModule],
                declarations: [StuffUpdateComponent]
            })
                .overrideTemplate(StuffUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StuffUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StuffService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Stuff(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stuff = entity;
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
                    const entity = new Stuff();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stuff = entity;
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
