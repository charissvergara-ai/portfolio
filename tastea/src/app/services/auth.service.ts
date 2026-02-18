import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = signal(false);

  readonly isLoggedIn = computed(() => this.loggedIn());

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'tastea2024') {
      this.loggedIn.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.set(false);
  }
}
