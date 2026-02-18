import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLogin } from './admin-login';
import { AuthService } from '../../services/auth.service';
import { Router, provideRouter } from '@angular/router';

describe('AdminLogin', () => {
  let component: AdminLogin;
  let fixture: ComponentFixture<AdminLogin>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    jest.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [AdminLogin],
      providers: [provideRouter([])]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AdminLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error for empty fields', () => {
    component.username = '';
    component.password = '';
    component.onSubmit();
    expect(component.error()).toBe('Please fill in all fields.');
  });

  it('should show loading state during login', () => {
    jest.spyOn(router, 'navigate').mockResolvedValue(true);
    component.username = 'admin';
    component.password = 'tastea2024';
    component.onSubmit();
    expect(component.loading()).toBe(true);
    jest.advanceTimersByTime(800);
    expect(component.loading()).toBe(false);
  });

  it('should navigate to admin on successful login', () => {
    jest.spyOn(router, 'navigate').mockResolvedValue(true);
    component.username = 'admin';
    component.password = 'tastea2024';
    component.onSubmit();
    jest.advanceTimersByTime(800);
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    expect(authService.isLoggedIn()).toBe(true);
  });

  it('should show error on failed login', () => {
    component.username = 'admin';
    component.password = 'wrongpassword';
    component.onSubmit();
    jest.advanceTimersByTime(800);
    expect(component.error()).toBe('Invalid username or password.');
    expect(authService.isLoggedIn()).toBe(false);
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword()).toBe(false);
    component.togglePassword();
    expect(component.showPassword()).toBe(true);
    component.togglePassword();
    expect(component.showPassword()).toBe(false);
  });

  it('should render login form', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Tastea Admin');
    expect(el.textContent).toContain('Sign in to manage orders');
    expect(el.querySelector('input#username')).toBeTruthy();
    expect(el.querySelector('input#password')).toBeTruthy();
  });
});
