import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { ProtectedPage } from '../protected-page/protected-page';
import { UsersService } from '../../providers/users-service';

import *  as AppConfig from '../../app/config';
import * as $ from 'jquery';

@IonicPage()
@Component({
    selector: 'page-agenda',
    templateUrl: 'agenda.html',
})
export class AgendaPage extends ProtectedPage {
    private cfg: any;
    socios: any = [];
    sociosAgrupados: any = [];
    proveedores: any = [];
    proveedoresAgrupados: any = [];

    alreadySaved: boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public usersService: UsersService,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public contacts: Contacts,
        public callNumber: CallNumber,
        public emailComposer: EmailComposer,
        public appCtrl: App) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
    }

    ionViewDidLoad() {
        this.usersService.getAll('socios').then(socios => {
            this.socios = socios;
            this.groupSocios(this.socios, this.sociosAgrupados);
        });
        this.usersService.getAll('proveedores').then(proveedores => {
            this.proveedores = proveedores;
        });
    }
    openPage(page: string, user) {
        this.navCtrl.push(page, {
            user: user
        });
    }
    groupSocios(users, output) {
        let sortedContacts = users.sort();
        let currentLetter = false;
        let currentContacts = [];
        sortedContacts.forEach((value, index) => {
            if (value.doc.name.charAt(0) != currentLetter) {
                currentLetter = value.doc.name.charAt(0);
                let newGroup = {
                    letter: currentLetter,
                    users: []
                };
                currentContacts = newGroup.users;
                output.push(newGroup);
            }
            currentContacts.push(value.doc);
        });
    }
    guardarContacto(user) {
        let success = this.toastCtrl.create({
            message: 'El contacto se ha guardado con éxito',
            duration: 4000,
            position: 'bottom',
            closeButtonText: "OK"
        });
        let failed = this.toastCtrl.create({
            message: 'Ha ocurrido un problema al guardar el contacto',
            duration: 4000,
            position: 'bottom',
            closeButtonText: "OK"
        });
        if ((<any>window).cordova) {
            this.alreadySaved = true;
            let contact: Contact = this.contacts.create();
            let nombreUser = user.name.split(" ");
            if (contact) {
                contact.name = new ContactName(null, nombreUser[1], nombreUser[0]);
                contact.phoneNumbers = [new ContactField('Móvil', user.phonenum)];
                contact.emails = [new ContactField('Correo', user.email)];
                //contact.photos = [new ContactField('photo', user._attachments)];
                contact.addresses = [new ContactField('Dirección', user.direction)];
                contact.organizations = [new ContactField('Marca', user.name_ferreteria)];

                contact.save().then(() =>
                    success.present(),
                    (error: any) =>
                        failed.present()
                );
            }
        }
        else {
            failed.present();
        }
    }
    saveContact(user: any) {
        'use strict';
        if (user.phonenum) {
            if (!this.alreadySaved) {
                this.guardarContacto(user);
            }
            else {
                let alert = this.alertCtrl.create({
                    title: 'Contacto ya guardado',
                    message: 'El contacto ya ha sido guardado. ¿Deseas guardarlo nuevamente?',
                    buttons: [
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            handler: () => { }
                        },
                        {
                            text: 'Aceptar',
                            handler: () => {
                                this.guardarContacto(user);
                            }
                        }
                    ]
                });
                alert.present();
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
