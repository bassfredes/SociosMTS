import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ProtectedPage } from '../protected-page/protected-page';
import { EventosService } from '../../providers/eventos-service';
import { ProveedoresService } from '../../providers/proveedores-service';

import *  as AppConfig from '../../app/config';
import * as $ from 'jquery';
import Chart from 'chart.js';

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
    participarB: boolean = false;
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
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public proveedoresService: ProveedoresService,
        public authService: AuthService) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
        this.evento = this.navParams.get('evento');
        this.participarB = this.navParams.get('participar');
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
                                if (this.participarB) {
                                    this.participar();
                                }
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
            let alert = this.alertCtrl.create({
                title: 'Confirmar Inscripción',
                message: '¿Estás seguro que quieres inscribirte en el evento?',
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
                            $(".prevParticipar").stop().fadeOut(300, function() {
                                $(".postParticipar").fadeIn(300);
                                parent.evento.participando = true;
                            });
                        }
                    }
                ]
            });
            alert.present();
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
        var RDNChartCanvas = $("page-eventos-detalle").last().find("#RDN");
        const meta = this.varsRDN.meta;
        const acuerdo = this.varsRDN.acuerdo;
        const avance = this.varsRDN.avance;

        var RDNChartData = {
            labels: ["Meta", "Acuerdo", "Avance"],
            datasets: [{
                data: [meta, acuerdo, avance],
                backgroundColor: [
                    '#4990E2',
                    '#52831D',
                    '#D0011B'
                ],
                borderWidth: 0
            }]
        };
        var RDNBarChart = new Chart(RDNChartCanvas, {
            type: 'horizontalBar',
            data: RDNChartData,
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            drawBorder: true,
                        },
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 6,
                            fontColor: '#000000',
                            fontFamily: 'CircularStd',
                            fontSize: 12
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            fontColor: '#000000',
                            fontFamily: 'CircularStd',
                            fontSize: 14
                        }
                    }]
                },
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return tooltipItem.xLabel + " MM";
                        }
                    }
                }
            }
        });
        RDNBarChart.update();
    }
    openPage(page: string, proveedorData) {
        this.navCtrl.push(page, {
            proveedor: proveedorData.doc
        });
    }
}
