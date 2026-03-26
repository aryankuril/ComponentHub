import React from 'react'
import Contact from '@/AllComponents/Contact';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us | Bombay Blokes Component Library Support",
  description:
    "Get in touch with Bombay Blokes for support, feedback, or collaboration. We're here to help you build faster with our ready-to-use component library.",
};
const Index = () => {
  return (
    <div>
      <Contact/>
    </div>
  )
}

export default Index