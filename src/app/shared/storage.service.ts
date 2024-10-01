import { Injectable } from '@angular/core';
import { ResponseLogin } from '../model/response-login';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  expiration="Expiration_Id";
  token="Token_Id";
  refreshToken="RefreshToken_Id";


  public saveLoginStateToStorage(response:ResponseLogin){
    if (response) {
      // console.log('save token.');
      localStorage.setItem(this.expiration,response.expiration!);
      localStorage.setItem(this.token,response.token!);
      localStorage.setItem(this.refreshToken,response.refreshToken!);
    }
  }

  public logout(){
    try {
      localStorage.removeItem(this.expiration);
      localStorage.removeItem(this.token);
      localStorage.removeItem(this.refreshToken);
    } catch (error) {
      console.log(error);
    }
  }

  public isLogin():boolean{
    let exp=localStorage.getItem(this.expiration);
    let token=localStorage.getItem(this.token);
    if (exp && token) {
      let now=new Date().valueOf();
      let expiration=Number(exp);
      return expiration>now;
    }
    return false;
  }

  public getAccessToken(){
    // console.log("return access token from localStorage.");
    return localStorage.getItem(this.token);
  }

  public getRefreshToken(){
    // console.log("return refresh token from localStorage.");
    return localStorage.getItem(this.refreshToken);
  }


  public isLogout():boolean{
    return !this.isLogin();
  }
}
