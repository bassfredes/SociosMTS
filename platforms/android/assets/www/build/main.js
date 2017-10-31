webpackJsonp([18],{

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_jwt__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__connectivity_service__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_cache__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_config__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AuthService = /** @class */ (function () {
    function AuthService(storage, http, jwtHelper, authHttp, app, connectivityService, cache) {
        var _this = this;
        this.storage = storage;
        this.http = http;
        this.jwtHelper = jwtHelper;
        this.authHttp = authHttp;
        this.app = app;
        this.connectivityService = connectivityService;
        this.cache = cache;
        this.cfg = __WEBPACK_IMPORTED_MODULE_9__app_config__["a" /* cfg */];
        this.storage.get('id_token').then(function (token) {
            _this.idToken = token;
        });
        this.decodeJwt();
    }
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(function (resolve) {
            _this.http.post(_this.cfg.apiUrl + _this.cfg.user.login, credentials).subscribe(function (data) {
                if (data) {
                    _this.saveData(data);
                    var rs = data.json();
                    _this.idToken = rs.rows[0].doc.token;
                    _this.scheduleRefresh();
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function errorCallback(response) {
                resolve(false);
            });
        });
    };
    AuthService.prototype.decodeJwt = function () {
        var header = {
            "alg": "HS256",
            "typ": "JWT"
        }; // eyAiYWxnIjogIkhTMjU2IiwgInR5cCI6ICJKV1QiIH0=
        var payload = {
            "user": "bastian.f@mitocondria.cl",
            "password": "123456"
        }; // eyAidXNlciI6ICJiYXN0aWFuLmZAbWl0b2NvbmRyaWEuY2wiLCAicGFzc3dvcmQiOiAiMTIzNDU2IiB9
        /*let verify = HMACSHA256(
            base64UrlEncode(header) + "." +
            base64UrlEncode(payload),
            "SociosMTS"
        )*/ // lNAOVJV02JtBbgPqeiIogvB01OKyzq4EY5arpr-0UoA
        //console.log(verify);
    };
    AuthService.prototype.saveData = function (data) {
        var rs = data.json();
        var documentConfig = rs.rows[0].doc;
        this.storage.set("user", documentConfig.user_id);
        this.storage.set("id_token", documentConfig.token);
    };
    AuthService.prototype.logout = function () {
        // stop function of auto refesh
        this.unscheduleRefresh();
        this.cache.clearAll();
        this.storage.remove('user');
        this.storage.remove('id_token');
        this.storage.remove('id_ferreteria');
    };
    AuthService.prototype.isValid = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_5_angular2_jwt__["tokenNotExpired"])();
    };
    AuthService.prototype.getNewJwt = function () {
        var _this = this;
        // Get a new JWT from Auth0 using the refresh token saved
        // in local storage
        this.storage.get("id_token").then(function (thetoken) {
            var senddata = {
                Token: thetoken
            };
            _this.http.get(_this.cfg.apiUrl + _this.cfg.user.refresh + "&Token=" + thetoken)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                var documentConfig = res.rows[0].doc;
                // If the API returned a successful response, mark the user as logged in
                if (documentConfig.success == true) {
                    _this.storage.set("id_token", documentConfig.token);
                    _this.refreshSubscription.unsubscribe();
                    console.log("Token set");
                }
                else {
                    console.log("The Token Black Listed");
                    _this.logout();
                }
            }, function (err) {
                console.error('ERROR', err);
            });
        });
    };
    AuthService.prototype.scheduleRefresh = function () {
        var _this = this;
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        var source = __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].of(this.idToken).flatMap(function (token) {
            // The delay to generate in this case is the difference
            // between the expiry time and the issued at time
            var jwtIat = _this.jwtHelper.decodeToken(token).iat;
            var now = new Date;
            jwtIat = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
            var jwtExp = _this.jwtHelper.decodeToken(token).exp;
            jwtExp = new Date(Date.UTC(2017, 11, 1, 0, 0, 0));
            var iat = new Date(0);
            var exp = new Date(0);
            var delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
            console.log("will start refresh after :", (delay / 1000) / 60);
            if (delay - 1000 <= 0)
                delay = 1;
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].interval(delay);
        });
        this.refreshSubscription = source.subscribe(function () {
            console.log("peticion");
            if (_this.connectivityService.isOffline()) {
                console.log("Offline");
                _this.refreshSubscription.unsubscribe();
                _this.storage.set("id_token", "offline");
            }
            else {
                _this.getNewJwt();
            }
        });
    };
    AuthService.prototype.startupTokenRefresh = function () {
        var _this = this;
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        this.storage.get("id_token").then(function (thetoken) {
            if (thetoken) {
                _this.idToken = thetoken;
                var source = __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].of(thetoken).flatMap(function (token) {
                    // Get the expiry time to generate
                    // a delay in milliseconds
                    var now = new Date().valueOf();
                    var jwtExp = _this.jwtHelper.decodeToken(token).exp;
                    var exp = new Date(0);
                    exp.setUTCSeconds(jwtExp);
                    var delay = exp.valueOf() - now;
                    if (delay <= 0) {
                        delay = 1;
                    }
                    // Use the delay in a timer to
                    // run the refresh at the proper time
                    return __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].timer(delay);
                });
                // Once the delay time from above is
                // reached, get a new JWT and schedule
                // additional refreshes
                source.subscribe(function () {
                    _this.getNewJwt();
                    _this.scheduleRefresh();
                });
            }
            else {
                //there is no user logined
                console.info("there is no user logined ");
            }
        });
    };
    AuthService.prototype.unscheduleRefresh = function () {
        // Unsubscribe fromt the refresh
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"],
            __WEBPACK_IMPORTED_MODULE_5_angular2_jwt__["JwtHelper"],
            __WEBPACK_IMPORTED_MODULE_5_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_7__connectivity_service__["a" /* ConnectivityService */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_cache__["b" /* CacheService */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectivityService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConnectivityService = /** @class */ (function () {
    function ConnectivityService(network, platform) {
        this.network = network;
        this.platform = platform;
        this.onDevice = this.platform.is('cordova');
    }
    ConnectivityService.prototype.isOnline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type !== Connection.NONE;
        }
        else {
            return navigator.onLine;
        }
    };
    ConnectivityService.prototype.isOffline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type === Connection.NONE;
        }
        else {
            return !navigator.onLine;
        }
    };
    ConnectivityService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */]])
    ], ConnectivityService);
    return ConnectivityService;
}());

//# sourceMappingURL=connectivity-service.js.map

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 151;

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/agenda/agenda.module": [
		724,
		13
	],
	"../pages/book-add-page/book-add-page.module": [
		725,
		12
	],
	"../pages/book-edit-page/book-edit-page.module": [
		726,
		11
	],
	"../pages/book-info-page/book-info-page.module": [
		727,
		10
	],
	"../pages/books-page/books-page.module": [
		728,
		9
	],
	"../pages/eventos/eventos.module": [
		729,
		8
	],
	"../pages/forgot-page/forgot-page.module": [
		730,
		17
	],
	"../pages/home/home.module": [
		731,
		3
	],
	"../pages/indicadores/indicadores.module": [
		732,
		2
	],
	"../pages/informacion-comercial/informacion-comercial.module": [
		733,
		7
	],
	"../pages/login-page/login-page.module": [
		734,
		16
	],
	"../pages/noticia-detalle/noticia-detalle.module": [
		735,
		6
	],
	"../pages/noticias/noticias.module": [
		736,
		5
	],
	"../pages/preloader/preloader.module": [
		737,
		15
	],
	"../pages/profile-page/profile-page.module": [
		738,
		4
	],
	"../pages/proveedor/proveedor.module": [
		739,
		1
	],
	"../pages/proveedores/proveedores.module": [
		740,
		0
	],
	"../pages/welcome/welcome.module": [
		741,
		14
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 194;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MODULES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SERVICES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DIRECTIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PIPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COMPONENTS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_connectivity_service__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_books_service__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_ferreterias_service__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_proveedores_service__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_users_service__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_noticias_service__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_photo_viewer__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_android_full_screen__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_network__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_google_maps__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_keyboard__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular2_jwt__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_accordion_list_accordion_list__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pipes_keys_keys__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_http__ = __webpack_require__(59);
// Providers







// Ionic native providers









// Components

// Pipes

// Modules


var MODULES = [
    __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser__["a" /* BrowserModule */],
    __WEBPACK_IMPORTED_MODULE_19__angular_http__["HttpModule"]
];
var SERVICES = [
    __WEBPACK_IMPORTED_MODULE_0__providers_auth_service__["a" /* AuthService */],
    __WEBPACK_IMPORTED_MODULE_1__providers_connectivity_service__["a" /* ConnectivityService */],
    __WEBPACK_IMPORTED_MODULE_2__providers_books_service__["a" /* BooksService */],
    __WEBPACK_IMPORTED_MODULE_5__providers_users_service__["a" /* UsersService */],
    __WEBPACK_IMPORTED_MODULE_3__providers_ferreterias_service__["a" /* FerreteriasService */],
    __WEBPACK_IMPORTED_MODULE_4__providers_proveedores_service__["a" /* ProveedoresService */],
    __WEBPACK_IMPORTED_MODULE_6__providers_noticias_service__["a" /* NoticiasService */]
];
var DIRECTIVES = [];
var PIPES = [
    __WEBPACK_IMPORTED_MODULE_17__pipes_keys_keys__["a" /* KeysPipe */]
];
var PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
    __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
    __WEBPACK_IMPORTED_MODULE_12__ionic_native_network__["a" /* Network */],
    __WEBPACK_IMPORTED_MODULE_7__ionic_native_photo_viewer__["a" /* PhotoViewer */],
    __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */],
    __WEBPACK_IMPORTED_MODULE_15_angular2_jwt__["JwtHelper"],
    __WEBPACK_IMPORTED_MODULE_11__ionic_native_android_full_screen__["a" /* AndroidFullScreen */],
    __WEBPACK_IMPORTED_MODULE_13__ionic_native_google_maps__["b" /* GoogleMaps */],
    __WEBPACK_IMPORTED_MODULE_14__ionic_native_keyboard__["a" /* Keyboard */]
];
var COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_16__components_accordion_list_accordion_list__["a" /* AccordionListComponent */]
];
//# sourceMappingURL=app.imports.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_imports__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_truncate__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_moment__ = __webpack_require__(701);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_0__app_imports__["d" /* PIPES */],
                __WEBPACK_IMPORTED_MODULE_0__app_imports__["b" /* DIRECTIVES */],
                __WEBPACK_IMPORTED_MODULE_0__app_imports__["a" /* COMPONENTS */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_0__app_imports__["d" /* PIPES */],
                __WEBPACK_IMPORTED_MODULE_0__app_imports__["a" /* COMPONENTS */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_truncate__["a" /* TruncateModule */],
                __WEBPACK_IMPORTED_MODULE_4_angular2_moment__["MomentModule"]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooksService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BooksService = /** @class */ (function () {
    function BooksService(authHttp) {
        this.authHttp = authHttp;
        this.cfg = __WEBPACK_IMPORTED_MODULE_4__app_config__["a" /* cfg */];
    }
    BooksService.prototype.getAll = function () {
        return this.authHttp.get(this.cfg.apiUrl + this.cfg.books)
            .toPromise()
            .then(function (rs) {
            return rs.json();
        });
    };
    BooksService.prototype.getOne = function (id) {
        return this.authHttp.get(this.cfg.apiUrl + this.cfg.books + '/' + id)
            .toPromise()
            .then(function (rs) {
            console.log(rs, rs.json());
            return rs.json().book;
        });
    };
    BooksService.prototype.add = function (book) {
        return this.authHttp.post(this.cfg.apiUrl + this.cfg.books, book)
            .toPromise()
            .then(function () {
            return true;
        })
            .catch(function (e) { return console.log("create book error", e); });
    };
    BooksService.prototype.update = function (book) {
        return this.authHttp.put(this.cfg.apiUrl + this.cfg.books + '/' + book.id, book)
            .toPromise()
            .then(function (rs) {
            console.log(rs, rs.json());
            return rs.json();
        })
            .catch(function (e) { return console.log("update book error", e); });
    };
    BooksService.prototype.remove = function (id) {
        return this.authHttp.delete(this.cfg.apiUrl + this.cfg.books + '/' + id)
            .toPromise()
            .then(function (rs) {
            console.log(rs, rs.json());
            return rs.json();
        })
            .catch(function (e) { return console.log("delete book error", e); });
    };
    BooksService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]])
    ], BooksService);
    return BooksService;
}());

//# sourceMappingURL=books-service.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticiasService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NoticiasService = /** @class */ (function () {
    function NoticiasService(authHttp, cache) {
        this.authHttp = authHttp;
        this.cache = cache;
        this.cfg = __WEBPACK_IMPORTED_MODULE_4__app_config__["a" /* cfg */];
    }
    NoticiasService.prototype.getLast = function () {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.noticias + '/_all_docs?limit=1&include_docs=true';
        var cacheKey = url;
        var request = this.authHttp.get(url);
        return new Promise(function (resolve) {
            _this.cache.getItem(cacheKey).catch(function () {
                return _this.authHttp.get(url).toPromise().then(function (rs) {
                    var result = rs.json().rows[0].doc;
                    return _this.cache.saveItem(cacheKey, result);
                });
            }).then(function (data) {
                if (data.value) {
                    resolve(JSON.parse(data.value));
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    NoticiasService.prototype.getRows = function () {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.noticias + '/_all_docs?include_docs=true';
        var cacheKey = url;
        var request = this.authHttp.get(url);
        return new Promise(function (resolve) {
            _this.cache.getItem(cacheKey).catch(function () {
                return _this.authHttp.get(url).toPromise().then(function (rs) {
                    var result = rs.json().total_rows;
                    return _this.cache.saveItem(cacheKey, result);
                });
            }).then(function (data) {
                if (data.value) {
                    resolve(JSON.parse(data.value));
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    NoticiasService.prototype.getAll = function (offset, limit) {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.noticias + '/_all_docs?limit=' + limit + '&skip=' + offset + '&include_docs=true';
        var cacheKey = url;
        var request = this.authHttp.get(url);
        return new Promise(function (resolve) {
            _this.cache.getItem(cacheKey).catch(function () {
                return _this.authHttp.get(url).toPromise().then(function (rs) {
                    var result = rs.json().rows;
                    return _this.cache.saveItem(cacheKey, result);
                });
            }).then(function (data) {
                if (data.value) {
                    resolve(JSON.parse(data.value));
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    NoticiasService.prototype.getOne = function (id) {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.noticias + '/' + id;
        var cacheKey = url;
        var request = this.authHttp.get(url);
        return new Promise(function (resolve) {
            _this.cache.getItem(cacheKey).catch(function () {
                return _this.authHttp.get(url).toPromise().then(function (rs) {
                    var result = rs.json();
                    return _this.cache.saveItem(cacheKey, result);
                });
            }).then(function (data) {
                if (data.value) {
                    resolve(JSON.parse(data.value));
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    NoticiasService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_5_ionic_cache__["b" /* CacheService */]])
    ], NoticiasService);
    return NoticiasService;
}());

//# sourceMappingURL=noticias-service.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FerreteriasService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FerreteriasService = /** @class */ (function () {
    function FerreteriasService(storage, authHttp, cache) {
        this.storage = storage;
        this.authHttp = authHttp;
        this.cache = cache;
        this.cfg = __WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* cfg */];
    }
    FerreteriasService.prototype.saveFerreteria = function (idFerreteria) {
        var _id = idFerreteria;
        this.storage.set("id_ferreteria", _id);
    };
    FerreteriasService.prototype.getAll = function () {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.apiUrl + this.cfg.ferreterias + '/_all_docs?limit=20&include_docs=true';
        var cacheKey = url;
        var request = this.authHttp.get(url);
        return new Promise(function (resolve) {
            _this.cache.getItem(cacheKey).catch(function () {
                return _this.authHttp.get(url).toPromise().then(function (rs) {
                    var result = rs.json();
                    return _this.cache.saveItem(cacheKey, result);
                });
            }).then(function (data) {
                if (data.value) {
                    resolve(JSON.parse(data.value));
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    FerreteriasService.prototype.getOne = function (id) {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.ferreterias + '/' + id;
        var cacheKey = url;
        var request = this.authHttp.get(url);
        return new Promise(function (resolve) {
            _this.cache.getItem(cacheKey).catch(function () {
                return _this.authHttp.get(url).toPromise().then(function (rs) {
                    var result = rs.json();
                    return _this.cache.saveItem(cacheKey, result);
                });
            }).then(function (data) {
                if (data.value) {
                    resolve(JSON.parse(data.value));
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    FerreteriasService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_6_ionic_cache__["b" /* CacheService */]])
    ], FerreteriasService);
    return FerreteriasService;
}());

//# sourceMappingURL=ferreterias-service.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProveedoresService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProveedoresService = /** @class */ (function () {
    function ProveedoresService(storage, authHttp, cache) {
        this.storage = storage;
        this.authHttp = authHttp;
        this.cache = cache;
        this.cfg = __WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* cfg */];
    }
    ProveedoresService.prototype.getAll = function (id) {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.proveedores + '/_all_docs?include_docs=true';
        var cacheKey = url;
        var request = this.authHttp.get(url);
        return new Promise(function (resolve) {
            _this.cache.getItem(cacheKey).catch(function () {
                return _this.authHttp.get(url).toPromise().then(function (rs) {
                    var result = rs.json().rows;
                    return _this.cache.saveItem(cacheKey, result);
                });
            }).then(function (data) {
                if (data.value) {
                    resolve(JSON.parse(data.value));
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    ProveedoresService.prototype.getOne = function (id) {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.proveedores + '/' + id;
        var cacheKey = url;
        var request = this.authHttp.get(url);
        return new Promise(function (resolve) {
            _this.cache.getItem(cacheKey).catch(function () {
                return _this.authHttp.get(url).toPromise().then(function (rs) {
                    var result = rs.json();
                    return _this.cache.saveItem(cacheKey, result);
                });
            }).then(function (data) {
                if (data.value) {
                    resolve(JSON.parse(data.value));
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    ProveedoresService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_6_ionic_cache__["b" /* CacheService */]])
    ], ProveedoresService);
    return ProveedoresService;
}());

//# sourceMappingURL=proveedores-service.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(409);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getAuthHttp */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_module__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_imports__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var storage = new __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]({});
function getAuthHttp(http) {
    return new __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__["AuthConfig"]({
        noJwtError: true,
        globalHeaders: [{ 'Accept': 'application/json' }],
        tokenGetter: (function () { return storage.get('id_token'); }),
    }), http);
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_8__app_imports__["c" /* MODULES */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    backButtonText: '',
                    backButtonIcon: 'ios-arrow-back',
                    iconMode: 'md',
                    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                }, {
                    links: [
                        { loadChildren: '../pages/agenda/agenda.module#AgendaPageModule', name: 'AgendaPage', segment: 'agenda', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/book-add-page/book-add-page.module#BookAddPageModule', name: 'BookAddPage', segment: 'book-add-page', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/book-edit-page/book-edit-page.module#BookEditPageModule', name: 'BookEditPage', segment: 'book-edit-page', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/book-info-page/book-info-page.module#BookInfoPageModule', name: 'BookInfoPage', segment: 'book-info-page', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/books-page/books-page.module#BooksPageModule', name: 'BooksPage', segment: 'books-page', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/eventos/eventos.module#EventosPageModule', name: 'EventosPage', segment: 'eventos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot-page/forgot-page.module#ForgotPageModule', name: 'ForgotPage', segment: 'forgot-page', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/indicadores/indicadores.module#IndicadoresPageModule', name: 'IndicadoresPage', segment: 'indicadores', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/informacion-comercial/informacion-comercial.module#InformacionComercialPageModule', name: 'InformacionComercialPage', segment: 'informacion-comercial', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login-page/login-page.module#LoginPageModule', name: 'LoginPage', segment: 'login-page', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/noticia-detalle/noticia-detalle.module#NoticiaDetallePageModule', name: 'NoticiaDetallePage', segment: 'noticia-detalle', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/noticias/noticias.module#NoticiasPageModule', name: 'NoticiasPage', segment: 'noticias', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/preloader/preloader.module#PreloaderPageModule', name: 'PreloaderPage', segment: 'preloader', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile-page/profile-page.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile-page', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/proveedor/proveedor.module#ProveedorPageModule', name: 'ProveedorPage', segment: 'proveedor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/proveedores/proveedores.module#ProveedoresPageModule', name: 'ProveedoresPage', segment: 'proveedores', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_ionic_cache__["a" /* CacheModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7__shared_module__["a" /* SharedModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__app_imports__["e" /* PROVIDERS */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicErrorHandler */] },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__["AuthHttp"],
                    useFactory: getAuthHttp,
                    deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["Http"]]
                },
                __WEBPACK_IMPORTED_MODULE_8__app_imports__["f" /* SERVICES */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cfg; });
var cfg = {
    apiUrl: 'http://192.168.1.143:5984',
    /*apiUrl: 'http://books.prodio.bg/api',*/
    tokenName: 'token',
    user: {
        register: '/auth/signup',
        login: '/auth_login/_all_docs?limit=20&include_docs=true',
        refresh: '/auth_refresh/_all_docs?limit=20&include_docs=true',
    },
    ferreterias: '/ferreterias',
    proveedores: '/proveedores',
    noticias: '/noticias',
    books: '/books'
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UsersService = /** @class */ (function () {
    function UsersService(storage, authHttp) {
        this.storage = storage;
        this.authHttp = authHttp;
        this.cfg = __WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* cfg */];
    }
    UsersService.prototype.getAll = function () {
        return this.authHttp.get(this.cfg.apiUrl + this.cfg.proveedores + '/_all_docs?include_docs=true')
            .toPromise()
            .then(function (rs) {
            return rs.json();
        });
    };
    UsersService.prototype.getOne = function (id) {
        return this.authHttp.get(this.cfg.apiUrl + this.cfg.proveedores + '/' + id)
            .toPromise()
            .then(function (rs) {
            return rs.json();
        });
    };
    UsersService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]])
    ], UsersService);
    return UsersService;
}());

//# sourceMappingURL=users-service.js.map

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccordionListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AccordionListComponent = /** @class */ (function () {
    function AccordionListComponent(renderer) {
        this.renderer = renderer;
        this.textColor = '#FFF';
        this.contentColor = '#F9F9F9';
        this.desplegable = "true";
        this.button = false;
        this.masMeses = false;
        this.masMesesButton = "";
        this.hasMargin = true;
        this.expanded = true;
        this.primerTexto = true;
        this.segundoTexto = false;
    }
    AccordionListComponent.prototype.ngAfterViewInit = function () {
        this.viewHeight = this.elementView.nativeElement.offsetHeight;
        this.renderer.setElementStyle(this.elementView.nativeElement, 'max-height', this.maxHeight + 'px');
    };
    AccordionListComponent.prototype.toggleAccordion = function () {
        if (this.desplegable == "true") {
            this.expanded = !this.expanded;
            var newHeight = this.expanded ? this.maxHeight + 'px' : '0px';
            this.renderer.setElementStyle(this.elementView.nativeElement, 'max-height', newHeight);
        }
    };
    AccordionListComponent.prototype.toggleAccordionButton = function () {
        this.expanded = !this.expanded;
        var newHeight = this.expanded ? this.maxHeight + 'px' : '0px';
        this.renderer.setElementStyle(this.elementView.nativeElement, 'max-height', newHeight);
        if (this.primerTexto) {
            this.primerTexto = false;
            this.segundoTexto = true;
        }
        else {
            this.primerTexto = true;
            this.segundoTexto = false;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AccordionListComponent.prototype, "headerColor", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AccordionListComponent.prototype, "textColor", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AccordionListComponent.prototype, "contentColor", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AccordionListComponent.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AccordionListComponent.prototype, "subtitle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AccordionListComponent.prototype, "fecha", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AccordionListComponent.prototype, "valorIndicador", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AccordionListComponent.prototype, "desplegable", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AccordionListComponent.prototype, "button", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AccordionListComponent.prototype, "masMeses", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], AccordionListComponent.prototype, "masMesesButton", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AccordionListComponent.prototype, "hasMargin", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], AccordionListComponent.prototype, "maxHeight", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('accordionContent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], AccordionListComponent.prototype, "elementView", void 0);
    AccordionListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'accordion-list',template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/components/accordion-list/accordion-list.html"*/'<ion-list class="accordion-list">\n    <ion-list-header no-lines no-padding [class.headerNoDesplegable]="desplegable==\'false\'" [class.conSubtitle]="subtitle" [class.conFecha]="fecha" [class.conValorIndicador]="valorIndicador">\n        <button ion-item detail-none [style.background]="headerColor" [style.color]="textColor" (click)="toggleAccordion()" class="accordion-header" [class.active]="expanded">\n            <span class="title">{{ title }}</span>\n            <span *ngIf="fecha" class="fecha">{{ fecha }}</span>\n            <span *ngIf="subtitle" class="subtitle">{{ subtitle }}</span>\n            <span *ngIf="valorIndicador" class="valorIndicador">{{ valorIndicador }} %</span>\n            <i item-right class="fa fa-chevron-down" aria-hidden="true"></i>\n            <i item-right class="fa fa-chevron-up" aria-hidden="true"></i>\n        </button>\n        <section #accordionContent [style.background]="contentColor" [class.active]="expanded" class="accordion-content">\n            <ng-content></ng-content>\n        </section>\n    </ion-list-header>\n    <div class="text-center" *ngIf="button">\n        <button margin-bottom class="btn-primary" margin-top center ion-button large (click)="toggleAccordionButton()">\n            <span *ngIf="primerTexto">Ocultar detalles</span>\n            <span *ngIf="segundoTexto">Mostrar detalles</span>\n        </button>\n    </div>\n    <div class="text-center" *ngIf="masMeses">\n        <button id="{{masMesesButton}}" margin-bottom class="btn-primary" margin-top center ion-button large>\n            <span *ngIf="primerTexto">Mostrar más meses</span>\n        </button>\n    </div>\n</ion-list>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/components/accordion-list/accordion-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], AccordionListComponent);
    return AccordionListComponent;
}());

//# sourceMappingURL=accordion-list.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    };
    KeysPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'keys',
        })
    ], KeysPipe);
    return KeysPipe;
}());

//# sourceMappingURL=keys.js.map

/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 230,
	"./af.js": 230,
	"./ar": 231,
	"./ar-dz": 232,
	"./ar-dz.js": 232,
	"./ar-kw": 233,
	"./ar-kw.js": 233,
	"./ar-ly": 234,
	"./ar-ly.js": 234,
	"./ar-ma": 235,
	"./ar-ma.js": 235,
	"./ar-sa": 236,
	"./ar-sa.js": 236,
	"./ar-tn": 237,
	"./ar-tn.js": 237,
	"./ar.js": 231,
	"./az": 238,
	"./az.js": 238,
	"./be": 239,
	"./be.js": 239,
	"./bg": 240,
	"./bg.js": 240,
	"./bn": 241,
	"./bn.js": 241,
	"./bo": 242,
	"./bo.js": 242,
	"./br": 243,
	"./br.js": 243,
	"./bs": 244,
	"./bs.js": 244,
	"./ca": 245,
	"./ca.js": 245,
	"./cs": 246,
	"./cs.js": 246,
	"./cv": 247,
	"./cv.js": 247,
	"./cy": 248,
	"./cy.js": 248,
	"./da": 249,
	"./da.js": 249,
	"./de": 250,
	"./de-at": 251,
	"./de-at.js": 251,
	"./de-ch": 252,
	"./de-ch.js": 252,
	"./de.js": 250,
	"./dv": 253,
	"./dv.js": 253,
	"./el": 254,
	"./el.js": 254,
	"./en-au": 255,
	"./en-au.js": 255,
	"./en-ca": 256,
	"./en-ca.js": 256,
	"./en-gb": 257,
	"./en-gb.js": 257,
	"./en-ie": 258,
	"./en-ie.js": 258,
	"./en-nz": 259,
	"./en-nz.js": 259,
	"./eo": 260,
	"./eo.js": 260,
	"./es": 261,
	"./es-do": 262,
	"./es-do.js": 262,
	"./es.js": 261,
	"./et": 263,
	"./et.js": 263,
	"./eu": 264,
	"./eu.js": 264,
	"./fa": 265,
	"./fa.js": 265,
	"./fi": 266,
	"./fi.js": 266,
	"./fo": 267,
	"./fo.js": 267,
	"./fr": 268,
	"./fr-ca": 269,
	"./fr-ca.js": 269,
	"./fr-ch": 270,
	"./fr-ch.js": 270,
	"./fr.js": 268,
	"./fy": 271,
	"./fy.js": 271,
	"./gd": 272,
	"./gd.js": 272,
	"./gl": 273,
	"./gl.js": 273,
	"./gom-latn": 274,
	"./gom-latn.js": 274,
	"./he": 275,
	"./he.js": 275,
	"./hi": 276,
	"./hi.js": 276,
	"./hr": 277,
	"./hr.js": 277,
	"./hu": 278,
	"./hu.js": 278,
	"./hy-am": 279,
	"./hy-am.js": 279,
	"./id": 280,
	"./id.js": 280,
	"./is": 281,
	"./is.js": 281,
	"./it": 282,
	"./it.js": 282,
	"./ja": 283,
	"./ja.js": 283,
	"./jv": 284,
	"./jv.js": 284,
	"./ka": 285,
	"./ka.js": 285,
	"./kk": 286,
	"./kk.js": 286,
	"./km": 287,
	"./km.js": 287,
	"./kn": 288,
	"./kn.js": 288,
	"./ko": 289,
	"./ko.js": 289,
	"./ky": 290,
	"./ky.js": 290,
	"./lb": 291,
	"./lb.js": 291,
	"./lo": 292,
	"./lo.js": 292,
	"./lt": 293,
	"./lt.js": 293,
	"./lv": 294,
	"./lv.js": 294,
	"./me": 295,
	"./me.js": 295,
	"./mi": 296,
	"./mi.js": 296,
	"./mk": 297,
	"./mk.js": 297,
	"./ml": 298,
	"./ml.js": 298,
	"./mr": 299,
	"./mr.js": 299,
	"./ms": 300,
	"./ms-my": 301,
	"./ms-my.js": 301,
	"./ms.js": 300,
	"./my": 302,
	"./my.js": 302,
	"./nb": 303,
	"./nb.js": 303,
	"./ne": 304,
	"./ne.js": 304,
	"./nl": 305,
	"./nl-be": 306,
	"./nl-be.js": 306,
	"./nl.js": 305,
	"./nn": 307,
	"./nn.js": 307,
	"./pa-in": 308,
	"./pa-in.js": 308,
	"./pl": 309,
	"./pl.js": 309,
	"./pt": 310,
	"./pt-br": 311,
	"./pt-br.js": 311,
	"./pt.js": 310,
	"./ro": 312,
	"./ro.js": 312,
	"./ru": 313,
	"./ru.js": 313,
	"./sd": 314,
	"./sd.js": 314,
	"./se": 315,
	"./se.js": 315,
	"./si": 316,
	"./si.js": 316,
	"./sk": 317,
	"./sk.js": 317,
	"./sl": 318,
	"./sl.js": 318,
	"./sq": 319,
	"./sq.js": 319,
	"./sr": 320,
	"./sr-cyrl": 321,
	"./sr-cyrl.js": 321,
	"./sr.js": 320,
	"./ss": 322,
	"./ss.js": 322,
	"./sv": 323,
	"./sv.js": 323,
	"./sw": 324,
	"./sw.js": 324,
	"./ta": 325,
	"./ta.js": 325,
	"./te": 326,
	"./te.js": 326,
	"./tet": 327,
	"./tet.js": 327,
	"./th": 328,
	"./th.js": 328,
	"./tl-ph": 329,
	"./tl-ph.js": 329,
	"./tlh": 330,
	"./tlh.js": 330,
	"./tr": 331,
	"./tr.js": 331,
	"./tzl": 332,
	"./tzl.js": 332,
	"./tzm": 333,
	"./tzm-latn": 334,
	"./tzm-latn.js": 334,
	"./tzm.js": 333,
	"./uk": 335,
	"./uk.js": 335,
	"./ur": 336,
	"./ur.js": 336,
	"./uz": 337,
	"./uz-latn": 338,
	"./uz-latn.js": 338,
	"./uz.js": 337,
	"./vi": 339,
	"./vi.js": 339,
	"./x-pseudo": 340,
	"./x-pseudo.js": 340,
	"./yo": 341,
	"./yo.js": 341,
	"./zh-cn": 342,
	"./zh-cn.js": 342,
	"./zh-hk": 343,
	"./zh-hk.js": 343,
	"./zh-tw": 344,
	"./zh-tw.js": 344
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 703;

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_full_screen__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, authService, androidFullScreen, menuCtrl, cache) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.authService = authService;
        this.androidFullScreen = androidFullScreen;
        this.menuCtrl = menuCtrl;
        this.cache = cache;
        this.rootPage = 'PreloaderPage';
        this.pages = [
            { title: "Inicio", component: "HomePage" },
            { title: 'Indicadores', component: 'IndicadoresPage' },
            { title: 'Proveedores', component: 'ProveedoresPage' },
            { title: 'Información Comercial', component: 'InformacionComercialPage' },
            { title: 'Noticias', component: 'NoticiasPage' },
            { title: 'Agenda', component: 'AgendaPage' },
            { title: 'Eventos', component: 'EventosPage' },
            { title: 'Mi Perfil', component: 'ProfilePage' },
            { title: 'Cerrar Sesión', component: 'LoginPage', method: 'logout' }
        ];
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(this.initializeApp());
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.androidFullScreen.isImmersiveModeSupported().then(function () { return _this.androidFullScreen.immersiveMode(); }).catch(function (error) { return console.log(error); });
        this.platform.ready().then(function () {
            _this.cache.setDefaultTTL(60 * 60 * 12 * 7);
            _this.cache.setOfflineInvalidate(false);
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.authService.startupTokenRefresh();
        });
    };
    MyApp.prototype.openPage = function (page) {
        var pageActual = this.nav.getActive().name;
        this.menuCtrl.close();
        if (pageActual != page.component) {
            if (page.component == "HomePage") {
                this.nav.setRoot(page.component);
            }
            else if (page.component == "LoginPage") {
                this.nav.setRoot(page.component);
            }
            else {
                this.nav.push(page.component);
            }
        }
        if (page.method && page.method === 'logout') {
            this.authService.logout();
        }
    };
    MyApp.prototype.menuClosed = function () {
        __WEBPACK_IMPORTED_MODULE_7_jquery__("ion-header .bar-button-menutoggle[right] .navicon-button").removeClass("open");
    };
    MyApp.prototype.menuOpened = function () {
        __WEBPACK_IMPORTED_MODULE_7_jquery__("ion-header .bar-button-menutoggle[right] .navicon-button").addClass("open");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/app/app.html"*/'<ion-menu id="authenticated" [content]="contenido" side="right" type="overlay" persistent="true" (ionOpen)="menuOpened()" (ionClose)="menuClosed()" >\n    <ion-content class="has-footer">\n        <ion-list inset>\n            <button ion-item *ngFor="let page of pages" (click)="openPage(page)" [class.hidden]="page.invisible" detail-push>\n    			{{page.title}}\n    		</button>\n        </ion-list>\n        <ion-list class="indicadores" inset>\n            <ion-item>\n                <div class="title">Indicadores económicos</div>\n            </ion-item>\n            <ion-item class="indicador">\n                <span class="title">Valor Dólar</span>\n                <span class="valor">642 CLP</span>\n            </ion-item>\n            <ion-item class="indicador">\n                <span class="title">Valor UF</span>\n                <span class="valor">26.619,53</span>\n            </ion-item>\n        </ion-list>\n        <ion-footer class="lastUpdate">\n            <div class="version">1.0.1</div>\n            <div class="date">Última descarga de datos: 22 Sep 2017</div>\n        </ion-footer>\n    </ion-content>\n</ion-menu>\n<ion-nav #contenido [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/bastian_fredes/Desktop/Proyectos/2017/MTS/SociosMTS/ionic/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_full_screen__["a" /* AndroidFullScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_cache__["b" /* CacheService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[404]);
//# sourceMappingURL=main.js.map