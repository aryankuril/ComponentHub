// app/signup/page.tsx
import React from 'react'
import SignUp from '@/AllComponents/SignUp'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sign Up | Bombay Blokes Component Library",
  description:
    "Create your Bombay Blokes account and get access to ready-to-use Next.js, React, and Tailwind CSS components to build faster and smarter.",
};

const Index = () => {
  return (
    <div>
      <SignUp/>
    </div>
  )
}

export default Index
