export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Component from "@/lib/schemas/Component";
import Category from "@/lib/schemas/Category";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid component ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const code = formData.get("code") as string;
    const category = formData.get("category") as string;

    const npmPackages = JSON.parse(
      (formData.get("npmPackages") as string) || "[]"
    );

    const file = formData.get("previewImage") as File;

    let updateData: any = {
      name,
      description,
      code,
      npmPackages,
      category: category || null,
    };

    // 🔥 Only update image if new file uploaded
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      updateData.previewImage = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    const updated = await Component.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });

  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update component" },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid component ID" },
        { status: 400 }
      );
    }

    const component = await Component.findById(id).lean();

    if (!component) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 }
      );
    }

    // 🔥 Properly type cast
    const typedComponent = component as any;

    let categoryData = null;

    if (typedComponent.category) {
      categoryData = await Category.findById(typedComponent.category)
        .select("name")
        .lean();
    }

    return NextResponse.json({
      ...typedComponent,
      category: categoryData,
    });

  } catch (error) {
    console.error("REAL GET ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid component ID" },
        { status: 400 }
      );
    }

    const deleted = await Component.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Component deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete component" },
      { status: 500 }
    );
  }
}