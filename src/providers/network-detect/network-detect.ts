
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform,AlertController} from 'ionic-angular';


declare var navigator: any;
declare var Connection: any;
/*
  Generated class for the NetworkDetectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkDetectProvider {
  onDevice: boolean;
  
   constructor(private platform: Platform, 
    private network:Network,
    private alertCtrl:AlertController
  ){
     this.onDevice = this.platform.is('cordova');
   }
  
   isOnline(): boolean {
     if(this.onDevice && this.network.type){
       return this.network.type !== Connection.NONE;
     } else {
       return navigator.onLine;
     }
   }
  
   isOffline(): boolean {
     if(this.onDevice && this.network.type){
      alert("net bağlantısı var");
       return this.network.type === Connection.NONE;
    
     } else {
      console.log("offline");     
       return !navigator.onLine;  
     }
   }

   checkConnection(){
    this.network.onchange().subscribe(() => {
      switch (this.network.type) {
        case '2g':
          console.log('probably not very fast ...');        
          break;
        case 'wifi':
          console.log('wohoo wifi ...');
          break;
      }
    });
   }
   ShowAlert(title:any, message:any){
    let alert=this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Tamam']
    });
  alert.present(); 
   }
  
}
