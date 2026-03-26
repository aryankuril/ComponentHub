import Navbar from "@/AllComponents/shared/Navbar";
import Footer from "@/AllComponents/shared/Footer";
import ThreeDElement from "@/app/ThreeDElement";
import { Code, Zap, Palette, Rocket } from "lucide-react";
import Button from "@/AllComponents/shared/Button";
const About = () => {
  const features = [
    {
      icon: Code,
      title: "Modern Development",
      description: "Built with React, TypeScript, and TailwindCSS for the best developer experience."
    },
    {
      icon: Zap,
      title: "3D Animations",
      description: "Smooth 3D animations and hover effects that bring components to life."
    },
    {
      icon: Palette,
    title: "Actually Usable",
    description: "Built for real projects not just demos that break when you scale."
  },
    {
      icon: Rocket,
      title: "Production Ready",
      description: "All components are optimized, tested, and ready for production use."
    }
  ];

  return (
    <div className="min-h-screen  ">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className=" black-text ">About </span>
              <span className="text-primary">
                Ready Components
              </span>
            </h1>
            <p className="text-xl   black-text  max-w-3xl mx-auto">
              We&apos;re passionate about creating beautiful, modern web components that help developers 
              build stunning applications with ease.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  <span className=" black-text ">Our </span>
                  <span className="text-primary">Mission</span>
                </h2>
                <div className="space-y-4   black-text ">
                  <p>
                    At Ready Components, we believe that beautiful design should be accessible to everyone. 
                    Our mission is to provide developers with high-quality, modern components that are both 
                    visually stunning and easy to implement.
                  </p>
                  <p>
                    Every component in our library is crafted with attention to detail, featuring smooth 
                    3D animations, next aesthetics, and responsive design principles. We&apos;re committed to 
                    pushing the boundaries of what&apos;s possible in modern web development.
                  </p>
                  <p>
                    Join thousands of developers who trust Ready Components to bring their applications 
                    to life with cutting-edge design and seamless functionality.
                  </p>
                </div>
              </div>
              <ThreeDElement intensity={15}>
                <div className="border border-[#F9B31B] relative rounded-[20px] overflow-hidden p-8">
                  <div className="space-y-6 ">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#F9B31B] rounded-lg flex items-center justify-center">
                        <Code className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold  black-text ">150+ Components</h3>
                        <p className="text-sm   black-text ">Ready to use</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#F9B31B]  rounded-lg flex items-center justify-center">
                        <Zap className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold  black-text ">50k+ Downloads</h3>
                        <p className="text-sm   black-text ">Trusted by developers</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#F9B31B] rounded-lg flex items-center justify-center">
                        <Rocket className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold  black-text ">24/7 Support</h3>
                        <p className="text-sm   black-text ">Always here to help</p>
                      </div>
                    </div>
                  </div>

                   <div className="absolute -right-1 top-0 w-4 sm:w-4 md:w-6 h-full bg-[#FAB31E]"></div>
                </div>
              </ThreeDElement>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20  ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className=" black-text ">What Makes Us </span>
                <span className="text-primary">Different</span>
              </h2>
              <p className="text-xl   black-text  max-w-3xl mx-auto">
                We focus on the details that matter, creating components that are not just functional, 
                but truly exceptional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <ThreeDElement key={feature.title} intensity={12}>
                  <div className="border border-[#F9B31B] relative rounded-[20px] overflow-hidden p-6 h-full text-center group transition-all duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#F9B31B] rounded-xl flex items-center justify-center group-hover:animate-pulse">
                      <feature.icon className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3  black-text  group-hover:text-neon-cyan transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="  black-text ">
                      {feature.description}
                    </p>

                     <div className="absolute -right-1 top-0 w-4 sm:w-4 md:w-6 h-full bg-[#FAB31E]"></div>
                  </div>
                </ThreeDElement>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20   ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
            <div className=" border border-[#F9B31B] relative rounded-[20px] overflow-hidden p-6 h-full text-center group transition-all duration-300  flex flex-col md:flex-row items-center justify-between gap-6">
        {/* <ThreeDElement intensity={15}> */}

      {/* Left Text */}
      <div className="text-center md:text-left">
  <h2 className="text-2xl sm:text-3xl font-bold black-text mb-2">
    Need Custom Development for Your Website?
  </h2>
  <p className=" black-text">
  We build fast, scalable websites tailored to your business.
  </p>
</div>

      {/* Right Button */}

 <Button
  href="https://bombayblokes.com/estimates-calculator"
    className="black-text flex items-center"
    text="Get Your Estimate"
  />

 

     <div className="absolute -right-1 top-0 w-4 sm:w-4 md:w-6 h-full bg-[#FAB31E]"></div>
    </div>


          </div>
        </section>
         {/* </ThreeDElement> */}
      </main>
      <Footer />
    </div>
  );
};

export default About;