import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestLogin } from '../model/request-login';
import { ResponseLogin } from '../model/response-login';
import { RequestSignup } from '../model/request-signup';
import { ResponseSignup } from '../model/response-signup';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http:HttpClient) { }
  expiration="Expiration_Id";
  token="Token_Id";

  url=`https://localhost:7187`;
  loginUrl=`/login`;
  registerUrl=`/register`;


  public postRequestToLogin(request:RequestLogin){
    var loginUrl=this.url+this.loginUrl;
    return this.http.post<ResponseLogin>(loginUrl,request);
  }

  public postRequestToSignup(request:RequestSignup){
    var registerUrl=this.url+this.registerUrl;
    return this.http.post<ResponseSignup>(registerUrl,request);
  }
}
