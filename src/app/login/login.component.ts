import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestLogin } from '../model/request-login';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResponseLogin } from '../model/response-login';
import { NetworkService } from '../shared/network.service';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(private httpService:NetworkService,private storageService:StorageService,private formBuilder:FormBuilder){}
 
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
    var user=this.formarray.value.username;
    var pass=this.formarray.value.password;
    var request:RequestLogin={usernameoremail:user!,password:pass!};

    this.httpService.postRequestToLogin(request).subscribe(result=>{
      this.response=result;
      this.storageService.saveLoginStateToStorage(result);
      this.changeState();
    });
  }


  ngOnInit(): void {
    this.formarray=this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(25)]]
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

  onFacebookClick() {}


  onGoogleClick() {}
}
