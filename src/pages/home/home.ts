import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, MenuController, Slides, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProtectedPage } from '../protected-page/protected-page';

import { AuthService } from '../../providers/auth-service';
import { FerreteriasService } from '../../providers/ferreterias-service';
import { InformercialService } from '../../providers/informercial-service';
import { EventosService } from '../../providers/eventos-service';
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
    slides: Array < any > = [];
    loaded: boolean = false;
    constructor(
        public nav: Nav,
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public appCtrl: App,
        public authService: AuthService,
        public ferreteriasService: FerreteriasService,
        public eventosService: EventosService,
        public informercialService: InformercialService,
        public noticiasService: NoticiasService) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
    }
    onSlideChanged() {
        this.slideIndex = this.slider.getActiveIndex();
    }
    drawChartNPS() {
        let total = this.ferreteria.indicadores.nps.locales[this.localSelected].total;
        this.npsValue = total;
        let p = this.ferreteria.indicadores.nps.locales[this.localSelected].p;
        let d = this.ferreteria.indicadores.nps.locales[this.localSelected].d;
        let n = this.ferreteria.indicadores.nps.locales[this.localSelected].n;

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
        myChart.update();
    }
    openNoticia(noticia) {
        this.navCtrl.push('NoticiaDetallePage', {
            noticia: this.noticia
        });
    }
    openSlide(slideV: any) {
        switch (slideV.type) {
            case 'informercial':
                this.navCtrl.push('InformacionComercialDetallePage', {
                    informercial: slideV.data
                });
                break;
            case 'evento':
                this.navCtrl.push('EventosDetallePage', {
                    evento: slideV.data
                });
                break;
        }
    }
    onSelectChange(selectedValue: any) {
        this.localSelected = selectedValue;
        this.drawChartNPS();
    }
    ionViewDidLoad() {
        this.menuCtrl.enable(true);
        this.ferreteriasService.saveFerreteria("1");
        this.storage.get('id_token').then(id_token => {
            if (id_token !== null) {
                this.storage.get("id_ferreteria").then((theID) => {
                    this.id_ferreteria = theID;
                    this.ferreteriasService.getOne(this.id_ferreteria).then(datosFerreteria => {
                        this.ferreteria = datosFerreteria;
                        this.drawChartNPS();
                    });
                    this.informercialService.getLast().then((datosInformercial: any) => {
                        const attachments = Object.keys(datosInformercial._attachments);
                        this.slides.push({
                            type: 'informercial',
                            id: datosInformercial._id,
                            data: datosInformercial,
                            imageUrl: this.cfg.apiUrl + this.cfg.informercial + '/' + datosInformercial._id + '/' + attachments[0]
                        });
                    });
                    this.eventosService.getLast().then((datosEventos: any) => {
                        const attachments = Object.keys(datosEventos._attachments);
                        this.slides.push({
                            type: 'evento',
                            id: datosEventos._id,
                            data: datosEventos,
                            imageUrl: this.cfg.apiUrl + this.cfg.eventos + '/' + datosEventos._id + '/' + attachments[0]
                        });
                        this.loaded = true;
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
