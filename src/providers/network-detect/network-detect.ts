import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { AlertController,ToastController,LoadingController} from 'ionic-angular';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Subscription} from 'rxjs/Subscription';
import { Loading } from 'ionic-angular/components/loading/loading';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class NetworkDetectProvider { 
  private connected: Subscription;
  private disconnected: Subscription;
  private status:boolean=undefined;

  private loading:Loading;
   constructor(
    private network:Network,
    private alertCtrl:AlertController,
    private toast: ToastController,
    private loaderCtrl:LoadingController){       
      this.setConnectionStatus();
   }
   presentSpinner() {
    this.loading = this.loaderCtrl.create({content:'Lütfen Bekleyin...'});
    this.loading.present();
  }

  dismissSpinner() {
  
      this.loading.dismiss();
    
  }
   displayNetworkUpdate(_message:string){
    let networkType = this.network.type;
    this.toast.create({
      message: _message,
      duration: 3000
    }).present();
  }
  CheckConnection():void //Değişimle çalışıyor
  {
    this.connected = this.network.onConnect().subscribe(data => {
      this.setConnectionStatus();
      this.displayNetworkUpdate("İnternet Bağlantısı Sağlandı"); 
    }, error => console.error(error));
    this.disconnected = this.network.onDisconnect().subscribe(data => {     
      this.setConnectionStatus();//Bağlantı durumu değiştikçe setle
      this.displayNetworkUpdate("İnternet Bağlantınız Bulunmamaktadır.");
    }, error => console.error(error));
  }
  setConnectionStatus() //Bunu constructor ile almam gerekir ?
  {
    this.status=navigator.onLine;
  }
   getConnectionStatus():boolean{  //Bunu fonksiyonlar için kullanıyorum
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
//this.navCtrl.setRoot('LoginPage');
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
//this.navCtrl.setRoot('LoginPage');
break;
default:
this.ShowAlert(err["name"],err["message"]);
break;
}
   }
   ShowAlert(_title:string,_message:string):void{
    let alert=this.alertCtrl.create({
      title:_title,
      subTitle:_message,
     buttons: ['Tamam']
   });
   alert.present();
   }

}
