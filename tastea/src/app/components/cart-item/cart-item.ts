import { Component, input, output } from '@angular/core';
import { CartItem } from '../../models/menu.model';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css'
})
export class CartItemComponent {
  item = input.required<CartItem>();
  quantityChange = output<{ id: string; quantity: number }>();
  remove = output<string>();

  get lineTotal(): number {
    return this.item().menuItem.price * this.item().quantity;
  }

  increment(): void {
    this.quantityChange.emit({
      id: this.item().menuItem.id,
      quantity: this.item().quantity + 1
    });
  }

  decrement(): void {
    const newQty = this.item().quantity - 1;
    if (newQty <= 0) {
      this.remove.emit(this.item().menuItem.id);
    } else {
      this.quantityChange.emit({
        id: this.item().menuItem.id,
        quantity: newQty
      });
    }
  }

  onRemove(): void {
    this.remove.emit(this.item().menuItem.id);
  }
}
