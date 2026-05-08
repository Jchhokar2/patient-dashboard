import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Patient } from '../models/patient.model';

dotenv.config();

// This will store all 20 sample patients that get inserted into the database
const patients = [
  { firstName: 'Jaspreet', lastName: 'Chhokar', email: 'jaspreet.chhokar@email.com', dateOfBirth: '1985-03-12', status: 'active', registeredDate: '2024-01-15T09:00:00.000Z' },
  { firstName: 'Aaryan', lastName: 'Gill', email: 'aaryan.gill@email.com', dateOfBirth: '1990-07-24', status: 'active', registeredDate: '2024-02-03T10:30:00.000Z' },
  { firstName: 'Jasmeet', lastName: 'Saini', email: 'jasmeet.saini@email.com', dateOfBirth: '1978-11-05', status: 'pending', registeredDate: '2024-02-18T14:00:00.000Z' },
  { firstName: 'Abdul', lastName: 'Rehmi', email: 'abdul.rehmi@email.com', dateOfBirth: '1995-01-30', status: 'inactive', registeredDate: '2024-03-07T11:15:00.000Z' },
  { firstName: 'Prabneel', lastName: 'Dhinsa', email: 'prabneel.dhinsa@email.com', dateOfBirth: '1988-06-15', status: 'active', registeredDate: '2024-03-22T08:45:00.000Z' },
  { firstName: 'Faizal', lastName: 'Rahim', email: 'faizal.rahim@email.com', dateOfBirth: '1992-09-08', status: 'pending', registeredDate: '2024-04-01T13:00:00.000Z' },
  { firstName: 'Mohammed', lastName: 'Abdi', email: 'mohammed.abdi@email.com', dateOfBirth: '1983-04-22', status: 'active', registeredDate: '2024-04-15T09:30:00.000Z' },
  { firstName: 'Prisha', lastName: 'Dhaliwal', email: 'prisha.dhaliwal@email.com', dateOfBirth: '1997-12-01', status: 'inactive', registeredDate: '2024-05-02T16:00:00.000Z' },
  { firstName: 'Matthew', lastName: 'Jackson', email: 'matthew.jackson@email.com', dateOfBirth: '1975-08-17', status: 'active', registeredDate: '2024-05-19T10:00:00.000Z' },
  { firstName: 'Amanda', lastName: 'White', email: 'amanda.white@email.com', dateOfBirth: '1993-02-28', status: 'pending', registeredDate: '2024-06-04T11:30:00.000Z' },
  { firstName: 'Ryan', lastName: 'Harris', email: 'ryan.harris@email.com', dateOfBirth: '1986-05-10', status: 'active', registeredDate: '2024-06-20T14:15:00.000Z' },
  { firstName: 'Stephanie', lastName: 'Clark', email: 'stephanie.clark@email.com', dateOfBirth: '1991-10-14', status: 'active', registeredDate: '2024-07-08T09:00:00.000Z' },
  { firstName: 'Kevin', lastName: 'Lewis', email: 'kevin.lewis@email.com', dateOfBirth: '1979-07-03', status: 'inactive', registeredDate: '2024-07-25T13:45:00.000Z' },
  { firstName: 'Nicole', lastName: 'Robinson', email: 'nicole.robinson@email.com', dateOfBirth: '1994-03-19', status: 'pending', registeredDate: '2024-08-10T10:30:00.000Z' },
  { firstName: 'Brian', lastName: 'Walker', email: 'brian.walker@email.com', dateOfBirth: '1987-11-25', status: 'active', registeredDate: '2024-08-28T08:00:00.000Z' },
  { firstName: 'Megan', lastName: 'Hall', email: 'megan.hall@email.com', dateOfBirth: '1996-06-07', status: 'active', registeredDate: '2024-09-14T15:00:00.000Z' },
  { firstName: 'Justin', lastName: 'Allen', email: 'justin.allen@email.com', dateOfBirth: '1982-01-13', status: 'pending', registeredDate: '2024-10-01T11:00:00.000Z' },
  { firstName: 'Lauren', lastName: 'Young', email: 'lauren.young@email.com', dateOfBirth: '1989-08-29', status: 'inactive', registeredDate: '2024-10-18T14:30:00.000Z' },
  { firstName: 'Brandon', lastName: 'King', email: 'brandon.king@email.com', dateOfBirth: '1976-04-04', status: 'active', registeredDate: '2024-11-05T09:15:00.000Z' },
  { firstName: 'Brittany', lastName: 'Scott', email: 'brittany.scott@email.com', dateOfBirth: '1998-09-16', status: 'pending', registeredDate: '2024-11-22T12:00:00.000Z' }
];

// This will connect to MongoDB, wipe any existing patients, and insert the fresh list above
const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to MongoDB');

  // This will remove any old data so we don't get duplicates on re-runs
  await Patient.deleteMany();
  console.log('Cleared existing patients');

  // This will insert all 20 patients into the database at once
  await Patient.insertMany(patients);
  console.log('Inserted 20 patients successfully');

  // This will close the connection once everything is done
  await mongoose.disconnect();
  console.log('Done!');
};

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});