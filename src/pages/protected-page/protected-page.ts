import {NavController, NavParams,App} from 'ionic-angular';
import {Storage} from '@ionic/storage';

export class ProtectedPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public storage: Storage,
        public appCtrl: App) {
    }
    ionViewCanEnter() {
        return new Promise((resolve, reject) => {
            this.storage.get('id_token').then(id_token => {
                if (id_token === null) {
                    this.appCtrl.getRootNav().setRoot('WelcomePage');
                }
            });
            resolve();
        });
    }
}
