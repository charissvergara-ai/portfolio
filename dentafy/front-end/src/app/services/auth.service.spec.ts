import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    localStorage.clear();
    router = { navigate: vi.fn() };

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: router }],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => localStorage.clear());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getToken', () => {
    it('returns null when no token stored', () => {
      expect(service.getToken()).toBeNull();
    });

    it('returns the stored token', () => {
      localStorage.setItem('dentafy_token', 'abc123');
      expect(service.getToken()).toBe('abc123');
    });
  });

  describe('isLoggedIn', () => {
    it('returns false when no token', () => {
      expect(service.isLoggedIn()).toBe(false);
    });

    it('returns true when token exists', () => {
      localStorage.setItem('dentafy_token', 'token');
      expect(service.isLoggedIn()).toBe(true);
    });
  });

  describe('setAuth', () => {
    it('stores token and user in localStorage and updates signal', () => {
      const user: AuthUser = { id: '1', email: 'a@b.com', name: 'A', role: 'CUSTOMER' };
      service.setAuth('tok', user);

      expect(localStorage.getItem('dentafy_token')).toBe('tok');
      expect(JSON.parse(localStorage.getItem('dentafy_user')!)).toEqual(user);
      expect(service.user()).toEqual(user);
    });
  });

  describe('logout', () => {
    it('clears storage, resets signal, and navigates to /login', () => {
      const user: AuthUser = { id: '1', email: 'a@b.com', name: 'A', role: 'CUSTOMER' };
      service.setAuth('tok', user);

      service.logout();

      expect(localStorage.getItem('dentafy_token')).toBeNull();
      expect(localStorage.getItem('dentafy_user')).toBeNull();
      expect(service.user()).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('getRole', () => {
    it('returns null when no user', () => {
      expect(service.getRole()).toBeNull();
    });

    it('returns the user role', () => {
      service.setAuth('tok', { id: '1', email: 'a@b.com', name: 'A', role: 'DOCTOR' });
      expect(service.getRole()).toBe('DOCTOR');
    });
  });
});
