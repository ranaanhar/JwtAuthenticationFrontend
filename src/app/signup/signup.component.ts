import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RequestSignup } from '../model/request-signup';
import { ResponseSignup } from '../model/response-signup';
import { formValidation } from '../shared/custom.validator';
import { NetworkService } from '../shared/network.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent implements OnInit{
  constructor(private httpService:NetworkService,private formbuilder:FormBuilder){}


  response?:ResponseSignup;
  isSignup=false;
formarray=new FormGroup({
  username:new FormControl(''),
  email:new FormControl(''),
  phoneNumber:new FormControl(''),
  password:new FormControl(''),
  confirmPassword:new FormControl('')
});



  onSignupClick() {
    this.isSignup=true;
    if (this.formarray.invalid) {
      return;
    }
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

  ngOnInit(): void {
    this.formarray=this.formbuilder.group({
      username:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phoneNumber:['',[Validators.required,Validators.pattern("^9[0-9]{9}$")]],//pattern 9145444261 : ^((\\+98\s?)|0)?[0-9]{10}$
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      confirmPassword:['',Validators.required],
    },
    {
      validators:[ formValidation('password','confirmPassword')]
    }
    );
  }

  public get username(){
    return this.formarray.get('username');
  }

  public get email() {
    return this.formarray.get('email');
  }

  public get phoneNumber() {
    return this.formarray.get('phoneNumber');
  }

  
  public get password() {
    return this.formarray.get('password');
  }
  
  
  public get confirmPassword() {
    return this.formarray.get('confirmPassword');
  }
  
}