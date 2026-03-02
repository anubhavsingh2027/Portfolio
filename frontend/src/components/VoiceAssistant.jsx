import React, { useState, useRef, useEffect } from "react";
import {
  FaMicrophone,
  FaVolumeUp,
  FaTimes,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import {
  useVoiceRecognition,
  useSpeechSynthesis,
} from "../hooks/useVoiceRecognition";
import { voiceAssistant } from "../services/api";

// Animated Waveform Visualizer Component
const WaveformVisualizer = ({ isActive, isSpeaking }) => {
  return (
    <div className="flex items-end justify-center gap-1 h-32">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`w-1.5 rounded-full transition-all duration-100 ${
            isSpeaking
              ? "bg-neon-purple"
              : isActive
                ? "bg-neon-cyan"
                : "bg-neon-cyan/30"
          }`}
          style={{
            height: isSpeaking
              ? `${20 + Math.random() * 80}px`
              : isActive
                ? `${20 + Math.random() * 60}px`
                : "20px",
          }}
        />
      ))}
    </div>
  );
};

function VoiceAssistant({ isOpen, onClose, serverAwake }) {
  const [status, setStatus] = useState("Tap mic to speak");
  const [response, setResponse] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { transcript, isListening, startListening, stopListening } =
    useVoiceRecognition();
  const { speak, stop, isSpeaking } = useSpeechSynthesis();
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    if (isListening) {
      setStatus("🎤 Listening...");
    } else if (isSpeaking) {
      setStatus("🎤 Speaking...");
    } else {
      setStatus("Tap mic to speak");
    }
  }, [isListening, isSpeaking]);

  useEffect(() => {
    if (transcript && !isListening) {
      finalTranscriptRef.current = transcript;
      handleQuery(transcript);
    }
  }, [transcript, isListening]);

  // Stop speaking when voice assistant is closed
  useEffect(() => {
    if (!isOpen && isSpeaking) {
      stop();
    }
  }, [isOpen, isSpeaking, stop]);

  const handleMicClick = () => {
    if (isSpeaking) {
      stop();
      setStatus("Tap mic to speak");
      return;
    }

    if (isListening) {
      stopListening();
      setMicActive(false);
    } else {
      setResponse("");
      finalTranscriptRef.current = "";
      startListening();
      setMicActive(true);
    }
  };

  const handleQuery = async (query) => {
    if (!query.trim()) return;

    setStatus("Thinking...");
    try {
      const res = await voiceAssistant({ question: query });
      const answer =
        res.answer || res.response || "Sorry, I could not process that.";
      setResponse(answer);
      setStatus("Speaking...");
      speak(answer, { rate: 0.85, pitch: 1.3 });
    } catch (error) {
      console.error("Voice error:", error);
      setResponse("Sorry, something went wrong. Please try again.");
      setStatus("Error. Tap mic to try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay for expanded view */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-30"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed z-40 bg-dark-secondary rounded-3xl shadow-2xl flex flex-col border backdrop-blur-sm overflow-hidden transition-all duration-300 ${
          isExpanded
            ? "inset-0 m-4 md:m-8 h-auto max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] border-neon-purple/40 gap-6"
            : "bottom-6 right-6 w-full max-w-md gap-6 border-neon-purple/30"
        }`}
      >
        {/* Gradient Background for expanded view */}
        {isExpanded && (
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-cyan/10 pointer-events-none" />
        )}

        {/* Server Status Bar */}
        <div
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-300 relative z-10 ${
            isExpanded
              ? "bg-gradient-to-r from-dark-tertiary to-dark-secondary mx-4 md:mx-8 mt-4 md:mt-8 border-neon-purple/20"
              : "bg-dark-tertiary border-neon-purple/20 w-full"
          }`}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full ${serverAwake ? "bg-green-400 animate-pulse" : "bg-red-400 animate-pulse"}`}
          />
          <span
            className={`text-xs font-bold tracking-wide ${serverAwake ? "text-green-400" : "text-red-400"}`}
          >
            {serverAwake ? "✓ SERVER READY" : "⏳ CONNECTING..."}
          </span>
        </div>

        {/* Animated Header */}
        <div
          className={`flex items-center justify-between relative z-10 transition-all duration-300 ${
            isExpanded ? "px-8 pt-4" : "px-6 pt-6"
          }`}
        >
          <h3
            className={`gradient-text font-bold flex items-center gap-3 transition-all duration-300 ${
              isExpanded ? "text-3xl" : "text-lg"
            }`}
          >
            <div className="relative">
              <FaMicrophone
                className={`${isExpanded ? "text-neon-purple scale-150" : "text-neon-purple"} icon-float transition-transform duration-300`}
                size={isExpanded ? 40 : 20}
              />
              <div
                className={`absolute inset-0 rounded-full blur-lg ${isExpanded ? "bg-neon-purple/50" : "bg-neon-purple/30"}`}
              />
            </div>
            <span className="font-poppins">
              {isExpanded ? "Voice Assistant Mode" : "Voice Mode"}
            </span>
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-neon-purple hover:bg-neon-purple/10 p-2 rounded-lg transition duration-200"
              aria-label={isExpanded ? "Collapse" : "Expand"}
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <FaCompress size={18} /> : <FaExpand size={18} />}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-neon-purple hover:bg-neon-purple/10 p-2 rounded-lg transition duration-200"
              aria-label="Close voice assistant"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* Main Content Container */}
        <div
          className={`flex flex-col items-center justify-center flex-1 relative z-10 transition-all duration-300 ${
            isExpanded ? "px-8 pb-8 space-y-8" : "px-6 pb-6 space-y-6"
          }`}
        >
          {/* Waveform Visualizer */}
          <WaveformVisualizer isActive={micActive} isSpeaking={isSpeaking} />

          {/* Microphone Button */}
          <button
            onClick={handleMicClick}
            className={`relative flex items-center justify-center transition-all duration-300 font-bold text-2xl ${
              isListening ? "animate-pulse-ring" : ""
            } ${
              micActive
                ? "bg-gradient-to-br from-neon-cyan to-neon-purple shadow-2xl shadow-neon-cyan/50 text-white scale-100"
                : "bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 text-neon-purple hover:from-neon-purple/40 hover:to-neon-cyan/40 hover:scale-105"
            } ${
              isExpanded ? "w-48 h-48 rounded-full" : "w-32 h-32 rounded-full"
            }`}
            aria-label="Microphone"
          >
            {isSpeaking ? (
              <FaVolumeUp
                size={isExpanded ? 80 : 48}
                className="animate-bounce"
              />
            ) : (
              <FaMicrophone size={isExpanded ? 80 : 48} />
            )}
            {micActive && (
              <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/50 animate-pulse-ring-border" />
            )}
          </button>

          {/* Status Display */}
          <div className="text-center">
            <p
              className={`gradient-text font-bold transition-all duration-300 ${
                isExpanded ? "text-3xl" : "text-xl"
              }`}
            >
              {status}
            </p>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <div
              className={`w-full bg-gradient-to-r from-neon-cyan/5 to-neon-purple/5 rounded-2xl border border-neon-cyan/20 animate-fadeInUp transition-all duration-300 ${
                isExpanded ? "p-6" : "p-4"
              }`}
            >
              <p
                className={`text-neon-cyan font-bold uppercase tracking-wider mb-2 flex items-center gap-2 transition-all duration-300 ${
                  isExpanded ? "text-lg" : "text-sm"
                }`}
              >
                <FaMicrophone size={isExpanded ? 16 : 12} /> You Said:
              </p>
              <p
                className={`text-black leading-relaxed transition-all duration-300 ${
                  isExpanded ? "text-lg" : "text-sm"
                }`}
              >
                {transcript}
              </p>
            </div>
          )}

          {/* Response Display */}
          {response && (
            <div
              className={`w-full bg-gradient-to-r from-neon-purple/5 to-neon-cyan/5 rounded-2xl border border-neon-purple/20 animate-fadeInUp overflow-y-auto transition-all duration-300 ${
                isExpanded ? "p-6 max-h-48" : "p-4 max-h-32"
              }`}
            >
              <p
                className={`text-neon-purple font-bold uppercase tracking-wider mb-2 flex items-center gap-2 transition-all duration-300 ${
                  isExpanded ? "text-lg" : "text-sm"
                }`}
              >
                <FaVolumeUp size={isExpanded ? 16 : 12} /> Response:
              </p>
              <p
                className={`text-black leading-relaxed transition-all duration-300 ${
                  isExpanded ? "text-lg" : "text-sm"
                }`}
              >
                {response}
              </p>
            </div>
          )}

          {/* Loading Indicator */}
          {!response && isListening && (
            <div className="text-center space-y-2">
              <p
                className={`text-neon-cyan font-medium transition-all duration-300 ${
                  isExpanded ? "text-lg" : "text-sm"
                }`}
              >
                Listening...
              </p>
              <div className="flex gap-1 justify-center">
                <span
                  className={`rounded-full animate-pulse-dot transition-all duration-300 ${
                    isExpanded ? "w-4 h-4" : "w-2 h-2"
                  } bg-neon-cyan`}
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className={`rounded-full animate-pulse-dot transition-all duration-300 ${
                    isExpanded ? "w-4 h-4" : "w-2 h-2"
                  } bg-neon-cyan`}
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className={`rounded-full animate-pulse-dot transition-all duration-300 ${
                    isExpanded ? "w-4 h-4" : "w-2 h-2"
                  } bg-neon-cyan`}
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default VoiceAssistant;
