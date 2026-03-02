import React, { useState, useEffect, useRef } from "react";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaTelegramPlane,
} from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const footerRef = useRef(null);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.2 },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      url: "https://www.linkedin.com/in/anubhav-singh-09b71829b/",
      color: "hover:text-blue-600",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/anubhavsingh2027",
      color: "hover:text-gray-700",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      url: "https://x.com/Anubhav7355",
      color: "hover:text-blue-400",
    },
    {
      name: "Telegram",
      icon: FaTelegramPlane,
      url: "https://t.me/Anubhav_singh7355",
      color: "hover:text-blue-500",
    },
    {
      name: "HackerRank",
      icon: SiHackerrank,
      url: "https://www.hackerrank.com/profile/anubhavsingh2027",
      color: "hover:text-green-500",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-dark-bg to-dark-secondary py-16 px-4 md:px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Newsletter Section */}
          <div className="text-center md:text-left space-y-4 transform transition-all duration-700 hover:scale-105">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-black text-sm md:text-base">
              Get notified about my latest projects and blog posts
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-dark-secondary border border-neon-cyan/30 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-all duration-300"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-purple text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-lg">✈️</span>
              </button>
            </form>
            {submitted && (
              <p className="text-neon-cyan text-sm animate-pulse">
                ✓ Thanks for subscribing!
              </p>
            )}
          </div>

          {/* Social Hub Section */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Follow My Journey
            </h3>
            <div className="flex justify-center gap-6 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-dark-secondary to-dark-bg border border-neon-cyan/30 text-neon-cyan transition-all duration-300 transform hover:scale-125 ${social.color} group`}
                  >
                    <Icon size={24} />
                    <div className="absolute inset-0 rounded-full border border-neon-cyan/50 opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-125 transition-all duration-500 group-hover:animate-pulse" />
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-dark-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Info Section */}
          <div className="text-center md:text-right space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-clip-text text-transparent">
              About
            </h3>
            <p className="text-black text-sm md:text-base leading-relaxed">
              Full Stack Developer passionate about creating beautiful,
              functional web experiences. Always learning, always building.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="text-center space-y-4">
          <p className="text-black text-sm md:text-base">
            Made{" "}
            <span
              className="inline-block animate-bounce text-red-500"
              style={{ animationDelay: "0s" }}
            >
              ❤️
            </span>{" "}
            by{" "}
            <span className="font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Anubhav Singh
            </span>
          </p>
          <p className="text-black text-xs md:text-sm opacity-70">
            © {new Date().getFullYear()} Anubhav Singh. All rights reserved.
          </p>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple text-white flex items-center justify-center hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 transform hover:scale-110 z-40"
          title="Scroll to top"
        >
          <span className="text-xl">↑</span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
