import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventosPage } from './eventos';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        EventosPage
    ],
    imports: [
        IonicPageModule.forChild(EventosPage),
        SharedModule
    ],
    exports: [
        EventosPage
    ]
})
export class EventosPageModule { }
