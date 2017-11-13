webpackJsonp([4],{

/***/ 868:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProveedoresPageModule", function() { return ProveedoresPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__proveedores__ = __webpack_require__(944);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(494);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ProveedoresPageModule = (function () {
    function ProveedoresPageModule() {
    }
    ProveedoresPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__proveedores__["a" /* ProveedoresPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__proveedores__["a" /* ProveedoresPage */]),
                __WEBPACK_IMPORTED_MODULE_3__app_shared_module__["a" /* SharedModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__proveedores__["a" /* ProveedoresPage */]
            ]
        })
    ], ProveedoresPageModule);
    return ProveedoresPageModule;
}());

//# sourceMappingURL=proveedores.module.js.map

/***/ }),

/***/ 874:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProtectedPage; });
var ProtectedPage = (function () {
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

/***/ 928:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return proveedorModel; });
var proveedorModel = {
    _id: "",
    _rev: "",
    isActive: true,
    nombre: "",
    indicadores: {
        info: {
            date: "",
        },
        ivp: {
            puntaje: 0,
            tendencia: "",
            ranking: 0,
            compromiso: 0,
            compromiso_tendencia: "",
            cobertura: 0,
            cobertura_tendencia: "",
            dispersion: 0,
            dispersion_tendencia: "",
            plazos_pago: 0,
            plazos_pago_tendencia: "",
            fill_rate: 0,
            fill_rate_tendencia: "",
            desviacion: 0,
            desviacion_tendencia: "",
        },
        cobertura: {
            totales: {
                total: 0,
                norte: 0,
                centro: 0,
                sur: 0
            },
            periodos: {
                30: {
                    total: 0,
                    norte: 0,
                    centro: 0,
                    sur: 0
                },
                60: {
                    total: 0,
                    norte: 0,
                    centro: 0,
                    sur: 0
                },
                90: {
                    total: 0,
                    norte: 0,
                    centro: 0,
                    sur: 0
                }
            }
        },
        ventas_acumuladas: 0,
        rapel_rebate: {
            title: "",
            rapel: 0,
            rapel_porcentual: 0,
            rebate: 0,
            rebate_porcentual: 0
        },
        ventas: {
            valor: 0,
            totales: {
                min: 0,
                max: 0
            },
            fechas: [
                {
                    mes: "Octubre",
                    periodos: {
                        actual: 0,
                        anterior: 0
                    }
                },
                {
                    mes: "Nombre Mes",
                    periodos: {
                        actual: 0,
                        anterior: 0
                    }
                }
            ]
        }
    },
    _attachments: ""
};
//# sourceMappingURL=proveedor.model.js.map

/***/ }),

/***/ 944:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProveedoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__protected_page_protected_page__ = __webpack_require__(874);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_service__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_proveedor_model__ = __webpack_require__(928);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_proveedores_service__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_config__ = __webpack_require__(38);
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









var ProveedoresPage = (function (_super) {
    __extends(ProveedoresPage, _super);
    function ProveedoresPage(navCtrl, navParams, menuCtrl, storage, appCtrl, authService, proveedoresService, keyboard) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.appCtrl = appCtrl;
        _this.authService = authService;
        _this.proveedoresService = proveedoresService;
        _this.keyboard = keyboard;
        _this.proveedor = __WEBPACK_IMPORTED_MODULE_6__models_proveedor_model__["a" /* proveedorModel */];
        _this.proveedores = [];
        _this.proveedoresFiltered = [];
        _this.id_ferreteria = "1";
        _this.term = '';
        _this.revisados = false;
        _this.cfg = __WEBPACK_IMPORTED_MODULE_8__app_config__["a" /* cfg */];
        return _this;
    }
    ProveedoresPage.prototype.searchFn = function (ev) {
        var _this = this;
        this.term = ev.target.value;
        if (this.term) {
            this.proveedoresFiltered = this.proveedores.filter(function (proveedor) {
                return (proveedor.doc.nombre.toLowerCase().indexOf(_this.term.toLowerCase()) > -1);
            });
        }
        else {
            this.proveedoresFiltered = this.proveedores;
        }
    };
    ProveedoresPage.prototype.searchSubmit = function () {
        var ev = {
            "target": {
                "value": this.term
            }
        };
        this.searchFn(ev);
        this.keyboard.close();
    };
    ProveedoresPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('id_token').then(function (id_token) {
            if (id_token !== null) {
                _this.storage.get("id_ferreteria").then(function (theID) {
                    _this.id_ferreteria = theID;
                    _this.proveedoresService.getAll(_this.id_ferreteria).then(function (datosProveedores) {
                        _this.proveedores = datosProveedores;
                        _this.proveedoresFiltered = _this.proveedores;
                    });
                });
            }
        });
    };
    ProveedoresPage.prototype.openPage = function (page, proveedorData) {
        this.navCtrl.push(page, {
            proveedor: proveedorData.doc
        });
    };
    ProveedoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-proveedores',template:/*ion-inline-start:"/Users/grazia/Desktop/Basti/sociosMTS/src/pages/proveedores/proveedores.html"*/`<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content class="contentInterior">\n    <ion-grid>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <h1 class="text-center uppercase">Proveedores</h1>\n            </ion-col>\n        </ion-row>\n        <ion-row padding-right padding-left justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <form (ngSubmit)="searchSubmit()">\n                    <ion-searchbar class="buscador" animated="true" cancelButtonText="Cancelar" showCancelButton="false" placeholder="Buscar Proveedores" type="text" (ionInput)="searchFn($event)" (search)="searchSubmit($event)"></ion-searchbar>\n                    <button class="button button-clear" type="submit">Buscar Proveedores</button>\n                </form>\n            </ion-col>\n        </ion-row>\n        <div class="bloqueBlancoNoPadding no-padding">\n            <ion-row padding-right padding-left justify-content-around>\n                <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                    <button class="inContent minPadding fullWidth" ion-button round large>Mi Lista</button>\n                </ion-col>\n                <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                    <button class="inContent minPadding fullWidth" ion-button round large [disabled]="!revisados">Últimos revisados</button>\n                </ion-col>\n            </ion-row>\n        </div>\n    </ion-grid>\n    <ion-list [virtualScroll]="proveedoresFiltered" [approxItemHeight]=" \'152px\' " class="proveedores">\n        <ion-item *virtualItem="let proveedor" class="proveedor" padding-top padding-bottom>\n            <ion-row padding-right padding-left justify-content-around (click)="openPage(\'ProveedorPage\', proveedor);">\n                <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                    <div class="logoProveedor text-center center" *ngIf="proveedor.doc._attachments">\n                        <div *ngFor="let attachment of proveedor.doc._attachments | keys; index as i">\n                            <lazy-img  width="100%" inputSrc="{{cfg.apiUrl}}/proveedores/{{proveedor.doc._id}}/{{attachment.key}}" *ngIf="i==0"></lazy-img>\n                        </div>\n                    </div>\n                </ion-col>\n                <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                    <h2 class="titleProveedor">\n                        {{proveedor.doc.nombre}}\n                    </h2>\n                </ion-col>\n            </ion-row>\n        </ion-item>\n    </ion-list>\n</ion-content>\n`/*ion-inline-end:"/Users/grazia/Desktop/Basti/sociosMTS/src/pages/proveedores/proveedores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_7__providers_proveedores_service__["a" /* ProveedoresService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__["a" /* Keyboard */]])
    ], ProveedoresPage);
    return ProveedoresPage;
}(__WEBPACK_IMPORTED_MODULE_4__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=proveedores.js.map

/***/ })

});
//# sourceMappingURL=4.js.map