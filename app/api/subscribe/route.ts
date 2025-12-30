import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subscriber from "@/lib/schemas/Subscriber";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

    await dbConnect();

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return NextResponse.json({ message: "Already subscribed" });
    }

    await Subscriber.create({ email });

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (err) {
    return NextResponse.json({ message: "Subscription failed" }, { status: 500 });
  }
}
