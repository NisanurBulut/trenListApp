import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../../models/user-model';
import {NetworkDetectProvider} from '../../providers/network-detect/network-detect';
@Injectable()
export class TrenlistServiceProvider {
  private apiUrlBase = 'http://api.dualsoft.com.tr/api/data/';
  constructor(public http: HttpClient, private currentUser:User, private netProvider:NetworkDetectProvider) { //tanımlama yapmamla bırlıkte cekiyor
  }
  getDataforCL(tpLength) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
    return new Promise((resolve, reject) => {
      this.http.get(
        this.apiUrlBase+'ListTren', //server adress
        {
          headers: {'Content-Type': 'application/json; charset=utf-8',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          'Authorization':this.currentUser.getAuthorization()    
        }, //header bilgileri
        params:{'id':tpLength}
      })
      .subscribe(data => {       
          resolve(data);       
        }, (err) => {
          console.log(err);
          this.netProvider.PrepareAlert(err);    
          reject(err);
        });
    });
  }

}