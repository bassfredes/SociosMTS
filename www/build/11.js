webpackJsonp([11],{

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventosPageModule", function() { return EventosPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eventos__ = __webpack_require__(931);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(494);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var EventosPageModule = (function () {
    function EventosPageModule() {
    }
    EventosPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__eventos__["a" /* EventosPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__eventos__["a" /* EventosPage */]),
                __WEBPACK_IMPORTED_MODULE_3__app_shared_module__["a" /* SharedModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__eventos__["a" /* EventosPage */]
            ]
        })
    ], EventosPageModule);
    return EventosPageModule;
}());

//# sourceMappingURL=eventos.module.js.map

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

/***/ 931:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__ = __webpack_require__(874);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_eventos_service__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(38);
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






var EventosPage = (function (_super) {
    __extends(EventosPage, _super);
    function EventosPage(navCtrl, navParams, menuCtrl, storage, appCtrl, loading, eventosService) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.appCtrl = appCtrl;
        _this.loading = loading;
        _this.eventosService = eventosService;
        _this.eventos = [];
        _this.offset = 0;
        _this.limit = 3;
        _this.totalRows = 0;
        _this.cfg = __WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* cfg */];
        return _this;
    }
    EventosPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.eventosService.getRows().then(function (totalRows) {
            _this.totalRows = totalRows;
            _this.getEventos(false);
        });
    };
    EventosPage.prototype.getEventos = function (infiniteScroll) {
        var _this = this;
        if (this.offset < this.totalRows) {
            var loader_1 = this.loading.create({
                content: "Cargando..."
            });
            if (this.offset == 0) {
                loader_1.present();
            }
            this.eventosService.getAll(this.offset, this.limit).then(function (eventosData) {
                _this.eventos.push.apply(_this.eventos, eventosData);
                if (_this.offset == 0) {
                    loader_1.dismiss().catch(function () { });
                }
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
                _this.offset += 3;
            });
        }
    };
    EventosPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.offset < this.totalRows) {
            setTimeout(function () {
                _this.getEventos(infiniteScroll);
            }, 500);
        }
        else {
            infiniteScroll.complete();
            infiniteScroll.enable(false);
        }
    };
    EventosPage.prototype.openPage = function (page, evento, participarB) {
        this.navCtrl.push(page, {
            evento: evento.doc,
            participar: participarB
        });
    };
    EventosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-eventos',template:/*ion-inline-start:"/Users/bassfredes/Downloads/SociotsMTS/src/pages/eventos/eventos.html"*/`<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content padding class="contentInterior">\n    <ion-row justify-content-around>\n        <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n            <h1 class="text-center uppercase">Eventos</h1>\n        </ion-col>\n    </ion-row>\n    <ion-list no-lines class="eventos">\n        <ion-item *ngFor="let evento of eventos" class="no-padding" detail-push>\n            <div class="evento" *ngIf="evento.doc.isActive">\n                <div class="detalles" (click)="openPage(\'EventosDetallePage\', evento, false);">\n                    <h2 text-wrap>{{evento.doc.title}}</h2>\n                </div>\n                <div class="imageEvento" *ngIf="evento.doc._attachments" (click)="openPage(\'EventosDetallePage\', evento, false);">\n                    <div *ngFor="let attachment of evento.doc._attachments | keys; index as i">\n                        <lazy-img width="100%" inputSrc="{{cfg.apiUrl}}/eventos/{{evento.doc._id}}/{{attachment.key}}" *ngIf="i==0"></lazy-img>\n                    </div>\n                </div>\n                <div class="detalles">\n                    <div class="text-center" *ngIf="!evento.doc.participando">\n                        <button class="btn-primary btn-large" center ion-button large (click)="openPage(\'EventosDetallePage\', evento, true);">\n                            <span>Inscribirse</span>\n                        </button>\n                    </div>\n                    <div class="text-center" *ngIf="evento.doc.participando">\n                        <ion-row justify-content-around>\n                            <ion-col col-7 align-self-center>\n                                <button class="btn-participando btn-participandoSmall notEffect btn-large" center ion-button large>\n                                    <span><ion-icon class="icon" name="md-checkmark"></ion-icon>Ya estás Inscrito</span>\n                                </button>\n                            </ion-col>\n                            <ion-col col-5 align-self-center>\n                                <button class="btn-primary btn-large" center ion-button large (click)="openPage(\'EventosDetallePage\', evento);">\n                                    <span>Ver Detalle</span>\n                                </button>\n                            </ion-col>\n                        </ion-row>\n                    </div>\n                </div>\n            </div>\n        </ion-item>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n`/*ion-inline-end:"/Users/bassfredes/Downloads/SociotsMTS/src/pages/eventos/eventos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_eventos_service__["a" /* EventosService */]])
    ], EventosPage);
    return EventosPage;
}(__WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=eventos.js.map

/***/ })

});
//# sourceMappingURL=11.js.map