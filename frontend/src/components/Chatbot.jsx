import React, { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaMicrophone,
  FaExpand,
  FaCompress,
  FaCopy,
  FaCheck,
  FaTrash,
  FaRedo,
  FaBolt,
  FaStop,
} from "react-icons/fa";
import { chatAssistant } from "../services/api";

const QUICK_PROMPTS = [
  "What projects best show your skills?",
  "Tell me about your experience",
  "What can you build for my business?",
];

// Component to render text with clickable links and typewriter effect
const TypewriterMessage = ({ text, isBot, animate, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isBot || !animate) {
      setDisplayedText(text);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        index = Math.min(index + 2, text.length);
        setDisplayedText(text.substring(0, index));
      } else {
        setIsComplete(true);
        clearInterval(interval);
        onCompleteRef.current?.();
      }
    }, 24);

    return () => clearInterval(interval);
  }, [text, isBot, animate]);

  // Parse and render links
  const renderWithLinks = (str) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = str.split(urlRegex);

    return parts.map((part, idx) => {
      if (/^https?:\/\//.test(part)) {
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

function Chatbot({ isOpen, isPage = false, onClose, onVoiceSwitch }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("anubhav-chat-history");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              sender: "bot",
              text: "Hi! I’m Anubhav’s AI assistant. Ask me about projects, experience, or how we could work together.",
            },
          ];
    } catch {
      return [
        {
          id: 1,
          sender: "bot",
          text: "Hi! I’m Anubhav’s AI assistant. Ask me about projects, experience, or how we could work together.",
        },
      ];
    }
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTypingId, setActiveTypingId] = useState(null);
  const [visibleStart, setVisibleStart] = useState(() => {
    try {
      const saved = localStorage.getItem("anubhav-chat-history");
      return saved ? Math.max(JSON.parse(saved).length - 10, 0) : 0;
    } catch {
      return 0;
    }
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messageIdRef = useRef(messages.length + 1);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("anubhav-chat-history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    setVisibleStart(Math.max(messages.length - 10, 0));
  }, [messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 128)}px`;
  }, [input]);

  const addMessage = (text, sender, extra = {}) => {
    const newMessage = { id: messageIdRef.current++, sender, text, ...extra };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const handleSendMessage = async (prompt = input) => {
    if (!prompt.trim() || isLoading) return;

    const userMessage = prompt.trim();
    addMessage(userMessage, "user");
    setInput("");

    setIsLoading(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      const response = await chatAssistant({
        question: userMessage,
        history: [...messages, { sender: "user", text: userMessage }].slice(
          -10,
        ),
        signal: controller.signal,
      });
      const botReply =
        response.answer ||
        response.response ||
        "Sorry, I could not process that.";
      const botMessage = addMessage(botReply, "bot");
      setActiveTypingId(botMessage.id);
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Chat error:", error);
      addMessage(
        "Sorry, something went wrong. Please try again in a moment.",
        "bot",
        { retryPrompt: userMessage },
      );
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const stopResponse = () => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
    setActiveTypingId(null);
  };

  const handleMessagesScroll = (event) => {
    const container = event.currentTarget;
    if (container.scrollTop > 24 || visibleStart === 0) return;
    const previousHeight = container.scrollHeight;
    setVisibleStart((current) => Math.max(current - 10, 0));
    requestAnimationFrame(() => {
      container.scrollTop += container.scrollHeight - previousHeight;
    });
  };

  const clearConversation = () => {
    const welcome = {
      id: messageIdRef.current++,
      sender: "bot",
      text: "Fresh start. What would you like to know about Anubhav’s work?",
    };
    setMessages([welcome]);
    setVisibleStart(0);
    setActiveTypingId(null);
  };

  const copyMessage = async (message) => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopiedId(message.id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay for expanded view */}
      {isExpanded && !isPage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-30"
          onClick={onClose}
        />
      )}

      <div
        className={`${
          isPage
            ? "chatbot-page relative z-0 w-full min-h-0 rounded-3xl border border-neon-cyan/30 bg-dark-secondary shadow-2xl"
            : "fixed z-40 bg-dark-secondary rounded-3xl shadow-2xl flex flex-col border backdrop-blur-sm overflow-hidden transition-all duration-300"
        } ${
          !isPage && isExpanded
            ? "inset-0 m-4 md:m-8 h-auto max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] border-neon-purple/40"
            : !isPage
              ? "bottom-6 right-6 w-full max-w-md h-96 md:h-[550px] border-neon-cyan/20"
              : ""
        }`}
      >
        {/* Gradient Background for expanded view */}
        {isExpanded && (
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 via-transparent to-neon-cyan/5 pointer-events-none" />
        )}

        {/* Assistant toolbar */}
        <div
          className={`flex items-center justify-center gap-2 px-4 py-2.5 border-b transition-all duration-300 ${
            isExpanded
              ? "bg-gradient-to-r from-dark-tertiary to-dark-secondary border-neon-purple/20"
              : "bg-dark-tertiary border-neon-cyan/10"
          }`}
        >
          <span className="text-xs font-bold tracking-wide text-neon-cyan">
            AI ASSISTANT
          </span>
          <button
            onClick={clearConversation}
            className="ml-auto text-gray-500 hover:text-neon-cyan transition"
            aria-label="Clear conversation"
            title="Clear conversation"
          >
            <FaTrash size={12} />
          </button>
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
            {!isPage && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/10 p-2 rounded-lg transition duration-200"
                aria-label={isExpanded ? "Collapse" : "Expand"}
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <FaCompress size={18} /> : <FaExpand size={18} />}
              </button>
            )}
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
          onScroll={handleMessagesScroll}
          className={`min-h-0 flex-1 overflow-y-auto p-4 space-y-4 message-container transition-all duration-300 ${
            isExpanded ? "p-6 md:p-8 space-y-6" : ""
          }`}
        >
          {visibleStart > 0 && (
            <div className="text-center text-[10px] uppercase tracking-widest text-gray-500 py-1">
              Scroll up for earlier messages
            </div>
          )}
          {messages.length === 1 && (
            <div className="space-y-2 pb-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                <FaBolt className="text-neon-cyan" /> Try asking
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-left text-xs text-gray-700 border border-neon-cyan/20 bg-white/40 hover:bg-neon-cyan/10 hover:text-neon-cyan rounded-lg px-3 py-2 transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.slice(visibleStart).map((msg) => (
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
                  <>
                    <TypewriterMessage
                      text={msg.text}
                      isBot={true}
                      animate={msg.id === activeTypingId}
                      onComplete={() => {
                        if (msg.id === activeTypingId) setActiveTypingId(null);
                      }}
                    />
                    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-black/10">
                      <button
                        onClick={() => copyMessage(msg)}
                        className="text-[10px] text-gray-500 hover:text-neon-cyan flex items-center gap-1 transition"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? <FaCheck /> : <FaCopy />}{" "}
                        {copiedId === msg.id ? "Copied" : "Copy"}
                      </button>
                      {msg.retryPrompt && (
                        <button
                          onClick={() => handleSendMessage(msg.retryPrompt)}
                          className="text-[10px] text-gray-500 hover:text-neon-cyan flex items-center gap-1 transition"
                          title="Retry request"
                        >
                          <FaRedo /> Retry
                        </button>
                      )}
                    </div>
                  </>
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
                <div className="flex items-center gap-2">
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
                  <span className="ml-1 text-xs text-gray-400">Thinking</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          className={`flex-shrink-0 border-t border-neon-cyan/20 bg-gradient-to-t from-dark-bg/50 to-transparent transition-all duration-300 ${
            isExpanded ? "p-6 md:p-8" : "p-4"
          }`}
        >
          <div className="flex gap-2">
            <div className="flex-1 flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={
                  isExpanded
                    ? "Ask me anything... I'm here to help."
                    : "Ask anything..."
                }
                rows={1}
                className={`flex-1 min-h-[46px] max-h-32 overflow-y-auto bg-dark-secondary/80 text-black px-4 py-3 rounded-xl outline-none border border-neon-cyan/20 focus:border-neon-cyan/60 focus:shadow-lg focus:shadow-neon-cyan/20 transition placeholder-gray-600 resize-none ${
                  isExpanded ? "px-6 py-4 text-lg rounded-2xl" : ""
                }`}
                disabled={isLoading}
                maxLength={500}
              />
              <button
                onClick={isLoading ? stopResponse : handleSendMessage}
                disabled={!isLoading && !input.trim()}
                className={`bg-gradient-to-r from-neon-cyan to-neon-purple text-white rounded-xl hover:shadow-lg hover:shadow-neon-cyan/40 disabled:opacity-40 disabled:cursor-not-allowed transition duration-200 hover:scale-105 ${
                  isExpanded ? "px-8 py-4 rounded-2xl text-lg" : "p-3"
                }`}
                aria-label={isLoading ? "Stop response" : "Send message"}
                title={isLoading ? "Stop response" : "Send message (Enter)"}
              >
                {isLoading ? (
                  <FaStop size={isExpanded ? 18 : 14} />
                ) : (
                  <FaPaperPlane size={isExpanded ? 20 : 16} />
                )}
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
          <div className="flex justify-between mt-2 px-1 text-[10px] text-gray-500">
            <span>Enter to send · Shift + Enter for a new line</span>
            <span>{input.length}/500</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
