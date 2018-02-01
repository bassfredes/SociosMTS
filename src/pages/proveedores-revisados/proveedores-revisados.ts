import { ViewChild, Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, App, VirtualScroll } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { ProtectedPage } from '../protected-page/protected-page';

import { proveedorModel } from '../../models/proveedor.model';
import { ProveedoresService } from '../../providers/proveedores-service';

import *  as AppConfig from '../../app/config';
import * as $ from 'jquery';

@IonicPage()
@Component({
    selector: 'page-proveedores-revisados',
    templateUrl: 'proveedores-revisados.html',
})

export class ProveedoresRevisadosPage extends ProtectedPage {
    private cfg: any;
    public proveedor = proveedorModel;
    proveedoresRevisados: any = [];
    proveedoresRevisadosFiltered: any = [];
    id_ferreteria: string = "1";

    term: string = '';
    revisados: boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public appCtrl: App,
        public loading: LoadingController,
        public proveedoresService: ProveedoresService,
        public keyboard: Keyboard) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
        this.proveedoresRevisados = this.navParams.get('proveedores');
    }
    searchFn(ev: any) {
        this.term = ev.target.value;
        if (this.term) {
            this.proveedoresRevisadosFiltered = this.proveedoresRevisados.filter((proveedor) => {
                return (proveedor.nombre.toLowerCase().indexOf(this.term.toLowerCase()) > -1);
            })
        }
        else {
            this.proveedoresRevisadosFiltered = this.proveedoresRevisados;
        }
    }
    searchSubmit() {
        let ev: any = {
            "target": {
                "value": this.term
            }
        };
        this.searchFn(ev);
        this.keyboard.close();
    }
    ionViewDidLoad() {
        if (this.proveedoresRevisados === undefined || this.proveedoresRevisados === null) {
            this.navCtrl.setRoot('ProveedoresPage');
        }
        else {
            this.proveedoresRevisadosFiltered = this.proveedoresRevisados;
        }
    }
    openPage(page: string, proveedorData) {
        this.navCtrl.push(page, {
            proveedor: proveedorData
        });
    }
    changeLista() {
        this.navCtrl.pop();
    }
}
