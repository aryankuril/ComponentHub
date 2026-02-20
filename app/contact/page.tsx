'use client'
import { useState } from "react";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ThreeDElement from "../ThreeDElement";
import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";


const Contact = () => {

  const [loading, setLoading] = useState(false);
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@bombayblokes.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 99875 58189",
      description: "Call us during business hours"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Lower Parel, Mumbai ",
      description: "Visit our office"
    }
  ];

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const form = e.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      form.reset();
      window.location.href = "https://bombayblokes.com/";
    } else {
      alert(result.message || "Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-back">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-[#040404]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className=" white-text ">Get in </span>
              <span className="text-primary">
                Touch
              </span>
            </h1>
            <p className="text-xl  grey-text  max-w-3xl mx-auto">
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
                <div className="bg-[#080808] border border-transparent hover:border-[#F9B31B]/30 rounded-2xl lg:p-8 p-3">
                  <h2 className="text-2xl font-bold mb-6  white-text ">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium  white-text  mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="w-full px-4 py-3 bg-input  white-text  border border-white rounded-lg focus:outline-none focus:border-[#fab31e] focus:ring-0.50 focus:ring-[#fab31e] transition-all duration-300"
                        />
                      </div>
                      <div> 
                        <label htmlFor="lastName" className="block text-sm font-medium  white-text  mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          className="w-full px-4 py-3 bg-input  white-text  border border-white rounded-lg focus:outline-none focus:border-[#fab31e] focus:ring-0.50 focus:ring-[#fab31e] transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium  white-text  mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-input  white-text  border border-white rounded-lg focus:outline-none focus:border-[#fab31e] focus:ring-0.50 focus:ring-[#fab31e] transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium  white-text  mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 bg-input  white-text  border border-white rounded-lg focus:outline-none focus:border-[#fab31e] focus:ring-0.50 focus:ring-[#fab31e] transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium  white-text  mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full px-4 py-3 bg-input border  white-text  border border-white rounded-lg focus:outline-none focus:border-[#fab31e] focus:ring-0.50 focus:ring-[#fab31e] transition-all duration-300 resize-none"
                      ></textarea>
                    </div>

                    <button
                    style={{
    backgroundImage: 'linear-gradient(135deg, #F9B31B, #EBEBEB)',
  }} 
  type="submit"
  disabled={loading}
  className={`group text-black font-semibold rounded-full px-6 py-3 flex items-center gap-2
    transition-all duration-300 cursor-pointer
    ${loading ? "opacity-60 " : "hover:-translate-y-0.5"}
  `}
>
  <Send className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`} />
  {loading ? "Sending..." : "Send Message"}
</button>

                  </form>
                </div>
              </ThreeDElement>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4  white-text ">Contact Information</h2>
                  <p className=" grey-text  mb-8">
                    Ready to take your project to the next level? Get in touch with our team of experts.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <ThreeDElement key={info.title} intensity={6}>
                      <div className="bg-[#080808] border border-transparent hover:border-[#F9B31B]/30 rounded-xl p-6 group  transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-[#F9B31B] rounded-lg flex items-center justify-center group-hover:animate-pulse">
                            <info.icon className="h-6 w-6 text-black" />
                          </div>
                          <div>
                            <h3 className="font-semibold  white-text  mb-1">{info.title}</h3>
                            <p className="text-primary font-medium mb-1">{info.value}</p>
                            <p className="text-sm  grey-text ">{info.description}</p>
                          </div>
                        </div>
                      </div>
                    </ThreeDElement>
                  ))}
                </div>

                <ThreeDElement intensity={8}>
                  <div className="bg-gradient-to-br from-[#F9B31B]/50 to-neon-purple/10  rounded-xl p-6">
                    <h3 className="text-lg font-semibold  white-text  mb-3">Need Custom Development?</h3>
                    <p className=" grey-text  mb-4">
                      Our team specializes in creating custom components and web applications. 
                      Let&apos;s discuss your project requirements.
                    </p>
                  <a
  href="https://wa.me/919920207985"
  target="_blank"
  rel="noopener noreferrer"
>
  <span className="inline-block px-6 py-2 border border-[#F9B31B] text-primary rounded-full font-semibold 
                   hover:bg-[#F9B31B] hover:!text-black cursor-pointer transition duration-300">
    Schedule a Call
  </span>
</a>
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
                <span className=" white-text ">Frequently Asked </span>
                <span className="text-primary">Questions</span>
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
                  <div className="bg-[#080808] border border-transparent hover:border-[#F9B31B]/30 rounded-xl p-6">
                    <h3 className="font-semibold  white-text  mb-3">{faq.question}</h3>
                    <p className=" grey-text ">{faq.answer}</p>
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