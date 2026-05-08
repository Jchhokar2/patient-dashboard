// These are the types I'm using across the whole app
export type PatientStatus = 'active' | 'pending' | 'inactive';

export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  status: PatientStatus;
  registeredDate: string;
}

export interface DashboardStats {
  total: number;
  active: number;
  pending: number;
  inactive: number;
}

export interface PaginatedResponse {
  data: Patient[];
  total: number;
  page: number;
  pageSize: number;
}