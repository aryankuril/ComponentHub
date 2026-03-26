// app/signup/page.tsx
import React from 'react'
import Profile from '@/AllComponents/Profile'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "My Profile | Bombay Blokes Component Library",
  description:
    "Manage your profile, access your saved components, and control your account settings on Bombay Blokes. Build faster with your personalized dashboard.",
};

const Index = () => {
  return (
    <div>
      <Profile/>
    </div>
  )
}

export default Index
