// app/page.tsx
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/HeroSection';
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';
import Category from '@/lib/schemas/Category'; 
import ComponentCard from '@/components/ComponentCard';


export default async function HomePage() {
  await dbConnect();
  
  // This line forces Mongoose to check if the Category model is registered.
  // It's a robust way to prevent the race condition in Next.js's serverless environment.
  Category.modelName; 

  const components = await Component.find({}).populate('category').lean();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
              <HeroSection />
          <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className=" text-white">Latest </span>
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Components
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-gray-400">
           Handpicked components showcasing the best of modern design with 3D animations .
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
  {components.map((component, index) => (
    <div
      key={String(component._id)}
      className="animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <ComponentCard
        component={JSON.parse(JSON.stringify(component))}
        onPreview={() => console.log("Preview", component._id)}
        onCopy={() => console.log("Copy", component._id)}
      />
    </div>
  ))}
</div>


        {/* View All Button */}

  <button
    className="group border-2 border-neon-cyan text-neon-cyan font-semibold rounded-full px-6 py-3 flex items-center gap-2 mx-auto transition-all duration-300 hover:shadow-[0_0_20px_hsl(180,100%,50%),0_0_40px_hsl(180,100%,50%)] hover:-translate-y-0.5"
  >
    <span>View All Components</span>
    {/* <span className="transition-transform duration-300 group-hover:translate-x-1">→</span> */}
  </button>


      </div>
    </section>
      </main>
      <Footer />
    </div>
  );
}
