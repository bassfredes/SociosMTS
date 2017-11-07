webpackJsonp([12],{

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgendaPageModule", function() { return AgendaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agenda__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(397);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AgendaPageModule = /** @class */ (function () {
    function AgendaPageModule() {
    }
    AgendaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__agenda__["a" /* AgendaPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__agenda__["a" /* AgendaPage */]),
                __WEBPACK_IMPORTED_MODULE_3__app_shared_module__["a" /* SharedModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__agenda__["a" /* AgendaPage */]
            ]
        })
    ], AgendaPageModule);
    return AgendaPageModule;
}());

//# sourceMappingURL=agenda.module.js.map

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

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgendaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__protected_page_protected_page__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_users_service__ = __webpack_require__(403);
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









var AgendaPage = /** @class */ (function (_super) {
    __extends(AgendaPage, _super);
    function AgendaPage(navCtrl, navParams, menuCtrl, storage, usersService, contacts, callNumber, emailComposer, appCtrl) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.usersService = usersService;
        _this.contacts = contacts;
        _this.callNumber = callNumber;
        _this.emailComposer = emailComposer;
        _this.appCtrl = appCtrl;
        _this.socios = [];
        _this.sociosAgrupados = [];
        _this.proveedores = [];
        _this.proveedoresAgrupados = [];
        _this.cfg = __WEBPACK_IMPORTED_MODULE_8__app_config__["a" /* cfg */];
        return _this;
    }
    AgendaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.usersService.getAll('socios').then(function (socios) {
            _this.socios = socios;
            console.log(_this.socios);
            _this.groupSocios(_this.socios, _this.sociosAgrupados);
        });
        this.usersService.getAll('proveedores').then(function (proveedores) {
            _this.proveedores = proveedores;
        });
    };
    AgendaPage.prototype.openPage = function (page, user) {
        this.navCtrl.push(page, {
            user: user
        });
    };
    AgendaPage.prototype.groupSocios = function (users, output) {
        var sortedContacts = users.sort();
        var currentLetter = false;
        var currentContacts = [];
        sortedContacts.forEach(function (value, index) {
            if (value.doc.name.charAt(0) != currentLetter) {
                currentLetter = value.doc.name.charAt(0);
                var newGroup = {
                    letter: currentLetter,
                    users: []
                };
                currentContacts = newGroup.users;
                output.push(newGroup);
            }
            currentContacts.push(value.doc);
        });
    };
    AgendaPage.prototype.saveContact = function (user) {
        if (user.phonenum) {
            if (window.cordova) {
                var contact_1 = this.contacts.create();
                var nombreUser = user.name.split(" ");
                if (contact_1) {
                    contact_1.name = new __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["b" /* ContactName */](null, nombreUser[1], nombreUser[0]);
                    contact_1.phoneNumbers = [new __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["a" /* ContactField */]('mobile', user.phonenum)];
                    contact_1.emails = [new __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["a" /* ContactField */]('email', user.email)];
                    //contact.photos = [new ContactField('photo', user._attachments)];
                    contact_1.addresses = [new __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["a" /* ContactField */]('address', user.direction)];
                    contact_1.organizations = [new __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["a" /* ContactField */]('organization', user.name_ferreteria)];
                    contact_1.save().then(function () {
                        return console.log('Contact saved!', contact_1);
                    }, function (error) { return console.error('Error saving contact.', error); });
                }
            }
        }
    };
    AgendaPage.prototype.callToContact = function (user) {
        if (user.phonenum) {
            this.callNumber.callNumber(user.phonenum, true).then(function () { return console.log('Launched dialer!'); }).catch(function () { return console.log('Error launching dialer'); });
        }
    };
    AgendaPage.prototype.mailToContact = function (user) {
        console.log(user);
        if (user.email) {
            console.log("Envio Correo", user.email);
        }
    };
    AgendaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-agenda',template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/agenda/agenda.html"*/'<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content class="contentInterior">\n    <ion-grid>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <h1 class="text-center uppercase">Agenda</h1>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <div class="bloqueBlancoNoPadding no-padding">\n                    <ion-list no-lines>\n                        <ion-item-group *ngFor="let socios of sociosAgrupados">\n                            <ion-item-divider color="ultralight">{{socios.letter}}</ion-item-divider>\n                            <ion-item-sliding *ngFor="let socio of socios.users">\n                                <ion-item no-lines (click)="openPage(\'ProfileDetallePage\', socio);" *ngIf="socio.isActive">\n                                    <ion-avatar item-start *ngIf="socio._attachments">\n                                        <div class="profilePhoto" *ngFor="let attachment of socio._attachments | keys; index as i">\n                                            <lazy-img width="100%" inputSrc="{{cfg.apiUrl}}/users_socios/{{socio._id}}/{{attachment.key}}" *ngIf="i==0"></lazy-img>\n                                        </div>\n                                    </ion-avatar>\n                                    <h2>{{socio.name}}</h2>\n                                    <h3>{{socio.name_ferreteria}}</h3>\n                                </ion-item>\n                                <ion-item-options no-lines *ngIf="socio.isActive">\n                                    <button class="normalButton" ion-button icon-only (click)="saveContact(socio)" color="save">\n                                        <ion-icon name="md-download"></ion-icon>\n                                    </button>\n                                    <button class="normalButton" ion-button icon-only (click)="callToContact(socio)" color="call">\n                                        <ion-icon name="call"></ion-icon>\n                                    </button>\n                                    <button class="normalButton" ion-button icon-only (click)="mailToContact(socio)" color="mail">\n                                        <ion-icon name="mail"></ion-icon>\n                                    </button>\n                                </ion-item-options>\n                            </ion-item-sliding>\n                        </ion-item-group>\n                    </ion-list>\n                </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/agenda/agenda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7__providers_users_service__["a" /* UsersService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["c" /* Contacts */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */]])
    ], AgendaPage);
    return AgendaPage;
}(__WEBPACK_IMPORTED_MODULE_6__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=agenda.js.map

/***/ })

});
//# sourceMappingURL=12.js.map