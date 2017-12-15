import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {NetworkDetectProvider} from '../../providers/network-detect/network-detect';
import { User } from '../../models/user-model';

@Injectable()
export class AuthServiceProvider {
  private apiUrlBase = 'http://api.dualsoft.com.tr/';
  constructor(public http: HttpClient,
  private netProvider:NetworkDetectProvider,
private currentUser:User) {
    
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
          this.netProvider.PrepareAlert(err);  
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
          this.netProvider.PrepareAlert(err);    
          reject(err);
        });
    });
  }
  getClaimsData(token:string) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
   
    return new Promise((resolve, reject) => {
      this.http.get(
        this.apiUrlBase+'api/user/GetClaims', //server adress
        {
          headers: {'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          'Authorization':'bearer '+token    
        } //header bilgileri
      })
      .subscribe(data => {       
          resolve(data);       
        }, (err) => {
          
          this.netProvider.PrepareAlert(err);    
          reject(err);
        });
    });
  }
}
