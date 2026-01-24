// ===== MODE SELECTION AND VOICE ASSISTANT =====

import { voiceAssistant as voiceAssistantAPI } from './service.js';

document.addEventListener("DOMContentLoaded", function () {
  initModeSelection();
  initVoiceAssistant();
});

function initModeSelection() {
  const chatFab = document.getElementById("chatFab");
  const modeModal = document.getElementById("modeModal");
  const chatModeBtn = document.getElementById("chatModeBtn");
  const voiceModeBtn = document.getElementById("voiceModeBtn");
  const chatbot = document.getElementById("chatbot");
  const voiceAssistant = document.getElementById("voiceAssistant");


  if (!chatFab || !modeModal) return;

  chatFab.addEventListener("click", (e) => {
    e.preventDefault();
    modeModal.classList.add("active");
  });

  chatModeBtn?.addEventListener("click", () => {
    modeModal.classList.remove("active");
    chatbot?.classList.remove("hidden");
    chatFab.style.display = "none";
  });

  voiceModeBtn?.addEventListener("click", () => {
    modeModal.classList.remove("active");
    voiceAssistant?.classList.remove("hidden");
    chatFab.style.display = "none";
  });

  modeModal.addEventListener("click", (e) => {
    if (e.target === modeModal) modeModal.classList.remove("active");
  });
}


// ======================= VOICE ASSISTANT =======================

function initVoiceAssistant() {
  const voiceAssistant = document.getElementById("voiceAssistant");
  const micCircle = document.getElementById("micCircle");
  const voiceClose = document.getElementById("voiceClose");
  const voiceStatusText = document.getElementById("voiceStatusText");
  const voiceTranscript = document.getElementById("voiceTranscript");
  const voiceResponse = document.getElementById("voiceResponse");
  const voiceResponseContainer = document.getElementById("voiceResponseContainer");
 const micPulse = document.querySelector(".mic-pulse");
const micPulse2 = document.querySelector(".mic-pulse-2");
const chatFab = document.getElementById("chatFab");
  if (!voiceAssistant) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const synthesis = window.speechSynthesis;

  if (!SpeechRecognition) return console.warn("Speech Recognition not supported.");

  let recognition = null;
  let isListening = false;
  let isSpeaking = false;
  let lastProjectURL = null;


  // ---------- 📌 Smooth Section Scroll Function ----------
  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return false;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }


  // ---------- 🎤 Speech Recognition Setup ----------
  function initRecognition() {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      synthesis.cancel();
      isSpeaking = false;
        micCircle.classList.add("active");
        micPulse.classList.add("active");
        micPulse2.classList.add("active");
      isListening = true;

      voiceStatusText.textContent = "Listening...";
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript.trim()) {
        voiceTranscript.innerHTML = `<p>${finalTranscript}</p>`;
        handleCommand(finalTranscript.trim()).catch((err) => {
          console.error("Command error:", err);
          speakBack("Sorry, I encountered an error. Please try again.");
        });
      }
    };

    recognition.onerror = stopListening;
    recognition.onend = stopListening;
  }

  function startListening() {
    if (!recognition) initRecognition();
    recognition.start();
  }

  function stopListening() {
    isListening = false;
    recognition?.stop();
     micCircle.classList.remove("active");
  micPulse.classList.remove("active");
  micPulse2.classList.remove("active");
    voiceStatusText.textContent = "Tap to speak";
  }


  // ---------- 🗣 Text-To-Speech ----------
  function speak(text) {
    synthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    utter.pitch = 1.05;
    utter.volume = 1;

    isSpeaking = true;
    utter.onend = () => (isSpeaking = false);

    synthesis.speak(utter);
  }

  function speakBack(text) {
  voiceResponseContainer.classList.remove("hidden");
  voiceResponse.innerHTML = `<p>${text}</p>`;

  // Delay response for natural feel
  setTimeout(() => {
    speak(text);
  }, 500); // 800ms delay
}


  // ---------- 🤖 Command Handler ----------
  async function handleCommand(cmdRaw) {
    const cmd = cmdRaw.toLowerCase().trim();
    voiceResponseContainer.classList.remove("hidden");

    // 🛑 Stop Speaking Voice Command
    if (["stop speaking", "stop voice", "mute", "be quiet"].some(w => cmd.includes(w))) {
      synthesis.cancel();
      isSpeaking = false;
      return speakBack("Okay, I stopped speaking.");
    }

    // 🌐 Call API only for all other commands
    try {
      const apiResponse = await voiceAssistantAPI({ question: cmd });
      if (apiResponse && apiResponse.answer && !apiResponse.error) {
        return speakBack(apiResponse.answer);
      }
    } catch (err) {
      console.error("Voice API error:", err);
    }

    // Fallback response if API fails
    return speakBack("Sorry, I couldn't process that. Please try again.");
  }


  // ---------- 🎛 UI Buttons ----------
  micCircle?.addEventListener("click", () => {
    if (isSpeaking) {
      synthesis.cancel();
      isSpeaking = false;
      voiceStatusText.textContent = "Speech stopped. Tap to speak again.";
      return;
    }
    isListening ? stopListening() : startListening();
  });

  voiceClose?.addEventListener("click", () => {
    stopListening();
    synthesis.cancel();
    isSpeaking = false;
    voiceAssistant.classList.add("hidden");
    chatFab.style.display = "";


  });

  synthesis.onvoiceschanged = () => synthesis.getVoices();
}
