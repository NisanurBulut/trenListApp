
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform,AlertController} from 'ionic-angular';
import { HttpClient,HttpResponse } from '@angular/common/http';


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
    private alertCtrl:AlertController){
     this.onDevice = this.platform.is('cordova');
     console.log(this.onDevice);
   }
  
   isOnline() {
    
   }
  
   isOffline():boolean {
    this.network.onDisconnect().subscribe(data => {
      console.log(data);
      return true;
    }, error => console.error(error));
    return false;
   }
   displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.ShowAlert('You are now ${connectionState} via ${networkType','');
    
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
   PrepareAlert(err:Response)
   {
switch(err["status"])
{
case 400:
this.ShowAlert("İstek Hatası","Uygulama Ön Belleğini Temizleyip Tekrar Deneyiniz.");
break;
case 401:
this.ShowAlert("Erişim Sınırlaması","Bu Alana Erişim İzniniz Bulunmamaktadır.");
break;
case 500:
this.ShowAlert("Adres Hatası","İstenen Veri yolu Bulunamadı");
break;
case 403:
this.ShowAlert("Erişim Sınırlaması","Bu Alana Erişim İzniniz Bulunmamaktadır.");
break;
case 404:
this.ShowAlert("Kayıp Adres","Erişmeye Çalıştığınız Alan Bulunamadı.");
break;
default:
this.ShowAlert(err["name"],err["message"]);
break;
}
   }
   ShowAlert(_title:string,_message:string){
    let alert=this.alertCtrl.create({
      title:_title,
      subTitle:_message,
     buttons: ['Tamam']
   });
   alert.present();
   }
  
}
