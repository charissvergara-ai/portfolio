import { Component, signal, computed, inject } from '@angular/core';
import { MENU_ITEMS } from '../../data/menu-data';
import { Category, MenuItem } from '../../models/menu.model';
import { CartService } from '../../services/cart.service';
import { MenuCard } from '../../components/menu-card/menu-card';

@Component({
  selector: 'app-menu',
  imports: [MenuCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  private cartService = inject(CartService);

  allItems = MENU_ITEMS;
  activeCategory = signal<Category | 'all'>('all');
  activeSubcategory = signal<string | 'all'>('all');

  categories: { key: Category | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'tea', label: 'Tea' },
    { key: 'coffee', label: 'Coffee' },
    { key: 'pastry', label: 'Pastries' }
  ];

  filteredItems = computed(() => {
    let items = this.allItems;
    const cat = this.activeCategory();
    if (cat !== 'all') {
      items = items.filter(i => i.category === cat);
    }
    const sub = this.activeSubcategory();
    if (sub !== 'all') {
      items = items.filter(i => i.subcategory === sub);
    }
    return items;
  });

  subcategories = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') return [];
    const items = this.allItems.filter(i => i.category === cat);
    return [...new Set(items.map(i => i.subcategory))];
  });

  setCategory(category: Category | 'all'): void {
    this.activeCategory.set(category);
    this.activeSubcategory.set('all');
  }

  setSubcategory(sub: string | 'all'): void {
    this.activeSubcategory.set(sub);
  }

  onAddToCart(item: MenuItem): void {
    this.cartService.addItem(item);
  }
}
