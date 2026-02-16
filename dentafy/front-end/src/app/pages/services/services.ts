import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  categories = [
    {
      icon: 'fa-solid fa-tooth',
      title: 'General Dentistry',
      services: [
        'Comprehensive Oral Examination',
        'Professional Teeth Cleaning (Oral Prophylaxis)',
        'Tooth-Colored Dental Fillings',
        'Tooth Extractions (Simple & Surgical)',
        'Fluoride Treatment',
        'Dental Sealants',
      ],
    },
    {
      icon: 'fa-solid fa-wand-magic-sparkles',
      title: 'Cosmetic Dentistry',
      services: [
        'Teeth Whitening',
        'Porcelain Veneers',
        'Smile Makeover',
        'Cosmetic Bonding',
      ],
    },
    {
      icon: 'fa-solid fa-crown',
      title: 'Restorative Dentistry',
      services: [
        'Dental Crowns and Bridges',
        'Complete & Partial Dentures',
        'Root Canal Treatment',
        'Dental Implants',
      ],
    },
    {
      icon: 'fa-solid fa-child',
      title: 'Pediatric Dentistry',
      services: [
        'Gentle Dental Checkups for Kids',
        'Fluoride Application',
        'Dental Sealants',
        'Oral Hygiene Education',
      ],
    },
    {
      icon: 'fa-solid fa-teeth',
      title: 'Orthodontic Services',
      services: [
        'Traditional Metal Braces',
        'Ceramic Braces',
        'Clear Aligners',
        'Retainers',
      ],
    },
    {
      icon: 'fa-solid fa-kit-medical',
      title: 'Emergency Dental Care',
      services: [
        'Toothache Relief',
        'Broken or Chipped Tooth Repair',
        'Lost Fillings or Crowns',
        'Swelling and Dental Trauma Treatment',
      ],
    },
  ];
}
