import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { RequestLogin } from '../request-login';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ResponseLogin } from '../response-login';
import { ResponseSignup } from '../response-signup';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private httpService:AuthenticationService,private formBuilder:FormBuilder){}


response?:ResponseLogin;

  formarray=this.formBuilder.group({
    username:['',Validators.required],
    password:['',[Validators.required,Validators.minLength(6)]]
  });

  public onSubmitClick(){
    var user=this.formarray.value.username;
    var pass=this.formarray.value.password;
    var request:RequestLogin={usernameoremail:user!,password:pass!};

    this.httpService.postRequestToLogin(request).subscribe(result=>{
      this.response=result;
      this.httpService.login(result);
      this.changeState();
    });
  }

  changeState(){
    //change users login/logout state
  }

  onFacebookClick() {}


  onGoogleClick() {}
}
