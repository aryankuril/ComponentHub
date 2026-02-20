export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import { auth } from "@/lib/server-auth";
import dbConnect from "@/lib/mongodb";
import Component from "@/lib/schemas/Component";

// GET single component (PUBLIC)
export async function GET(
  req: NextRequest,
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
    console.error("Failed to fetch component:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH (ADMIN ONLY)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
          { message: "Image too large. Max 2MB allowed." },
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
      { new: true, runValidators: true }
    ).populate("category", "name");

    return NextResponse.json({
      message: `Updated component ${params.id}`,
      data: updatedComponent,
    });
  } catch (error) {
    console.error("Failed to update component:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE (ADMIN ONLY)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const deletedComponent = await Component.findByIdAndDelete(params.id);

    if (!deletedComponent) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete component:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}