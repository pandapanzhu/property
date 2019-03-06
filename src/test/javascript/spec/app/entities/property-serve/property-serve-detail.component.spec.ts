/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PropertyTestModule } from '../../../test.module';
import { PropertyServeDetailComponent } from 'app/entities/property-serve/property-serve-detail.component';
import { PropertyServe } from 'app/shared/model/property-serve.model';

describe('Component Tests', () => {
    describe('PropertyServe Management Detail Component', () => {
        let comp: PropertyServeDetailComponent;
        let fixture: ComponentFixture<PropertyServeDetailComponent>;
        const route = ({ data: of({ propertyServe: new PropertyServe(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PropertyTestModule],
                declarations: [PropertyServeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PropertyServeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PropertyServeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.propertyServe).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
