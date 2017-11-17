import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import *  as AppConfig from '../app/config';
import { CacheService } from "ionic-cache";

@Injectable()
export class NoticiasService {
    private cfg: any;
    constructor(
        private authHttp: AuthHttp,
        private cache: CacheService) {
        this.cfg = AppConfig.cfg;
    }
    getLast() {
        let url = this.cfg.apiUrl + this.cfg.noticias + '/_all_docs?descending=true&limit=1&include_docs=true';
        let cacheKey = url;

        return new Promise(resolve => {
            this.cache.getItem(cacheKey).catch(() => {
                return this.authHttp.get(url).toPromise().then(rs => {
                    let result = rs.json().rows[0].doc;
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
    getRows() {
        let url = this.cfg.apiUrl + this.cfg.noticias + '/_all_docs?include_docs=true';
        let cacheKey = url;

        return new Promise(resolve => {
            this.cache.getItem(cacheKey).catch(() => {
                return this.authHttp.get(url).toPromise().then(rs => {
                    let result = rs.json().total_rows;
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
    getAll(offset, limit) {
        let url = this.cfg.apiUrl + this.cfg.noticias + '/_all_docs?limit='+limit+'&skip='+offset+'&include_docs=true';
        let cacheKey = url;

        return new Promise(resolve => {
            this.cache.getItem(cacheKey).catch(() => {
                return this.authHttp.get(url).toPromise().then(rs => {
                    let result = rs.json().rows;
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
        let url = this.cfg.apiUrl + this.cfg.noticias + '/' + id;
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
