import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let apiUrlBase = 'http://localhost:50572/api/data/';

/*
  Generated class for the TrenlistServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TrenlistServiceProvider {
  items: any;
  constructor(public http: HttpClient) {
    console.log('Hello CihazlistServiceProvider Provider');
  }
  getDataforCL(credentials, type) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
   
    return new Promise((resolve, reject) => {

      this.http.get(
        apiUrlBase+type, //server adress
        {
          headers: {'Content-Type': 'application/json; charset=utf-8',
          'Authorization':'bearer ' +credentials.access_token,
        }        
               //header bilgileri
      }).subscribe(res => {       
          resolve(res);          
        }, (err) => {
        console.log(err);
          reject(err);
        });
    });
  }

}