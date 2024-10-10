import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestLogin } from '../model/request-login';
import { ResponseLogin } from '../model/response-login';
import { RequestSignup } from '../model/request-signup';
import { ResponseSignup } from '../model/response-signup';
import { RequestRefreshToken } from '../model/request-refresh-token';
import { StorageService } from './storage.service';
import { catchError, tap, throwError } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http:HttpClient,private storageService:StorageService) { }
  // expiration="Expiration_Id";
  // token="Token_Id";

  url=`https://localhost:7187/api`;
  loginUrl=`/login`;
  registerUrl=`/registration`;
  refreshTokenUrl="/RefreshToken";
  userManagerUrl='/UserManager/getall';


  public postRequestToLogin(request:RequestLogin){
    const loginUrl=this.url+this.loginUrl;
    return this.http.post<ResponseLogin>(loginUrl,request);
  }

  //request to refresh token
  public postRequestToRefreshToken(request:RequestRefreshToken){
    let refresh_url= this.url+this.refreshTokenUrl;
    return this.http.post<ResponseLogin>(refresh_url,request).
    pipe(
      tap(response=>{
        this.storageService.saveLoginStateToStorage(response);
      }),
      catchError((error)=>{
        return throwError(error);}));
  }

  public postRequestToSignup(request:RequestSignup){
    const registerUrl=this.url+this.registerUrl;
    return this.http.post<ResponseSignup>(registerUrl,request);
  }


// public testAuthorizedMethod(){
//   const auth_url=this.url+this.refreshTokenUrl;
//   return this.http.get(auth_url);
// }

//   public testCrud(request:string){
//     const testUrl=this.url+this.userManagerUrl;
//     return this.http.post<string>(testUrl,request);
//   }

//   public testUnAuthorizedMethod(){
//     const login=this.url+this.loginUrl;
//     return this.http.get(login);
//   }
}
