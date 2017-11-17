import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import *  as AppConfig from '../app/config';
import { CacheService } from "ionic-cache";

@Injectable()
export class FerreteriasService {
    private cfg: any;
    constructor(
        private storage: Storage,
        private authHttp: AuthHttp,
        private cache: CacheService) {
        this.cfg = AppConfig.cfg;
    }
    saveFerreteria(idFerreteria: string) {
        let _id = idFerreteria;
        this.storage.set("id_ferreteria", _id);
    }
    getAll() {
        let url = this.cfg.apiUrl + this.cfg.ferreterias + '/_all_docs?limit=20&include_docs=true';
        let cacheKey = url;
        return new Promise(resolve => {
            this.cache.getItem(cacheKey).catch(() => {
                return this.authHttp.get(url).toPromise().then(rs => {
                    let result = rs.json();
                    return this.cache.saveItem(cacheKey, result);
                });
            }).then((data) => {
                if(data.value){
                    resolve(JSON.parse(data.value));
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    getOne(id: string) {
        let url = this.cfg.apiUrl + this.cfg.ferreterias + '/' + id;
        let cacheKey = url;
        return new Promise(resolve => {
            this.cache.getItem(cacheKey).catch(() => {
                return this.authHttp.get(url).toPromise().then(rs => {
                    let result = rs.json();
                    return this.cache.saveItem(cacheKey, result);
                });
            }).then((data) => {
                if(data.value){
                    resolve(JSON.parse(data.value));
                }
                else {
                    resolve(data);
                }
            });
        });
    }
}
