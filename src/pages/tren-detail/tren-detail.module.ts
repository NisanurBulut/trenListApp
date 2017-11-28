import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrenDetailPage } from './tren-detail';
import {CihazDetayPage} from '../cihaz-detay/cihaz-detay';

@NgModule({
  declarations: [
    TrenDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TrenDetailPage),
  ],
})
export class TrenDetailPageModule {}
