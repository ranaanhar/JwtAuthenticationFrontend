import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor(private storageService:StorageService){}
// isLogin=false;
checkLogin(){
  try{
    return this.storageService.isLogin();
  }catch{}
  return false;
}

getUsername(){
  let username=this.storageService.getUsername();
  console.log(username);
  return username;
}

LogOut(){
  this.storageService.logout();
  // this.router.navigateByUrl('/login');
}

ngOnInit(){

}
}
