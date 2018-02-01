import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import *  as AppConfig from '../app/config';
import { CacheService } from "ionic-cache";

@Injectable()
export class ProveedoresService {
    private cfg: any;

    constructor(
        private storage: Storage,
        private authHttp: AuthHttp,
        private cache: CacheService) {
        this.cfg = AppConfig.cfg;
    }
    saveProveedorVisto(idProveedor: string) {
        let _id = idProveedor;
        this.storage.get("proveedores_revisados").then((proveedoresSaved) => {
            if (proveedoresSaved){
                let existeKey = false;
                let numeroKey = proveedoresSaved.length;
                let proveedoresGuardados = proveedoresSaved;
                for (var i = numeroKey; i--;) {
                    if (proveedoresGuardados[i] === _id){
                        proveedoresGuardados.splice(i,1);
                    }
                }
                proveedoresGuardados.unshift(_id);
                this.storage.set("proveedores_revisados", proveedoresGuardados);
            }
            else {
                let varToSave = new Array(_id);
                this.storage.set("proveedores_revisados", varToSave);
            }
        });
    }
    getAll(id: string) {
        let url = this.cfg.apiUrl + this.cfg.proveedores + '/_all_docs?include_docs=true';
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
    getOneWithDocs(id: string) {
        let url = this.cfg.apiUrl + this.cfg.proveedores + '/_all_docs?include_docs=true&keys=["' + id + '"]';
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
    getOne(id: string) {
        let url = this.cfg.apiUrl + this.cfg.proveedores + '/' + id;
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
