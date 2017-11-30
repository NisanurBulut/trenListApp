import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrenPage } from './tren';
import {SearchTrenPipe} from '../../pipes/search-tren/search-tren';
import {NetworkDetectProvider} from '../../providers/network-detect/network-detect';

@NgModule({
  declarations: [
    TrenPage,
    SearchTrenPipe,
    NetworkDetectProvider
  ],
  imports: [
    IonicPageModule.forChild(TrenPage),
  ],
})
export class TrenPageModule {}
