import { COMPONENTS, DIRECTIVES, PIPES } from './app.imports';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TruncateModule } from 'ng2-truncate';
import { MomentModule } from 'angular2-moment';

@NgModule({
    declarations: [
        PIPES,
        DIRECTIVES,
        COMPONENTS
    ],
    imports: [
        IonicModule
    ],
    exports: [
        PIPES,
        COMPONENTS,
        TruncateModule,
        MomentModule
    ]
})

export class SharedModule { }
