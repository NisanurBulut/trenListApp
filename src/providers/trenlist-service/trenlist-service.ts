import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../../models/user-model';
@Injectable()
export class TrenlistServiceProvider {
  private apiUrlBase= 'http://vkbanalizapi.somee.com/api/data/';
  perpage:number = 10; //Sayfa da başlangıç olarak 10 tane gösterilsin diyorum
  constructor(public http: HttpClient, private currentUser:User) { //tanımlama yapmamla bırlıkte cekiyor
  console.log(this.currentUser);
  }
  getDataforCL(tpLength) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
    return new Promise((resolve, reject) => {
      this.http.get(
        this.apiUrlBase+'ListTren', //server adress
        {
          headers: {'Content-Type': 'application/json; charset=utf-8',
          'Authorization':this.currentUser.getAuthorization()    
        }, //header bilgileri
        params:{'id':tpLength}
      })
      .subscribe(data => {       
          resolve(data);
          console.log(data);        
        }, (err) => {
        console.log(err);
          reject(err);
        });
    });
  }

}