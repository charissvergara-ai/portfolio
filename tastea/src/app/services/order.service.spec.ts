import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { OrderDetails } from '../models/menu.model';

describe('OrderService', () => {
  let service: OrderService;

  const createMockOrder = (overrides: Partial<OrderDetails> = {}): OrderDetails => ({
    id: 'order-1',
    orderNumber: 'TT-ABC123',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-0142',
    pickupTime: '14:00',
    orderType: 'online',
    paymentMethod: 'card',
    items: [],
    subtotal: 11.50,
    tax: 0.92,
    total: 12.42,
    status: 'pending',
    createdAt: new Date(),
    ...overrides
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no orders', () => {
    expect(service.allOrders().length).toBe(0);
  });

  it('should add an order', () => {
    service.addOrder(createMockOrder());
    expect(service.allOrders().length).toBe(1);
    expect(service.allOrders()[0].orderNumber).toBe('TT-ABC123');
  });

  it('should add new orders to the front', () => {
    service.addOrder(createMockOrder({ id: 'order-1', orderNumber: 'TT-FIRST' }));
    service.addOrder(createMockOrder({ id: 'order-2', orderNumber: 'TT-SECOND' }));
    expect(service.allOrders()[0].orderNumber).toBe('TT-SECOND');
  });

  it('should filter pending orders', () => {
    service.addOrder(createMockOrder({ id: '1', status: 'pending' }));
    service.addOrder(createMockOrder({ id: '2', status: 'preparing' }));
    expect(service.pendingOrders().length).toBe(1);
  });

  it('should filter preparing orders', () => {
    service.addOrder(createMockOrder({ id: '1', status: 'preparing' }));
    service.addOrder(createMockOrder({ id: '2', status: 'ready' }));
    expect(service.preparingOrders().length).toBe(1);
  });

  it('should filter ready orders', () => {
    service.addOrder(createMockOrder({ id: '1', status: 'ready' }));
    service.addOrder(createMockOrder({ id: '2', status: 'completed' }));
    expect(service.readyOrders().length).toBe(1);
  });

  it('should filter completed orders', () => {
    service.addOrder(createMockOrder({ id: '1', status: 'completed' }));
    service.addOrder(createMockOrder({ id: '2', status: 'pending' }));
    expect(service.completedOrders().length).toBe(1);
  });

  it('should filter online orders', () => {
    service.addOrder(createMockOrder({ id: '1', orderType: 'online' }));
    service.addOrder(createMockOrder({ id: '2', orderType: 'dine-in' }));
    expect(service.onlineOrders().length).toBe(1);
  });

  it('should filter dine-in orders', () => {
    service.addOrder(createMockOrder({ id: '1', orderType: 'online' }));
    service.addOrder(createMockOrder({ id: '2', orderType: 'dine-in' }));
    expect(service.dineInOrders().length).toBe(1);
  });

  it('should calculate today revenue excluding cancelled', () => {
    service.addOrder(createMockOrder({ id: '1', total: 10, status: 'completed' }));
    service.addOrder(createMockOrder({ id: '2', total: 15, status: 'pending' }));
    service.addOrder(createMockOrder({ id: '3', total: 20, status: 'cancelled' }));
    expect(service.todayRevenue()).toBe(25);
  });

  it('should update order status', () => {
    service.addOrder(createMockOrder({ id: 'order-1', status: 'pending' }));
    service.updateStatus('order-1', 'preparing');
    expect(service.allOrders()[0].status).toBe('preparing');
  });

  it('should get order by id', () => {
    service.addOrder(createMockOrder({ id: 'order-1' }));
    expect(service.getOrder('order-1')).toBeDefined();
    expect(service.getOrder('nonexistent')).toBeUndefined();
  });

  it('should get order by order number', () => {
    service.addOrder(createMockOrder({ orderNumber: 'TT-XYZ789' }));
    expect(service.getOrderByNumber('TT-XYZ789')).toBeDefined();
    expect(service.getOrderByNumber('TT-NOPE')).toBeUndefined();
  });

  it('should filter active orders by date range (from)', () => {
    service.addOrder(createMockOrder({ id: '1', status: 'completed', createdAt: new Date('2026-01-15') }));
    service.addOrder(createMockOrder({ id: '2', status: 'completed', createdAt: new Date('2026-02-10') }));
    const result = service.getActiveOrders(new Date('2026-02-01'));
    expect(result.length).toBe(1);
  });

  it('should filter active orders by date range (to)', () => {
    service.addOrder(createMockOrder({ id: '1', status: 'completed', createdAt: new Date('2026-01-15') }));
    service.addOrder(createMockOrder({ id: '2', status: 'completed', createdAt: new Date('2026-02-10') }));
    const result = service.getActiveOrders(undefined, new Date('2026-01-31'));
    expect(result.length).toBe(1);
  });

  it('should filter active orders by full date range', () => {
    service.addOrder(createMockOrder({ id: '1', status: 'completed', createdAt: new Date('2026-01-10') }));
    service.addOrder(createMockOrder({ id: '2', status: 'completed', createdAt: new Date('2026-01-20') }));
    service.addOrder(createMockOrder({ id: '3', status: 'completed', createdAt: new Date('2026-02-05') }));
    const result = service.getActiveOrders(new Date('2026-01-15'), new Date('2026-01-25'));
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });

  it('should pass date range to daily report', () => {
    service.addOrder(createMockOrder({ id: '1', status: 'completed', createdAt: new Date('2026-01-15') }));
    service.addOrder(createMockOrder({ id: '2', status: 'completed', createdAt: new Date('2026-02-10') }));
    const rows = service.getDailyReport(new Date('2026-02-01'), new Date('2026-02-28'));
    expect(rows.length).toBe(1);
    expect(rows[0].totalCount).toBe(1);
  });
});
