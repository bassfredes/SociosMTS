import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ProtectedPage } from '../protected-page/protected-page';
import { EventosService } from '../../providers/eventos-service';

import *  as AppConfig from '../../app/config';
@IonicPage()
@Component({
  selector: 'page-eventos-detalle',
  templateUrl: 'eventos-detalle.html',
})
export class EventosDetallePage extends ProtectedPage {
    private cfg: any;
    evento: any = [];
    attachments: any = [];
    eventoImagenPrincipal: string = "";
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public eventosService: EventosService,
        private photoViewer: PhotoViewer,
        public appCtrl: App) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
        this.evento = this.navParams.get('evento');
    }
    ionViewDidLoad() {
        if (this.evento === undefined || this.evento === null) {
            this.navCtrl.setRoot('EventosPage');
        }
        else {
            this.eventosService.getOne(this.evento._id).then(evento => {
                this.evento = evento;
                if (this.evento._attachments) {
                    this.attachments = Object.keys(this.evento._attachments);
                    this.eventoImagenPrincipal = this.cfg.apiUrl + '/eventos/' + this.evento._id + '/' + this.attachments[0];
                    this.attachments.shift();
                }
            });
        }
    }
    zoomPhoto(urlPhoto: string) {
        console.log(this.cfg.apiUrl+'/eventos/'+this.evento._id+'/'+urlPhoto);
        this.photoViewer.show(this.cfg.apiUrl+'/eventos/'+this.evento._id+'/'+urlPhoto);
    }

}
