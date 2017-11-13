import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        WelcomePage,
    ],
    imports: [
        IonicPageModule.forChild(WelcomePage),
        SharedModule
    ],
    exports: [
        WelcomePage
    ]
})
export class WelcomePageModule { }
