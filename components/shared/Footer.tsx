import { Github, Twitter, Linkedin, Mail, Code } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const quickLinks = [
    { name: "Components", href: "/components" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Documentation", href: "#" },
  ];

  return (
    <footer className="bg-card border-t border-border ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-neon-cyan" />
              <span className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                ComponentHub
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md text-gray-400">
              Modern 3D component showcase platform with neon-themed designs.
              Discover, preview, and copy beautiful components for your next project.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg text-gray-400 bg-secondary hover:bg-neon-cyan/10 hover:text-neon-cyan transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 group-hover:animate-pulse" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div >
            <h3 className="text-lg font-semibold mb-4 text-neon-cyan">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neon-purple">Stay Updated</h3>
            <p className="text-muted-foreground mb-4 text-sm text-gray-400">
              Get notified about new components and features.
            </p>
            <div className="space-y-3 text-gray-400">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-gray-400 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 transition-all duration-300"
              />
              <button className="w-full px-3 py-2 bg-gradient-neon text-black font-medium text-sm rounded-md hover:scale-105 transition-transform duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm text-gray-400">
              © {currentYear} ComponentHub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-neon-cyan text-sm transition-colors duration-300 text-gray-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-neon-cyan text-sm transition-colors duration-300 text-gray-400"
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
