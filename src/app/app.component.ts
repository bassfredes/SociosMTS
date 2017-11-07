import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthService} from '../providers/auth-service';
import {AndroidFullScreen} from '@ionic-native/android-full-screen';
import {CacheService} from "ionic-cache";
import {ImgcacheService} from '../global/services';
import {AppVersion} from '@ionic-native/app-version';

import * as $ from 'jquery';
declare var google: any;

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = 'PreloaderPage';
    versionApp: any = "1.0.1";

    pages: Array<{ title: string, component: any, method?: any }>;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public authService: AuthService,
        public androidFullScreen: AndroidFullScreen,
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

        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(this.initializeApp());
    }
    initializeApp() {
        this.androidFullScreen.isImmersiveModeSupported().then(() => this.androidFullScreen.immersiveMode()).catch((error: any) => console.log(error));
        this.platform.ready().then(() => {
            this.cache.setDefaultTTL(60 * 60 * 12 * 7);
            this.cache.setOfflineInvalidate(false);
            this.imgcacheService.initImgCache().then(() => {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
                this.authService.startupTokenRefresh();
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
                this.nav.popToRoot({animate:false});
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
