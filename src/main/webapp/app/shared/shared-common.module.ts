import { NgModule } from '@angular/core';

import { PropertySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [PropertySharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [PropertySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PropertySharedCommonModule {}
