import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular/components/app/app';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
    userDetails : any;
    responseData: any;
   
    //userPostData = {"user_id":"","token":""};
  
    constructor(public navCtrl: NavController, public authService:AuthServiceProvider,public app: App) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
  console.log(data.userData);
  //this.userPostData.user_id = this.userDetails.user_id;
    //this.userPostData.token = this.userDetails.token;
  
  }
  
  backToWelcome(){
     const root = this.app.getRootNav();
     root.popToRoot();
  }
  
  logout(){
       localStorage.clear();
       setTimeout(() => this.backToWelcome(), 1000);
  }
  
}
