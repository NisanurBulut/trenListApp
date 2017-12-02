import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular/components/app/app';
import {TrencdServiceProvider} from '../../providers/trencd-service/trencd-service'
import { CihazDetayPage } from '../cihaz-detay/cihaz-detay';
import { NetworkDetectProvider } from '../../providers/network-detect/network-detect';

/**
 * Generated class for the CihazPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cihaz',
  templateUrl: 'cihaz.html',
})
export class CihazPage {
  private TrenData={"TrenAd":"","TrenAId":""};
  private dataSetTCihaz:any;
   constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public trencdservice:TrencdServiceProvider,
    public netProvider:NetworkDetectProvider,
    public app: App)
    {
     
     //Tren sayfasından gelen detayları listelenecel olan
    this.TrenData=this.navParams.data
    //setlendi
    this.getCihazList(this.TrenData);
      
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
  switch (element.CDurum)
  {
     case 1:
     element.iconString="md-checkmark"; 
     console.log(element);
     break;
     case 2:
     element.iconString="md-construct"; 
     console.log(element);
     break;
     case 3: 
     element.iconString="md-warning"; 
     console.log(element);
     break;
     default: 
     console.log(element);
     break;
  }  
 });
   }
 getCihazList(_trenData:any)
 {
 this.trencdservice.getCihazList(_trenData, 'ListCihaz')
 .then((result) => {
   this.setdtcihazList(result);
 }, (err) => {
 
 });
 }
 goToCihazDetail(tcihaz:any)
 {
 
    //Tren sayfasından gelen detayları listelenecel olan
   this.navCtrl.push(CihazDetayPage,tcihaz);
  
 }
   ionViewDidLoad() {
     console.log('ionViewDidLoad TrenDetailPage');
   }
 
 }
 