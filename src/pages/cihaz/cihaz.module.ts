import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CihazPage } from './cihaz';
import { NetworkDetectProvider } from '../../providers/network-detect/network-detect';
@NgModule({
  declarations: [
    CihazPage,
  ],
  imports: [
    IonicPageModule.forChild(CihazPage),
  ],
  providers: [
    NetworkDetectProvider
  ]
})
export class CihazPageModule {}
