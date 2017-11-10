import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProtectedPage } from '../protected-page/protected-page';
import { InformercialService } from '../../providers/informercial-service';

import *  as AppConfig from '../../app/config';
import * as $ from 'jquery';
@IonicPage()
@Component({
    selector: 'page-informacion-comercial-detalle',
    templateUrl: 'informacion-comercial-detalle.html',
})
export class InformacionComercialDetallePage extends ProtectedPage {
    private cfg: any;
    informercial: any = [];
    imagenPrincipal: any;
    attachments: any;
    clickParticipar:boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public appCtrl: App,
        public informercialService: InformercialService) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
        this.informercial = this.navParams.get('informercial');
    }

    ionViewDidLoad() {
        if (this.informercial === undefined || this.informercial === null) {
            this.navCtrl.setRoot('InformacionComercialPage');
        }
        else {
            this.informercialService.getOne(this.informercial._id).then(infomercialData => {
                this.informercial = infomercialData;
                if (this.informercial._attachments) {
                    this.attachments = Object.keys(this.informercial._attachments);
                    this.imagenPrincipal = this.cfg.apiUrl + '/inforcomercial/' + this.informercial._id + '/' + this.attachments[0];
                    this.attachments.shift();
                }
            });
        }
    }
    participar() {
        if(!this.clickParticipar){
            let alert = this.alertCtrl.create({
                title: 'Confirmar Participación',
                message: '¿Estás seguro que quieres participar?',
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        handler: () => { }
                    },
                    {
                        text: 'Aceptar',
                        handler: () => {
                            this.clickParticipar = true;
                            const parent = this;
                            $(".prevParticipar").stop().fadeOut(300, function(){
                                $(".postParticipar").fadeIn(300);
                                parent.informercial.participando = true;
                            });
                        }
                    }
                ]
            });
            alert.present();
        }
    }

}
