import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Menu } from './pages/menu/menu';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Contact } from './pages/contact/contact';
import { Receipt } from './pages/receipt/receipt';
import { AdminLogin } from './pages/admin-login/admin-login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AdminReports } from './pages/admin-reports/admin-reports';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'menu', component: Menu },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'contact', component: Contact },
  { path: 'receipt/:orderNumber', component: Receipt },
  { path: 'admin/login', component: AdminLogin },
  { path: 'admin', component: AdminDashboard, canActivate: [authGuard] },
  { path: 'admin/reports', component: AdminReports, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
