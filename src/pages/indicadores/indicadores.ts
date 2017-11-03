import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProtectedPage } from '../protected-page/protected-page';

import { AuthService } from '../../providers/auth-service';
import { ferreteriaModel } from '../../models/ferreteria.model';
import { FerreteriasService } from '../../providers/ferreterias-service';

import *  as AppConfig from '../../app/config';
import * as $ from 'jquery';
declare var google: any;

@IonicPage()
@Component({
    selector: 'page-indicadores',
    templateUrl: 'indicadores.html',
})
export class IndicadoresPage extends ProtectedPage {
    private cfg: any;
    public ferreteria = ferreteriaModel;
    id_ferreteria: string = "1";
    npsValue: number = 0;
    valorTotal: number = 100;
    logoFerreteria: string;
    localSelected: number = 0;
    indicadorVariacion: string = "";
    indicadorVariacionVentas: string = "";
    dataVariacion: any;
    dataVentas: any;

    dateUpdate: any;
    thisYear: any;
    lastYear: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public appCtrl: App,
        public authService: AuthService,
        public ferreteriasService: FerreteriasService) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
    }
    drawCharts() {
        let parent = this;
        google.charts.setOnLoadCallback(chartNPS);
        google.charts.setOnLoadCallback(chartVariacion);
        google.charts.setOnLoadCallback(chartVentas);
        const options_nps = {
            pieHole: 0.5,
            backgroundColor: '#F5F5F5',
            colors: ['#009987', '#0084B1', '#9C5895', '#F5F5F5'],
            chartArea: {
                left: '0%',
                top: '10%',
                width: '80%',
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
        const options_variacion = {
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
        function chartNPS() {
            let full = 100;
            var chart_nps = new google.visualization.PieChart(document.getElementById('indicadores_donutChart'));
            let total = parent.ferreteria.indicadores.nps.locales[parent.localSelected].total;
            parent.npsValue = total;
            let p = parent.ferreteria.indicadores.nps.locales[parent.localSelected].p;
            let d = parent.ferreteria.indicadores.nps.locales[parent.localSelected].d;
            let n = parent.ferreteria.indicadores.nps.locales[parent.localSelected].n;
            var data_nps = google.visualization.arrayToDataTable([
                ['indicador', 'valor'],
                ['P', 0],
                ['D', 0],
                ['n', 0],
                ['nulo', full],
            ]);
            chart_nps.draw(data_nps, options_nps);
            var counter = 0;
            var counterNeg = 0;
            var handler = setInterval(function(){
                var resta = full-counterNeg;
                if(resta<0){resta=0};
                data_nps = google.visualization.arrayToDataTable([
                    ['indicador', 'valor'],
                    ['P', p*counter],
                    ['D', d*counter],
                    ['n', n*counter],
                    ['nulo', resta],
                ]);
                counter = counter + 0.1;
                counterNeg = counterNeg + 10;
                counter = Math.round( counter * 10 ) / 10

                if (counter > 1){
                    clearInterval(handler);
                    data_nps = google.visualization.arrayToDataTable([
                        ['indicador', 'valor'],
                        ['P', p],
                        ['D', d],
                        ['n', n],
                        ['nulo', 0],
                    ]);
                }
                chart_nps.draw(data_nps, options_nps);
            }, 10);
        }
        function chartVariacion() {
            var chart_variacion = new google.visualization.BarChart(document.getElementById('variacion_barChart'));
            var data_variacion = new google.visualization.DataTable();
            parent.dataVariacion = parent.ferreteria.indicadores.compras.fechas;

            data_variacion.addColumn('string', ' ');
            data_variacion.addColumn('number', parent.lastYear);
            data_variacion.addColumn('number', parent.thisYear);

            var numMax = parent.dataVariacion.length;
            Object.keys(parent.dataVariacion).forEach(function(key) {
                let mes = parent.dataVariacion[key].mes;
                let periodoAnterior = parent.dataVariacion[key].periodos.anterior;
                let periodoActual = parent.dataVariacion[key].periodos.actual;
                if(data_variacion.getNumberOfRows()<3){
                    data_variacion.addRow([mes, periodoAnterior, periodoActual]);
                }
            });
            function drawVariacion() {
                chart_variacion.draw(data_variacion, options_variacion);
            }
            drawVariacion();
            var addButton = document.getElementById('variacionAdd');
            let ableToClick = true;
            addButton.onclick = function() {
                if(ableToClick){
                    ableToClick = false;
                    if(data_variacion.getNumberOfRows()<numMax){
                        data_variacion.addRow([parent.dataVariacion[data_variacion.getNumberOfRows()].mes, parent.dataVariacion[data_variacion.getNumberOfRows()].periodos.anterior, parent.dataVariacion[data_variacion.getNumberOfRows()].periodos.actual]);
                        let alturaActual = $("#variacion_barChart").outerHeight(true);
                        $("#variacion_barChart").animate({
                            height: alturaActual+30
                        }, 300, function() {
                            drawVariacion();
                            ableToClick = true;
                        });
                    }
                    if(data_variacion.getNumberOfRows()>=numMax){
                        $("#variacionAdd").stop().fadeOut(300);
                    }
                }
            }
        }
        function chartVentas() {
            var chart_ventas = new google.visualization.BarChart(document.getElementById('ventas_barChart'));
            var data_ventas = new google.visualization.DataTable();
            parent.dataVentas = parent.ferreteria.indicadores.ventas.fechas;

            data_ventas.addColumn('string', ' ');
            data_ventas.addColumn('number', parent.lastYear);
            data_ventas.addColumn('number', parent.thisYear);

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
                chart_ventas.draw(data_ventas, options_variacion);
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

    onSelectChange(selectedValue: any) {
        this.localSelected = selectedValue;
        this.drawCharts();
    }
    ionViewDidLoad() {
        this.storage.get('id_token').then(id_token => {
            if (id_token !== null) {
                this.storage.get("id_ferreteria").then((theID) => {
                    this.id_ferreteria = theID;
                    this.ferreteriasService.getOne(this.id_ferreteria).then(datosFerreteria => {
                        this.ferreteria = datosFerreteria;
                        const attachments = Object.keys(this.ferreteria._attachments);
                        this.logoFerreteria = attachments[0];
                        this.dateUpdate = new Date(this.ferreteria.indicadores.info.date);
                        this.thisYear = this.dateUpdate.getFullYear();
                        this.lastYear = this.dateUpdate.getFullYear()-1;
                        this.drawCharts();
                        if (this.ferreteria.indicadores.compras.variacion.mes_indicador > 0) {
                            this.indicadorVariacion = "positivo";
                        }
                        else if (this.ferreteria.indicadores.compras.variacion.mes_indicador < 0) {
                            this.indicadorVariacion = "negativo";
                        }
                        else {
                            this.indicadorVariacion = "neutro";
                        }
                        if (this.ferreteria.indicadores.ventas.variacion.mes_indicador > 0) {
                            this.indicadorVariacionVentas = "positivo";
                        }
                        else if (this.ferreteria.indicadores.ventas.variacion.mes_indicador < 0) {
                            this.indicadorVariacionVentas = "negativo";
                        }
                        else {
                            this.indicadorVariacionVentas = "neutro";
                        }
                    });
                });
            }
        });
    }

}
