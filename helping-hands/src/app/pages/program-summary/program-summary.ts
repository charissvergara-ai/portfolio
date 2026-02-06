import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-program-summary',
  imports: [RouterLink],
  templateUrl: './program-summary.html',
  styleUrl: './program-summary.scss',
})
export class ProgramSummary {
  steps = [
    {
      icon: 'fas fa-map-marked-alt',
      title: 'Finding Children',
      description: 'Our Philippines-based team travels to municipal offices, neighborhood authorities, clinics, and remote communities to locate children born with cleft lip or palate whose families cannot afford surgery.',
      detail: 'We work closely with local barangay officials and health workers who help identify children in need throughout the Visayas and Mindanao regions.'
    },
    {
      icon: 'fas fa-stethoscope',
      title: 'Medical Screening',
      description: 'We visit each family, document the child\'s condition, and arrange for medical pre-screening to determine if the child is healthy enough for surgery.',
      detail: 'Our team coordinates with local physicians who perform blood tests, physical exams, and health assessments to ensure each child can safely undergo anesthesia and surgery.'
    },
    {
      icon: 'fas fa-apple-alt',
      title: 'Nutritional Support',
      description: 'Many children with cleft conditions are malnourished, making them ineligible for surgery. We provide nutritional assistance to prepare them for their procedure.',
      detail: 'Children with cleft palate often struggle to eat properly. We provide supplemental nutrition, feeding guidance, and regular weight monitoring until they reach a safe weight for surgery.'
    },
    {
      icon: 'fas fa-shuttle-van',
      title: 'Transportation & Lodging',
      description: 'We cover all travel expenses, lodging, and food for the child and their family during medical missions that may last several days.',
      detail: 'Many families live in remote areas far from surgical facilities. We arrange safe transportation, comfortable lodging near the hospital, and provide meals throughout their stay.'
    },
    {
      icon: 'fas fa-hospital',
      title: 'Surgery',
      description: 'Working with partner organizations like Operation Smile, Rotaplast, Smile Train, and Faces of Tomorrow, we ensure families receive completely free cleft repair surgery.',
      detail: 'Surgeries are performed by highly skilled volunteer surgeons during organized medical missions. Each child receives world-class surgical care at no cost to their family.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Follow-Up Care',
      description: 'After surgery, we maintain contact with families for years, helping with medicine, follow-up visits, speech therapy, educational support, and living conditions.',
      detail: 'Our commitment doesn\'t end at surgery. We provide ongoing support including post-operative check-ups, medication, speech therapy referrals, and educational sponsorship for years to come.'
    }
  ];

  impacts = [
    { number: '500+', label: 'Surgeries Funded' },
    { number: '$250', label: 'Average Surgery Cost' },
    { number: '100%', label: 'Funds Go to Children' },
    { number: '5+ Years', label: 'Follow-Up Support' }
  ];
}
