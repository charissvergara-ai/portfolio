import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderDetails, OrderStatus } from '../../models/menu.model';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CurrencyPipe, DatePipe, RouterLink, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
  orderService = inject(OrderService);
  private authService = inject(AuthService);
  private router = inject(Router);

  activeTab = signal<'all' | 'online' | 'dine-in'>('all');
  filterStatus = signal<OrderStatus | 'all'>('all');
  currentPage = signal(1);
  pageSize = 10;
  dateFrom = '';
  dateTo = '';

  get filteredOrders(): OrderDetails[] {
    let orders = this.orderService.allOrders();
    const tab = this.activeTab();
    const status = this.filterStatus();

    if (this.dateFrom) {
      const start = new Date(this.dateFrom);
      start.setHours(0, 0, 0, 0);
      orders = orders.filter(o => new Date(o.createdAt) >= start);
    }
    if (this.dateTo) {
      const end = new Date(this.dateTo);
      end.setHours(23, 59, 59, 999);
      orders = orders.filter(o => new Date(o.createdAt) <= end);
    }

    if (tab === 'online') orders = orders.filter(o => o.orderType === 'online');
    if (tab === 'dine-in') orders = orders.filter(o => o.orderType === 'dine-in');
    if (status !== 'all') orders = orders.filter(o => o.status === status);

    return orders;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredOrders.length / this.pageSize);
  }

  get paginatedOrders(): OrderDetails[] {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredOrders.slice(start, start + this.pageSize);
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

  applyDateFilter(): void {
    this.currentPage.set(1);
  }

  clearDateFilter(): void {
    this.dateFrom = '';
    this.dateTo = '';
    this.currentPage.set(1);
  }

  get hasDateFilter(): boolean {
    return this.dateFrom !== '' || this.dateTo !== '';
  }

  setTab(tab: 'all' | 'online' | 'dine-in'): void {
    this.activeTab.set(tab);
    this.currentPage.set(1);
  }

  setFilter(status: OrderStatus | 'all'): void {
    this.filterStatus.set(status);
    this.currentPage.set(1);
  }

  updateStatus(orderId: string, status: OrderStatus): void {
    this.orderService.updateStatus(orderId, status);
  }

  getStatusColor(status: OrderStatus): string {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-accent-100 text-accent-700';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  }

  getNextStatus(status: OrderStatus): OrderStatus | null {
    switch (status) {
      case 'pending': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'completed';
      default: return null;
    }
  }

  getNextStatusLabel(status: OrderStatus): string {
    switch (status) {
      case 'pending': return 'Start Preparing';
      case 'preparing': return 'Mark Ready';
      case 'ready': return 'Complete';
      default: return '';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
