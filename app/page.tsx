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

const components = await Component.find(
  {},
  {
    name: 1,
    description: 1,
    category: 1,
  }
)
.populate('category', 'name')
.limit(6)
.lean()



  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
       <HeroSection
  components={components.map((c) => JSON.parse(JSON.stringify(c)))}
/>


        {/* ✅ CLIENT COMPONENT */}
        <LandingPage
          components={components.map((c) => JSON.parse(JSON.stringify(c)))}
        />
      </main>

      <Footer />
    </div>
  )
}
