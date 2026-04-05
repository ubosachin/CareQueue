import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { PatientModel, DoctorModel } from '@/models/Schemas';

export async function GET() {
  try {
    await dbConnect();
    const patients = await PatientModel.find({}).populate('assignedDoctor');
    return NextResponse.json(patients);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    
    // Auto-generate token if missing
    if (!data.token) {
      const count = await PatientModel.countDocuments();
      data.token = `CQ-${100 + count + 1}`;
    }

    const patient = await PatientModel.create(data);
    return NextResponse.json(patient, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
