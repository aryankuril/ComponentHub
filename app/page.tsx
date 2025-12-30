// app/page.tsx
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import HeroSection from '@/components/HeroSection'
import dbConnect from '@/lib/mongodb'
import Component from '@/lib/schemas/Component'
import Category from '@/lib/schemas/Category'
import LandingPage from '@/components/LandingPage'

export default async function HomePage() {
  await dbConnect()
  Category.modelName

  const components = await Component.find({})
    .populate('category')
    .lean()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <HeroSection />

        {/* ✅ CLIENT COMPONENT */}
        <LandingPage
          components={components.map((c) => JSON.parse(JSON.stringify(c)))}
        />
      </main>

      <Footer />
    </div>
  )
}
