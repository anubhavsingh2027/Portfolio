import React from "react";
import { FaTimes } from "react-icons/fa";

function Modal({ isOpen, onClose, title, children, className = "" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div
        className={`bg-gradient-dark rounded-3xl shadow-neon-glow p-8 max-w-2xl w-full relative border border-neon-cyan/20 ${className}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neon-cyan hover:text-neon-purple text-3xl transition hover:scale-110"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        {title && (
          <h2 className="text-3xl font-bold mb-6 text-neon-cyan">{title}</h2>
        )}
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
