webpackJsonp([2],{

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicadoresPageModule", function() { return IndicadoresPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_module__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__indicadores__ = __webpack_require__(753);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var IndicadoresPageModule = /** @class */ (function () {
    function IndicadoresPageModule() {
    }
    IndicadoresPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__indicadores__["a" /* IndicadoresPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__indicadores__["a" /* IndicadoresPage */]),
                __WEBPACK_IMPORTED_MODULE_2__app_shared_module__["a" /* SharedModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__indicadores__["a" /* IndicadoresPage */]
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ]
        })
    ], IndicadoresPageModule);
    return IndicadoresPageModule;
}());

//# sourceMappingURL=indicadores.module.js.map

/***/ }),

/***/ 742:
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

/***/ 743:
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

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndicadoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_ferreteria_model__ = __webpack_require__(743);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_ferreterias_service__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jquery__);
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









var IndicadoresPage = /** @class */ (function (_super) {
    __extends(IndicadoresPage, _super);
    function IndicadoresPage(navCtrl, navParams, menuCtrl, storage, appCtrl, authService, ferreteriasService) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.appCtrl = appCtrl;
        _this.authService = authService;
        _this.ferreteriasService = ferreteriasService;
        _this.ferreteria = __WEBPACK_IMPORTED_MODULE_5__models_ferreteria_model__["a" /* ferreteriaModel */];
        _this.id_ferreteria = "1";
        _this.npsValue = 0;
        _this.valorTotal = 100;
        _this.localSelected = 0;
        _this.indicadorVariacion = "";
        _this.indicadorVariacionVentas = "";
        _this.cfg = __WEBPACK_IMPORTED_MODULE_7__app_config__["a" /* cfg */];
        return _this;
    }
    IndicadoresPage.prototype.drawCharts = function () {
        var parent = this;
        google.charts.setOnLoadCallback(chartNPS);
        google.charts.setOnLoadCallback(chartVariacion);
        google.charts.setOnLoadCallback(chartVentas);
        var options_nps = {
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
        var options_variacion = {
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
            var full = 100;
            var chart_nps = new google.visualization.PieChart(document.getElementById('indicadores_donutChart'));
            var total = parent.ferreteria.indicadores.nps.locales[parent.localSelected].total;
            parent.npsValue = total;
            var p = parent.ferreteria.indicadores.nps.locales[parent.localSelected].p;
            var d = parent.ferreteria.indicadores.nps.locales[parent.localSelected].d;
            var n = parent.ferreteria.indicadores.nps.locales[parent.localSelected].n;
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
            var handler = setInterval(function () {
                var resta = full - counterNeg;
                if (resta < 0)
                    resta = 0;
                data_nps = google.visualization.arrayToDataTable([
                    ['indicador', 'valor'],
                    ['P', p * counter],
                    ['D', d * counter],
                    ['n', n * counter],
                    ['nulo', resta],
                ]);
                counter = counter + 0.1;
                counterNeg = counterNeg + 10;
                counter = Math.round(counter * 10) / 10;
                if (counter > 1) {
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
            Object.keys(parent.dataVariacion).forEach(function (key) {
                var mes = parent.dataVariacion[key].mes;
                var periodoAnterior = parent.dataVariacion[key].periodos.anterior;
                var periodoActual = parent.dataVariacion[key].periodos.actual;
                if (data_variacion.getNumberOfRows() < 3) {
                    data_variacion.addRow([mes, periodoAnterior, periodoActual]);
                }
            });
            function drawVariacion() {
                chart_variacion.draw(data_variacion, options_variacion);
            }
            drawVariacion();
            var addButton = document.getElementById('variacionAdd');
            var ableToClick = true;
            addButton.onclick = function () {
                if (ableToClick) {
                    ableToClick = false;
                    if (data_variacion.getNumberOfRows() < numMax) {
                        data_variacion.addRow([parent.dataVariacion[data_variacion.getNumberOfRows()].mes, parent.dataVariacion[data_variacion.getNumberOfRows()].periodos.anterior, parent.dataVariacion[data_variacion.getNumberOfRows()].periodos.actual]);
                        var alturaActual = __WEBPACK_IMPORTED_MODULE_8_jquery__("#variacion_barChart").outerHeight(true);
                        __WEBPACK_IMPORTED_MODULE_8_jquery__("#variacion_barChart").animate({
                            height: alturaActual + 30
                        }, 300, function () {
                            drawVariacion();
                            ableToClick = true;
                        });
                    }
                    if (data_variacion.getNumberOfRows() >= numMax) {
                        __WEBPACK_IMPORTED_MODULE_8_jquery__("#variacionAdd").stop().fadeOut(300);
                    }
                }
            };
        }
        function chartVentas() {
            var chart_ventas = new google.visualization.BarChart(document.getElementById('ventas_barChart'));
            var data_ventas = new google.visualization.DataTable();
            parent.dataVentas = parent.ferreteria.indicadores.ventas.fechas;
            data_ventas.addColumn('string', ' ');
            data_ventas.addColumn('number', parent.lastYear);
            data_ventas.addColumn('number', parent.thisYear);
            var numMax = parent.dataVentas.length;
            Object.keys(parent.dataVentas).forEach(function (key) {
                var mes = parent.dataVentas[key].mes;
                var periodoAnterior = parent.dataVentas[key].periodos.anterior;
                var periodoActual = parent.dataVentas[key].periodos.actual;
                if (data_ventas.getNumberOfRows() < 3) {
                    data_ventas.addRow([mes, periodoAnterior, periodoActual]);
                }
            });
            function drawVentas() {
                chart_ventas.draw(data_ventas, options_variacion);
            }
            drawVentas();
            var addVentasButton = document.getElementById('ventasAdd');
            var ableToClick = true;
            addVentasButton.onclick = function () {
                if (ableToClick) {
                    ableToClick = false;
                    if (data_ventas.getNumberOfRows() < numMax) {
                        data_ventas.addRow([parent.dataVentas[data_ventas.getNumberOfRows()].mes, parent.dataVentas[data_ventas.getNumberOfRows()].periodos.anterior, parent.dataVentas[data_ventas.getNumberOfRows()].periodos.actual]);
                        var alturaActual = __WEBPACK_IMPORTED_MODULE_8_jquery__("#ventas_barChart").outerHeight(true);
                        __WEBPACK_IMPORTED_MODULE_8_jquery__("#ventas_barChart").animate({
                            height: alturaActual + 30
                        }, 300, function () {
                            drawVentas();
                            ableToClick = true;
                        });
                    }
                    if (data_ventas.getNumberOfRows() >= numMax) {
                        __WEBPACK_IMPORTED_MODULE_8_jquery__("#ventasAdd").stop().fadeOut(300);
                    }
                }
            };
        }
    };
    IndicadoresPage.prototype.onSelectChange = function (selectedValue) {
        this.localSelected = selectedValue;
        this.drawCharts();
    };
    IndicadoresPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('id_token').then(function (id_token) {
            if (id_token !== null) {
                _this.storage.get("id_ferreteria").then(function (theID) {
                    _this.id_ferreteria = theID;
                    _this.ferreteriasService.getOne(_this.id_ferreteria).then(function (datosFerreteria) {
                        _this.ferreteria = datosFerreteria;
                        var attachments = Object.keys(_this.ferreteria._attachments);
                        _this.logoFerreteria = _this.cfg.apiUrl + '/ferreterias/' + _this.id_ferreteria + '/' + attachments[0];
                        _this.dateUpdate = new Date(_this.ferreteria.indicadores.info.date);
                        _this.thisYear = _this.dateUpdate.getFullYear();
                        _this.lastYear = _this.dateUpdate.getFullYear() - 1;
                        _this.drawCharts();
                        if (_this.ferreteria.indicadores.compras.variacion.mes_indicador > 0) {
                            _this.indicadorVariacion = "positivo";
                        }
                        else if (_this.ferreteria.indicadores.compras.variacion.mes_indicador < 0) {
                            _this.indicadorVariacion = "negativo";
                        }
                        else {
                            _this.indicadorVariacion = "neutro";
                        }
                        if (_this.ferreteria.indicadores.ventas.variacion.mes_indicador > 0) {
                            _this.indicadorVariacionVentas = "positivo";
                        }
                        else if (_this.ferreteria.indicadores.ventas.variacion.mes_indicador < 0) {
                            _this.indicadorVariacionVentas = "negativo";
                        }
                        else {
                            _this.indicadorVariacionVentas = "neutro";
                        }
                    });
                });
            }
        });
    };
    IndicadoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-indicadores',template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/indicadores/indicadores.html"*/'<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content class="contentInterior">\n    <ion-grid>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <h1 class="text-center uppercase">Indicadores</h1>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <div class="text-center">\n                    <img class="logoRounded" src="{{logoFerreteria}}" />\n                </div>\n                <h4 class="text-center capitalize">{{ferreteria.nombre}}</h4>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <accordion-list class="no-margin" title="NPS" desplegable="false" subtitle="" maxHeight="350" contentColor="#F5F5F5" textColor="#000000" hasMargin="false">\n                    <div class="chartNPS">\n                        <h2 class="small capitalize normalLetter">Local</h2>\n                        <ion-item class="no-padding" margin-top>\n                            <ion-label>Selecciona un Local</ion-label>\n                            <ion-select [(ngModel)]="localSelected" class="sinLabel" cancelText="Cancelar" okText="Aceptar" (ionChange)="onSelectChange($event)">\n                                <ion-option *ngFor="let local of ferreteria.indicadores.nps.locales; index as i" [value]="i">{{local.nombre_local}}</ion-option>\n                            </ion-select>\n                        </ion-item>\n                        <div id="indicadores_donutChart"></div>\n                        <div class="legendChart">\n                            <div class="stadisticsChart">\n                                <div class="p">P = {{ferreteria.indicadores.nps.locales[localSelected].p}}</div>\n                                <div class="d">D = {{ferreteria.indicadores.nps.locales[localSelected].d}}</div>\n                                <div class="n">N = {{ferreteria.indicadores.nps.locales[localSelected].n}}</div>\n                            </div>\n                            <div class="centeredChart">\n                                {{npsValue}}\n                            </div>\n                        </div>\n                        <div class="text-center rangoFecha capitalize">Desde {{ferreteria.indicadores.nps.locales[0].rango_fecha.primera}} Hasta {{ferreteria.indicadores.nps.locales[localSelected].rango_fecha.segunda}}</div>\n                    </div>\n                </accordion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <accordion-list class="no-margin {{ferreteria.indicadores.ivs.tendencia}}" title="IVS" subtitle="" fecha="{{ferreteria.indicadores.compras.variacion.mes | slice : 0:3 }}. {{thisYear}}" valorIndicador="{{ferreteria.indicadores.ivs.puntaje}}" valor="" desplegable="false" button="true" maxHeight="200" contentColor="#F5F5F5" hasMargin="false">\n                    <div class="chartIndi">\n                        <ion-list class="indicadores">\n                            <ion-item no-lines class="indicador">\n                                <div class="indicadorBullet {{ferreteria.indicadores.ivs.tamano_tendencia}}"></div>\n                                <span class="title">Tamaño</span>\n                                <span class="valor">{{ferreteria.indicadores.ivs.tamano}}</span>\n                            </ion-item>\n                            <ion-item no-lines class="indicador">\n                                <div class="indicadorBullet {{ferreteria.indicadores.ivs.penetracion_tendencia}}"></div>\n                                <span class="title">Penetración</span>\n                                <span class="valor">{{ferreteria.indicadores.ivs.penetracion}}</span>\n                            </ion-item>\n                            <ion-item no-lines class="indicador">\n                                <div class="indicadorBullet {{ferreteria.indicadores.ivs.crecimiento_tendencia}}"></div>\n                                <span class="title">Crecimiento</span>\n                                <span class="valor">{{ferreteria.indicadores.ivs.crecimiento}}</span>\n                            </ion-item>\n                            <ion-item no-lines class="indicador">\n                                <div class="indicadorBullet {{ferreteria.indicadores.ivs.credito_tendencia}}"></div>\n                                <span class="title">Crédito</span>\n                                <span class="valor">{{ferreteria.indicadores.ivs.credito}}</span>\n                            </ion-item>\n                            <ion-item no-lines class="indicador">\n                                <div class="indicadorBullet {{ferreteria.indicadores.ivs.participacion_tendencia}}"></div>\n                                <span class="title">Participación</span>\n                                <span class="valor">{{ferreteria.indicadores.ivs.participacion}}</span>\n                            </ion-item>\n                        </ion-list>\n                    </div>\n                </accordion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <accordion-list class="no-margin" title="Orden de Compra" subtitle="" desplegable="true" maxHeight="175" contentColor="#F5F5F5" textColor="#000000" hasMargin="false">\n                    <h2 class="large">MM$ {{ferreteria.indicadores.orden_compra.valor}}</h2>\n                    <div class="chartOrdenCompras">\n                        <ion-list class="indicadores">\n                            <ion-item no-lines class="indicador">\n                                <div class="indicadorBullet transparent"></div>\n                                <span class="title">Nacional</span>\n                                <span class="valor">{{ferreteria.indicadores.orden_compra.nacional}}</span>\n                            </ion-item>\n                            <ion-item no-lines class="indicador">\n                                <div class="indicadorBullet transparent"></div>\n                                <span class="title">Stock MTS</span>\n                                <span class="valor">{{ferreteria.indicadores.orden_compra.stock_mts}}</span>\n                            </ion-item>\n                            <ion-item no-lines class="indicador">\n                                <div class="indicadorBullet transparent"></div>\n                                <span class="title">Importación</span>\n                                <span class="valor">{{ferreteria.indicadores.orden_compra.importacion}}</span>\n                            </ion-item>\n                        </ion-list>\n                    </div>\n                </accordion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <accordion-list class="no-margin" title="Compras" subtitle="{{ferreteria.indicadores.compras.variacion.mes | slice : 0:3 }}. {{ferreteria.indicadores.compras.valor}} MM$" desplegable="true" masMeses="true" masMesesButton="variacionAdd" maxHeight="1200" contentColor="#F5F5F5" textColor="#000000" hasMargin="false">\n                    <div class="variaciones text-center">\n                        <div class="title">Variación {{thisYear}} v/s {{lastYear}}:</div>\n                        <div class="variacion capitalize {{indicadorVariacion}}">\n                            <span class="texto">\n                                A {{ferreteria.indicadores.compras.variacion.mes}} = <strong>{{ferreteria.indicadores.compras.variacion.mes_indicador}}</strong> %\n                            </span>\n                        </div>\n                    </div>\n                    <div class="chartCompras">\n                        <h2 class="small capitalize normalLetter">Compras en MM$</h2>\n                        <div id="variacion_barChart"></div>\n                    </div>\n                </accordion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <accordion-list class="no-margin" title="Facturación MTS" subtitle=""  valor="" desplegable="true" maxHeight="200" contentColor="#F5F5F5" textColor="#000000" hasMargin="false">\n                    <div class="chartIndi">\n                        <h2 class="small capitalize normalLetter">MM$ {{ferreteria.indicadores.facturacion.valor}}</h2>\n                        <ion-list margin-top class="indicadores">\n                            <ion-item no-lines class="indicador">\n                                <div class="indicadorBullet {{ferreteria.indicadores.facturacion.factura_tendencia}}"></div>\n                                <span class="title">Factura</span>\n                                <span class="valor">{{ferreteria.indicadores.facturacion.factura}}</span>\n                            </ion-item>\n                            <ion-item no-lines class="indicador">\n                                <div class="indicadorBullet {{ferreteria.indicadores.facturacion.nota_credito_tendencia}}"></div>\n                                <span class="title">Nota de Crédito</span>\n                                <span class="valor">{{ferreteria.indicadores.facturacion.nota_credito}}</span>\n                            </ion-item>\n                            <ion-item no-lines class="indicador">\n                                <div class="indicadorBullet {{ferreteria.indicadores.facturacion.solicitud_nc_tendencia}}"></div>\n                                <span class="title">Solicitud NC</span>\n                                <span class="valor">{{ferreteria.indicadores.facturacion.solicitud_nc}}</span>\n                            </ion-item>\n                        </ion-list>\n                    </div>\n                </accordion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <accordion-list class="no-margin" title="Ventas a cliente" subtitle="{{ferreteria.indicadores.ventas.variacion.mes | slice : 0:3 }}. {{ferreteria.indicadores.ventas.valor}} MM$" desplegable="true" masMeses="true" masMesesButton="ventasAdd" maxHeight="1200" contentColor="#F5F5F5" textColor="#000000" hasMargin="false">\n                    <div class="variaciones text-center">\n                        <div class="title">Variación {{thisYear}} v/s {{lastYear}}:</div>\n                        <div class="variacion capitalize {{indicadorVariacionVentas}}">\n                            <span class="texto">\n                                A {{ferreteria.indicadores.ventas.variacion.mes}} = <strong>{{ferreteria.indicadores.ventas.variacion.mes_indicador}}</strong> %\n                            </span>\n                        </div>\n                    </div>\n                    <div class="chartCompras">\n                        <h2 class="small capitalize normalLetter">Ventas en MM$</h2>\n                        <div id="ventas_barChart"></div>\n                    </div>\n                </accordion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <accordion-list class="no-margin" title="Rapel y Rebate" subtitle=""  valor="" desplegable="true" maxHeight="200" contentColor="#F5F5F5" textColor="#000000" hasMargin="false">\n                    <div class="chartIndi normalLetter">\n                        <h2 class="small capitalize {{ferreteria.indicadores.rapel_rebate.tendencia}}">Ranking {{ferreteria.indicadores.rapel_rebate.ranking}}</h2>\n                        <h3 class="noTransform">Acumulado anual a {{ferreteria.indicadores.ventas.variacion.mes}} del {{thisYear}}</h3>\n                        <h4 class="capitalize"><span class="addSpacing">Rapel:</span> MM$: {{ferreteria.indicadores.rapel_rebate.rapel}} - {{ferreteria.indicadores.rapel_rebate.rapel_indicador}}%</h4>\n                        <h4 class="capitalize"><span class="addSpacing">Rebate:</span> MM$: {{ferreteria.indicadores.rapel_rebate.rebate}} - {{ferreteria.indicadores.rapel_rebate.rebate_indicador}}%</h4>\n                        <h4 class="capitalize"><span class="addSpacing">Proyectado:</span> MM$: {{ferreteria.indicadores.rapel_rebate.proyectado}} - {{ferreteria.indicadores.rapel_rebate.proyectado_indicador}}%</h4>\n                    </div>\n                </accordion-list>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/indicadores/indicadores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6__providers_ferreterias_service__["a" /* FerreteriasService */]])
    ], IndicadoresPage);
    return IndicadoresPage;
}(__WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=indicadores.js.map

/***/ })

});
//# sourceMappingURL=2.js.map