import { NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import Category from '@/lib/schemas/Category';
import Component from '@/lib/schemas/Component';

// GET route to fetch a single category by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await dbConnect();
    const category = await Category.findById(id);

    if (!category) {
      return new NextResponse(JSON.stringify({ message: 'Category not found' }), { status: 404 });
    }
    
    return NextResponse.json(category);
  } catch (error) {
    console.error('Failed to fetch category:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

// PATCH route to update a category by ID (Admin only)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const { name } = await req.json();

  if (!name) {
    return new NextResponse(JSON.stringify({ message: 'Category name is required' }), { status: 400 });
  }

  try {
    await dbConnect();
    
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return new NextResponse(JSON.stringify({ message: 'Category not found' }), { status: 404 });
    }

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Failed to update category:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

// DELETE route to delete a category by ID (Admin only)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;

  try {
    await dbConnect();
    // Set the category field to null for all components in this category
    await Component.updateMany({ category: id }, { category: null });
    
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return new NextResponse(JSON.stringify({ message: 'Category not found' }), { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete category:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
