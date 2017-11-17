import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProtectedPage } from '../protected-page/protected-page';

import { AuthService } from '../../providers/auth-service';
import { ferreteriaModel } from '../../models/ferreteria.model';
import { FerreteriasService } from '../../providers/ferreterias-service';

import *  as AppConfig from '../../app/config';
import * as $ from 'jquery';
import Chart from 'chart.js';

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
        var parent = this;

        let total = this.ferreteria.indicadores.nps.locales[this.localSelected].total;
        this.npsValue = total;
        let p = this.ferreteria.indicadores.nps.locales[this.localSelected].p;
        let d = this.ferreteria.indicadores.nps.locales[this.localSelected].d;
        let n = this.ferreteria.indicadores.nps.locales[this.localSelected].n;
        
        var indicadoresCanvas = $("page-indicadores").last().find("#indicadores_donutChart");
        var indicadoresChart = new Chart(indicadoresCanvas, {
            type: 'pie',
            data: {
                labels: ["P", "D", "n"],
                datasets: [{
                    data: [p, d, n],
                    backgroundColor: [
                        '#009987',
                        '#0084B1',
                        '#9C5895',
                    ]
                }]
            },
            options: {
                cutoutPercentage: 50,
                legend: {
                    display: false
                },
                maintainAspectRatio: false
            }
        });
        indicadoresChart.update();

        var variacionChartCanvas = $("page-indicadores").last().find("#variacion_barChart");
        var variacionMesesBarChart = [];
        var variacionDataLastYear = [];
        var variacionDataThisYear = [];
        var variacionNumMonths = 0;
        this.dataVariacion = this.ferreteria.indicadores.compras.fechas;
        var variacionNumMax = this.dataVariacion.length;

        Object.keys(this.dataVariacion).forEach(function(key) {
            if (Number(key) < 3) {
                variacionNumMonths++;
                variacionMesesBarChart.push(parent.dataVariacion[key].mes);
                variacionDataLastYear.push(parent.dataVariacion[key].periodos.anterior);
                variacionDataThisYear.push(parent.dataVariacion[key].periodos.actual);
            }
        });
        var variacionChartData = {
            labels: variacionMesesBarChart,
            datasets: [{
                label: parent.lastYear,
                backgroundColor: '#4890E2',
                borderWidth: 0,
                data: variacionDataLastYear
            }, {
                label: parent.thisYear,
                backgroundColor: '#E50201',
                borderWidth: 1,
                data: variacionDataThisYear
            }]
        };
        var variacionBarChart = new Chart(variacionChartCanvas, {
            type: 'horizontalBar',
            data: variacionChartData,
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
        variacionBarChart.update();
        let ableToClickVariacion = true;
        $("page-indicadores").last().find("#variacionAdd").click(function(){
            if (ableToClickVariacion) {
                ableToClickVariacion = false;
                if (variacionNumMonths < variacionNumMax) {
                    variacionNumMonths++;
                    var newLabels = parent.dataVariacion[variacionNumMonths-1].mes;
                    variacionChartData.labels.push(newLabels);
                    variacionChartData.datasets[0].data.push(parent.dataVariacion[variacionNumMonths-1].periodos.anterior);
                    variacionChartData.datasets[1].data.push(parent.dataVariacion[variacionNumMonths-1].periodos.actual);
                    let alturaActual = $("page-indicadores").last().find("#variacion_barChart").parents(".barChart_container").outerHeight(true);
                    $("page-indicadores").last().find("#variacion_barChart").parents(".barChart_container").animate({
                        height: alturaActual + 30
                    }, 300, function() {
                        variacionBarChart.update();
                        ableToClickVariacion = true;
                    });
                }
                if (variacionNumMonths >= variacionNumMax) {
                    $("page-indicadores").last().find("#variacionAdd").stop().fadeOut(300);
                }
            }
        });
        var ventasChartCanvas = $("page-indicadores").last().find("#ventas_barChart");
        var ventasMesesBarChart = [];
        var ventasDataLastYear = [];
        var ventasDataThisYear = [];
        var ventasNumMonths = 0;
        this.dataVentas = this.ferreteria.indicadores.compras.fechas;
        var ventasNumMax = this.dataVentas.length;

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
        $("page-indicadores").last().find("#ventasAdd").click(function(){
            if (ableToClickVentas) {
                ableToClickVentas = false;
                if (ventasNumMonths < ventasNumMax) {
                    ventasNumMonths++;
                    var newLabels = parent.dataVentas[ventasNumMonths-1].mes;
                    ventasChartData.labels.push(newLabels);
                    ventasChartData.datasets[0].data.push(parent.dataVentas[ventasNumMonths-1].periodos.anterior);
                    ventasChartData.datasets[1].data.push(parent.dataVentas[ventasNumMonths-1].periodos.actual);
                    let alturaActual = $("page-indicadores").last().find("#ventas_barChart").parents(".barChart_container").outerHeight(true);
                    $("page-indicadores").last().find("#ventas_barChart").parents(".barChart_container").animate({
                        height: alturaActual + 30
                    }, 300, function() {
                        ventasBarChart.update();
                        ableToClickVentas = true;
                    });
                }
                if (ventasNumMonths >= ventasNumMax) {
                    $("page-indicadores").last().find("#ventasAdd").stop().fadeOut(300);
                }
            }
        });
    }
    onSelectChange(selectedValue: any) {
        this.localSelected = selectedValue;
        this.drawCharts();
    }
    ionViewDidLoad() {
        this.updateContent();
    }
    updateContent(){
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
                        this.lastYear = this.dateUpdate.getFullYear() - 1;
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
