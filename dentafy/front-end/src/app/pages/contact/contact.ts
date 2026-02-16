import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  contactForm: FormGroup;
  submitted = signal(false);
  submitting = signal(false);
  error = signal('');

  hours = [
    { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 4:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.error.set('');

    const { name, email, contactNumber, message } = this.contactForm.value;

    this.api.createInquiry({ name, email, contactNumber, message }).subscribe({
      next: () => {
        this.submitting.set(false);
        this.submitted.set(true);
        this.contactForm.reset();
      },
      error: () => {
        this.submitting.set(false);
        this.error.set('Something went wrong. Please try again or contact us directly.');
      },
    });
  }

  resetForm() {
    this.submitted.set(false);
    this.error.set('');
  }
}
