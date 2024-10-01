import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../shared/network.service';
import { StorageService } from '../shared/storage.service';
import { catchError, EMPTY, switchMap } from 'rxjs';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const networkService=inject(NetworkService);
  const storageService=inject(StorageService);
  const router=inject(Router);

  let accessToken= storageService.getAccessToken();
  let refreshToken=storageService.getRefreshToken();

  return next(req).pipe((catchError((error:HttpErrorResponse)=>{
    if (error.status==401&&accessToken&&!storageService.isLogin()) {
      return networkService.postRequestToRefreshToken({accessToken:accessToken!,refreshToken:refreshToken!}).pipe(switchMap(()=>{
        const accessToken=storageService.getAccessToken();
        let clone=req.clone({headers:req.headers.set(`Authorization`,`Bearer ${accessToken}`)});
        return next(clone);
      }));
    }
    else if (error.status!=0) {
      console.log('error code:',error.status);
      router.navigateByUrl(`/error/${error.status}`);
    }
    return EMPTY;
  })));

};
