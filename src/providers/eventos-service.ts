import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import *  as AppConfig from '../app/config';
import { CacheService } from "ionic-cache";
import { InvitadosModel } from '../models/invitados.model';

@Injectable()
export class EventosService {
    private cfg: any;
    constructor(
        private authHttp: AuthHttp,
        private cache: CacheService) {
        this.cfg = AppConfig.cfg;
    }
    getLast() {
        let url = this.cfg.apiUrl + this.cfg.eventos + '/_all_docs?descending=true&limit=1&include_docs=true';
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
    getRows() {
        let url = this.cfg.apiUrl + this.cfg.eventos + '/_all_docs?include_docs=true';
        return new Promise(resolve => {
            this.authHttp.get(url).toPromise().then(rs => {
                let result = rs.json().total_rows;
                resolve(result);
            });
        });
    }
    getAll(offset, limit) {
        let url = this.cfg.apiUrl + this.cfg.eventos + '/_all_docs?limit='+limit+'&skip='+offset+'&include_docs=true';
        return new Promise(resolve => {
            this.authHttp.get(url).toPromise().then(rs => {
                let result = rs.json().rows;
                resolve(result);
            });
        });
    }
    getOne(id: string) {
        let url = this.cfg.apiUrl + this.cfg.eventos + '/' + id;
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
    inscribirse(eventoID, tipo, respuestas) {
        let datauser = {};
        let datauser2 = "evento_id=" + eventoID + "&tipo=" + tipo + respuestas;
        console.log(datauser2);
        return new Promise(resolve => {
            this.authHttp.post(this.cfg.apiUrl + this.cfg.eventos + '_participar/_all_docs?include_docs=true', datauser2).subscribe(data => {
                if (data) {
                    let result = data.json().rows[0];
                    resolve(result);
                }
                else {
                    resolve(false);
                }
            }, function errorCallback(response) {
                resolve(false);
            });
        });
    }
    invitarEvento(eventoID, tipo, datosInvitado, respuestas) {
        let datauser = {};
        let datauser2 = datosInvitado + "&evento_id=" + eventoID + "&tipo=" + tipo + respuestas;
        console.log(datauser2);
        return new Promise(resolve => {
                this.authHttp.post(this.cfg.apiUrl + this.cfg.eventos + '_invitar/_all_docs?include_docs=true', datauser2).subscribe(data => {
                if (data) {
                    let result = data.json().rows[0];
                    resolve(result);
                }
                else {
                    resolve(false);
                }
            }, function errorCallback(response) {
                resolve(false);
            });
        });
    }
}
