import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ways-to-help',
  imports: [RouterLink],
  templateUrl: './ways-to-help.html',
  styleUrl: './ways-to-help.scss',
})
export class WaysToHelp {
  ways = [
    { icon: 'fas fa-hand-holding-usd', title: 'Make a Donation', description: 'Your financial gift directly funds surgery, nutrition, transportation, and follow-up care for children with cleft lip and palate.', action: 'Donate Now', link: '/contact' },
    { icon: 'fas fa-child', title: 'Sponsor a Child', description: 'Choose a sponsorship level to fund a specific child\'s surgery, nutrition support, or ongoing family assistance.', action: 'View Sponsorships', link: '/sponsorships' },
    { icon: 'fas fa-bullhorn', title: 'Spread the Word', description: 'Share our mission with friends, family, and social media followers. Word-of-mouth is how most people learn about our work.', action: 'Learn More', link: '/mission' },
    { icon: 'fas fa-people-carry', title: 'Fundraise for Us', description: 'Organize a fundraising event, start a birthday campaign, or create a GoFundMe to raise money for children in need.', action: 'Contact Us', link: '/contact' },
    { icon: 'fas fa-pray', title: 'Pray for Our Mission', description: 'Keep our team, the children, and their families in your prayers as they go through their journey to healing.', action: 'Our Family', link: '/family' },
    { icon: 'fas fa-handshake', title: 'Corporate Partnership', description: 'Partner your business with Helping Hands through matching gifts, employee giving programs, or event sponsorship.', action: 'Contact Us', link: '/contact' }
  ];

  faqs = [
    { question: 'Is my donation tax-deductible?', answer: 'Yes! Helping Hands is a registered 501(c)(3) nonprofit (EIN: 46-2202705). All donations are tax-deductible to the full extent allowed by law.' },
    { question: 'How much of my donation goes to children?', answer: '100% of sponsorship funds are used to directly support our beneficiaries in the Philippines. Administrative costs are covered separately.' },
    { question: 'Can I specify how my donation is used?', answer: 'Yes. You can designate your gift for surgery funding, nutritional support, transportation, or general operations. Contact us for details.' },
    { question: 'How can I get updates on children I support?', answer: 'Sponsors receive photos, stories, and progress reports about the children they help. We also share updates on our website and social media.' }
  ];
}
