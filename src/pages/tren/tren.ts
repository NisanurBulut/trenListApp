
import { IonicPage, NavController,MenuController } from 'ionic-angular';
import { Component} from '@angular/core'
import { App } from 'ionic-angular/components/app/app';
import { TrenlistServiceProvider } from '../../providers/trenlist-service/trenlist-service';
import { NetworkDetectProvider } from '../../providers/network-detect/network-detect';
import { CihazPage } from '../cihaz/cihaz';



@IonicPage()
@Component({
  selector: 'page-tren',
  templateUrl: 'tren.html',
})
export class TrenPage  {
  responseData : any;
  dataSetTrenL : any=[];
  term: string = '';
  private statusScroll:boolean=true;
  private tlStart:number;
    constructor(public navCtrl: NavController, 
      public trenlistservice:TrenlistServiceProvider,
      public app: App,
      public menu: MenuController,
      private netProvider:NetworkDetectProvider){  
      this.menu.enable(true);//menü aktif edilir          
      this.tlStart=0;
      if(this.netProvider.getConnectionStatus()){
      this.getTrenList(this.tlStart);//Sayfa yüklenirken 0 değeriyle alıyorum
      }
  }
  ionViewDidEnter() {
    this.netProvider.CheckConnection();
  }
   // ion input fire oldukça filter çalışssın :)
   searchFn(ev: any) {
    this.term = ev.target.value;
  }
  getTrenList(tlStart) {
    return new Promise(resolve => {      
      this.trenlistservice.getDataforCL(this.tlStart)
      .then((result) => {  
        if(result!=null)
        {
          this.dataSetTrenL=this.dataSetTrenL.concat(result);//Apiden gelen verileri birleştirme
          resolve(true);      
        } 
        else{
          resolve(false); //scroll dursun
        }          
          
      }, (err) => {
        this.netProvider.PrepareAlert(err); //sunucudan dönen  hatayı gösterelim
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
            if(result==false)//Veri kalmamış ise scroll işlemini durduryorum
            {   console.log(result);          
              infiniteScroll.enable=false;
              infiniteScroll.complete();//Scroll işlemi tamamlandı
              this.statusScroll=false;
            }           
          }, (err) => {
            this.netProvider.PrepareAlert(err); //sunucudan dönen  hatayı gösterelim
                  });  
          resolve();
        }, 500);
      })
    }
  
  goToTrenDetail(trenData:any)
  {
    if(this.netProvider.getConnectionStatus()){ //Detay Sayfasına Gitmeden evvel kontrol ediyoruz
    this.navCtrl.push(CihazPage,trenData);
  }
  else{
    this.netProvider.displayNetworkUpdate("İnternet Bağlantınız Bulunmamaktadır");
  }
  }
  backToPage(){
     const root = this.app.getRootNav();
     root.popToRoot();
  }

}