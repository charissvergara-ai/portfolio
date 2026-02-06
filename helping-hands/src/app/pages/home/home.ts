import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  stats = [
    { number: '500+', label: 'Surgeries Funded' },
    { number: '13+', label: 'Years of Service' },
    { number: '100%', label: 'Goes to Children' },
    { number: '2', label: 'Country Offices' }
  ];

  services = [
    {
      icon: 'fas fa-search',
      title: 'Find Children',
      description: 'Our team in the Philippines travels to municipalities and clinics to find children with cleft lip or palate who need surgery.'
    },
    {
      icon: 'fas fa-heartbeat',
      title: 'Prepare for Surgery',
      description: 'We provide medical screening, nutritional assistance, and ensure children are healthy enough for their surgical procedure.'
    },
    {
      icon: 'fas fa-hospital',
      title: 'Fund Surgery',
      description: 'We cover transportation, lodging, food, and all expenses so families receive completely free cleft repair surgery.'
    },
    {
      icon: 'fas fa-hands-holding-child',
      title: 'Follow-up Care',
      description: 'After surgery, we maintain contact for years, helping with medicine, follow-up visits, and educational support.'
    }
  ];

  partners = [
    'Operation Smile',
    'Rotaplast International',
    'Smile Train',
    'Faces of Tomorrow'
  ];
}
