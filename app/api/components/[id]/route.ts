export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Component from "@/lib/schemas/Component";
import Category from "@/lib/schemas/Category";

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