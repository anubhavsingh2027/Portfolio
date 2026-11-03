import React, { useState, useEffect } from "react";
import { FaArrowUp, FaComments, FaEnvelope } from "react-icons/fa";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import ChatbotPromptModal from "./components/ChatbotPromptModal";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";

import { useScrollIntoView } from "./hooks/useScrollIntoView";
import RubiksCube3D from "./components/RubiksCube3D";
import ChatbotPage from "./pages/ChatbotPage";
import ResumePage from "./pages/ResumePage";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/chatbot"
        element={<ChatbotPage />}
      />
      <Route
        path="/resume"
        element={<ResumePage />}
      />
      <Route
        path="/"
        element={<PortfolioHome />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function PortfolioHome() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showChatbotPrompt, setShowChatbotPrompt] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const scrollTo = useScrollIntoView();
  const handleResumeClick = () => navigate("/resume");
  const handleAssistantClick = () => navigate("/chatbot");
  const handleCommand = (action) => {
    setShowCommandPalette(false);
    if (action.type === "scroll") scrollTo(action.value);
    if (action.type === "assistant") handleAssistantClick();
    if (action.type === "resume") handleResumeClick();
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setShowChatbotPrompt(true), 40000);
    return () => window.clearTimeout(timer);
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

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
    };
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <div className="bg-dark-bg text-gray-900 font-poppins min-h-screen relative">
      <CustomCursor />
      <ChatbotPromptModal
        isOpen={showChatbotPrompt}
        onClose={() => setShowChatbotPrompt(false)}
        onOpenChatbot={handleAssistantClick}
      />
      <Navbar
        onResumeClick={handleResumeClick}
        onAssistantClick={handleAssistantClick}
        onCommandClick={() => setShowCommandPalette(true)}
      />
      <section
        id="home"
        className="relative w-full flex flex-col lg:flex-row overflow-visible"
        style={{ backgroundColor: "#0a0a0f" }}
      >
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start px-4 sm:px-6 md:px-10 pb-8 sm:pb-12 md:pb-16 relative z-10">
          <div className="w-full max-w-xl lg:max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 border-l-2 border-neon-cyan pl-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neon-cyan sm:text-[11px]">
              B.Tech CSE (AI) student • Backend AI Engineering Intern
            </div>

            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block">Software engineer building</span>
              <span className="block text-neon-cyan">full-stack products,</span>
              <span className="block text-slate-200">reliable backends & AI apps.</span>
            </h1>

            <p className="mb-6 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
              I’m Anubhav Singh, a software engineer focused on full-stack
              development, backend engineering, and AI-powered applications.
              I care about clear APIs, useful interfaces, and systems that hold
              up beyond the demo.
            </p>

            <div className="mb-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => scrollTo("projects")}
                className="rounded-lg bg-neon-cyan px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 sm:text-base"
              >
                View Projects
              </button>
              <button
                onClick={handleResumeClick}
                className="rounded-lg border border-slate-600 px-5 py-3 text-sm font-bold text-white transition hover:border-neon-cyan hover:text-neon-cyan sm:text-base"
              >
                Download Resume
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="rounded-lg border border-slate-600 px-5 py-3 text-sm font-bold text-white transition hover:border-neon-cyan hover:text-neon-cyan sm:text-base"
              >
                Contact
              </button>
              <a
                href="https://github.com/anubhavsingh2027"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-neon-cyan hover:text-neon-cyan sm:text-base"
              >
                GitHub
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-8">
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
                  900+
                </p>
                <p className="text-[11px] text-gray-300 sm:text-xs md:text-sm">
                  DSA problems
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-cyan-400 sm:text-3xl">
                  500+
                </p>
                <p className="text-[11px] text-gray-300 sm:text-xs md:text-sm">
                  Day LeetCode streak
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
