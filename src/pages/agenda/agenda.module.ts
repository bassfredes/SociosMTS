import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaPage } from './agenda';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        AgendaPage,
    ],
    imports: [
        IonicPageModule.forChild(AgendaPage),
        SharedModule
    ],
    exports: [
        AgendaPage
    ]
})
export class AgendaPageModule { }
