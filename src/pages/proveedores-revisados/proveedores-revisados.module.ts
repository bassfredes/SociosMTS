import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProveedoresRevisadosPage } from './proveedores-revisados';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        ProveedoresRevisadosPage,
    ],
    imports: [
        IonicPageModule.forChild(ProveedoresRevisadosPage),
        SharedModule
    ],
    exports: [
        ProveedoresRevisadosPage
    ]
})
export class ProveedoresRevisadosPageModule { }
