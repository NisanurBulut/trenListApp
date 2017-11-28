import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import {TrenDetailPage} from '../pages/tren-detail/tren-detail';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import {CihazlistServiceProvider} from '../providers/cihazlist-service/cihazlist-service'
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage, 
    HomePage,
    TrenDetailPage
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
    TrenDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    {provide: ErrorHandler,
   useClass: IonicErrorHandler},
    AuthServiceProvider,
    CihazlistServiceProvider
  ]
})
export class AppModule {}
