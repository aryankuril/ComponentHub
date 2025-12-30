import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';
import Subscriber from '@/lib/schemas/Subscriber';
import { sendNewComponentEmail } from '@/lib/sendNewComponentEmail';
import { auth } from '@/lib/server-auth';

/* =========================
   GET → Fetch components
========================= */
export async function GET() {
  try {
    await dbConnect();

    const components = await Component.find().populate('category');
    return NextResponse.json(components);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to fetch components' },
      { status: 500 }
    );
  }
}

/* =========================
   POST → Create component
   + notify subscribers
========================= */
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    await dbConnect();

    // ✅ Create component
    const component = await Component.create(body);

    // ✅ Get subscribers
    const subscribers = await Subscriber.find({}, 'email');
    const emails = subscribers.map((s) => s.email);

    // ✅ Send emails
    if (emails.length > 0) {
      await sendNewComponentEmail(
        emails,
        component.name,
        component._id.toString()
      );
    }

    return NextResponse.json(component, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to create component' },
      { status: 500 }
    );
  }
}
