import React, { useRef, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import {
  FaLinkedinIn,
  FaGithub,
  FaTelegramPlane,
  FaExternalLinkAlt,
  FaTrophy,
} from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";

function Connect() {
  const ref = useRef(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.2 });

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      url: "https://www.linkedin.com/in/anubhav-singh-09b71829b/",
      color: "from-blue-600 to-blue-400",
      hoverColor: "hover:text-blue-600",
      bgColor: "hover:bg-blue-600/20",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/anubhavsingh2027",
      color: "from-gray-700 to-gray-600",
      hoverColor: "hover:text-gray-700",
      bgColor: "hover:bg-gray-700/20",
    },
    {
      name: "Unstop",
      icon: FaTrophy,
      url: "https://unstop.com/u/anubhsin44406",
      color: "from-orange-600 to-orange-400",
      hoverColor: "hover:text-orange-600",
      bgColor: "hover:bg-orange-600/20",
    },
    {
      name: "Telegram",
      icon: FaTelegramPlane,
      url: "https://t.me/Anubhav_singh7355",
      color: "from-blue-500 to-blue-400",
      hoverColor: "hover:text-blue-500",
      bgColor: "hover:bg-blue-500/20",
    },
    {
      name: "HackerRank",
      icon: SiHackerrank,
      url: "https://www.hackerrank.com/profile/anubhavsingh2027",
      color: "from-green-500 to-green-400",
      hoverColor: "hover:text-green-500",
      bgColor: "hover:bg-green-500/20",
    },
  ];

  return (
    <section
      ref={ref}
      id="connect"
      className="min-h-[60vh] flex items-center py-20 px-4 md:px-6 bg-gradient-to-b from-dark-bg via-dark-secondary to-dark-bg relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-clip-text text-transparent gradient-shift">
              Connect With Me
            </span>
          </h2>
          <p className="text-black text-lg md:text-xl max-w-3xl mx-auto">
            Follow my journey and stay connected on my social platforms. Let's
            build amazing things together!
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mt-6 rounded-full" />
        </div>

        {/* Social Links Grid with Unique Display */}
        {isVisible && (
          <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <div
                  key={social.name}
                  className={`group relative transform transition-all duration-500 animate-fadeInUp ${isVisible ? "opacity-100" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredLink(social.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500 scale-150" />

                  {/* Main Button */}
                  <div
                    className={`relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-dark-secondary to-dark-bg border-2 border-neon-cyan/30 group-hover:border-neon-purple/60 transition-all duration-300 transform group-hover:scale-125 group-hover:-translate-y-4 ${social.bgColor} cursor-pointer`}
                  >
                    <Icon
                      size={40}
                      className={`text-neon-cyan transition-all duration-300 ${social.hoverColor}`}
                    />

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-neon-cyan/50 opacity-0 group-hover:opacity-100 animate-pulse-ring-border" />
                  </div>

                  {/* Unique Info Card - Shows Platform Name and Link */}
                  <div
                    className={`absolute -top-24 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${hoveredLink === social.name ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                  >
                    <div className="bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 backdrop-blur-md border border-neon-cyan/40 rounded-lg px-4 py-3 shadow-2xl shadow-neon-cyan/30">
                      <p className="text-neon-cyan font-bold text-sm md:text-base whitespace-nowrap mb-2">
                        {social.name}
                      </p>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs md:text-sm text-white hover:text-neon-purple transition-colors duration-300 bg-neon-cyan/20 px-3 py-1.5 rounded-md hover:bg-neon-purple/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Profile
                        <FaExternalLinkAlt size={12} />
                      </a>
                    </div>
                  </div>

                  {/* Name Label Below */}
                  <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-neon-cyan to-neon-purple text-white text-sm font-bold px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg shadow-neon-cyan/50">
                    {social.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-black text-lg mb-8">
            Choose your favorite platform and let's connect
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto rounded-full" />
        </div>
      </div>
    </section>
  );
}

export default Connect;
