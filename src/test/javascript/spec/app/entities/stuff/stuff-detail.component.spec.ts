/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PropertyTestModule } from '../../../test.module';
import { StuffDetailComponent } from 'app/entities/stuff/stuff-detail.component';
import { Stuff } from 'app/shared/model/stuff.model';

describe('Component Tests', () => {
    describe('Stuff Management Detail Component', () => {
        let comp: StuffDetailComponent;
        let fixture: ComponentFixture<StuffDetailComponent>;
        const route = ({ data: of({ stuff: new Stuff(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PropertyTestModule],
                declarations: [StuffDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StuffDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StuffDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stuff).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
