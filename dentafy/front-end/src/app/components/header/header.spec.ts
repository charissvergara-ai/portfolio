import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';
import { AuthService } from '../../services/auth.service';

describe('Header', () => {
  let authService: { getRole: ReturnType<typeof vi.fn>; user: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authService = {
      getRole: vi.fn(),
      user: vi.fn().mockReturnValue(null),
    };

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Header);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should return /doctor for DOCTOR role', () => {
    authService.getRole.mockReturnValue('DOCTOR');
    const fixture = TestBed.createComponent(Header);
    expect(fixture.componentInstance.dashboardLink).toBe('/doctor');
  });

  it('should return /customer for CUSTOMER role', () => {
    authService.getRole.mockReturnValue('CUSTOMER');
    const fixture = TestBed.createComponent(Header);
    expect(fixture.componentInstance.dashboardLink).toBe('/customer');
  });

  it('should return /customer for null role', () => {
    authService.getRole.mockReturnValue(null);
    const fixture = TestBed.createComponent(Header);
    expect(fixture.componentInstance.dashboardLink).toBe('/customer');
  });
});
