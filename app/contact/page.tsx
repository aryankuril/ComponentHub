"use client";


import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ThreeDElement from "../ThreeDElement";
// import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
// import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@blacklightlabs.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Call us during business hours"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "San Francisco, CA",
      description: "Visit our headquarters"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    // toast({
    //   title: "Message Sent!",
    //   description: "Thank you for your message. We'll get back to you soon.",
    // });
  };

  return (
    <div className="min-h-screen bg-back">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-[#040404]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Get in </span>
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have questions about our components? Need custom development? 
              We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ThreeDElement intensity={8}>
                <div className="bg-[#080808] border border-border rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="w-full px-4 py-3 bg-input border text-white border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          className="w-full px-4 py-3 bg-input border text-white border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-input text-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 bg-input text-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full px-4 py-3 bg-input border text-white border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300 resize-none"
                      ></textarea>
                    </div>

                    <button type="submit"  className="w-full items-center justify-center group bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-semibold rounded-full px-6 py-3 flex gap-2 transition-all duration-300 hover:shadow-[0_0_20px_hsl(180,100%,50%),0_0_40px_hsl(262,83%,70%)] hover:-translate-y-0.5">
                      <Send className="h-5 w-5 mr-2 group-hover:animate-pulse " />
                      Send Message
                    </button>
                  </form>
                </div>
              </ThreeDElement>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
                  <p className="text-gray-400 mb-8">
                    Ready to take your project to the next level? Get in touch with our team of experts.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <ThreeDElement key={info.title} intensity={6}>
                      <div className="bg-[#080808] border border-border rounded-xl p-6 group hover:border-neon-cyan/30 transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-neon rounded-lg flex items-center justify-center group-hover:animate-pulse">
                            <info.icon className="h-6 w-6 text-black" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                            <p className="text-neon-cyan font-medium mb-1">{info.value}</p>
                            <p className="text-sm text-gray-400">{info.description}</p>
                          </div>
                        </div>
                      </div>
                    </ThreeDElement>
                  ))}
                </div>

                <ThreeDElement intensity={8}>
                  <div className="bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Need Custom Development?</h3>
                    <p className="text-gray-400 mb-4">
                      Our team specializes in creating custom components and web applications. 
                      Let&apos;s discuss your project requirements.
                    </p>
                   <button className="px-6 py-2 border-2 border-neon-cyan text-neon-cyan rounded-lg font-semibold hover:bg-neon-cyan hover:text-black transition duration-300">
  Schedule a Call
</button>

                  </div>
                </ThreeDElement>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[#040404]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-white">Frequently Asked </span>
                <span className="text-neon-purple">Questions</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How do I use your components?",
                  answer: "Simply copy the code from our library and paste it into your project. All components are built with React and TailwindCSS."
                },
                {
                  question: "Are components responsive?",
                  answer: "Yes! All our components are fully responsive and work perfectly on desktop, tablet, and mobile devices."
                },
                {
                  question: "Can I customize the colors?",
                  answer: "Absolutely! Our components use CSS custom properties, making it easy to customize colors and themes."
                },
                {
                  question: "Do you offer support?",
                  answer: "Yes, we provide comprehensive documentation and support to help you implement our components successfully."
                }
              ].map((faq, index) => (
                <ThreeDElement key={index} intensity={6}>
                  <div className="bg-[#080808] border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
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

export default Contact;