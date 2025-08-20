import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ThreeDElement from "../ThreeDElement";
import { Code, Zap, Palette, Rocket } from "lucide-react";

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
      title: "Neon Aesthetics",
      description: "Beautiful next color schemes and gradients for modern, eye-catching designs."
    },
    {
      icon: Rocket,
      title: "Production Ready",
      description: "All components are optimized, tested, and ready for production use."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">About </span>
              <span className="bg-gradient-neon bg-clip-text text-transparent  ">
                ComponentHub
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
                  <span className="text-white">Our </span>
                  <span className="text-neon-cyan">Mission</span>
                </h2>
                <div className="space-y-4 text-gray-400">
                  <p>
                    At ComponentHub, we believe that beautiful design should be accessible to everyone. 
                    Our mission is to provide developers with high-quality, modern components that are both 
                    visually stunning and easy to implement.
                  </p>
                  <p>
                    Every component in our library is crafted with attention to detail, featuring smooth 
                    3D animations, next aesthetics, and responsive design principles. We&apos;re committed to 
                    pushing the boundaries of what&apos;s possible in modern web development.
                  </p>
                  <p>
                    Join thousands of developers who trust ComponentHub to bring their applications 
                    to life with cutting-edge design and seamless functionality.
                  </p>
                </div>
              </div>
              <ThreeDElement intensity={15}>
                <div className="bg-gradient-card border border-border rounded-2xl p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-neon rounded-lg flex items-center justify-center">
                        <Code className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">150+ Components</h3>
                        <p className="text-sm text-gray-400">Ready to use</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-neon-purple/20 border border-neon-purple rounded-lg flex items-center justify-center">
                        <Zap className="h-6 w-6 text-neon-purple" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">50k+ Downloads</h3>
                        <p className="text-sm text-gray-400">Trusted by developers</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-neon-green/20 border border-neon-green rounded-lg flex items-center justify-center">
                        <Rocket className="h-6 w-6 text-neon-green" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">24/7 Support</h3>
                        <p className="text-sm text-gray-400">Always here to help</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ThreeDElement>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-white">What Makes Us </span>
                <span className="text-neon-purple">Different</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We focus on the details that matter, creating components that are not just functional, 
                but truly exceptional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <ThreeDElement key={feature.title} intensity={12}>
                  <div className="bg-card border border-border rounded-xl p-6 h-full text-center group hover:border-neon-cyan/30 transition-all duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-neon rounded-xl flex items-center justify-center group-hover:animate-pulse">
                      <feature.icon className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-neon-cyan transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </ThreeDElement>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              <span className="text-white">Meet the </span>
              <span className="text-neon-green">Team</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((member) => (
                <ThreeDElement key={member} intensity={10}>
                  <div className="bg-gradient-card border border-border rounded-xl p-6">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-neon rounded-full"></div>
                    <h3 className="text-lg font-semibold text-white mb-2">Team Member {member}</h3>
                    <p className="text-neon-cyan mb-2">Developer & Designer</p>
                    <p className="text-sm text-gray-400">
                      Passionate about creating beautiful and functional web experiences.
                    </p>
                  </div>
                </ThreeDElement>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;