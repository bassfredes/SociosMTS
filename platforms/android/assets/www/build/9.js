webpackJsonp([9],{

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooksPageModule", function() { return BooksPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__books_page__ = __webpack_require__(749);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BooksPageModule = /** @class */ (function () {
    function BooksPageModule() {
    }
    BooksPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__books_page__["a" /* BooksPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__books_page__["a" /* BooksPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__books_page__["a" /* BooksPage */]
            ]
        })
    ], BooksPageModule);
    return BooksPageModule;
}());

//# sourceMappingURL=books-page.module.js.map

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

/***/ 749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooksPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__protected_page_protected_page__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_books_service__ = __webpack_require__(396);
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





var BooksPage = /** @class */ (function (_super) {
    __extends(BooksPage, _super);
    function BooksPage(navCtrl, navParams, menuCtrl, storage, appCtrl, booksService) {
        var _this = _super.call(this, navCtrl, navParams, storage, appCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.menuCtrl = menuCtrl;
        _this.storage = storage;
        _this.appCtrl = appCtrl;
        _this.booksService = booksService;
        return _this;
    }
    BooksPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.booksService.getAll().then(function (books) { return _this.books = books; });
    };
    BooksPage.prototype.bookInfo = function (book) {
        this.navCtrl.push('BookInfoPage', { book: book });
    };
    /**
     * Opens a paage
     *
     * @param page string Page name
     */
    BooksPage.prototype.openPage = function (page) {
        this.navCtrl.push(page);
    };
    BooksPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-books-page',template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/books-page/books-page.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>    \n    <ion-title>{{ \'page.books.list\' | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <button ion-button block (click)="openPage(\'BookAddPage\')">{{ \'button.add_book\' | translate }}</button>\n  \n  <ion-list *ngIf="books">\n    <button ion-item  *ngFor="let book of books" (click)="bookInfo(book)">{{ book.title }}</button>\n  </ion-list>\n  \n</ion-content>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/pages/books-page/books-page.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_4__providers_books_service__["a" /* BooksService */]])
    ], BooksPage);
    return BooksPage;
}(__WEBPACK_IMPORTED_MODULE_2__protected_page_protected_page__["a" /* ProtectedPage */]));

//# sourceMappingURL=books-page.js.map

/***/ })

});
//# sourceMappingURL=9.js.map