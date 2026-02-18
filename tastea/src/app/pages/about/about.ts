import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  values = [
    { icon: '🌱', title: 'Sustainability', description: 'From biodegradable packaging to locally sourced ingredients, we make choices that respect our planet.' },
    { icon: '🏆', title: 'Quality', description: 'We partner directly with tea estates and roasters to bring you the finest leaves and beans available.' },
    { icon: '🤝', title: 'Community', description: 'Tastea is more than a shop — it\'s a gathering place where neighbors become friends over a warm cup.' },
    { icon: '🎨', title: 'Craft', description: 'Every drink is an art form. Our baristas train extensively to master the perfect brew, every time.' }
  ];

  team = [
    { name: 'Mei Lin Chen', role: 'Founder & Tea Master', bio: 'With 15 years of tea expertise spanning Japan, China, and India, Mei Lin brings authentic tea culture to Portland.', image: '👩‍🍳' },
    { name: 'James Okafor', role: 'Head Barista', bio: 'A certified Q Grader and latte art champion, James crafts every coffee drink with precision and flair.', image: '👨‍🍳' },
    { name: 'Sofia Reyes', role: 'Pastry Chef', bio: 'Trained at Le Cordon Bleu, Sofia creates pastries that perfectly complement our tea and coffee selections.', image: '👩‍🍳' },
    { name: 'Ethan Park', role: 'Operations Manager', bio: 'Ethan ensures every visit to Tastea runs smoothly, from sourcing to service.', image: '👨‍💼' }
  ];
}
