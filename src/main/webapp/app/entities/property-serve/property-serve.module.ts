import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PropertySharedModule } from 'app/shared';
import {
    PropertyServeComponent,
    PropertyServeDetailComponent,
    PropertyServeUpdateComponent,
    PropertyServeDeletePopupComponent,
    PropertyServeDeleteDialogComponent,
    propertyServeRoute,
    propertyServePopupRoute
} from './';

const ENTITY_STATES = [...propertyServeRoute, ...propertyServePopupRoute];

@NgModule({
    imports: [PropertySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PropertyServeComponent,
        PropertyServeDetailComponent,
        PropertyServeUpdateComponent,
        PropertyServeDeleteDialogComponent,
        PropertyServeDeletePopupComponent
    ],
    entryComponents: [
        PropertyServeComponent,
        PropertyServeUpdateComponent,
        PropertyServeDeleteDialogComponent,
        PropertyServeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertyPropertyServeModule {}
