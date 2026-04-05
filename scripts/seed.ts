import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dbConnect from '../src/lib/db';
import { UserModel, DoctorModel, PatientModel } from '../src/models/Schemas';

const seed = async () => {
  await dbConnect();

  // Clear existing
  await UserModel.deleteMany({});
  await DoctorModel.deleteMany({});
  await PatientModel.deleteMany({});

  // Add Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  await UserModel.create({
    name: 'Hospital Admin',
    email: 'admin@carequeue.ai',
    passwordHash: adminPassword,
    role: 'ADMIN',
  });

  // Add Sample Doctors
  const doctors = await DoctorModel.insertMany([
    { name: 'Dr. Sarah Johnson', specialization: 'Cardiology', status: 'Available', patientsInQueue: 3 },
    { name: 'Dr. Michael Chen', specialization: 'Emergency', status: 'Busy', patientsInQueue: 8 },
    { name: 'Dr. Emily Williams', specialization: 'Pediatrics', status: 'Available', patientsInQueue: 2 },
  ]);

  // Add Sample Patients
  await PatientModel.insertMany([
    { token: 'CQ-101', name: 'John Doe', age: 45, priority: 'High', department: 'Cardiology', assignedDoctor: doctors[0]._id },
    { token: 'CQ-102', name: 'Jane Smith', age: 28, priority: 'Emergency', department: 'Emergency', assignedDoctor: doctors[1]._id },
  ]);

  console.log('Database Seeded Successfully');
  process.exit();
};

seed();
