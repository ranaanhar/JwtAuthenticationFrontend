import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { EMPTY, catchError, empty } from 'rxjs';
import { Router } from '@angular/router';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const httpService=inject(AuthenticationService);
  const router=inject(Router);

  if (httpService.isLogin()) {
    var token=localStorage.getItem(httpService.token);
    var clone=req.clone({headers:req.headers.set(`Authorization`,`Bearer ${token}`)});
    req=clone;
  }
  return next(req).pipe(catchError((error:HttpErrorResponse)=>{
    if(error.status==0){
      console.log(`code : ${error.status} message : ${error.message}`);
    }
    else{
      router.navigateByUrl(`/error/${error.status}`);
    }
    return EMPTY;
  }));
};
