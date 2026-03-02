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
      "/src/assets/pdf/Anubhav-singh-Resume -Software-Engineer.pdf";
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
      {/* Fixed Video Background - Entire Page */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
          overflow: "hidden",
          backgroundColor: "#1a1a2e",
        }}
      >
        {/* Video Element */}
        <video
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          preload="auto"
          controls={false}
          onError={(e) => console.error("Video error:", e.target.error)}
          onLoadStart={() => {}}
          onCanPlay={() => {}}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          <source src="/assets/video/robot.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Dark Overlay for better text visibility */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Content with higher z-index to appear above video background */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Navbar */}
        <Navbar
          onResumeClick={handleResumeClick}
          onAssistantClick={handleAssistantClick}
        />

        {/* Main Sections */}
        <main>
          <Hero
            onResumeClick={handleResumeClick}
            onAssistantClick={handleAssistantClick}
          />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Connect />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>

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
