import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ProtectedPage } from '../protected-page/protected-page';
import { EventosService } from '../../providers/eventos-service';
import { ProveedoresService } from '../../providers/proveedores-service';

import { EventoModalPage } from '../evento-modal/evento-modal';

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
    varsRDN: any;

    dateUpdate: any;
    thisYear: any;
    lastYear: any;

    alreadyInvited: boolean = false;
    clickInvitar: boolean = false;
    nombreInvitado: string = "";

    alreadyExpanded: boolean = false;
    mensajeExito: string = "";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public formBuilder: FormBuilder,
        public eventosService: EventosService,
        public photoViewer: PhotoViewer,
        public appCtrl: App,
        public alertCtrl: AlertController,
        public proveedoresService: ProveedoresService,
        public modalCtrl: ModalController,
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
        let eventoModal = this.modalCtrl.create(EventoModalPage, {
            eventoData: this.evento,
            dataNombre: false,
            dataRut: false
        });
        eventoModal.present();
        eventoModal.onDidDismiss(data => {
            if (data) {
                this.evento.participando = true;
                this.mensajeExito = data.doc.message;
            }
        });
    }
    invitarPersona() {
        let nombreInvitado = this.inviteData.value.name;
        let rutInvitado = this.inviteData.value.rut;
        let eventoModal = this.modalCtrl.create(EventoModalPage, {
            eventoData: this.evento,
            dataNombre: nombreInvitado,
            dataRut: rutInvitado
        });
        eventoModal.present();
        eventoModal.onDidDismiss(data => {
            if (data)  {
                $(".toInvite").stop().fadeOut(300, function () {
                    $(".alreadyInvited").fadeIn(300);
                });
            }
        });
    }
    invitarOtro() {
        if (!this.clickInvitar) {
            this.clickInvitar = true;
            const parent = this;
            this.inviteData.reset()
            $(".alreadyInvited").stop().fadeOut(300, function () {
                parent.nombreInvitado = "";
                parent.clickInvitar = false;
                $(".toInvite").stop().fadeIn(300);
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
        var RDNChartCanvas = $("page-eventos-detalle").last().find("#RDN");
        const potencial = this.varsRDN.potencial;
        const rdn = this.varsRDN.rdn;
        const ordenCompra = this.varsRDN.orden_compra;
        const facturado = this.varsRDN.facturado;

        var RDNChartData = {
            labels: ["Potencial", "RDN", "Orden de Compra", "Facturado"],
            datasets: [{
                data: [potencial, rdn, ordenCompra, facturado],
                backgroundColor: [
                    '#53831E',
                    '#D0011B',
                    '#212FC2',
                    '#30C0A2'
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
