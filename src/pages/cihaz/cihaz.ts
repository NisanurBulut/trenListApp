import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public menu: MenuController) {
      this.menu.enable(true);//menü aktif edilir
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CihazPage');
  }

}
