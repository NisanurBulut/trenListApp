import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CihazDetayPage } from './cihaz-detay';
import { NetworkDetectProvider } from '../../providers/network-detect/network-detect';
@NgModule({
  declarations: [
    CihazDetayPage,
  ],
  imports: [
    IonicPageModule.forChild(CihazDetayPage),
  ],
  providers: [
    NetworkDetectProvider
  ]
})
export class CihazDetayPageModule {}
