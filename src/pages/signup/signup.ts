import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs'
import {LoginPage} from '../login/login'
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

/**
 * 
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  responseData : any;
  userData = {"username": "","password": ""};

  constructor(public navCtrl: NavController, public authService:AuthServiceProvider ) {
  }

  signup(){
     this.authService.postData(this.userData,'signup').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      console.log(JSON.parse(localStorage.getItem('userData')));
      this.navCtrl.push(LoginPage);
    }, (err) => {
      // Error log
    });

  }

  login(){
    //Login page link
    this.navCtrl.push(LoginPage);
  }
}