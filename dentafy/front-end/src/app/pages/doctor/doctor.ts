import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService, Appointment, Inquiry } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-doctor',
  imports: [DatePipe],
  templateUrl: './doctor.html',
  styleUrl: './doctor.scss',
})
export class Doctor implements OnInit {
  appointments = signal<Appointment[]>([]);
  inquiries = signal<Inquiry[]>([]);
  activeTab = signal<'appointments' | 'inquiries'>('appointments');
  loading = signal(true);

  constructor(
    private api: ApiService,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    this.api.allAppointments().subscribe({
      next: (data) => {
        this.appointments.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
    this.api.allInquiries().subscribe({
      next: (data) => this.inquiries.set(data),
    });
  }

  setTab(tab: 'appointments' | 'inquiries') {
    this.activeTab.set(tab);
  }

  updateStatus(id: string, status: string) {
    this.api.updateAppointmentStatus(id, status).subscribe({
      next: () => {
        this.appointments.update((list) =>
          list.map((a) => (a.id === id ? { ...a, status } : a)),
        );
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'CONFIRMED':
        return 'badge-success';
      case 'CANCELLED':
        return 'badge-danger';
      case 'COMPLETED':
        return 'badge-completed';
      default:
        return 'badge-pending';
    }
  }
}
