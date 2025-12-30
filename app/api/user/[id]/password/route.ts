import { NextResponse } from 'next/server'
import { auth } from '@/lib/server-auth'
import dbConnect from '@/lib/mongodb'
import User from '@/lib/schemas/User'
import bcrypt from 'bcryptjs'

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  // ✅ CORRECT ID EXTRACTION
  const { pathname } = new URL(req.url)
  const segments = pathname.split('/')
  const id = segments[segments.length - 2] // 👈 THIS IS THE FIX

  if (!id) {
    return NextResponse.json({ message: 'User ID missing' }, { status: 400 })
  }

  const { currentPassword, newPassword } = await req.json()

  await dbConnect()
  const user = await User.findById(id)

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  // 🔒 Only self or admin
  if (session.user.id !== id && session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  // ✅ Verify current password
  const isValid = await bcrypt.compare(currentPassword, user.password)
  if (!isValid) {
    return NextResponse.json(
      { message: 'Current password is incorrect' },
      { status: 400 }
    )
  }

  // ✅ Update password
  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()

  return NextResponse.json({
    success: true,
    message: 'Password updated successfully',
  })
}
