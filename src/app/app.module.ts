import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Network } from '@ionic-native/network';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {CihazDetayPage} from '../pages/cihaz-detay/cihaz-detay';
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
import {User} from '../models/user-model';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TrenPage,
    SignupPage, 
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
    CihazDetayPage,
    CihazPage  
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    Network,
    User,
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
