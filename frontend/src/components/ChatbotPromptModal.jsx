import React from "react";
import { FaComments, FaTimes } from "react-icons/fa";

function ChatbotPromptModal({ isOpen, onClose, onOpenChatbot }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[65] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chatbot-prompt-title"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-900 p-7 text-white shadow-[0_24px_80px_rgba(8,145,178,0.3)]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-cyan-300"
          aria-label="Close chatbot invitation"
        >
          <FaTimes />
        </button>

        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl text-cyan-300">
          <FaComments />
        </div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
          Portfolio assistant
        </p>
        <h2 id="chatbot-prompt-title" className="text-2xl font-extrabold">
          Want to know more?
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Open the chatbot and ask anything about my projects, experience,
          skills, or technical approach.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-400 hover:text-white"
          >
            Not now
          </button>
          <button
            onClick={onOpenChatbot}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Open chatbot
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatbotPromptModal;
