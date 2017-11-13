import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, HtmlInfoWindow, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {
    map: GoogleMap;
    mapElement: HTMLElement;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController) {
    }
    ionViewDidLoad() {
        this.menuCtrl.enable(false);
        this.loadMap();
    }
    goToHome() {
        this.navCtrl.push("LoginPage");
    }
    loadMap() {
        var mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: -33.44662,
                    lng: -70.630674
                },
                zoom: 13,
                tilt: 30
            }
        };
        this.mapElement = document.getElementById('mapa');
        this.map = GoogleMaps.create(this.mapElement, mapOptions);
        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            console.log('Map is ready!');
            // Now you can use all methods safely.
            var content = "<div class='nombreFerreteria'>Nombre Ferreteria</div>";
            var htmlInfoWindow = new HtmlInfoWindow();
            htmlInfoWindow.setContent(content);

            this.map.addMarker({
                icon: 'assets/images/pinMapMTS.png',
                animation: 'DROP',
                position: {
                    lat: -33.44662,
                    lng: -70.630674
                }
            }).then(marker => {
                marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                    console.log(marker);
                    htmlInfoWindow.open(marker);

                    /*
                    var content = "<div class='containerFerreteriaMapa'>";
					content += "<div class='nombreFerreteria'>" + locations[i][0] + "</div>";
					content += "<div class='logoFerreteria'><img src='" + locations[i][1] + "' class='img-responsive' /></div>";
					content += "<div class='clearfix'></div>";
					if(locations[i][11]==1){
						content += "<p class='openHourFerreteria ferr_abierta'>Abierto</p>";
					}
					else {
						content += "<p class='openHourFerreteria ferr_cerrada'>Cerrado</p>";
					}
					content += "<div class='clearfix'></div>";
					content += "<p class='direccionFerreteria'>" + locations[i][3] + "</p>";
					content += "<p class='horariosDisponiblesFerreteria'>Lunes a Viernes: " + locations[i][6] + " a " + locations[i][7] + " Hrs.";
					if(locations[i][8]=="si"){
						content += "<br /> Sábado y Domingo: " + locations[i][9] + " a " + locations[i][10] + " Hrs.</p>";
					}
					if(disabledPosition){
						//content += "<div class='urlFerreteria'><a href='" + locations[i][2] + "'>Ir a la ficha</a></div>";
						content += "<div id='comoLlegarFerreteria_"+ i +"' class='comoLlegarFerreteria pull-left'>Cómo llegar</div>";
						content += "<div class='urlFerreteria pull-right'><a href='" + locations[i][2] + "'>Ir a la ficha</a></div>";
					}
					else {
						content += "<div id='comoLlegarFerreteria_"+ i +"' class='comoLlegarFerreteria pull-left'>Cómo llegar</div>";
						content += "<div class='urlFerreteria pull-right'><a href='" + locations[i][2] + "'>Ir a la ficha</a></div>";
					}
					content += "<div class='clearfix'></div>";
					content += "</div>";
                    */
                });
            });
        });
    }
}
