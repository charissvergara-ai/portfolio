import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-our-family',
  imports: [RouterLink],
  templateUrl: './our-family.html',
  styleUrl: './our-family.scss',
})
export class OurFamily {
  activeFilter = signal('all');

  children = [
    { name: 'Maria', age: 4, location: 'Cebu', year: 2024, image: 'https://i.pravatar.cc/200?img=47', story: 'Maria was born with a bilateral cleft lip. After two surgeries, she now smiles brightly and attends preschool.', status: 'post-surgery' },
    { name: 'Juan', age: 6, location: 'Davao', year: 2023, image: 'https://i.pravatar.cc/200?img=33', story: 'Juan struggled to eat and speak. After his cleft palate repair, he can now enjoy meals with his family and is learning to read.', status: 'post-surgery' },
    { name: 'Ana', age: 3, location: 'Iloilo', year: 2025, image: 'https://i.pravatar.cc/200?img=9', story: 'Ana is currently receiving nutritional support to prepare for her upcoming cleft lip surgery during our next medical mission.', status: 'pre-surgery' },
    { name: 'Carlos', age: 5, location: 'Tacloban', year: 2024, image: 'https://i.pravatar.cc/200?img=59', story: 'Carlos had his cleft lip repaired in 2024. He is now thriving in kindergarten and loves to sing songs.', status: 'post-surgery' },
    { name: 'Sofia', age: 2, location: 'Zamboanga', year: 2025, image: 'https://i.pravatar.cc/200?img=5', story: 'Sofia was identified by our outreach team. She is receiving medical pre-screening and nutrition support before surgery.', status: 'pre-surgery' },
    { name: 'Miguel', age: 7, location: 'Cebu', year: 2022, image: 'https://i.pravatar.cc/200?img=14', story: 'Miguel received his surgery three years ago. Today he is a confident second-grader who dreams of becoming a doctor.', status: 'post-surgery' },
    { name: 'Isabella', age: 4, location: 'Davao', year: 2024, image: 'https://i.pravatar.cc/200?img=25', story: 'Isabella had her cleft palate surgery last year. She is now receiving speech therapy and making great progress.', status: 'post-surgery' },
    { name: 'Diego', age: 1, location: 'Iloilo', year: 2025, image: 'https://i.pravatar.cc/200?img=52', story: 'Diego is the youngest in our current program. Our team is providing his family with feeding support and nutrition supplements.', status: 'pre-surgery' }
  ];

  filteredChildren = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.children;
    return this.children.filter(c => c.status === filter);
  });

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }
}
