import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrenPage } from './tren';
import {SearchTrenPipe} from '../../pipes/search-tren/search-tren';

@NgModule({
  declarations: [
    TrenPage,
    SearchTrenPipe
  ],
  imports: [
    IonicPageModule.forChild(TrenPage),
  ],
})
export class TrenPageModule {}
