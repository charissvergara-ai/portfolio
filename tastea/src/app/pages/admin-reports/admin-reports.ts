import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService, ReportRow } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

type ReportPeriod = 'daily' | 'monthly' | 'yearly';

@Component({
  selector: 'app-admin-reports',
  imports: [CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './admin-reports.html',
  styleUrl: './admin-reports.css'
})
export class AdminReports implements OnInit {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private router = inject(Router);

  activePeriod = signal<ReportPeriod>('daily');
  currentPage = signal(1);
  pageSize = 10;
  dateFrom = '';
  dateTo = '';
  rows = signal<ReportRow[]>([]);
  totals = signal<ReportRow>({
    label: 'Grand Total',
    onlineCount: 0,
    dineInCount: 0,
    totalCount: 0,
    onlineRevenue: 0,
    dineInRevenue: 0,
    totalRevenue: 0
  });

  ngOnInit(): void {
    this.orderService.seedDemoData();
    this.loadReport();
  }

  get totalPages(): number {
    return Math.ceil(this.rows().length / this.pageSize);
  }

  get paginatedRows(): ReportRow[] {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.rows().slice(start, start + this.pageSize);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.currentPage();
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    const end = Math.min(total, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage.set(page);
  }

  yearFrom = '';
  yearTo = '';

  setPeriod(period: ReportPeriod): void {
    this.activePeriod.set(period);
    this.dateFrom = '';
    this.dateTo = '';
    this.yearFrom = '';
    this.yearTo = '';
    this.currentPage.set(1);
    this.loadReport();
  }

  applyDateFilter(): void {
    this.currentPage.set(1);
    this.loadReport();
  }

  clearDateFilter(): void {
    this.dateFrom = '';
    this.dateTo = '';
    this.yearFrom = '';
    this.yearTo = '';
    this.currentPage.set(1);
    this.loadReport();
  }

  get hasDateFilter(): boolean {
    if (this.activePeriod() === 'yearly') {
      return this.yearFrom !== '' || this.yearTo !== '';
    }
    return this.dateFrom !== '' || this.dateTo !== '';
  }

  private getFromDate(): Date | undefined {
    const period = this.activePeriod();
    if (period === 'yearly') {
      return this.yearFrom ? new Date(Number(this.yearFrom), 0, 1) : undefined;
    }
    if (period === 'monthly' && this.dateFrom) {
      // dateFrom is "YYYY-MM"
      const [y, m] = this.dateFrom.split('-').map(Number);
      return new Date(y, m - 1, 1);
    }
    return this.dateFrom ? new Date(this.dateFrom) : undefined;
  }

  private getToDate(): Date | undefined {
    const period = this.activePeriod();
    if (period === 'yearly') {
      return this.yearTo ? new Date(Number(this.yearTo), 11, 31) : undefined;
    }
    if (period === 'monthly' && this.dateTo) {
      // dateTo is "YYYY-MM", set to last day of that month
      const [y, m] = this.dateTo.split('-').map(Number);
      return new Date(y, m, 0); // day 0 of next month = last day of this month
    }
    return this.dateTo ? new Date(this.dateTo) : undefined;
  }

  loadReport(): void {
    const from = this.getFromDate();
    const to = this.getToDate();
    let data: ReportRow[];
    switch (this.activePeriod()) {
      case 'daily':
        data = this.orderService.getDailyReport(from, to);
        break;
      case 'monthly':
        data = this.orderService.getMonthlyReport(from, to);
        break;
      case 'yearly':
        data = this.orderService.getYearlyReport(from, to);
        break;
    }
    this.rows.set(data);
    this.totals.set(this.orderService.getTotals(data));
  }

  exportCSV(): void {
    const allRows = this.rows();
    const tot = this.totals();
    const header = 'Period,Online Orders,Dine-In Orders,Total Orders,Online Revenue,Dine-In Revenue,Total Revenue';
    const lines = allRows.map(r =>
      `${r.label},${r.onlineCount},${r.dineInCount},${r.totalCount},${r.onlineRevenue.toFixed(2)},${r.dineInRevenue.toFixed(2)},${r.totalRevenue.toFixed(2)}`
    );
    lines.push(`${tot.label},${tot.onlineCount},${tot.dineInCount},${tot.totalCount},${tot.onlineRevenue.toFixed(2)},${tot.dineInRevenue.toFixed(2)},${tot.totalRevenue.toFixed(2)}`);
    const csv = [header, ...lines].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tastea-${this.activePeriod()}-report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
