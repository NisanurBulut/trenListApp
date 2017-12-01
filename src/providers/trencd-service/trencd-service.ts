import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the TrencdServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TrencdServiceProvider {
  private apiUrlBase = 'http://vkbanalizapi.somee.com/api/data/';
  cihazPostData:{"access_token":"","token_type":"","expires_in":"","trenId":""};
  constructor(public http: HttpClient) {
    const data = JSON.parse(localStorage.getItem('tokenData'));
    this.cihazPostData=JSON.parse(data);
    console.log(this.cihazPostData);
  }
  getCihazList(credentials, type) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
    console.log(credentials);//veri alıyorum
     return new Promise((resolve, reject) => {
       this.http.get(
         this.apiUrlBase+type, //server adress
         {
           headers: {
          'Content-Type': 'application/json; charset=utf-8',
           'Authorization':this.cihazPostData.token_type+' ' +this.cihazPostData.access_token
             
         },
         params:{'id':credentials.TrenId}
          
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