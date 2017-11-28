import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController } from 'ionic-angular';
import { ERR_CORDOVA_NOT_AVAILABLE } from '@ionic-native/core';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { enableDebugTools } from '@angular/platform-browser/src/browser/tools/tools';
import { NgForm } from '@angular/forms';
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

  userData = {"UserName":"","Password": ""};
  submitted = false;

  responseData : any;
  
   tokenData={"access_token":"","token_type":"","expires_in":""}
   constructor(public navCtrl: NavController,public authService:AuthServiceProvider,public menu: MenuController) {
    this.menu.enable(false);
   }
   
  
   ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      var data = "username=" + this.userData.UserName + "&password="+this.userData.Password+"&grant_type=password";
      
      this.authService.postDataforLogin(data,"token").then((result) => {
        this.responseData = result; 
  
        localStorage.setItem('tokenData', JSON.stringify(this.responseData)); //gelen cevabı setliyorum
        this.navCtrl.setRoot(HomePage);
      
      }, (err) => {
        // Error log
      });
    }
  }
signup()
{
  //SignupPage page link
  this.navCtrl.push(SignupPage);
}
}
