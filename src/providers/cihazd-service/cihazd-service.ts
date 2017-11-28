import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
let apiUrlBase = 'http://localhost:50572/api/data/';
/*
  Generated class for the CihazdServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CihazdServiceProvider {
  cihazdPostData:{"access_token":"","token_type":"","expires_in":"","trenId":""};
  constructor(public http: HttpClient) {
    const data = JSON.parse(localStorage.getItem('tokenData'));
    this.cihazdPostData=JSON.parse(data);
    console.log(this.cihazdPostData);
  }
  getDataforCD(credentials, type) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
     return new Promise((resolve, reject) => {
       this.http.get(
         apiUrlBase+type, //server adress
         {
           headers: {
          'Content-Type': 'application/json; charset=utf-8',
           'Authorization':this.cihazdPostData.token_type+' ' +this.cihazdPostData.access_token
             
         },
         params:{'id':credentials.Cid}
          
                //header bilgileri
       })
         .subscribe(res => {
         
           resolve(res);
           
         }, (err) => {
         console.log(err);
           reject(err);
         });
     });
   }
}
