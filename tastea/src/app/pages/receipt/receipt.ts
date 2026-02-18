import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { OrderDetails } from '../../models/menu.model';

@Component({
  selector: 'app-receipt',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './receipt.html',
  styleUrl: './receipt.css'
})
export class Receipt implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  order = signal<OrderDetails | undefined>(undefined);

  ngOnInit(): void {
    const orderNumber = this.route.snapshot.paramMap.get('orderNumber');
    if (orderNumber) {
      this.order.set(this.orderService.getOrderByNumber(orderNumber));
    }
  }
}
