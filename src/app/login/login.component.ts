import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestLogin } from '../model/request-login';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResponseLogin } from '../model/response-login';
import { NetworkService } from '../shared/network.service';
import { StorageService } from '../shared/storage.service';
import { response } from 'express';
import { RequestRefreshToken } from '../model/request-refresh-token';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(private networkService:NetworkService,private storageService:StorageService,private formBuilder:FormBuilder){}

  isSubmit=false;

response?:ResponseLogin;
formarray=new FormGroup({
  username:new FormControl(''),
  password:new FormControl('')
});


  public onSubmitClick(){
    this.isSubmit=true;
    if (this.formarray.invalid) {
      return;
    }
    let user=this.formarray.value.username;
    let pass=this.formarray.value.password;
    let request:RequestLogin={usernameoremail:user!,password:pass!};

    this.networkService.postRequestToLogin(request).subscribe(result=>{
      this.response=result;
      this.storageService.saveLoginStateToStorage(result);
      this.changeState();
    });
  }


  ngOnInit(): void {
    this.formarray=this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(50)]]
    });
  }

  get username(){
    return this.formarray.get('username');
  }
  get password(){
    return this.formarray.get('password');
  }

  changeState(){
    //change users login/logout state
  }

  onFacebookClick() {
      this.networkService.testAuthorizedMethod().subscribe(rr=>{
        console.log('result: ',rr);
      });
  }


  onGoogleClick() {
    // let _accessToken=this.storageService.getAccessToken();
    // let _refreshToken=this.storageService.getRefreshToken();
    // if (!_accessToken&&!_refreshToken) {
    //   return;
    // }
    // let request:RequestRefreshToken={accessToken:_accessToken!,refreshToken:_refreshToken!}
    // this.networkService.postRequestToRefreshToken(request).subscribe(result=>{console.log(result);});
    this.networkService.testUnAuthorizedMethod().subscribe(result=>{
      console.log('we cannot see result');
    });
  }
}
