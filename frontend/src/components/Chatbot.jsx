import React, { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaMicrophone,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { chatAssistant } from "../services/api";

// Component to render text with clickable links and typewriter effect
const TypewriterMessage = ({ text, isBot }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isBot) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, isBot]);

  // Parse and render links
  const renderWithLinks = (str) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = str.split(urlRegex);

    return parts.map((part, idx) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan hover:text-neon-purple underline transition break-all"
          >
            {part}
          </a>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="flex items-end gap-2">
      <div className="flex flex-col gap-1 flex-1">
        <div>{renderWithLinks(displayedText)}</div>
        {!isComplete && isBot && (
          <span className="inline-block w-2 h-4 bg-neon-cyan animate-pulse" />
        )}
      </div>
    </div>
  );
};

function Chatbot({ isOpen, onClose, onVoiceSwitch, serverAwake }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const messageIdRef = useRef(2);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (text, sender) => {
    const newMessage = { id: messageIdRef.current++, sender, text };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    addMessage(userMessage, "user");
    setInput("");

    setIsLoading(true);
    try {
      const response = await chatAssistant({ question: userMessage });
      const botReply =
        response.answer ||
        response.response ||
        "Sorry, I could not process that.";
      addMessage(botReply, "bot");
    } catch (error) {
      console.error("Chat error:", error);
      addMessage(
        "Sorry, something went wrong. Please try again in a moment.",
        "bot",
      );
    } finally {
      setIsLoading(false);
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
            ? "inset-0 m-4 md:m-8 h-auto max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] border-neon-purple/40"
            : "bottom-6 right-6 w-full max-w-md h-96 md:h-[550px] border-neon-cyan/20"
        }`}
      >
        {/* Gradient Background for expanded view */}
        {isExpanded && (
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 via-transparent to-neon-cyan/5 pointer-events-none" />
        )}

        {/* Server Status Bar */}
        <div
          className={`flex items-center justify-center gap-2 px-4 py-2.5 border-b transition-all duration-300 ${
            isExpanded
              ? "bg-gradient-to-r from-dark-tertiary to-dark-secondary border-neon-purple/20"
              : "bg-dark-tertiary border-neon-cyan/10"
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
          className={`flex items-center justify-between p-5 border-b transition-all duration-300 ${
            isExpanded
              ? "bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border-neon-purple/30"
              : "bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border-neon-cyan/20"
          }`}
        >
          <span
            className={`font-bold flex items-center gap-3 transition-all duration-300 ${
              isExpanded
                ? "text-2xl text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple"
                : "text-lg text-gray-100"
            }`}
          >
            <div className="relative">
              <FaRobot
                className={`${isExpanded ? "text-neon-cyan scale-125" : "text-neon-cyan"} icon-float transition-transform duration-300`}
                size={isExpanded ? 32 : 24}
              />
              <div
                className={`absolute inset-0 rounded-full blur-lg ${isExpanded ? "bg-neon-cyan/40" : "bg-neon-cyan/20"}`}
              />
            </div>
            <span className="font-poppins">
              {isExpanded ? "AI Chat Assistant" : "AI Chat"}
            </span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/10 p-2 rounded-lg transition duration-200"
              aria-label={isExpanded ? "Collapse" : "Expand"}
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <FaCompress size={18} /> : <FaExpand size={18} />}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/10 p-2 rounded-lg transition duration-200"
              aria-label="Close chatbot"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div
          className={`flex-1 overflow-y-auto p-4 space-y-4 message-container transition-all duration-300 ${
            isExpanded ? "p-6 md:p-8 space-y-6" : ""
          }`}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeInUp`}
            >
              <div
                className={`px-5 py-3 rounded-2xl transition-all duration-300 ${
                  isExpanded ? "max-w-2xl px-6 py-4 text-lg" : "max-w-xs"
                } ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-neon-cyan/30 to-neon-cyan/10 text-gray-100 rounded-br-none shadow-lg shadow-neon-cyan/10 border border-neon-cyan/30"
                    : "bg-dark-tertiary text-black rounded-bl-none border border-neon-purple/20 shadow-lg shadow-neon-purple/5"
                }`}
              >
                {msg.sender === "bot" ? (
                  <TypewriterMessage text={msg.text} isBot={true} />
                ) : (
                  <div>{msg.text}</div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fadeInUp">
              <div
                className={`bg-dark-tertiary text-gray-200 px-5 py-3 rounded-2xl rounded-bl-none border border-neon-purple/20 shadow-lg shadow-neon-purple/5 transition-all duration-300 ${
                  isExpanded ? "px-6 py-4" : ""
                }`}
              >
                <div className="flex gap-2">
                  <span
                    className="w-2.5 h-2.5 bg-neon-cyan rounded-full animate-pulse-dot"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="w-2.5 h-2.5 bg-neon-cyan rounded-full animate-pulse-dot"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="w-2.5 h-2.5 bg-neon-cyan rounded-full animate-pulse-dot"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          className={`border-t border-neon-cyan/20 bg-gradient-to-t from-dark-bg/50 to-transparent transition-all duration-300 ${
            isExpanded ? "p-6 md:p-8" : "p-4"
          }`}
        >
          <div className="flex gap-2">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={
                  isExpanded
                    ? "Ask me anything... I'm here to help."
                    : "Ask anything..."
                }
                className={`flex-1 bg-dark-secondary/80 text-black px-4 py-3 rounded-xl outline-none border border-neon-cyan/20 focus:border-neon-cyan/60 focus:shadow-lg focus:shadow-neon-cyan/20 transition placeholder-gray-600 ${
                  isExpanded ? "px-6 py-4 text-lg rounded-2xl" : ""
                }`}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className={`bg-gradient-to-r from-neon-cyan to-neon-purple text-white rounded-xl hover:shadow-lg hover:shadow-neon-cyan/40 disabled:opacity-40 disabled:cursor-not-allowed transition duration-200 hover:scale-105 ${
                  isExpanded ? "px-8 py-4 rounded-2xl text-lg" : "p-3"
                }`}
                aria-label="Send message"
                title="Send message (Enter)"
              >
                <FaPaperPlane size={isExpanded ? 20 : 16} />
              </button>
            </div>
            <button
              onClick={onVoiceSwitch}
              className={`bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-xl hover:bg-neon-purple/40 transition duration-200 hover:scale-105 ${
                isExpanded ? "px-6 py-4 rounded-2xl text-lg" : "p-3"
              }`}
              aria-label="Switch to voice"
              title="Switch to voice mode"
            >
              <FaMicrophone size={isExpanded ? 20 : 16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
