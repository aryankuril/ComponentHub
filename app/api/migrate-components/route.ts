import dbConnect from "@/lib/mongodb";
import Component from "@/lib/schemas/Component";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const session = await auth();


    await dbConnect();

    // 🔍 Find old components (no type field)
    const components = await Component.find({
      type: { $exists: false },
    });

    let updatedCount = 0;

    for (const comp of components) {
      comp.type = "frontend"; // default

      // 🔥 if code is object → backend
      if (typeof comp.code === "object") {
        comp.type = "backend";

        comp.frameworks = Object.keys(comp.code);
      } else {
        comp.frameworks = [];
      }

      comp.extraFields = comp.extraFields || {};

      await comp.save();
      updatedCount++;
    }

    return NextResponse.json({
      message: "Migration completed ✅",
      updated: updatedCount,
    });

  } catch (error) {
    console.error("MIGRATION ERROR:", error);

    return NextResponse.json(
      { message: "Migration failed" },
      { status: 500 }
    );
  }
}