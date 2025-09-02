import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import Category from '@/lib/schemas/Category';
import Component from '@/lib/schemas/Component';

// GET single category by ID
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    await dbConnect();
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    const components = await Component.find({ category: id });

    return NextResponse.json({
      _id: category._id,
      name: category.name,
      components,
    });
  } catch (error) {
    console.error('GET /categories/[id] error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH update category (Admin only)
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { name } = await req.json();

    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedCategory) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('PATCH /categories/[id] error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE category (Admin only)
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    await Component.updateMany({ category: id }, { category: null });
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('DELETE /categories/[id] error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
