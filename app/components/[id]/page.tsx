import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';
import Category from '@/lib/schemas/Category';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    // Touch Category model to ensure registration (explicitly used to avoid ESLint warning)
    const _ = Category.modelName;

    const componentId = params.id;
    const component = await Component.findById(componentId).populate('category').lean();

    if (!component) {
      return NextResponse.json({ error: 'Component not found.' }, { status: 404 });
    }

    return NextResponse.json(component);

  } catch (error: unknown) {
    console.error('Error fetching component:', error);

    // Narrow the unknown error
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
