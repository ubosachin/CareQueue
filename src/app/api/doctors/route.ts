import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { DoctorModel } from '@/models/Schemas';

export async function GET() {
  try {
    await dbConnect();
    const doctors = await DoctorModel.find({});
    return NextResponse.json(doctors);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
