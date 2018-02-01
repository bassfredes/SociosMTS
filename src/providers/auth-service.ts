import { App, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';

import { CredentialsModel } from '../models/credentials.model';
import { ConnectivityService } from './connectivity-service';
import { CacheService } from "ionic-cache";

import *  as AppConfig from '../app/config';
@Injectable()
export class AuthService {
    private cfg: any;
    idToken: string;
    refreshSubscription: any;
    constructor(
        private storage: Storage,
        private jwtHelper: JwtHelper,
        private authHttp: AuthHttp,
        private app: App,
        public toastCtrl: ToastController,
        private connectivityService: ConnectivityService,
        private cache: CacheService) {
        this.cfg = AppConfig.cfg;
        this.storage.get('id_token').then(token => {
            this.idToken = token;
        });
        this.decodeJwt();

        let errorToast = this.toastCtrl.create({
            message: 'Ha ocurrido un problema, intenta nuevamente.',
            duration: 4000,
            position: 'bottom',
            closeButtonText: "OK"
        });
    }
    login(credentials: CredentialsModel) {
        return new Promise(resolve => {
            this.authHttp.post(this.cfg.apiUrl + this.cfg.user.login, credentials).subscribe(data => {
                if (data) {
                    this.saveData(data);
                    let rs = data.json();
                    this.idToken = rs.rows[0].doc.token;
                    this.scheduleRefresh();
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, function errorCallback(response) {
                resolve(false);
            });
        });
    }
    login_produccion(credentials: CredentialsModel) {
        return new Promise(resolve => {
            this.authHttp.post(this.cfg.apiUrl + this.cfg.user.login, 'user=' + credentials.user + '&pass=' + credentials.pass).subscribe(data => {
                if (data) {
                    this.saveData_produccion(data);
                    let rs = data.json();
                    this.idToken = rs.token;
                    this.scheduleRefresh();
                    resolve(rs);
                }
            }, function errorCallback(response) {
                resolve(response);
            });
        });
    }
    getIndicadoresEconomicos() {
        /*
        return new Promise(resolve => {
            resolve();
        });
        */
        let url = this.cfg.apiUrl + this.cfg.indicadores + '/_all_docs?include_docs=true';
        let cacheKey = url;

        return new Promise(resolve => {
            this.cache.getItem(cacheKey).catch(() => {
                return this.authHttp.get(url).toPromise().then(rs => {
                    let result = rs.json().rows[0].doc;
                    return this.cache.saveItem(cacheKey, result);
                });
            }).then((data) => {
                if (typeof (data) !== 'undefined' && data.value) {
                    resolve(JSON.parse(data.value));
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    decodeJwt() {
        let header = {
            "alg": "HS256",
            "typ": "JWT"
        }; // eyAiYWxnIjogIkhTMjU2IiwgInR5cCI6ICJKV1QiIH0=
        let payload = {
            "user": "bastian.f@mitocondria.cl",
            "password": "123456"
        }; // eyAidXNlciI6ICJiYXN0aWFuLmZAbWl0b2NvbmRyaWEuY2wiLCAicGFzc3dvcmQiOiAiMTIzNDU2IiB9
        /*let verify = HMACSHA256(
            base64UrlEncode(header) + "." +
            base64UrlEncode(payload),
            "SociosMTS"
        )*/ // lNAOVJV02JtBbgPqeiIogvB01OKyzq4EY5arpr-0UoA
    }
    saveData(data: any) {
        let rs = data.json();
        let documentConfig = rs.rows[0].doc;
        this.storage.set("user", documentConfig.user_id);
        this.storage.set("id_token", documentConfig.token);
        this.storage.set("user_type", documentConfig.type);
    }
    saveData_produccion(data: any) {
        let rs = data.json();
        this.storage.set("user", rs.user_id);
        this.storage.set("id_token", rs.token);
        this.storage.set("user_type", rs.type);
    }
    logout() {
        // stop function of auto refesh
        //this.unscheduleRefresh();
        this.cache.clearAll();
        this.storage.remove('user');
        this.storage.remove('id_token');
        this.storage.remove('id_ferreteria');
        this.storage.remove('user_type');
    }
    isValid() {
        return tokenNotExpired();
    }
    public getNewJwt() {
        // Get a new JWT from Auth0 using the refresh token saved
        // in local storage
        this.storage.get("id_token").then((thetoken) => {
            //let senddata = 'token=' + thetoken;
            let senddata = {
                token: thetoken
            };
            var url = this.cfg.apiUrl + this.cfg.user.refresh;
            let cacheKey = url;

            return new Promise(resolve => {
                this.cache.getItem(cacheKey).catch(() => {
                    return this.authHttp.post(url, senddata).subscribe(rs => {
                        // let result = rs.json();
                        let result = rs.json().rows[0].doc;
                        if (result.success == true) {
                            this.storage.set("id_token", result.token);
                            return this.cache.saveItem(cacheKey, result);
                            /*this.refreshSubscription.unsubscribe();*/
                        } else {
                            this.logout();
                        }
                    });
                }).then((data) => {
                    if (typeof (data) !== 'undefined' && data.value) {
                        resolve(JSON.parse(data.value));
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    public scheduleRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        let source = Observable.of(this.idToken).flatMap(
            token => {
                // The delay to generate in this case is the difference
                // between the expiry time and the issued at time
                let jwtIat = this.jwtHelper.decodeToken(token).iat;
                const now = new Date;
                jwtIat = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
                let jwtExp = this.jwtHelper.decodeToken(token).exp;
                jwtExp = new Date(Date.UTC(2018, 11, 1, 0, 0, 0));
                console.log(jwtExp);
                let iat = new Date(0);
                let exp = new Date(0);
                let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
                console.log("will start refresh after :", (delay / 1000) / 60);
                if (delay - 1000 <= 0)
                    delay = 1;
                return Observable.interval(delay);
            });
        this.getNewJwt();
        /*
    this.refreshSubscription = source.subscribe(() => {
        console.log("peticion");
        this.getNewJwt();
    });
    */
    }
    public startupTokenRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        this.storage.get("id_token").then((thetoken) => {
            if (thetoken) {
                this.idToken = thetoken;
                let source = Observable.of(thetoken).flatMap(
                    token => {
                        // Get the expiry time to generate
                        // a delay in milliseconds
                        let now: number = new Date().valueOf();
                        let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
                        let exp: Date = new Date(0);
                        exp.setUTCSeconds(jwtExp);
                        let delay: number = exp.valueOf() - now;

                        if (delay <= 0) {
                            delay = 1;
                        }
                        // Use the delay in a timer to
                        // run the refresh at the proper time
                        return Observable.timer(delay);
                    });
                // Once the delay time from above is
                // reached, get a new JWT and schedule
                // additional refreshes
                source.subscribe(() => {
                    this.getNewJwt();
                    //this.scheduleRefresh();
                });
            } else {
                //there is no user logined
                console.info("there is no user logined ");
            }
        });
    }
    public unscheduleRefresh() {
        // Unsubscribe fromt the refresh
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
}
