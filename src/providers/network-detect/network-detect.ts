
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
 
declare var Connection;
/*
  Generated class for the NetworkDetectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkDetectProvider {
  onDevice: boolean;
  
   constructor(public platform: Platform,public detectNetwork:Network){
     this.onDevice = this.platform.is('cordova');
   }
  
   isOnline(): boolean {
     if(this.onDevice && this.detectNetwork.type){
       return this.detectNetwork.type !== Connection.NONE;
     } else {
       return navigator.onLine;
     }
   }
  
   isOffline(): boolean {
     if(this.onDevice && this.detectNetwork.type){
       return this.detectNetwork.type === Connection.NONE;
     } else {
       return !navigator.onLine;  
     }
   }
}
