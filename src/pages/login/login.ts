import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController } from 'ionic-angular';
import { ERR_CORDOVA_NOT_AVAILABLE } from '@ionic-native/core';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';
import { enableDebugTools } from '@angular/platform-browser/src/browser/tools/tools';
import { NgForm } from '@angular/forms';
import { TrenPage } from '../tren/tren';
import {NetworkDetectProvider} from '../../providers/network-detect/network-detect';
import {User} from '../../models/user-model';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userData = {"UserName":"","Password": ""};
  submitted = false;
  responseData : any;
  tokenData={"access_token":"","token_type":"","expires_in":""} //Bunu Silme
  constructor(
    public navCtrl:NavController,
    public authService:AuthServiceProvider,
    public menu: MenuController,
    private netProvider:NetworkDetectProvider,
    private currenUser:User) {  
    this.menu.enable(false);
  }
  ionViewDidEnter() {
    this.netProvider.CheckConnection();
  }

  login(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      if(this.netProvider.getConnectionStatus()){
      var data = "username=" + this.userData.UserName + "&password="+this.userData.Password+"&grant_type=password";
      this.authService.postDataforLogin(data,"token").then((result) => {
        this.responseData=result;   
        this.tokenData=JSON.parse(this.responseData); 
        this.currenUser.setCurrentUser(
          this.userData.UserName,
          this.userData.Password,
          this.tokenData.access_token,
          this.tokenData.token_type,
          true);    
        localStorage.setItem('currentUser', JSON.stringify(this.currenUser)); //gelen cevabı setliyorum
        this.navCtrl.setRoot(TrenPage);
      
      }, (err) => {
       //Serverdan gelen hata serviste alert edilir
      });
    }
    else{
      this.netProvider.displayNetworkUpdate("İnternet Bağlantınız Bulunmamaktadır");
    }
  }
  }
  logout(): void {
    this.currenUser.setisAuthenticated(false);
    this.currenUser=undefined;
    localStorage.clear();
    this.netProvider.leaveNetworkSubscribe();
    console.log(this.currenUser);
  };
  ionViewWillLeave(){
  this.netProvider.leaveNetworkSubscribe();
  }
signup()
{
  //SignupPage page link
  this.navCtrl.push(SignupPage);
}
}
