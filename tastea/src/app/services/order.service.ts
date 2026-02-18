import { Injectable, signal, computed } from '@angular/core';
import { OrderDetails, OrderStatus, OrderType } from '../models/menu.model';
import { MENU_ITEMS } from '../data/menu-data';

export interface ReportRow {
  label: string;
  onlineCount: number;
  dineInCount: number;
  totalCount: number;
  onlineRevenue: number;
  dineInRevenue: number;
  totalRevenue: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders = signal<OrderDetails[]>([]);

  readonly allOrders = computed(() => this.orders());
  readonly pendingOrders = computed(() =>
    this.orders().filter(o => o.status === 'pending')
  );
  readonly preparingOrders = computed(() =>
    this.orders().filter(o => o.status === 'preparing')
  );
  readonly readyOrders = computed(() =>
    this.orders().filter(o => o.status === 'ready')
  );
  readonly completedOrders = computed(() =>
    this.orders().filter(o => o.status === 'completed')
  );
  readonly onlineOrders = computed(() =>
    this.orders().filter(o => o.orderType === 'online')
  );
  readonly dineInOrders = computed(() =>
    this.orders().filter(o => o.orderType === 'dine-in')
  );
  readonly todayRevenue = computed(() =>
    this.orders()
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0)
  );

  addOrder(order: OrderDetails): void {
    this.orders.update(orders => [order, ...orders]);
  }

  updateStatus(orderId: string, status: OrderStatus): void {
    this.orders.update(orders =>
      orders.map(o => o.id === orderId ? { ...o, status } : o)
    );
  }

  getOrder(orderId: string): OrderDetails | undefined {
    return this.orders().find(o => o.id === orderId);
  }

  getOrderByNumber(orderNumber: string): OrderDetails | undefined {
    return this.orders().find(o => o.orderNumber === orderNumber);
  }

  // --- Reporting ---

  getActiveOrders(from?: Date, to?: Date): OrderDetails[] {
    let result = this.orders().filter(o => o.status !== 'cancelled');
    if (from) {
      const start = new Date(from);
      start.setHours(0, 0, 0, 0);
      result = result.filter(o => new Date(o.createdAt) >= start);
    }
    if (to) {
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      result = result.filter(o => new Date(o.createdAt) <= end);
    }
    return result;
  }

  getDailyReport(from?: Date, to?: Date): ReportRow[] {
    const active = this.getActiveOrders(from, to);
    const grouped = new Map<string, OrderDetails[]>();

    for (const order of active) {
      const key = this.formatDate(order.createdAt);
      const group = grouped.get(key) ?? [];
      group.push(order);
      grouped.set(key, group);
    }

    return this.buildRows(grouped);
  }

  getMonthlyReport(from?: Date, to?: Date): ReportRow[] {
    const active = this.getActiveOrders(from, to);
    const grouped = new Map<string, OrderDetails[]>();

    for (const order of active) {
      const d = new Date(order.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const group = grouped.get(key) ?? [];
      group.push(order);
      grouped.set(key, group);
    }

    const rows = this.buildRows(grouped);
    // Format labels nicely
    return rows.map(r => ({
      ...r,
      label: this.formatMonthLabel(r.label)
    }));
  }

  getYearlyReport(from?: Date, to?: Date): ReportRow[] {
    const active = this.getActiveOrders(from, to);
    const grouped = new Map<string, OrderDetails[]>();

    for (const order of active) {
      const key = String(new Date(order.createdAt).getFullYear());
      const group = grouped.get(key) ?? [];
      group.push(order);
      grouped.set(key, group);
    }

    return this.buildRows(grouped);
  }

  getTotals(rows: ReportRow[]): ReportRow {
    return rows.reduce(
      (acc, r) => ({
        label: 'Grand Total',
        onlineCount: acc.onlineCount + r.onlineCount,
        dineInCount: acc.dineInCount + r.dineInCount,
        totalCount: acc.totalCount + r.totalCount,
        onlineRevenue: acc.onlineRevenue + r.onlineRevenue,
        dineInRevenue: acc.dineInRevenue + r.dineInRevenue,
        totalRevenue: acc.totalRevenue + r.totalRevenue,
      }),
      { label: 'Grand Total', onlineCount: 0, dineInCount: 0, totalCount: 0, onlineRevenue: 0, dineInRevenue: 0, totalRevenue: 0 }
    );
  }

  private buildRows(grouped: Map<string, OrderDetails[]>): ReportRow[] {
    const rows: ReportRow[] = [];

    for (const [label, orders] of grouped) {
      const online = orders.filter(o => o.orderType === 'online');
      const dineIn = orders.filter(o => o.orderType === 'dine-in');
      rows.push({
        label,
        onlineCount: online.length,
        dineInCount: dineIn.length,
        totalCount: orders.length,
        onlineRevenue: online.reduce((s, o) => s + o.total, 0),
        dineInRevenue: dineIn.reduce((s, o) => s + o.total, 0),
        totalRevenue: orders.reduce((s, o) => s + o.total, 0),
      });
    }

    return rows.sort((a, b) => b.label.localeCompare(a.label));
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private formatMonthLabel(key: string): string {
    const [year, month] = key.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  }

  // --- Seed demo data ---

  seedDemoData(): void {
    if (this.orders().length > 0) return;

    const names = ['Alice Wong', 'Bob Martinez', 'Clara Kim', 'David Chen', 'Emma Patel', 'Frank Obi', 'Grace Liu', 'Henry Park'];
    const types: OrderType[] = ['online', 'dine-in'];
    const statuses: OrderStatus[] = ['completed', 'completed', 'completed', 'pending', 'preparing', 'ready'];
    const payments: ('cash' | 'card')[] = ['card', 'card', 'cash'];
    const items = MENU_ITEMS;

    const orders: OrderDetails[] = [];

    // Generate orders across the past 14 months
    for (let monthsAgo = 0; monthsAgo < 14; monthsAgo++) {
      const ordersThisMonth = monthsAgo === 0 ? 12 : 6 + Math.floor(Math.random() * 8);

      for (let i = 0; i < ordersThisMonth; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - monthsAgo);
        date.setDate(1 + Math.floor(Math.random() * 27));
        date.setHours(8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60));

        const orderType = types[Math.floor(Math.random() * types.length)];
        const status = monthsAgo === 0 ? statuses[Math.floor(Math.random() * statuses.length)] : 'completed';
        const payment = payments[Math.floor(Math.random() * payments.length)];
        const name = names[Math.floor(Math.random() * names.length)];

        const itemCount = 1 + Math.floor(Math.random() * 3);
        const orderItems = [];
        for (let j = 0; j < itemCount; j++) {
          const menuItem = items[Math.floor(Math.random() * items.length)];
          orderItems.push({
            menuItem,
            quantity: 1 + Math.floor(Math.random() * 2),
            specialInstructions: ''
          });
        }

        const subtotal = orderItems.reduce((s, it) => s + it.menuItem.price * it.quantity, 0);
        const tax = subtotal * 0.08;

        orders.push({
          id: crypto.randomUUID(),
          orderNumber: 'TT-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          name,
          email: name.toLowerCase().replace(' ', '.') + '@email.com',
          phone: `(503) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
          pickupTime: `${8 + Math.floor(Math.random() * 10)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
          orderType,
          paymentMethod: payment,
          items: orderItems,
          subtotal: Math.round(subtotal * 100) / 100,
          tax: Math.round(tax * 100) / 100,
          total: Math.round((subtotal + tax) * 100) / 100,
          status,
          createdAt: date
        });
      }
    }

    orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.orders.set(orders);
  }
}
