import dbConnect from "@/lib/mongodb";
import Component from "@/lib/schemas/Component";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const components = await Component.find({ type: "frontend" })
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
