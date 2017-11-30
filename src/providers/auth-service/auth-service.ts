import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {NetworkDetectProvider} from '../../providers/network-detect/network-detect';
@Injectable()
export class AuthServiceProvider {
  private apiUrlBase = 'http://localhost:50572/';
  constructor(public http: HttpClient, private netProvider:NetworkDetectProvider) {
    console.log('Provider Yüklendi');
  }
  postData(credentials, type) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrlBase+"api/user/" + type, //server adress
        JSON.stringify(credentials), //Gönderilen veriler
        {
        headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'), //header bilgileri
      })
        .subscribe(res => {        
          resolve(JSON.stringify(res));
       
        }, (err) => {
          this.netProvider.ShowAlert(err.name, err.message);  
          reject(err);
        });
    });
  }
  postDataforLogin(credentials, type) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
    return new Promise((resolve, reject) => {

      this.http.post(this.apiUrlBase+type, //server adress
        credentials, //Gönderilen veriler
        {
        headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'), //header bilgileri
      })
        .subscribe(res => {        
          resolve(JSON.stringify(res));
          localStorage.setItem('userData', JSON.stringify(JSON.stringify(res)));
         
        }, (err) => {   
          this.netProvider.ShowAlert(err.name, err.message);    
          reject(err);
        });
    });
  }
}
