import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private formState: BehaviorSubject<string>;
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.formState = new BehaviorSubject<string>('login');
    this._isLoggedIn.next(!!this.getToken()); // Update the initial isLoggedIn value
  }

  get formState$() {
    return this.formState.asObservable();
  }

  changeFormState(state: string): void {
    this.formState.next(state);
  }

  register(username: string, password: string) {
    return this.http.post('/api/auth/register', { username, password });
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>('/api/auth/login', { username, password }).pipe(
      tap(response => {
        this.storeToken(response.token);
        this._isLoggedIn.next(true);
      })
    );
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn.next(false);
    this.router.navigate(['/auth']);
  }
}
