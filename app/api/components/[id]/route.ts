import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';

// Define params type for this route
interface Params {
  params: {
    id: string;
  };
}

// GET
export async function GET(req: Request, { params }: Params) {
  const { id } = params;

  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const component = await Component.findById(id).populate('category', 'name');

    if (!component) {
      return NextResponse.json({ message: 'Component not found' }, { status: 404 });
    }

       return NextResponse.json({ message: `Component with id: ${id}` });
  } catch (error) {
    console.error('Failed to fetch component:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }

 
}

// PATCH
export async function PATCH(req: Request, { params }: Params) {
  const { id } = params;
  const body = await req.json();

  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { name, description, code, npmPackages, category } = await req.json();

  try {
    await dbConnect();

    const updatedComponent = await Component.findByIdAndUpdate(
      id,
      { name, description, code, npmPackages, category: category || null },
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!updatedComponent) {
      return NextResponse.json({ message: 'Component not found' }, { status: 404 });
    }

     return NextResponse.json({
    message: `Updated component ${id}`,
    data: body,
  });
  } catch (error) {
    console.error('Failed to update component:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = params;

  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const deletedComponent = await Component.findByIdAndDelete(id);

    if (!deletedComponent) {
      return NextResponse.json({ message: 'Component not found' }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete component:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
