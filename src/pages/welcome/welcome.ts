import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, HtmlInfoWindow, GoogleMapsEvent, GoogleMapOptions, LatLng, CameraPosition } from '@ionic-native/google-maps';
import { AuthHttp } from 'angular2-jwt';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {
    statusOnline: boolean = true;
    map: GoogleMap;
    mapElement: HTMLElement;
    latUser: any;
    lngUser: any;
    constructor(
        public plt: Platform,
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public toastCtrl: ToastController,
        private authHttp: AuthHttp,
        public connectivityService: ConnectivityService,
        public loading: LoadingController,
        public geolocation: Geolocation) {
    }
    ionViewDidLoad() {
        this.menuCtrl.enable(false);
        this.evalConnection();
    }
    goToHome() {
        this.navCtrl.push("LoginPage");
    }
    evalConnection() {
        let errorToast = this.toastCtrl.create({
            message: 'Ha ocurrido un problema, intenta nuevamente.',
            duration: 4000,
            position: 'bottom',
            closeButtonText: "OK"
        });
        let loader = this.loading.create({
            content: "Cargando Ubicación..."
        });
        loader.present();
        if (this.connectivityService.isOnline()) {
            this.geolocation.getCurrentPosition().then((resp) => {
                this.latUser = resp.coords.latitude;
                this.lngUser = resp.coords.longitude;
                this.authHttp.get('http://2018.mts.cl/serviciosweb/' + resp.coords.latitude + '/' + resp.coords.longitude).toPromise().then(result => {
                    var rs = result.json();
                    if (rs.success) {
                        loader.dismiss().catch(() => { });
                        this.loadMap(rs);
                    }
                }).catch((e) => {
                    loader.dismiss().catch(() => { });
                    errorToast.present();
                });
            }).catch((e) => {
                this.authHttp.get('http://2018.mts.cl/serviciosweb/-33.4369248/-70.6345017').toPromise().then(result => {
                    var rs = result.json();
                    if (rs.success) {
                        loader.dismiss().catch(() => { });
                        this.loadMap(rs);
                    }
                }).catch((e) => {
                    loader.dismiss().catch(() => { });
                    errorToast.present();
                });
            });
            
        }
        if (this.connectivityService.isOffline()) {
            errorToast.present();
        }
    }
    loadMap(resultVar: any) {
        let rslat = resultVar.lat;
        let rslng = resultVar.lng;

        let rsferreteria = resultVar.ferreteria;
        let rslogo = resultVar.logo;
        let rsurlFerreteria = resultVar.urlFerreteria;
        let rsdireccion = resultVar.direccion;

        let rsisOpen = resultVar.isOpen;

        let rsatiendeFinde = resultVar.atiendeFinde;
        let rshorarioApertura = resultVar.horarioApertura.substring(0, 5);
        let rshorarioCierre = resultVar.horarioCierre.substring(0, 5);
        let rshorarioAperturaFinde = resultVar.horarioAperturaFinde.substring(0, 5);
        let rshorarioCierreFinde = resultVar.horarioCierreFinde.substring(0, 5);
        
        var mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: rslat,
                    lng: rslng
                },
                zoom: 13
            }
        };
        let loader = this.loading.create({
            content: "Cargando Mapa..."
        });
        loader.present();
        this.mapElement = document.getElementById('mapa');
        this.map = GoogleMaps.create(this.mapElement, mapOptions);
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            loader.dismiss().catch(() => { });
            var content = '<div class="containerFerreteriaMapa">';
            content += '<div class="nombreFerreteria">' + rsferreteria + '</div>';
            content += '<div class="logoFerreteria"><img src="' + rslogo +'" class="img-responsive"></div>';
            content += '<div class="clearfix"></div>';
            if (rsisOpen) {
                content += "<p class='openHourFerreteria ferr_abierta'>Abierto</p>";
            }
            else {
                content += "<p class='openHourFerreteria ferr_cerrada'>Cerrado</p>";
            }
            content += '<div class="clearfix"></div>';
            content += '<p class="direccionFerreteria">' + rsdireccion + '</p>';
            content += '<p class="horariosDisponiblesFerreteria">Lunes a Viernes: ' + rshorarioApertura + ' a ' + rshorarioCierre + ' Hrs.';
            if (rsatiendeFinde) {
                content += "<br />Sábado y Domingo: " + rshorarioAperturaFinde + " a " + rshorarioCierreFinde + " Hrs.";
            }
            content += '</p>';
            if (this.plt.is('ios')) {
                content += '<div class="comoLlegarFerreteria pull-left"><a href="http://maps.apple.com/?saddr=' + this.latUser + ',' + this.lngUser + '&daddr=' + rslat + ',' + rslng + '(' + rsferreteria +')" target="_system">Cómo llegar</a></div>';
            }
            else {
                content += '<div class="comoLlegarFerreteria pull-left"><a href="geo:0,0?q=' + rslat + ',' + rslng +'('+ rsferreteria +')" target="_system">Cómo llegar</a></div>';
            }
            content += '<div class="urlFerreteria pull-right"><a class="urlFerreteria" href="' + rsurlFerreteria + '">Ir a la ficha</a></div>';
            content += '<div class="clearfix"></div>';
            content += '</div>';
            var htmlInfoWindow = new HtmlInfoWindow();
            htmlInfoWindow.setContent(content);
            
            this.map.addMarker({
                icon: 'assets/images/pinMapMTS.png',
                animation: 'DROP',
                position: {
                    lat: rslat,
                    lng: rslng
                }
            }).then(marker => {
                marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                    htmlInfoWindow.open(marker);
                    var newrslat;
                    if (this.plt.is('ios')) {
                        newrslat = (rslat * 1 + 0.011);
                    }
                    else {
                        newrslat = (rslat * 1 + 0.007);
                    }
                    
                    let cameraPos: CameraPosition<any> = {
                        target: new LatLng(newrslat, rslng),
                        zoom: 13
                    }
                    this.map.moveCamera(cameraPos);
                });
            });
        });
    }
}
