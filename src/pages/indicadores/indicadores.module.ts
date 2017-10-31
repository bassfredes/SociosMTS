import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { IndicadoresPage } from './indicadores';

@NgModule({
    declarations: [
        IndicadoresPage
    ],
    imports: [
        IonicPageModule.forChild(IndicadoresPage),
        SharedModule
    ],
    exports: [
        IndicadoresPage
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class IndicadoresPageModule { }
