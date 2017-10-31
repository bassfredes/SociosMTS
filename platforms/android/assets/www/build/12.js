webpackJsonp([12],{

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookAddPageModule", function() { return BookAddPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__book_add_page__ = __webpack_require__(746);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BookAddPageModule = /** @class */ (function () {
    function BookAddPageModule() {
    }
    BookAddPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__book_add_page__["a" /* BookAddPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__book_add_page__["a" /* BookAddPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__book_add_page__["a" /* BookAddPage */]
            ]
        })
    ], BookAddPageModule);
    return BookAddPageModule;
}());

//# sourceMappingURL=book-add-page.module.js.map

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

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__protected_page_protected_page__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_books_service__ = __webpack_require__(396);
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






var BookAddPage = /** @class */ (function (_super) {
    __extends(BookAddPage, _super);
    function BookAddPage(navCtrl, navParams, menuCtrl, storage, appCtrl, formBuilder, booksService) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.appCtrl = appCtrl;
        _this.formBuilder = formBuilder;
        _this.booksService = booksService;
        _this.bookData = _this.formBuilder.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            author_name: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
            pages_count: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required],
        });
        return _this;
    }
    BookAddPage.prototype.process = function () {
        var _this = this;
        this.booksService.add(this.bookData.value)
            .then(function () { return _this.navCtrl.push('BooksPage'); })
            .catch(function (e) { return console.log("add book error", e); });
    };
    BookAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-book-add-page',template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/book-add-page/book-add-page.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Page</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-grid>\n    <ion-row justify-content-around>\n      <ion-col col-sm-6 col-md-6 col-lg-4 col-xl-3  align-self-center>\n        <form [formGroup]="bookData" (ngSubmit)="process()">\n          <ion-item>\n            <ion-label floating>{{ \'label.title\' | translate }}:</ion-label>\n            <ion-input type="text" formControlName="title"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label floating>{{ \'label.author_name\' | translate }}:</ion-label>\n            <ion-input type="text" formControlName="author_name"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label floating>{{ \'label.pages\' | translate }}:</ion-label>\n            <ion-input type="number" formControlName="pages_count"></ion-input>\n          </ion-item>\n\n\n          <button margin-top ion-button type="submit" [disabled]="!bookData.valid">{{ \'button.submit\' | translate }}</button>\n\n        </form>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/book-add-page/book-add-page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__providers_books_service__["a" /* BooksService */]])
    ], BookAddPage);
    return BookAddPage;
}(__WEBPACK_IMPORTED_MODULE_2__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=book-add-page.js.map

/***/ })

});
//# sourceMappingURL=12.js.map