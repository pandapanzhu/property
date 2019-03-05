import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'stuff',
                loadChildren: './stuff/stuff.module#PropertyStuffModule'
            },
            {
                path: 'property-serve',
                loadChildren: './property-serve/property-serve.module#PropertyPropertyServeModule'
            },
            {
                path: 'property-money',
                loadChildren: './property-money/property-money.module#PropertyPropertyMoneyModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertyEntityModule {}
