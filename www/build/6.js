webpackJsonp([6],{

/***/ 866:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_page__ = __webpack_require__(942);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(494);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ProfilePageModule = (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile_page__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile_page__["a" /* ProfilePage */]),
                __WEBPACK_IMPORTED_MODULE_3__app_shared_module__["a" /* SharedModule */]
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

/***/ 942:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__ = __webpack_require__(874);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_users_service__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_ferreterias_service__ = __webpack_require__(496);
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







var ProfilePage = (function (_super) {
    __extends(ProfilePage, _super);
    function ProfilePage(navCtrl, navParams, menuCtrl, storage, appCtrl, usersService, ferreteriasService) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.appCtrl = appCtrl;
        _this.usersService = usersService;
        _this.ferreteriasService = ferreteriasService;
        _this.user = [];
        _this.userId = [];
        _this.ferreteria = [];
        _this.textoBoton = "Editar perfil";
        _this.editandoPerfil = false;
        _this.userEmail = "";
        _this.userPhone = "";
        _this.cfg = __WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* cfg */];
        return _this;
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.userId = user;
            if (_this.userId === undefined || _this.userId === null) {
                _this.navCtrl.setRoot('HomePage');
            }
            else {
                _this.usersService.getOne(_this.userId).then(function (userData) {
                    _this.user = userData;
                    _this.userEmail = _this.user.email;
                    _this.userPhone = _this.user.phonenum;
                    _this.ferreteriasService.getOne(_this.user.id_ferreteria).then(function (datosFerreteria) {
                        _this.ferreteria = datosFerreteria;
                        var attachments = Object.keys(_this.ferreteria._attachments);
                        _this.logoFerreteria = attachments[0];
                    });
                });
            }
        });
    };
    ProfilePage.prototype.triggerPerfil = function () {
        if (this.editandoPerfil) {
            this.guardarPerfil();
        }
        else {
            this.editarPerfil();
        }
    };
    ProfilePage.prototype.editarPerfil = function () {
        this.editandoPerfil = true;
        this.textoBoton = "Guardar perfil";
    };
    ProfilePage.prototype.guardarPerfil = function () {
        this.editandoPerfil = false;
        this.textoBoton = "Editar perfil";
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile-page',template:/*ion-inline-start:"/Users/grazia/Desktop/Basti/sociosMTS/src/pages/profile-page/profile-page.html"*/`<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content padding class="contentInterior" *ngIf="user">\n    <ion-grid>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <h1 class="text-center uppercase">Mi Perfil</h1>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <div class="user">\n                    <div margin-top class="photos" *ngIf="user._attachments">\n                        <div class="profilePhoto logoRounded" *ngFor="let attachment of user._attachments | keys; index as i">\n                            <lazy-img width="100%" inputSrc="{{cfg.apiUrl}}{{cfg.user.usersSocios}}/{{user._id}}/{{attachment.key}}" *ngIf="i==0"></lazy-img>\n                            <div class="editarPhoto" *ngIf="editandoPerfil">\n                                <ion-icon name="md-camera"></ion-icon>\n                            </div>\n                        </div>\n                        <div class="ferreteriaPhoto logoRounded sinShadow" *ngIf="logoFerreteria">\n                            <lazy-img width="100%" inputSrc="{{cfg.apiUrl}}{{cfg.ferreterias}}/{{user.id_ferreteria}}/{{logoFerreteria}}"></lazy-img>\n                        </div>\n                    </div>\n                    <div class="details">\n                        <h2 class="nombre text-center">{{user.name}}</h2>\n                        <button (click)="triggerPerfil();" margin-bottom margin-top class="btn-large" center ion-button large>\n                            <span>{{textoBoton}}</span>\n                        </button>\n                        <h3 margin-top class="small ferreteria">{{user.name_ferreteria}}</h3>\n                        <address class="adress">{{user.direction}}</address>\n                        <h4 class="small region">{{user.region}}</h4>\n                        <h4 class="small cargo">{{user.cargo}}</h4>\n                    </div>\n                    <div class="actions" margin-top>\n                        <ion-list>\n                            <ion-list-header no-lines>Email</ion-list-header>\n                            <ion-item *ngIf="!editandoPerfil"><ion-icon name="mail" color="primary" item-end></ion-icon>{{user.email}}</ion-item>\n                            <ion-item *ngIf="editandoPerfil"><ion-icon name="mail" color="primary" item-end></ion-icon><ion-input type="text" [(ngModel)]="userEmail" [ngModelOptions]="{standalone: true}" autocomplete="false" spellcheck="false"></ion-input></ion-item>\n                            <ion-list-header no-lines>Número telefónico</ion-list-header>\n                            <ion-item *ngIf="!editandoPerfil"><ion-icon name="call" color="primary" item-end></ion-icon>{{user.phonenum}}</ion-item>\n                            <ion-item *ngIf="editandoPerfil"><ion-icon name="call" color="primary" item-end></ion-icon><ion-input type="text" [(ngModel)]="userPhone" [ngModelOptions]="{standalone: true}" autocomplete="false" spellcheck="false"></ion-input></ion-item>\n                        </ion-list>\n                    </div>\n                </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n`/*ion-inline-end:"/Users/grazia/Desktop/Basti/sociosMTS/src/pages/profile-page/profile-page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_4__providers_users_service__["a" /* UsersService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_ferreterias_service__["a" /* FerreteriasService */]])
    ], ProfilePage);
    return ProfilePage;
}(__WEBPACK_IMPORTED_MODULE_3__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=profile-page.js.map

/***/ })

});
//# sourceMappingURL=6.js.map