// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import Category from '@/lib/schemas/Category';

// GET all categories
export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

// POST a new category (Admin only)
export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }
  try {
    await dbConnect();
    const { name } = await req.json();
    const newCategory = new Category({ name });
    await newCategory.save();
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

// DELETE a category (Admin only)
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }
  try {
    await dbConnect();
    const { id } = await req.json();
    await Category.findByIdAndDelete(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}