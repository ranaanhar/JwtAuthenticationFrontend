import { Injectable } from '@angular/core';
import { ResponseLogin } from '../model/response-login';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  expiration="Expiration_Id";
  token="Token_Id";


  public saveLoginStateToStorage(response:ResponseLogin){
    if (response) {
      localStorage.setItem(this.expiration,response.expiration!);
      localStorage.setItem(this.token,response.token!);
    }
  }

  public logout(){
    try {
      localStorage.removeItem(this.expiration);
      localStorage.removeItem(this.token);
    } catch (error) {
      console.log(error);
    }
  }

  public isLogin():boolean{
    var exp=localStorage.getItem(this.expiration);
    var token=localStorage.getItem(this.token);
    if (exp && token) {
      var now=new Date().valueOf();
      var expiration=Number(exp);
      return expiration>now;
    }
    return false;
  }

  public isLogout():boolean{
    return !this.isLogin();
  }
}
