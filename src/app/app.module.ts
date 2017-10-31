import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import {MyApp} from './app.component';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {Storage} from '@ionic/storage';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Http} from '@angular/http';
import {CacheModule} from 'ionic-cache';

import {SharedModule} from './shared.module';
import {PROVIDERS, SERVICES, MODULES} from './app.imports';

let storage = new Storage({});

export function getAuthHttp(http) {
    return new AuthHttp(new AuthConfig({
        noJwtError: true,
        globalHeaders: [{ 'Accept': 'application/json' }],
        tokenGetter: (() => storage.get('id_token')),
    }), http);
}
@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        MODULES,
        IonicModule.forRoot(MyApp,{
            backButtonText: '',
            backButtonIcon: 'ios-arrow-back',
            iconMode: 'md',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
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
        {
            provide: AuthHttp,
            useFactory: getAuthHttp,
            deps: [Http]
        },
        SERVICES
    ]
})
export class AppModule { }
