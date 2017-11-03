import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { InformacionComercialDetallePage } from './informacion-comercial-detalle';

@NgModule({
    declarations: [
        InformacionComercialDetallePage,
    ],
    imports: [
        IonicPageModule.forChild(InformacionComercialDetallePage),
        SharedModule
    ],
    exports: [
        InformacionComercialDetallePage
    ]
})
export class InformacionComercialDetallePageModule { }
