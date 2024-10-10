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
  userName="User_Id";


  public saveLoginStateToStorage(response:ResponseLogin,userName?:string){
    try{
      if (response&&userName) {
        localStorage.setItem(this.expiration,response.expiration!);
        localStorage.setItem(this.token,response.token!);
        localStorage.setItem(this.refreshToken,response.refreshToken!);
        localStorage.setItem(this.userName,userName!);
      }
    }catch(error) {
      console.log(error);
    }

  }

  public logout(){
    try {
      localStorage.removeItem(this.expiration);
      localStorage.removeItem(this.token);
      localStorage.removeItem(this.refreshToken);
      localStorage.removeItem(this.userName);
    } catch (error) {
      console.log(error);
    }
  }

  public isLogin():boolean{
    try {
      let exp=localStorage.getItem(this.expiration);
      let token=localStorage.getItem(this.token);
      if (exp && token) {
        let now=new Date().valueOf();
        let expiration=Number(exp);
        return expiration>now;
      }
    } catch{

    }

    return false;
  }

  public getAccessToken(){
    return localStorage.getItem(this.token);
  }

  public getRefreshToken(){
    return localStorage.getItem(this.refreshToken);
  }

  public getUsername(){
    try {
        return localStorage.getItem(this.userName);
    } catch {

    }
    return null;
  }

  public isLogout():boolean{
    return !this.isLogin();
  }
}
