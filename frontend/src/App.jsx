import React, { useState, useEffect } from "react";
import { FaArrowUp, FaComments, FaEnvelope } from "react-icons/fa";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import WorkExperience from "./sections/WorkExperience";
import Services from "./sections/Services";
import Connect from "./sections/Connect";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Chatbot from "./components/Chatbot";
import VoiceAssistant from "./components/VoiceAssistant";
import ResumePreviewModal from "./components/ResumePreviewModal";
import CommandPalette from "./components/CommandPalette";

import { useScrollIntoView } from "./hooks/useScrollIntoView";
import RubiksCube3D from "./components/RubiksCube3D";

function App() {
  const [showResumePreviewModal, setShowResumePreviewModal] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTo = useScrollIntoView();
  const normalizedPath = currentPath.replace(/\/+$/, "").toLowerCase() || "/";
  const isChatbotRoute = normalizedPath === "/chatbot";

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0,
      );
    };
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const handleCommandShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setShowCommandPalette((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", handleCommandShortcut);
    return () => window.removeEventListener("keydown", handleCommandShortcut);
  }, []);

  const navigateTo = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResumeClick = () => {
    // Show preview modal instead of direct download
    setShowResumePreviewModal(true);
  };

  const handleResumeDownload = () => {
    // Download the resume PDF
    window.location.href =
      "/assets/pdf/Anubhav-singh-Resume -Software-Engineer.pdf";
  };

  const handleAssistantClick = () => {
    navigateTo("/chatbot");
  };

  const handleCommand = (action) => {
    setShowCommandPalette(false);
    if (action.type === "scroll") {
      if (isChatbotRoute) {
        navigateTo("/");
        window.setTimeout(() => scrollTo(action.value), 0);
      } else {
        scrollTo(action.value);
      }
    }
    if (action.type === "assistant") handleAssistantClick();
    if (action.type === "resume") handleResumeClick();
  };

  if (isChatbotRoute) {
    return (
      <div className="min-h-screen bg-dark-bg text-gray-900 font-poppins">
        <Navbar
          onResumeClick={handleResumeClick}
          onAssistantClick={handleAssistantClick}
          onCommandClick={() => setShowCommandPalette(true)}
        />
        <main className="min-h-[100dvh] px-3 pt-28 pb-6 sm:px-4 md:px-8 md:pb-10">
          <div className="mx-auto flex max-w-5xl flex-col">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-neon-cyan">
                  Portfolio intelligence
                </p>
                <h1 className="text-3xl font-extrabold text-gray-900 md:text-5xl">
                  Ask me anything.
                </h1>
                <p className="mt-2 max-w-xl text-sm text-gray-600 md:text-base">
                  Explore Anubhav’s projects, experience, and technical approach
                  in a focused conversation.
                </p>
              </div>
              <button
                onClick={() => navigateTo("/")}
                className="hidden rounded-lg border border-neon-cyan/30 px-4 py-2 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/10 sm:block"
              >
                Back to portfolio
              </button>
            </div>
            <Chatbot
              isOpen
              isPage
              onClose={() => navigateTo("/")}
              onVoiceSwitch={() => setShowVoiceAssistant(true)}
            />
            <VoiceAssistant
              isOpen={showVoiceAssistant}
              onClose={() => setShowVoiceAssistant(false)}
            />
            <CommandPalette
              isOpen={showCommandPalette}
              onClose={() => setShowCommandPalette(false)}
              onCommand={handleCommand}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg text-gray-900 font-poppins min-h-screen relative">
      {/* Hero Section - Split Layout */}
      <section
        id="home"
        className="relative w-full flex flex-col lg:flex-row overflow-visible"
        style={{
          backgroundColor: "#0a0a0f",
        }}
      >
        {/* Left Side - Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start px-4 sm:px-6 md:px-10 pb-8 sm:pb-12 md:pb-16 relative z-10">
          <div className="w-full max-w-lg lg:max-w-xl">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-[11px] uppercase tracking-[0.18em] text-neon-cyan">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for select collaborations
            </div>
            {/* Welcome Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
              <span className="block text-white drop-shadow-lg">Welcome</span>
              <span className="block text-neon-cyan drop-shadow-lg">to My</span>
              <span className="block bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent drop-shadow-lg">
                Portfolio
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-neon-cyan font-medium mb-2 sm:mb-3 drop-shadow-lg leading-relaxed">
              Full Stack Developer | MERN Specialist | AI Enthusiast
            </p>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 drop-shadow-lg leading-relaxed">
              Crafting innovative digital solutions with cutting-edge technology
              and creative design
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col xs:flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4 mb-8 sm:mb-12 w-full">
              <button
                onClick={() => scrollTo("projects")}
                className="flex-1 sm:flex-0 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Explore Work ↓
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="flex-1 sm:flex-0 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base bg-neon-cyan text-gray-900 font-bold rounded-lg hover:shadow-lg transition whitespace-nowrap"
              >
                Get In Touch
              </button>
              <button
                onClick={handleResumeClick}
                className="flex-1 sm:flex-0 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base bg-neon-purple text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Download ⬇
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400">
                  15+
                </p>
                <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-300 drop-shadow-lg">
                  Projects
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400">
                  3+
                </p>
                <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-300 drop-shadow-lg">
                  Years
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400">
                  800+
                </p>
                <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-300 drop-shadow-lg">
                  Solved
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Rubik's Cube (Responsive) */}
        <div
          className="w-full lg:w-1/2 flex items-center justify-center relative py-12 sm:py-16 md:py-16 "
          style={{ minHeight: "auto" }}
        >
          <RubiksCube3D />
        </div>
      </section>

      {/* Navbar */}
      <Navbar
        onResumeClick={handleResumeClick}
        onAssistantClick={handleAssistantClick}
        onCommandClick={() => setShowCommandPalette(true)}
      />

      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Main Sections */}
      <main>
        <About />
        <Skills />
        <Projects />
        <WorkExperience />
        <Services />
        <Connect />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Preview Modal */}
      <ResumePreviewModal
        isOpen={showResumePreviewModal}
        onClose={() => setShowResumePreviewModal(false)}
        onDownload={handleResumeDownload}
      />
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onCommand={handleCommand}
      />

      <div className="quick-actions" aria-label="Quick actions">
        <button
          onClick={handleAssistantClick}
          aria-label="Open AI assistant"
          title="Ask the AI assistant"
        >
          <FaComments aria-hidden="true" />
        </button>
        <button
          onClick={() => scrollTo("contact")}
          aria-label="Go to contact"
          title="Start a conversation"
        >
          <FaEnvelope aria-hidden="true" />
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          title="Back to top"
        >
          <FaArrowUp aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default App;
