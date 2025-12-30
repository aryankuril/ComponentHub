// app/profile/page.tsx
import { auth } from '@/lib/server-auth'
import { redirect } from 'next/navigation'
import ProfileCard from '@/components/profile/ProfileCard'
import UserManagement from '@/components/profile/UserManagement'
import dbConnect from '@/lib/mongodb'
import User from '@/lib/schemas/User'
import { Types } from 'mongoose'
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

interface DbUser {
  _id: Types.ObjectId
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt?: Date
  image?: string | null
}

export default async function ProfilePage() {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/login')
  }

  await dbConnect()

  // ✅ explicitly tell TS this returns ONE user or null
  const dbUser = (await User.findById(session.user.id).lean()) as DbUser | null

  if (!dbUser) {
    redirect('/login')
  }

  const profileUser = {
    id: dbUser._id.toString(),
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role,
    dateCreated: dbUser.createdAt ?? new Date(),
    image: dbUser.image ?? null,
  }

  return (
    <div > 
            <Navbar />
    <div className="min-h-screen py-10 md:py-15 lg:py-20 px-4 bg-black white-text">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          My Profile
        </h1>

        <ProfileCard user={profileUser} />

        {/* {profileUser.role === 'admin' && (
          <div className="mt-12 p-8 bg-gray-900 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-red-400">
              Admin Controls
            </h2>
            <UserManagement currentUserEmail={profileUser.email} />
          </div>
        )} */}
      </div>
    </div>
          <Footer />
    </div>
  )
}
