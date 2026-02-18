import { Component, input, output, signal } from '@angular/core';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-menu-card',
  imports: [],
  templateUrl: './menu-card.html',
  styleUrl: './menu-card.css'
})
export class MenuCard {
  item = input.required<MenuItem>();
  addToCart = output<MenuItem>();
  added = signal(false);

  onAddToCart(): void {
    this.addToCart.emit(this.item());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 1500);
  }
}
