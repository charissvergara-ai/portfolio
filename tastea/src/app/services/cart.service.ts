import { Injectable, signal, computed } from '@angular/core';
import { CartItem, MenuItem } from '../models/menu.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  readonly items = computed(() => this.cartItems());
  readonly itemCount = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  readonly subtotal = computed(() =>
    this.cartItems().reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity, 0
    )
  );
  readonly tax = computed(() => this.subtotal() * 0.08);
  readonly total = computed(() => this.subtotal() + this.tax());
  readonly isEmpty = computed(() => this.cartItems().length === 0);

  addItem(menuItem: MenuItem, quantity = 1, specialInstructions = ''): void {
    this.cartItems.update(items => {
      const existing = items.find(i => i.menuItem.id === menuItem.id);
      if (existing) {
        return items.map(i =>
          i.menuItem.id === menuItem.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...items, { menuItem, quantity, specialInstructions }];
    });
  }

  removeItem(menuItemId: string): void {
    this.cartItems.update(items =>
      items.filter(i => i.menuItem.id !== menuItemId)
    );
  }

  updateQuantity(menuItemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(menuItemId);
      return;
    }
    this.cartItems.update(items =>
      items.map(i =>
        i.menuItem.id === menuItemId ? { ...i, quantity } : i
      )
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
