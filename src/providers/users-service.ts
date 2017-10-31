import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import *  as AppConfig from '../app/config';

@Injectable()
export class UsersService {
    private cfg: any;
    constructor(
        private storage: Storage,
        private authHttp: AuthHttp) {
        this.cfg = AppConfig.cfg;
    }
    getAll() {
        return this.authHttp.get(this.cfg.apiUrl + this.cfg.proveedores + '/_all_docs?include_docs=true')
            .toPromise()
            .then(rs => {
                return rs.json();
            });
    }
    getOne(id: string) {
        return this.authHttp.get(this.cfg.apiUrl + this.cfg.proveedores + '/' + id)
            .toPromise()
            .then(rs => {
                return rs.json();
            });
    }
}
