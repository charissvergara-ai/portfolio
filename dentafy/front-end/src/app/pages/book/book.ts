import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-book',
  imports: [ReactiveFormsModule],
  templateUrl: './book.html',
  styleUrl: './book.scss',
})
export class Book {
  bookingForm: FormGroup;
  submitted = signal(false);
  submitting = signal(false);
  error = signal('');

  serviceOptions = [
    'General Check-up & Cleaning',
    'Teeth Whitening',
    'Dental Filling',
    'Tooth Extraction',
    'Dental Crowns & Bridges',
    'Root Canal Treatment',
    'Dental Implant Consultation',
    'Orthodontic Consultation',
    'Cosmetic Consultation',
    'Pediatric Dental Visit',
    'Emergency / Toothache',
    'Other',
  ];

  timeSlots = [
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) {
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      preferredDate: ['', [Validators.required]],
      preferredTime: ['', [Validators.required]],
      dentalConcern: ['', [Validators.required]],
      notes: [''],
    });
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.error.set('');

    const { fullName, contactNumber, preferredDate, preferredTime, dentalConcern } =
      this.bookingForm.value;

    this.api
      .createAppointment({ fullName, contactNumber, preferredDate, preferredTime, dentalConcern })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.submitted.set(true);
          this.bookingForm.reset();
        },
        error: () => {
          this.submitting.set(false);
          this.error.set('Something went wrong. Please try again or call us directly.');
        },
      });
  }

  resetForm() {
    this.submitted.set(false);
    this.error.set('');
  }
}
