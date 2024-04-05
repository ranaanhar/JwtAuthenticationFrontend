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
// export function checkValidation():ValidatorFn{
//   return (control:AbstractControl):ValidationErrors | null => {
//     console.log(`in checkValidation.`);
//     const pass=Number(control.value);
//     const confirm=pass>10;
//     if(pass){
//       return confirm?null:{foo:true};
//     }
//     return null;
//   }
// }


// export function formValidation(firstControlName:string,secondControlName:string):ValidatorFn{
//   return(formGroup:AbstractControl):ValidationErrors|null=>{
//     console.log(`in form validation.`);
//     var pass=formGroup.get(firstControlName);
//     var confirm=formGroup.get(secondControlName);

//     if (!(pass&&confirm)) {
//       return null;
//     }

//     if (confirm.errors) {
//       return null;
//     }

//     if (confirm.value !==pass.value) {
//       confirm.setErrors({missmatch:true});
//       return {missmatch:true};
//     }else{
//       confirm.setErrors(null);
//       return null;
//     }
//   }
// }



// export function creatDateRangeValidator(){
//   return (form: FormGroup): ValidationErrors | null => {

//       const start:string = form.get("username")?.value;

//       const end:string = form.get("password")?.value;

//       if (start && end) {
//           const isRangeValid = (end == start);

//           return isRangeValid ? null :{matching:true};
//       }

//       return null;
//   }

// }