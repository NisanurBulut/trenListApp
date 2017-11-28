import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular/components/app/app';
import {TrencdServiceProvider} from '../../providers/trencd-service/trencd-service'
/**
 * Generated class for the TrenDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tren-detail',
  templateUrl: 'tren-detail.html',
})
export class TrenDetailPage {

 private TrenData={"TrenAd":"","TrenAId":""};
 private dataSetTCihaz:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public trencdservice:TrencdServiceProvider,public app: App)
   {
    //Tren sayfasından gelen detayları listelenecel olan
   this.TrenData=this.navParams.data
   //setlendi
   this.getCihazList(this.TrenData);
  }
  public setdtcihazList(dataset:any)
  {
this.dataSetTCihaz=dataset;
console.log(this.dataSetTCihaz);
  }
getCihazList(_trenData:any)
{
this.trencdservice.getCihazList(_trenData, 'ListCihaz')
.then((result) => {
  this.setdtcihazList(result);
 
}, (err) => {

});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad TrenDetailPage');
  }

}
