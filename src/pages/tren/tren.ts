
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { Component,Pipe, PipeTransform } from '@angular/core'
import { FormControl } from '@angular/forms';
import { App } from 'ionic-angular/components/app/app';
import {TrenDetailPage} from '../tren-detail/tren-detail'
import { TrenlistServiceProvider } from '../../providers/trenlist-service/trenlist-service';
import {SearchTrenPipe} from '../../pipes/search-tren/search-tren';

@Pipe({
  name: 'filter',
  pure: false
})
@IonicPage()
@Component({
  selector: 'page-tren',
  templateUrl: 'tren.html',
})
export class TrenPage  {
  responseData : any;
  dataSetTrenL : any;
  term: string = '';
  userPostData:{"access_token":"","token_type":"","expires_in":""};
    constructor(public navCtrl: NavController, 
      public trenlistservice:TrenlistServiceProvider,
      public app: App,
      public menu: MenuController) {
      this.menu.enable(true);//menü aktif edilir
      const data = JSON.parse(localStorage.getItem('tokenData'));
      this.userPostData=JSON.parse(data);
      this.getTrenList();
  }
  ionViewDidLoad() {
    this.app.setTitle('Tren Listesi');   

  }
   // ion input fire oldukça filter çalışssın :)
   searchFn(ev: any) {
    this.term = ev.target.value;
  }
  getTrenList() {
    this.trenlistservice.getDataforCL(this.userPostData, 'ListTren')
      .then((result) => {
        this.dataSetTrenL = result;
      }, (err) => {

      });
  }
  goToTrenDetail(trenData:any)
  {
    this.navCtrl.push(TrenDetailPage,trenData);
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