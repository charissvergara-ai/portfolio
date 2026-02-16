import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const API_URL = 'http://localhost:4000/graphql';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthPayload {
  token: string;
  user: AuthUser;
}

export interface Appointment {
  id: string;
  fullName: string;
  contactNumber: string;
  preferredDate: string;
  preferredTime: string;
  dentalConcern: string;
  status: string;
  createdAt: string;
  userId?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  message: string;
  createdAt: string;
}

interface GraphQLResponse<T> {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private query<T>(query: string, variables?: Record<string, unknown>): Observable<T> {
    return this.http.post<GraphQLResponse<T>>(API_URL, { query, variables }).pipe(
      map((res) => res.data),
    );
  }

  // Auth
  login(email: string, password: string): Observable<AuthPayload> {
    return this.query<{ login: AuthPayload }>(
      `mutation Login($input: LoginInput!) {
        login(input: $input) { token user { id email name role } }
      }`,
      { input: { email, password } },
    ).pipe(map((d) => d.login));
  }

  register(name: string, email: string, password: string): Observable<AuthPayload> {
    return this.query<{ register: AuthPayload }>(
      `mutation Register($input: RegisterInput!) {
        register(input: $input) { token user { id email name role } }
      }`,
      { input: { name, email, password } },
    ).pipe(map((d) => d.register));
  }

  // Appointments
  createAppointment(input: {
    fullName: string;
    contactNumber: string;
    preferredDate: string;
    preferredTime: string;
    dentalConcern: string;
  }): Observable<Appointment> {
    return this.query<{ createAppointment: Appointment }>(
      `mutation CreateAppointment($input: AppointmentInput!) {
        createAppointment(input: $input) {
          id fullName contactNumber preferredDate preferredTime dentalConcern status createdAt
        }
      }`,
      { input },
    ).pipe(map((d) => d.createAppointment));
  }

  myAppointments(): Observable<Appointment[]> {
    return this.query<{ myAppointments: Appointment[] }>(
      `query { myAppointments { id fullName contactNumber preferredDate preferredTime dentalConcern status createdAt } }`,
    ).pipe(map((d) => d.myAppointments));
  }

  allAppointments(): Observable<Appointment[]> {
    return this.query<{ allAppointments: Appointment[] }>(
      `query { allAppointments { id fullName contactNumber preferredDate preferredTime dentalConcern status createdAt userId } }`,
    ).pipe(map((d) => d.allAppointments));
  }

  updateAppointmentStatus(id: string, status: string): Observable<Appointment> {
    return this.query<{ updateAppointmentStatus: Appointment }>(
      `mutation UpdateStatus($id: String!, $status: String!) {
        updateAppointmentStatus(id: $id, status: $status) { id status }
      }`,
      { id, status },
    ).pipe(map((d) => d.updateAppointmentStatus));
  }

  // Inquiries
  createInquiry(input: {
    name: string;
    email: string;
    contactNumber: string;
    message: string;
  }): Observable<Inquiry> {
    return this.query<{ createInquiry: Inquiry }>(
      `mutation CreateInquiry($input: InquiryInput!) {
        createInquiry(input: $input) { id name email contactNumber message createdAt }
      }`,
      { input },
    ).pipe(map((d) => d.createInquiry));
  }

  allInquiries(): Observable<Inquiry[]> {
    return this.query<{ allInquiries: Inquiry[] }>(
      `query { allInquiries { id name email contactNumber message createdAt } }`,
    ).pipe(map((d) => d.allInquiries));
  }
}
