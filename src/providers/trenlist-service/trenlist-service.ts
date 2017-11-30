import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class TrenlistServiceProvider {
  private apiUrlBase= 'http://localhost:50572/api/data/';;
  perpage:number = 10; //Sayfa da başlangıç olarak 10 tane gösterilsin diyorum
  private userPostData:{"access_token":"","token_type":"","expires_in":""};
  constructor(public http: HttpClient) {
    const data = JSON.parse(localStorage.getItem('tokenData'));
    this.userPostData=JSON.parse(data);
  }
  getDataforCL(tpLength) { //credentials formdaki isim şifre bilgilerini tutuyor type ise method
    return new Promise((resolve, reject) => {
      this.http.get(
        this.apiUrlBase+'ListTren', //server adress
        {
          headers: {'Content-Type': 'application/json; charset=utf-8',
          'Authorization':'bearer ' +this.userPostData.access_token          
        }, //header bilgileri
        params:{'id':tpLength}
      })
      .subscribe(data => {       
          resolve(data);          
        }, (err) => {
        console.log(err);
          reject(err);
        });
    });
  }

}