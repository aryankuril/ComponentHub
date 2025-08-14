// app/api/components/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';

// GET all components
export async function GET() {
  try {
    await dbConnect();
    const components = await Component.find({}).populate('category');
    return NextResponse.json(components);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

// POST a new component (Admin only)
export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }
  try {
    await dbConnect();
    const body = await req.json();
    const newComponent = new Component(body);
    await newComponent.save();
    return NextResponse.json(newComponent, { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}