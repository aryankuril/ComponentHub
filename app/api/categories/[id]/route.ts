import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import ComponentModel from '@/lib/schemas/Component';

// GET single component by ID
export async function GET(req: NextRequest, context) {
  const { id } = context.params;

  try {
    await dbConnect();
    const component = await ComponentModel.findById(id);

    if (!component) {
      return NextResponse.json({ message: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json(component);
  } catch (error) {
    console.error('GET /components/[id] error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH update component (Admin only)
export async function PATCH(req: NextRequest, context) {
  const { id } = context.params;

  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const data = await req.json();

    const updated = await ComponentModel.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return NextResponse.json({ message: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PATCH /components/[id] error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE component (Admin only)
export async function DELETE(req: NextRequest, context) {
  const { id } = context.params;

  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const deleted = await ComponentModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Component deleted successfully' });
  } catch (error) {
    console.error('DELETE /components/[id] error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
