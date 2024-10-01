import { HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';
import { NetworkService } from '../shared/network.service';
import { StorageService } from '../shared/storage.service';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService=inject(StorageService);

  let accessToken= storageService.getAccessToken();
  if (storageService.isLogin()&&accessToken) {
    let clone=req.clone({headers:req.headers.set(`Authorization`,`Bearer ${accessToken}`)});
    req=clone;
  }

  return next(req);

};

