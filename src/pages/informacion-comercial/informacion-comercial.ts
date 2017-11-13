import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Slides, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProtectedPage } from '../protected-page/protected-page';
import { InformercialService } from '../../providers/informercial-service';
import { ProductosService } from '../../providers/productos-service';

import *  as AppConfig from '../../app/config';
@IonicPage()
@Component({
    selector: 'page-informacion-comercial',
    templateUrl: 'informacion-comercial.html',
})

export class InformacionComercialPage extends ProtectedPage {
    @ViewChild('slider') slider: Slides;
    private cfg: any;
    slideIndex = 0;
    informerciales: any = [];
    informercialesIndex = 0;
    productosTop: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public appCtrl: App,
        public productosService: ProductosService,
        public informercialService: InformercialService) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
    }

    ionViewDidLoad() {
        this.informercialService.getAll().then(data => {
            this.informerciales = data;
        });
        this.productosService.getAll().then(datosProductos => {
            this.productosTop = datosProductos;
        });
    }
    onSlideChanged() {
        this.slideIndex = this.slider.getActiveIndex();
    }
    openPage(page: string, informercial) {
        this.navCtrl.push(page, {
            informercial: informercial.doc
        });
    }

}
