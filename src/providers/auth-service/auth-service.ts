
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let apiUrl = 'http://localhost:50572/api/user/';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }
  postData(credentials, type) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
    console.log(credentials);
    return new Promise((resolve, reject) => {
console.log(credentials);
      this.http.post(apiUrl + type, //server adress
        JSON.stringify(credentials), //Gönderilen veriler
        {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'), //header bilgileri
      })
        .subscribe(res => {
          console.log(JSON.stringify(credentials));
          resolve(JSON.stringify(res));
        }, (err) => {
          reject(err);
        });
    });

  }

}
