import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import {CihazPage} from '../pages/cihaz/cihaz';
import {TrenDetailPage} from '../pages/tren-detail/tren-detail';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { TrenlistServiceProvider } from '../providers/trenlist-service/trenlist-service';
import { HttpClientModule } from '@angular/common/http';
import { TrencdServiceProvider } from '../providers/trencd-service/trencd-service';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage, 
    HomePage,
    TrenDetailPage,
    CihazPage
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
    SignupPage,  
    HomePage,
    TrenDetailPage,
    CihazPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    {
      provide: ErrorHandler,
   useClass: IonicErrorHandler},
    AuthServiceProvider,
    TrenlistServiceProvider,
    TrencdServiceProvider
  ]
})
export class AppModule {}
