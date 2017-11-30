import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController,AlertController } from 'ionic-angular';
import { ERR_CORDOVA_NOT_AVAILABLE } from '@ionic-native/core';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';
import { enableDebugTools } from '@angular/platform-browser/src/browser/tools/tools';
import { NgForm } from '@angular/forms';
import { TrenPage } from '../tren/tren';
import {NetworkDetectProvider} from '../../providers/network-detect/network-detect';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userData = {"UserName":"","Password": ""};
  submitted = false;
  responseData : any;
  tokenData={"access_token":"","token_type":"","expires_in":""}
  constructor(
    public navCtrl:NavController,
    public authService:AuthServiceProvider,
    public menu: MenuController,
    private netProvider:NetworkDetectProvider,
    private alertCtrl: AlertController
  ) {  
    this.netProvider.isOnline();
    this.menu.enable(false);
    this.netProvider.checkConnection();
  }
   ionViewDidLoad() {
   this.netProvider.checkConnection();
  }

  login(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      if(this.netProvider.isOnline()){
      var data = "username=" + this.userData.UserName + "&password="+this.userData.Password+"&grant_type=password";
      this.netProvider.checkConnection();
      this.authService.postDataforLogin(data,"token").then((result) => {
        this.responseData = result;  
        localStorage.setItem('tokenData', JSON.stringify(this.responseData)); //gelen cevabı setliyorum
        this.navCtrl.setRoot(TrenPage);
      
      }, (err) => {
        this.netProvider.ShowAlert(err.name, err.message);
        console.log(err);
      });
    }
    else { 
      this.netProvider.ShowAlert('NetWork','İnternet Bağlantınız Yok');        
       }
  }
  }
signup()
{
  //SignupPage page link
  this.navCtrl.push(SignupPage);
}

addConnectivityListeners(){
  
     let onOnline = () => {
  
      setTimeout(() => {
      console.log("net var");
      }, 2000);
 
       };
  
     let onOffline = () => {
    console.log("net yok");
     };
  
     document.addEventListener('online', onOnline, false);
     document.addEventListener('offline', onOffline, false);
  
   }

}
