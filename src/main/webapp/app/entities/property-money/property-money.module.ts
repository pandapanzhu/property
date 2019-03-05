import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PropertySharedModule } from 'app/shared';
import {
    PropertyMoneyComponent,
    PropertyMoneyDetailComponent,
    PropertyMoneyUpdateComponent,
    PropertyMoneyDeletePopupComponent,
    PropertyMoneyDeleteDialogComponent,
    propertyMoneyRoute,
    propertyMoneyPopupRoute
} from './';

const ENTITY_STATES = [...propertyMoneyRoute, ...propertyMoneyPopupRoute];

@NgModule({
    imports: [PropertySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PropertyMoneyComponent,
        PropertyMoneyDetailComponent,
        PropertyMoneyUpdateComponent,
        PropertyMoneyDeleteDialogComponent,
        PropertyMoneyDeletePopupComponent
    ],
    entryComponents: [
        PropertyMoneyComponent,
        PropertyMoneyUpdateComponent,
        PropertyMoneyDeleteDialogComponent,
        PropertyMoneyDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertyPropertyMoneyModule {}
