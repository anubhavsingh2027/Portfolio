import React, { useState, useEffect } from "react";

function SkillChip({ icon, name, badge, index = 0 }) {
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(true);
    }, index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="group skill-card-enter" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="relative flex h-full flex-col items-center justify-between overflow-hidden rounded-xl border border-neon-cyan/30 bg-gradient-to-br from-dark-secondary via-dark-bg to-dark-secondary p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon-purple/60 hover:shadow-lg">
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -mt-16 -mr-16 h-32 w-32 rounded-full bg-neon-purple/20 blur-2xl" />
          <div className="absolute -mb-16 -ml-16 h-32 w-32 rounded-full bg-neon-cyan/20 blur-2xl" />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 scale-125 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-neon-cyan/50 bg-dark-bg/80 group-hover:border-neon-purple/80">
              {typeof icon === "string" ? (
                <img src={icon} alt={name} className="h-8 w-8 object-contain icon-float" />
              ) : typeof icon === "function" ? (
                <div className="flex h-8 w-8 items-center justify-center icon-float">{icon()}</div>
              ) : (
                <span className="text-2xl icon-float">{icon}</span>
              )}
            </div>
          </div>

          <span className="mb-2 text-center text-sm font-bold text-black transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-neon-cyan group-hover:to-neon-purple group-hover:bg-clip-text group-hover:text-transparent">
            {name}
          </span>

          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neon-cyan/80 transition-colors duration-300 group-hover:text-neon-purple">
            {showBadge ? badge : "Core"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SkillChip;
