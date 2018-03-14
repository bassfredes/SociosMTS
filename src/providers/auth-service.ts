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
        let errorToast = this.toastCtrl.create({
            message: 'Ha ocurrido un problema, intenta nuevamente.',
            duration: 4000,
            position: 'bottom',
            closeButtonText: "OK"
        });
    }
    login(credentials: CredentialsModel) {
        return new Promise(resolve => {
            this.authHttp.post(this.cfg.apiUrl + this.cfg.user.login, 'user=' + credentials.user + '&pass=' + credentials.pass).subscribe(data => {
                if (data) {
                    this.saveData(data);
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
        return new Promise(resolve => {
            let url = this.cfg.apiUrl + this.cfg.indicadores;
            let cacheKey = url;
            this.storage.get("id_token").then((thetoken) => {
                let tokenPost;
                if (thetoken != null){
                    tokenPost = 'token=' + thetoken;
                }
                else {
                    tokenPost = '';
                }
                this.cache.getItem(cacheKey).catch(() => {
                    return this.authHttp.post(url, tokenPost).toPromise().then(rs => {
                        let result = rs.json();
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
        });
    }
    saveData(data: any) {
        let rs = data.json();
        this.storage.set("user", rs.user_id);
        this.storage.set("id_token", rs.token);
        this.storage.set("user_type", rs.type);
    }
    logout() {
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
        this.storage.get("id_token").then((thetoken) => {
            let senddata = "token=" + thetoken;
            var url = this.cfg.apiUrl + this.cfg.user.refresh;
            let cacheKey = url;
            return new Promise(resolve => {
                this.cache.getItem(cacheKey).catch(() => {
                    return this.authHttp.post(url, senddata).subscribe(rs => {
                        let result = rs.json();
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
        let source = Observable.of(this.idToken).flatMap(
            token => {
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
        this.storage.get("id_token").then((thetoken) => {
            if (thetoken) {
                this.idToken = thetoken;
                let source = Observable.of(thetoken).flatMap(
                    token => {
                        let now: number = new Date().valueOf();
                        let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
                        let exp: Date = new Date(0);
                        exp.setUTCSeconds(jwtExp);
                        let delay: number = exp.valueOf() - now;

                        if (delay <= 0) {
                            delay = 1;
                        }
                        return Observable.timer(delay);
                    });
                source.subscribe(() => {
                    this.getNewJwt();
                    //this.scheduleRefresh();
                });
            } else {
                this.logout();
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
