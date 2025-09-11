// components/HeroSection.tsx
'use client';
// import { ArrowRight, Sparkles, Zap, Code2 } from "lucide-react";
import ThreeDElement from '@/app/ThreeDElement';

export default function HeroSection() {


  return (
         <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div
      className="absolute top-20 left-10 w-20 h-20 border-2 rounded-lg animate-float"
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
              <span className="block mb-2 text-white">Build with</span>
             <span className="text-[#F9B31B]" > Next Components </span>

            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
              Discover stunning 3D-animated components with neon themes. 
              Copy, customize, and create beautiful modern interfaces.
            </p>
          </div>

          {/* CTA Buttons */}
         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  {/* Gradient Hero Button */}
  <button
  style={{
    backgroundImage: 'linear-gradient(135deg, #F9B31B, #EBEBEB)',
  }}

          className="group text-black font-semibold rounded-full px-6 py-3 flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_#F9B31B,0_0_40px_#F9B31B] hover:-translate-y-0.5"
        >
          <span>Explore Components</span>
        </button>


  <button
              className="group border-2 border-[#F9B31B] text-[#F9B31B] font-semibold rounded-full px-6 py-3 flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_#F9B31B,0_0_40px_#F9B31B] hover:-translate-y-0.5"
            >
              <span>View Documentation</span>
            </button>
</div>


          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 pt-10 border-t border-border text-white">


            <ThreeDElement intensity={8}>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-[#F9B31B]">150+</div>
                <div className="text-white">Components</div>
              </div>
            </ThreeDElement>
            <ThreeDElement intensity={8}>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-[#F9B31B]">50k+</div>
                <div className="text-muted-foreground text-white">Downloads</div>
              </div>
            </ThreeDElement>
            <ThreeDElement intensity={8}>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-[#F9B31B]">12</div>
                <div className="text-white">Categories</div>
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