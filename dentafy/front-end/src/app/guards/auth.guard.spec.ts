import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { authGuard, roleGuard } from './auth.guard';

describe('authGuard', () => {
  let authService: AuthService;
  let router: { navigate: ReturnType<typeof vi.fn> };
  let injector: EnvironmentInjector;

  beforeEach(() => {
    localStorage.clear();
    router = { navigate: vi.fn() };

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: router }],
    });

    authService = TestBed.inject(AuthService);
    injector = TestBed.inject(EnvironmentInjector);
  });

  afterEach(() => localStorage.clear());

  it('returns true when logged in', () => {
    localStorage.setItem('dentafy_token', 'tok');

    const result = runInInjectionContext(injector, () =>
      authGuard({} as any, {} as any),
    );
    expect(result).toBe(true);
  });

  it('returns false and redirects when not logged in', () => {
    const result = runInInjectionContext(injector, () =>
      authGuard({} as any, {} as any),
    );
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

describe('roleGuard', () => {
  let authService: AuthService;
  let router: { navigate: ReturnType<typeof vi.fn> };
  let injector: EnvironmentInjector;

  beforeEach(() => {
    localStorage.clear();
    router = { navigate: vi.fn() };

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: router }],
    });

    authService = TestBed.inject(AuthService);
    injector = TestBed.inject(EnvironmentInjector);
  });

  afterEach(() => localStorage.clear());

  it('returns true for matching role', () => {
    authService.setAuth('tok', { id: '1', email: 'a@b.com', name: 'Doc', role: 'DOCTOR' });

    const guard = roleGuard('DOCTOR');
    const result = runInInjectionContext(injector, () =>
      guard({} as any, {} as any),
    );
    expect(result).toBe(true);
  });

  it('returns false for non-matching role', () => {
    authService.setAuth('tok', { id: '1', email: 'a@b.com', name: 'Cust', role: 'CUSTOMER' });

    const guard = roleGuard('DOCTOR');
    const result = runInInjectionContext(injector, () =>
      guard({} as any, {} as any),
    );
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('returns false when not logged in', () => {
    const guard = roleGuard('DOCTOR');
    const result = runInInjectionContext(injector, () =>
      guard({} as any, {} as any),
    );
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
