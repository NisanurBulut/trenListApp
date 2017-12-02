import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CihazdServiceProvider } from '../../providers/cihazd-service/cihazd-service';
import { NetworkDetectProvider } from '../../providers/network-detect/network-detect';

@IonicPage()
@Component({
  selector: 'page-cihaz-detay',
  templateUrl: 'cihaz-detay.html',
})
export class CihazDetayPage {
  private dataSetCD:any;
  private datacihazd:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public cihazdetayervice:CihazdServiceProvider,
    public netProvider:NetworkDetectProvider) {
    //Http isteği yapacağız
    this.datacihazd=this.navParams.data;
   
    this.getCihazDetayList();
    
  }
  getCihazDetayList() {
    this.cihazdetayervice.getDataforCD(this.datacihazd, 'ListCihazDetay')
      .then((result) => {
        this.dataSetCD = result;
       console.log(this.dataSetCD);
      }, (err) => {

      });
  }
  ionViewDidLoad() {
   
  }

}
