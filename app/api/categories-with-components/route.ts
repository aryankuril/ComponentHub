export const runtime = "nodejs";

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Category from '@/lib/schemas/Category'

export async function GET() {
  await dbConnect()

  const categories = await Category.aggregate([
    {
      $lookup: {
        from: 'components',
        localField: '_id',
        foreignField: 'category',
        as: 'components',
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
  ])

  return NextResponse.json(categories)
}
