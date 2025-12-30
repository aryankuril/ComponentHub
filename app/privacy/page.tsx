import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Shield, Eye, Lock, Database, Mail, Calendar } from "lucide-react";
import ThreeDElement from "../ThreeDElement";

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, phone)",
        "Usage data and analytics about how you interact with our platform",
        "Component preferences and browsing history",
        "Technical information like IP address, browser type, and device information"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our component showcase service",
        "To personalize your experience and recommend relevant components",
        "To communicate with you about updates, new features, and important notices",
        "To improve our platform and develop new features",
        "To ensure security and prevent unauthorized access"
      ]
    },
    {
      icon: Shield,
      title: "Data Protection & Security",
      content: [
        "We implement industry-standard security measures to protect your data",
        "All data transmission is encrypted using SSL/TLS protocols",
        "We regularly audit our security practices and update them as needed",
        "Access to your personal information is restricted to authorized personnel only",
        "We never sell your personal information to third parties"
      ]
    },
    {
      icon: Lock,
      title: "Your Privacy Rights",
      content: [
        "Right to access: You can request a copy of your personal data",
        "Right to rectification: You can correct inaccurate or incomplete data",
        "Right to erasure: You can request deletion of your personal data",
        "Right to portability: You can request your data in a portable format",
        "Right to object: You can opt out of certain data processing activities"
      ]
    },
    {
      icon: Mail,
      title: "Cookies & Tracking",
      content: [
        "We use essential cookies to ensure our website functions properly",
        "Analytics cookies help us understand how users interact with our platform",
        "Preference cookies remember your settings and choices",
        "You can control cookie settings through your browser preferences",
        "We respect Do Not Track signals where legally required"
      ]
    },
    {
      icon: Calendar,
      title: "Data Retention & Updates",
      content: [
        "We retain your data only as long as necessary for our services",
        "Account data is kept while your account is active",
        "We may retain some data for legal compliance requirements",
        "This privacy policy may be updated to reflect changes in our practices",
        "We will notify you of significant changes via email or platform notice"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black  white-text ">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-primary">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We value your privacy and are committed to protecting your personal information. 
              This policy explains how we collect, use, and safeguard your data.
            </p>
            <p className="text-sm text-neon-cyan">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Privacy Sections */}
          <div className="grid gap-6">
            {sections.map((section, index) => (
              <ThreeDElement key={index} className="w-full">
                <div className="bg-[#0a0a0a] border border-transparent hover:border-[#F9B31B]/30 rounded-xl px-8 py-8  transition-all duration-300">
                  <div>
                    <div className="flex items-center gap-3 text-primary lg:mb-10 mb-5">
                      <section.icon className="w-6 h-6" />
                      {section.title}
                    </div>   
                  </div>
                  <div>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-neon-purple rounded-full mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ThreeDElement>
            ))}
          </div>

          {/* Contact Information */}
          <ThreeDElement className="w-full">
            <div className="bg-[#0a0a0a] border border-transparent hover:border-[#F9B31B]/30 rounded-xl px-8 py-8 text-center">
              <div>
                <div className="text-primary">Questions About Privacy?</div>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
  If you have any questions about this Privacy Policy or how we handle your data, 
  please don&apos;t hesitate to contact us.
</p>

                <div className="space-y-2 text-sm">
                  <p>Email: <span className="text-primary">hello@bombayblokes.com</span></p>
                  <p>Address: <span className="text-primary">Lower Parel, Mumbai</span></p>
                </div>
              </div>
            </div>
          </ThreeDElement>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;