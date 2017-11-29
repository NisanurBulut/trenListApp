import { NgModule } from '@angular/core';
import { Network } from '@ionic-native/network';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { TrenPage } from '../tren/tren';
import {network} from '../../models/network';
import {NetworkDetectProvider} from '../../providers/network-detect/network-detect';

@NgModule({
  declarations: [
    LoginPage,
    TrenPage,
    Network,
    network,
    NetworkDetectProvider
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    
  ],
})
export class LoginPageModule {}
