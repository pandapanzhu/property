/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PropertyTestModule } from '../../../test.module';
import { PropertyMoneyDetailComponent } from 'app/entities/property-money/property-money-detail.component';
import { PropertyMoney } from 'app/shared/model/property-money.model';

describe('Component Tests', () => {
    describe('PropertyMoney Management Detail Component', () => {
        let comp: PropertyMoneyDetailComponent;
        let fixture: ComponentFixture<PropertyMoneyDetailComponent>;
        const route = ({ data: of({ propertyMoney: new PropertyMoney(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PropertyTestModule],
                declarations: [PropertyMoneyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PropertyMoneyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PropertyMoneyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.propertyMoney).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
