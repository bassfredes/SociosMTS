import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {
    mapElement: HTMLElement;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        private googleMaps: GoogleMaps) {
    }
    ionViewDidLoad() {
        this.menuCtrl.enable(false);
        this.loadMap();
    }
    goToHome() {
        this.navCtrl.push("LoginPage");
    }
    loadMap() {
        let element: HTMLElement = document.getElementById('mapa');
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        };
        let map = new GoogleMap(this.mapElement, mapOptions);
        map.one(GoogleMapsEvent.MAP_READY).then(() => {
            console.log('Map is ready!');
        });
    }
}
