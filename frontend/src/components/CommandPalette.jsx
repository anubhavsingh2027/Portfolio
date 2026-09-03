import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaArrowRight,
  FaBrain,
  FaCode,
  FaDownload,
  FaEnvelope,
  FaHome,
  FaKeyboard,
  FaSearch,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const commands = [
  { id: "home", label: "Go to home", group: "Navigate", icon: FaHome, action: { type: "scroll", value: "home" } },
  { id: "about", label: "Meet Anubhav", group: "Navigate", icon: FaUser, action: { type: "scroll", value: "about" } },
  { id: "projects", label: "Explore projects", group: "Navigate", icon: FaCode, action: { type: "scroll", value: "projects" } },
  { id: "contact", label: "Start a conversation", group: "Navigate", icon: FaEnvelope, action: { type: "scroll", value: "contact" } },
  { id: "assistant", label: "Open AI assistant", group: "Actions", icon: FaBrain, action: { type: "assistant" } },
  { id: "resume", label: "Preview resume", group: "Actions", icon: FaDownload, action: { type: "resume" } },
];

function CommandPalette({ isOpen, onClose, onCommand }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commands;
    return commands.filter((command) => command.label.toLowerCase().includes(normalizedQuery));
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    setActiveIndex(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, Math.max(filteredCommands.length - 1, 0)));
  }, [filteredCommands.length]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % Math.max(filteredCommands.length, 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
      }
      if (event.key === "Enter" && filteredCommands[activeIndex]) {
        event.preventDefault();
        onCommand(filteredCommands[activeIndex].action);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, filteredCommands, isOpen, onClose, onCommand]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/45 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-cyan-500/25 bg-white shadow-2xl shadow-cyan-950/20" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
          <FaSearch className="text-cyan-700" aria-hidden="true" />
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search portfolio commands..." className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400" aria-label="Search commands" />
          <button onClick={onClose} className="rounded-md p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close command palette"><FaTimes /></button>
        </div>
        <div className="max-h-[52vh] overflow-y-auto p-2">
          {filteredCommands.length ? filteredCommands.map((command, index) => {
            const Icon = command.icon;
            const isActive = index === activeIndex;
            return (
              <button key={command.id} onMouseEnter={() => setActiveIndex(index)} onClick={() => onCommand(command.action)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${isActive ? "bg-cyan-50 text-cyan-950" : "text-slate-700 hover:bg-slate-50"}`}>
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${isActive ? "bg-cyan-600 text-white" : "bg-slate-100 text-cyan-700"}`}><Icon aria-hidden="true" /></span>
                <span className="flex-1"><span className="block text-sm font-semibold">{command.label}</span><span className="block text-xs text-slate-400">{command.group}</span></span>
                {isActive && <FaArrowRight className="text-cyan-600" aria-hidden="true" />}
              </button>
            );
          }) : <p className="px-4 py-8 text-center text-sm text-slate-500">No matching commands.</p>}
        </div>
        <div className="flex items-center gap-4 border-t border-slate-200 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1"><FaKeyboard aria-hidden="true" /> Navigate with arrows</span>
          <span>Enter to select</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
