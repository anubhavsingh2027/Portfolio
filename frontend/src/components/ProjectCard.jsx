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
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.classList.add("card-entrance");
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative h-[520px] overflow-hidden rounded-xl transition-all duration-500 ${
        isHovered ? "scale-[1.01] shadow-2xl shadow-cyan-500/20" : "shadow-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950/90 backdrop-blur-sm" />
      <div
        className={`absolute inset-0 rounded-xl border transition-all duration-500 ${isHovered ? "border-cyan-400/70" : "border-cyan-400/25"}`}
      />

      <div
        className={`absolute inset-0 flex flex-col overflow-hidden p-5 transition-all duration-700 ${isHovered ? "translate-y-4 opacity-0 blur-sm" : "translate-y-0 opacity-100 blur-none"}`}
      >
        {image && (
          <div className="relative mb-4 h-48 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={image}
              alt={title}
              className={`h-full w-full object-cover transition-all duration-700 ${isHovered ? "scale-95 blur-md" : "scale-100 blur-none"}`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent transition-all duration-500 ${isHovered ? "opacity-80" : "opacity-30"}`}
            />
          </div>
        )}

        <h3
          className={`mb-2 text-lg font-bold transition-colors duration-500 ${isHovered ? "text-violet-300" : "text-cyan-300"}`}
        >
          {title}
        </h3>

        <p className="mb-3 flex-grow text-sm leading-relaxed text-slate-200">
          {description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {technologies.slice(0, 8).map((tech, idx) => (
            <span
              key={idx}
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-cyan-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-2 border-t border-cyan-400/20 pt-3">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-cyan-400/15 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/25"
            >
              <FaExternalLinkAlt /> Live
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-violet-500/15 py-2.5 text-xs font-semibold text-violet-300 transition hover:bg-violet-500/25"
            >
              <FaCode /> Code
            </a>
          )}
        </div>
      </div>

      <div
        className={`absolute inset-0 flex flex-col overflow-hidden p-5 transition-all duration-700 ${isHovered ? "translate-y-0 opacity-100 blur-none" : "-translate-y-4 opacity-0 blur-sm"}`}
      >
        <div className="mb-4 flex items-center gap-2">
          <FaStar className="text-violet-300" />
          <h3 className="text-lg font-bold text-violet-300">
            Technical Highlights
          </h3>
        </div>

        <ul className="flex-grow space-y-2.5 overflow-y-auto pr-2">
          {features.length > 0 ? (
            features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-200"
                style={{
                  animation: isHovered
                    ? `slideInFeature 0.5s ease-out ${idx * 0.08}s`
                    : "none",
                }}
              >
                <FaCheck className="mt-1.5 flex-shrink-0 text-violet-300" />
                <span>{feature}</span>
              </li>
            ))
          ) : (
            <li className="text-sm italic text-slate-400">
              Detailed project highlights will appear here.
            </li>
          )}
        </ul>

        <div className="mt-4 flex gap-2 border-t border-violet-400/20 pt-4">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-cyan-400/15 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/25"
            >
              <FaExternalLinkAlt /> Visit
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-violet-500/15 py-2 text-xs font-semibold text-violet-300 transition hover:bg-violet-500/25"
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
