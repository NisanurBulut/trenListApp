import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CihazDetayPage } from './cihaz-detay';

@NgModule({
  declarations: [
    CihazDetayPage,
  ],
  imports: [
    IonicPageModule.forChild(CihazDetayPage),
  ],
})
export class CihazDetayPageModule {}
