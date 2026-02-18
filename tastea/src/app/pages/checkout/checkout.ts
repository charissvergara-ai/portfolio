import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { OrderType, PaymentMethod } from '../../models/menu.model';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  formData = {
    name: '',
    email: '',
    phone: '',
    pickupTime: '',
    orderType: 'online' as OrderType,
    paymentMethod: 'card' as PaymentMethod
  };

  submitting = signal(false);

  onSubmit(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.phone || !this.formData.pickupTime) {
      return;
    }
    this.submitting.set(true);

    setTimeout(() => {
      const orderNumber = 'TT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const orderId = crypto.randomUUID();

      this.orderService.addOrder({
        id: orderId,
        orderNumber,
        name: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        pickupTime: this.formData.pickupTime,
        orderType: this.formData.orderType,
        paymentMethod: this.formData.paymentMethod,
        items: [...this.cartService.items()],
        subtotal: this.cartService.subtotal(),
        tax: this.cartService.tax(),
        total: this.cartService.total(),
        status: 'pending',
        createdAt: new Date()
      });

      this.cartService.clearCart();
      this.submitting.set(false);
      this.router.navigate(['/receipt', orderNumber]);
    }, 1500);
  }
}
