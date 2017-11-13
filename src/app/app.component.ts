import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthService} from '../providers/auth-service';
import {AndroidFullScreen} from '@ionic-native/android-full-screen';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {CacheService} from "ionic-cache";
import {ImgcacheService} from '../global/services';
import {AppVersion} from '@ionic-native/app-version';

import * as $ from 'jquery';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = 'PreloaderPage';
    versionApp: any = "1.0.1";
    indicadoresEco: any;
    indicadoresEco_date: any;

    pages: Array<{ title: string, component: any, method?: any }>;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public authService: AuthService,
        public androidFullScreen: AndroidFullScreen,
        public screenOrientation: ScreenOrientation,
        public menuCtrl: MenuController,
        public imgcacheService: ImgcacheService,
        public appVersion: AppVersion,
        public cache: CacheService) {
        this.pages = [
            { title: "Inicio", component: "HomePage"},
            { title: 'Indicadores', component: 'IndicadoresPage'},
            { title: 'Proveedores', component: 'ProveedoresPage'},
            { title: 'Información Comercial', component: 'InformacionComercialPage'},
            { title: 'Noticias', component: 'NoticiasPage'},
            { title: 'Agenda', component: 'AgendaPage'},
            { title: 'Eventos', component: 'EventosPage'},
            { title: 'Mi Perfil', component: 'ProfilePage'},
            { title: 'Cerrar Sesión', component: 'LoginPage', method: 'logout'}
        ];
        this.initializeApp();
    }
    initializeApp() {
        this.androidFullScreen.isImmersiveModeSupported().then(() => this.androidFullScreen.immersiveMode()).catch((error: any) => console.log(error));
        this.platform.ready().then(() => {
            this.cache.setDefaultTTL(60 * 60 * 12);
            this.cache.setOfflineInvalidate(false);
            this.imgcacheService.initImgCache().then(() => {
                this.statusBar.hide();
                this.statusBar.overlaysWebView(false);
                this.splashScreen.hide();
                if ((<any>window).cordova) {
                    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
                }
                this.authService.startupTokenRefresh();
                this.authService.getIndicadoresEconomicos().then((indicadoresData) => {
                    this.indicadoresEco = indicadoresData;
                    this.indicadoresEco_date = new Date();
                });
            });
        });
    }
    openPage(page) {
        var pageActual = this.nav.getActive().name;
        this.menuCtrl.close();
        if (pageActual != page.component) {
            if(page.component == "HomePage") {
                this.nav.setRoot(page.component);
            }
            else if(page.component == "LoginPage") {
                this.nav.setRoot(page.component);
            }
            else {
                //this.nav.popToRoot({animate:false});
                this.nav.push(page.component);
            }
        }
        if (page.method && page.method === 'logout') {
            this.authService.logout();
        }
    }
    menuClosed() {
        $("ion-header .bar-button-menutoggle[right] .navicon-button").removeClass("open");
    }
    menuOpened() {
        $("ion-header .bar-button-menutoggle[right] .navicon-button").addClass("open");
    }
}
