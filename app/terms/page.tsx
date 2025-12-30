import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { FileText, Scale, AlertTriangle, Users, Code, Shield } from "lucide-react";
import ThreeDElement from "../ThreeDElement";

const Terms = () => {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Component Showcase, you accept and agree to be bound by these Terms and Conditions",
        "If you do not agree to these terms, please do not use our service",
        "We reserve the right to modify these terms at any time with notice",
        "Continued use of the service after changes constitutes acceptance of new terms"
      ]
    },
    {
      icon: Users,
      title: "User Accounts & Responsibilities",
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the security of your account credentials",
        "You must not share your account with others or allow unauthorized access",
        "You must notify us immediately of any unauthorized use of your account",
        "You are responsible for all activities that occur under your account"
      ]
    },
    {
      icon: Code,
      title: "Component Usage & Licensing",
      content: [
        "Components provided on our platform are for educational and development purposes",
        "You may use components in your projects subject to their individual licenses",
        "You must respect the intellectual property rights of component authors",
        "Commercial use may require additional licensing - check individual component terms",
        "You may not redistribute our components without proper attribution"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Activities",
      content: [
        "Uploading malicious code, viruses, or harmful content",
        "Attempting to gain unauthorized access to our systems",
        "Using the service for illegal activities or violating applicable laws",
        "Impersonating others or providing false information",
        "Interfering with the proper functioning of the service",
        "Harvesting user data without permission"
      ]
    },
    {
      icon: Shield,
      title: "Content & Intellectual Property",
      content: [
        "Users retain ownership of components they upload to the platform",
        "By uploading content, you grant us a license to display and distribute it",
        "You warrant that uploaded content does not infringe on third-party rights",
        "We respect intellectual property rights and respond to valid DMCA requests",
        "Our platform design, branding, and original content remain our property"
      ]
    },
    {
      icon: Scale,
      title: "Disclaimers & Limitations",
      content: [
        "The service is provided 'as is' without warranties of any kind",
        "We do not guarantee uninterrupted or error-free service",
        "Components are provided by users and we do not warranty their functionality",
        "Our liability is limited to the maximum extent permitted by law",
        "You use the service at your own risk and discretion",
        "We are not responsible for damages resulting from service use"
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
            <h1 className="text-4xl md:text-6xl font-bold text-primary text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our Component Showcase platform. 
              These terms govern your use of our services and define our mutual rights and responsibilities.
            </p>
            <p className="text-sm text-neon-purple">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Terms Sections */}
          <div className="grid gap-6">
            {sections.map((section, index) => (
              <ThreeDElement key={index} className="w-full">
                <div className=" px-8 py-8 bg-[#0a0a0a] border border-transparent hover:border-[#F9B31B]/30 rounded-xl transition-all duration-300">
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
                          <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ThreeDElement>
            ))}
          </div>

          {/* Important Notice */}
          <ThreeDElement className="w-full">
            <div className="bg-div-dark border border-[#F9B31B]/30 shadow-lg shadow-neon-pink/10 rounded-xl px-8 py-8 ">
              <div>
                <div className="flex items-center gap-3 text-primary">
                  <AlertTriangle className="w-6 h-6" />
                  Important Notice
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  These terms constitute a legally binding agreement between you and Component Showcase. 
                  If you have questions about any of these terms, please contact us before using our service.
                </p>
                <div className="bg-background/10 border border-[#F9B31B]/30 rounded-xl p-4">
                  <p className="text-sm">
                    <strong className="text-primary">Contact us:</strong><br />
                    Email: <span className="text-primary">hello@bombayblokes.com</span><br />
                    Address: <span className="text-primary">Lower Parel, Mumbai</span>
                  </p>
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

export default Terms;