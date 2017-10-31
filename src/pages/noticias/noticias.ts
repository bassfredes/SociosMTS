import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProtectedPage } from '../protected-page/protected-page';
import { NoticiasService } from '../../providers/noticias-service';

import *  as AppConfig from '../../app/config';
@IonicPage()
@Component({
    selector: 'page-noticias',
    templateUrl: 'noticias.html',
})
export class NoticiasPage extends ProtectedPage {
    private cfg: any;
    noticias: any = [];
    offset: number = 0;
    limit: number = 3;
    totalRows: any = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public noticiasService: NoticiasService,
        public loading: LoadingController,
        public appCtrl: App) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
    }
    ionViewDidLoad() {
        this.noticiasService.getRows().then(totalRows => {
            this.totalRows = totalRows;
            this.getNoticias(false);
        });
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
            });
        }
    }
    doInfinite(infiniteScroll) {
        this.offset += 3;
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
    openPage(page: string, noticia) {
        this.navCtrl.push(page, {
            noticia: noticia.doc
        });
    }
}
