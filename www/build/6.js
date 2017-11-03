webpackJsonp([6],{

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoticiasPageModule", function() { return NoticiasPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__noticias__ = __webpack_require__(765);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(396);
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

/***/ 765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticiasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_noticias_service__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(37);
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
        console.log("offset", this.offset);
        console.log("TotalRow", this.totalRows);
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
                _this.offset += 3;
            });
        }
    };
    NoticiasPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log("offset", this.offset);
        console.log("TotalRow", this.totalRows);
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
            selector: 'page-noticias',template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/noticias/noticias.html"*/'<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content padding class="contentInterior">\n    <ion-row justify-content-around>\n        <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n            <h1 class="text-center uppercase">Noticias</h1>\n        </ion-col>\n    </ion-row>\n    <ion-list no-lines class="noticias">\n        <button ion-item *ngFor="let noticia of noticias" class="no-padding" (click)="openPage(\'NoticiaDetallePage\', noticia);" detail-push>\n            <div class="imageNoticia" *ngIf="noticia.doc._attachments">\n                <div *ngFor="let attachment of noticia.doc._attachments | keys; index as i">\n                    <lazy-img width="100%" inputSrc="{{cfg.apiUrl}}/noticias/{{noticia.doc._id}}/{{attachment.key}}" *ngIf="i==0"></lazy-img>\n                </div>\n            </div>\n            <div class="detalles">\n                <h2 text-wrap>{{noticia.doc.title}}</h2>\n                <div class="dates">\n                    <span class="since">{{noticia.doc.updated_at | amLocale:\'es\' | amTimeAgo}}</span><span class="date">{{noticia.doc.updated_at | date : "dd \' \' MMMM \' \' yyyy"}}</span>\n                </div>\n                <div class="bajada" text-wrap>\n                    <p>{{noticia.doc.body | words : 15 }}</p>\n                    <a class="more" href="#">Leer más</a>\n                </div>\n            </div>\n        </button>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/noticias/noticias.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__providers_noticias_service__["a" /* NoticiasService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_noticias_service__["a" /* NoticiasService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */]) === "function" && _g || Object])
    ], NoticiasPage);
    return NoticiasPage;
    var _a, _b, _c, _d, _e, _f, _g;
}(__WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=noticias.js.map

/***/ })

});
//# sourceMappingURL=6.js.map