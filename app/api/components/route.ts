export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Buffer } from "buffer";

import dbConnect from "@/lib/mongodb";
import Component from "@/lib/schemas/Component";
import Subscriber from "@/lib/schemas/Subscriber";
import { sendNewComponentEmail } from "@/lib/sendNewComponentEmail";
import { auth } from "@/lib/server-auth";

export async function GET() {
  try {
    await dbConnect();
    const components = await Component.find().populate("category");
    return NextResponse.json(components);
  } catch (error) {
    console.error("GET COMPONENTS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch components" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const formData = await req.formData();

    console.log("FORM DATA:", Array.from(formData.entries()));

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const code = formData.get("code") as string;
    const category = formData.get("category") as string;

    const npmPackages = JSON.parse(
      (formData.get("npmPackages") as string) || "[]"
    );

    let previewImage = "";

    const file = formData.get("previewImage") as File | null;

    console.log("FILE RECEIVED:", file?.name, file?.size, file?.type);

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      previewImage = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    const component = await Component.create({
      name,
      description,
      code,
      npmPackages,
      category: category || null,
      previewImage,
    });

    const subscribers = await Subscriber.find({}, "email");
    const emails = subscribers.map((s) => s.email);

    if (emails.length > 0) {
      await sendNewComponentEmail(
        emails,
        component.name,
        component._id.toString()
      );
    }

    return NextResponse.json(component, { status: 201 });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { message: "Failed to create component" },
      { status: 500 }
    );
  }
}
