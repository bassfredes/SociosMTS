webpackJsonp([5],{

/***/ 736:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoticiasPageModule", function() { return NoticiasPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__noticias__ = __webpack_require__(757);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(395);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NoticiasPageModule = /** @class */ (function () {
    function NoticiasPageModule() {
    }
    NoticiasPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__noticias__["a" /* NoticiasPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__noticias__["a" /* NoticiasPage */]),
                __WEBPACK_IMPORTED_MODULE_3__app_shared_module__["a" /* SharedModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__noticias__["a" /* NoticiasPage */]
            ],
        })
    ], NoticiasPageModule);
    return NoticiasPageModule;
}());

//# sourceMappingURL=noticias.module.js.map

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

/***/ 757:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticiasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_noticias_service__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(47);
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






var NoticiasPage = /** @class */ (function (_super) {
    __extends(NoticiasPage, _super);
    function NoticiasPage(navCtrl, navParams, menuCtrl, storage, noticiasService, loading, appCtrl) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.noticiasService = noticiasService;
        _this.loading = loading;
        _this.appCtrl = appCtrl;
        _this.noticias = [];
        _this.offset = 0;
        _this.limit = 3;
        _this.totalRows = 0;
        _this.cfg = __WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* cfg */];
        return _this;
    }
    NoticiasPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.noticiasService.getRows().then(function (totalRows) {
            _this.totalRows = totalRows;
            _this.getNoticias(false);
        });
    };
    NoticiasPage.prototype.getNoticias = function (infiniteScroll) {
        var _this = this;
        if (this.offset < this.totalRows) {
            var loader_1 = this.loading.create({
                content: "Cargando..."
            });
            if (this.offset == 0) {
                loader_1.present();
            }
            this.noticiasService.getAll(this.offset, this.limit).then(function (noticias) {
                _this.noticias.push.apply(_this.noticias, noticias);
                if (_this.offset == 0) {
                    loader_1.dismiss().catch(function () { });
                }
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            });
        }
    };
    NoticiasPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.offset += 3;
        if (this.offset < this.totalRows) {
            setTimeout(function () {
                _this.getNoticias(infiniteScroll);
            }, 500);
        }
        else {
            infiniteScroll.complete();
            infiniteScroll.enable(false);
        }
    };
    NoticiasPage.prototype.openPage = function (page, noticia) {
        this.navCtrl.push(page, {
            noticia: noticia.doc
        });
    };
    NoticiasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-noticias',template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/noticias/noticias.html"*/'<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content padding class="contentInterior">\n    <ion-list no-lines class="noticias">\n        <button ion-item *ngFor="let noticia of noticias" class="no-padding" (click)="openPage(\'NoticiaDetallePage\', noticia);" detail-push>\n            <div class="imageNoticia" *ngIf="noticia.doc._attachments">\n                <div *ngFor="let attachment of noticia.doc._attachments | keys; index as i">\n                    <img width="100%" src="{{cfg.apiUrl}}/noticias/{{noticia.doc._id}}/{{attachment.key}}" *ngIf="i==0" />\n                </div>\n            </div>\n            <div class="detalles">\n                <h2 text-wrap>{{noticia.doc.title}}</h2>\n                <div class="dates">\n                    <span class="since">{{noticia.doc.updated_at | amLocale:\'es\' | amTimeAgo}}</span><span class="date">{{noticia.doc.updated_at | date : "dd \' \' MMMM \' \' yyyy"}}</span>\n                </div>\n                <div class="bajada" text-wrap>\n                    <p>{{noticia.doc.body | words : 15 }}</p>\n                    <a class="more" href="#">Leer más</a>\n                </div>\n            </div>\n        </button>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/noticias/noticias.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_noticias_service__["a" /* NoticiasService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */]])
    ], NoticiasPage);
    return NoticiasPage;
}(__WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=noticias.js.map

/***/ })

});
//# sourceMappingURL=5.js.map