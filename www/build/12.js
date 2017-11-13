webpackJsonp([12],{

/***/ 853:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgendaPageModule", function() { return AgendaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agenda__ = __webpack_require__(929);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(494);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AgendaPageModule = (function () {
    function AgendaPageModule() {
    }
    AgendaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__agenda__["a" /* AgendaPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__agenda__["a" /* AgendaPage */]),
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

/***/ 929:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgendaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__protected_page_protected_page__ = __webpack_require__(874);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_users_service__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_config__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_jquery__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_jquery__);
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










var AgendaPage = (function (_super) {
    __extends(AgendaPage, _super);
    function AgendaPage(navCtrl, navParams, menuCtrl, storage, usersService, toastCtrl, alertCtrl, contacts, callNumber, emailComposer, appCtrl) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.usersService = usersService;
        _this.toastCtrl = toastCtrl;
        _this.alertCtrl = alertCtrl;
        _this.contacts = contacts;
        _this.callNumber = callNumber;
        _this.emailComposer = emailComposer;
        _this.appCtrl = appCtrl;
        _this.socios = [];
        _this.sociosAgrupados = [];
        _this.proveedores = [];
        _this.proveedoresAgrupados = [];
        _this.alreadySaved = false;
        _this.cfg = __WEBPACK_IMPORTED_MODULE_8__app_config__["a" /* cfg */];
        return _this;
    }
    AgendaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.usersService.getAll('socios').then(function (socios) {
            _this.socios = socios;
            _this.groupUsers(_this.socios, _this.sociosAgrupados);
        });
        this.usersService.getAll('proveedores').then(function (proveedores) {
            _this.proveedores = proveedores;
            _this.groupUsers(_this.proveedores, _this.proveedoresAgrupados);
        });
    };
    AgendaPage.prototype.openPage = function (page, user) {
        this.navCtrl.push(page, {
            user: user
        });
    };
    AgendaPage.prototype.groupUsers = function (users, output) {
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
    AgendaPage.prototype.changeUser = function (typeUser) {
        __WEBPACK_IMPORTED_MODULE_9_jquery__(".botonesUsers button.inContent").removeClass("active");
        __WEBPACK_IMPORTED_MODULE_9_jquery__(".botonesUsers button.inContent").removeClass("inactive");
        __WEBPACK_IMPORTED_MODULE_9_jquery__(".botonesUsers button.inContent").addClass("inactive");
        switch (typeUser) {
            case 'socios':
                if (!__WEBPACK_IMPORTED_MODULE_9_jquery__(".sociosButton").hasClass("active")) {
                    __WEBPACK_IMPORTED_MODULE_9_jquery__(".proveedoresContainer").stop().fadeOut(300, function () {
                        __WEBPACK_IMPORTED_MODULE_9_jquery__(".sociosContainer").stop().fadeIn(300);
                    });
                    __WEBPACK_IMPORTED_MODULE_9_jquery__(".sociosButton").removeClass("inactive");
                    __WEBPACK_IMPORTED_MODULE_9_jquery__(".sociosButton").addClass("active");
                }
                break;
            case 'proveedores':
                if (!__WEBPACK_IMPORTED_MODULE_9_jquery__(".proveedoresButton").hasClass("active")) {
                    __WEBPACK_IMPORTED_MODULE_9_jquery__(".sociosContainer").stop().fadeOut(300, function () {
                        __WEBPACK_IMPORTED_MODULE_9_jquery__(".proveedoresContainer").stop().fadeIn(300);
                    });
                    __WEBPACK_IMPORTED_MODULE_9_jquery__(".proveedoresButton").removeClass("inactive");
                    __WEBPACK_IMPORTED_MODULE_9_jquery__(".proveedoresButton").addClass("active");
                }
                break;
        }
    };
    AgendaPage.prototype.guardarContacto = function (user) {
        var success = this.toastCtrl.create({
            message: 'El contacto se ha guardado con éxito',
            duration: 4000,
            position: 'bottom',
            closeButtonText: "OK"
        });
        var failed = this.toastCtrl.create({
            message: 'Ha ocurrido un problema al guardar el contacto',
            duration: 4000,
            position: 'bottom',
            closeButtonText: "OK"
        });
        if (window.cordova) {
            this.alreadySaved = true;
            var contact = this.contacts.create();
            var nombreUser = user.name.split(" ");
            if (contact) {
                contact.name = new __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["b" /* ContactName */](null, nombreUser[1], nombreUser[0]);
                contact.phoneNumbers = [new __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["a" /* ContactField */]('Móvil', user.phonenum)];
                contact.emails = [new __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["a" /* ContactField */]('Correo', user.email)];
                //contact.photos = [new ContactField('photo', user._attachments)];
                contact.addresses = [new __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["a" /* ContactField */]('Dirección', user.direction)];
                contact.organizations = [new __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["a" /* ContactField */]('Marca', user.name_ferreteria)];
                contact.save().then(function () {
                    return success.present();
                }, function (error) {
                    return failed.present();
                });
            }
        }
        else {
            failed.present();
        }
    };
    AgendaPage.prototype.saveContact = function (user) {
        'use strict';
        var _this = this;
        if (user.phonenum) {
            if (!this.alreadySaved) {
                this.guardarContacto(user);
            }
            else {
                var alert_1 = this.alertCtrl.create({
                    title: 'Contacto ya guardado',
                    message: 'El contacto ya ha sido guardado. ¿Deseas guardarlo nuevamente?',
                    buttons: [
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            handler: function () { }
                        },
                        {
                            text: 'Aceptar',
                            handler: function () {
                                _this.guardarContacto(user);
                            }
                        }
                    ]
                });
                alert_1.present();
            }
        }
    };
    AgendaPage.prototype.callToContact = function (user) {
        if (user.phonenum) {
            var success_1 = this.toastCtrl.create({
                message: 'Llamando al contacto',
                duration: 3000,
                position: 'bottom',
                closeButtonText: "OK"
            });
            var failed_1 = this.toastCtrl.create({
                message: 'Ha ocurrido un problema al intentar llamar el contacto',
                duration: 4000,
                position: 'bottom',
                closeButtonText: "OK"
            });
            this.callNumber.callNumber(user.phonenum, true).then(function () {
                return success_1.present();
            }).catch(function () {
                return failed_1.present();
            });
        }
    };
    AgendaPage.prototype.mailToContact = function (user) {
        if (user.email) {
            var failed = this.toastCtrl.create({
                message: 'Ha ocurrido un problema al intentar enviar el correo',
                duration: 4000,
                position: 'bottom',
                closeButtonText: "OK"
            });
            if (window.cordova) {
                var email = {
                    to: user.email,
                    subject: 'Mensaje desde App SociosMTS',
                    body: 'Estimado: ¿Cómo se encuentra?',
                    isHtml: true
                };
                this.emailComposer.open(email);
            }
            else {
                failed.present();
            }
        }
    };
    AgendaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-agenda',template:/*ion-inline-start:"/Users/grazia/Desktop/Basti/sociosMTS/src/pages/agenda/agenda.html"*/`<ion-header>\n    <ion-navbar center>\n        <img class="logoHeaderv2" width="120" src="assets/images/logoHeaderV2@2.png" />\n        <button ion-button menuToggle right>\n            <div class="navicon-button x">\n                <div class="navicon"></div>\n            </div>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content class="contentInterior">\n    <ion-grid>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <h1 class="text-center uppercase">Agenda</h1>\n            </ion-col>\n        </ion-row>\n        <ion-row class="botonesUsers" justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <button class="sociosButton inContent minPadding fullWidth active" ion-button round large (click)="changeUser(\'socios\');">Socios</button>\n            </ion-col>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <button class="proveedoresButton inContent minPadding fullWidth inactive" ion-button round large (click)="changeUser(\'proveedores\');">Proveedores</button>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-around>\n            <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3 align-self-center>\n                <div class="bloqueBlancoNoPadding no-padding">\n                    <ion-list no-lines>\n                        <ion-item-group class="sociosContainer" *ngFor="let socios of sociosAgrupados">\n                            <ion-item-divider color="ultralight">{{socios.letter}}</ion-item-divider>\n                            <ion-item-sliding *ngFor="let socio of socios.users">\n                                <ion-item no-lines (click)="openPage(\'ProfileDetallePage\', socio);" *ngIf="socio.isActive">\n                                    <ion-avatar item-start *ngIf="socio._attachments">\n                                        <div class="profilePhoto" *ngFor="let attachment of socio._attachments | keys; index as i">\n                                            <lazy-img width="100%" inputSrc="{{cfg.apiUrl}}{{cfg.user.usersSocios}}/{{socio._id}}/{{attachment.key}}" *ngIf="i==0"></lazy-img>\n                                        </div>\n                                    </ion-avatar>\n                                    <h2>{{socio.name}}</h2>\n                                    <h3>{{socio.name_ferreteria}}</h3>\n                                </ion-item>\n                                <ion-item-options no-lines *ngIf="socio.isActive">\n                                    <button class="normalButton" ion-button icon-only (click)="saveContact(socio)" color="save">\n                                        <ion-icon name="md-download"></ion-icon>\n                                    </button>\n                                    <button class="normalButton" ion-button icon-only (click)="callToContact(socio)" color="call">\n                                        <ion-icon name="call"></ion-icon>\n                                    </button>\n                                    <button class="normalButton" ion-button icon-only (click)="mailToContact(socio)" color="mail">\n                                        <ion-icon name="mail"></ion-icon>\n                                    </button>\n                                </ion-item-options>\n                            </ion-item-sliding>\n                        </ion-item-group>\n                        <ion-item-group class="proveedoresContainer" *ngFor="let proveedores of proveedoresAgrupados">\n                            <ion-item-divider color="ultralight">{{proveedores.letter}}</ion-item-divider>\n                            <ion-item-sliding *ngFor="let proveedor of proveedores.users">\n                                <ion-item no-lines (click)="openPage(\'ProfileDetallePage\', proveedor);" *ngIf="proveedor.isActive">\n                                    <ion-avatar item-start *ngIf="proveedor._attachments">\n                                        <div class="profilePhoto" *ngFor="let attachment of proveedor._attachments | keys; index as i">\n                                            <lazy-img width="100%" inputSrc="{{cfg.apiUrl}}{{cfg.user.usersProveedores}}/{{proveedor._id}}/{{attachment.key}}" *ngIf="i==0"></lazy-img>\n                                        </div>\n                                    </ion-avatar>\n                                    <h2>{{proveedor.name}}</h2>\n                                    <h3>{{proveedor.name_ferreteria}}</h3>\n                                </ion-item>\n                                <ion-item-options no-lines *ngIf="proveedor.isActive">\n                                    <button class="normalButton" ion-button icon-only (click)="saveContact(proveedor)" color="save">\n                                        <ion-icon name="md-download"></ion-icon>\n                                    </button>\n                                    <button class="normalButton" ion-button icon-only (click)="callToContact(proveedor)" color="call">\n                                        <ion-icon name="call"></ion-icon>\n                                    </button>\n                                    <button class="normalButton" ion-button icon-only (click)="mailToContact(proveedor)" color="mail">\n                                        <ion-icon name="mail"></ion-icon>\n                                    </button>\n                                </ion-item-options>\n                            </ion-item-sliding>\n                        </ion-item-group>\n                    </ion-list>\n                </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n`/*ion-inline-end:"/Users/grazia/Desktop/Basti/sociosMTS/src/pages/agenda/agenda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7__providers_users_service__["a" /* UsersService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_contacts__["c" /* Contacts */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], AgendaPage);
    return AgendaPage;
}(__WEBPACK_IMPORTED_MODULE_6__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=agenda.js.map

/***/ })

});
//# sourceMappingURL=12.js.map