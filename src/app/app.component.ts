import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'JwtAuthenticationFrontend';
  showHeaderFooter=true;

  constructor(router:Router){
    router.events.forEach((event)=>{
      if (event instanceof NavigationStart) {
        if (event['url']=='/login'||event['url']=='/signup') {
          this.showHeaderFooter=false;
        }
        else{
          this.showHeaderFooter=true;
        }
      }
    });
  }
}
