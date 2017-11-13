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
        /*
        let parent = this;
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
        */
        let full = 100;
        let total = this.ferreteria.indicadores.nps.locales[this.localSelected].total;
        this.npsValue = total;
        let p = this.ferreteria.indicadores.nps.locales[this.localSelected].p;
        let d = this.ferreteria.indicadores.nps.locales[this.localSelected].d;
        let n = this.ferreteria.indicadores.nps.locales[this.localSelected].n;
        /*
        var chart_nps = new google.visualization.PieChart(document.getElementById('indicadores_donutChart'));
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
        */
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
        /*
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
                if (data_variacion.getNumberOfRows() < 3) {
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
                if (ableToClick) {
                    ableToClick = false;
                    if (data_variacion.getNumberOfRows() < numMax) {
                        data_variacion.addRow([parent.dataVariacion[data_variacion.getNumberOfRows()].mes, parent.dataVariacion[data_variacion.getNumberOfRows()].periodos.anterior, parent.dataVariacion[data_variacion.getNumberOfRows()].periodos.actual]);
                        let alturaActual = $("#variacion_barChart").outerHeight(true);
                        $("#variacion_barChart").animate({
                            height: alturaActual + 30
                        }, 300, function() {
                            drawVariacion();
                            ableToClick = true;
                        });
                    }
                    if (data_variacion.getNumberOfRows() >= numMax) {
                        $("#variacionAdd").stop().fadeOut(300);
                    }
                }
            }
        }
        */
        var ventasChartCanvas = $("page-indicadores").last().find("#ventas_barChart");
        var ventasMesesBarChart = [];
        var ventasDataLastYear = [];
        var ventasDataThisYear = [];
        var ventasNumMonths = 0;
        this.dataVentas = this.ferreteria.indicadores.compras.fechas;
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
        /*
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
                if (data_ventas.getNumberOfRows() < 3) {
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
                if (ableToClick) {
                    ableToClick = false;
                    if (data_ventas.getNumberOfRows() < numMax) {
                        data_ventas.addRow([parent.dataVentas[data_ventas.getNumberOfRows()].mes, parent.dataVentas[data_ventas.getNumberOfRows()].periodos.anterior, parent.dataVentas[data_ventas.getNumberOfRows()].periodos.actual]);
                        let alturaActual = $("#ventas_barChart").outerHeight(true);
                        $("#ventas_barChart").animate({
                            height: alturaActual + 30
                        }, 300, function() {
                            drawVentas();
                            ableToClick = true;
                        });
                    }
                    if (data_ventas.getNumberOfRows() >= numMax) {
                        $("#ventasAdd").stop().fadeOut(300);
                    }
                }
            }
        }
        */
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
