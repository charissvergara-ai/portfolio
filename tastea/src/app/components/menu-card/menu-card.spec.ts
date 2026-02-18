import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCard } from './menu-card';
import { MenuItem } from '../../models/menu.model';
import { ComponentRef } from '@angular/core';

describe('MenuCard', () => {
  let component: MenuCard;
  let componentRef: ComponentRef<MenuCard>;
  let fixture: ComponentFixture<MenuCard>;

  const mockItem: MenuItem = {
    id: 'tea-matcha-latte',
    name: 'Classic Matcha Latte',
    description: 'A smooth and creamy matcha latte.',
    price: 5.75,
    category: 'tea',
    subcategory: 'green',
    image: '🍵',
    featured: true,
    tags: ['popular']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCard]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCard);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('item', mockItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the item name', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Classic Matcha Latte');
  });

  it('should display the item price', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('$5.75');
  });

  it('should display the item description', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('A smooth and creamy matcha latte.');
  });

  it('should display tags', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('popular');
  });

  it('should emit addToCart event when button is clicked', () => {
    jest.spyOn(component.addToCart, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.addToCart.emit).toHaveBeenCalledWith(mockItem);
  });

  it('should show added confirmation after clicking', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Added!');
  });
});
