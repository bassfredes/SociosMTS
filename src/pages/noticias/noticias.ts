import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { ProtectedPage } from '../protected-page/protected-page';
import { NoticiasService } from '../../providers/noticias-service';
import { ConnectivityService } from '../../providers/connectivity-service';

import *  as AppConfig from '../../app/config';
@IonicPage()
@Component({
    selector: 'page-noticias',
    templateUrl: 'noticias.html',
})
export class NoticiasPage extends ProtectedPage {
    private cfg: any;
    noticias: any = [];
    noticiasFiltered: any = [];
    offset: number = 0;
    limit: number = 3;
    totalRows: any = 0;

    resultados: boolean = true;

    term: string = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public toastCtrl: ToastController,
        public noticiasService: NoticiasService,
        public loading: LoadingController,
        public appCtrl: App,
        public connectivityService: ConnectivityService,
        public keyboard: Keyboard) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
    }
    searchSubmit() {
        this.keyboard.close();
        if (this.term) {
            let loader = this.loading.create({
                content: "Cargando..."
            });
            loader.present();
            this.offset = this.totalRows;
            this.noticiasService.getAll(0, false).then(noticias => {
                this.noticias = noticias;
                this.noticias = this.noticias.filter((noticia) => {
                    return (noticia.content.rendered.toLowerCase().indexOf(this.term.toLowerCase()) > -1);
                })
                if (this.noticias.length == 0) {
                    this.resultados = false;
                }
                else {
                    this.resultados = true;
                }
                loader.dismiss().catch(() => { });
            });
        }
    }
    ionViewDidLoad() {
        this.noticiasService.getRows().then(totalRows => {
            this.totalRows = totalRows;
            this.getNoticias(false);
        });
        if (this.connectivityService.isOffline()) {
            let failed = this.toastCtrl.create({
                message: 'Necesitas conexión a internet para ver las últimas noticias de MTS.',
                duration: 4000,
                position: 'bottom',
                closeButtonText: "OK"
            });
            failed.present();
        }
    }
    getNoticias(infiniteScroll) {
        if (this.offset < this.totalRows) {
            let loader = this.loading.create({
                content: "Cargando..."
            });
            if (this.offset==0) {
                loader.present();
            }
            this.noticiasService.getAll(this.offset, this.limit).then(noticias => {
                this.noticias.push.apply(this.noticias, noticias);
                if (this.offset==0) {
                    loader.dismiss().catch(() => { });
                }
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
                this.offset += 3;
            });
        }
    }
    doInfinite(infiniteScroll) {
        if (this.offset < this.totalRows) {
            setTimeout(() => {
                this.getNoticias(infiniteScroll);
            }, 500);
        }
        else {
            infiniteScroll.complete();
            infiniteScroll.enable(false);
        }
    }
    openPage(page: string, dataNoticia) {
        this.navCtrl.push('NoticiaDetallePage', {
            noticia: dataNoticia
        });
    }
}
