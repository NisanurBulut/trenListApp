import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController } from 'ionic-angular';
//import { ERR_CORDOVA_NOT_AVAILABLE } from '@ionic-native/core';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';
//import { enableDebugTools } from '@angular/platform-browser/src/browser/tools/tools';
import { NgForm } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TrenPage } from '../tren/tren';
import {NetworkDetectProvider} from '../../providers/network-detect/network-detect';
import {User} from '../../models/user-model';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
private role:string;
  userData = {"UserName":"","Password": ""};
  submitted = false;
  responseData : any;
  userrole:any;
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
      if(this.netProvider.getConnectionStatus()){ //Bağlant kontrol et
        this.netProvider.presentSpinner();  
      var data = "username=" + this.userData.UserName + "&password="+this.userData.Password+"&grant_type=password";
      this.authService.postDataforLogin(data,"token").then((result) => {
        this.responseData=result;   
        this.tokenData=JSON.parse(this.responseData);     

    this.currenUser.setCurrentUser(
           this.userData.UserName,
           this.userData.Password,
           this.tokenData.access_token,
           this.tokenData.token_type,
           true          
         ); 

           //Claim için rol bilgilerini isteyelim
      this.authService.getClaimsData(this.tokenData.access_token).then((result) => { 
        this.role=result[0].value;
       
        this.currenUser.setRole(this.role);
      }, (err) => {
          //Serverdan gelen hata serviste alert edilir
         });
        localStorage.setItem('currentUser', JSON.stringify(this.currenUser)); //gelen cevabı setliyorum 
        setTimeout(() => 
        {
          this.navCtrl.setRoot(TrenPage);  
          this.netProvider.dismissSpinner();
        },
        500);
           
      }, (err) => {
       //Serverdan gelen hata serviste alert edilir
       this.netProvider.dismissSpinner();
       //Hata sonrası başlatılan spinner kapatılmalı.
       //Burada başka bir alert çıkarmalıyım
       //parola ya da kullanıcı adı hatalıdır
       //this.netProvider.ShowAlert("Kullanıcı Hatası","Kullanıcı adı ya da şifre bilgisi hatalıdır.");
       this.navCtrl.setRoot(this.navCtrl.getActive().component);
      });  
    }
    else
    {
      this.netProvider.displayNetworkUpdate("İnternet Bağlantısı Kayıp");
    }
  }
   
  }
  logout(): void {
    return Observable.create(observer => {
      this.currenUser=undefined;
      localStorage.clear();//bu önemli
      this.netProvider.leaveNetworkSubscribe();
      
    });
    
  };
signup()
{
  //SignupPage page link
  this.navCtrl.push(SignupPage);
}
}
