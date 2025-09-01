import { NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';

// GET route
export async function GET(
  req: Request,
  { params }: { params: Record<string, string> }
) {
  const session = await auth();
  if (!session || session.user?.role !== 'admin') {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}


  const id = params.id; // string | undefined
  if (!id) {
    return NextResponse.json({ message: 'Missing component ID' }, { status: 400 });
  }

  try {
    await dbConnect();
    const component = await Component.findById(id).populate('category', 'name');

    if (!component) {
      return NextResponse.json({ message: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json(component);
  } catch (error) {
    console.error('Failed to fetch component:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH route
export async function PATCH(
  req: Request,
  { params }: { params: Record<string, string> }
) {
  const session = await auth();
  if (!session || session.user?.role !== 'admin') {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}


  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: 'Missing component ID' }, { status: 400 });
  }

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
        category: category || null,
      },
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!updatedComponent) {
      return NextResponse.json({ message: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json(updatedComponent);
  } catch (error) {
    console.error('Failed to update component:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE route
export async function DELETE(
  req: Request,
  { params }: { params: Record<string, string> }
) {
  const session = await auth();
if (!session || session.user?.role !== 'admin') {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}


  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: 'Missing component ID' }, { status: 400 });
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
