import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreloaderPage } from './preloader';
import { SharedModule } from '../../app/shared.module';

@NgModule({
    declarations: [
        PreloaderPage,
    ],
    imports: [
        IonicPageModule.forChild(PreloaderPage),
        SharedModule
    ],
    exports: [
        PreloaderPage
    ]
})
export class PreloaderPageModule { }
