webpackJsonp([14],{

/***/ 864:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreloaderPageModule", function() { return PreloaderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__preloader__ = __webpack_require__(940);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(494);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PreloaderPageModule = (function () {
    function PreloaderPageModule() {
    }
    PreloaderPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__preloader__["a" /* PreloaderPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__preloader__["a" /* PreloaderPage */]),
                __WEBPACK_IMPORTED_MODULE_3__app_shared_module__["a" /* SharedModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__preloader__["a" /* PreloaderPage */]
            ]
        })
    ], PreloaderPageModule);
    return PreloaderPageModule;
}());

//# sourceMappingURL=preloader.module.js.map

/***/ }),

/***/ 940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreloaderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_connectivity_service__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PreloaderPage = (function () {
    function PreloaderPage(navCtrl, storage, connectivityService) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.connectivityService = connectivityService;
        this.mostrarContenido = false;
        this.mostrarLoader = false;
        this.statusOnline = true;
    }
    PreloaderPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('id_token').then(function (id_token) {
            if (id_token === null) {
                _this.navCtrl.setRoot('WelcomePage');
            }
            else {
                _this.mostrarContenido = true;
                _this.startPreload();
            }
        });
    };
    PreloaderPage.prototype.startPreload = function () {
        this.mostrarLoader = true;
        if (this.connectivityService.isOnline()) {
            this.statusOnline = true;
            this.navCtrl.setRoot('HomePage');
        }
        if (this.connectivityService.isOffline()) {
            this.statusOnline = false;
        }
    };
    PreloaderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-preloader',template:/*ion-inline-start:"/Users/grazia/Desktop/Basti/sociosMTS/src/pages/preloader/preloader.html"*/`<ion-content padding *ngIf="mostrarContenido">\n    <div class="connected" *ngIf="statusOnline">Estás Contectado</div>\n    <div class="disconnected" *ngIf="!statusOnline">Estás Desconectado</div>\n</ion-content>\n`/*ion-inline-end:"/Users/grazia/Desktop/Basti/sociosMTS/src/pages/preloader/preloader.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_connectivity_service__["a" /* ConnectivityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_connectivity_service__["a" /* ConnectivityService */]) === "function" && _c || Object])
    ], PreloaderPage);
    return PreloaderPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=preloader.js.map

/***/ })

});
//# sourceMappingURL=14.js.map