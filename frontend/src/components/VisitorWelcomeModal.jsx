import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBriefcase,
  FaCode,
  FaRegCompass,
  FaTimes,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import { visitorAccess } from "../services/api";

const visitorTypes = [
  {
    id: "developer",
    label: "Developer",
    description: "Explore the stack and build details",
    icon: FaCode,
    color: "cyan",
  },
  {
    id: "recruiter",
    label: "Recruiter",
    description: "Review experience and potential fit",
    icon: FaUserTie,
    color: "purple",
  },
  {
    id: "team",
    label: "Team / Client",
    description: "Find a thoughtful technical partner",
    icon: FaUsers,
    color: "emerald",
  },
  {
    id: "curious",
    label: "Just exploring",
    description: "Take a look around and say hello",
    icon: FaRegCompass,
    color: "amber",
  },
];

function VisitorWelcomeModal({ isOpen, onClose }) {
  const [selectedType, setSelectedType] = useState("");
  const [contact, setContact] = useState({ name: "", email: "" });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedType("");
      setContact({ name: "", email: "" });
      setIsSending(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedType || isSending) return;

    setIsSending(true);
    try {
      await visitorAccess({
        name: contact.name.trim(),
        email: contact.email.trim(),
        visitorType: selectedType,
      });
    } finally {
      localStorage.setItem("anubhav-visitor-welcomed-v2", "true");
      setIsSending(false);
      onClose();
    }
  };

  const handleSkip = () => {
    localStorage.setItem("anubhav-visitor-welcomed-v2", "true");
    onClose();
  };

  return (
    <div className="visitor-welcome fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-[#05070d]/90 p-4 backdrop-blur-md sm:p-6">
      <div className="visitor-welcome__noise pointer-events-none absolute inset-0 opacity-30" />
      <div className="visitor-welcome__panel relative my-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#0b1120]/95 shadow-[0_24px_100px_rgba(8,145,178,0.22)]">
        <button
          type="button"
          onClick={handleSkip}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/10 p-2.5 text-slate-400 transition hover:border-cyan-300/40 hover:text-white"
          aria-label="Close welcome message"
        >
          <FaTimes />
        </button>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="visitor-welcome__intro relative flex flex-col justify-between overflow-hidden p-7 sm:p-10">
            <div className="relative z-10">
              <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-xl text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                <FaBriefcase />
              </div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300">
                A quick hello
              </p>
              <h2 className="max-w-sm text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Make yourself at home.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
                Tell me what brings you here and I&apos;ll tune the tour toward
                what matters to you.
              </p>
            </div>
            <div className="relative z-10 mt-10 flex items-center gap-3 text-xs text-slate-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Anubhav Singh / full-stack engineer
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-7 sm:p-10">
            <div className="mb-6">
              <p className="text-lg font-bold text-white">
                Who are you visiting as?
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Choose the path that sounds most like you.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {visitorTypes.map(
                ({ id, label, description, icon: Icon, color }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedType(id)}
                    className={`visitor-type visitor-type--${color} ${selectedType === id ? "visitor-type--selected" : ""}`}
                    aria-pressed={selectedType === id}
                  >
                    <span className="visitor-type__icon">
                      <Icon />
                    </span>
                    <span className="text-left">
                      <span className="block font-bold text-white">
                        {label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-slate-400">
                        {description}
                      </span>
                    </span>
                  </button>
                ),
              )}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <input
                value={contact.name}
                onChange={(event) =>
                  setContact({ ...contact, name: event.target.value })
                }
                placeholder="Your name (optional)"
                className="visitor-input"
                autoComplete="name"
              />
              <input
                value={contact.email}
                onChange={(event) =>
                  setContact({ ...contact, email: event.target.value })
                }
                type="email"
                placeholder="Email (optional)"
                className="visitor-input"
                autoComplete="email"
              />
            </div>
            <div className="mt-7 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
              <button
                type="button"
                onClick={handleSkip}
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Skip for now
              </button>
              <button
                type="submit"
                disabled={!selectedType || isSending}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                {isSending ? "Opening portfolio..." : "Let’s go"}
                <FaArrowRight className="transition group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VisitorWelcomeModal;
