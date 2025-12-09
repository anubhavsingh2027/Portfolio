// ===== MODE SELECTION AND VOICE ASSISTANT =====

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
        handleCommand(finalTranscript.trim());
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
  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.toLowerCase().trim();
    voiceResponseContainer.classList.remove("hidden");

    // 🛑 Stop Speaking Voice Command
    if (["stop speaking", "stop voice", "mute", "be quiet"].some(w => cmd.includes(w))) {
      synthesis.cancel();
      isSpeaking = false;
      return speakBack("Okay, I stopped speaking.");
    }

    // Section Navigation
    const sectionMap = {
      home: ["go to home", "go to main page"],
      about: ["go to about", "about me"],
      skills: ["skills", "tech stack"],
      projects: ["projects", "show projects"],
      services: ["services"],
      contact: ["contact", "reach you"]
    };

    for (let section in sectionMap) {
      if (sectionMap[section].some(keyword => cmd.includes(keyword))) {
        if (scrollToSection(section)) {
          return speakBack(`Taking you to the ${section} section.`);
        }
        return speakBack(`I couldn't find the ${section} section.`);
      }
    }

   // ----------------- 📌 PROJECT DATABASE -----------------
const projects = [
  {
    keywords: ["phish", "phishing", "phishshield"],
    url: "https://phishshield.nav-code.com/",
    desc: "PhishShield detects phishing attacks in real time."
  },
  {
    keywords: ["kashi", "route", "varanasi", "tour"],
    url: "https://kashiroute.nav-code.com/",
    desc: "Kashi Route helps tourists explore Varanasi."
  },
  {
    keywords: ["airbnb", "bnb", "rental"],
    url: "https://airbnb-clone-1u1y.onrender.com/",
    desc: "The Airbnb Clone allows property renting and bookings."
  },
  {
    keywords: ["chat", "real time", "websocket"],
    url: "https://real-time-chatting.nav-code.com/",
    desc: "The Real-Time Chat App supports instant messaging."
  },
  {
    keywords: ["typing", "speed", "wpm"],
    url: "https://typingmaster.nav-code.com/",
    desc: "Typing Master helps improve typing accuracy and speed."
  },
  {
    keywords: ["weather", "climate", "forecast"],
    url: "https://weather-website-rosy.vercel.app/",
    desc: "The Weather App gives accurate live weather information."
  },
  {
    keywords: ["ai tool", "directory", "ai tools"],
    url: "https://ai-tools-directory-seven-jade.vercel.app/",
    desc: "The AI Tools Directory lists over 600 AI tools."
  }
];


// ----------------- 🤖 PROJECT HANDLING LOGIC -----------------

// If the user previously asked and now says OPEN:
if (
  lastProjectURL &&
  ["open", "yes", "sure", "okay", "ok", "go ahead"].some(w => cmd.includes(w))
) {
  window.open(lastProjectURL, "_blank");
  return speakBack("Opening it now.");
}

// Match user project request
for (let project of projects) {
  if (project.keywords.some(keyword => cmd.includes(keyword))) {
    lastProjectURL = project.url;
    return speakBack(`${project.desc}. Would you like me to open it?`);
  }
}


// ----------------- 💬 GENERAL RESPONSES -----------------

if (cmd.includes("skill")) {
  return speakBack(
    "Anubhav is skilled in JavaScript, React, Node.js, Express, MongoDB, C++, Python, and full-stack development."
  );
}

if (["project","projects"].some(w => cmd.includes(w))) {
  return speakBack(
    "Anubhav Singh has developed several projects, and here are some of them in order. The Real-Time Chat Application is a live messaging platform built using WebSockets, allowing users to communicate instantly with smooth message delivery. Kashi Route is a helpful travel platform for Varanasi that guides users through temples, ghats, and key destinations. PhishShield is a machine learning based phishing detection system that analyzes suspicious website links and identifies whether they are safe or harmful. Typing Master is a typing improvement tool that helps users test and enhance their typing speed and accuracy. The Airbnb Clone is a rental booking platform where users can list, search, and reserve properties with login and reservation support. If you want, I can explain any one of these projects in full detail — just tell me the name."
  );
}
if(["education", "college", "study", "university", "degree", "school"].some(w => cmd.includes(w))){
  return speakBack("Anubhav is pursuing a Bachelor of Technology in Computer Science and Engineering with Artificial Intelligence specialization from PSIT Kanpur, Batch 2027. His academic focus includes advanced algorithms, machine learning, and full-stack development methodologies.")
}
if (cmd.includes("who is") || cmd.includes("about")) {
  return speakBack(
    "Anubhav Singh is a full-stack developer from Varanasi with over 15 major projects."
  );
}
if (["leetcode", "lead code","leet", "coding profile"].some(w => cmd.includes(w))) {
  window.open("https://leetcode.com/u/anubhav_singh_6966/", "_blank");
  return speakBack("Opening your LeetCode profile.");
}

if (["github", "git", "repo"].some(w => cmd.includes(w))) {
  window.open("https://github.com/anubhavsingh2027", "_blank");
  return speakBack("Opening GitHub repositories.");
}

if (["linkedin", "profile", "professional profile"].some(w => cmd.includes(w))) {
  window.open("https://www.linkedin.com/in/anubhav-singh-09b71829b/", "_blank");
  return speakBack("Opening LinkedIn profile.");
}



if (cmd.includes("contact")) {
  return speakBack(
    "You can contact Anubhav at anubhavsingh2027@gmail.com or call 7355026966."
  );
}


// ----------------- ❌ CLOSE VOICE ASSISTANT -----------------
if (["stop", "close", "exit", "bye"].some(w => cmd.includes(w))) {
  speakBack("Goodbye!");
  stopListening();
  voiceAssistant.classList.add("hidden");
  return;
}


// ----------------- 🔄 FALLBACK RESPONSE -----------------
speakBack(
  "I can help you navigate sections or open projects. Try saying: 'Go to projects' or 'Show me skills'."
);

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
