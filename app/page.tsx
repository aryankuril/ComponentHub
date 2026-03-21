// app/page.tsx
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import HeroSection from '@/components/HeroSection'
import dbConnect from '@/lib/mongodb'
import Component from '@/lib/schemas/Component'
import Category from '@/lib/schemas/Category'
import LandingPage from '@/components/LandingPage'

export const dynamic = "force-dynamic";
export default async function HomePage() {
  await dbConnect()
  Category.modelName


const components = await Component.find({})
  .populate('category')
  .limit(6)
  .lean()




  
//   
const cleanComponents = components.map((c: any) => ({
  _id: c._id.toString(),
  name: c.name || "",
  description: c.description || "",
  // 🔥 HANDLE ALL CASES
  image:
    c.previewImage?.startsWith("http")
      ? c.previewImage
      : `${process.env.NEXT_PUBLIC_BASE_URL}${c.previewImage || ""}`,

  createdAt: c.createdAt || null,

  category: c.category
    ? {
        _id: c.category._id?.toString(),
        name: c.category.name || "",
      }
    : null,
}))

  

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
