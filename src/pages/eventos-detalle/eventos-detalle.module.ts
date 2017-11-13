import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared.module';
import { EventosDetallePage } from './eventos-detalle';

@NgModule({
    declarations: [
        EventosDetallePage
    ],
    imports: [
        IonicPageModule.forChild(EventosDetallePage),
        SharedModule
    ],
    exports: [
        EventosDetallePage
    ]
})
export class EventosDetallePageModule { }
