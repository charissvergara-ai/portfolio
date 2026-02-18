import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Checkout } from './checkout';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Router, provideRouter } from '@angular/router';
import { MenuItem } from '../../models/menu.model';

describe('Checkout', () => {
  let component: Checkout;
  let fixture: ComponentFixture<Checkout>;
  let cartService: CartService;
  let orderService: OrderService;
  let router: Router;

  const mockItem: MenuItem = {
    id: 'tea-matcha-latte',
    name: 'Classic Matcha Latte',
    description: 'A smooth matcha latte.',
    price: 5.75,
    category: 'tea',
    subcategory: 'green',
    image: '🍵',
    featured: true,
    tags: []
  };

  beforeEach(async () => {
    jest.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [Checkout],
      providers: [provideRouter([])]
    }).compileComponents();

    cartService = TestBed.inject(CartService);
    orderService = TestBed.inject(OrderService);
    router = TestBed.inject(Router);
    cartService.addItem(mockItem, 2);

    fixture = TestBed.createComponent(Checkout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display order summary', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Classic Matcha Latte');
    expect(el.textContent).toContain('Order Summary');
  });

  it('should show empty cart state when no items', () => {
    cartService.clearCart();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Nothing to checkout');
  });

  it('should not submit with empty form', () => {
    component.onSubmit();
    expect(component.submitting()).toBe(false);
  });

  it('should submit order with valid form', () => {
    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    component.formData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-0142',
      pickupTime: '14:00',
      orderType: 'online',
      paymentMethod: 'card'
    };
    component.onSubmit();
    expect(component.submitting()).toBe(true);

    jest.advanceTimersByTime(1500);
    expect(component.submitting()).toBe(false);
    expect(orderService.allOrders().length).toBe(1);
    expect(orderService.allOrders()[0].orderNumber).toMatch(/^TT-/);
    expect(cartService.isEmpty()).toBe(true);
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should create order with correct type and payment', () => {
    jest.spyOn(router, 'navigate').mockResolvedValue(true);

    component.formData = {
      name: 'Jane',
      email: 'jane@test.com',
      phone: '555-1234',
      pickupTime: '10:00',
      orderType: 'dine-in',
      paymentMethod: 'cash'
    };
    component.onSubmit();
    jest.advanceTimersByTime(1500);

    const order = orderService.allOrders()[0];
    expect(order.orderType).toBe('dine-in');
    expect(order.paymentMethod).toBe('cash');
    expect(order.status).toBe('pending');
    expect(order.name).toBe('Jane');
  });
});
