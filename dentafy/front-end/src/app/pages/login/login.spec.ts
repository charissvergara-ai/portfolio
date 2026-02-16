import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Login } from './login';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

describe('Login', () => {
  let apiService: { login: ReturnType<typeof vi.fn> };
  let authService: { isLoggedIn: ReturnType<typeof vi.fn>; getRole: ReturnType<typeof vi.fn>; setAuth: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(async () => {
    localStorage.clear();
    apiService = { login: vi.fn() };
    authService = { isLoggedIn: vi.fn().mockReturnValue(false), getRole: vi.fn(), setAuth: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        { provide: ApiService, useValue: apiService },
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  afterEach(() => localStorage.clear());

  it('should create', () => {
    const fixture = TestBed.createComponent(Login);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have email and password form controls', () => {
    const fixture = TestBed.createComponent(Login);
    const comp = fixture.componentInstance;
    expect(comp.loginForm.contains('email')).toBe(true);
    expect(comp.loginForm.contains('password')).toBe(true);
  });

  it('should mark form invalid when empty', () => {
    const fixture = TestBed.createComponent(Login);
    expect(fixture.componentInstance.loginForm.valid).toBe(false);
  });

  it('should mark form valid with proper values', () => {
    const fixture = TestBed.createComponent(Login);
    const comp = fixture.componentInstance;
    comp.loginForm.setValue({ email: 'test@test.com', password: 'pass123' });
    expect(comp.loginForm.valid).toBe(true);
  });

  it('should not call API on invalid form submit', () => {
    const fixture = TestBed.createComponent(Login);
    fixture.componentInstance.onSubmit();
    expect(apiService.login).not.toHaveBeenCalled();
  });

  it('should call API and setAuth on valid submit', () => {
    const fixture = TestBed.createComponent(Login);
    const comp = fixture.componentInstance;
    const payload = { token: 'tok', user: { id: '1', email: 't@t.com', name: 'T', role: 'CUSTOMER' } };
    apiService.login.mockReturnValue(of(payload));

    comp.loginForm.setValue({ email: 't@t.com', password: 'pass' });
    comp.onSubmit();

    expect(apiService.login).toHaveBeenCalledWith('t@t.com', 'pass');
    expect(authService.setAuth).toHaveBeenCalledWith('tok', payload.user);
    expect(router.navigate).toHaveBeenCalledWith(['/customer']);
  });

  it('should navigate to /doctor for DOCTOR role', () => {
    const fixture = TestBed.createComponent(Login);
    const comp = fixture.componentInstance;
    const payload = { token: 'tok', user: { id: '1', email: 'd@d.com', name: 'D', role: 'DOCTOR' } };
    apiService.login.mockReturnValue(of(payload));

    comp.loginForm.setValue({ email: 'd@d.com', password: 'pass' });
    comp.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/doctor']);
  });

  it('should set error on failed login', () => {
    const fixture = TestBed.createComponent(Login);
    const comp = fixture.componentInstance;
    apiService.login.mockReturnValue(throwError(() => new Error('fail')));

    comp.loginForm.setValue({ email: 'a@b.com', password: 'wrong' });
    comp.onSubmit();

    expect(comp.error()).toBe('Invalid email or password.');
    expect(comp.submitting()).toBe(false);
  });
});
