
// app/profile/page.tsx
"use client";

import { useState } from "react";
import { User, Mail, Lock, Edit } from "lucide-react";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  role: "user" | "admin";
}

export default function Profile({ user }: { user: User }) {
  const { update } = useSession();
  const [activeTab, setActiveTab] = useState<"profile" | "favorites" | "activity">("profile");
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    joinDate: user.joinDate,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [message, setMessage] = useState("");

// Profile update handler - now simulates an API call
const handleProfileSave = (e: React.FormEvent<HTMLButtonElement>) => {
  e.preventDefault();
  setMessage("Updating profile...");

  // Simulate a successful API call
  setTimeout(() => {
    setMessage("✅ Profile updated successfully!");
    setIsEditingProfile(false);
    // Here you would typically handle a state update from the API response
    // For this example, we just clear the message after a short delay
    setTimeout(() => setMessage(""), 3000);
  }, 1500);
};

//   // Password update handler - now simulates an API call
  const handlePasswordSave = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessage("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("❌ Error: Passwords do not match.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage("❌ Error: New password must be at least 6 characters long.");
      return;
    }

    setMessage("Updating password...");

    // Simulate a successful API call
    setTimeout(() => {
      setMessage("✅ Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setIsEditingPassword(false);
      setTimeout(() => setMessage(""), 3000);
    }, 1500);
  };


  return (
    <div className="min-h-screen bg-black text-white px-4">
      <div className="container mx-auto max-w-4xl space-y-12">
        {/* Profile Header */}
        <div className="text-center space-y-6">
          <div className="inline-block relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-black text-2xl font-bold shadow-lg shadow-neon-cyan/30 border-2 border-neon-cyan">
              {profileData.name.split(" ").map((n) => n[0]).join("")}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
              {profileData.name}
            </h1>
            <p className="text-gray-400 mt-2">Member since {profileData.joinDate}</p>
          </div>
        </div>

          {/* Message Container */}
       {message && (
          <div className={`p-4 rounded-lg text-center font-medium ${message.startsWith('✅') ? 'bg-green-600/30 text-green-300' : 'bg-red-600/30 text-red-300'}`}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <div>
          <div className="grid grid-cols-3 gap-2 bg-gray-900/40 rounded-lg p-1">
            <button
              className={`flex items-center justify-center gap-2 py-2 rounded-md transition ${
                activeTab === "profile"
                  ? "bg-neon-cyan/20 text-neon-cyan"
                  : "hover:bg-gray-800 text-gray-400"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="w-4 h-4" /> Profile
            </button>    
          </div>
        </div>

        {/* Profile Tab */}
        {/* {activeTab === "profile" && ( */}
          <div className="space-y-8">
            {/* Personal Info */}
            <div className="bg-gray-900 border border-neon-cyan/40 rounded-xl p-6 shadow-lg shadow-neon-cyan/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-neon-cyan">Personal Information</h2>
                  <p className="text-gray-400 text-sm">Manage your account details</p>
                </div>
                <button
                  className="px-4 py-1 text-sm border border-neon-cyan text-neon-cyan rounded-lg hover:bg-neon-cyan hover:text-black transition"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  <Edit className="w-4 h-4 inline mr-2" />
                  {isEditingProfile ? "Cancel" : "Edit"}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="text-neon-cyan text-sm">Full Name</label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={profileData.name}
                      disabled={!isEditingProfile}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full pl-10 py-2 bg-black/40 border border-neon-cyan/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                    />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label className="text-neon-cyan text-sm">Email</label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={profileData.email}
                      disabled={!isEditingProfile}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full pl-10 py-2 bg-black/40 border border-neon-cyan/40 rounded-lg"
                    />
                  </div>
                </div>
              </div>
               {isEditingProfile && (
                <div className="flex justify-end mt-4">
                  <button onClick={handleProfileSave} className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-purple-600 transition">
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Security */}
            <div className="bg-gray-900 border border-neon-purple/40 rounded-xl p-6 shadow-lg shadow-neon-purple/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-neon-purple">Security Settings</h2>
                  <p className="text-gray-400 text-sm">Update your password</p>
                </div>
                <button
                  className="px-4 py-1 text-sm border border-neon-purple text-neon-purple rounded-lg hover:bg-neon-purple hover:text-black transition"
                  onClick={() => setIsEditingPassword(!isEditingPassword)}
                >
                  <Lock className="w-4 h-4 inline mr-2" />
                  {isEditingPassword ? "Cancel" : "Change Password"}
                </button>
              </div>
              {isEditingPassword && (
                <div className="space-y-4">
                  <div>
                    <label className="text-neon-purple text-sm">Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full py-2 px-3 bg-black/40 border border-neon-purple/40 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-neon-purple text-sm">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full py-2 px-3 bg-black/40 border border-neon-purple/40 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-neon-purple text-sm">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                      className="w-full py-2 px-3 bg-black/40 border border-neon-purple/40 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button onClick={handlePasswordSave} className="px-4 py-2 bg-neon-purple text-black rounded-lg hover:bg-neon-cyan transition">
                      Update Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        {/* // )} */}

      
      </div>
    </div>
  );
}



