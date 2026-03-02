import React, { useRef, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

function ServiceCard({ icon: Icon, title, description, features = [] }) {
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
      className="relative group rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-secondary/95 to-dark-secondary/70 backdrop-blur-sm" />

      {/* Border Animation */}
      <div
        className={`absolute inset-0 rounded-2xl border transition-all duration-500 pointer-events-none ${
          isHovered
            ? "border-neon-cyan/70 shadow-lg shadow-neon-cyan/30"
            : "border-neon-cyan/30"
        }`}
      />

      {/* Animated Background Glow */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none ${
          isHovered ? "opacity-20" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 240, 255, 0.1), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* Icon & Title Section */}
        <div className="mb-6">
          {Icon && (
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 transition-all duration-500 ${
                isHovered
                  ? "bg-neon-cyan/30 shadow-lg shadow-neon-cyan/40 transform scale-110"
                  : "bg-neon-cyan/15"
              }`}
            >
              <Icon className="text-neon-cyan text-2xl transition-transform duration-500" />
            </div>
          )}
          <h3
            className={`text-2xl font-bold transition-colors duration-300 ${
              isHovered ? "text-neon-purple" : "text-neon-cyan"
            }`}
          >
            {title}
          </h3>
        </div>

        {/* Description Section */}
        <p className="text-gray-900/85 mb-6 leading-relaxed text-sm flex-grow">
          {description}
        </p>

        {/* Features Section */}
        {features.length > 0 && (
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 transition-all duration-300 transform hover:translate-x-1"
                style={{
                  animation: isHovered
                    ? `slideInFeature 0.6s ease-out ${idx * 0.08}s`
                    : "none",
                  opacity: isHovered ? 1 : 0.8,
                }}
              >
                <FaCheck
                  className={`text-neon-cyan text-xs mt-1.5 flex-shrink-0 transition-all duration-300 ${
                    isHovered ? "scale-125" : "scale-100"
                  }`}
                />
                <span className="text-gray-900/80 text-sm leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Bottom Accent Line */}
        <div
          className={`mt-6 pt-6 border-t transition-all duration-500 ${
            isHovered ? "border-neon-cyan/50" : "border-neon-cyan/20"
          }`}
        />

        {/* Hover Indicator */}
        <div
          className={`mt-4 flex justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-1 h-1 bg-neon-cyan rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
