export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Component from "@/lib/schemas/Component";
import Category from "@/lib/schemas/Category";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const component = await Component.findById(params.id).lean();

    if (!component) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 }
      );
    }

    // SAFE POPULATE MANUALLY
    if (component.category) {
      try {
        const category = await Category.findById(component.category)
          .select("name")
          .lean();

        component.category = category || null;
      } catch {
        component.category = null;
      }
    }

    return NextResponse.json(component);

  } catch (error) {
    console.error("REAL ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}