import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  services = [
    {
      icon: 'fa-solid fa-tooth',
      title: 'General Dentistry',
      description: 'Comprehensive check-ups, cleanings, fillings, and preventive care.',
    },
    {
      icon: 'fa-solid fa-wand-magic-sparkles',
      title: 'Cosmetic Dentistry',
      description: 'Teeth whitening, veneers, bonding, and smile makeovers.',
    },
    {
      icon: 'fa-solid fa-crown',
      title: 'Restorative Dentistry',
      description: 'Crowns, bridges, dentures, root canals, and dental implants.',
    },
    {
      icon: 'fa-solid fa-child',
      title: 'Pediatric Dentistry',
      description: 'Gentle dental care, fluoride treatments, and sealants for kids.',
    },
    {
      icon: 'fa-solid fa-teeth',
      title: 'Orthodontic Services',
      description: 'Traditional braces, ceramic braces, clear aligners, and retainers.',
    },
    {
      icon: 'fa-solid fa-kit-medical',
      title: 'Emergency Dental Care',
      description: 'Toothache relief, broken tooth repair, and urgent dental treatment.',
    },
  ];

  reasons = [
    'Modern dental equipment and updated technology',
    'Friendly and experienced dental professionals',
    'Clean, sterilized, and comfortable environment',
    'Affordable and transparent pricing',
    'Flexible payment options available',
  ];

  testimonials = [
    {
      quote:
        'Dr. Santos explained everything clearly and made me feel comfortable during my treatment.',
      author: 'Angela R.',
    },
    {
      quote: 'Very accommodating staff and clean clinic. Highly recommended!',
      author: 'Carlo M.',
    },
  ];
}
