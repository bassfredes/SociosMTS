webpackJsonp([4],{

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_module__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home__ = __webpack_require__(759);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__home__["a" /* HomePage */]),
                __WEBPACK_IMPORTED_MODULE_2__app_shared_module__["a" /* SharedModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__home__["a" /* HomePage */]
            ]
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 750:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProtectedPage; });
var ProtectedPage = /** @class */ (function () {
    function ProtectedPage(navCtrl, navParams, storage, appCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.appCtrl = appCtrl;
    }
    ProtectedPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('id_token').then(function (id_token) {
                if (id_token === null) {
                    _this.appCtrl.getRootNav().setRoot('WelcomePage');
                }
            });
            resolve();
        });
    };
    return ProtectedPage;
}());

//# sourceMappingURL=protected-page.js.map

/***/ }),

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ferreteriaModel; });
var ferreteriaModel = {
    _id: "",
    _rev: "",
    isActive: false,
    nombre: "",
    indicadores: {
        info: {
            date: "",
        },
        nps: {
            locales: [{
                    nombre_local: "",
                    rango_fecha: {
                        primera: "",
                        segunda: ""
                    },
                    total: 0,
                    p: 0,
                    d: 0,
                    n: 0
                }]
        },
        ivs: {
            puntaje: 0,
            tendencia: "",
            tamano: 0,
            tamano_tendencia: "",
            penetracion: 0,
            penetracion_tendencia: "",
            crecimiento: 0,
            crecimiento_tendencia: "",
            credito: 0,
            credito_tendencia: "",
            participacion: 0,
            participacion_tendencia: "",
        },
        orden_compra: {
            valor: 0,
            nacional: 0,
            stock_mts: 0,
            importacion: 0
        },
        compras: {
            valor: 0,
            variacion: {
                mes: "",
                mes_indicador: 0,
            },
            fechas: [{
                    mes: "",
                    periodos: {
                        actual: 0,
                        anterior: 0
                    }
                }, {
                    mes: "",
                    periodos: {
                        actual: 0,
                        anterior: 0
                    }
                }]
        },
        facturacion: {
            valor: 0,
            factura: 0,
            factura_tendencia: "neutro",
            nota_credito: 0,
            nota_credito_tendencia: "neutro",
            solicitud_nc: 0,
            solicitud_nc_tendencia: "neutro"
        },
        ventas: {
            valor: 0,
            variacion: {
                mes: "",
                mes_indicador: 0,
            },
            fechas: [{
                    mes: "",
                    periodos: {
                        actual: 0,
                        anterior: 0
                    }
                }, {
                    mes: "",
                    periodos: {
                        actual: 0,
                        anterior: 0
                    }
                }]
        },
        rapel_rebate: {
            ranking: 0,
            tendencia: "neutro",
            rapel: 0,
            rapel_indicador: 0,
            rebate: 0,
            rebate_indicador: 0,
            proyectado: 0,
            proyectado_indicador: 0
        }
    },
    _attachments: ""
};
//# sourceMappingURL=ferreteria.model.js.map

/***/ }),

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_ferreterias_service__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_noticias_service__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_ferreteria_model__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_config__ = __webpack_require__(37);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage(nav, navCtrl, navParams, menuCtrl, storage, appCtrl, authService, ferreteriasService, noticiasService) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.nav = nav;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.appCtrl = appCtrl;
        _this.authService = authService;
        _this.ferreteriasService = ferreteriasService;
        _this.noticiasService = noticiasService;
        _this.ferreteria = __WEBPACK_IMPORTED_MODULE_7__models_ferreteria_model__["a" /* ferreteriaModel */];
        _this.noticiasImage = false;
        _this.itemExpandHeight = 200;
        _this.id_ferreteria = "1";
        _this.npsValue = 0;
        _this.valorTotal = 100;
        _this.localSelected = 0;
        _this.slideIndex = 0;
        _this.cfg = __WEBPACK_IMPORTED_MODULE_8__app_config__["a" /* cfg */];
        return _this;
    }
    HomePage.prototype.onSlideChanged = function () {
        this.slideIndex = this.slider.getActiveIndex();
    };
    HomePage.prototype.drawChartNPS = function () {
        google.charts.setOnLoadCallback(drawChart);
        var parent = this;
        function drawChart() {
            var full = 100;
            var chart = new google.visualization.PieChart(document.getElementById('home_donutChart'));
            var total = parent.ferreteria.indicadores.nps.locales[parent.localSelected].total;
            parent.npsValue = total;
            var p = parent.ferreteria.indicadores.nps.locales[parent.localSelected].p;
            var d = parent.ferreteria.indicadores.nps.locales[parent.localSelected].d;
            var n = parent.ferreteria.indicadores.nps.locales[parent.localSelected].n;
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
            var handler = setInterval(function () {
                data = google.visualization.arrayToDataTable([
                    ['indicador', 'valor'],
                    ['P', p * counter],
                    ['D', d * counter],
                    ['n', n * counter],
                    ['nulo', full - counterNeg],
                ]);
                counter = counter + 0.1;
                counterNeg = counterNeg + 10;
                counter = Math.round(counter * 10) / 10;
                if (counter > 1) {
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
        }
    };
    HomePage.prototype.openPage = function (page) {
        this.navCtrl.push(page, {
            noticia: this.noticias
        });
    };
    HomePage.prototype.onSelectChange = function (selectedValue) {
        this.localSelected = selectedValue;
        this.drawChartNPS();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.ferreteriasService.saveFerreteria("1");
        this.storage.get('id_token').then(function (id_token) {
            if (id_token !== null) {
                _this.storage.get("id_ferreteria").then(function (theID) {
                    _this.id_ferreteria = theID;
                    _this.ferreteriasService.getOne(_this.id_ferreteria).then(function (datosFerreteria) {
                        _this.ferreteria = datosFerreteria;
                        _this.slides = [
                            {
                                imageUrl: 'assets/images/lists/slide01.jpg'
                            }, {
                                imageUrl: 'assets/images/lists/slide02.jpg'
                            }
                        ];
                        _this.drawChartNPS();
                    });
                    _this.noticiasService.getLast().then(function (noticias) {
                        _this.noticias = noticias;
                        if (_this.noticias._attachments) {
                            var attachments = Object.keys(_this.noticias._attachments);
                            _this.noticiasImage = _this.cfg.apiUrl + '/noticias/' + _this.noticias._id + '/' + attachments[0];
                        }
                    });
                });
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slider'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
    ], HomePage.prototype, "slider", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content class="contentInterior">\n    <ion-grid>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <accordion-list class="no-margin" title="NPS" desplegable="false" subtitle="" maxHeight="350" contentColor="#F5F5F5" textColor="#000000" hasMargin="false">\n                    <div class="chartNPS">\n                        <h2 class="small capitalize normalLetter">Local</h2>\n                        <ion-item class="no-padding" margin-top>\n                            <ion-label>Selecciona un Local</ion-label>\n                            <ion-select [(ngModel)]="localSelected" class="sinLabel" cancelText="Cancelar" okText="Aceptar" (ionChange)="onSelectChange($event)">\n                                <ion-option *ngFor="let local of ferreteria.indicadores.nps.locales; index as i" [value]="i">{{local.nombre_local}}</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <div id="home_donutChart"></div>\n                        <div class="legendChart">\n                            <div class="stadisticsChart">\n                                <div class="p">P = {{ferreteria.indicadores.nps.locales[localSelected].p}}</div>\n                                <div class="d">D = {{ferreteria.indicadores.nps.locales[localSelected].d}}</div>\n                                <div class="n">N = {{ferreteria.indicadores.nps.locales[localSelected].n}}</div>\n                            </div>\n                            <div class="centeredChart">\n                                {{npsValue}}\n                            </div>\n                        </div>\n                        <div class="text-center rangoFecha capitalize">Desde {{ferreteria.indicadores.nps.locales[0].rango_fecha.primera}} Hasta {{ferreteria.indicadores.nps.locales[localSelected].rango_fecha.segunda}}</div>\n                    </div>\n                </accordion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <div class="bloqueBlancoNoPadding no-padding">\n                    <div class="infocomercial" *ngIf="slides">\n                        <ion-slides #slider pager="true" autoplay="6000" (ionSlideWillChange)="onSlideChanged()">\n                            <ion-slide *ngFor="let slide of slides" class="slide-background">\n                                <div class="imagen" *ngIf="slide">\n                                    <lazy-img width="100%" inputSrc="{{slide.imageUrl}}"></lazy-img>\n                                </div>\n                            </ion-slide>\n                        </ion-slides>\n                    </div>\n                </div>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around *ngIf="noticias">\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <ion-list no-lines class="noticias">\n                    <button ion-item class="no-padding" (click)="openPage(\'NoticiaDetallePage\',noticias);" detail-push>\n                        <div class="imageNoticia" *ngIf="noticiasImage">\n                            <lazy-img width="100%" inputSrc="{{noticiasImage}}"></lazy-img>\n                        </div>\n                        <div class="detalles">\n                            <h2 text-wrap>{{noticias.title}}</h2>\n                            <div class="dates">\n                                <span class="since">{{noticias.updated_at | amLocale:\'es\' | amTimeAgo}}</span><span class="date">{{noticias.updated_at | date : "dd \' \' MMMM \' \' yyyy"}}</span>\n                            </div>\n                            <div class="bajada" text-wrap>\n                                <p>{{noticias.body | words : 15 }}</p>\n                                <a class="more" href="#">Leer más</a>\n                            </div>\n                        </div>\n                    </button>\n                </ion-list>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_ferreterias_service__["a" /* FerreteriasService */],
            __WEBPACK_IMPORTED_MODULE_6__providers_noticias_service__["a" /* NoticiasService */]])
    ], HomePage);
    return HomePage;
}(__WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=4.js.map