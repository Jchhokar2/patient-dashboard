import { Schema, model, Document } from 'mongoose';

export type PatientStatus = 'active' | 'pending' | 'inactive';

export interface IPatient extends Document {
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

const PatientSchema = new Schema<IPatient>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: String, required: true },
  status: { type: String, enum: ['active', 'pending', 'inactive'], default: 'pending' },
  registeredDate: { type: String, default: () => new Date().toISOString() }
});

export const Patient = model<IPatient>('Patient', PatientSchema);