import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start logged out', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should login with correct credentials', () => {
    const result = service.login('admin', 'tastea2024');
    expect(result).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should reject wrong username', () => {
    const result = service.login('wrong', 'tastea2024');
    expect(result).toBe(false);
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should reject wrong password', () => {
    const result = service.login('admin', 'wrong');
    expect(result).toBe(false);
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should reject empty credentials', () => {
    const result = service.login('', '');
    expect(result).toBe(false);
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should logout', () => {
    service.login('admin', 'tastea2024');
    expect(service.isLoggedIn()).toBe(true);
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
  });
});
