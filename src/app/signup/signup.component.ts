import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RequestSignup } from '../request-signup';
import { ResponseSignup } from '../response-signup';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private httpService:AuthenticationService,private formbuilder:FormBuilder){}

  response?:ResponseSignup;
formarray=this.formbuilder.group({
  username:['',Validators.required],
  email:['',Validators.required],
  phoneNumber:['',Validators.required],
  password:['',Validators.required],
  confirmPassword:['',Validators.required]
});



  onSignupClick() {
    const request:RequestSignup=
    {
      username:this.formarray.value.username!,
      email:this.formarray.value.email!,
      phonenumber:this.formarray.value.phoneNumber!,
      password:this.formarray.value.password!
    }
    this.httpService.postRequestToSignup(request).subscribe(response=>{
      this.response=response;
      //todo
      //redirect user to home/url
    });

  }

}
