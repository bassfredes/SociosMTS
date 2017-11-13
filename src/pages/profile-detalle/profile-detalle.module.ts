import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileDetallePage } from './profile-detalle';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        ProfileDetallePage,
    ],
    imports: [
        IonicPageModule.forChild(ProfileDetallePage),
        SharedModule
    ],
    exports: [
        ProfileDetallePage
    ]
})
export class ProfileDetallePageModule { }
