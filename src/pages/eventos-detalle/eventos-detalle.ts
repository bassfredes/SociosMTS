import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ProtectedPage } from '../protected-page/protected-page';
import { EventosService } from '../../providers/eventos-service';
import { ProveedoresService } from '../../providers/proveedores-service';

import *  as AppConfig from '../../app/config';
import * as $ from 'jquery';
declare var google: any;

@IonicPage()
@Component({
    selector: 'page-eventos-detalle',
    templateUrl: 'eventos-detalle.html',
})
export class EventosDetallePage extends ProtectedPage {
    private cfg: any;
    private inviteData: FormGroup;

    id_ferreteria: string;

    proveedores: any = [];
    proveedoresFiltered: any = [];
    proveedoresRDN: any = [];
    offset: number = 0;
    limit: number = 3;
    totalRows: any = 0;

    evento: any = [];
    imagenPrincipal: any;
    attachments: any;
    clickParticipar: boolean = false;
    varsRDN: any;

    dateUpdate: any;
    thisYear: any;
    lastYear: any;

    alreadyInvited: boolean = false;
    clickInvitar: boolean = false;
    nombreInvitado: string = "";

    alreadyExpanded: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public formBuilder: FormBuilder,
        public eventosService: EventosService,
        public photoViewer: PhotoViewer,
        public appCtrl: App,
        public proveedoresService: ProveedoresService,
        public authService: AuthService) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
        this.evento = this.navParams.get('evento');
        this.inviteData = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required])],
            rut: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.pattern('^[0-9]+-[0-9kK]{1}$')])],
        });
    }
    invite() {
        if (!this.clickInvitar) {
            this.clickInvitar = true;
            const parent = this;
            this.nombreInvitado = this.inviteData.value.name;
            $(".toInvite").stop().fadeOut(300, function() {
                $(".alreadyInvited").fadeIn(300);
                parent.authService.invitarEvento(parent.inviteData.value).then(() => {
                    parent.clickInvitar = false;
                }).catch(e => console.log("login error", e));
            });
        }
    }
    invitarOtro() {
        if (!this.clickInvitar) {
            this.clickInvitar = true;
            const parent = this;
            this.inviteData.reset()
            $(".alreadyInvited").stop().fadeOut(300, function() {
                parent.nombreInvitado = "";
                parent.clickInvitar = false;
                $(".toInvite").stop().fadeIn(300);
            });
        }
    }
    ionViewDidLoad() {
        if (this.evento === undefined || this.evento === null) {
            this.navCtrl.setRoot('EventosPage');
        }
        else {
            this.eventosService.getOne(this.evento._id).then(evento => {
                this.evento = evento;
                if (this.evento._attachments) {
                    this.attachments = Object.keys(this.evento._attachments);
                    this.imagenPrincipal = this.cfg.apiUrl + '/eventos/' + this.evento._id + '/' + this.attachments[0];
                    if (this.evento.isRdn) {
                        this.dateUpdate = new Date(this.evento.rdn.date);
                        this.thisYear = this.dateUpdate.getFullYear();
                        this.lastYear = this.dateUpdate.getFullYear() - 1;
                        this.varsRDN = this.evento.rdn;
                        this.drawCharts();
                        this.storage.get("id_ferreteria").then((theID) => {
                            this.id_ferreteria = theID;
                            this.proveedoresService.getAll(this.id_ferreteria).then(datosProveedores => {
                                this.proveedores = datosProveedores;
                                this.proveedoresRDN = this.evento.proveedores;
                                var parent = this;
                                var numItem = 0;
                                function keyEqual(element, index, array) {
                                    if (parent.proveedoresRDN[index] !== undefined) {
                                        numItem++;
                                        if (numItem <= 6) {
                                            return (element.doc._id === parent.proveedoresRDN[index]._id)
                                        }
                                    }
                                }
                                this.proveedoresFiltered = this.proveedores.filter(keyEqual);
                            });
                        });
                    }
                    this.attachments.shift();
                }
            });
        }
    }
    participar() {
        if (!this.clickParticipar) {
            this.clickParticipar = true;
            const parent = this;
            $(".prevParticipar").stop().fadeOut(300, function() {
                $(".postParticipar").fadeIn(300);
                parent.evento.participando = true;
            });
        }
    }
    cargarProveedores() {
        this.alreadyExpanded = true;
        var parent = this;
        function keyEqual(element, index, array) {
            if (parent.proveedoresRDN[index] !== undefined) {
                return (element.doc._id === parent.proveedoresRDN[index]._id)
            }
        }
        this.proveedoresFiltered = this.proveedores.filter(keyEqual);
    }
    drawCharts() {
        let parent = this;
        google.charts.setOnLoadCallback(chartRDN);
        const optionsRDN = {
            backgroundColor: "#FFF",
            chartArea: {
                backgroundColor: "#FFF",
                left: '30%',
                top: '0%',
                width: '70%',
                height: '80%',
            },
            bars: 'horizontal',
            bar: { groupWidth: "50%" },
            enableInteractivity: true,
            legend: { position: 'none' },
            tooltip: {
                isHtml: true,
            },
            textStyle: {
                color: '#000001',
                fontSize: 12,
                bold: true,
            },
            vAxis: {
                viewWindowMode: 'pretty',
                format: 'short',
                textStyle: {
                    color: '#000000',
                    fontSize: 14,
                    bold: true,
                },
            },
            hAxis: {
                viewWindowMode: 'pretty',
                minValue: 0,
                baseline: 0,
                textStyle: {
                    color: '#000001',
                    fontSize: 12,
                    bold: true,
                },
                gridlines: {
                    count: 3,
                    color: "#D9DADB"
                },
                minorGridlines: {
                    count: 0
                }
            },
            animation: {
                startup: true,
                duration: 1000,
                easing: 'in',
            },
        };
        function chartRDN() {
            var chartRDNBar = new google.visualization.BarChart(document.getElementById('RDN'));
            let meta = parent.varsRDN.meta;
            let acuerdo = parent.varsRDN.acuerdo;
            let avance = parent.varsRDN.avance;
            var dataRDN = google.visualization.arrayToDataTable([
                ['Indicador', String(parent.thisYear), { role: 'style' }],
                ['Meta', 400, '#4990E2'],
                ['Acuerdo', 500, '#52831D'],
                ['Avance', 12, '#D0011B'],
            ]);
            chartRDNBar.draw(dataRDN, optionsRDN);
        }
    }
    openPage(page: string, proveedorData) {
        this.navCtrl.push(page, {
            proveedor: proveedorData.doc
        });
    }
}
