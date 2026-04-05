import dbConnect from './src/lib/db';
import { UserModel } from './src/models/Schemas';

async function check() {
  await dbConnect();
  const count = await UserModel.countDocuments();
  console.log('User count:', count);
  const admin = await UserModel.findOne({ email: 'admin@carequeue.ai' });
  console.log('Admin user:', admin ? 'Found' : 'Not Found');
}
check().then(() => process.exit());
