// Providers
import {AuthService} from '../providers/auth-service';
import {ConnectivityService} from '../providers/connectivity-service';
import {FerreteriasService} from '../providers/ferreterias-service';
import {ProveedoresService} from '../providers/proveedores-service';
import {ProductosService} from '../providers/productos-service';
import {UsersService} from '../providers/users-service';

import {NoticiasService} from '../providers/noticias-service';
import {InformercialService} from '../providers/informercial-service';
import {EventosService} from '../providers/eventos-service';

// Ionic native providers
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {Camera} from '@ionic-native/camera';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AndroidFullScreen} from '@ionic-native/android-full-screen';
import {Network} from '@ionic-native/network';
import {GoogleMaps} from '@ionic-native/google-maps';
import {Keyboard} from '@ionic-native/keyboard';
import {AppVersion} from '@ionic-native/app-version';
import {Contacts} from '@ionic-native/contacts';
import {CallNumber} from '@ionic-native/call-number';
import {EmailComposer} from '@ionic-native/email-composer';
import {ImgcacheService} from '../global/services';

import {JwtHelper} from 'angular2-jwt';

// Components
import {AccordionListComponent} from '../components/accordion-list/accordion-list';
import {LazyImgComponent} from '../global/components/';

// Pipes
import {KeysPipe} from '../pipes/keys/keys';

// Modules
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

// DIRECTIVES
import {LazyLoadDirective} from '../global/directives/';

export const MODULES = [
    BrowserModule,
    HttpModule
];

export const SERVICES = [
    AuthService,
    ConnectivityService,
    UsersService,
    FerreteriasService,
    ProveedoresService,
    ProductosService,
    NoticiasService,
    InformercialService,
    EventosService
]
export const DIRECTIVES = [
    LazyLoadDirective
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
    Keyboard,
    ImgcacheService,
    AppVersion,
    Contacts,
    CallNumber,
    EmailComposer
];

export const COMPONENTS = [
    AccordionListComponent,
    LazyImgComponent
];
