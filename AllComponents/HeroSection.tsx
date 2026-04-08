// components/HeroSection.tsx
'use client';

import { useRouter } from 'next/navigation'
import ThreeDElement from '@/app/ThreeDElement';
import { useEffect, useState } from "react";

export default function HeroSection({ components }: { components: any[] }) {
  const router = useRouter()

  const handleViewMore = () => {
    if (!components || components.length === 0) {
      console.warn('Components not loaded yet')
      return
    }

    router.push(`/components/${components[0]._id}`)
  }

  // ✅ Counter Component (Inside Same File)
  const Counter = ({ end, duration = 2000, suffix = "" }: any) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const incrementTime = 20;
      const steps = duration / incrementTime;
      const incrementValue = end / steps;

      const timer = setInterval(() => {
        start += incrementValue;

        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }, [end, duration]);

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <section className="relative h-full py-10 md:py-15 lg:py-20 flex items-center justify-center overflow-hidden">
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

        <div
          className="absolute top-40 right-20 w-16 h-16 bg-[#fab31e] rounded-full animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-[#fab31e] rotate-45 animate-float"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 border border-[#fab31e] rounded-full animate-float"
          style={{ animationDelay: '3s' }}
        />


      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-slide-up">
          {/* Badge */}
          <div
            className="inline-flex items-center space-x-2 border font-miso rounded-full px-4 py-2 text-sm "
            style={{
              backgroundColor: 'rgba(249,179,27,0.1)',
              borderColor: 'rgba(249,179,27,0.3)',
              color: '#F9B31B',
            }}
          >
            <span>Modern Component Showcase</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 text-center mx-auto">
  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-miso">
    <span className="block mb-2 black-text">Build with</span>
    <span className="text-primary"> Ready Components </span>
  </h1>

  <p className="max-w-xl mx-auto black-text body2 font-poppins">
    Discover stunning Ready Components with Bombay Blokes.
    Copy, customize, and create beautiful modern interfaces.
  </p>
</div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 pt-10 border-t border-border black-text">
            <ThreeDElement intensity={8}>
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="numbering font-bold text-primary font-poppins">
                  <Counter end={150} suffix="+" />
                </div>
                <div className="black-text body2 font-miso ">Components</div>
              </div>
            </ThreeDElement>

            <ThreeDElement intensity={8}>
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="numbering font-bold text-primary font-poppins">
                  <Counter end={50} suffix="k+" />
                </div>
                <div className="text-muted-foreground black-text font-miso text-xs sm:text-base">
                  Downloads
                </div>
              </div>
            </ThreeDElement>

            <ThreeDElement intensity={8}>
              <div className="text-center space-y-1 sm:space-y-2">
                <div className="numbering font-bold text-primary font-poppins">
                  <Counter end={12} />
                </div>
                <div className="black-text text-xs sm:text-base font-miso">Categories</div>
              </div>
            </ThreeDElement>
          </div>
        </div>
      </div>

      {/* Glow Effects */}
    
    </section>
  );
}
