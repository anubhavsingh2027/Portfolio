import React, { useState, useEffect } from "react";

function SkillChip({ icon, name, level, index = 0 }) {
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(true);
    }, index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className="group skill-card-enter"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative h-full flex flex-col items-center justify-between p-6 bg-gradient-to-br from-dark-secondary via-dark-bg to-dark-secondary rounded-xl border border-neon-cyan/30 hover:border-neon-purple/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 overflow-hidden">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-cyan/20 rounded-full blur-2xl -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Icon Container */}
          <div className="mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-125" />
            <div className="relative w-14 h-14 flex items-center justify-center bg-dark-bg/80 rounded-full border border-neon-cyan/50 group-hover:border-neon-purple/80 transition-all duration-300">
              {typeof icon === "string" ? (
                <img
                  src={icon}
                  alt={name}
                  className="w-8 h-8 object-contain icon-float"
                />
              ) : typeof icon === "function" ? (
                <div className="w-8 h-8 flex items-center justify-center icon-float">
                  {icon()}
                </div>
              ) : (
                <span className="text-2xl icon-float">{icon}</span>
              )}
            </div>
          </div>

          {/* Skill Name */}
          <span className="font-bold text-black text-center text-sm mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-neon-cyan group-hover:to-neon-purple group-hover:bg-clip-text transition-all duration-300">
            {name}
          </span>

          {/* Proficiency Level */}
          <span className="text-xs text-neon-cyan/70 font-semibold mb-4 group-hover:text-neon-purple transition-colors duration-300">
            {level}%
          </span>

          {/* Progress Bar */}
          {level && (
            <div className="w-full">
              <div className="h-1.5 bg-dark-bg/40 rounded-full overflow-hidden border border-neon-cyan/20">
                <div
                  className={`h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-200% rounded-full transition-all duration-700 ${
                    showProgress ? "progress-bar-fill" : "w-0"
                  }`}
                  style={
                    showProgress ? { width: `${level}%` } : { width: "0%" }
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillChip;
