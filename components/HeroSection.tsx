// components/HeroSection.tsx
'use client';
// import { ArrowRight, Sparkles, Zap, Code2 } from "lucide-react";
import { useRouter } from 'next/navigation'
import ThreeDElement from '@/app/ThreeDElement';
import Link from "next/link";
import ComponentCardList from '@/components/ComponentCardList'


export default function HeroSection({ components }: { components: any[] }) {
  const router = useRouter()

  const handleViewMore = () => {
  if (!components || components.length === 0) {
    console.warn('Components not loaded yet')
    return
  }

  router.push(`/components/${components[0]._id}`)
}


  return (
         <section className="relative h-full py-10 md:py-15 lg:py-20 flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div
  className="
    absolute
    top-12 left-4
    sm:top-16 sm:left-8
    md:top-20 md:left-10

    w-10 h-10
    sm:w-14 sm:h-14
    md:w-20 md:h-20

    border-2 rounded-lg
    animate-float
  "
  style={{ borderColor: '#F9B31B', animationDelay: '0s' }}
/>

        <div className="absolute top-40 right-20 w-16 h-16 bg-neon-purple/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-neon-green/40 rotate-45 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-neon-pink/20 rounded-full animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-slide-up">
          {/* Badge */}
          <div
        className="inline-flex items-center space-x-2 border rounded-full px-4 py-2 text-sm font-medium"
        style={{
          backgroundColor: 'rgba(249,179,27,0.1)',
          borderColor: 'rgba(249,179,27,0.3)',
          color: '#F9B31B',
        }}
      >
        <span>Modern Component Showcase</span>
      </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
              <span className="block mb-2  white-text ">Build with</span>
             <span className=" text-primary " > Next Components </span>

            </h1>
            <p className="text-xl sm:text-2xl  white-text  max-w-3xl mx-auto leading-relaxed">
              Discover stunning 3D-animated components with neon themes. 
              Copy, customize, and create beautiful modern interfaces.
            </p>
          </div>

          {/* CTA Buttons */}
{/*  */}



          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 pt-10 border-t border-border white-text">
  <ThreeDElement intensity={8}>
    <div className="text-center space-y-1 sm:space-y-2">
      <div className="text-2xl sm:text-3xl font-bold text-primary">150+</div>
      <div className="white-text text-xs sm:text-base">Components</div>
    </div>
  </ThreeDElement>

  <ThreeDElement intensity={8}>
    <div className="text-center space-y-1 sm:space-y-2">
      <div className="text-2xl sm:text-3xl font-bold text-primary">50k+</div>
      <div className="text-muted-foreground white-text text-xs sm:text-base">
        Downloads
      </div>
    </div>
  </ThreeDElement>

  <ThreeDElement intensity={8}>
    <div className="text-center space-y-1 sm:space-y-2">
      <div className="text-2xl sm:text-3xl font-bold text-primary">12</div>
      <div className="white-text text-xs sm:text-base">Categories</div>
    </div>
  </ThreeDElement>
</div>

        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </section>
  );
}