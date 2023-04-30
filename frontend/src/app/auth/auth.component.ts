import { Component, } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {

  formState = 'login';
  formStateSubscription: Subscription;

  registerUsername = '';
  registerPassword = '';
  loginUsername = '';
  loginPassword = '';

  showLoginForm = false;

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  constructor(private authService: AuthService, private router: Router) {
    this.formStateSubscription = new Subscription();
  }

  onRegister() {
    this.authService.register(this.registerUsername, this.registerPassword).subscribe(
      () => {
        alert('Registration successful!');
        this.changeFormState('login');
      },
      (error) => {
        console.error(error);
        alert('Registration failed! Please try again.');
      }
    );
  }
  
  onLogin() {
    this.authService.login(this.loginUsername, this.loginPassword).subscribe(
      (response) => {
        this.authService.storeToken(response.token);
        alert('Login successful!');
        this.router.navigate(['/add-bill']); // Redirect to the desired page after successful login
      },
      (error) => {
        console.error(error);
        alert('Login failed! Please check your credentials and try again.');
      }
    );
  }
  

  ngOnInit(): void {
    this.formStateSubscription = this.authService.formState$.subscribe(state => {
      this.formState = state;
    });
  }

  ngOnDestroy(): void {
    this.formStateSubscription.unsubscribe();
  }

  changeFormState(state: string): void {
    this.formState = state;
  }
  
}
