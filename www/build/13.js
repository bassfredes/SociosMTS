webpackJsonp([13],{

/***/ 868:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomePageModule", function() { return WelcomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__welcome__ = __webpack_require__(944);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_module__ = __webpack_require__(494);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var WelcomePageModule = (function () {
    function WelcomePageModule() {
    }
    WelcomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__welcome__["a" /* WelcomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__welcome__["a" /* WelcomePage */]),
                __WEBPACK_IMPORTED_MODULE_3__app_shared_module__["a" /* SharedModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__welcome__["a" /* WelcomePage */]
            ]
        })
    ], WelcomePageModule);
    return WelcomePageModule;
}());

//# sourceMappingURL=welcome.module.js.map

/***/ }),

/***/ 944:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(508);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WelcomePage = (function () {
    function WelcomePage(navCtrl, navParams, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
    }
    WelcomePage.prototype.ionViewDidLoad = function () {
        this.menuCtrl.enable(false);
        this.loadMap();
    };
    WelcomePage.prototype.goToHome = function () {
        this.navCtrl.push("LoginPage");
    };
    WelcomePage.prototype.loadMap = function () {
        var _this = this;
        var mapOptions = {
            camera: {
                target: {
                    lat: -33.44662,
                    lng: -70.630674
                },
                zoom: 13,
                tilt: 30
            }
        };
        this.mapElement = document.getElementById('mapa');
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create(this.mapElement, mapOptions);
        // Wait the MAP_READY before using any methods.
        this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY).then(function () {
            console.log('Map is ready!');
            // Now you can use all methods safely.
            var content = "<div class='nombreFerreteria'>Nombre Ferreteria</div>";
            var htmlInfoWindow = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* HtmlInfoWindow */]();
            htmlInfoWindow.setContent(content);
            _this.map.addMarker({
                icon: 'assets/images/pinMapMTS.png',
                animation: 'DROP',
                position: {
                    lat: -33.44662,
                    lng: -70.630674
                }
            }).then(function (marker) {
                marker.on(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MARKER_CLICK).subscribe(function () {
                    console.log(marker);
                    htmlInfoWindow.open(marker);
                    /*
                    var content = "<div class='containerFerreteriaMapa'>";
                    content += "<div class='nombreFerreteria'>" + locations[i][0] + "</div>";
                    content += "<div class='logoFerreteria'><img src='" + locations[i][1] + "' class='img-responsive' /></div>";
                    content += "<div class='clearfix'></div>";
                    if(locations[i][11]==1){
                        content += "<p class='openHourFerreteria ferr_abierta'>Abierto</p>";
                    }
                    else {
                        content += "<p class='openHourFerreteria ferr_cerrada'>Cerrado</p>";
                    }
                    content += "<div class='clearfix'></div>";
                    content += "<p class='direccionFerreteria'>" + locations[i][3] + "</p>";
                    content += "<p class='horariosDisponiblesFerreteria'>Lunes a Viernes: " + locations[i][6] + " a " + locations[i][7] + " Hrs.";
                    if(locations[i][8]=="si"){
                        content += "<br /> Sábado y Domingo: " + locations[i][9] + " a " + locations[i][10] + " Hrs.</p>";
                    }
                    if(disabledPosition){
                        //content += "<div class='urlFerreteria'><a href='" + locations[i][2] + "'>Ir a la ficha</a></div>";
                        content += "<div id='comoLlegarFerreteria_"+ i +"' class='comoLlegarFerreteria pull-left'>Cómo llegar</div>";
                        content += "<div class='urlFerreteria pull-right'><a href='" + locations[i][2] + "'>Ir a la ficha</a></div>";
                    }
                    else {
                        content += "<div id='comoLlegarFerreteria_"+ i +"' class='comoLlegarFerreteria pull-left'>Cómo llegar</div>";
                        content += "<div class='urlFerreteria pull-right'><a href='" + locations[i][2] + "'>Ir a la ficha</a></div>";
                    }
                    content += "<div class='clearfix'></div>";
                    content += "</div>";
                    */
                });
            });
        });
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-welcome',template:/*ion-inline-start:"/Users/bassfredes/Downloads/SociotsMTS/src/pages/welcome/welcome.html"*/`<ion-header>\n    <ion-navbar center hideBackButton="true">\n        <img class="logoHeaderv1" width="71" src="assets/images/logoHeaderV1@2.png" />\n        <button ion-button menuToggle right>\n    		<ion-icon name="menu"></ion-icon>\n    	</button>\n    </ion-navbar>\n</ion-header>\n<ion-content padding class="contentInterior has-footer">\n	<ion-grid>\n		<ion-row>\n			<ion-col col-12>\n                <div class="bloqueBlanco firstElement">\n                    <h2 class="small">Tu ferretería más cercana es:</h2>\n                </div>\n                <div id="mapa"></div>\n                <ion-row>\n        			<ion-col col-12>\n                        <div margin-top></div>\n                    </ion-col>\n        		</ion-row>\n                <h1 class="welcome">Ingresa a la app MTS</h1>\n                <div class="text-center">\n                    <button margin-top center ion-button round large (click)="goToHome()">Ingresar</button>\n                </div>\n            </ion-col>\n		</ion-row>\n    </ion-grid>\n</ion-content>\n`/*ion-inline-end:"/Users/bassfredes/Downloads/SociotsMTS/src/pages/welcome/welcome.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]) === "function" && _c || Object])
    ], WelcomePage);
    return WelcomePage;
    var _a, _b, _c;
}());

//# sourceMappingURL=welcome.js.map

/***/ })

});
//# sourceMappingURL=13.js.map