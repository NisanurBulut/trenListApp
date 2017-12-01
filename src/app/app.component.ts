import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TrenPage } from '../pages/tren/tren';
import { Network } from '@ionic-native/network';
import {User} from '../models/user-model';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;

}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav; 
    pages: PageInterface[];    
  rootPage:any = LoginPage;

  constructor(
    public events: Events,
    platform: Platform,
     statusBar: StatusBar, 
     splashScreen: SplashScreen,
     public netService:Network,
     public currentUser:User
     ) {
      this.pages=[
        { title: 'Tren Listesi', name: 'Tren', component: TrenPage,  index: 0, icon: 'attach' },
        { title: 'Oturum Kapat', name: 'LoginPage', component:null, icon: 'log-out', }
      ];
  
    platform.ready().then(() => {
      document.addEventListener("offline",this.netService.onDisconnect, false);
      statusBar.styleDefault();
      splashScreen.hide();
  });

  }
  openPage(page) {
    if(page.component) {
      this.nav.setRoot(page.component);
  } else {
     
      this.currentUser.setisAuthenticated(false);
      this.currentUser=undefined;
      console.log(this.currentUser);
      this.nav.setRoot(LoginPage);
  }
   
  }

}
