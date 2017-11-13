import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConnectivityService } from '../../providers/connectivity-service';

@IonicPage()
@Component({
    selector: 'page-preloader',
    templateUrl: 'preloader.html',
})

export class PreloaderPage {
    mostrarContenido: boolean = false;
    mostrarLoader: boolean = false;
    statusOnline: boolean = true;
    constructor(
        public navCtrl: NavController,
        public storage: Storage,
        public connectivityService: ConnectivityService) {
    }
    ionViewDidLoad() {
        this.storage.get('id_token').then(id_token => {
            if (id_token === null) {
                this.navCtrl.setRoot('WelcomePage');
            }
            else {
                this.mostrarContenido = true;
                this.startPreload();
            }
        });
    }
    startPreload() {
        this.mostrarLoader = true;
        if (this.connectivityService.isOnline()) {
            this.statusOnline = true;
            this.navCtrl.setRoot('HomePage');
        }
        if (this.connectivityService.isOffline()) {
            this.statusOnline = false;
        }
    }

}
