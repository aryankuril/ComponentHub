export const runtime = "nodejs";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Component from "@/lib/schemas/Component";
import Category from "@/lib/schemas/Category";
import { auth } from "@/lib/server-auth";

export async function GET() {
  try {
    await dbConnect();

    const components = await Component.find()
      .populate("category", "name")
      .lean();

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
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const code = formData.get("code") as string;
    const category = formData.get("category") as string;

    const npmPackages = JSON.parse(
      (formData.get("npmPackages") as string) || "[]"
    );

    const component = await Component.create({
      name,
      description,
      code,
      npmPackages,
      category: category || null,
      previewImage: "",
    });

    return NextResponse.json(component, { status: 201 });

  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { message: "Failed to create component" },
      { status: 500 }
    );
  }
}