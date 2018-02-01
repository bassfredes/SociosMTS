import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { CacheModule } from 'ionic-cache';

import { SharedModule } from './shared.module';
import { PROVIDERS, SERVICES, MODULES } from './app.imports';

let storage = new Storage({});
registerLocaleData(localeEsCL, 'es-CL');

export function getAuthHttp(http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        noJwtError: true,
        /* globalHeaders: [{ 'Content-Type': 'application/x-www-form-urlencoded' }, { 'Accept': 'application/json' }], // Produccion*/
        globalHeaders: [{ 'Accept': 'application/json' }], // Local
        tokenGetter: (() => storage.get('id_token')),
    }), http, options);
}
@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        MODULES,
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            backButtonIcon: 'ios-arrow-back',
            iconMode: 'md',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthShortNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
            dayShortNames: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        }),
        IonicStorageModule.forRoot(),
        CacheModule.forRoot(),
        SharedModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        PROVIDERS,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: LOCALE_ID, useValue: 'es-CL' },
        {
            provide: AuthHttp,
            useFactory: getAuthHttp,
            deps: [Http]
        },
        SERVICES
    ]
})
export class AppModule { }
