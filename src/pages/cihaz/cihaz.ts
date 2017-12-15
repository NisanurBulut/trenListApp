import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TrencdServiceProvider} from '../../providers/trencd-service/trencd-service'
import { CihazDetayPage } from '../cihaz-detay/cihaz-detay';
import { NetworkDetectProvider } from '../../providers/network-detect/network-detect';
@IonicPage()
@Component({
  selector: 'page-cihaz',
  templateUrl: 'cihaz.html',
})
export class CihazPage {
  private TrenData={"TrenAd":"","TrenAId":""};
  private dataSetTCihaz:any;
  public load:any;
   constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public trencdservice:TrencdServiceProvider,
    public netProvider:NetworkDetectProvider)
    {     
     //Tren sayfasından gelen detayları listelenecel olan
    this.TrenData=this.navParams.data;
    //setlendi
    if(this.netProvider.getConnectionStatus()){ //Sayfaya cihazlar yüklenmeden evvel network bağlantısı kontrol edilir
    this.getCihazList(this.TrenData);
  }
   }
   ionViewDidEnter() {
    this.netProvider.CheckConnection();
  }
   public setdtcihazList(dataset:any)
   {
 this.dataSetTCihaz=dataset;
 this.dataSetTCihaz.forEach(element => {
   //Veritabanında durumlar için ikon tutulmuyor
   //bu sebeple objecte propert eklemesi yapıyorum
  Object.defineProperty(element, "iconString", {value : '',
  writable : true,
  enumerable : true,
  configurable : true});
  Object.defineProperty(element, "iconColor", {value : '',
  writable : true,
  enumerable : true,
  configurable : true});
  Object.defineProperty(element, "stateString", {value : '',
  writable : true,
  enumerable : true,
  configurable : true});
  switch (element.CDurum)
  {
     case 1:
     element.iconString="checkmark-circle"; 
     element.iconColor="success";
     element.stateString="Aktif Durumda";
     break;
     case 2:
     element.iconString="construct"; 
     element.iconColor="energy";
     element.stateString="Bakım Durumunda";
     break;
     case 3: 
     element.iconString="warning"; 
     element.iconColor="danger";
     element.stateString="Arızalı Durumda";
     break;
     default: 
     element.iconString="bookmark";
     element.iconColor="blueprimary";
     element.stateString="Durum Bilgisi Belirtilmemiş";
     break;
  }  
 });
   }
 getCihazList(_trenData:any)
 { 
   this.netProvider.presentSpinner(); //Cihaz Yüklenirken
 this.trencdservice.getCihazList(_trenData, 'ListCihaz')
 .then((result) => { 
   this.setdtcihazList(result);
   this.netProvider.dismissSpinner();//Cihaz Yüklemesi Bitince
 }, (err) => {
 });
 }
 goToCihazDetail(tcihaz:any)
 {
   if(this.netProvider.getConnectionStatus()){ //Detay Sayfasına Gitmeden evvel kontrol ediyoruz
    //Tren sayfasından gelen detayları listelenecel olan
    setTimeout(() => 
    {
      this.navCtrl.push(CihazDetayPage,tcihaz);
    },
    1000);
   
  }
 }

 }
 