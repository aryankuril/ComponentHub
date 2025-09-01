import { NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';

// GET route to fetch a single component by ID (Admin only)
export async function GET(req: Request, { params }: any) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;

  try {
    await dbConnect();
    const component = await Component.findById(id).populate('category', 'name');

    if (!component) {
      return new NextResponse(JSON.stringify({ message: 'Component not found' }), { status: 404 });
    }

    return NextResponse.json(component);
  } catch (error) {
    console.error('Failed to fetch component:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

// PATCH route
export async function PATCH(req: Request, { params }: any) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const { name, description, code, npmPackages, category } = await req.json();

  try {
    await dbConnect();

    const updatedComponent = await Component.findByIdAndUpdate(
      id,
      { name, description, code, npmPackages, category: category || null },
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!updatedComponent) {
      return new NextResponse(JSON.stringify({ message: 'Component not found' }), { status: 404 });
    }

    return NextResponse.json(updatedComponent);
  } catch (error) {
    console.error('Failed to update component:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

// DELETE route
export async function DELETE(req: Request, { params }: any) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;

  try {
    await dbConnect();
    const deletedComponent = await Component.findByIdAndDelete(id);

    if (!deletedComponent) {
      return new NextResponse(JSON.stringify({ message: 'Component not found' }), { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete component:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
