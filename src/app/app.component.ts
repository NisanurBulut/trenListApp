import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import {CihazPage} from '../pages/cihaz/cihaz'
import { TrenDetailPage } from '../pages/tren-detail/tren-detail';
export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
    pages: PageInterface[];
  
    
  rootPage:any = LoginPage;

  constructor(
   
    platform: Platform,
     statusBar: StatusBar, 
     splashScreen: SplashScreen,
     ) {
      this.pages=[
        { title: 'Tren Listesi', name: 'Home', component: HomePage,  index: 0, icon: 'attach' },
        { title: 'Cihaz Listesi', name: 'Cihaz', component: TrenDetailPage,  index: 1, icon: 'attach' },
        { title: 'Oturum Kapat', name: 'LoginPage', component:LoginPage, icon: 'log-out', logsOut: true }
      ];
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
