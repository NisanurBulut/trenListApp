import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CihazdServiceProvider } from '../../providers/cihazd-service/cihazd-service';

/**
 * Generated class for the CihazDetayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cihaz-detay',
  templateUrl: 'cihaz-detay.html',
})
export class CihazDetayPage {
  private dataSetCD:any;
  private datacihazd:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cihazdetayervice:CihazdServiceProvider) {
    //Http isteği yapacağız
    this.datacihazd=this.navParams.data;
    console.log(this.datacihazd); //Cihazın bilgilerini alıyorum
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
    console.log('ionViewDidLoad CihazDetayPage');
  }

}
