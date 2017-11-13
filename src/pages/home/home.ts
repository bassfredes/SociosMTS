import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, MenuController, Slides, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProtectedPage } from '../protected-page/protected-page';
import { NoticiaDetallePage } from '../noticia-detalle/noticia-detalle';

import { AuthService } from '../../providers/auth-service';
import { FerreteriasService } from '../../providers/ferreterias-service';
import { NoticiasService } from '../../providers/noticias-service';
import { ferreteriaModel } from '../../models/ferreteria.model';

import *  as AppConfig from '../../app/config';
import * as $ from 'jquery';
import Chart from 'chart.js';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage extends ProtectedPage {
    private cfg: any;
    public ferreteria = ferreteriaModel;
    @ViewChild('slider') slider: Slides;

    noticia: any;
    noticiasImage: any = false;

    itemExpandHeight: number = 200;

    id_ferreteria: string = "1";
    npsValue: number = 0;
    valorTotal: number = 100;
    localSelected: number = 0;

    slideIndex = 0;
    slides: any;
    constructor(
        public nav: Nav,
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public appCtrl: App,
        public authService: AuthService,
        public ferreteriasService: FerreteriasService,
        public noticiasService: NoticiasService) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
    }
    onSlideChanged() {
        this.slideIndex = this.slider.getActiveIndex();
    }
    drawChartNPS() {
        let full = 100;
        let total = this.ferreteria.indicadores.nps.locales[this.localSelected].total;
        this.npsValue = total;
        let p = this.ferreteria.indicadores.nps.locales[this.localSelected].p;
        let d = this.ferreteria.indicadores.nps.locales[this.localSelected].d;
        let n = this.ferreteria.indicadores.nps.locales[this.localSelected].n;
        /*
        const chart = new google.visualization.PieChart(document.getElementById('home_donutChart'));
        var data = google.visualization.arrayToDataTable([
            ['indicador', 'valor'],
            ['P', 0],
            ['D', 0],
            ['n', 0],
            ['nulo', full],
        ]);
        var options = {
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
        chart.draw(data, options);
        var counter = 0;
        var counterNeg = 0;

        var handler = setInterval(function(){
            data = google.visualization.arrayToDataTable([
                ['indicador', 'valor'],
                ['P', p*counter],
                ['D', d*counter],
                ['n', n*counter],
                ['nulo', full-counterNeg],
            ]);
            counter = counter + 0.1;
            counterNeg = counterNeg + 10;
            counter = Math.round( counter * 10 ) / 10

            if (counter > 1){
                clearInterval(handler);
                data = google.visualization.arrayToDataTable([
                    ['indicador', 'valor'],
                    ['P', p],
                    ['D', d],
                    ['n', n],
                    ['nulo', 0],
                ]);
            }
            chart.draw(data, options);
        }, 10);
        */
        var ctx = $("#home_donutChart").last();
        var myChart = new Chart(ctx, {
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
    }
    openNoticia(page: string) {
        this.navCtrl.push(page, {
            noticia: this.noticia
        });
    }
    onSelectChange(selectedValue: any) {
        this.localSelected = selectedValue;
        this.drawChartNPS();
    }
    ionViewDidLoad() {
        this.ferreteriasService.saveFerreteria("1");
        this.storage.get('id_token').then(id_token => {
            if (id_token !== null) {
                this.storage.get("id_ferreteria").then((theID) => {
                    this.id_ferreteria = theID;
                    this.ferreteriasService.getOne(this.id_ferreteria).then(datosFerreteria => {
                        this.ferreteria = datosFerreteria;
                        this.slides = [
                            {
                                imageUrl: 'assets/images/lists/slide01.jpg'
                            }, {
                                imageUrl: 'assets/images/lists/slide02.jpg'
                            }
                        ];
                        this.drawChartNPS();
                    });
                    this.noticiasService.getLast().then(noticiaData => {
                        this.noticia = noticiaData;
                        if (this.noticia._attachments) {
                            const attachments = Object.keys(this.noticia._attachments);
                            this.noticiasImage = this.cfg.apiUrl + this.cfg.noticias + '/' + this.noticia._id + '/' + attachments[0];
                        }
                    });
                });
            }
        });
    }

}
