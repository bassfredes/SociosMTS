import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformacionComercialPage } from './informacion-comercial';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        InformacionComercialPage
    ],
    imports: [
        IonicPageModule.forChild(InformacionComercialPage),
        SharedModule
    ],
    exports: [
        InformacionComercialPage
    ]
})
export class InformacionComercialPageModule { }
