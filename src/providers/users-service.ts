import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import *  as AppConfig from '../app/config';
import { CacheService } from "ionic-cache";
        
@Injectable()
export class UsersService {
    private cfg: any;
    constructor(
        private authHttp: AuthHttp,
        private cache: CacheService) {
        this.cfg = AppConfig.cfg;
    }
    getAll(type: string) {
        let url = this.cfg.apiUrl + this.cfg.user.users + '_' + type + '/_all_docs?include_docs=true';
        let cacheKey = url;
        return new Promise(resolve => {
            this.cache.getItem(cacheKey).catch(() => {
                return this.authHttp.get(url).toPromise().then(rs => {
                    let result = rs.json().rows;
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
    getOne(id: string) {
        let url = this.cfg.apiUrl + this.cfg.user.users + '_socios/' + id;
        let cacheKey = url;
        return new Promise(resolve => {
            this.cache.getItem(cacheKey).catch(() => {
                return this.authHttp.get(url).toPromise().then(rs => {
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
    }
}
