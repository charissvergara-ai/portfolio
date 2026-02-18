import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from '../../components/cart-item/cart-item';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CartItemComponent, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  cartService = inject(CartService);

  onQuantityChange(event: { id: string; quantity: number }): void {
    this.cartService.updateQuantity(event.id, event.quantity);
  }

  onRemoveItem(id: string): void {
    this.cartService.removeItem(id);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}
