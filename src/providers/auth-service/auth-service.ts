import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let apiUrlBase = 'http://localhost:50572/';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Provider Yüklendi');
  }
  postData(credentials, type) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
    return new Promise((resolve, reject) => {
      this.http.post(apiUrlBase+"api/user/" + type, //server adress
        JSON.stringify(credentials), //Gönderilen veriler
        {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'), //header bilgileri
      })
        .subscribe(res => {        
          resolve(JSON.stringify(res));
       
        }, (err) => {
          reject(err);
        });
    });
  }
  postDataforLogin(credentials, type) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
    return new Promise((resolve, reject) => {

      this.http.post(apiUrlBase+type, //server adress
        credentials, //Gönderilen veriler
        {
        headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'), //header bilgileri
      })
        .subscribe(res => {
        
          resolve(JSON.stringify(res));
          localStorage.setItem('userData', JSON.stringify(JSON.stringify(res)));
         
        }, (err) => {       
          reject(err);
        });
    });
  }
}
