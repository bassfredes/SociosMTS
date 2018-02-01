import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ProtectedPage } from '../protected-page/protected-page';
import { NoticiasService } from '../../providers/noticias-service';

import *  as AppConfig from '../../app/config';
@IonicPage()
@Component({
    selector: 'page-noticia-detalle',
    templateUrl: 'noticia-detalle.html',
})
export class NoticiaDetallePage extends ProtectedPage {
    private cfg: any;
    noticia: any = false;
    attachments: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public noticiasService: NoticiasService,
        private photoViewer: PhotoViewer,
        public appCtrl: App) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
    }
    ionViewDidLoad() {
        this.noticia = this.navParams.get('noticia');
        if (this.noticia === undefined || this.noticia === null) {
            this.navCtrl.setRoot('HomePage');
        }
    }
    zoomPhoto(urlPhoto: string) {
        //this.photoViewer.show(this.cfg.apiUrl+'/noticias/'+this.noticia._id+'/'+urlPhoto);
    }

}
