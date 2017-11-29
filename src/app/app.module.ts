import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Network } from '@ionic-native/network';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {CihazDetayPage} from '../pages/cihaz-detay/cihaz-detay';
import {TrenDetailPage} from '../pages/tren-detail/tren-detail';
import {CihazPage} from '../pages/cihaz/cihaz';
import {TrenPage} from '../pages/tren/tren';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { TrenlistServiceProvider } from '../providers/trenlist-service/trenlist-service';
import { HttpClientModule } from '@angular/common/http';
import { TrencdServiceProvider } from '../providers/trencd-service/trencd-service';
import { CihazdServiceProvider } from '../providers/cihazd-service/cihazd-service';
import {SearchTrenPipe} from '../pipes/search-tren/search-tren';
import { NetworkDetectProvider } from '../providers/network-detect/network-detect';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TrenPage,
    SignupPage, 
    TrenDetailPage,
    CihazDetayPage,
    CihazPage,
    SearchTrenPipe
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  
  entryComponents: [
    MyApp,
    LoginPage,
    TrenPage,
    SignupPage,  
    TrenDetailPage,
    CihazDetayPage,
    CihazPage  
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    Network,
    {
   provide: ErrorHandler,
   useClass: IonicErrorHandler},
    AuthServiceProvider,
    TrenlistServiceProvider,
    TrencdServiceProvider,
    CihazdServiceProvider,
    NetworkDetectProvider
  ]
})

export class AppModule {
  
}
