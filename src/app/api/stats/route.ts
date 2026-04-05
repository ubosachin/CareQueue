import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { PatientModel, DoctorModel } from '@/models/Schemas';

export async function GET() {
  try {
    await dbConnect();
    
    // Get total patients waiting
    const waitingCount = await PatientModel.countDocuments({ status: 'Waiting' });
    
    // Get total patients in progress
    const inProgressCount = await PatientModel.countDocuments({ status: 'In-Progress' });

    // Get total available doctors
    const doctorsCount = await DoctorModel.countDocuments({ status: 'Available' });

    // Calculate average wait time (simulated or real from patients)
    const patients = await PatientModel.find({ status: 'Waiting' }).select('estimatedWaitTime');
    const avgWaitTime = patients.length > 0 
      ? Math.round(patients.reduce((acc, p) => acc + (p.estimatedWaitTime || 0), 0) / patients.length) 
      : 15;

    return NextResponse.json({
      waiting: waitingCount,
      inProgress: inProgressCount,
      availableDoctors: doctorsCount,
      avgWaitTime: avgWaitTime
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch global stats' }, { status: 500 });
  }
}
