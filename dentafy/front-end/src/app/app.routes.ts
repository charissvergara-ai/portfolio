import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Book } from './pages/book/book';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Doctor } from './pages/doctor/doctor';
import { Customer } from './pages/customer/customer';
import { roleGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'services', component: Services },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'book', component: Book },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'doctor', component: Doctor, canActivate: [roleGuard('DOCTOR')] },
  { path: 'customer', component: Customer, canActivate: [roleGuard('CUSTOMER')] },
  { path: '**', redirectTo: '' },
];
