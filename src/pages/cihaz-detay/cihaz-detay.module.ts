import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CihazDetayPage } from './cihaz-detay';
import {CihazdServiceProvider} from '../../providers/cihazd-service/cihazd-service'

@NgModule({
  declarations: [
    CihazDetayPage,
  ],
  imports: [
    IonicPageModule.forChild(CihazDetayPage),
  ],
})
export class CihazDetayPageModule {}
