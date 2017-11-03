webpackJsonp([17],{

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cache_img_cache_img_service__ = __webpack_require__(698);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__cache_img_cache_img_service__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_jwt__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__connectivity_service__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_cache__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_config__ = __webpack_require__(37);
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
            _this.authHttp.post(_this.cfg.apiUrl + _this.cfg.user.login, credentials).subscribe(function (data) {
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
    AuthService.prototype.login_produccion = function (credentials) {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(function (resolve) {
            _this.authHttp.get(_this.cfg.apiUrl + _this.cfg.user.login + '/' + credentials.email + '/' + credentials.password).subscribe(function (data) {
                if (data) {
                    _this.saveData_produccion(data);
                    var rs = data.json();
                    _this.idToken = rs.token;
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
    AuthService.prototype.saveData_produccion = function (data) {
        var rs = data.json();
        this.storage.set("user", rs.user_id);
        this.storage.set("id_token", rs.token);
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
            _this.authHttp.get(_this.cfg.apiUrl + _this.cfg.user.refresh + "&Token=" + thetoken)
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

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectivityService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
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

/***/ 152:
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
webpackEmptyAsyncContext.id = 152;

/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/agenda/agenda.module": [
		733,
		11
	],
	"../pages/book-edit-page/book-edit-page.module": [
		734,
		0
	],
	"../pages/eventos-detalle/eventos-detalle.module": [
		735,
		16
	],
	"../pages/eventos/eventos.module": [
		736,
		10
	],
	"../pages/forgot-page/forgot-page.module": [
		737,
		15
	],
	"../pages/home/home.module": [
		738,
		4
	],
	"../pages/indicadores/indicadores.module": [
		739,
		3
	],
	"../pages/informacion-comercial-detalle/informacion-comercial-detalle.module": [
		740,
		9
	],
	"../pages/informacion-comercial/informacion-comercial.module": [
		741,
		8
	],
	"../pages/login-page/login-page.module": [
		742,
		14
	],
	"../pages/noticia-detalle/noticia-detalle.module": [
		743,
		7
	],
	"../pages/noticias/noticias.module": [
		744,
		6
	],
	"../pages/preloader/preloader.module": [
		745,
		13
	],
	"../pages/profile-page/profile-page.module": [
		746,
		5
	],
	"../pages/proveedor/proveedor.module": [
		747,
		2
	],
	"../pages/proveedores/proveedores.module": [
		748,
		1
	],
	"../pages/welcome/welcome.module": [
		749,
		12
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
webpackAsyncContext.id = 195;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MODULES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SERVICES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DIRECTIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PIPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COMPONENTS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_connectivity_service__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ferreterias_service__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_proveedores_service__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_productos_service__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_users_service__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_noticias_service__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_informercial_service__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_eventos_service__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_photo_viewer__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_android_full_screen__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_network__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_keyboard__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__global_services__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_jwt__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_accordion_list_accordion_list__ = __webpack_require__(700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__global_components___ = __webpack_require__(701);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pipes_keys_keys__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_http__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__global_directives___ = __webpack_require__(704);
// Providers









// Ionic native providers










// Components


// Pipes

// Modules


// DIRECTIVES

var MODULES = [
    __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser__["a" /* BrowserModule */],
    __WEBPACK_IMPORTED_MODULE_23__angular_http__["HttpModule"]
];
var SERVICES = [
    __WEBPACK_IMPORTED_MODULE_0__providers_auth_service__["a" /* AuthService */],
    __WEBPACK_IMPORTED_MODULE_1__providers_connectivity_service__["a" /* ConnectivityService */],
    __WEBPACK_IMPORTED_MODULE_5__providers_users_service__["a" /* UsersService */],
    __WEBPACK_IMPORTED_MODULE_2__providers_ferreterias_service__["a" /* FerreteriasService */],
    __WEBPACK_IMPORTED_MODULE_3__providers_proveedores_service__["a" /* ProveedoresService */],
    __WEBPACK_IMPORTED_MODULE_4__providers_productos_service__["a" /* ProductosService */],
    __WEBPACK_IMPORTED_MODULE_6__providers_noticias_service__["a" /* NoticiasService */],
    __WEBPACK_IMPORTED_MODULE_7__providers_informercial_service__["a" /* InformercialService */],
    __WEBPACK_IMPORTED_MODULE_8__providers_eventos_service__["a" /* EventosService */]
];
var DIRECTIVES = [
    __WEBPACK_IMPORTED_MODULE_24__global_directives___["a" /* LazyLoadDirective */]
];
var PIPES = [
    __WEBPACK_IMPORTED_MODULE_21__pipes_keys_keys__["a" /* KeysPipe */]
];
var PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
    __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
    __WEBPACK_IMPORTED_MODULE_14__ionic_native_network__["a" /* Network */],
    __WEBPACK_IMPORTED_MODULE_9__ionic_native_photo_viewer__["a" /* PhotoViewer */],
    __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */],
    __WEBPACK_IMPORTED_MODULE_18_angular2_jwt__["JwtHelper"],
    __WEBPACK_IMPORTED_MODULE_13__ionic_native_android_full_screen__["a" /* AndroidFullScreen */],
    __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__["b" /* GoogleMaps */],
    __WEBPACK_IMPORTED_MODULE_16__ionic_native_keyboard__["a" /* Keyboard */],
    __WEBPACK_IMPORTED_MODULE_17__global_services__["a" /* ImgcacheService */]
];
var COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_19__components_accordion_list_accordion_list__["a" /* AccordionListComponent */],
    __WEBPACK_IMPORTED_MODULE_20__global_components___["a" /* LazyImgComponent */]
];
//# sourceMappingURL=app.imports.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cfg; });
var cfg = {
    apiUrl: 'http://192.168.1.143:5984',
    tokenName: 'token',
    user: {
        register: '/auth/signup',
        login: '/auth_login/_all_docs?limit=20&include_docs=true',
        refresh: '/auth_refresh/_all_docs?limit=20&include_docs=true',
    },
    ferreterias: '/ferreterias',
    proveedores: '/proveedores',
    productos: '/productos',
    productostop: '/productos_top',
    noticias: '/noticias',
    informercial: '/inforcomercial',
    eventos: '/eventos'
};
/*
export let cfg = {
    apiUrl: 'http://wsp.mts.cl/app/index.php?/',
    tokenName: 'token',
    user: {
        register: '/auth/signup',
        login: 'usuario/usuarioApp',
        refresh:'/auth_refresh/_all_docs?limit=20&include_docs=true',
    },
    ferreterias: '/ferreterias',
    proveedores: '/proveedores',
    productos: '/productos',
    productostop: '/productos_top',
    noticias: '/noticias',
    informercial: '/inforcomercial',
    eventos: '/eventos'
};
*/
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_imports__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_truncate__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_moment__ = __webpack_require__(710);
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

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticiasService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(36);
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

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FerreteriasService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(36);
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

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProveedoresService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(36);
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

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductosService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProductosService = /** @class */ (function () {
    function ProductosService(storage, authHttp, cache) {
        this.storage = storage;
        this.authHttp = authHttp;
        this.cache = cache;
        this.cfg = __WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* cfg */];
    }
    ProductosService.prototype.getTop = function (id_proveedor) {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.productostop + '/_all_docs?limit=3&include_docs=true';
        var cacheKey = url;
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
    ProductosService.prototype.getAll = function () {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.productos + '/_all_docs?include_docs=true';
        var cacheKey = url;
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
    ProductosService.prototype.getOne = function (id) {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.productos + '/' + id;
        var cacheKey = url;
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
    ProductosService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_6_ionic_cache__["b" /* CacheService */]])
    ], ProductosService);
    return ProductosService;
}());

//# sourceMappingURL=productos-service.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InformercialService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var InformercialService = /** @class */ (function () {
    function InformercialService(authHttp, cache) {
        this.authHttp = authHttp;
        this.cache = cache;
        this.cfg = __WEBPACK_IMPORTED_MODULE_4__app_config__["a" /* cfg */];
    }
    InformercialService.prototype.getAll = function () {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.informercial + '/_all_docs?include_docs=true';
        var cacheKey = url;
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
    InformercialService.prototype.getOne = function (id) {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.informercial + '/' + id;
        var cacheKey = url;
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
    InformercialService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_5_ionic_cache__["b" /* CacheService */]])
    ], InformercialService);
    return InformercialService;
}());

//# sourceMappingURL=informercial-service.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventosService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EventosService = /** @class */ (function () {
    function EventosService(authHttp, cache) {
        this.authHttp = authHttp;
        this.cache = cache;
        this.cfg = __WEBPACK_IMPORTED_MODULE_4__app_config__["a" /* cfg */];
    }
    EventosService.prototype.getLast = function () {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.eventos + '/_all_docs?limit=1&include_docs=true';
        var cacheKey = url;
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
    EventosService.prototype.getRows = function () {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.eventos + '/_all_docs?include_docs=true';
        var cacheKey = url;
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
    EventosService.prototype.getAll = function (offset, limit) {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.eventos + '/_all_docs?limit=' + limit + '&skip=' + offset + '&include_docs=true';
        var cacheKey = url;
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
    EventosService.prototype.getOne = function (id) {
        var _this = this;
        var url = this.cfg.apiUrl + this.cfg.eventos + '/' + id;
        var cacheKey = url;
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
    EventosService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_5_ionic_cache__["b" /* CacheService */]])
    ], EventosService);
    return EventosService;
}());

//# sourceMappingURL=eventos-service.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(412);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getAuthHttp */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_module__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_imports__ = __webpack_require__(196);
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
                        { loadChildren: '../pages/book-edit-page/book-edit-page.module#BookEditPageModule', name: 'BookEditPage', segment: 'book-edit-page', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/eventos-detalle/eventos-detalle.module#EventosDetallePageModule', name: 'EventosDetallePage', segment: 'eventos-detalle', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/eventos/eventos.module#EventosPageModule', name: 'EventosPage', segment: 'eventos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot-page/forgot-page.module#ForgotPageModule', name: 'ForgotPage', segment: 'forgot-page', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/indicadores/indicadores.module#IndicadoresPageModule', name: 'IndicadoresPage', segment: 'indicadores', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/informacion-comercial-detalle/informacion-comercial-detalle.module#InformacionComercialDetallePageModule', name: 'InformacionComercialDetallePage', segment: 'informacion-comercial-detalle', priority: 'low', defaultHistory: [] },
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

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(37);
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

/***/ 698:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImgcacheService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_imgcache_js__ = __webpack_require__(699);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_imgcache_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * This service is charged of provide the methods to cache the images
 */
var ImgcacheService = /** @class */ (function () {
    function ImgcacheService(platform) {
        this.imgQueue = [];
        __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.options.debug = true;
    }
    /**
     * Init imgCache library
     * @return {Promise}
     */
    ImgcacheService.prototype.initImgCache = function () {
        return new Promise(function (resolve, reject) {
            if (__WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.ready) {
                resolve();
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.init(function () { return resolve(); }, function () { return reject(); });
            }
        });
    };
    /**
     * Cache images
     * @param src {string} - img source
     */
    ImgcacheService.prototype.cacheImg = function (src) {
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.isCached(src, function (path, success) {
                // if not, it will be cached
                if (success) {
                    __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.getCachedFileURL(src, function (originalUrl, cacheUrl) {
                        resolve(cacheUrl);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    // cache img
                    __WEBPACK_IMPORTED_MODULE_2_imgcache_js___default.a.cacheFile(src);
                    // return original img URL
                    resolve(src);
                }
            });
        });
    };
    ImgcacheService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]) === "function" && _a || Object])
    ], ImgcacheService);
    return ImgcacheService;
    var _a;
}());

//# sourceMappingURL=cache-img.service.js.map

/***/ }),

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccordionListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_img_lazy_img_component__ = __webpack_require__(702);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__lazy_img_lazy_img_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LazyImgComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Component in charge of lazy load images and cache them
 */
var LazyImgComponent = /** @class */ (function () {
    function LazyImgComponent() {
        this.placeholderActive = true;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], LazyImgComponent.prototype, "inputSrc", void 0);
    LazyImgComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'lazy-img',
            template: "\n  <div text-center [ngClass]=\"{ 'placeholder': placeholderActive }\">\n    <img [inputSrc]=\"inputSrc\" lazy-load (loaded)=\"placeholderActive = false\"/>\n  </div>\n  "
        })
    ], LazyImgComponent);
    return LazyImgComponent;
}());

//# sourceMappingURL=lazy-img.component.js.map

/***/ }),

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_load_directive__ = __webpack_require__(705);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__lazy_load_directive__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LazyLoadDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services___ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * This directive is charge of cache the images and emit a loaded event
 */
var LazyLoadDirective = /** @class */ (function () {
    function LazyLoadDirective(el, imgCacheService, renderer) {
        this.el = el;
        this.imgCacheService = imgCacheService;
        this.renderer = renderer;
        this.src = '';
        this.loaded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    LazyLoadDirective.prototype.ngOnInit = function () {
        var _this = this;
        // get img element
        var nativeElement = this.el.nativeElement;
        var render = this.renderer;
        // add load listener
        this.loadEvent = render.listen(nativeElement, 'load', function () {
            render.addClass(nativeElement, 'loaded');
            _this.loaded.emit();
        });
        this.errorEvent = render.listen(nativeElement, 'error', function () {
            nativeElement.remove();
        });
        // cache img and set the src to the img
        this.imgCacheService.cacheImg(this.src).then(function (value) {
            render.setAttribute(nativeElement, 'src', value);
        });
    };
    LazyLoadDirective.prototype.ngOnDestroy = function () {
        // remove listeners
        this.loadEvent();
        this.errorEvent();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('inputSrc'),
        __metadata("design:type", Object)
    ], LazyLoadDirective.prototype, "src", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], LazyLoadDirective.prototype, "loaded", void 0);
    LazyLoadDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[lazy-load]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
            __WEBPACK_IMPORTED_MODULE_1__services___["a" /* ImgcacheService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]])
    ], LazyLoadDirective);
    return LazyLoadDirective;
}());

//# sourceMappingURL=lazy-load.directive.js.map

/***/ }),

/***/ 712:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 231,
	"./af.js": 231,
	"./ar": 232,
	"./ar-dz": 233,
	"./ar-dz.js": 233,
	"./ar-kw": 234,
	"./ar-kw.js": 234,
	"./ar-ly": 235,
	"./ar-ly.js": 235,
	"./ar-ma": 236,
	"./ar-ma.js": 236,
	"./ar-sa": 237,
	"./ar-sa.js": 237,
	"./ar-tn": 238,
	"./ar-tn.js": 238,
	"./ar.js": 232,
	"./az": 239,
	"./az.js": 239,
	"./be": 240,
	"./be.js": 240,
	"./bg": 241,
	"./bg.js": 241,
	"./bn": 242,
	"./bn.js": 242,
	"./bo": 243,
	"./bo.js": 243,
	"./br": 244,
	"./br.js": 244,
	"./bs": 245,
	"./bs.js": 245,
	"./ca": 246,
	"./ca.js": 246,
	"./cs": 247,
	"./cs.js": 247,
	"./cv": 248,
	"./cv.js": 248,
	"./cy": 249,
	"./cy.js": 249,
	"./da": 250,
	"./da.js": 250,
	"./de": 251,
	"./de-at": 252,
	"./de-at.js": 252,
	"./de-ch": 253,
	"./de-ch.js": 253,
	"./de.js": 251,
	"./dv": 254,
	"./dv.js": 254,
	"./el": 255,
	"./el.js": 255,
	"./en-au": 256,
	"./en-au.js": 256,
	"./en-ca": 257,
	"./en-ca.js": 257,
	"./en-gb": 258,
	"./en-gb.js": 258,
	"./en-ie": 259,
	"./en-ie.js": 259,
	"./en-nz": 260,
	"./en-nz.js": 260,
	"./eo": 261,
	"./eo.js": 261,
	"./es": 262,
	"./es-do": 263,
	"./es-do.js": 263,
	"./es.js": 262,
	"./et": 264,
	"./et.js": 264,
	"./eu": 265,
	"./eu.js": 265,
	"./fa": 266,
	"./fa.js": 266,
	"./fi": 267,
	"./fi.js": 267,
	"./fo": 268,
	"./fo.js": 268,
	"./fr": 269,
	"./fr-ca": 270,
	"./fr-ca.js": 270,
	"./fr-ch": 271,
	"./fr-ch.js": 271,
	"./fr.js": 269,
	"./fy": 272,
	"./fy.js": 272,
	"./gd": 273,
	"./gd.js": 273,
	"./gl": 274,
	"./gl.js": 274,
	"./gom-latn": 275,
	"./gom-latn.js": 275,
	"./he": 276,
	"./he.js": 276,
	"./hi": 277,
	"./hi.js": 277,
	"./hr": 278,
	"./hr.js": 278,
	"./hu": 279,
	"./hu.js": 279,
	"./hy-am": 280,
	"./hy-am.js": 280,
	"./id": 281,
	"./id.js": 281,
	"./is": 282,
	"./is.js": 282,
	"./it": 283,
	"./it.js": 283,
	"./ja": 284,
	"./ja.js": 284,
	"./jv": 285,
	"./jv.js": 285,
	"./ka": 286,
	"./ka.js": 286,
	"./kk": 287,
	"./kk.js": 287,
	"./km": 288,
	"./km.js": 288,
	"./kn": 289,
	"./kn.js": 289,
	"./ko": 290,
	"./ko.js": 290,
	"./ky": 291,
	"./ky.js": 291,
	"./lb": 292,
	"./lb.js": 292,
	"./lo": 293,
	"./lo.js": 293,
	"./lt": 294,
	"./lt.js": 294,
	"./lv": 295,
	"./lv.js": 295,
	"./me": 296,
	"./me.js": 296,
	"./mi": 297,
	"./mi.js": 297,
	"./mk": 298,
	"./mk.js": 298,
	"./ml": 299,
	"./ml.js": 299,
	"./mr": 300,
	"./mr.js": 300,
	"./ms": 301,
	"./ms-my": 302,
	"./ms-my.js": 302,
	"./ms.js": 301,
	"./my": 303,
	"./my.js": 303,
	"./nb": 304,
	"./nb.js": 304,
	"./ne": 305,
	"./ne.js": 305,
	"./nl": 306,
	"./nl-be": 307,
	"./nl-be.js": 307,
	"./nl.js": 306,
	"./nn": 308,
	"./nn.js": 308,
	"./pa-in": 309,
	"./pa-in.js": 309,
	"./pl": 310,
	"./pl.js": 310,
	"./pt": 311,
	"./pt-br": 312,
	"./pt-br.js": 312,
	"./pt.js": 311,
	"./ro": 313,
	"./ro.js": 313,
	"./ru": 314,
	"./ru.js": 314,
	"./sd": 315,
	"./sd.js": 315,
	"./se": 316,
	"./se.js": 316,
	"./si": 317,
	"./si.js": 317,
	"./sk": 318,
	"./sk.js": 318,
	"./sl": 319,
	"./sl.js": 319,
	"./sq": 320,
	"./sq.js": 320,
	"./sr": 321,
	"./sr-cyrl": 322,
	"./sr-cyrl.js": 322,
	"./sr.js": 321,
	"./ss": 323,
	"./ss.js": 323,
	"./sv": 324,
	"./sv.js": 324,
	"./sw": 325,
	"./sw.js": 325,
	"./ta": 326,
	"./ta.js": 326,
	"./te": 327,
	"./te.js": 327,
	"./tet": 328,
	"./tet.js": 328,
	"./th": 329,
	"./th.js": 329,
	"./tl-ph": 330,
	"./tl-ph.js": 330,
	"./tlh": 331,
	"./tlh.js": 331,
	"./tr": 332,
	"./tr.js": 332,
	"./tzl": 333,
	"./tzl.js": 333,
	"./tzm": 334,
	"./tzm-latn": 335,
	"./tzm-latn.js": 335,
	"./tzm.js": 334,
	"./uk": 336,
	"./uk.js": 336,
	"./ur": 337,
	"./ur.js": 337,
	"./uz": 338,
	"./uz-latn": 339,
	"./uz-latn.js": 339,
	"./uz.js": 338,
	"./vi": 340,
	"./vi.js": 340,
	"./x-pseudo": 341,
	"./x-pseudo.js": 341,
	"./yo": 342,
	"./yo.js": 342,
	"./zh-cn": 343,
	"./zh-cn.js": 343,
	"./zh-hk": 344,
	"./zh-hk.js": 344,
	"./zh-tw": 345,
	"./zh-tw.js": 345
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
webpackContext.id = 712;

/***/ }),

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_full_screen__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__global_services__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jquery__);
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
    function MyApp(platform, statusBar, splashScreen, authService, androidFullScreen, menuCtrl, imgcacheService, cache) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.authService = authService;
        this.androidFullScreen = androidFullScreen;
        this.menuCtrl = menuCtrl;
        this.imgcacheService = imgcacheService;
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
            _this.imgcacheService.initImgCache().then(function () {
                _this.statusBar.styleDefault();
                _this.splashScreen.hide();
                _this.authService.startupTokenRefresh();
            });
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
                this.nav.popToRoot({ animate: false });
                this.nav.push(page.component);
            }
        }
        if (page.method && page.method === 'logout') {
            this.authService.logout();
        }
    };
    MyApp.prototype.menuClosed = function () {
        __WEBPACK_IMPORTED_MODULE_8_jquery__("ion-header .bar-button-menutoggle[right] .navicon-button").removeClass("open");
    };
    MyApp.prototype.menuOpened = function () {
        __WEBPACK_IMPORTED_MODULE_8_jquery__("ion-header .bar-button-menutoggle[right] .navicon-button").addClass("open");
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
            __WEBPACK_IMPORTED_MODULE_7__global_services__["a" /* ImgcacheService */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_cache__["b" /* CacheService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[407]);
//# sourceMappingURL=main.js.map