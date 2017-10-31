import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../providers/auth-service';

@IonicPage()
@Component({
    selector: 'page-login-page',
    templateUrl: 'login-page.html',
})
export class LoginPage {
    private loginData: FormGroup;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public storage: Storage,
        public formBuilder: FormBuilder,
        public authService: AuthService) {
        this.loginData = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        });
    }
    ionViewDidLoad() {
        this.menuCtrl.enable(false);
    }
    login() {
        this.authService.login(this.loginData.value).then(() => {
            this.menuCtrl.enable(true);
            this.redirectToHome()
        }).catch(e => console.log("login error", e));
    }
    redirectToHome() {
        this.navCtrl.setRoot('HomePage');
    }
    openPage(page: string) {
        this.navCtrl.push(page);
    }
}
