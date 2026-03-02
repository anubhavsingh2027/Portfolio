import React from "react";
import { FaDownload, FaTimes } from "react-icons/fa";
import Modal from "./Modal";
import previewImage from "../assets/images/preview-resume.png";

function ResumePreviewModal({ isOpen, onClose, onDownload }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resume Preview"
      className="max-w-3xl"
    >
      <div className="flex flex-col gap-6">
        {/* Preview Image */}
        <div className="flex justify-center">
          <img
            src={previewImage}
            alt="Resume Preview"
            className="max-w-full h-auto rounded-lg shadow-lg border border-neon-cyan/30"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onDownload}
            className="px-8 py-3 bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-bold rounded-lg hover:shadow-lg hover:shadow-neon-cyan/50 transition flex items-center gap-2"
          >
            <FaDownload /> Download Resume
          </button>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/50 font-bold rounded-lg hover:bg-neon-cyan/20 transition"
          >
            Close
          </button>
        </div>

        {/* Info Text */}
        <p className="text-gray-400 text-sm text-center">
          Click "Download Resume" to get the complete PDF file
        </p>
      </div>
    </Modal>
  );
}

export default ResumePreviewModal;
