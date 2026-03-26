'use client';

import { useState } from "react";
import { Github, Twitter, Linkedin, Mail, Code, Zap, Instagram } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/AllComponents/shared/Button";
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
    <footer className=" container border-t  border-black">
      <div className=" py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
             <Link href="/" className="flex items-center">
  <Image
    src="/images/bblogo.webp"
    alt="Bombay Blokes Logo"
    width={230}
    height={40}
    className="object-contain cursor-pointer lg:mb-10 mb-5"
    priority
  />
</Link>

            <p className="black-text mb-6 max-w-md font-poppins ">
              Modern Ready Components showcase platform with Bombay Blokes.
              Discover, preview, and copy beautiful components for your next project.
            </p>

           <div className="flex space-x-4">
  {socialLinks.map((social) => (
    <a
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg black-text bg-secondary hover:bg-[#F9B31B]/10 hover:text-[#F9B31B] transition-all duration-300 group"
      aria-label={social.label}
    >
      <social.icon className="h-5 w-5 group-hover:animate-pulse" />
    </a>
  ))}
</div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 black-text font-miso">Quick Links</h3>
            <ul className="space-y-3  black-text">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.name === "Components" ? (
                    <button
                      onClick={handleComponentsClick}
                      className="text-left text-muted-foreground font-poppins cursor-pointer black-text hover:text-[#F9B31B] transition-colors duration-300"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground cursor-pointer font-poppins black-text hover:text-[#F9B31B] transition-colors duration-300"
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
            <h3 className="text-lg font-semibold mb-2 black-text font-miso ">Stay Updated</h3>
            <p className="text-muted-foreground mb-2 text-sm black-text font-poppins">
              Get notified about new components and features.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-black rounded-md text-black"
            />



             <Button
 onClick={handleSubscribe}
    className="black-text flex items-center mt-2"
    text=" Subscribe"
  />

            {/* <button
              onClick={handleSubscribe}
              className="w-full px-3 py-2 bg-[#F9B31B] text-black rounded-md mt-2"
            >
              Subscribe
            </button> */}

            {msg && <p className="text-sm mt-2">{msg}</p>}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-black">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm black-text font-miso">
              © {currentYear} Ready Components. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0 font-miso" >
              <Link
                href="https://bombayblokes.com/privacy"
                className="text-muted-foreground hover:text-[#F9B31B] text-sm transition-colors duration-300 black-text"
              >
                Privacy Policy
              </Link>
              <Link
                href="https://bombayblokes.com/terms"
                className="text-muted-foreground hover:text-[#F9B31B] text-sm transition-colors duration-300 black-text"
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
