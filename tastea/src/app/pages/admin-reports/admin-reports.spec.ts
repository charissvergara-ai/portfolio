import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReports } from './admin-reports';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Router, provideRouter } from '@angular/router';

describe('AdminReports', () => {
  let component: AdminReports;
  let fixture: ComponentFixture<AdminReports>;
  let orderService: OrderService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReports],
      providers: [provideRouter([])]
    }).compileComponents();

    orderService = TestBed.inject(OrderService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AdminReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should seed demo data on init', () => {
    expect(orderService.allOrders().length).toBeGreaterThan(0);
  });

  it('should default to daily period', () => {
    expect(component.activePeriod()).toBe('daily');
  });

  it('should load daily report rows', () => {
    expect(component.rows().length).toBeGreaterThan(0);
  });

  it('should switch to monthly report', () => {
    component.setPeriod('monthly');
    expect(component.activePeriod()).toBe('monthly');
    expect(component.rows().length).toBeGreaterThan(0);
  });

  it('should switch to yearly report', () => {
    component.setPeriod('yearly');
    expect(component.activePeriod()).toBe('yearly');
    expect(component.rows().length).toBeGreaterThan(0);
  });

  it('should compute totals', () => {
    const totals = component.totals();
    expect(totals.label).toBe('Grand Total');
    expect(totals.totalCount).toBeGreaterThan(0);
    expect(totals.totalRevenue).toBeGreaterThan(0);
  });

  it('should have online + dine-in counts equal total', () => {
    const totals = component.totals();
    expect(totals.onlineCount + totals.dineInCount).toBe(totals.totalCount);
  });

  it('should render report table', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Order Reports');
    expect(el.querySelector('table')).toBeTruthy();
    expect(el.textContent).toContain('Grand Total');
  });

  it('should render period tabs', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('daily');
    expect(el.textContent).toContain('monthly');
    expect(el.textContent).toContain('yearly');
  });

  it('should logout and navigate to login', () => {
    jest.spyOn(router, 'navigate').mockResolvedValue(true);
    authService.login('admin', 'tastea2024');
    expect(authService.isLoggedIn()).toBe(true);
    component.logout();
    expect(authService.isLoggedIn()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/admin/login']);
  });

  it('should filter by date range', () => {
    const totalBefore = component.totals().totalCount;
    // Set a very narrow date range far in the past to get fewer results
    component.dateFrom = '2020-01-01';
    component.dateTo = '2020-01-31';
    component.applyDateFilter();
    expect(component.totals().totalCount).toBe(0);
    // Clear and verify all data is back
    component.clearDateFilter();
    expect(component.totals().totalCount).toBe(totalBefore);
  });

  it('should reset page when applying date filter', () => {
    component.goToPage(2);
    component.applyDateFilter();
    expect(component.currentPage()).toBe(1);
  });

  it('should track hasDateFilter', () => {
    expect(component.hasDateFilter).toBe(false);
    component.dateFrom = '2026-01-01';
    expect(component.hasDateFilter).toBe(true);
    component.clearDateFilter();
    expect(component.hasDateFilter).toBe(false);
  });

  it('should export CSV', () => {
    URL.createObjectURL = jest.fn().mockReturnValue('blob:test');
    URL.revokeObjectURL = jest.fn();
    const mockAnchor = { href: '', download: '', click: jest.fn() };
    const originalCreate = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') return mockAnchor as unknown as HTMLAnchorElement;
      return originalCreate(tag);
    });

    component.exportCSV();

    expect(mockAnchor.click).toHaveBeenCalled();
    expect(mockAnchor.download).toContain('tastea-daily-report.csv');
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');

    (document.createElement as jest.Mock).mockRestore();
  });

  it('should render date inputs and export button', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('input[type="date"]').length).toBe(2);
    expect(el.textContent).toContain('Export CSV');
  });
});
