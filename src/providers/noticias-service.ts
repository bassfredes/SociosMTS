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
        let url = this.cfg.apiUrlWp + this.cfg.noticias + '?categories=1&_embed&per_page=1&order=desc&status=publish';
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
    getAttachment(noticiaSchema){
        if (noticiaSchema.length && noticiaSchema.length > 0) {
            let featuredMedia = noticiaSchema[0].featured_media;
            let url = this.cfg.apiUrlWp + this.cfg.media + '/' + featuredMedia;
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
        else {
            return new Promise(resolve => {
                resolve(false);
            });
        }
    }
    getRows() {
        let url = this.cfg.apiUrlWp + this.cfg.noticias + '?categories=1&order=desc&status=publish';
        let cacheKey = url;

        return new Promise(resolve => {
            this.cache.getItem(cacheKey).catch(() => {
                return this.authHttp.get(url).toPromise().then(rs => {
                    let result = rs.headers.get('X-WP-Total');
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
    getAll(offset, limit) {
        let url;
        if (limit) {
            url = this.cfg.apiUrlWp + this.cfg.noticias + '?categories=1&_embed&per_page=' + limit + '&offset=' + offset + '&order=desc&status=publish';
        }
        else {
            url = this.cfg.apiUrlWp + this.cfg.noticias + '?categories=1&_embed&order=desc&status=publish';
        }
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
        let url = this.cfg.apiUrlWp + this.cfg.noticias + '/' + id;
        console.log(url);
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
