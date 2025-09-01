import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/server-auth';
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';

export async function GET(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  const { params } = context;

  const session = await auth();

  if (!session?.user?.role || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: 'Missing component ID' }, { status: 400 });
  }

  try {
    await dbConnect();
    const component = await Component.findById(id).populate('category', 'name').lean();

    if (!component) {
      return NextResponse.json({ message: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json(component);
  } catch (error: unknown) {
    console.error('Failed to fetch component:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message }, { status: 500 });
  }
}
