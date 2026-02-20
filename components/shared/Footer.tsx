'use client';

import { useState } from "react";
import { Github, Twitter, Linkedin, Mail, Code, Zap, Instagram } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async () => {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMsg(data.message);
    setEmail("");
  };

  /* ===============================
     Components click handler
  =============================== */
  const handleComponentsClick = async () => {
    try {
      const res = await fetch("/api/components");
      const components = await res.json();

      if (components?.length > 0) {
        router.push(`/components/${components[0]._id}`);
      } else {
        router.push("/components");
      }
    } catch (error) {
      console.error(error);
      router.push("/components");
    }
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/bombay_blokes", label: "Instagram" },
    { icon: Linkedin, href: "https://in.linkedin.com/company/bombay-blokes-digital-solutions-llp", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@bombayblokes.com", label: "Email" },
  ];

  const quickLinks = [
    { name: "Components", href: "/components" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-black border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
             <Link href="/" className="flex items-center">
  <Image
    src="/logo.png"
    alt="Bombay Blokes Logo"
    width={230}
    height={40}
    className="object-contain cursor-pointer -ml-4"
    priority
  />
</Link>

            <p className="text-muted-foreground mb-6 max-w-md grey-text">
              Modern 3D component showcase platform with neon-themed designs.
              Discover, preview, and copy beautiful components for your next project.
            </p>

           <div className="flex space-x-4">
  {socialLinks.map((social) => (
    <a
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg grey-text bg-secondary hover:bg-[#F9B31B]/10 hover:text-[#F9B31B] transition-all duration-300 group"
      aria-label={social.label}
    >
      <social.icon className="h-5 w-5 group-hover:animate-pulse" />
    </a>
  ))}
</div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 white-text">Quick Links</h3>
            <ul className="space-y-3 grey-text">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.name === "Components" ? (
                    <button
                      onClick={handleComponentsClick}
                      className="text-left text-muted-foreground cursor-pointer grey-text hover:text-[#F9B31B] transition-colors duration-300"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground cursor-pointer grey-text hover:text-[#F9B31B] transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 white-text">Stay Updated</h3>
            <p className="text-muted-foreground mb-4 text-sm grey-text">
              Get notified about new components and features.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-input border rounded-md"
            />

            <button
              onClick={handleSubscribe}
              className="w-full px-3 py-2 bg-[#F9B31B] text-black rounded-md mt-2"
            >
              Subscribe
            </button>

            {msg && <p className="text-sm mt-2">{msg}</p>}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm grey-text">
              © {currentYear} ComponentHub. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-[#F9B31B] text-sm transition-colors duration-300 grey-text"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-[#F9B31B] text-sm transition-colors duration-300 grey-text"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
