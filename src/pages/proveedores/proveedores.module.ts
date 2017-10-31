import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProveedoresPage } from './proveedores';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        ProveedoresPage,
    ],
    imports: [
        IonicPageModule.forChild(ProveedoresPage),
        SharedModule
    ],
    exports: [
        ProveedoresPage
    ]
})
export class ProveedoresPageModule { }
