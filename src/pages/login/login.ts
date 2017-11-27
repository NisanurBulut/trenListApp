import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ERR_CORDOVA_NOT_AVAILABLE } from '@ionic-native/core';
import { TabsPage } from '../tabs/tabs';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData : any;

  userData = {"UserName": "","Password": ""};
  tokenData={"access_token":"","token_type":"","expires_in":""}
  constructor(public navCtrl: NavController,public authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login()
  {
    var data = "username=" + this.userData.UserName + "&password="+this.userData.Password+"&grant_type=password";
    this.authService.postDataforLogin(data,"token").then((result) => {
      this.responseData = result; 
      localStorage.setItem('tokenData', JSON.stringify(this.responseData)); //gelen cevabı setliyorum
    
      this.navCtrl.push(TabsPage);
    }, (err) => {
      // Error log
    });
  }
signup()
{
  //SignupPage page link
  this.navCtrl.push(SignupPage);
}
}
