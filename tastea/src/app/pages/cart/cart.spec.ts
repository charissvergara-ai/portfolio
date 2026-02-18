import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cart } from './cart';
import { CartService } from '../../services/cart.service';
import { provideRouter } from '@angular/router';
import { MenuItem } from '../../models/menu.model';

describe('Cart', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;
  let cartService: CartService;

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
    await TestBed.configureTestingModule({
      imports: [Cart],
      providers: [provideRouter([])]
    }).compileComponents();

    cartService = TestBed.inject(CartService);
    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty state when cart is empty', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Your cart is empty');
  });

  it('should show cart items when items exist', () => {
    cartService.addItem(mockItem);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Classic Matcha Latte');
  });

  it('should show correct item count', () => {
    cartService.addItem(mockItem, 3);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('3 items');
  });

  it('should clear cart when clear all is clicked', () => {
    cartService.addItem(mockItem);
    fixture.detectChanges();
    component.onClearCart();
    fixture.detectChanges();
    expect(cartService.isEmpty()).toBe(true);
  });

  it('should update quantity', () => {
    cartService.addItem(mockItem);
    component.onQuantityChange({ id: 'tea-matcha-latte', quantity: 5 });
    expect(cartService.items()[0].quantity).toBe(5);
  });

  it('should remove item', () => {
    cartService.addItem(mockItem);
    component.onRemoveItem('tea-matcha-latte');
    expect(cartService.isEmpty()).toBe(true);
  });
});
