// Providers
import { AuthService } from '../providers/auth-service';
import { ConnectivityService } from '../providers/connectivity-service';
import { EventosService } from '../providers/eventos-service';
import { FerreteriasService } from '../providers/ferreterias-service';
import { InformercialService } from '../providers/informercial-service';
import { NoticiasService } from '../providers/noticias-service';
import { ProductosService } from '../providers/productos-service';
import { ProveedoresService } from '../providers/proveedores-service';
import { UsersService } from '../providers/users-service';

// Ionic native providers
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Network } from '@ionic-native/network';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Keyboard } from '@ionic-native/keyboard';
import { AppVersion } from '@ionic-native/app-version';
import { Contacts } from '@ionic-native/contacts';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Geolocation } from '@ionic-native/geolocation';
import { ImgcacheService } from '../global/services';

import { JwtHelper } from 'angular2-jwt';

// Components
import { AccordionListComponent } from '../components/accordion-list/accordion-list';
import { LazyImgComponent } from '../global/components/';

// Pipes
import { KeysPipe } from '../pipes/keys/keys';
import { PointReplacerPipe } from '../pipes/point-replacer/point-replacer';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { EventoModalPageModule } from '../pages/evento-modal/evento-modal.module';

// DIRECTIVES
import { LazyLoadDirective } from '../global/directives/';

export const MODULES = [
    EventoModalPageModule,
    BrowserModule,
    HttpModule
];

export const SERVICES = [
    AuthService,
    ConnectivityService,
    EventosService,
    FerreteriasService,
    InformercialService,
    NoticiasService,
    ProductosService,
    ProveedoresService,
    UsersService
]
export const DIRECTIVES = [
    LazyLoadDirective
];
export const PIPES = [
    KeysPipe,
    PointReplacerPipe
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
    AppVersion,
    Contacts,
    CallNumber,
    EmailComposer,
    ScreenOrientation,
    ImgcacheService,
    GoogleAnalytics,
    Geolocation
];

export const COMPONENTS = [
    AccordionListComponent,
    LazyImgComponent
];
