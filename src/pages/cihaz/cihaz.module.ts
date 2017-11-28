import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CihazPage } from './cihaz';

@NgModule({
  declarations: [
    CihazPage,
  ],
  imports: [
    IonicPageModule.forChild(CihazPage),
  ],
})
export class CihazPageModule {}
