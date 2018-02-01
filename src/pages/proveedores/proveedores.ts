import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { ProtectedPage } from '../protected-page/protected-page';

import { proveedorModel } from '../../models/proveedor.model';
import { ProveedoresService } from '../../providers/proveedores-service';

import *  as AppConfig from '../../app/config';

@IonicPage()
@Component({
    selector: 'page-proveedores',
    templateUrl: 'proveedores.html',
})

export class ProveedoresPage extends ProtectedPage {
    private cfg: any;
    public proveedor = proveedorModel;
    proveedores: any = [];
    proveedoresRevisados: any = [];
    proveedoresFiltered: any = [];
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
    }
    searchFn(ev: any) {
        this.term = ev.target.value;
        if (this.term) {
			this.proveedoresFiltered = this.proveedores.filter((proveedor) => {
				return (proveedor.doc.nombre.toLowerCase().indexOf(this.term.toLowerCase()) > -1);
			})
        }
        else {
            this.proveedoresFiltered = this.proveedores;
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
    ionViewDidEnter() {
        this.storage.get("proveedores_revisados").then((proveedoresSaved) => {
            if (proveedoresSaved) {
                this.revisados = true;
            }
            else {
                this.revisados = false;
            }
            if (proveedoresSaved) {
                this.checkRevisados(proveedoresSaved);
            }
        });
    }
    ionViewDidLoad() {
        let loader = this.loading.create({
            content: "Cargando..."
        });
        loader.present();
        this.storage.get("proveedores_revisados").then((proveedoresSaved) => {
            if (proveedoresSaved) {
                this.revisados = true;
            }
            else {
                this.revisados = false;
            }
            this.storage.get('id_token').then(id_token => {
                if (id_token !== null) {
                    this.storage.get("id_ferreteria").then((theID) => {
                        this.id_ferreteria = theID;
                        this.proveedoresService.getAll(this.id_ferreteria).then(datosProveedores => {
                            this.proveedores = datosProveedores;
                            this.proveedoresFiltered = this.proveedores;
                            if (proveedoresSaved) {
                                this.checkRevisados(proveedoresSaved);
                            }
                            loader.dismiss().catch(() => { });
                        });
                    });
                }
            });
        });
    }
    checkRevisados(saved) {
        this.proveedoresRevisados = [];
        saved.forEach((index) => {
            this.proveedoresService.getOneWithDocs(index).then(datoProveedorUnico => {
                this.proveedoresRevisados.push(datoProveedorUnico);
            });
        });
    }
    openPage(page: string, proveedorData) {
        this.navCtrl.push(page, {
            proveedor: proveedorData.doc
        });
    }
    changeLista() {
        if (this.revisados) {
            this.navCtrl.push('ProveedoresRevisadosPage', {
                proveedores: this.proveedoresRevisados
            });
        }
    }
}
