// app/page.tsx
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/HeroSection';
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';
import Category from '@/lib/schemas/Category'; 
import ComponentCardList from '@/components/ComponentCardList';

export default async function HomePage() {
  await dbConnect();

  Category.modelName;

  const components = await Component.find({}).populate('category').lean();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <HeroSection />
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className=" text-white">Latest </span>
               <span
  className="text-[#F9B31B]"
>
  Components
</span>

              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-white">
                Handpicked components showcasing the best of modern design with 3D animations.
              </p>
            </div>

            {/* Now pass components to Client Wrapper */}
            <ComponentCardList components={components.map(c => JSON.parse(JSON.stringify(c)))} />

            <button
              className="group border-2 border-[#F9B31B] text-[#F9B31B] font-semibold rounded-full px-6 py-3 flex items-center gap-2 transition-all  mx-auto duration-300 hover:shadow-[0_0_20px_#F9B31B,0_0_40px_#F9B31B] hover:-translate-y-0.5"
            >
              <span>View Documentation</span>
            </button>
          
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
