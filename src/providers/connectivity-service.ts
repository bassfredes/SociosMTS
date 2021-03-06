import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';

declare var Connection;

@Injectable()
export class ConnectivityService {
    onDevice: boolean;
    constructor(private network: Network, public platform: Platform) {
        this.onDevice = this.platform.is('cordova');
    }
    isOnline(): boolean {
        if (this.onDevice && this.network.type) {
            if (Connection) {
                return this.network.type !== Connection.NONE;
            }
        } else {
            return navigator.onLine;
        }
    }
    isOffline(): boolean {
        if (this.onDevice && this.network.type) {
            if (Connection) {
                return this.network.type === Connection.NONE;
            }
        } else {
            return !navigator.onLine;
        }
    }
}
