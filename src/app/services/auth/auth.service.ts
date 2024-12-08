import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authorizedSource = new BehaviorSubject<boolean>(false);
  authorized$ = this.authorizedSource.asObservable();
  private API_URL = 'http://localhost:3000';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {
    if (this.isPlatformBrowser()) {
      const isLoggedIn = this.isLoggedInFromStorage();
      this.authorizedSource.next(isLoggedIn);
    }
  }

  isAuthorized(): boolean {
    return this.authorizedSource.getValue();
  }

  private isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private isLoggedInFromStorage(): boolean {
    if (!this.isPlatformBrowser()) {
      return false;
    }
    return !!sessionStorage.getItem('user_token');
  }

  async login(email: string, password: string) {
    try {
      const response = await fetch(`${this.API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const res = await response.json();
      if (this.isPlatformBrowser()) {
        sessionStorage.setItem('user_token', res.token);
        sessionStorage.setItem('user_email', email);
      }
      this.authorizedSource.next(true);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      const response = await fetch(`${this.API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error('Registration error:', result.error);
        throw new Error(result.error || 'Registration failed');
      }

      alert('Registration successful! Please log in.');
    } catch (error: unknown) {
      console.error('Error during registration:', error);
      return Promise.reject(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  }

  async logout() {
    try {
      const email = this.isPlatformBrowser() ? sessionStorage.getItem('user_email') : null;
      if (!email) {
        throw new Error('No user email found for logout');
      }

      const response = await fetch(`${this.API_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      if (this.isPlatformBrowser()) {
        sessionStorage.removeItem('user_token');
        sessionStorage.removeItem('user_email');
      }
      this.authorizedSource.next(false);
      this.router.navigate(['/login']);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  }

  getUser(): { email: string | null } | null {
    if (this.isPlatformBrowser()) {
      const email = sessionStorage.getItem('user_email');
      return email ? { email } : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInFromStorage();
  }
}
