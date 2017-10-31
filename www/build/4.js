webpackJsonp([4],{

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_page__ = __webpack_require__(759);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile_page__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile_page__["a" /* ProfilePage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__profile_page__["a" /* ProfilePage */]
            ]
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile-page.module.js.map

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

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__protected_page_protected_page__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(32);
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




var ProfilePage = /** @class */ (function (_super) {
    __extends(ProfilePage, _super);
    function ProfilePage(navCtrl, navParams, menuCtrl, storage, appCtrl) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.appCtrl = appCtrl;
        _this.storage.get('user').then(function (user) {
            _this.user = user;
        });
        return _this;
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        this.menuCtrl.enable(true);
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile-page',template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/profile-page/profile-page.html"*/'<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-card *ngIf="user">\n\n        <ion-row>\n            <ion-col col-25>Nombre:</ion-col>\n            <ion-col col-75>{{ user.name }}</ion-col>\n        </ion-row>\n\n        <ion-row>\n            <ion-col col-25>Email:</ion-col>\n            <ion-col col-75>{{ user.email }}</ion-col>\n        </ion-row>\n\n    </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/profile-page/profile-page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */]])
    ], ProfilePage);
    return ProfilePage;
}(__WEBPACK_IMPORTED_MODULE_2__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=profile-page.js.map

/***/ })

});
//# sourceMappingURL=4.js.map