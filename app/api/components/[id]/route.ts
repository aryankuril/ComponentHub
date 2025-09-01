import { NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';

// GET route to fetch a single component by ID (Admin only)
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || session.user?.role !== 'admin') {
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
  } catch (error: unknown) {
    console.error('Failed to fetch component:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

// PATCH route to update a component by ID (Admin only)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || session.user?.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const { name, description, code, npmPackages, category } = await req.json();

  try {
    await dbConnect();

    const updatedComponent = await Component.findByIdAndUpdate(
      id,
      {
        name,
        description,
        code,
        npmPackages,
        category: category || null, // Ensure category is set to null if not provided
      },
      { new: true, runValidators: true } // Return the updated document and run Mongoose validation
    ).populate('category', 'name');

    if (!updatedComponent) {
      return new NextResponse(JSON.stringify({ message: 'Component not found' }), { status: 404 });
    }

    return NextResponse.json(updatedComponent);
  } catch (error: unknown) {
    console.error('Failed to update component:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

// DELETE route to delete a component by ID (Admin only)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || session.user?.role !== 'admin') {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;

  try {
    await dbConnect();
    const deletedComponent = await Component.findByIdAndDelete(id);

    if (!deletedComponent) {
      return new NextResponse(JSON.stringify({ message: 'Component not found' }), { status: 404 });
    }

    return new NextResponse(null, { status: 204 }); // 204 No Content response
  } catch (error: unknown) {
    console.error('Failed to delete component:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
