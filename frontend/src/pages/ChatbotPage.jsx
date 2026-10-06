import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import VoiceAssistant from "../components/VoiceAssistant";
import CommandPalette from "../components/CommandPalette";
import VisitorWelcomeModal from "../components/VisitorWelcomeModal";
import CustomCursor from "../components/CustomCursor";

function ChatbotPage({ showVisitorWelcome, onCloseWelcome }) {
  const navigate = useNavigate();
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  const handleCommand = (action) => {
    setShowCommandPalette(false);
    if (action.type === "assistant") return;
    if (action.type === "resume") {
      navigate("/resume");
      return;
    }
    if (action.type === "scroll") {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById(action.value)?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg font-poppins text-gray-900">
      <CustomCursor />
      <VisitorWelcomeModal isOpen={showVisitorWelcome} onClose={onCloseWelcome} />
      <Navbar
        onResumeClick={() => navigate("/resume")}
        onAssistantClick={() => navigate("/chatbot")}
        onCommandClick={() => setShowCommandPalette(true)}
      />
      <main className="min-h-[120dvh] px-3 pb-6 pt-28 sm:px-4 md:px-8 md:pb-10">
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
                Explore Anubhav’s projects, experience, and technical approach in a focused conversation.
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="hidden rounded-lg border border-neon-cyan/30 px-4 py-2 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/10 sm:block"
            >
              Back to portfolio
            </button>
          </div>
          <Chatbot
            isOpen
            isPage
            onClose={() => navigate("/")}
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

export default ChatbotPage;
