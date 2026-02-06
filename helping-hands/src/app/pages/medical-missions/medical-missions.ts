import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medical-missions',
  imports: [RouterLink],
  templateUrl: './medical-missions.html',
  styleUrl: './medical-missions.scss',
})
export class MedicalMissions {
  upcomingMissions = [
    {
      date: 'March 2026',
      location: 'Cebu City, Philippines',
      partner: 'Operation Smile',
      slots: 40,
      status: 'Accepting Patients'
    },
    {
      date: 'June 2026',
      location: 'Davao City, Philippines',
      partner: 'Rotaplast International',
      slots: 35,
      status: 'Accepting Patients'
    },
    {
      date: 'October 2026',
      location: 'Iloilo City, Philippines',
      partner: 'Smile Train',
      slots: 50,
      status: 'Planning Phase'
    }
  ];

  pastMissions = [
    {
      date: 'November 2025',
      location: 'Cebu City, Philippines',
      partner: 'Faces of Tomorrow',
      surgeries: 38
    },
    {
      date: 'July 2025',
      location: 'Zamboanga City, Philippines',
      partner: 'Operation Smile',
      surgeries: 42
    },
    {
      date: 'March 2025',
      location: 'Tacloban City, Philippines',
      partner: 'Rotaplast International',
      surgeries: 30
    },
    {
      date: 'October 2024',
      location: 'Cebu City, Philippines',
      partner: 'Smile Train',
      surgeries: 45
    }
  ];

  partners = [
    {
      name: 'Operation Smile',
      icon: 'fas fa-smile-beam',
      description: 'A global nonprofit that provides free cleft surgeries to children worldwide, with missions across over 30 countries.',
      missions: '15+ joint missions'
    },
    {
      name: 'Rotaplast International',
      icon: 'fas fa-globe-americas',
      description: 'A Rotary-affiliated charity sending volunteer medical teams to perform free reconstructive surgery for children in developing countries.',
      missions: '8+ joint missions'
    },
    {
      name: 'Smile Train',
      icon: 'fas fa-hand-holding-medical',
      description: 'The world\'s largest cleft charity, empowering local doctors in 90+ countries to provide free cleft surgery and comprehensive care.',
      missions: '10+ joint missions'
    },
    {
      name: 'Faces of Tomorrow',
      icon: 'fas fa-child',
      description: 'An organization dedicated to providing surgical missions for children with facial deformities in the Philippines and surrounding regions.',
      missions: '6+ joint missions'
    }
  ];
}
