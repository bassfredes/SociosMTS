import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { ferreteriaModel } from '../../models/ferreteria.model';
import { ProtectedPage } from '../protected-page/protected-page';
import { UsersService } from '../../providers/users-service';
import { FerreteriasService } from '../../providers/ferreterias-service';
import { ProveedoresService } from '../../providers/proveedores-service';

import *  as AppConfig from '../../app/config';
@IonicPage()
@Component({
    selector: 'page-profile-detalle',
    templateUrl: 'profile-detalle.html',
})
export class ProfileDetallePage extends ProtectedPage {
    private cfg: any;
    public ferreteria = ferreteriaModel;
    public proveedor: any;
    user: any = [];
    userType: any;
    logoFerreteria: any;
    logoProveedor: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public appCtrl: App,
        public toastCtrl: ToastController,
        public callNumber: CallNumber,
        public emailComposer: EmailComposer,
        public usersService: UsersService,
        public ferreteriasService: FerreteriasService,
        public proveedoresService: ProveedoresService) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
        this.user = this.navParams.get('user');
    }
    ionViewDidLoad() {
        if (this.user === undefined || this.user === null) {
            this.navCtrl.setRoot('AgendaPage');
        }
        else {
            this.userType = this.user.type;
            if(this.userType=="corporativo"){
                this.userType = "socios";
                this.ferreteriasService.getOne(this.user.id_ferreteria).then(datosFerreteria => {
                    this.ferreteria = datosFerreteria;
                    const attachments = Object.keys(this.ferreteria._attachments);
                    this.logoFerreteria = attachments[0];
                });
            }
            if(this.userType=="proveedor"){
                this.userType = "proveedores";
                this.proveedoresService.getOne(this.user.id_proveedor).then(datosProveedor => {
                    this.proveedor = datosProveedor;
                    const attachments = Object.keys(this.proveedor._attachments);
                    this.logoProveedor = attachments[0];
                });
            }
        }
    }
    callToContact(user: any) {
        if (user.phonenum) {
            let success = this.toastCtrl.create({
                message: 'Llamando al contacto',
                duration: 3000,
                position: 'bottom',
                closeButtonText: "OK"
            });
            let failed = this.toastCtrl.create({
                message: 'Ha ocurrido un problema al intentar llamar el contacto',
                duration: 4000,
                position: 'bottom',
                closeButtonText: "OK"
            });
            this.callNumber.callNumber(user.phonenum, true).then(() =>
                success.present()
            ).catch(() =>
                failed.present()
            );
        }
    }
    mailToContact(user: any) {
        if (user.email) {
            let failed = this.toastCtrl.create({
                message: 'Ha ocurrido un problema al intentar enviar el correo',
                duration: 4000,
                position: 'bottom',
                closeButtonText: "OK"
            });
            if ((<any>window).cordova) {
                let email = {
                    to: user.email,
                    subject: 'Mensaje desde App SociosMTS',
                    body: 'Estimado: ¿Cómo se encuentra?',
                    isHtml: true
                };
                this.emailComposer.open(email);
            }
            else {
                failed.present();
            }
        }
    }

}
