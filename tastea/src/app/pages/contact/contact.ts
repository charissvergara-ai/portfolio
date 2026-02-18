import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitted = signal(false);
  submitting = signal(false);

  contactInfo = [
    { icon: '📍', label: 'Address', value: '123 Tea Garden Lane, Portland, OR 97201' },
    { icon: '📞', label: 'Phone', value: '(503) 555-0142' },
    { icon: '✉️', label: 'Email', value: 'hello@tastea.com' },
    { icon: '🕐', label: 'Hours', value: 'Mon–Fri 7AM–8PM | Sat–Sun 8AM–9PM' }
  ];

  onSubmit(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
      this.formData = { name: '', email: '', subject: '', message: '' };
    }, 1500);
  }
}
