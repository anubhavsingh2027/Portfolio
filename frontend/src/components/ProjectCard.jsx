import React, { useState, useRef, useEffect } from "react";
import { FaExternalLinkAlt, FaCode, FaCheck, FaStar } from "react-icons/fa";

function ProjectCard({
  title,
  description,
  image,
  technologies = [],
  liveLink,
  codeLink,
  features = [],
  completion = 100,
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Add entrance animation
    if (cardRef.current) {
      cardRef.current.classList.add("card-entrance");
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative h-[520px] cursor-pointer group rounded-xl overflow-hidden transition-all duration-500 ${
        isHovered ? "scale-105 shadow-2xl shadow-neon-cyan/30" : "shadow-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-secondary/90 to-dark-secondary/70 backdrop-blur-sm" />

      {/* Border glow animation */}
      <div
        className={`absolute inset-0 rounded-xl border transition-all duration-500 pointer-events-none ${
          isHovered ? "border-neon-cyan/70" : "border-neon-cyan/30"
        }`}
      />

      {/* Main Content - Slides Up & Fades Out */}
      <div
        className={`absolute inset-0 p-5 flex flex-col overflow-hidden transition-all duration-700 ${
          isHovered
            ? "opacity-0 translate-y-4 blur-sm"
            : "opacity-100 translate-y-0 blur-none"
        }`}
      >
        {/* Image Container */}
        {image && (
          <div className="relative overflow-hidden rounded-lg mb-4 h-48 flex-shrink-0">
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "scale-95 blur-md" : "scale-100 blur-none"
              }`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-dark-secondary/40 to-transparent transition-all duration-500 ${
                isHovered ? "opacity-80" : "opacity-20"
              }`}
            />
          </div>
        )}

        {/* Title */}
        <h3
          className={`text-lg font-bold mb-2 transition-all duration-500 ${
            isHovered ? "text-neon-purple" : "text-neon-cyan"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-black text-sm mb-3 flex-grow leading-relaxed line-clamp-5">
          {description}
        </p>

        {/* Technologies */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-xs bg-neon-cyan/25 text-neon-cyan px-2.5 py-1 rounded-full border border-neon-cyan/40 transition-all duration-300 hover:bg-neon-cyan/40"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Completion Progress */}
        <div className="mb-3">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-white/60">Progress</span>
            <span className="text-neon-cyan font-bold">{completion}%</span>
          </div>
          <div className="w-full h-2 bg-dark-bg/60 rounded-full overflow-hidden border border-neon-cyan/30">
            <div
              className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan rounded-full shadow-lg shadow-neon-cyan/50 transition-all duration-1000"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-neon-cyan/20">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/40 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <FaExternalLinkAlt /> Live
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/40 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <FaCode /> Code
            </a>
          )}
        </div>
      </div>

      {/* Features Content - Slides Down & Fades In */}
      <div
        className={`absolute inset-0 p-5 flex flex-col overflow-hidden transition-all duration-700 ${
          isHovered
            ? "opacity-100 translate-y-0 blur-none"
            : "opacity-0 -translate-y-4 blur-sm"
        }`}
      >
        {/* Features Header */}
        <div className="flex items-center gap-2 mb-4">
          <FaStar className="text-neon-purple text-sm" />
          <h3 className="text-lg font-bold text-neon-purple">Key Features</h3>
        </div>

        {/* Features List with Stagger */}
        <ul className="flex-grow space-y-2.5 overflow-y-auto pr-2">
          {features && features.length > 0 ? (
            features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-black text-sm transition-all duration-300 transform"
                style={{
                  animation: isHovered
                    ? `slideInFeature 0.6s ease-out ${idx * 0.08}s`
                    : "none",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateX(0)" : "translateX(-10px)",
                }}
              >
                <FaCheck className="text-neon-purple text-xs mt-1.5 flex-shrink-0 transition-transform duration-300" />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))
          ) : (
            <li className="text-black text-sm italic">Hover to see features</li>
          )}
        </ul>

        {/* Bottom Buttons */}
        <div className="flex gap-2 pt-4 border-t border-neon-purple/20 mt-4">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 bg-neon-cyan/25 text-neon-cyan hover:bg-neon-cyan/45 py-2 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <FaExternalLinkAlt /> Visit
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 bg-neon-purple/25 text-neon-purple hover:bg-neon-purple/45 py-2 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <FaCode /> Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
