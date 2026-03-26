import React from 'react'
import Components from '@/AllComponents/Components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Browse Components | Next.js, React & Tailwind UI Library",
  description:
    "Browse a collection of modern, reusable UI components built with Next.js, React, and Tailwind CSS. Copy, customize, and ship faster with Bombay Blokes.",
};

const Index = () => {
  return (
    <div>
      <Components/>
    </div>
  )
}

export default Index