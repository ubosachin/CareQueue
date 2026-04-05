import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { PatientModel, DoctorModel } from '@/models/Schemas';

export async function POST() {
  try {
    await dbConnect();
    
    // Simulate AI optimization: re-prioritize and load balance
    const patients = await PatientModel.find({ status: 'Waiting' });
    const doctors = await DoctorModel.find({ status: 'Available' });

    if (doctors.length === 0) return NextResponse.json({ message: 'No available doctors' });

    // AI Logic: Distribute patients evenly to available doctors
    for (let i = 0; i < patients.length; i++) {
      const assignedDoctor = doctors[i % doctors.length];
      await PatientModel.findByIdAndUpdate(patients[i]._id, { 
        assignedDoctor: assignedDoctor._id,
        status: 'In-Progress' 
      });
      await DoctorModel.findByIdAndUpdate(assignedDoctor._id, { $inc: { patientsInQueue: 1 } });
    }

    return NextResponse.json({ success: true, optimized: patients.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
