import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App } from 'ionic-angular/components/app/app';
import { CihazlistServiceProvider } from '../../providers/cihazlist-service/cihazlist-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  responseData : any;
  dataSetTrenL : any;
  userPostData:{"access_token":"","token_type":"","expires_in":""};
    constructor(public navCtrl: NavController, public cihazlistService:CihazlistServiceProvider,public app: App) {
      const data = JSON.parse(localStorage.getItem('tokenData'));
      this.userPostData=JSON.parse(data);
      this.getCihazList();
  }
  getCihazList() {
    
    this.cihazlistService.getDataforCL(this.userPostData, 'ListCihaz')
      .then((result) => {
        this.dataSetTrenL = result;
       console.log(this.dataSetTrenL);
      }, (err) => {

      });
  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
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
