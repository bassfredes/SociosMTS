// Providers
import {AuthService} from '../providers/auth-service';
import {ConnectivityService} from '../providers/connectivity-service';
import {BooksService} from '../providers/books-service';
import {FerreteriasService} from '../providers/ferreterias-service';
import {ProveedoresService} from '../providers/proveedores-service';
import {UsersService} from '../providers/users-service';

import {NoticiasService} from '../providers/noticias-service';

// Ionic native providers
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {Camera} from '@ionic-native/camera';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AndroidFullScreen} from '@ionic-native/android-full-screen';
import {Network} from '@ionic-native/network';
import {GoogleMaps} from '@ionic-native/google-maps';
import {Keyboard} from '@ionic-native/keyboard';

import {JwtHelper} from 'angular2-jwt';

// Components
import {AccordionListComponent} from '../components/accordion-list/accordion-list';

// Pipes
import {KeysPipe} from '../pipes/keys/keys';

// Modules
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

export const MODULES = [
    BrowserModule,
    HttpModule
];

export const SERVICES = [
    AuthService,
    ConnectivityService,
    BooksService,
    UsersService,
    FerreteriasService,
    ProveedoresService,
    NoticiasService
]
export const DIRECTIVES = [

];
export const PIPES = [
    KeysPipe
];

export const PROVIDERS = [
    StatusBar,
    SplashScreen,
    Network,
    PhotoViewer,
    Camera,
    JwtHelper,
    AndroidFullScreen,
    GoogleMaps,
    Keyboard
];

export const COMPONENTS = [
    AccordionListComponent
];
