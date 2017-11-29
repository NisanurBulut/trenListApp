
import { IonicPage, NavController,MenuController,ToastController } from 'ionic-angular';
import { Component} from '@angular/core'
import { App } from 'ionic-angular/components/app/app';
import {TrenDetailPage} from '../tren-detail/tren-detail'
import { TrenlistServiceProvider } from '../../providers/trenlist-service/trenlist-service';



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
      public menu: MenuController,
      private toastCtrl:ToastController,
     ) {
  
      this.menu.enable(true);//menü aktif edilir
      const data = JSON.parse(localStorage.getItem('tokenData'));
      this.userPostData=JSON.parse(data);
      this.getTrenList();
  }
  ionViewDidLoad() {
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
  public presentToast(_message:any) {
    let toast = this.toastCtrl.create({
      message: _message,
      duration: 3000,
      position: 'middle',
      cssClass:''
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  logout(){
       localStorage.clear();
       setTimeout(() => this.backToWelcome(), 1000);
  }
  
}