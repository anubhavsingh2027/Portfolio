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
  "What projects best show Anubhav’s backend skills?",
  "Tell me about his experience",
  "What technologies does he use most?",
];

const isHtmlMessage = (text) =>
  /<\s*(?:p|strong|em|ul|ol|li|h[1-6]|a|br|div|table|thead|tbody|tr|th|td)\b[^>]*>/i.test(text);

const sanitizeHtmlMessage = (html) => {
  if (typeof window === "undefined") return "";

  const document = new DOMParser().parseFromString(html, "text/html");
  const allowedTags = new Set([
    "P", "STRONG", "EM", "UL", "OL", "LI", "H1", "H2", "H3", "H4", "H5", "H6",
    "A", "BR", "DIV", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD",
  ]);
  const allowedClasses = new Set(["chat-answer-grid", "chat-answer-card", "chat-answer-table-wrap"]);

  document.body.querySelectorAll("*").forEach((element) => {
    if (!allowedTags.has(element.tagName)) {
      element.replaceWith(...element.childNodes);
      return;
    }

    [...element.attributes].forEach((attribute) => {
      if (
        (element.tagName !== "A" || !["href", "target", "rel"].includes(attribute.name)) &&
        (element.tagName !== "DIV" || attribute.name !== "class")
      ) {
        element.removeAttribute(attribute.name);
      }
    });

    if (element.tagName === "DIV") {
      const classes = (element.getAttribute("class") || "")
        .split(/\s+/)
        .filter((className) => allowedClasses.has(className));
      if (classes.length) element.setAttribute("class", classes.join(" "));
      else element.removeAttribute("class");
    }

    if (element.tagName === "A") {
      const href = element.getAttribute("href") || "";
      if (!href.startsWith("https://")) {
        element.removeAttribute("href");
      }
      element.setAttribute("target", "_blank");
      element.setAttribute("rel", "noopener noreferrer");
    }
  });

  return document.body.innerHTML;
};

const renderInlineMarkdown = (text, keyPrefix) => {
  const tokenPattern = /(https?:\/\/[^\s<]+|`[^`]+`|\*\*[^*]+\*\*|__[^_]+__)/g;
  const parts = text.split(tokenPattern);

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;

    if (/^https?:\/\//.test(part)) {
      const trailingPunctuation = part.match(/[.,!?;:)]*$/)?.[0] || "";
      const url = trailingPunctuation
        ? part.slice(0, -trailingPunctuation.length)
        : part;

      return (
        <React.Fragment key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-700 hover:text-purple-700 underline underline-offset-2 break-all transition"
          >
            {url}
          </a>
          {trailingPunctuation}
        </React.Fragment>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={key}
          className="rounded bg-black/10 px-1.5 py-0.5 font-mono text-[0.9em] text-purple-900"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (
      (part.startsWith("**") && part.endsWith("**")) ||
      (part.startsWith("__") && part.endsWith("__"))
    ) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }

    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
};

const renderMarkdown = (text) => {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = Math.min(heading[1].length, 6);
      const Heading = `h${level}`;
      blocks.push(
        <Heading
          key={`heading-${index}`}
          className={`chat-markdown__heading chat-markdown__heading--${level}`}
        >
          {renderInlineMarkdown(heading[2], `heading-${index}`)}
        </Heading>,
      );
      index += 1;
      continue;
    }

    if (/^([-*_])(?:\s*\1){2,}$/.test(line)) {
      blocks.push(<hr key={`rule-${index}`} className="chat-markdown__rule" />);
      index += 1;
      continue;
    }

    const unorderedItem = lines[index].match(/^(\s*)[-*+]\s+(.+)$/);
    const orderedItem = lines[index].match(/^\s*\d+[.)]\s+(.+)$/);
    if (unorderedItem || orderedItem) {
      const isOrdered = Boolean(orderedItem);
      const items = [];

      while (index < lines.length) {
        const match = isOrdered
          ? lines[index].match(/^\s*\d+[.)]\s+(.+)$/)
          : lines[index].match(/^(\s*)[-*+]\s+(.+)$/);
        if (!match) break;

        items.push({
          text: isOrdered ? match[1] : match[2],
          indent: isOrdered ? 0 : match[1].length,
        });
        index += 1;
      }

      const List = isOrdered ? "ol" : "ul";
      blocks.push(
        <List
          key={`list-${index}`}
          className={`chat-markdown__list ${
            isOrdered ? "chat-markdown__list--ordered" : ""
          }`}
        >
          {items.map((item, itemIndex) => (
            <li
              key={`list-${index}-${itemIndex}`}
              style={{ marginLeft: item.indent ? `${Math.min(item.indent, 6)}rem` : undefined }}
            >
              {renderInlineMarkdown(item.text, `list-${index}-${itemIndex}`)}
            </li>
          ))}
        </List>,
      );
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length) {
      const nextLine = lines[index].trim();
      if (
        !nextLine ||
        /^(#{1,6})\s+/.test(nextLine) ||
        /^([-*+])\s+/.test(nextLine) ||
        /^\d+[.)]\s+/.test(nextLine)
      ) {
        break;
      }
      paragraph.push(nextLine);
      index += 1;
    }

    blocks.push(
      <p key={`paragraph-${index}`} className="chat-markdown__paragraph">
        {renderInlineMarkdown(paragraph.join(" "), `paragraph-${index}`)}
      </p>,
    );
  }

  return blocks;
};

const TypewriterMessage = ({ text, isBot, animate, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const htmlMessage = isHtmlMessage(text);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (htmlMessage) {
      setDisplayedText(text);
      setIsComplete(true);
      onCompleteRef.current?.();
      return undefined;
    }

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
  }, [text, isBot, animate, htmlMessage]);

  return (
    <div className="flex items-end gap-2">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="chat-markdown">
          {htmlMessage
            ? <div dangerouslySetInnerHTML={{ __html: sanitizeHtmlMessage(displayedText) }} />
            : renderMarkdown(displayedText)}
        </div>
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
              text: "Hi! I’m Anubhav Singh’s portfolio assistant. Ask me about his projects, skills, experience, or hiring fit.",
            },
          ];
    } catch {
      return [
        {
          id: 1,
          sender: "bot",
          text: "Hi! I’m Anubhav Singh’s portfolio assistant. Ask me about his projects, skills, experience, or hiring fit.",
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
      text: "Fresh start. What would you like to know about Anubhav Singh’s portfolio?",
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
                  isExpanded ? "max-w-screen-2xl px-6 py-4 text-lg" : "max-w-screen-2xl"
                } ${
                  msg.sender === "user"
                    ? "chat-user-message rounded-br-none"
                    : "chat-bot-message rounded-bl-none"
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
