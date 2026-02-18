import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu } from './menu';
import { provideRouter } from '@angular/router';
import { MENU_ITEMS } from '../../data/menu-data';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all items by default', () => {
    expect(component.filteredItems().length).toBe(MENU_ITEMS.length);
    expect(component.activeCategory()).toBe('all');
  });

  it('should filter by tea category', () => {
    component.setCategory('tea');
    const teaItems = MENU_ITEMS.filter(i => i.category === 'tea');
    expect(component.filteredItems().length).toBe(teaItems.length);
  });

  it('should filter by coffee category', () => {
    component.setCategory('coffee');
    const coffeeItems = MENU_ITEMS.filter(i => i.category === 'coffee');
    expect(component.filteredItems().length).toBe(coffeeItems.length);
  });

  it('should filter by pastry category', () => {
    component.setCategory('pastry');
    const pastryItems = MENU_ITEMS.filter(i => i.category === 'pastry');
    expect(component.filteredItems().length).toBe(pastryItems.length);
  });

  it('should filter by subcategory', () => {
    component.setCategory('tea');
    component.setSubcategory('green');
    const greenTeas = MENU_ITEMS.filter(i => i.category === 'tea' && i.subcategory === 'green');
    expect(component.filteredItems().length).toBe(greenTeas.length);
  });

  it('should reset subcategory when category changes', () => {
    component.setCategory('tea');
    component.setSubcategory('green');
    component.setCategory('coffee');
    expect(component.activeSubcategory()).toBe('all');
  });

  it('should return empty subcategories for all category', () => {
    component.setCategory('all');
    expect(component.subcategories().length).toBe(0);
  });

  it('should return correct subcategories for tea', () => {
    component.setCategory('tea');
    const subs = component.subcategories();
    expect(subs.length).toBeGreaterThan(0);
    expect(subs).toContain('green');
    expect(subs).toContain('black');
    expect(subs).toContain('herbal');
  });

  it('should show all items again when switching back to all', () => {
    component.setCategory('tea');
    component.setCategory('all');
    expect(component.filteredItems().length).toBe(MENU_ITEMS.length);
  });
});
