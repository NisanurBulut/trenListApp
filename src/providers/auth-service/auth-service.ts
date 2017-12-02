import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {NetworkDetectProvider} from '../../providers/network-detect/network-detect';
@Injectable()
export class AuthServiceProvider {
  private apiUrlBase = 'http://vkbanalizapi.somee.com/';
  constructor(public http: HttpClient,
  private netProvider:NetworkDetectProvider
    ) {
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
          console.log(err);
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
        headers: {'Content-Type':'application/x-www-form-urlencoded',
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"} //header bilgileri
      })
        .subscribe(res => {     
          resolve(JSON.stringify(res));                          
        }, (err) => {   
        console.log(err);
          this.netProvider.ShowAlert(err.name, err.message);    
          reject(err);
        });
    });
  }
}
