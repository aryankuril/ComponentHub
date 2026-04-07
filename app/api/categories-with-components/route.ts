export const runtime = "nodejs";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/lib/schemas/Category";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // e.g. "frontend"

  const categories = await Category.aggregate([
    {
      $lookup: {
        from: "components",
        let: { categoryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$category", "$$categoryId"] },
                  ...(type ? [{ $eq: ["$type", type] }] : []),
                ],
              },
            },
          },
        ],
        as: "components",
      },
    },
    {
      $match: {
        components: { $ne: [] },
      },
    },
    {
      $project: {
        name: 1,
        components: {
          _id: 1,
          name: 1,
        },
      },
    },
  ]);

  return NextResponse.json(categories);
}
