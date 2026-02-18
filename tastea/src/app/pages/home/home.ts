import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuCard } from '../../components/menu-card/menu-card';
import { CartService } from '../../services/cart.service';
import { MENU_ITEMS } from '../../data/menu-data';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MenuCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private cartService = inject(CartService);

  featuredItems = MENU_ITEMS.filter(item => item.featured);

  values = [
    { icon: '🌿', title: 'Premium Ingredients', description: 'We source the finest tea leaves, single-origin beans, and organic ingredients from trusted growers worldwide.' },
    { icon: '✨', title: 'Handcrafted Drinks', description: 'Every drink is prepared with care and attention to detail, ensuring the perfect cup each and every time.' },
    { icon: '🏡', title: 'Cozy Atmosphere', description: 'Our warm, inviting space is designed for relaxation — whether you\'re catching up with friends or finding a quiet moment.' }
  ];

  onAddToCart(item: MenuItem): void {
    this.cartService.addItem(item);
  }
}
