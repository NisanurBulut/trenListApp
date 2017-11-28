import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrenDetailPage } from './tren-detail';
@NgModule({
  declarations: [
    TrenDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TrenDetailPage),
  ],
})
export class TrenDetailPageModule {}
