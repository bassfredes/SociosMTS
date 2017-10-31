import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProtectedPage } from '../protected-page/protected-page';

@IonicPage()
@Component({
    selector: 'page-informacion-comercial',
    templateUrl: 'informacion-comercial.html',
})

export class InformacionComercialPage extends ProtectedPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public appCtrl: App) {
        super(navCtrl, navParams, storage, appCtrl);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InformacionComercialPage');
    }

}
