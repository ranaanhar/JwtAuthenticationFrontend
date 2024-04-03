import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestLogin } from './request-login';
import { ResponseLogin } from './response-login';
import { ResponseSignup } from './response-signup';
import { RequestSignup } from './request-signup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }
  expiration="Expiration_Id";
  token="Token_Id";

  url=`https://localhost:7187`;
  loginUrl=`/login`;
  registerUrl=`/register`;


  public postRequestToLogin(request:RequestLogin){
    var loginUrl=this.url+this.loginUrl;
    return this.http.post<ResponseLogin>(loginUrl,request);// .subscribe(response=>this.saveLoginState(response));
  }

  public postRequestToSignup(request:RequestSignup){
    var registerUrl=this.url+this.registerUrl;
    return this.http.post<ResponseSignup>(registerUrl,request);
  }



  public login(response:ResponseLogin){
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
