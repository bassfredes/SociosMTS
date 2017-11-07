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
    getAll(type: string) {
        return this.authHttp.get(this.cfg.apiUrl + this.cfg.user.users + '_'+ type +'/_all_docs?include_docs=true')
            .toPromise()
            .then(rs => {
                return rs.json().rows;
            });
    }
    getOne(id: string) {
        return this.authHttp.get(this.cfg.apiUrl + this.cfg.user.users + '_socios/' + id)
            .toPromise()
            .then(rs => {
                return rs.json();
            });
    }
}
