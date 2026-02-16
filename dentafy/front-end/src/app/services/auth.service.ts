import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<AuthUser | null>(this.loadUser());

  constructor(private router: Router) {}

  private loadUser(): AuthUser | null {
    const stored = localStorage.getItem('dentafy_user');
    return stored ? JSON.parse(stored) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('dentafy_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    return this.user()?.role ?? null;
  }

  setAuth(token: string, user: AuthUser): void {
    localStorage.setItem('dentafy_token', token);
    localStorage.setItem('dentafy_user', JSON.stringify(user));
    this.user.set(user);
  }

  logout(): void {
    localStorage.removeItem('dentafy_token');
    localStorage.removeItem('dentafy_user');
    this.user.set(null);
    this.router.navigate(['/login']);
  }
}
