import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import dbConnect from './src/lib/db';
import { UserModel } from './src/models/Schemas';

async function check() {
  await dbConnect();
  const count = await UserModel.countDocuments();
  console.log('User count:', count);
  const admin = await UserModel.findOne({ email: 'admin@carequeue.ai' });
  if (admin) {
    console.log('Admin user found:', admin.email);
    const isMatched = await bcrypt.compare('admin123', admin.passwordHash);
    console.log('Does "admin123" match hash?', isMatched);
  } else {
    console.log('Admin user NOT found with exactly "admin@carequeue.ai"');
    const allUsers = await UserModel.find({}, { email: 1 });
    console.log('All user emails:', allUsers.map(u => u.email));
  }
}
import bcrypt from 'bcryptjs';
check().then(() => process.exit());
