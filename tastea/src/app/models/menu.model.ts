export type Category = 'tea' | 'coffee' | 'pastry';

export type TeaType = 'green' | 'black' | 'herbal' | 'oolong' | 'white' | 'chai';
export type CoffeeType = 'hot' | 'iced' | 'blended';
export type PastryType = 'scone' | 'cake' | 'cookie' | 'pastry';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  subcategory: TeaType | CoffeeType | PastryType;
  image: string;
  featured: boolean;
  tags: string[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions: string;
}

export type OrderType = 'online' | 'dine-in';
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type PaymentMethod = 'cash' | 'card';

export interface OrderDetails {
  id: string;
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  pickupTime: string;
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
}
