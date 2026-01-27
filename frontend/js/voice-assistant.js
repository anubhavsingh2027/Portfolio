import { voiceAssistant } from "./service.js";

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

  // Don't open modal on FAB click - let chat-assistant.js handle access control
  // Just handle mode selection button clicks

  chatModeBtn?.addEventListener("click", () => {
    modeModal.classList.remove("active");
    modeModal.classList.add("hidden");
    chatbot?.classList.remove("hidden");
    chatFab.style.display = "none";
  });

  voiceModeBtn?.addEventListener("click", () => {
    modeModal.classList.remove("active");
    modeModal.classList.add("hidden");
    voiceAssistant?.classList.remove("hidden");
    chatFab.style.display = "none";
  });

  // Close modal on overlay click
  modeModal.addEventListener("click", (e) => {
    if (e.target === modeModal) {
      modeModal.classList.remove("active");
      modeModal.classList.add("hidden");
    }
  });
}

// ======================= VOICE ASSISTANT =======================

function initVoiceAssistant() {
  const voiceAssistantElement = document.getElementById("voiceAssistant");
  const micCircle = document.getElementById("micCircle");
  const circleIcon = document.getElementById("circleIcon");
  const voiceClose = document.getElementById("voiceClose");
  const voiceStatusText = document.getElementById("voiceStatusText");
  const voiceTranscript = document.getElementById("voiceTranscript");
  const voiceResponse = document.getElementById("voiceResponse");
  const voiceResponseContainer = document.getElementById(
    "voiceResponseContainer",
  );
  const micPulse = document.querySelector(".mic-pulse");
  const micPulse2 = document.querySelector(".mic-pulse-2");
  const chatFab = document.getElementById("chatFab");
  if (!voiceAssistantElement) return;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const synthesis = window.speechSynthesis;

  if (!SpeechRecognition)
    return console.warn("Speech Recognition not supported.");

  let recognition = null;
  let isListening = false;
  let isSpeaking = false;
  let preferredVoice = null;

  // ---------- 🎙️ Initialize Preferred Indian Female Voice ----------
  function initPreferredVoice() {
    const voices = synthesis.getVoices();

    // Priority order for Indian female voices
    const voicePriorities = [
      // Google Cloud voices - highest priority
      (v) => v.name === "Aditi" && v.lang.includes("hi"),
      (v) => v.name === "Aditi",
      // Indian English voices
      (v) => v.lang === "en-IN" && !v.name.toLowerCase().includes("male"),
      // Hindi voices
      (v) => v.lang === "hi-IN" && !v.name.toLowerCase().includes("male"),
      (v) => v.lang.startsWith("hi") && !v.name.toLowerCase().includes("male"),
      // Fallback: Any female voice
      (v) =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("woman") ||
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("victoria") ||
        v.name.toLowerCase().includes("moira"),
    ];

    for (let priority of voicePriorities) {
      preferredVoice = voices.find(priority);
      if (preferredVoice) break;
    }

    // If still no voice, use first available
    if (!preferredVoice && voices.length > 0) {
      preferredVoice = voices[0];
    }
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

      voiceStatusText.textContent = "🎤 Listening...";
      voiceTranscript.innerHTML =
        '<p class="transcript-placeholder" style="color: #667eea; font-style: italic;">Speak now...</p>';
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      // Process all results (interim and final)
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const isFinal = event.results[i].isFinal;
        const confidence = Math.round(event.results[i][0].confidence * 100);

        if (isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      // Display interim results in real-time
      if (interimTranscript || finalTranscript) {
        const displayText = (finalTranscript || interimTranscript).trim();
        const confidenceIndicator = interimTranscript ? " 👂" : " ✓";
        voiceTranscript.innerHTML = `<p><strong>${displayText}</strong>${confidenceIndicator}</p>`;
      }

      // When final result is detected
      if (finalTranscript.trim()) {
        voiceStatusText.textContent = "✓ Understood! Processing...";
        handleCommand(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      let errorMessage = "Listening...";

      switch (event.error) {
        case "network":
          errorMessage = "❌ Network error - check internet";
          break;
        case "no-speech":
          errorMessage = "⚠️ No sound detected - try again";
          break;
        case "audio-capture":
          errorMessage = "❌ Microphone not available";
          break;
        case "not-allowed":
          errorMessage = "❌ Microphone permission denied";
          break;
        case "bad-grammar":
          errorMessage = "❌ Speech recognition error";
          break;
        default:
          errorMessage = "⚠️ Error - try again";
      }

      voiceStatusText.textContent = errorMessage;
      stopListening();
    };

    recognition.onend = () => {
      stopListening();
    };

    // Add permission change listener
    try {
      navigator.permissions
        .query({ name: "microphone" })
        .then((permission) => {
          permission.addEventListener("change", () => {
            if (permission.state === "denied" && isListening) {
              console.warn("Microphone permission was revoked");
              stopListening();
              voiceStatusText.textContent = "❌ Microphone permission revoked";
            }
          });
        })
        .catch((err) =>
          console.warn("Permission API not fully supported:", err),
        );
    } catch (err) {
      console.warn("Permission monitoring not available:", err);
    }
  }

  async function checkMicrophonePermission() {
    try {
      const permission = await navigator.permissions.query({
        name: "microphone",
      });

      if (permission.state === "denied") {
        voiceStatusText.textContent = "❌ Microphone permission denied";
        return false;
      }

      if (permission.state === "granted") {
        return true;
      }

      // For 'prompt' state, try to get permission
      if (permission.state === "prompt") {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        return true;
      }
    } catch (error) {
      console.error("Microphone permission check failed:", error);
      voiceStatusText.textContent = "❌ Cannot access microphone";
      return false;
    }
  }

  function startListening() {
    // Check if server is awake
    if (!window.serverAwake) {
      voiceStatusText.textContent = "⏳ Server waking up...";
      voiceResponseContainer.classList.remove("hidden");
      speakBack("Server is currently waking up. Please wait a few seconds.");
      // Block listening for 3 seconds
      setTimeout(() => {
        voiceStatusText.textContent = "👂 Ready to listen";
      }, 3000);
      return;
    }

    // Check microphone permission first
    checkMicrophonePermission().then((hasPermission) => {
      if (!hasPermission) {
        return;
      }

      // Reset transcript display
      voiceTranscript.innerHTML =
        '<p class="transcript-placeholder" style="color: #667eea; font-style: italic;">Listening for your voice...</p>';
      voiceStatusText.textContent = "🎤 Listening...";

      // Change icon to microphone
      circleIcon.className = "fas fa-microphone";

      try {
        recognition.start();
      } catch (e) {
        // Handle case where recognition is already listening
        if (e.name !== "InvalidStateError") {
          console.error("Speech recognition error:", e);
          voiceStatusText.textContent = "❌ Microphone error - try again";
        }
      }
    });
  }

  function stopListening() {
    isListening = false;
    recognition?.stop();
    micCircle.classList.remove("active");
    micPulse.classList.remove("active");
    micPulse2.classList.remove("active");
    voiceStatusText.textContent = "👂 Ready to listen";

    // Reset icon to microphone
    circleIcon.className = "fas fa-microphone";
  }

  // ---------- 🗣 Text-To-Speech with Fixed Sweet Indian Female Voice ----------
  function speak(text) {
    synthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);

    // Apply the preferred Indian female voice (same for all users)
    if (preferredVoice) {
      utter.voice = preferredVoice;
    }

    // Optimize parameters for soft, sweet, pleasant, warm tone
    utter.rate = 0.82; // Slower (0.82) - calm, natural, easy to follow, gentle pacing
    utter.pitch = 1.4; // Higher pitch (1.4) - warm, sweet, friendly, approachable, pyaari feel
    utter.volume = 1; // Full volume - studio-quality clarity, no distortion

    isSpeaking = true;

    // Add speaking animation and change icon to speaker
    micCircle.classList.add("speaking");
    circleIcon.className = "fas fa-volume-up";
    voiceStatusText.textContent = "🎤 Speaking...";

    utter.onend = () => {
      isSpeaking = false;
      // Remove speaking animation and reset icon
      micCircle.classList.remove("speaking");
      circleIcon.className = "fas fa-microphone";
      voiceStatusText.textContent = "👂 Ready to listen";
    };

    synthesis.speak(utter);
  }

  function speakBack(text) {
    voiceResponseContainer.classList.remove("hidden");
    voiceResponse.innerHTML = `<p>${text}</p>`;

    setTimeout(() => {
      speak(text);
    }, 500);
  }

  // ---------- 🔄 API Call Handler ----------
  async function queryAPI(userInput) {
    try {
      voiceStatusText.textContent = "Thinking...";

      const data = await voiceAssistant({ question: userInput });

      if (data.error) {
        throw new Error(data.message);
      }

      const answer = data.answer || data.response || "No response received";

      voiceStatusText.textContent = "Tap to speak";
      speakBack(answer);
    } catch (error) {
      console.error("API Error:", error);
      voiceStatusText.textContent = "Tap to speak";
      speakBack("Sorry, I couldn't reach the server. Please try again.");
    }
  }

  // ---------- 🤖 Command Handler ----------
  function handleCommand(userInput) {
    voiceResponseContainer.classList.remove("hidden");
    queryAPI(userInput);
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
    voiceAssistantElement.classList.add("hidden");
    chatFab.style.display = "";
  });

  // Initialize speech recognition
  initRecognition();

  // Initialize the preferred Indian female voice
  if (synthesis.getVoices().length > 0) {
    initPreferredVoice();
  }
  // Handle async voice loading for browsers that load voices asynchronously
  synthesis.onvoiceschanged = initPreferredVoice;
}
