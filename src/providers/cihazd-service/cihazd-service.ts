import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user-model';
@Injectable()
export class CihazdServiceProvider {
  private apiUrlBase = 'http://vkbanalizapi.somee.com/api/data/';
  constructor(public http: HttpClient,private currentUser:User) {
    const data = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
  }
  getDataforCD(credentials, type) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
     return new Promise((resolve, reject) => {
       this.http.get(
         this.apiUrlBase+type, //server adress
         {
           headers: {
          'Content-Type': 'application/json; charset=utf-8',
           'Authorization':this.currentUser.getAuthorization()              
         },
         params:{'id':credentials.Cid}          
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
