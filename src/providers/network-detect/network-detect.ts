
import { Injectable, state } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform,AlertController,ToastController } from 'ionic-angular';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Subscription} from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NetworkDetectProvider { 
  private connected: Subscription;
  private disconnected: Subscription;
  private status:boolean=true;
   constructor(private platform: Platform, 
    private network:Network,
    private alertCtrl:AlertController,
    private toast: ToastController){
      Observable.merge(this.network.onConnect(), network.onDisconnect())
      .subscribe(e => console.log(e), err => console.error(err)); 
      this.CheckConnection();
      this.platform.ready().then(() => {     
    });
   }
   displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: 'You are now ${connectionState} via ${networkType}',
      duration: 3000
    }).present();
  }
  CheckConnection():void
  {
    this.connected = this.network.onConnect().subscribe(data => {
      console.log(data)
      this.status=true;
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   console.log(this.status);
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.status=false;
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }
   getConnectionStatus():boolean{  
     console.log(this.status);
     return this.status;
   }
  leaveNetworkSubscribe():void{
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
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
