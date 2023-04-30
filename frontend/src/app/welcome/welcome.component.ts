import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  showLogin(): void {
    this.authService.changeFormState('login');
    this.router.navigate(['/auth']);
  }

  showRegister(): void {
    this.authService.changeFormState('register');
    this.router.navigate(['/auth']);
  }
}
