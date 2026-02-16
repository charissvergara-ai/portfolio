import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  reasons = [
    'Modern dental equipment and updated technology',
    'Friendly and experienced dental professionals',
    'Clean, sterilized, and comfortable environment',
    'Affordable and transparent pricing',
    'Flexible payment options available',
  ];

  hours = [
    { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 4:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ];

  paymentOptions = [
    { icon: 'fa-solid fa-money-bill-wave', label: 'Cash payments' },
    { icon: 'fa-solid fa-mobile-screen', label: 'GCash & Bank Transfers' },
    { icon: 'fa-solid fa-credit-card', label: 'Credit / Debit Cards' },
    { icon: 'fa-solid fa-shield-halved', label: 'Selected dental insurance providers' },
    { icon: 'fa-solid fa-calendar-check', label: 'Installment options for selected treatments' },
  ];
}
