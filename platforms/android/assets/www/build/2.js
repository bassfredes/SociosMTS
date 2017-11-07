webpackJsonp([2],{

/***/ 750:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileDetallePageModule", function() { return ProfileDetallePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_detalle__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(397);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ProfileDetallePageModule = /** @class */ (function () {
    function ProfileDetallePageModule() {
    }
    ProfileDetallePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile_detalle__["a" /* ProfileDetallePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile_detalle__["a" /* ProfileDetallePage */]),
                __WEBPACK_IMPORTED_MODULE_3__app_shared_module__["a" /* SharedModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__profile_detalle__["a" /* ProfileDetallePage */]
            ]
        })
    ], ProfileDetallePageModule);
    return ProfileDetallePageModule;
}());

//# sourceMappingURL=profile-detalle.module.js.map

/***/ }),

/***/ 755:
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

/***/ 756:
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

/***/ 771:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileDetallePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_ferreteria_model__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__protected_page_protected_page__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_users_service__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_ferreterias_service__ = __webpack_require__(399);
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









var ProfileDetallePage = /** @class */ (function (_super) {
    __extends(ProfileDetallePage, _super);
    function ProfileDetallePage(navCtrl, navParams, menuCtrl, storage, appCtrl, callNumber, usersService, ferreteriasService) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.appCtrl = appCtrl;
        _this.callNumber = callNumber;
        _this.usersService = usersService;
        _this.ferreteriasService = ferreteriasService;
        _this.ferreteria = __WEBPACK_IMPORTED_MODULE_4__models_ferreteria_model__["a" /* ferreteriaModel */];
        _this.user = [];
        _this.cfg = __WEBPACK_IMPORTED_MODULE_8__app_config__["a" /* cfg */];
        _this.user = _this.navParams.get('user');
        return _this;
    }
    ProfileDetallePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.user === undefined || this.user === null) {
            this.navCtrl.setRoot('AgendaPage');
        }
        else {
            this.ferreteriasService.getOne(this.user.id_ferreteria).then(function (datosFerreteria) {
                _this.ferreteria = datosFerreteria;
                var attachments = Object.keys(_this.ferreteria._attachments);
                _this.logoFerreteria = attachments[0];
            });
            this.userType = this.user.type;
            if (this.userType == "corporativo") {
                this.userType = "socio";
            }
        }
    };
    ProfileDetallePage.prototype.callToContact = function (user) {
        if (user.phonenum) {
            this.callNumber.callNumber(user.phonenum, true).then(function () { return console.log('Launched dialer!'); }).catch(function () { return console.log('Error launching dialer'); });
        }
    };
    ProfileDetallePage.prototype.mailToContact = function (user) {
    };
    ProfileDetallePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile-detalle',template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/profile-detalle/profile-detalle.html"*/'<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content padding class="contentInterior" *ngIf="user">\n    <ion-grid>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <h1 class="text-center uppercase">Agenda</h1>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <div class="user">\n                    <div margin-top class="photos" *ngIf="userType">\n                        <div class="profilePhoto logoRounded" *ngFor="let attachment of user._attachments | keys; index as i">\n                            <lazy-img width="100%" inputSrc="{{cfg.apiUrl}}/users_{{userType}}s/{{user._id}}/{{attachment.key}}" *ngIf="i==0"></lazy-img>\n                        </div>\n                        <div class="ferreteriaPhoto logoRounded sinShadow" *ngIf="logoFerreteria">\n                            <lazy-img width="100%" inputSrc="{{cfg.apiUrl}}/ferreterias/{{user.id_ferreteria}}/{{logoFerreteria}}"></lazy-img>\n                        </div>\n                    </div>\n                    <div class="details">\n                        <h2 class="nombre text-center">{{user.name}}</h2>\n                        <h3 margin-top class="small ferreteria">{{user.name_ferreteria}}</h3>\n                        <address class="adress">{{user.direction}}</address>\n                        <h4 class="small region">{{user.region}}</h4>\n                        <h4 class="small cargo">{{user.cargo}}</h4>\n                    </div>\n                    <div class="actions" margin-top>\n                        <ion-list>\n                            <ion-list-header no-lines>Email</ion-list-header>\n                            <ion-item (click)="callToContact(user)"><ion-icon name="mail" color="primary" item-end></ion-icon>{{user.email}}</ion-item>\n                            <ion-list-header no-lines>Número telefónico</ion-list-header>\n                            <ion-item (click)="mailToContact(user)"><ion-icon name="call" color="primary" item-end></ion-icon>{{user.phonenum}}</ion-item>\n                        </ion-list>\n                        <button margin-bottom class="btn-large" center ion-button large>\n                            <span>Enviar un email</span>\n                        </button>\n                        <button class="btn-large" center ion-button large color="call">\n                            <span>Llamar</span>\n                        </button>\n                    </div>\n                </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/profile-detalle/profile-detalle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_6__providers_users_service__["a" /* UsersService */],
            __WEBPACK_IMPORTED_MODULE_7__providers_ferreterias_service__["a" /* FerreteriasService */]])
    ], ProfileDetallePage);
    return ProfileDetallePage;
}(__WEBPACK_IMPORTED_MODULE_5__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=profile-detalle.js.map

/***/ })

});
//# sourceMappingURL=2.js.map