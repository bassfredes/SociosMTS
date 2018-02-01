import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProtectedPage } from '../protected-page/protected-page';
import { EventosService } from '../../providers/eventos-service';
import { ConnectivityService } from '../../providers/connectivity-service';

import *  as AppConfig from '../../app/config';

@IonicPage()
@Component({
    selector: 'page-eventos',
    templateUrl: 'eventos.html',
})
export class EventosPage extends ProtectedPage {
    private cfg: any;
    eventos: any = [];
    offset: number = 0;
    limit: number = 3;
    totalRows: any = 0;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public appCtrl: App,
        public loading: LoadingController,
        public toastCtrl: ToastController,
        public eventosService: EventosService,
        public connectivityService: ConnectivityService) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
    }

    ionViewDidEnter() {
        this.eventosService.getRows().then(totalRows => {
            this.totalRows = totalRows;
            this.getEventos(false);
        });
        if (this.connectivityService.isOffline()) {
            let failed = this.toastCtrl.create({
                message: 'Necesitas conexión a internet para acceder a los Eventos MTS.',
                duration: 4000,
                position: 'bottom',
                closeButtonText: "OK"
            });
            failed.present();
            this.navCtrl.setRoot('HomePage');
        }
    }
    getEventos(infiniteScroll) {
        if (this.offset < this.totalRows) {
            let loader = this.loading.create({
                content: "Cargando..."
            });
            if (this.offset==0) {
                loader.present();
            }
            if (this.connectivityService.isOnline()) {
                this.eventosService.getAll(this.offset, this.limit).then(eventosData => {
                    this.eventos.push.apply(this.eventos, eventosData);
                    if (this.offset == 0) {
                        loader.dismiss().catch(() => { });
                    }
                    if (infiniteScroll) {
                        infiniteScroll.complete();
                    }
                    this.offset += 3;
                });
            }
        }
    }
    doInfinite(infiniteScroll) {
        if (this.offset < this.totalRows) {
            setTimeout(() => {
                this.getEventos(infiniteScroll);
            }, 500);
        }
        else {
            infiniteScroll.complete();
            infiniteScroll.enable(false);
        }
    }
    openPage(page: string, evento, participarB: boolean) {
        this.navCtrl.push(page, {
            evento: evento.doc,
            participar: participarB
        });
    }

}
