import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Connect from "./sections/Connect";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Chatbot from "./components/Chatbot";
import VoiceAssistant from "./components/VoiceAssistant";
import Modal from "./components/Modal";
import ResumePreviewModal from "./components/ResumePreviewModal";

import { useScrollIntoView } from "./hooks/useScrollIntoView";
import { wakeup } from "./services/api";
import RubixCube from "./sections/RubixCube";
import RubiksCube3D from "./components/RubiksCube3D";

function App() {
  const [showResumePreviewModal, setShowResumePreviewModal] = useState(false);
  const [showAssistantModeModal, setShowAssistantModeModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [serverAwake, setServerAwake] = useState(false);
  const [checkingServer, setCheckingServer] = useState(true);
  const scrollTo = useScrollIntoView();

  // Check server status on component mount
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        setCheckingServer(true);
        const response = await wakeup();
        // If we get a response without error, server is awake
        if (response && !response.error) {
          setServerAwake(true);
        } else {
          setServerAwake(false);
        }
      } catch (error) {
        console.error("Server status check failed:", error);
        setServerAwake(false);
      } finally {
        setCheckingServer(false);
      }
    };

    checkServerStatus();

    // Periodically check server status every 2 minutes
    const interval = setInterval(checkServerStatus, 120000);
    return () => clearInterval(interval);
  }, []);

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
    // Show mode selection directly
    setShowAssistantModeModal(true);
  };

  const handleChatMode = () => {
    setShowAssistantModeModal(false);
    setShowChatbot(true);
  };

  const handleVoiceMode = () => {
    setShowAssistantModeModal(false);
    setShowVoiceAssistant(true);
  };

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
                  700+
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
      />

      {/* Main Sections */}
      <main>
        <About />
        <Skills />
        <Projects />
        <Services />
        <Connect />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot
        isOpen={showChatbot}
        onClose={() => {
          setShowChatbot(false);
          setShowVoiceAssistant(false);
        }}
        onVoiceSwitch={() => {
          setShowChatbot(false);
          setShowVoiceAssistant(true);
        }}
        serverAwake={serverAwake}
      />

      {/* Voice Assistant */}
      <VoiceAssistant
        isOpen={showVoiceAssistant}
        onClose={() => {
          setShowVoiceAssistant(false);
          setShowChatbot(false);
        }}
        serverAwake={serverAwake}
      />

      {/* Assistant Mode Selection Modal */}
      <Modal
        isOpen={showAssistantModeModal}
        onClose={() => setShowAssistantModeModal(false)}
        title="Choose Your AI Assistant Mode"
      >
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleChatMode}
            className="p-4 bg-dark-secondary border border-neon-cyan/30 hover:border-neon-cyan rounded-lg transition text-center hover:shadow-neon-cyan"
          >
            <div className="text-3xl mb-2">💬</div>
            <p className="font-bold text-gray-900">Chat Mode</p>
            <p className="text-gray-700 text-sm mt-1">
              Text-based conversations
            </p>
          </button>
          <button
            onClick={handleVoiceMode}
            className="p-4 bg-dark-secondary border border-neon-purple/30 hover:border-neon-purple rounded-lg transition text-center hover:shadow-neon-purple"
          >
            <div className="text-3xl mb-2">🎤</div>
            <p className="font-bold text-gray-900">Voice Mode</p>
            <p className="text-gray-700 text-sm mt-1">Voice conversations</p>
          </button>
        </div>
      </Modal>

      {/* Resume Preview Modal */}
      <ResumePreviewModal
        isOpen={showResumePreviewModal}
        onClose={() => setShowResumePreviewModal(false)}
        onDownload={handleResumeDownload}
      />
    </div>
  );
}

export default App;
