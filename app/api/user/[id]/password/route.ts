import { NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/schemas/User';
import bcrypt from 'bcryptjs';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const { currentPassword, newPassword } = await req.json();

  await dbConnect();
  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  if (!session.user || (session.user.id !== id && session.user.role !== 'admin')) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  // ✅ verify old password
  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) {
    return NextResponse.json({ message: 'Current password is incorrect' }, { status: 400 });
  }

  // ✅ update password
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return NextResponse.json({ success: true, message: 'Password updated' });
}
