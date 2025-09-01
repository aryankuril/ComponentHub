// app/api/user/[id]/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/schemas/User';
import bcrypt from 'bcryptjs';

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const { id } = await params;

  const { name, email,  newPassword, role } = await req.json();

  await dbConnect();
  const user = await User.findById(id);

  if (!user) {
    return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
  }

  // (Auth checks same as before)

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;
  // if (phone) user.phone = phone;        // ← ADD THIS LINE
  if (newPassword) user.password = await bcrypt.hash(newPassword, 10);
  if (role) user.role = role;

  await user.save();

  const { password, ...updatedUser } = user.toObject();
  return NextResponse.json(updatedUser);
}

// API route to get a list of all users (admin only)
export async function GET(req: Request) {
  const session = await auth();
  if (!session || !session.user || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await dbConnect();
  const users = await User.find({}, 'name email role');
  return NextResponse.json(users);
}