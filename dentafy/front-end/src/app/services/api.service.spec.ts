import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let http: { post: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    http = { post: vi.fn() };

    TestBed.configureTestingModule({
      providers: [ApiService, { provide: HttpClient, useValue: http }],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('sends login mutation and maps response', () => {
      const payload = { token: 'tok', user: { id: '1', email: 'a@b.com', name: 'A', role: 'CUSTOMER' } };
      http.post.mockReturnValue(of({ data: { login: payload } }));

      service.login('a@b.com', 'pass').subscribe((result) => {
        expect(result).toEqual(payload);
      });

      expect(http.post).toHaveBeenCalledWith(
        'http://localhost:4000/graphql',
        expect.objectContaining({ variables: { input: { email: 'a@b.com', password: 'pass' } } }),
      );
    });
  });

  describe('register', () => {
    it('sends register mutation and maps response', () => {
      const payload = { token: 'tok', user: { id: '2', email: 'b@c.com', name: 'B', role: 'CUSTOMER' } };
      http.post.mockReturnValue(of({ data: { register: payload } }));

      service.register('B', 'b@c.com', 'pass').subscribe((result) => {
        expect(result).toEqual(payload);
      });
    });
  });

  describe('createAppointment', () => {
    it('sends appointment mutation', () => {
      const appt = { id: 'a1', fullName: 'John', contactNumber: '123', preferredDate: '2026-03-01', preferredTime: '9:00 AM', dentalConcern: 'Cleaning', status: 'PENDING', createdAt: '' };
      http.post.mockReturnValue(of({ data: { createAppointment: appt } }));

      const input = { fullName: 'John', contactNumber: '123', preferredDate: '2026-03-01', preferredTime: '9:00 AM', dentalConcern: 'Cleaning' };
      service.createAppointment(input).subscribe((result) => {
        expect(result.id).toBe('a1');
      });
    });
  });

  describe('myAppointments', () => {
    it('sends query and maps response', () => {
      http.post.mockReturnValue(of({ data: { myAppointments: [] } }));

      service.myAppointments().subscribe((result) => {
        expect(result).toEqual([]);
      });
    });
  });

  describe('allAppointments', () => {
    it('sends query and maps response', () => {
      http.post.mockReturnValue(of({ data: { allAppointments: [] } }));

      service.allAppointments().subscribe((result) => {
        expect(result).toEqual([]);
      });
    });
  });

  describe('updateAppointmentStatus', () => {
    it('sends mutation with id and status', () => {
      http.post.mockReturnValue(of({ data: { updateAppointmentStatus: { id: 'a1', status: 'CONFIRMED' } } }));

      service.updateAppointmentStatus('a1', 'CONFIRMED').subscribe((result) => {
        expect(result.status).toBe('CONFIRMED');
      });
    });
  });

  describe('createInquiry', () => {
    it('sends inquiry mutation', () => {
      const inquiry = { id: 'i1', name: 'Jane', email: 'j@t.com', contactNumber: '789', message: 'Hi', createdAt: '' };
      http.post.mockReturnValue(of({ data: { createInquiry: inquiry } }));

      service.createInquiry({ name: 'Jane', email: 'j@t.com', contactNumber: '789', message: 'Hi' }).subscribe((result) => {
        expect(result.id).toBe('i1');
      });
    });
  });

  describe('allInquiries', () => {
    it('sends query and maps response', () => {
      http.post.mockReturnValue(of({ data: { allInquiries: [] } }));

      service.allInquiries().subscribe((result) => {
        expect(result).toEqual([]);
      });
    });
  });
});
