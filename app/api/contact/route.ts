import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/lib/schemas/Contact";
import { sendContactEmail } from "@/lib/sendContactEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();

    // ✅ Save instantly
    await Contact.create(body);

    // ✅ Respond immediately (FAST)
    const response = NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 }
    );

    // ✅ Send email in background (DO NOT await)
    sendContactEmail(body).catch((err) =>
      console.error("Email failed:", err)
    );

    return response;
  } catch (error) {
    console.error("Contact save failed:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }
}
