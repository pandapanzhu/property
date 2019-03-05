import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PropertySharedModule } from 'app/shared';
import {
    StuffComponent,
    StuffDetailComponent,
    StuffUpdateComponent,
    StuffDeletePopupComponent,
    StuffDeleteDialogComponent,
    stuffRoute,
    stuffPopupRoute
} from './';

const ENTITY_STATES = [...stuffRoute, ...stuffPopupRoute];

@NgModule({
    imports: [PropertySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [StuffComponent, StuffDetailComponent, StuffUpdateComponent, StuffDeleteDialogComponent, StuffDeletePopupComponent],
    entryComponents: [StuffComponent, StuffUpdateComponent, StuffDeleteDialogComponent, StuffDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertyStuffModule {}
