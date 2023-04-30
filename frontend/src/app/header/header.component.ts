import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = this.authService.isLoggedIn();

  constructor(private authService: AuthService, private router: Router) { }

  onLogoClick(){
    this.authService.logout();
  }

  navViewBills(){
    this.router.navigate(['/view-bills'])
  }

  navAddBills(){
    this.router.navigate(['/add-bill'])
  }
}
