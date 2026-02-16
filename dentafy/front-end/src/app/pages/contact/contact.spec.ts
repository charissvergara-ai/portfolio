import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Contact } from './contact';
import { ApiService } from '../../services/api.service';

describe('Contact', () => {
  let apiService: { createInquiry: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    apiService = { createInquiry: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Contact, ReactiveFormsModule],
      providers: [{ provide: ApiService, useValue: apiService }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Contact);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have all required form controls', () => {
    const fixture = TestBed.createComponent(Contact);
    const form = fixture.componentInstance.contactForm;
    expect(form.contains('name')).toBe(true);
    expect(form.contains('email')).toBe(true);
    expect(form.contains('contactNumber')).toBe(true);
    expect(form.contains('message')).toBe(true);
  });

  it('should mark form invalid when empty', () => {
    const fixture = TestBed.createComponent(Contact);
    expect(fixture.componentInstance.contactForm.valid).toBe(false);
  });

  it('should validate email format', () => {
    const fixture = TestBed.createComponent(Contact);
    const email = fixture.componentInstance.contactForm.get('email')!;
    email.setValue('not-an-email');
    expect(email.valid).toBe(false);
    email.setValue('valid@email.com');
    expect(email.valid).toBe(true);
  });

  it('should validate message minimum length', () => {
    const fixture = TestBed.createComponent(Contact);
    const msg = fixture.componentInstance.contactForm.get('message')!;
    msg.setValue('short');
    expect(msg.valid).toBe(false);
    msg.setValue('this is long enough');
    expect(msg.valid).toBe(true);
  });

  it('should not call API on invalid submit', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.componentInstance.onSubmit();
    expect(apiService.createInquiry).not.toHaveBeenCalled();
  });

  it('should set submitted on successful submit', () => {
    const fixture = TestBed.createComponent(Contact);
    const comp = fixture.componentInstance;
    apiService.createInquiry.mockReturnValue(of({ id: 'i1' }));

    comp.contactForm.setValue({
      name: 'Jane',
      email: 'jane@test.com',
      contactNumber: '789',
      message: 'Hello, I need help with my teeth.',
    });
    comp.onSubmit();

    expect(comp.submitted()).toBe(true);
    expect(comp.submitting()).toBe(false);
  });

  it('should set error on failed submit', () => {
    const fixture = TestBed.createComponent(Contact);
    const comp = fixture.componentInstance;
    apiService.createInquiry.mockReturnValue(throwError(() => new Error('fail')));

    comp.contactForm.setValue({
      name: 'Jane',
      email: 'jane@test.com',
      contactNumber: '789',
      message: 'Hello, I need help with my teeth.',
    });
    comp.onSubmit();

    expect(comp.error()).toBe('Something went wrong. Please try again or contact us directly.');
    expect(comp.submitting()).toBe(false);
  });

  it('should reset form state via resetForm()', () => {
    const fixture = TestBed.createComponent(Contact);
    const comp = fixture.componentInstance;
    comp.submitted.set(true);
    comp.error.set('err');

    comp.resetForm();

    expect(comp.submitted()).toBe(false);
    expect(comp.error()).toBe('');
  });

  it('should have clinic hours', () => {
    const fixture = TestBed.createComponent(Contact);
    expect(fixture.componentInstance.hours.length).toBe(3);
  });
});
