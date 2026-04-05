import mongoose from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'DOCTOR', 'STAFF'], default: 'STAFF' },
  image: String,
}, { timestamps: true });

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

// Doctor Schema
const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: String,
  status: { type: String, enum: ['Available', 'On-Rest', 'Busy'], default: 'Available' },
  patientsInQueue: { type: Number, default: 0 },
  avgConsultationTime: { type: Number, default: 15 },
}, { timestamps: true });

export const DoctorModel = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);

// Patient Schema
const PatientSchema = new mongoose.Schema({
  token: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  age: Number,
  gender: String,
  priority: { type: String, enum: ['Emergency', 'High', 'Medium', 'Low'], default: 'Medium' },
  department: String,
  status: { type: String, enum: ['Waiting', 'In-Progress', 'Completed'], default: 'Waiting' },
  arrivalTime: { type: Date, default: Date.now },
  estimatedWaitTime: Number,
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
}, { timestamps: true });

export const PatientModel = mongoose.models.Patient || mongoose.model('Patient', PatientSchema);
