import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-our-team',
  imports: [RouterLink],
  templateUrl: './our-team.html',
  styleUrl: './our-team.scss',
})
export class OurTeam {
  usaTeam = [
    { name: 'Sarah Johnson', role: 'Executive Director', description: 'Founded Helping Hands in 2011 after a life-changing encounter with a Filipino child with cleft lip. Oversees all operations and fundraising.' },
    { name: 'David Miller', role: 'Director of Operations', description: 'Manages day-to-day logistics, coordinates with partner organizations, and ensures smooth execution of every medical mission.' },
    { name: 'Emily Chen', role: 'Communications Director', description: 'Handles donor relations, social media, and storytelling to share the impact of our work with supporters worldwide.' },
    { name: 'Michael Torres', role: 'Finance Manager', description: 'Ensures financial transparency and accountability, managing all funds to guarantee 100% of sponsorships reach our beneficiaries.' }
  ];

  phTeam = [
    { name: 'Grace Santos', role: 'Philippines Program Director', description: 'Leads all ground operations in the Philippines, coordinating outreach, patient preparation, and mission logistics.' },
    { name: 'Jose Reyes', role: 'Outreach Coordinator', description: 'Travels across the Visayas and Mindanao to find children with cleft conditions, visiting barangays and health clinics.' },
    { name: 'Maria Lopez', role: 'Patient Care Coordinator', description: 'Manages medical screenings, nutritional support programs, and ensures each child is ready for surgery.' },
    { name: 'Ricardo Cruz', role: 'Follow-Up Support Lead', description: 'Maintains long-term relationships with families after surgery, coordinating follow-up care, medicine, and educational support.' },
    { name: 'Ana Mendoza', role: 'Community Liaison', description: 'Works with local government units and healthcare workers to identify children in need and build community partnerships.' }
  ];
}
