import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { ProtectedPage } from '../protected-page/protected-page';

import { AuthService } from '../../providers/auth-service';
import { proveedorModel } from '../../models/proveedor.model';
import { ProveedoresService } from '../../providers/proveedores-service';
import { ProductosService } from '../../providers/productos-service';
import { CacheService } from "ionic-cache";

import *  as AppConfig from '../../app/config';
import * as $ from 'jquery';
declare var google: any;

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
                        console.log(this.productosTop);
                    });

                    this.drawCharts('30');
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
        let parent = this;
        google.charts.setOnLoadCallback(chartTotal(month));
        google.charts.setOnLoadCallback(chartNorte(month));
        google.charts.setOnLoadCallback(chartCentro(month));
        google.charts.setOnLoadCallback(chartSur(month));
        google.charts.setOnLoadCallback(chartVentas());
        function chartTotal(month: string) {
            const totalChart = new google.visualization.PieChart(document.getElementById('periodo_donutChart_total'));
            let indicador = parent.proveedor.indicadores.cobertura.periodos[eval(month)].total;
            parent.indicadorGral.total = indicador;
            let nulo = parent.proveedor.indicadores.cobertura.totales.total;
            var data_total = google.visualization.arrayToDataTable([
                ['indicador', 'valor'],
                ['Total', 0],
                ['nulo', nulo],
            ]);
            var options_total = {
                pieHole: 0.8,
                backgroundColor: '#F5F5F5',
                colors: ['#EF452B', '#DADBDF'],
                chartArea: {
                    left: '0%',
                    top: '10%',
                    width: '70%',
                    height: '80%'
                },
                animation: {
                    startup: true,
                    duration: 1000,
                    easing: 'in',
                },
                enableInteractivity: false,
                legend: {
                    position: 'none'
                },
                pieSliceText: 'none',
                pieSliceBorderColor: '#F5F5F5',
            };
            totalChart.draw(data_total, options_total);
            var counter = 0;

            var resta;
            var indicadorMulti;
            var handler = setInterval(function() {
                resta = nulo - indicador * counter;
                indicadorMulti = indicador * counter;
                if(resta<0){resta=0}
                if(indicador<0){indicador=0}
                data_total = google.visualization.arrayToDataTable([
                    ['indicador', 'valor'],
                    ['Total', indicadorMulti],
                    ['nulo', resta],
                ]);
                counter = counter + 0.1;
                counter = Math.round(counter * 10) / 10

                if (counter >= 1) {
                    clearInterval(handler);
                    data_total = google.visualization.arrayToDataTable([
                        ['indicador', 'valor'],
                        ['Total', indicador],
                        ['nulo', nulo-indicador],
                    ]);
                }
                totalChart.draw(data_total, options_total);
            }, 10);
        }
        function chartNorte(month: string) {
            const norteChart = new google.visualization.PieChart(document.getElementById('periodo_donutChart_norte'));
            let indicador = parent.proveedor.indicadores.cobertura.periodos[eval(month)].norte;
            parent.indicadorGral.norte = indicador;
            let nulo = parent.proveedor.indicadores.cobertura.totales.norte;
            var data_norte = google.visualization.arrayToDataTable([
                ['indicador', 'valor'],
                ['Norte', 0],
                ['nulo', nulo],
            ]);
            var options_norte = {
                pieHole: 0.8,
                backgroundColor: '#F5F5F5',
                colors: ['#FFC12D', '#DADBDF'],
                chartArea: {
                    left: '0%',
                    top: '10%',
                    width: '70%',
                    height: '80%'
                },
                animation: {
                    startup: true,
                    duration: 1000,
                    easing: 'in',
                },
                enableInteractivity: false,
                legend: {
                    position: 'none'
                },
                pieSliceText: 'none',
                pieSliceBorderColor: '#F5F5F5',
            };
            norteChart.draw(data_norte, options_norte);
            var counter = 0;
            if(nulo<0) nulo=0;

            var resta;
            var handler = setInterval(function() {
                resta = nulo - indicador * counter;
                if(resta<0){resta = 0};
                data_norte = google.visualization.arrayToDataTable([
                    ['indicador', 'valor'],
                    ['Norte', indicador * counter],
                    ['nulo', nulo],
                ]);
                counter = counter + 0.1;
                counter = Math.round(counter * 10) / 10

                if (counter >= 1) {
                    clearInterval(handler);
                    data_norte = google.visualization.arrayToDataTable([
                        ['indicador', 'valor'],
                        ['Norte', indicador],
                        ['nulo', nulo-indicador],
                    ]);
                }
                norteChart.draw(data_norte, options_norte);
            }, 10);
        }
        function chartCentro(month: string) {
            const centroChart = new google.visualization.PieChart(document.getElementById('periodo_donutChart_centro'));
            let indicador = parent.proveedor.indicadores.cobertura.periodos[eval(month)].centro;
            parent.indicadorGral.centro = indicador;
            let nulo = parent.proveedor.indicadores.cobertura.totales.centro;
            var data_centro = google.visualization.arrayToDataTable([
                ['indicador', 'valor'],
                ['Centro', 0],
                ['nulo', nulo],
            ]);
            var options_centro = {
                pieHole: 0.8,
                backgroundColor: '#F5F5F5',
                colors: ['#4A90E2', '#DADBDF'],
                chartArea: {
                    left: '0%',
                    top: '10%',
                    width: '70%',
                    height: '80%'
                },
                animation: {
                    startup: true,
                    duration: 1000,
                    easing: 'in',
                },
                enableInteractivity: false,
                legend: {
                    position: 'none'
                },
                pieSliceText: 'none',
                pieSliceBorderColor: '#F5F5F5',
            };
            centroChart.draw(data_centro, options_centro);
            var counter = 0;
            if(nulo<0) nulo=0;

            var resta;
            var handler = setInterval(function() {
                resta = nulo - indicador * counter;
                if(resta<0){resta = 0};
                data_centro = google.visualization.arrayToDataTable([
                    ['indicador', 'valor'],
                    ['Centro', indicador * counter],
                    ['nulo', resta],
                ]);
                counter = counter + 0.1;
                counter = Math.round(counter * 10) / 10

                if (counter > 1) {
                    clearInterval(handler);
                    data_centro = google.visualization.arrayToDataTable([
                        ['indicador', 'valor'],
                        ['Centro', indicador],
                        ['nulo', nulo-indicador],
                    ]);
                }
                centroChart.draw(data_centro, options_centro);
            }, 10);
        }
        function chartSur(month: string) {
            const surChart = new google.visualization.PieChart(document.getElementById('periodo_donutChart_sur'));
            let indicador = parent.proveedor.indicadores.cobertura.periodos[eval(month)].sur;
            parent.indicadorGral.sur = indicador;
            let nulo = parent.proveedor.indicadores.cobertura.totales.sur;
            var data_sur = google.visualization.arrayToDataTable([
                ['indicador', 'valor'],
                ['Sur', 0],
                ['nulo', nulo],
            ]);
            var options_sur = {
                pieHole: 0.8,
                backgroundColor: '#F5F5F5',
                colors: ['#52831D', '#DADBDF'],
                chartArea: {
                    left: '0%',
                    top: '10%',
                    width: '70%',
                    height: '80%'
                },
                animation: {
                    startup: true,
                    duration: 1000,
                    easing: 'in',
                },
                enableInteractivity: false,
                legend: {
                    position: 'none'
                },
                pieSliceText: 'none',
                pieSliceBorderColor: '#F5F5F5',
            };
            surChart.draw(data_sur, options_sur);
            var counter = 0;
            if(nulo<0) nulo=0;

            var resta;
            var handler = setInterval(function() {
                resta = nulo - indicador;
                if(resta<0){resta = 0};
                data_sur = google.visualization.arrayToDataTable([
                    ['indicador', 'valor'],
                    ['Sur', indicador * counter],
                    ['nulo', resta],
                ]);
                counter = counter + 0.1;
                counter = Math.round(counter * 10) / 10

                if (counter > 1) {
                    clearInterval(handler);
                    data_sur = google.visualization.arrayToDataTable([
                        ['indicador', 'valor'],
                        ['Sur', indicador],
                        ['nulo', nulo-indicador],
                    ]);
                }
                surChart.draw(data_sur, options_sur);
            }, 10);
        }
        function chartVentas(){
            var chart_ventas = new google.visualization.BarChart(document.getElementById('ventas_barChart'));
            var data_ventas = new google.visualization.DataTable();
            parent.dataVentas = parent.proveedor.indicadores.ventas.fechas;

            data_ventas.addColumn('string', ' ');
            data_ventas.addColumn('number', parent.lastYear);
            data_ventas.addColumn('number', parent.thisYear);
            var optionsVentas = {
                backgroundColor: "#F5F5F5",
                colors: ['#4890E2', '#E50201'],
                chartArea: {
                    backgroundColor: "#F5F5F5",
                    left: '30%',
                    top: '0%',
                    width: '70%',
                    height: '90%',
                },
                focusTarget: 'category',
                bars: 'horizontal',
                bar: { groupWidth: "40px" },
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
                        count: 6,
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
            var numMax = parent.dataVentas.length;
            Object.keys(parent.dataVentas).forEach(function(key) {
                let mes = parent.dataVentas[key].mes;
                let periodoAnterior = parent.dataVentas[key].periodos.anterior;
                let periodoActual = parent.dataVentas[key].periodos.actual;
                if(data_ventas.getNumberOfRows()<3){
                    data_ventas.addRow([mes, periodoAnterior, periodoActual]);
                }
            });
            function drawVentas() {
                chart_ventas.draw(data_ventas, optionsVentas);
            }
            drawVentas();
            var addVentasButton = document.getElementById('ventasAdd');
            let ableToClick = true;
            addVentasButton.onclick = function() {
                if(ableToClick){
                    ableToClick = false;
                    if(data_ventas.getNumberOfRows()<numMax){
                        data_ventas.addRow([parent.dataVentas[data_ventas.getNumberOfRows()].mes, parent.dataVentas[data_ventas.getNumberOfRows()].periodos.anterior, parent.dataVentas[data_ventas.getNumberOfRows()].periodos.actual]);
                        let alturaActual = $("#ventas_barChart").outerHeight(true);
                        $("#ventas_barChart").animate({
                            height: alturaActual+30
                        }, 300, function() {
                            drawVentas();
                            ableToClick = true;
                        });
                    }
                    if(data_ventas.getNumberOfRows()>=numMax){
                        $("#ventasAdd").stop().fadeOut(300);
                    }
                }
            }
        }
    }
    openPage(page: string, proveedorData) {
        this.navCtrl.pop({animate:false});
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
                $("#mes30").removeClass("inactive");
                $("#mes30").addClass("active");
            break;
            case '60':
                $("#mes60").removeClass("inactive");
                $("#mes60").addClass("active");
            break;
            case '90':
                $("#mes90").removeClass("inactive");
                $("#mes90").addClass("active");
            break;
        }
    }
}
