export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import dbConnect from "@/lib/mongodb";
import Component from "@/lib/schemas/Component";
import { auth } from "@/lib/server-auth";

/* ===============================
   GET SINGLE COMPONENT (PUBLIC)
================================= */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const component = await Component.findById(params.id).populate(
      "category",
      "name"
    );

    if (!component) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(component);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ===============================
   PATCH (ADMIN ONLY)
================================= */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  if (session.user?.role !== "admin") {
    return NextResponse.json(
      { message: "Not authorized" },
      { status: 403 }
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

    const existingComponent = await Component.findById(params.id);

    if (!existingComponent) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 }
      );
    }

    let previewImage = existingComponent.previewImage || "";

    const file = formData.get("previewImage") as File | null;

    if (file && file.size > 0) {
      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { message: "Image too large (max 2MB)" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      previewImage = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    const updatedComponent = await Component.findByIdAndUpdate(
      params.id,
      {
        name,
        description,
        code,
        npmPackages,
        category: category || null,
        previewImage,
      },
      { new: true }
    ).populate("category", "name");

    return NextResponse.json(updatedComponent);
  } catch (error) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ===============================
   DELETE (ADMIN ONLY)
================================= */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  if (session.user?.role !== "admin") {
    return NextResponse.json(
      { message: "Not authorized" },
      { status: 403 }
    );
  }

  try {
    await dbConnect();

    const deleted = await Component.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}