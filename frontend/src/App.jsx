import React, { useState, useEffect } from "react";
import { FaArrowUp, FaComments, FaEnvelope } from "react-icons/fa";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Skills from "./sections/Skills";
import LeetCodeStats from "./sections/LeetCodeStats";
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
import VisitorWelcomeModal from "./components/VisitorWelcomeModal";
import CustomCursor from "./components/CustomCursor";

import { useScrollIntoView } from "./hooks/useScrollIntoView";
import RubiksCube3D from "./components/RubiksCube3D";

function App() {
  const [showVisitorWelcome, setShowVisitorWelcome] = useState(false);
  const [showResumePreviewModal, setShowResumePreviewModal] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTo = useScrollIntoView();
  const normalizedPath = currentPath.replace(/\/+$/, "").toLowerCase() || "/";
  const isChatbotRoute = normalizedPath === "/chatbot";

  useEffect(() => {
    const timer = window.setTimeout(() => setShowVisitorWelcome(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

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
    setShowResumePreviewModal(true);
  };

  const handleResumeDownload = () => {
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
        <CustomCursor />
        <VisitorWelcomeModal
          isOpen={showVisitorWelcome}
          onClose={() => setShowVisitorWelcome(false)}
        />
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
      <CustomCursor />
      <VisitorWelcomeModal
        isOpen={showVisitorWelcome}
        onClose={() => setShowVisitorWelcome(false)}
      />
      <section
        id="home"
        className="relative w-full flex flex-col lg:flex-row overflow-visible"
        style={{ backgroundColor: "#0a0a0f" }}
      >
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start px-4 sm:px-6 md:px-10 pb-8 sm:pb-12 md:pb-16 relative z-10">
          <div className="w-full max-w-xl lg:max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neon-cyan sm:text-[11px]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              B.Tech CSE (AI) student • Backend AI Engineering Intern
            </div>

            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block">Backend & Full-Stack</span>
              <span className="block text-neon-cyan">Developer building</span>
              <span className="block bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                scalable APIs & AI products
              </span>
            </h1>

            <p className="mb-6 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
              I’m Anubhav Singh, a B.Tech CSE (AI) student focused on backend
              systems, real-time applications, and practical AI integrations.
              I’m currently a Backend AI Engineering Intern and open to software
              engineering internships and entry-level opportunities in backend,
              full-stack, and AI-focused engineering.
            </p>

            <div className="mb-8 flex w-full flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("projects")}
                className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:shadow-lg sm:text-base"
              >
                View My Projects
              </button>
              <button
                onClick={handleResumeClick}
                className="flex-1 rounded-lg bg-neon-cyan px-5 py-3 text-sm font-bold text-slate-900 transition hover:shadow-lg sm:text-base"
              >
                Download Resume
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="flex-1 rounded-lg bg-neon-purple px-5 py-3 text-sm font-bold text-white transition hover:shadow-lg sm:text-base"
              >
                Connect With Me
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-cyan-400 sm:text-3xl">
                  15+
                </p>
                <p className="text-[11px] text-gray-300 sm:text-xs md:text-sm">
                  Projects
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-cyan-400 sm:text-3xl">
                  800+
                </p>
                <p className="text-[11px] text-gray-300 sm:text-xs md:text-sm">
                  DSA problems
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-cyan-400 sm:text-3xl">
                  AI +
                </p>
                <p className="text-[11px] text-gray-300 sm:text-xs md:text-sm">
                  Backend
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative flex w-full items-center justify-center py-12 sm:py-16 lg:w-1/2 lg:py-16"
          style={{ minHeight: "auto" }}
        >
          <RubiksCube3D />
        </div>
      </section>

      <Navbar
        onResumeClick={handleResumeClick}
        onAssistantClick={handleAssistantClick}
        onCommandClick={() => setShowCommandPalette(true)}
      />

      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      <main>
        <About />
        <Skills />
        <LeetCodeStats />
        <Projects />
        <WorkExperience />
        <Services />
        <Connect />
        <Contact />
      </main>

      <Footer />

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
