// app/page.tsx

import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import HeroSection from '@/components/HeroSection'
import dbConnect from '@/lib/mongodb'
import Component from '@/lib/schemas/Component'
import LandingPage from '@/components/LandingPage'

// 🚨 VERY IMPORTANT → disable static generation
export const dynamic = "force-dynamic";

export default async function HomePage() {
  await dbConnect()

  // ✅ Only fetch required fields (NO code field)
  const components = await Component.find(
    {},
    {
      name: 1,
      description: 1,
      category: 1,
    }
  )
    .populate('category', 'name')
    .limit(6) // ✅ only what UI needs
    .lean()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <HeroSection components={components} />
        <LandingPage components={components} />
      </main>

      <Footer />
    </div>
  )
}