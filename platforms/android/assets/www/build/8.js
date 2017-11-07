webpackJsonp([8],{

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InformacionComercialPageModule", function() { return InformacionComercialPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__informacion_comercial__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(397);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var InformacionComercialPageModule = /** @class */ (function () {
    function InformacionComercialPageModule() {
    }
    InformacionComercialPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__informacion_comercial__["a" /* InformacionComercialPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__informacion_comercial__["a" /* InformacionComercialPage */]),
                __WEBPACK_IMPORTED_MODULE_3__app_shared_module__["a" /* SharedModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__informacion_comercial__["a" /* InformacionComercialPage */]
            ]
        })
    ], InformacionComercialPageModule);
    return InformacionComercialPageModule;
}());

//# sourceMappingURL=informacion-comercial.module.js.map

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

/***/ 766:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InformacionComercialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_informercial_service__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_productos_service__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_config__ = __webpack_require__(38);
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







var InformacionComercialPage = /** @class */ (function (_super) {
    __extends(InformacionComercialPage, _super);
    function InformacionComercialPage(navCtrl, navParams, menuCtrl, storage, appCtrl, productosService, informercialService) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.appCtrl = appCtrl;
        _this.productosService = productosService;
        _this.informercialService = informercialService;
        _this.slideIndex = 0;
        _this.informerciales = [];
        _this.informercialesIndex = 0;
        _this.cfg = __WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* cfg */];
        return _this;
    }
    InformacionComercialPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.informercialService.getAll().then(function (data) {
            _this.informerciales = data;
        });
        this.productosService.getAll().then(function (datosProductos) {
            _this.productosTop = datosProductos;
        });
    };
    InformacionComercialPage.prototype.onSlideChanged = function () {
        this.slideIndex = this.slider.getActiveIndex();
    };
    InformacionComercialPage.prototype.openPage = function (page, informercial) {
        this.navCtrl.push(page, {
            informercial: informercial.doc
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slider'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
    ], InformacionComercialPage.prototype, "slider", void 0);
    InformacionComercialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-informacion-comercial',template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/informacion-comercial/informacion-comercial.html"*/'<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content class="contentInterior">\n    <ion-grid>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <h1 class="text-center uppercase">Información Comercial</h1>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <div class="bloqueBlancoNoPadding no-padding">\n                    <div class="infocomercial" *ngIf="informerciales">\n                        <ion-slides *ngIf="informerciales && informerciales.length" #slider pager="true" autoplay="6000" (ionSlideWillChange)="onSlideChanged()">\n                            <ion-slide *ngFor="let informercial of informerciales" class="slide-background">\n                                <div class="imagen" (click)="openPage(\'InformacionComercialDetallePage\', informercial);" *ngIf="informercial.doc.isActive">\n                                    <div class="imageInformercial" *ngIf="informercial.doc._attachments">\n                                        <div *ngFor="let attachment of informercial.doc._attachments | keys; index as i">\n                                            <lazy-img width="100%" inputSrc="{{cfg.apiUrl}}/inforcomercial/{{informercial.doc._id}}/{{attachment.key}}" *ngIf="i==0"></lazy-img>\n                                        </div>\n                                    </div>\n                                </div>\n                            </ion-slide>\n                        </ion-slides>\n                    </div>\n                </div>\n            </ion-col>\n        </ion-row>\n        <div padding>\n            <ion-row justify-content-around>\n                <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                    <div class="bloqueBlanco">\n                        <h1 margin-top class="welcome">Más comprados por la red</h1>\n                        <ion-list margin-top class="productosTop">\n                            <ion-item no-lines class="producto no-padding" *ngFor="let producto of productosTop">\n                                <ion-row padding-right padding-left justify-content-around [class.adquirido]="producto.doc.adquirido" *ngIf="producto.doc.isActive">\n                                    <ion-col col-5 col-sm-5 col-md-4 col-lg-4 col-xl-3 align-self-center>\n                                        <div class="imagenProducto text-center center" *ngIf="producto.doc._attachments">\n                                            <div *ngFor="let attachment of producto.doc._attachments | keys; index as i">\n                                                <lazy-img inputSrc="{{cfg.apiUrl}}/productos_top/{{producto.doc._id}}/{{attachment.key}}" *ngIf="i==0"></lazy-img>\n                                            </div>\n                                        </div>\n                                    </ion-col>\n                                    <ion-col col-7 col-sm-7 col-md-8 col-lg-4 col-xl-3 align-self-center>\n                                        <div class="infoProducto">\n                                            <h2>{{producto.doc.nombre}}</h2>\n                                            <h3>SKU {{producto.doc.sku}}</h3>\n                                            <p class="noAdquirido" *ngIf="!producto.doc.adquirido">Aún no lo has adquirido</p>\n                                            <p *ngIf="producto.doc.adquirido">Ya lo adquiriste</p>\n                                        </div>\n                                    </ion-col>\n                                </ion-row>\n                            </ion-item>\n                        </ion-list>\n                    </div>\n                </ion-col>\n            </ion-row>\n        </div>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/informacion-comercial/informacion-comercial.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_5__providers_productos_service__["a" /* ProductosService */],
            __WEBPACK_IMPORTED_MODULE_4__providers_informercial_service__["a" /* InformercialService */]])
    ], InformacionComercialPage);
    return InformacionComercialPage;
}(__WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=informacion-comercial.js.map

/***/ })

});
//# sourceMappingURL=8.js.map