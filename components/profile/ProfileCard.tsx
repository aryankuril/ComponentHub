'use client'

import { useState } from 'react'
import { User, Mail, Lock, Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UserType {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export default function ProfileCard({ user }: { user: UserType }) {
  const router = useRouter()

  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // ===============================
  // UPDATE NAME + EMAIL
  // ===============================
  const handleProfileSave = async () => {
    try {
      setMessage('Updating profile...')

      const res = await fetch(`/api/user/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Profile update failed')
      }

      setIsEditingProfile(false)
      setMessage('✅ Profile updated successfully')

      // 🔥 IMPORTANT: refresh server auth() session
      router.refresh()

      setTimeout(() => setMessage(null), 3000)
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    }
  }

  // ===============================
  // UPDATE PASSWORD
  // ===============================
  const handlePasswordSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('❌ Passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('❌ Password must be at least 6 characters')
      return
    }

    try {
      setMessage('Updating password...')

      const res = await fetch(`/api/user/${user.id}/password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Password update failed')
      }

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      setIsEditingPassword(false)
      setMessage('✅ Password updated successfully')

      router.refresh()

      setTimeout(() => setMessage(null), 3000)
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    }
  }

  return (
    <div className="space-y-10">
      {message && (
        <div className="p-4 rounded-lg text-center bg-gray-800 text-white">
          {message}
        </div>
      )}
      <div className="text-center space-y-6">
          <div className="inline-block relative">
            <div className="w-24 h-24 rounded-full uppercase bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-black text-2xl font-bold shadow-lg shadow-neon-cyan/30 border-2 border-neon-cyan">
              {profileData.name.split(" ").map((n) => n[0]).join("")}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold capitalize text-primary">
              {profileData.name}
            </h1>
            {/* <p className=" grey-text  mt-2">Member since {profileData.joinDate}</p> */}
          </div>
        </div>

      {/* PROFILE */}
      <div className="bg-gray-900 p-6 border border-transparent hover:border-[#F9B31B]/30 rounded-xl">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-3 py-1 rounded-md cursor-pointer border  hover:border-[#F9B31B] text-white hover:text-[#f2c053]"
          >
            <Edit className="w-4 h-4 inline mr-2" />
            {isEditingProfile ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm">Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                disabled={!isEditingProfile}
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="w-full pl-10 py-2 bg-black border border-[#fab31e]/30 rounded-lg focus:outline-none focus:border-[#fab31e] focus:ring-0.50 focus:ring-[#fab31e] transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                disabled={!isEditingProfile}
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full pl-10 py-2 bg-black border border-[#fab31e]/30 rounded-lg focus:outline-none focus:border-[#fab31e] focus:ring-0.50 focus:ring-[#fab31e] transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {isEditingProfile && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleProfileSave}
              className="px-4 py-2 bg-yellow-400 text-black rounded-md"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* PASSWORD */}
      <div className="bg-gray-900 p-6 border border-transparent hover:border-[#F9B31B]/30 rounded-xl">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Security</h2>
          <button
            onClick={() => setIsEditingPassword(!isEditingPassword)}
            className="px-3 py-1 rounded-md cursor-pointer border  hover:border-[#F9B31B] text-white hover:text-[#f2c053]"
          >
            <Lock className="w-4 h-4 inline mr-2" />
            {isEditingPassword ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {isEditingPassword && (
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
              className="w-full px-3 py-2 bg-black border border-[#fab31e]/30 rounded-lg focus:outline-none focus:border-[#fab31e] focus:ring-0.50 focus:ring-[#fab31e] transition-all duration-300"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
              className="w-full px-3 py-2 bg-black border border-[#fab31e]/30 rounded-lg focus:outline-none focus:border-[#fab31e] focus:ring-0.50 focus:ring-[#fab31e] transition-all duration-300"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
              className="w-full px-3 py-2 bg-black border border-[#fab31e]/30 rounded-lg focus:outline-none focus:border-[#fab31e] focus:ring-0.50 focus:ring-[#fab31e] transition-all duration-300"
            />

            <div className="flex justify-end">
              <button
                onClick={handlePasswordSave}
                className="px-4 py-2 bg-yellow-400 text-black rounded-md"
              >
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
