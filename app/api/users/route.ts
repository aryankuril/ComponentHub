// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/schemas/User';

// GET all users (Admin only)
export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    await dbConnect();
    const users = await User.find({}).select('-password'); // Exclude password for security
    return NextResponse.json(users);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

// PATCH a user's role (Admin only)
export async function PATCH(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    await dbConnect();
    const { id, role } = await req.json();
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!updatedUser) {
      return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }
    return NextResponse.json(updatedUser);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

// DELETE a user (Admin only)
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await req.json();
    await User.findByIdAndDelete(id);
    return new NextResponse(null, { status: 204 }); // 204 No Content response
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
