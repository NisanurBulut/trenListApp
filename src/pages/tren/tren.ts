
import { IonicPage, NavController,MenuController } from 'ionic-angular';
import { Component} from '@angular/core'
import { App } from 'ionic-angular/components/app/app';
import {TrenDetailPage} from '../tren-detail/tren-detail'
import { TrenlistServiceProvider } from '../../providers/trenlist-service/trenlist-service';
import { NetworkDetectProvider } from '../../providers/network-detect/network-detect';



@IonicPage()
@Component({
  selector: 'page-tren',
  templateUrl: 'tren.html',
})
export class TrenPage  {
  responseData : any;
  dataSetTrenL : any=[];
  term: string = '';
  private tlStart:number;
    constructor(public navCtrl: NavController, 
      public trenlistservice:TrenlistServiceProvider,
      public app: App,
      public menu: MenuController,
      private netProvider:NetworkDetectProvider){
  
      this.menu.enable(true);//menü aktif edilir    
      this.tlStart=0;
      this.getTrenList(this.tlStart);//Sayfa yüklenirken 0 değeriyle alıyorum
  }
  ionViewDidLoad() {
  }

   // ion input fire oldukça filter çalışssın :)
   searchFn(ev: any) {
    this.term = ev.target.value;
  }
  getTrenList(tlStart) {

    return new Promise(resolve => {      
      this.trenlistservice.getDataforCL(this.tlStart)
      .then((result) => {   
      this.dataSetTrenL=this.dataSetTrenL.concat(result);      
         
          console.log(this.dataSetTrenL);//veri alınıyor
        resolve(true);        
      }, (err) => {
        this.netProvider.ShowAlert(err.name,err.message); //sunucudan dönen  hatayı gösterelim
              });           
    })
  }
  doInfinite(infiniteScroll:any): Promise<any> {
    console.log('doInfinite, start is currently '+this.tlStart);
    this.tlStart+=10;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.getTrenList(this.tlStart)
        .then((result) => { 
          console.log(result);  
          if(result==true)
          {
            infiniteScroll.complete();
          }
        
             
        }, (err) => {
          this.netProvider.ShowAlert(err.name,err.message); //sunucudan dönen  hatayı gösterelim
                });  
        resolve();
      }, 500);
    })
  }

  goToTrenDetail(trenData:any)
  {
    this.navCtrl.push(TrenDetailPage,trenData);
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