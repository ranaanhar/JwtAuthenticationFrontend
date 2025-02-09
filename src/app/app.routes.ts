import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:'Home'},
    {path:'signup',component:SignupComponent,title:'Sign up'},
    {path:'error',redirectTo:'error/',pathMatch:'full'},
    {path:'error/:id',component:ErrorPageComponent},
    {path:'privacy',component:PrivacyComponent},
    {path:'profile',component:ProfileComponent,title:'Profile'},
    {path:'**',redirectTo:'error/',pathMatch:'full'}
];
