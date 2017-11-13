webpackJsonp([17],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cache_img_cache_img_service__ = __webpack_require__(817);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__cache_img_cache_img_service__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_jwt__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__connectivity_service__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_cache__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_config__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AuthService = (function () {
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
    AuthService.prototype.getIndicadoresEconomicos = function () {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var url = this.cfg.apiUrl + this.cfg.indicadores + '/_all_docs?include_docs=true';
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
    AuthService.prototype.invitarEvento = function (invitadoM) {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(function (resolve) {
            _this.authHttp.get(_this.cfg.apiUrl + _this.cfg.eventos + '_invitar').subscribe(function (data) {
                if (data) {
                    var rs = data.json();
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
        //this.unscheduleRefresh();
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
                    //this.refreshSubscription.unsubscribe();
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
        /*
    this.refreshSubscription = source.subscribe(() => {
        console.log("peticion");
        if (this.connectivityService.isOffline()) {
            console.log("Offline");
            //this.refreshSubscription.unsubscribe();
            this.storage.set("id_token", "offline");
        }
        else {
            this.getNewJwt();
        }
    });
    */
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
                    //this.scheduleRefresh();
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
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_7__connectivity_service__["a" /* ConnectivityService */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_cache__["b" /* CacheService */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectivityService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConnectivityService = (function () {
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */]])
    ], ConnectivityService);
    return ConnectivityService;
}());

//# sourceMappingURL=connectivity-service.js.map

/***/ }),

/***/ 175:
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
webpackEmptyAsyncContext.id = 175;

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/agenda/agenda.module": [
		853,
		12
	],
	"../pages/eventos-detalle/eventos-detalle.module": [
		854,
		3
	],
	"../pages/eventos/eventos.module": [
		855,
		11
	],
	"../pages/forgot-page/forgot-page.module": [
		856,
		16
	],
	"../pages/home/home.module": [
		857,
		2
	],
	"../pages/indicadores/indicadores.module": [
		858,
		1
	],
	"../pages/informacion-comercial-detalle/informacion-comercial-detalle.module": [
		859,
		10
	],
	"../pages/informacion-comercial/informacion-comercial.module": [
		860,
		9
	],
	"../pages/login-page/login-page.module": [
		861,
		15
	],
	"../pages/noticia-detalle/noticia-detalle.module": [
		862,
		8
	],
	"../pages/noticias/noticias.module": [
		863,
		7
	],
	"../pages/preloader/preloader.module": [
		864,
		14
	],
	"../pages/profile-detalle/profile-detalle.module": [
		865,
		5
	],
	"../pages/profile-page/profile-page.module": [
		866,
		6
	],
	"../pages/proveedor/proveedor.module": [
		867,
		0
	],
	"../pages/proveedores/proveedores.module": [
		868,
		4
	],
	"../pages/welcome/welcome.module": [
		869,
		13
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
webpackAsyncContext.id = 220;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MODULES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SERVICES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DIRECTIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PIPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COMPONENTS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_connectivity_service__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_eventos_service__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_ferreterias_service__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_informercial_service__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_noticias_service__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_productos_service__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_proveedores_service__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_users_service__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_photo_viewer__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(816);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_android_full_screen__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_network__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_keyboard__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_app_version__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_contacts__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_call_number__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_email_composer__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_screen_orientation__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__global_services__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_angular2_jwt__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_accordion_list_accordion_list__ = __webpack_require__(819);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__global_components___ = __webpack_require__(820);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pipes_keys_keys__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pipes_point_replacer_point_replacer__ = __webpack_require__(823);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__global_directives___ = __webpack_require__(824);
// Providers









// Ionic native providers















// Components


// Pipes


// Modules


// DIRECTIVES

var MODULES = [
    __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser__["a" /* BrowserModule */],
    __WEBPACK_IMPORTED_MODULE_29__angular_http__["HttpModule"]
];
var SERVICES = [
    __WEBPACK_IMPORTED_MODULE_0__providers_auth_service__["a" /* AuthService */],
    __WEBPACK_IMPORTED_MODULE_1__providers_connectivity_service__["a" /* ConnectivityService */],
    __WEBPACK_IMPORTED_MODULE_2__providers_eventos_service__["a" /* EventosService */],
    __WEBPACK_IMPORTED_MODULE_3__providers_ferreterias_service__["a" /* FerreteriasService */],
    __WEBPACK_IMPORTED_MODULE_4__providers_informercial_service__["a" /* InformercialService */],
    __WEBPACK_IMPORTED_MODULE_5__providers_noticias_service__["a" /* NoticiasService */],
    __WEBPACK_IMPORTED_MODULE_6__providers_productos_service__["a" /* ProductosService */],
    __WEBPACK_IMPORTED_MODULE_7__providers_proveedores_service__["a" /* ProveedoresService */],
    __WEBPACK_IMPORTED_MODULE_8__providers_users_service__["a" /* UsersService */]
];
var DIRECTIVES = [
    __WEBPACK_IMPORTED_MODULE_30__global_directives___["a" /* LazyLoadDirective */]
];
var PIPES = [
    __WEBPACK_IMPORTED_MODULE_26__pipes_keys_keys__["a" /* KeysPipe */],
    __WEBPACK_IMPORTED_MODULE_27__pipes_point_replacer_point_replacer__["a" /* PointReplacerPipe */]
];
var PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
    __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
    __WEBPACK_IMPORTED_MODULE_14__ionic_native_network__["a" /* Network */],
    __WEBPACK_IMPORTED_MODULE_9__ionic_native_photo_viewer__["a" /* PhotoViewer */],
    __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */],
    __WEBPACK_IMPORTED_MODULE_23_angular2_jwt__["JwtHelper"],
    __WEBPACK_IMPORTED_MODULE_13__ionic_native_android_full_screen__["a" /* AndroidFullScreen */],
    __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__["b" /* GoogleMaps */],
    __WEBPACK_IMPORTED_MODULE_16__ionic_native_keyboard__["a" /* Keyboard */],
    __WEBPACK_IMPORTED_MODULE_22__global_services__["a" /* ImgcacheService */],
    __WEBPACK_IMPORTED_MODULE_17__ionic_native_app_version__["a" /* AppVersion */],
    __WEBPACK_IMPORTED_MODULE_18__ionic_native_contacts__["c" /* Contacts */],
    __WEBPACK_IMPORTED_MODULE_19__ionic_native_call_number__["a" /* CallNumber */],
    __WEBPACK_IMPORTED_MODULE_20__ionic_native_email_composer__["a" /* EmailComposer */],
    __WEBPACK_IMPORTED_MODULE_21__ionic_native_screen_orientation__["a" /* ScreenOrientation */]
];
var COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_24__components_accordion_list_accordion_list__["a" /* AccordionListComponent */],
    __WEBPACK_IMPORTED_MODULE_25__global_components___["a" /* LazyImgComponent */]
];
//# sourceMappingURL=app.imports.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cfg; });
var cfg = {
    apiUrl: 'http://basnakk.duckdns.org:5984',
    tokenName: 'token',
    indicadores: '/indicadores',
    user: {
        register: '/auth/signup',
        login: '/auth_login/_all_docs?limit=20&include_docs=true',
        refresh: '/auth_refresh/_all_docs?limit=20&include_docs=true',
        users: '/users',
        usersSocios: '/users_socios',
        usersProveedores: '/users_proveedores',
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

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_imports__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_truncate__ = __webpack_require__(826);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_moment__ = __webpack_require__(830);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SharedModule = (function () {
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
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]
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

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FerreteriasService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FerreteriasService = (function () {
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
        var url = this.cfg.apiUrl + this.cfg.ferreterias + '/_all_docs?limit=20&include_docs=true';
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

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UsersService = (function () {
    function UsersService(storage, authHttp) {
        this.storage = storage;
        this.authHttp = authHttp;
        this.cfg = __WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* cfg */];
    }
    UsersService.prototype.getAll = function (type) {
        return this.authHttp.get(this.cfg.apiUrl + this.cfg.user.users + '_' + type + '/_all_docs?include_docs=true')
            .toPromise()
            .then(function (rs) {
            return rs.json().rows;
        });
    };
    UsersService.prototype.getOne = function (id) {
        return this.authHttp.get(this.cfg.apiUrl + this.cfg.user.users + '_socios/' + id)
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

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoticiasService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NoticiasService = (function () {
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

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProveedoresService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProveedoresService = (function () {
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

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventosService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EventosService = (function () {
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

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InformercialService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_config__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var InformercialService = (function () {
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

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductosService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProductosService = (function () {
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

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(514);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getAuthHttp */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(852);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_cache__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_module__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_imports__ = __webpack_require__(225);
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
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_8__app_imports__["c" /* MODULES */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    backButtonText: '',
                    backButtonIcon: 'ios-arrow-back',
                    iconMode: 'md',
                    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    monthShortNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
                    dayShortNames: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                }, {
                    links: [
                        { loadChildren: '../pages/agenda/agenda.module#AgendaPageModule', name: 'AgendaPage', segment: 'agenda', priority: 'low', defaultHistory: [] },
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
                        { loadChildren: '../pages/profile-detalle/profile-detalle.module#ProfileDetallePageModule', name: 'ProfileDetallePage', segment: 'profile-detalle', priority: 'low', defaultHistory: [] },
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
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__app_imports__["e" /* PROVIDERS */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicErrorHandler */] },
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

/***/ 817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImgcacheService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_imgcache_js__ = __webpack_require__(818);
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
var ImgcacheService = (function () {
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
    ], ImgcacheService);
    return ImgcacheService;
}());

//# sourceMappingURL=cache-img.service.js.map

/***/ }),

/***/ 819:
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

var AccordionListComponent = (function () {
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
            selector: 'accordion-list',template:/*ion-inline-start:"/Users/grazia/Desktop/Basti/sociosMTS/src/components/accordion-list/accordion-list.html"*/`<ion-list class="accordion-list">\n    <ion-list-header no-lines no-padding [class.headerNoDesplegable]="desplegable==\'false\'" [class.conSubtitle]="subtitle" [class.conFecha]="fecha" [class.conValorIndicador]="valorIndicador">\n        <button ion-item detail-none [style.background]="headerColor" [style.color]="textColor" (click)="toggleAccordion()" class="accordion-header" [class.active]="expanded">\n            <span class="title">{{ title }}</span>\n            <span *ngIf="fecha" class="fecha">{{ fecha }}</span>\n            <span *ngIf="subtitle" class="subtitle">{{ subtitle }}</span>\n            <span *ngIf="valorIndicador" class="valorIndicador">{{ valorIndicador }} %</span>\n            <i item-right class="fa fa-chevron-down" aria-hidden="true"></i>\n            <i item-right class="fa fa-chevron-up" aria-hidden="true"></i>\n        </button>\n        <section #accordionContent [style.background]="contentColor" [class.active]="expanded" class="accordion-content">\n            <ng-content></ng-content>\n        </section>\n    </ion-list-header>\n    <div class="text-center" *ngIf="button">\n        <button margin-bottom class="btn-primary" margin-top center ion-button large (click)="toggleAccordionButton()">\n            <span *ngIf="primerTexto">Ocultar detalles</span>\n            <span *ngIf="segundoTexto">Mostrar detalles</span>\n        </button>\n    </div>\n    <div class="text-center" *ngIf="masMeses">\n        <button id="{{masMesesButton}}" margin-bottom class="btn-primary" margin-top center ion-button large>\n            <span *ngIf="primerTexto">Mostrar más meses</span>\n        </button>\n    </div>\n</ion-list>\n`/*ion-inline-end:"/Users/grazia/Desktop/Basti/sociosMTS/src/components/accordion-list/accordion-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], AccordionListComponent);
    return AccordionListComponent;
}());

//# sourceMappingURL=accordion-list.js.map

/***/ }),

/***/ 820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_img_lazy_img_component__ = __webpack_require__(821);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__lazy_img_lazy_img_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 821:
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
var LazyImgComponent = (function () {
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

/***/ 822:
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

var KeysPipe = (function () {
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

/***/ 823:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointReplacerPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PointReplacerPipe = (function () {
    function PointReplacerPipe() {
    }
    PointReplacerPipe.prototype.transform = function (value, args) {
        if (value) {
            return value.replace(',', '.');
        }
        return '';
    };
    PointReplacerPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'pointReplacer'
        })
    ], PointReplacerPipe);
    return PointReplacerPipe;
}());

//# sourceMappingURL=point-replacer.js.map

/***/ }),

/***/ 824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_load_directive__ = __webpack_require__(825);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__lazy_load_directive__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LazyLoadDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services___ = __webpack_require__(138);
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
var LazyLoadDirective = (function () {
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

/***/ 832:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 327,
	"./af.js": 327,
	"./ar": 328,
	"./ar-dz": 329,
	"./ar-dz.js": 329,
	"./ar-kw": 330,
	"./ar-kw.js": 330,
	"./ar-ly": 331,
	"./ar-ly.js": 331,
	"./ar-ma": 332,
	"./ar-ma.js": 332,
	"./ar-sa": 333,
	"./ar-sa.js": 333,
	"./ar-tn": 334,
	"./ar-tn.js": 334,
	"./ar.js": 328,
	"./az": 335,
	"./az.js": 335,
	"./be": 336,
	"./be.js": 336,
	"./bg": 337,
	"./bg.js": 337,
	"./bm": 338,
	"./bm.js": 338,
	"./bn": 339,
	"./bn.js": 339,
	"./bo": 340,
	"./bo.js": 340,
	"./br": 341,
	"./br.js": 341,
	"./bs": 342,
	"./bs.js": 342,
	"./ca": 343,
	"./ca.js": 343,
	"./cs": 344,
	"./cs.js": 344,
	"./cv": 345,
	"./cv.js": 345,
	"./cy": 346,
	"./cy.js": 346,
	"./da": 347,
	"./da.js": 347,
	"./de": 348,
	"./de-at": 349,
	"./de-at.js": 349,
	"./de-ch": 350,
	"./de-ch.js": 350,
	"./de.js": 348,
	"./dv": 351,
	"./dv.js": 351,
	"./el": 352,
	"./el.js": 352,
	"./en-au": 353,
	"./en-au.js": 353,
	"./en-ca": 354,
	"./en-ca.js": 354,
	"./en-gb": 355,
	"./en-gb.js": 355,
	"./en-ie": 356,
	"./en-ie.js": 356,
	"./en-nz": 357,
	"./en-nz.js": 357,
	"./eo": 358,
	"./eo.js": 358,
	"./es": 359,
	"./es-do": 360,
	"./es-do.js": 360,
	"./es-us": 361,
	"./es-us.js": 361,
	"./es.js": 359,
	"./et": 362,
	"./et.js": 362,
	"./eu": 363,
	"./eu.js": 363,
	"./fa": 364,
	"./fa.js": 364,
	"./fi": 365,
	"./fi.js": 365,
	"./fo": 366,
	"./fo.js": 366,
	"./fr": 367,
	"./fr-ca": 368,
	"./fr-ca.js": 368,
	"./fr-ch": 369,
	"./fr-ch.js": 369,
	"./fr.js": 367,
	"./fy": 370,
	"./fy.js": 370,
	"./gd": 371,
	"./gd.js": 371,
	"./gl": 372,
	"./gl.js": 372,
	"./gom-latn": 373,
	"./gom-latn.js": 373,
	"./gu": 374,
	"./gu.js": 374,
	"./he": 375,
	"./he.js": 375,
	"./hi": 376,
	"./hi.js": 376,
	"./hr": 377,
	"./hr.js": 377,
	"./hu": 378,
	"./hu.js": 378,
	"./hy-am": 379,
	"./hy-am.js": 379,
	"./id": 380,
	"./id.js": 380,
	"./is": 381,
	"./is.js": 381,
	"./it": 382,
	"./it.js": 382,
	"./ja": 383,
	"./ja.js": 383,
	"./jv": 384,
	"./jv.js": 384,
	"./ka": 385,
	"./ka.js": 385,
	"./kk": 386,
	"./kk.js": 386,
	"./km": 387,
	"./km.js": 387,
	"./kn": 388,
	"./kn.js": 388,
	"./ko": 389,
	"./ko.js": 389,
	"./ky": 390,
	"./ky.js": 390,
	"./lb": 391,
	"./lb.js": 391,
	"./lo": 392,
	"./lo.js": 392,
	"./lt": 393,
	"./lt.js": 393,
	"./lv": 394,
	"./lv.js": 394,
	"./me": 395,
	"./me.js": 395,
	"./mi": 396,
	"./mi.js": 396,
	"./mk": 397,
	"./mk.js": 397,
	"./ml": 398,
	"./ml.js": 398,
	"./mr": 399,
	"./mr.js": 399,
	"./ms": 400,
	"./ms-my": 401,
	"./ms-my.js": 401,
	"./ms.js": 400,
	"./my": 402,
	"./my.js": 402,
	"./nb": 403,
	"./nb.js": 403,
	"./ne": 404,
	"./ne.js": 404,
	"./nl": 405,
	"./nl-be": 406,
	"./nl-be.js": 406,
	"./nl.js": 405,
	"./nn": 407,
	"./nn.js": 407,
	"./pa-in": 408,
	"./pa-in.js": 408,
	"./pl": 409,
	"./pl.js": 409,
	"./pt": 410,
	"./pt-br": 411,
	"./pt-br.js": 411,
	"./pt.js": 410,
	"./ro": 412,
	"./ro.js": 412,
	"./ru": 413,
	"./ru.js": 413,
	"./sd": 414,
	"./sd.js": 414,
	"./se": 415,
	"./se.js": 415,
	"./si": 416,
	"./si.js": 416,
	"./sk": 417,
	"./sk.js": 417,
	"./sl": 418,
	"./sl.js": 418,
	"./sq": 419,
	"./sq.js": 419,
	"./sr": 420,
	"./sr-cyrl": 421,
	"./sr-cyrl.js": 421,
	"./sr.js": 420,
	"./ss": 422,
	"./ss.js": 422,
	"./sv": 423,
	"./sv.js": 423,
	"./sw": 424,
	"./sw.js": 424,
	"./ta": 425,
	"./ta.js": 425,
	"./te": 426,
	"./te.js": 426,
	"./tet": 427,
	"./tet.js": 427,
	"./th": 428,
	"./th.js": 428,
	"./tl-ph": 429,
	"./tl-ph.js": 429,
	"./tlh": 430,
	"./tlh.js": 430,
	"./tr": 431,
	"./tr.js": 431,
	"./tzl": 432,
	"./tzl.js": 432,
	"./tzm": 433,
	"./tzm-latn": 434,
	"./tzm-latn.js": 434,
	"./tzm.js": 433,
	"./uk": 435,
	"./uk.js": 435,
	"./ur": 436,
	"./ur.js": 436,
	"./uz": 437,
	"./uz-latn": 438,
	"./uz-latn.js": 438,
	"./uz.js": 437,
	"./vi": 439,
	"./vi.js": 439,
	"./x-pseudo": 440,
	"./x-pseudo.js": 440,
	"./yo": 441,
	"./yo.js": 441,
	"./zh-cn": 442,
	"./zh-cn.js": 442,
	"./zh-hk": 443,
	"./zh-hk.js": 443,
	"./zh-tw": 444,
	"./zh-tw.js": 444
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
webpackContext.id = 832;

/***/ }),

/***/ 852:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_full_screen__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_cache__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__global_services__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_version__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, authService, androidFullScreen, screenOrientation, menuCtrl, imgcacheService, appVersion, cache) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.authService = authService;
        this.androidFullScreen = androidFullScreen;
        this.screenOrientation = screenOrientation;
        this.menuCtrl = menuCtrl;
        this.imgcacheService = imgcacheService;
        this.appVersion = appVersion;
        this.cache = cache;
        this.rootPage = 'PreloaderPage';
        this.versionApp = "1.0.1";
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
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.androidFullScreen.isImmersiveModeSupported().then(function () { return _this.androidFullScreen.immersiveMode(); }).catch(function (error) { return console.log(error); });
        this.platform.ready().then(function () {
            _this.cache.setDefaultTTL(60 * 60 * 12 * 7);
            _this.cache.setOfflineInvalidate(false);
            _this.imgcacheService.initImgCache().then(function () {
                _this.statusBar.hide();
                _this.statusBar.overlaysWebView(false);
                _this.splashScreen.hide();
                if (window.cordova) {
                    _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.PORTRAIT);
                }
                _this.authService.startupTokenRefresh();
                _this.authService.getIndicadoresEconomicos().then(function (indicadoresData) {
                    _this.indicadoresEco = indicadoresData;
                    _this.indicadoresEco_date = new Date();
                });
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
                //this.nav.popToRoot({animate:false});
                this.nav.push(page.component);
            }
        }
        if (page.method && page.method === 'logout') {
            this.authService.logout();
        }
    };
    MyApp.prototype.menuClosed = function () {
        __WEBPACK_IMPORTED_MODULE_10_jquery__("ion-header .bar-button-menutoggle[right] .navicon-button").removeClass("open");
    };
    MyApp.prototype.menuOpened = function () {
        __WEBPACK_IMPORTED_MODULE_10_jquery__("ion-header .bar-button-menutoggle[right] .navicon-button").addClass("open");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]) === "function" && _a || Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/grazia/Desktop/Basti/sociosMTS/src/app/app.html"*/`<ion-menu id="authenticated" [content]="contenido" side="right" type="overlay" persistent="true" (ionOpen)="menuOpened()" (ionClose)="menuClosed()" >\n    <ion-content class="has-footer">\n        <ion-list inset>\n            <button ion-item *ngFor="let page of pages" (click)="openPage(page)" [class.hidden]="page.invisible" detail-push>\n    			{{page.title}}\n    		</button>\n        </ion-list>\n        <ion-list class="indicadores" *ngIf="indicadoresEco" inset>\n            <ion-item>\n                <div class="title">Indicadores económicos</div>\n            </ion-item>\n            <ion-item class="indicador">\n                <span class="title">Valor Dólar</span>\n                <span class="valor">{{indicadoresEco.valor_USD}} {{indicadoresEco.currency_name}}</span>\n            </ion-item>\n            <ion-item class="indicador">\n                <span class="title">Valor UF</span>\n                <span class="valor">{{indicadoresEco.valor_UF | number: \'1.0\' | pointReplacer}}</span>\n            </ion-item>\n        </ion-list>\n        <ion-footer class="lastUpdate">\n            <div class="version">{{versionApp}}</div>\n            <div class="date">Última descarga de datos: {{indicadoresEco_date | date : "dd \' \' MMMM \' \' yyyy"}}</div>\n        </ion-footer>\n    </ion-content>\n</ion-menu>\n<ion-nav #contenido [root]="rootPage"></ion-nav>\n`/*ion-inline-end:"/Users/grazia/Desktop/Basti/sociosMTS/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__["a" /* AuthService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_full_screen__["a" /* AndroidFullScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_full_screen__["a" /* AndroidFullScreen */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__["a" /* ScreenOrientation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__["a" /* ScreenOrientation */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_8__global_services__["a" /* ImgcacheService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__global_services__["a" /* ImgcacheService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_version__["a" /* AppVersion */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_version__["a" /* AppVersion */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_7_ionic_cache__["b" /* CacheService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ionic_cache__["b" /* CacheService */]) === "function" && _l || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[509]);
//# sourceMappingURL=main.js.map