
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Component from "@/lib/schemas/Component";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = params;

    // 🔥 Validate ObjectId FIRST
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid component ID" },
        { status: 400 }
      );
    }

    const component = await Component.findById(id)
      .populate("category", "name")
      .lean();

    if (!component) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(component);

  } catch (error) {
    console.error("REAL GET ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}