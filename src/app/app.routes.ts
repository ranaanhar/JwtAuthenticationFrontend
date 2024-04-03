import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'',component:LoginComponent},
    {path:'Signup',component:SignupComponent},
    {path:'error',redirectTo:'error/',pathMatch:'full'},
    {path:'error/:id',component:ErrorPageComponent},
    {path:'**',redirectTo:'error/',pathMatch:'full'}
];
