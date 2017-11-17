import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
       
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
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
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
        let errorToast = this.toastCtrl.create({
            message: 'Ha ocurrido un problema, intenta nuevamente.',
            duration: 4000,
            position: 'bottom',
            closeButtonText: "OK"
        });
        this.authService.login(this.loginData.value).then((data:any) => {
            if (data.Error) {
                let alert = this.alertCtrl.create({
                    title: data.Error,
                    message: 'Por favor, revisa los datos ingresados',
                    buttons: ['Aceptar']
                });
                alert.present();
            }
            else {
                this.redirectToHome()
            }
        }).catch((e) => {
            errorToast.present();
        });
    }
    redirectToHome() {
        this.navCtrl.setRoot('HomePage');
    }
    openPage(page: string) {
        this.navCtrl.push(page);
    }
}
