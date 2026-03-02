import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useScrollIntoView } from "../hooks/useScrollIntoView";

const navLinks = [
  { label: "Home", section: "home" },
  { label: "About", section: "about" },
  { label: "Skills", section: "skills" },
  { label: "Projects", section: "projects" },
  { label: "Services", section: "services" },
  { label: "Contact", section: "contact" },
];

function Navbar({ onResumeClick, onAssistantClick }) {
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section) => {
    scrollTo(section);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-tertiary/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-dark-bg/80 to-dark-secondary/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-neon-cyan">
            <img
              src="/src/assets/images/nav-logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <span className="hidden sm:inline font-bold text-lg text-neon-cyan tracking-wide">
            Anubhav Singh
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <li key={link.section}>
              <button
                onClick={() => handleNavClick(link.section)}
                className={`transition-all duration-300 font-medium relative group ${
                  activeSection === link.section
                    ? "text-neon-cyan"
                    : "text-gray-700 hover:text-neon-cyan"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-300 ${
                    activeSection === link.section
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={onResumeClick}
            className="px-4 py-2 bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 rounded-lg font-medium transition"
          >
            Resume
          </button>
          <button
            onClick={onAssistantClick}
            className="px-4 py-2 bg-gradient-primary text-white hover:shadow-lg rounded-lg font-medium transition"
          >
            Assistant
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-neon-cyan p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-secondary/95 backdrop-blur-md border-t border-neon-cyan/20">
          <ul className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.section}>
                <button
                  onClick={() => handleNavClick(link.section)}
                  className={`w-full text-left px-4 py-2 rounded transition ${
                    activeSection === link.section
                      ? "bg-neon-cyan/20 text-neon-cyan font-medium"
                      : "text-gray-700 hover:bg-dark-secondary"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-2 border-t border-neon-cyan/20">
              <button
                onClick={() => {
                  onResumeClick();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-neon-cyan/10 text-neon-cyan rounded hover:bg-neon-cyan/20 font-medium transition"
              >
                Resume
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onAssistantClick();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-gradient-primary text-white rounded hover:shadow-lg font-medium transition"
              >
                Assistant
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
