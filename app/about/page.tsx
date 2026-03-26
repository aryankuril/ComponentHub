import React from 'react'
import About from '@/AllComponents/About'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us | Bombay Blokes Ready Components Library",
  description:
    "Learn about Bombay Blokes and our mission to help developers build faster using high-quality, ready-to-use Next.js, React, and Tailwind CSS components.",
};

const Index = () => {
  return (
    <div>
      <About/>
    </div>
  )
}

export default Index