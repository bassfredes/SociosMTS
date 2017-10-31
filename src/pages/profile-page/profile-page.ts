import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import {ProtectedPage} from '../protected-page/protected-page';
import {Storage} from '@ionic/storage';
import {UserModel} from '../../models/user.model';

@IonicPage()
@Component({
    selector: 'page-profile-page',
    templateUrl: 'profile-page.html',
})
export class ProfilePage extends ProtectedPage {

    public user: UserModel;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public appCtrl: App) {
        super(navCtrl, navParams, storage, appCtrl);

        this.storage.get('user').then(user => {
            this.user = user;
        });

    }

    ionViewDidLoad() {
        this.menuCtrl.enable(true);
    }

}
