webpackJsonp([8],{

/***/ 864:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoticiaDetallePageModule", function() { return NoticiaDetallePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__noticia_detalle__ = __webpack_require__(940);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(494);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NoticiaDetallePageModule = (function () {
    function NoticiaDetallePageModule() {
    }
    NoticiaDetallePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__noticia_detalle__["a" /* NoticiaDetallePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__noticia_detalle__["a" /* NoticiaDetallePage */]),
                __WEBPACK_IMPORTED_MODULE_3__app_shared_module__["a" /* SharedModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__noticia_detalle__["a" /* NoticiaDetallePage */]
            ]
        })
    ], NoticiaDetallePageModule);
    return NoticiaDetallePageModule;
}());

//# sourceMappingURL=noticia-detalle.module.js.map

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

/***/ 940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticiaDetallePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_photo_viewer__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__protected_page_protected_page__ = __webpack_require__(874);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_noticias_service__ = __webpack_require__(498);
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







var NoticiaDetallePage = (function (_super) {
    __extends(NoticiaDetallePage, _super);
    function NoticiaDetallePage(navCtrl, navParams, menuCtrl, storage, noticiasService, photoViewer, appCtrl) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.noticiasService = noticiasService;
        _this.photoViewer = photoViewer;
        _this.appCtrl = appCtrl;
        _this.noticia = [];
        _this.attachments = [];
        _this.noticiaImagenPrincipal = "";
        _this.cfg = __WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* cfg */];
        _this.noticia = _this.navParams.get('noticia');
        return _this;
    }
    NoticiaDetallePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.noticia === undefined || this.noticia === null) {
            this.navCtrl.setRoot('HomePage');
        }
        else {
            this.noticiasService.getOne(this.noticia._id).then(function (noticia) {
                _this.noticia = noticia;
                if (_this.noticia._attachments) {
                    _this.attachments = Object.keys(_this.noticia._attachments);
                    _this.noticiaImagenPrincipal = _this.cfg.apiUrl + '/noticias/' + _this.noticia._id + '/' + _this.attachments[0];
                    _this.attachments.shift();
                }
            });
        }
    };
    NoticiaDetallePage.prototype.zoomPhoto = function (urlPhoto) {
        console.log(this.cfg.apiUrl + '/noticias/' + this.noticia._id + '/' + urlPhoto);
        this.photoViewer.show(this.cfg.apiUrl + '/noticias/' + this.noticia._id + '/' + urlPhoto);
    };
    NoticiaDetallePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-noticia-detalle',template:/*ion-inline-start:"/Users/bassfredes/Downloads/SociotsMTS/src/pages/noticia-detalle/noticia-detalle.html"*/`<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content padding class="contentInterior">\n    <ion-grid>\n        <ion-row justify-content-around *ngIf="noticia">\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <div class="bloqueBlanco firstElement">\n                    <div class="imageNoticia" *ngIf="noticiaImagenPrincipal">\n                        <lazy-img width="100%" inputSrc="{{noticiaImagenPrincipal}}"></lazy-img>\n                    </div>\n                </div>\n                <div class="noticias">\n                    <div class="detalles">\n                        <h2>{{noticia.title}}</h2>\n                        <div class="dates">\n                            <span class="since">{{noticia.updated_at | amLocale:\'es\' | amTimeAgo}}</span><span class="date">{{noticia.updated_at | date : "dd \' \' MMMM \' \' yyyy"}}</span>\n                        </div>\n                        <div class="bajada" text-wrap>\n                            <p>{{noticia.body}}</p>\n                        </div>\n                    </div>\n                    <div class="attachments">\n                        <ion-list no-lines no-padding>\n                            <ion-item  no-padding *ngFor="let attachment of attachments">\n                                <lazy-img width="100%" inputSrc="{{cfg.apiUrl}}/noticias/{{noticia._id}}/{{attachment}}" (click)="zoomPhoto(attachment);"></lazy-img>\n                            </ion-item>\n                        </ion-list>\n                    </div>\n                </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n`/*ion-inline-end:"/Users/bassfredes/Downloads/SociotsMTS/src/pages/noticia-detalle/noticia-detalle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__providers_noticias_service__["a" /* NoticiasService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_photo_viewer__["a" /* PhotoViewer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], NoticiaDetallePage);
    return NoticiaDetallePage;
}(__WEBPACK_IMPORTED_MODULE_4__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=noticia-detalle.js.map

/***/ })

});
//# sourceMappingURL=8.js.map