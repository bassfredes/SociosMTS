import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiaDetallePage } from './noticia-detalle';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        NoticiaDetallePage,
    ],
    imports: [
        IonicPageModule.forChild(NoticiaDetallePage),
        SharedModule
    ],
    exports: [
        NoticiaDetallePage
    ]
})
export class NoticiaDetallePageModule { }
