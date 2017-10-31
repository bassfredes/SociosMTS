import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProveedorPage } from './proveedor';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        ProveedorPage,
    ],
    imports: [
        IonicPageModule.forChild(ProveedorPage),
        SharedModule
    ],
    exports: [
        ProveedorPage
    ]
})
export class ProveedorPageModule { }
