import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { ProtectedPage } from '../protected-page/protected-page';

import { AuthService } from '../../providers/auth-service';
import { proveedorModel } from '../../models/proveedor.model';
import { ProveedoresService } from '../../providers/proveedores-service';
import { ProductosService } from '../../providers/productos-service';

import *  as AppConfig from '../../app/config';
import * as $ from 'jquery';
import Chart from 'chart.js';

@IonicPage()
@Component({
    selector: 'page-proveedor',
    templateUrl: 'proveedor.html',
})

export class ProveedorPage extends ProtectedPage {
    private cfg: any;
    public proveedor = proveedorModel;
    proveedores: any;
    proveedoresFiltered: any;
    logoProveedor: any;
    getProveedor: any;
    id_ferreteria: string = "1";
    attachments: any = [];
    term: string = '';
    mostrarProveedores: boolean = false;

    dateUpdate: any;
    thisYear: any;
    lastYear: any;
    indicadorGral = {
        total: 0,
        norte: 0,
        centro: 0,
        sur: 0
    }
    dataVentas: any;
    productosTop: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public appCtrl: App,
        public authService: AuthService,
        public proveedoresService: ProveedoresService,
        public productosService: ProductosService,
        public keyboard: Keyboard) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
        this.proveedor = this.navParams.get('proveedor');
    }
    ionViewDidLoad() {
        if (this.proveedor === undefined || this.proveedor === null) {
            this.navCtrl.setRoot('ProveedoresPage');
        }
        else {
            this.proveedoresService.getOne(this.proveedor._id).then(proveedor => {
                this.proveedor = proveedor;
                this.proveedoresService.saveProveedorVisto(this.proveedor._id);
                if (this.proveedor._attachments) {
                    this.attachments = Object.keys(this.proveedor._attachments);
                    this.logoProveedor = this.cfg.apiUrl + '/proveedores/' + this.proveedor._id + '/' + this.attachments[0];
                    this.attachments.shift();
                }
                this.storage.get("id_ferreteria").then((theID) => {
                    this.id_ferreteria = theID;

                    this.dateUpdate = new Date(this.proveedor.indicadores.info.date);
                    this.thisYear = this.dateUpdate.getFullYear();
                    this.lastYear = this.dateUpdate.getFullYear() - 1;

                    this.proveedoresService.getAll(this.id_ferreteria).then(datosProveedores => {
                        this.proveedores = datosProveedores;
                        this.proveedoresFiltered = this.proveedores;
                    });
                    this.productosService.getTop(this.proveedor._id).then(datosProductos => {
                        this.productosTop = datosProductos;
                    });
                    this.drawCharts('30');
                    this.drawChartVentas();
                });
            });
        }
    }
    searchFn(ev: any) {
        this.term = ev.target.value;
        if (this.term) {
            this.proveedoresFiltered = this.proveedores.filter((proveedor) => {
                return (proveedor.doc.nombre.toLowerCase().indexOf(this.term.toLowerCase()) > -1);
            })
            this.mostrarProveedores = true;
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
    drawCharts(month: string) {
        var indicadorTotal = this.proveedor.indicadores.cobertura.periodos[eval(month)].total;
        this.indicadorGral.total = indicadorTotal;
        var nuloTotal = this.proveedor.indicadores.cobertura.periodos[eval(month)].total_full;

        var ctxTotal = $("page-proveedor").last().find("#periodo_donutChart_total");
        var myChartTotal = new Chart(ctxTotal, {
            type: 'pie',
            data: {
                labels: ["Proveedor", "Total"],
                datasets: [{
                    data: [indicadorTotal, nuloTotal-indicadorTotal],
                    backgroundColor: [
                        '#EF452B',
                        '#DADBDF'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                cutoutPercentage: 80,
                legend: {
                    display: false
                },
                maintainAspectRatio: false
            }
        });
        myChartTotal.update();

        var indicadorNorte = this.proveedor.indicadores.cobertura.periodos[eval(month)].norte;
        this.indicadorGral.norte = indicadorNorte;
        var nuloNorte = this.proveedor.indicadores.cobertura.periodos[eval(month)].norte_full;
        var ctxNorte = $("page-proveedor").last().find("#periodo_donutChart_norte");
        var myChartNorte = new Chart(ctxNorte, {
            type: 'pie',
            data: {
                labels: ["Proveedor", "Total"],
                datasets: [{
                    data: [indicadorNorte, nuloNorte-indicadorNorte],
                    backgroundColor: [
                        '#FFC12D',
                        '#DADBDF'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                cutoutPercentage: 80,
                legend: {
                    display: false
                },
                maintainAspectRatio: false
            }
        });
        myChartNorte.update();

        var indicadorCentro = this.proveedor.indicadores.cobertura.periodos[eval(month)].centro;
        this.indicadorGral.centro = indicadorCentro;
        var nuloCentro = this.proveedor.indicadores.cobertura.periodos[eval(month)].centro_full;
        var ctxCentro = $("page-proveedor").last().find("#periodo_donutChart_centro");
        var myChartCentro = new Chart(ctxCentro, {
            type: 'pie',
            data: {
                labels: ["Proveedor", "Total"],
                datasets: [{
                    data: [indicadorCentro, nuloCentro-indicadorCentro],
                    backgroundColor: [
                        '#4A90E2',
                        '#DADBDF'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                cutoutPercentage: 80,
                legend: {
                    display: false
                },
                maintainAspectRatio: false
            }
        });
        myChartCentro.update();
        
        var indicadorSur = this.proveedor.indicadores.cobertura.periodos[eval(month)].sur;
        this.indicadorGral.sur = indicadorSur;
        var nuloSur = this.proveedor.indicadores.cobertura.periodos[eval(month)].sur_full;
        var ctxSur = $("page-proveedor").last().find("#periodo_donutChart_sur");
        var myChartSur = new Chart(ctxSur, {
            type: 'pie',
            data: {
                labels: ["Proveedor", "Total"],
                datasets: [{
                    data: [indicadorSur, nuloSur-indicadorSur],
                    backgroundColor: [
                        '#52831D',
                        '#DADBDF'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                cutoutPercentage: 80,
                legend: {
                    display: false
                },
                maintainAspectRatio: false
            }
        });
        myChartSur.update();
    }
    drawChartVentas() {
        var ventasChartCanvas = $("page-proveedor").last().find("#ventas_barChart");
        var ventasMesesBarChart = [];
        var ventasDataLastYear = [];
        var ventasDataThisYear = [];
        var ventasNumMonths = 0;
        this.dataVentas = this.proveedor.indicadores.ventas.fechas;
        var ventasNumMax = this.dataVentas.length;

        var parent = this;
        Object.keys(this.dataVentas).forEach(function(key) {
            if (Number(key) < 3) {
                ventasNumMonths++;
                ventasMesesBarChart.push(parent.dataVentas[key].mes);
                ventasDataLastYear.push(parent.dataVentas[key].periodos.anterior);
                ventasDataThisYear.push(parent.dataVentas[key].periodos.actual);
            }
        });
        var ventasChartData = {
            labels: ventasMesesBarChart,
            datasets: [{
                label: parent.lastYear,
                backgroundColor: '#4890E2',
                borderWidth: 0,
                data: ventasDataLastYear
            }, {
                label: parent.thisYear,
                backgroundColor: '#E50201',
                borderWidth: 1,
                data: ventasDataThisYear
            }]
        };
        var ventasBarChart = new Chart(ventasChartCanvas, {
            type: 'horizontalBar',
            data: ventasChartData,
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
                    position: 'top',
                }
            }
        });
        ventasBarChart.update();
        let ableToClickVentas = true;
        $("page-proveedor").last().find("#ventasAdd").click(function(){
            if (ableToClickVentas) {
                ableToClickVentas = false;
                if (ventasNumMonths < ventasNumMax) {
                    ventasNumMonths++;
                    var newLabels = parent.dataVentas[ventasNumMonths-1].mes;
                    ventasChartData.labels.push(newLabels);
                    ventasChartData.datasets[0].data.push(parent.dataVentas[ventasNumMonths-1].periodos.anterior);
                    ventasChartData.datasets[1].data.push(parent.dataVentas[ventasNumMonths-1].periodos.actual);
                    let alturaActual = $("page-proveedor").last().find("#ventas_barChart").parents(".barChart_container").outerHeight(true);
                    $("page-proveedor").last().find("#ventas_barChart").parents(".barChart_container").animate({
                        height: alturaActual + 30
                    }, 300, function() {
                        ventasBarChart.update();
                        ableToClickVentas = true;
                    });
                }
                if (ventasNumMonths >= ventasNumMax) {
                    $("page-proveedor").last().find("#ventasAdd").stop().fadeOut(300);
                }
            }
        });
    }
    openPage(page: string, proveedorData) {
        this.navCtrl.push(page, {
            proveedor: proveedorData.doc
        });
    }
    mostrarLista() {
        if (this.mostrarProveedores) {
            this.mostrarProveedores = false;
        }
        else {
            this.mostrarProveedores = true;
        }
    }
    changeMonth(month: string) {
        this.drawCharts(month);
        $(".botonesPeriodo button.inContent").removeClass("active");
        $(".botonesPeriodo button.inContent").removeClass("inactive");
        $(".botonesPeriodo button.inContent").addClass("inactive");
        switch(month){
            case '30':
                $(".mes30Button").removeClass("inactive");
                $(".mes30Button").addClass("active");
            break;
            case '60':
                $(".mes60Button").removeClass("inactive");
                $(".mes60Button").addClass("active");
            break;
            case '90':
                $(".mes90Button").removeClass("inactive");
                $(".mes90Button").addClass("active");
            break;
        }
    }
}
