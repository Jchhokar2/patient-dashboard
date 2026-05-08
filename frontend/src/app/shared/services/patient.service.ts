import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, DashboardStats, PaginatedResponse, PatientStatus } from '../../models/patient.model';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // This will fetch all patients with optional filters
  getPatients(search = '', status = '', page = 1, pageSize = 10): Observable<PaginatedResponse> {
    return this.http.get<PaginatedResponse>(
      `${this.apiUrl}/patients?search=${search}&status=${status}&page=${page}&pageSize=${pageSize}`
    );
  }

  // This will fetch a single patient by their ID
  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/${id}`);
  }

  // This will create a new patient
  createPatient(patient: Omit<Patient, '_id'>): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
  }

  // This will update the patient's status
  updateStatus(id: string, status: PatientStatus): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/${id}`, { status });
  }

  // This will grab the stats for the dashboard cards
  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
  }
}

