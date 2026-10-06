import React from "react";
import { useNavigate } from "react-router-dom";
import VisitorWelcomeModal from "../components/VisitorWelcomeModal";
import CustomCursor from "../components/CustomCursor";

function ResumePage({ showVisitorWelcome, onCloseWelcome }) {
  const navigate = useNavigate();

  const handleDownload = () => {
    window.location.href = "/assets/pdf/Anubhav-singh-Resume -Software-Engineer.pdf";
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8">
      <CustomCursor />
      
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
          >
            ← Back to portfolio
          </button>
          <a
            href="/assets/pdf/Anubhav-singh-Resume -Software-Engineer.pdf"
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-cyan-500/40"
           download>
            Download PDF
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-900/80 shadow-2xl shadow-cyan-500/10">
          <img
            src="/assets/images/preview-resume.png"
            alt="Resume preview"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default ResumePage;
