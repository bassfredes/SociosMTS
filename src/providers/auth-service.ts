import {App} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import {UserModel} from '../models/user.model';
import {CredentialsModel} from '../models/credentials.model';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';

import {ConnectivityService} from './connectivity-service';
import {CacheService} from "ionic-cache";

import *  as AppConfig from '../app/config';

@Injectable()
export class AuthService {
    private cfg: any;
    idToken: string;
    refreshSubscription: any;
    constructor(
        private storage: Storage,
        private http: Http,
        private jwtHelper: JwtHelper,
        private authHttp: AuthHttp,
        private app: App,
        private connectivityService: ConnectivityService,
        private cache: CacheService) {
        this.cfg = AppConfig.cfg;
        this.storage.get('id_token').then(token => {
            this.idToken = token;
        });
        this.decodeJwt();
    }
    login(credentials: CredentialsModel) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
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
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
            this.authHttp.get(this.cfg.apiUrl + this.cfg.user.login+'/'+credentials.email+'/'+credentials.password).subscribe(data => {
                if (data) {
                    this.saveData_produccion(data);
                    let rs = data.json();
                    this.idToken = rs.token;
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
        //console.log(verify);
    }
    saveData(data: any) {
        let rs = data.json();
        let documentConfig = rs.rows[0].doc;
        this.storage.set("user", documentConfig.user_id);
        this.storage.set("id_token", documentConfig.token);
    }
    saveData_produccion(data: any) {
        let rs = data.json();
        this.storage.set("user", rs.user_id);
        this.storage.set("id_token", rs.token);
    }
    logout() {
        // stop function of auto refesh
        this.unscheduleRefresh();
        this.cache.clearAll();
        this.storage.remove('user');
        this.storage.remove('id_token');
        this.storage.remove('id_ferreteria');
    }
    isValid() {
        return tokenNotExpired();
    }
    public getNewJwt() {
        // Get a new JWT from Auth0 using the refresh token saved
        // in local storage
        this.storage.get("id_token").then((thetoken) => {
            let senddata: { Token: string } = {
                Token: thetoken
            };
            this.authHttp.get(this.cfg.apiUrl + this.cfg.user.refresh + "&Token=" + thetoken)
                .map(res => res.json())
                .subscribe(res => {
                    let documentConfig = res.rows[0].doc;
                    // If the API returned a successful response, mark the user as logged in
                    if (documentConfig.success == true) {
                        this.storage.set("id_token", documentConfig.token);
                        this.refreshSubscription.unsubscribe();
                        console.log("Token set");
                    } else {
                        console.log("The Token Black Listed");
                        this.logout();
                    }
                }, err => {
                    console.error('ERROR', err);
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
                jwtExp = new Date(Date.UTC(2017, 11, 1, 0, 0, 0));
                let iat = new Date(0);
                let exp = new Date(0);
                let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
                console.log("will start refresh after :", (delay / 1000) / 60);
                if (delay - 1000 <= 0)
                    delay = 1;
                return Observable.interval(delay);
            });
        this.refreshSubscription = source.subscribe(() => {
            console.log("peticion");
            if (this.connectivityService.isOffline()) {
                console.log("Offline");
                this.refreshSubscription.unsubscribe();
                this.storage.set("id_token", "offline");
            }
            else {
                this.getNewJwt();
            }
        });
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
                    this.scheduleRefresh();
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
