import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProtectedPage } from '../protected-page/protected-page';
import { UsersService } from '../../providers/users-service';
import { FerreteriasService } from '../../providers/ferreterias-service';

import *  as AppConfig from '../../app/config';

@IonicPage()
@Component({
    selector: 'page-profile-page',
    templateUrl: 'profile-page.html',
})
export class ProfilePage extends ProtectedPage {
    private cfg: any;
    user: any = [];
    userId: any = [];
    logoFerreteria: any;
    ferreteria: any = [];
    textoBoton: string = "Editar perfil";
    editandoPerfil: boolean = false;
    userEmail: string = "";
    userPhone: string = "";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public appCtrl: App,
        public usersService: UsersService,
        public ferreteriasService: FerreteriasService) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
    }

    ionViewDidLoad() {
        this.storage.get('user').then(user => {
            this.userId = user;
            if (this.userId === undefined || this.userId === null) {
                this.navCtrl.setRoot('HomePage');
            }
            else {
                this.usersService.getOne(this.userId).then(userData => {
                    this.user = userData;
                    this.userEmail = this.user.email;
                    this.userPhone = this.user.phonenum;
                    this.ferreteriasService.getOne(this.user.id_ferreteria).then(datosFerreteria => {
                        this.ferreteria = datosFerreteria
                        const attachments = Object.keys(this.ferreteria._attachments);
                        this.logoFerreteria = attachments[0];
                    });
                });
            }
        });
    }
    triggerPerfil() {
        if (this.editandoPerfil) {
            this.guardarPerfil();
        }
        else {
            this.editarPerfil();
        }
    }
    editarPerfil() {
        this.editandoPerfil = true;
        this.textoBoton = "Guardar perfil";
    }
    guardarPerfil() {
        this.editandoPerfil = false;
        this.textoBoton = "Editar perfil";

    }

}
