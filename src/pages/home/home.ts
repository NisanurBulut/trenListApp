import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WelcomePage} from '../welcome/welcome';
import { App } from 'ionic-angular/components/app/app';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public app: App) {

  }
logout(){
  //api token
  const  root=this.app.getRootNav();
  root.popToRoot();
}
}
