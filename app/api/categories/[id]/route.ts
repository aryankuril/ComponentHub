import { NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import Category from '@/lib/schemas/Category';
import Component from '@/lib/schemas/Component';

// GET all categories with their components
export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find({});
    const components = await Component.find({});

    // Attach components to their respective categories
    const categoriesWithComponents = categories.map((cat) => ({
      _id: cat._id,
      name: cat.name,
      components: components.filter((comp) => comp.category?.toString() === cat._id.toString()),
    }));

    return NextResponse.json(categoriesWithComponents);
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    // Remove category reference from components
    await Component.updateMany({ category: id }, { category: null });
    await Category.findByIdAndDelete(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
