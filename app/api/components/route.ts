export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // 🔥 VERY IMPORTANT

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Component from "@/lib/schemas/Component";
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
  try {
    const session = await auth();

    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const category = formData.get("category") as string;

    const npmPackages = JSON.parse(
      (formData.get("npmPackages") as string) || "[]"
    );

    const frameworks = JSON.parse(
      (formData.get("frameworks") as string) || "[]"
    );

    const extraFields = JSON.parse(
      (formData.get("extraFields") as string) || "{}"
    );

    let code: any;

    // =========================
    // FRONTEND
    // =========================
    if (type === "frontend") {
      code = formData.get("code") as string;

      if (!code) {
        return NextResponse.json(
          { message: "Frontend code required" },
          { status: 400 }
        );
      }
    }

    // =========================
    // BACKEND
    // =========================
    if (type === "backend") {
      try {
        code = JSON.parse(formData.get("codes") as string);

        if (typeof code !== "object") throw new Error();
      } catch {
        return NextResponse.json(
          { message: "Invalid backend code format" },
          { status: 400 }
        );
      }
    }

    // =========================
    // IMAGE (ONLY FRONTEND)
    // =========================
    let previewImage = "";

    const file = formData.get("previewImage") as File;

    // 🔥 CONVERT IMAGE TO BASE64
    if (type === "frontend" && file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      previewImage = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    const component = await Component.create({
      name,
      description,
      type,
      code,
      frameworks,
      npmPackages,
      category: category || null,
      extraFields,
      previewImage, // ✅ NOW SAVED
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