import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { MenuItem } from '../models/menu.model';

describe('CartService', () => {
  let service: CartService;

  const mockTea: MenuItem = {
    id: 'tea-matcha-latte',
    name: 'Classic Matcha Latte',
    description: 'A smooth and creamy matcha latte.',
    price: 5.75,
    category: 'tea',
    subcategory: 'green',
    image: '🍵',
    featured: true,
    tags: []
  };

  const mockCoffee: MenuItem = {
    id: 'coffee-cold-brew',
    name: 'Cold Brew Black',
    description: 'Bold, smooth cold brew.',
    price: 4.50,
    category: 'coffee',
    subcategory: 'iced',
    image: '🧊',
    featured: false,
    tags: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty cart', () => {
    expect(service.isEmpty()).toBe(true);
    expect(service.itemCount()).toBe(0);
    expect(service.total()).toBe(0);
  });

  it('should add an item to the cart', () => {
    service.addItem(mockTea);
    expect(service.itemCount()).toBe(1);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].menuItem.id).toBe('tea-matcha-latte');
    expect(service.items()[0].quantity).toBe(1);
  });

  it('should increment quantity for duplicate items', () => {
    service.addItem(mockTea);
    service.addItem(mockTea);
    expect(service.itemCount()).toBe(2);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].quantity).toBe(2);
  });

  it('should add multiple different items', () => {
    service.addItem(mockTea);
    service.addItem(mockCoffee);
    expect(service.items().length).toBe(2);
    expect(service.itemCount()).toBe(2);
  });

  it('should add item with custom quantity', () => {
    service.addItem(mockTea, 3);
    expect(service.itemCount()).toBe(3);
    expect(service.items()[0].quantity).toBe(3);
  });

  it('should calculate subtotal correctly', () => {
    service.addItem(mockTea, 2);
    expect(service.subtotal()).toBe(11.50);
  });

  it('should calculate subtotal for multiple items', () => {
    service.addItem(mockTea, 1);
    service.addItem(mockCoffee, 2);
    expect(service.subtotal()).toBeCloseTo(14.75, 2);
  });

  it('should calculate tax at 8%', () => {
    service.addItem(mockTea, 1);
    expect(service.tax()).toBeCloseTo(0.46, 2);
  });

  it('should calculate total (subtotal + tax)', () => {
    service.addItem(mockTea, 1);
    expect(service.total()).toBeCloseTo(6.21, 2);
  });

  it('should remove an item', () => {
    service.addItem(mockTea);
    service.addItem(mockCoffee);
    service.removeItem('tea-matcha-latte');
    expect(service.items().length).toBe(1);
    expect(service.items()[0].menuItem.id).toBe('coffee-cold-brew');
  });

  it('should update item quantity', () => {
    service.addItem(mockTea);
    service.updateQuantity('tea-matcha-latte', 5);
    expect(service.items()[0].quantity).toBe(5);
    expect(service.itemCount()).toBe(5);
  });

  it('should remove item when quantity is set to 0', () => {
    service.addItem(mockTea);
    service.updateQuantity('tea-matcha-latte', 0);
    expect(service.isEmpty()).toBe(true);
  });

  it('should remove item when quantity is negative', () => {
    service.addItem(mockTea);
    service.updateQuantity('tea-matcha-latte', -1);
    expect(service.isEmpty()).toBe(true);
  });

  it('should clear the cart', () => {
    service.addItem(mockTea);
    service.addItem(mockCoffee);
    service.clearCart();
    expect(service.isEmpty()).toBe(true);
    expect(service.itemCount()).toBe(0);
    expect(service.subtotal()).toBe(0);
  });

  it('should report isEmpty correctly', () => {
    expect(service.isEmpty()).toBe(true);
    service.addItem(mockTea);
    expect(service.isEmpty()).toBe(false);
    service.removeItem('tea-matcha-latte');
    expect(service.isEmpty()).toBe(true);
  });
});
