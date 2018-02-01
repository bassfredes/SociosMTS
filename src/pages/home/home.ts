import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, MenuController, ToastController, Slides, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { ProtectedPage } from '../protected-page/protected-page';

import { AuthService } from '../../providers/auth-service';
import { FerreteriasService } from '../../providers/ferreterias-service';
import { InformercialService } from '../../providers/informercial-service';
import { EventosService } from '../../providers/eventos-service';
import { NoticiasService } from '../../providers/noticias-service';
import { ferreteriaModel } from '../../models/ferreteria.model';
import { ImgcacheService } from '../../global/services/';
import { CacheService } from "ionic-cache";
import { ConnectivityService } from '../../providers/connectivity-service';

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
    logoFerreteria: string;
    npsValue: number = 0;
    valorTotal: number = 100;
    localSelected: number = 0;

    slideIndex = 0;
    slides: Array < any > = [];
    loaded: boolean = false;

    listaSocios: any;
    listaSociosFiltered: any;
    mostrarSocios: boolean = false;
    term: string = '';

    tipoUsuario = "socio";
    hasNPS: boolean = false;

    pValue = 0;
    dValue = 0;
    nValue = 0;
    primeraFecha = "";
    segundaFecha = "";

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
        public keyboard: Keyboard,
        public toastCtrl: ToastController,
        public imgCacheService: ImgcacheService,
        public noticiasService: NoticiasService,
        public connectivityService: ConnectivityService) {
        super(navCtrl, navParams, storage, appCtrl);
        this.cfg = AppConfig.cfg;
    }
    mostrarLista() {
        if (this.mostrarSocios) {
            this.mostrarSocios = false;
        }
        else {
            this.mostrarSocios = true;
        }
    }
    searchFn(ev: any) {
        this.term = ev.target.value;
        if (this.term) {
            this.listaSociosFiltered = this.listaSocios.filter((socio) => {
                return (socio.doc.nombre.toLowerCase().indexOf(this.term.toLowerCase()) > -1);
            })
            this.mostrarSocios = true;
        }
        else {
            this.listaSociosFiltered = this.listaSocios;
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
    changeSocio(socio) {
        this.mostrarSocios = false;
        this.ferreteriasService.saveFerreteria(socio.doc._id);
        this.loadContentSocio();
    }
    onSlideChanged() {
        this.slideIndex = this.slider.getActiveIndex();
    }
    drawChartNPS() {
        let total, p, d, n;
        if (this.ferreteria.indicadores.nps.locales.length >= 1) {
            $(".containerNPS").stop().slideDown(300);
            this.hasNPS = true;
            total = this.ferreteria.indicadores.nps.locales[this.localSelected].total;
            this.npsValue = total;
            p = this.ferreteria.indicadores.nps.locales[this.localSelected].p;
            this.pValue = p;
            d = this.ferreteria.indicadores.nps.locales[this.localSelected].d;
            this.dValue = d;
            n = this.ferreteria.indicadores.nps.locales[this.localSelected].n;
            this.nValue = n;
            this.primeraFecha = this.ferreteria.indicadores.nps.locales[this.localSelected].rango_fecha.primera;
            this.segundaFecha = this.ferreteria.indicadores.nps.locales[this.localSelected].rango_fecha.segunda;
        }
        else {
            $(".containerNPS").stop().hide();
            this.hasNPS = false;
            total = 0;
            this.npsValue = 0;
            p = 0;
            this.pValue = p;
            d = 0;
            this.dValue = d;
            n = 0;
            this.nValue = n;
        }

        var ctx = $("#home_npsChart").last();
        if(ctx.length){
            var chartNPS = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["P", "D", "N"],
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
            chartNPS.update();
        }
    }
    openNoticia() {
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
    loadContentSocio() {
        this.storage.get('id_token').then(id_token => {
            if (id_token !== null) {
                this.storage.get("id_ferreteria").then((theID) => {
                    this.id_ferreteria = theID;
                    this.ferreteriasService.getOne(this.id_ferreteria).then(datosFerreteria => {
                        this.ferreteria = datosFerreteria;
                        let attachments = ["logo_default.png"];
                        if (this.ferreteria._attachments != "" && this.ferreteria._attachments !== undefined && this.ferreteria._attachments !== null){
                            attachments = Object.keys(this.ferreteria._attachments);
                        }
                        this.logoFerreteria = attachments[0];
                        let urlLogo;
                        if (this.logoFerreteria == "logo_default.png"){
                            urlLogo = this.cfg.apiUrl + this.cfg.urlLogoFallback + this.logoFerreteria;
                        }
                        else {
                            urlLogo = this.cfg.apiUrl + '/ferreterias/' + this.ferreteria._id + '/' + this.logoFerreteria;
                        }
                        this.imgCacheService.cacheImg(urlLogo).then((value) => {
                            urlLogo = value;
                            $("#logoHome").find("img").attr("src", urlLogo);
                        });
                        this.drawChartNPS();
                    });
                    this.ferreteriasService.getAll().then(datosFerreterias => {
                        this.listaSocios = datosFerreterias;
                        this.listaSociosFiltered = this.listaSocios;
                    });
                });
            }
        });
    }
    ionViewDidLoad() {
        this.menuCtrl.enable(true);
        this.ferreteriasService.saveFerreteria("4");
        this.storage.get('user_type').then(user_type => {
            this.tipoUsuario = user_type
        });
        this.loadContentSocio();

        this.slides = [];
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
            if (noticiaData) {
                this.noticia = noticiaData[0];
                this.noticiasService.getAttachment(noticiaData).then((datosAttachment: any) => {
                    if (datosAttachment) {
                        const attachments = datosAttachment.media_details.sizes.thumbNoticia.source_url;
                        this.noticiasImage = attachments;
                    }
                    else {
                        this.noticiasImage = this.cfg.apiUrl + this.cfg.urlLogoFallback + this.logoFerreteria;
                    }
                });
            }
            else {
                this.noticia = false;
            }
        });
    }
}
