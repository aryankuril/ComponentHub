import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';
import Category from '@/lib/schemas/Category';
import { NextResponse } from 'next/server';

// This API route will handle GET requests for a single component by its ID.
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    // We explicitly touch the Category model to ensure it's registered with Mongoose.
    Category.modelName;

    const componentId = params.id;

    const component = await Component.findById(componentId).populate('category').lean();

    if (!component) {
      return NextResponse.json({ error: 'Component not found.' }, { status: 404 });
    }

    // Since the API route is not a React component, we can return the raw JSON object.
    return NextResponse.json(component);

  } catch (error: any) {
    console.error('Error fetching component:', error);
    // Return a generic error message for security and a 500 status code.
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
