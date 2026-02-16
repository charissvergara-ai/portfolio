import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Book } from './book';
import { ApiService } from '../../services/api.service';

describe('Book', () => {
  let apiService: { createAppointment: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    apiService = { createAppointment: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Book, ReactiveFormsModule],
      providers: [{ provide: ApiService, useValue: apiService }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Book);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have all required form controls', () => {
    const fixture = TestBed.createComponent(Book);
    const form = fixture.componentInstance.bookingForm;
    expect(form.contains('fullName')).toBe(true);
    expect(form.contains('contactNumber')).toBe(true);
    expect(form.contains('preferredDate')).toBe(true);
    expect(form.contains('preferredTime')).toBe(true);
    expect(form.contains('dentalConcern')).toBe(true);
    expect(form.contains('notes')).toBe(true);
  });

  it('should mark form invalid when empty', () => {
    const fixture = TestBed.createComponent(Book);
    expect(fixture.componentInstance.bookingForm.valid).toBe(false);
  });

  it('should not call API on invalid submit', () => {
    const fixture = TestBed.createComponent(Book);
    fixture.componentInstance.onSubmit();
    expect(apiService.createAppointment).not.toHaveBeenCalled();
  });

  it('should set submitted on successful submit', () => {
    const fixture = TestBed.createComponent(Book);
    const comp = fixture.componentInstance;
    apiService.createAppointment.mockReturnValue(of({ id: 'a1' }));

    comp.bookingForm.setValue({
      fullName: 'John',
      contactNumber: '123',
      preferredDate: '2026-03-01',
      preferredTime: '9:00 AM',
      dentalConcern: 'Cleaning',
      notes: '',
    });
    comp.onSubmit();

    expect(comp.submitted()).toBe(true);
    expect(comp.submitting()).toBe(false);
  });

  it('should set error on failed submit', () => {
    const fixture = TestBed.createComponent(Book);
    const comp = fixture.componentInstance;
    apiService.createAppointment.mockReturnValue(throwError(() => new Error('fail')));

    comp.bookingForm.setValue({
      fullName: 'John',
      contactNumber: '123',
      preferredDate: '2026-03-01',
      preferredTime: '9:00 AM',
      dentalConcern: 'Cleaning',
      notes: '',
    });
    comp.onSubmit();

    expect(comp.error()).toBe('Something went wrong. Please try again or call us directly.');
    expect(comp.submitting()).toBe(false);
  });

  it('should reset form state via resetForm()', () => {
    const fixture = TestBed.createComponent(Book);
    const comp = fixture.componentInstance;
    comp.submitted.set(true);
    comp.error.set('Some error');

    comp.resetForm();

    expect(comp.submitted()).toBe(false);
    expect(comp.error()).toBe('');
  });

  it('should have service options and time slots', () => {
    const fixture = TestBed.createComponent(Book);
    const comp = fixture.componentInstance;
    expect(comp.serviceOptions.length).toBeGreaterThan(0);
    expect(comp.timeSlots.length).toBeGreaterThan(0);
  });
});
