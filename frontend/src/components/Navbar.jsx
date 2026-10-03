import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaTerminal } from "react-icons/fa";
import { useScrollIntoView } from "../hooks/useScrollIntoView";

const navLinks = [
  { label: "Home", section: "home" },
  { label: "About", section: "about" },
  { label: "Skills", section: "skills" },
  { label: "Projects", section: "projects" },
  { label: "Experience", section: "experience" },
  { label: "Contact", section: "contact" },
];

function Navbar({ onResumeClick, onAssistantClick, onCommandClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTo = useScrollIntoView();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section) => {
    scrollTo(section);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 shadow-lg backdrop-blur-md"
          : "bg-slate-950/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex flex-shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/30">
            <img
              src="/assets/images/nav-logo.png"
              alt="Anubhav Singh logo"
              className="h-9 w-9 object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <span className="hidden text-lg font-bold tracking-wide text-cyan-300 sm:inline">
            Anubhav Singh
          </span>
        </div>

        <ul className="hidden flex-1 items-center justify-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.section}>
              <button
                onClick={() => handleNavClick(link.section)}
                className={`relative font-medium transition-colors ${
                  activeSection === link.section
                    ? "text-cyan-300"
                    : "text-slate-300 hover:text-cyan-300"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                    activeSection === link.section ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={onCommandClick}
            className="flex items-center gap-2 rounded-lg border border-slate-300/70 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
            aria-label="Open command palette"
            title="Open command palette (Ctrl K)"
          >
            <FaTerminal size={12} aria-hidden="true" />
            <span>Ctrl K</span>
          </button>
          <button onClick={onResumeClick} className="rounded-lg bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20">
            Resume
          </button>
          <button onClick={onAssistantClick} className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:shadow-lg hover:shadow-cyan-500/20">
            AI Guide
          </button>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-lg p-2 text-cyan-300 md:hidden" aria-label="Toggle menu">
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-cyan-500/20 bg-slate-950/95 md:hidden">
          <ul className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <li key={link.section}>
                <button
                  onClick={() => handleNavClick(link.section)}
                  className={`w-full rounded px-4 py-2 text-left text-sm font-medium transition ${
                    activeSection === link.section
                      ? "bg-cyan-500/10 text-cyan-300"
                      : "text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="border-t border-cyan-500/20 pt-3">
              <button
                onClick={() => {
                  onCommandClick();
                  setIsMenuOpen(false);
                }}
                className="mb-2 flex w-full items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/10"
              >
                <FaTerminal size={12} aria-hidden="true" /> Command palette
              </button>
              <button
                onClick={() => {
                  onResumeClick();
                  setIsMenuOpen(false);
                }}
                className="mb-2 w-full rounded bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300"
              >
                Resume
              </button>
              <button
                onClick={() => {
                  onAssistantClick();
                  setIsMenuOpen(false);
                }}
                className="w-full rounded bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2 text-sm font-medium text-white"
              >
                AI Guide
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
