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
    noticia: any = [];
    attachments: any = [];
    noticiaImagenPrincipal: string = "";
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
        this.noticia = this.navParams.get('noticia');
    }
    ionViewDidLoad() {
        if (this.noticia === undefined || this.noticia === null) {
            this.navCtrl.setRoot('HomePage');
        }
        else {
            this.noticiasService.getOne(this.noticia._id).then(noticia => {
                this.noticia = noticia;
                if (this.noticia._attachments) {
                    this.attachments = Object.keys(this.noticia._attachments);
                    this.noticiaImagenPrincipal = this.cfg.apiUrl + '/noticias/' + this.noticia._id + '/' + this.attachments[0];
                    this.attachments.shift();
                }
            });
        }
    }
    zoomPhoto(urlPhoto: string) {
        console.log(this.cfg.apiUrl+'/noticias/'+this.noticia._id+'/'+urlPhoto);
        this.photoViewer.show(this.cfg.apiUrl+'/noticias/'+this.noticia._id+'/'+urlPhoto);
    }

}
