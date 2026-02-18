import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemComponent } from './cart-item';
import { CartItem } from '../../models/menu.model';
import { ComponentRef } from '@angular/core';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let componentRef: ComponentRef<CartItemComponent>;
  let fixture: ComponentFixture<CartItemComponent>;

  const mockCartItem: CartItem = {
    menuItem: {
      id: 'tea-matcha-latte',
      name: 'Classic Matcha Latte',
      description: 'A smooth and creamy matcha latte.',
      price: 5.75,
      category: 'tea',
      subcategory: 'green',
      image: '🍵',
      featured: true,
      tags: []
    },
    quantity: 2,
    specialInstructions: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('item', mockCartItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display item name', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Classic Matcha Latte');
  });

  it('should display quantity', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('2');
  });

  it('should display line total', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('$11.50');
  });

  it('should emit quantityChange on increment', () => {
    jest.spyOn(component.quantityChange, 'emit');
    component.increment();
    expect(component.quantityChange.emit).toHaveBeenCalledWith({
      id: 'tea-matcha-latte',
      quantity: 3
    });
  });

  it('should emit quantityChange on decrement', () => {
    jest.spyOn(component.quantityChange, 'emit');
    component.decrement();
    expect(component.quantityChange.emit).toHaveBeenCalledWith({
      id: 'tea-matcha-latte',
      quantity: 1
    });
  });

  it('should emit remove when decrementing from quantity 1', () => {
    componentRef.setInput('item', { ...mockCartItem, quantity: 1 });
    fixture.detectChanges();
    jest.spyOn(component.remove, 'emit');
    component.decrement();
    expect(component.remove.emit).toHaveBeenCalledWith('tea-matcha-latte');
  });

  it('should emit remove on remove button click', () => {
    jest.spyOn(component.remove, 'emit');
    component.onRemove();
    expect(component.remove.emit).toHaveBeenCalledWith('tea-matcha-latte');
  });
});
