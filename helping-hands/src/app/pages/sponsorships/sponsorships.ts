import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sponsorships',
  imports: [RouterLink],
  templateUrl: './sponsorships.html',
  styleUrl: './sponsorships.scss',
})
export class Sponsorships {
  tiers = [
    {
      name: 'Surgery Sponsor',
      amount: '$250',
      frequency: 'one-time',
      icon: 'fas fa-hospital',
      description: 'Fund a complete cleft lip or palate surgery for one child.',
      features: [
        'Full surgery cost coverage',
        'Pre-operative medical screening',
        'Transportation and lodging',
        'Post-operative follow-up care',
        'Photo and story of your sponsored child'
      ],
      highlighted: true
    },
    {
      name: 'Nutrition Sponsor',
      amount: '$50',
      frequency: 'one-time',
      icon: 'fas fa-apple-alt',
      description: 'Provide nutritional support to prepare a malnourished child for surgery.',
      features: [
        'Supplemental nutrition for one child',
        'Regular weight monitoring',
        'Feeding guidance for family',
        'Progress updates on child\'s health'
      ],
      highlighted: false
    },
    {
      name: 'Monthly Partner',
      amount: '$25',
      frequency: 'per month',
      icon: 'fas fa-hand-holding-heart',
      description: 'Provide ongoing support that funds multiple children throughout the year.',
      features: [
        'Help multiple children annually',
        'Cover transportation costs',
        'Fund follow-up medical visits',
        'Support educational needs',
        'Quarterly impact reports'
      ],
      highlighted: false
    },
    {
      name: 'Family Sponsor',
      amount: '$100',
      frequency: 'one-time',
      icon: 'fas fa-home',
      description: 'Cover all travel, lodging, and meals for a family during a medical mission.',
      features: [
        'Round-trip transportation',
        'Lodging during mission week',
        'Meals for child and guardian',
        'Mission day support and care'
      ],
      highlighted: false
    }
  ];

  guarantees = [
    {
      icon: 'fas fa-shield-alt',
      title: '100% Goes to Children',
      description: 'Every dollar of sponsorship funds is used to directly support our beneficiaries in the Philippines. Administrative costs are covered separately.'
    },
    {
      icon: 'fas fa-file-alt',
      title: 'Full Transparency',
      description: 'We provide detailed reports and updates on how your funds are used, including photos and stories of the children you help.'
    },
    {
      icon: 'fas fa-certificate',
      title: 'Tax Deductible',
      description: 'Helping Hands is a registered 501(c)(3) nonprofit. All donations are tax-deductible to the extent allowed by law.'
    }
  ];
}
