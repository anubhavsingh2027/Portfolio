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

  // Show mode selection modal when chat button is clicked
  chatFab.addEventListener("click", (e) => {
    e.preventDefault();
    modeModal.classList.add("active");
  });

  // Chat Mode selected
  if (chatModeBtn) {
    chatModeBtn.addEventListener("click", () => {
      modeModal.classList.remove("active");
      if (chatbot) {
        chatbot.classList.remove("hidden");
      }
    });
  }

  // Voice Mode selected
  if (voiceModeBtn) {
    voiceModeBtn.addEventListener("click", () => {
      modeModal.classList.remove("active");
      if (voiceAssistant) {
        voiceAssistant.classList.remove("hidden");
      }
    });
  }

  // Close modal when clicking outside
  modeModal.addEventListener("click", (e) => {
    if (e.target === modeModal) {
      modeModal.classList.remove("active");
    }
  });
}

function initVoiceAssistant() {
  const voiceClose = document.getElementById("voiceClose");
  const voiceAssistant = document.getElementById("voiceAssistant");
  const micCircle = document.getElementById("micCircle");
  const voiceStatusText = document.getElementById("voiceStatusText");
  const voiceTranscript = document.getElementById("voiceTranscript");
  const voiceResponse = document.getElementById("voiceResponse");
  const voiceResponseContainer = document.getElementById(
    "voiceResponseContainer"
  );

  if (!voiceAssistant) return;

  // Check for browser support
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechSynthesis = window.speechSynthesis;

  if (!SpeechRecognition) {
    console.warn("Speech Recognition not supported in this browser");
    return;
  }

  let recognition = null;
  let isListening = false;
  let synthesis = SpeechSynthesis;

  // Initialize recognition
  function initRecognition() {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      isListening = true;
      micCircle.classList.add("active");
      voiceStatusText.textContent = "Listening...";
      voiceTranscript.innerHTML =
        '<p class="transcript-placeholder">Speak now...</p>';
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      if (interimTranscript) {
        voiceTranscript.innerHTML = `<p>${interimTranscript}</p>`;
      }

      if (finalTranscript) {
        voiceTranscript.innerHTML = `<p>${finalTranscript}</p>`;
        processVoiceCommand(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      voiceStatusText.textContent = "Error: " + event.error;
      stopListening();
    };

    recognition.onend = () => {
      if (isListening) {
        // Restart if still in listening mode
        try {
          recognition.start();
        } catch (e) {
          console.error("Failed to restart recognition:", e);
        }
      }
    };
  }

  function startListening() {
    if (!recognition) {
      initRecognition();
    }
    try {
      recognition.start();
    } catch (e) {
      console.error("Recognition start error:", e);
    }
  }

  function stopListening() {
    isListening = false;
    micCircle.classList.remove("active");
    voiceStatusText.textContent = "Tap to speak";
    if (recognition) {
      recognition.stop();
    }
  }

  function processVoiceCommand(command) {
    // Show typing indicator
    voiceResponseContainer.classList.remove("hidden");
    voiceResponse.innerHTML =
      '<div class="typing-indicator"><span></span><span></span><span></span></div>';

    // Get bot response (reuse the same logic from chatbot)
    setTimeout(() => {
      const response =
        typeof getBotResponse === "function"
          ? getBotResponse(command)
          : getVoiceResponse(command);

      // Strip HTML tags for speech
      const textResponse = response.replace(/<[^>]*>/g, "");

      voiceResponse.innerHTML = `<p>${response}</p>`;

      // Speak the response
      speakResponse(textResponse);
    }, 1000);
  }

  function speakResponse(text) {
    // Cancel any ongoing speech
    synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Set voice properties for a soft, friendly female voice
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;

    // Try to find a female voice
    const voices = synthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("samantha") ||
        voice.name.toLowerCase().includes("google us english")
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = () => {
      voiceStatusText.textContent = "Listening...";
    };

    synthesis.speak(utterance);
  }

  function getVoiceResponse(command) {
    const cmd = command.toLowerCase().trim();

    // Helper function for better matching
    const matchesAny = (text, keywords) => {
      return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
    };

    // Check if command wants to open/redirect
    const wantsToOpen =
      cmd.includes("open") ||
      cmd.includes("live") ||
      cmd.includes("show") ||
      cmd.includes("redirect");

    if (cmd.includes("hello") || cmd.includes("hi") || cmd.includes("hey")) {
      return "Hello! I'm Anubhav's voice assistant. How can I help you today?";
    }

    if (cmd.includes("name") || cmd.includes("who are you")) {
      return "I'm the voice assistant for Anubhav Singh's portfolio. You can ask me about his projects, skills, or contact information.";
    }

    // PhishShield Project - Enhanced matching
    if (
      matchesAny(cmd, [
        "phish",
        "shield",
        "phishing",
        "security",
        "fish",
        "phishshield",
      ])
    ) {
      if (wantsToOpen) {
        setTimeout(
          () => window.open("https://phishshield.nav-code.com/", "_blank"),
          100
        );
      }
      return "PhishShield is a cybersecurity platform with real-time phishing detection using advanced URL scanning and blacklisted domain checks. It includes secure authentication, user dashboard, and automated threat analysis. Built with HTML, Tailwind CSS, JavaScript, Node.js, Express, and MongoDB. Would you like me to open the live project for you?";
    }

    // Kashi Route Project - Enhanced matching with ANY keyword
    if (
      matchesAny(cmd, [
        "kashi",
        "route",
        "kashiroute",
        "kasi",
        "she",
        "varanasi",
        "tourism",
        "travel",
        "tour",
        "kashi route",
      ])
    ) {
      if (wantsToOpen) {
        setTimeout(
          () => window.open("https://kashiroute.nav-code.com/", "_blank"),
          100
        );
      }
      return "Kashi Route is a tourism and travel platform for Varanasi offering car rentals, guided tours, heritage highlights, and seamless navigation support. Built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB. It provides a complete booking experience for travelers. Would you like me to open the live website?";
    }

    // Airbnb Clone Project - Enhanced matching with ANY keyword
    if (
      matchesAny(cmd, ["airbnb", "air bnb", "rental", "accommodation", "bnb"])
    ) {
      if (wantsToOpen) {
        setTimeout(
          () =>
            window.open("https://airbnb-clone-1u1y.onrender.com/", "_blank"),
          100
        );
      }
      return "Airbnb Clone is a full-stack rental booking web application featuring property listings, authentication, reviews, booking workflows, and responsive UI. Built with React, Node.js, Express, and MongoDB. It replicates core Airbnb features with modern architecture. Would you like me to open the live application?";
    }

    // Real-Time Chatting Project - Enhanced matching with ANY keyword
    if (
      matchesAny(cmd, [
        "chatting",
        "real time",
        "realtime",
        "websocket",
        "messenger",
        "messaging",
        "real-time",
      ])
    ) {
      if (wantsToOpen) {
        setTimeout(
          () =>
            window.open("https://real-time-chatting.nav-code.com/", "_blank"),
          100
        );
      }
      return "Real-Time Chatting App is a WebSocket-powered platform with secure authentication, active user presence, and instant message delivery. Built with WebSocket, Node.js, Express, MongoDB, HTML, CSS, and JavaScript. It features clean UI and room-based messaging. Would you like me to open the live chat application?";
    }

    // Portfolio Project - Skip if asking about general portfolio/projects
    if (
      (matchesAny(cmd, [
        "this site",
        "your website",
        "your portfolio",
        "this portfolio",
      ]) ||
        (cmd.includes("portfolio") && !cmd.includes("project"))) &&
      !cmd.includes("all project") &&
      !cmd.includes("your project")
    ) {
      if (wantsToOpen) {
        setTimeout(
          () => window.open("https://anubhav.nav-code.com/", "_blank"),
          100
        );
      }
      return "This Portfolio website features an AI chatbot for interactive assistance, fully functional REST API for sending emails, and a sleek user-friendly interface. Built with HTML, CSS, JavaScript, and Canvas animations. It showcases modern web development skills and responsive design. Would you like me to open the live site?";
    }

    // Typing Master Project - Enhanced matching with ANY keyword
    if (
      matchesAny(cmd, [
        "typing master",
        "typemaster",
        "typing test",
        "speed test",
        "wpm",
        "typing speed",
      ])
    ) {
      if (wantsToOpen) {
        setTimeout(
          () => window.open("https://typingmaster.nav-code.com/", "_blank"),
          100
        );
      }
      return "Typing Master is an interactive typing test platform that tracks typing speed in WPM and accuracy in real-time. Built with JavaScript, it provides instant feedback and detailed results. Perfect for improving typing skills. Would you like me to open the typing test?";
    }

    // Weather App Project - Enhanced matching with ANY keyword
    if (
      matchesAny(cmd, [
        "weather app",
        "weather forecast",
        "weather website",
        "forecast app",
        "climate app",
      ])
    ) {
      if (wantsToOpen) {
        setTimeout(
          () =>
            window.open("https://weather-website-rosy.vercel.app/", "_blank"),
          100
        );
      }
      return "Weather Forecasting App is a responsive application providing real-time forecasts and climate insights using OpenWeather API. Built with JavaScript, it delivers accurate weather information with a clean interface. Would you like me to open the weather app?";
    }

    // AI Tools Directory - Enhanced matching with ANY keyword
    if (
      matchesAny(cmd, [
        "ai tool",
        "ai tools",
        "tools directory",
        "ai directory",
        "artificial intelligence",
      ])
    ) {
      if (wantsToOpen) {
        setTimeout(
          () =>
            window.open(
              "https://ai-tools-directory-seven-jade.vercel.app/",
              "_blank"
            ),
          100
        );
      }
      return "AI Tools Directory features over 600 AI tools with keyword-based search and filter for quick discovery. Built with HTML, CSS, and JavaScript, it helps users find the perfect AI tool for their needs. Would you like me to open the directory?";
    }

    // General project query - Enhanced matching
    if (
      matchesAny(cmd, [
        "all project",
        "your project",
        "what project",
        "show project",
        "list project",
        "what have you built",
        "what did you make",
      ])
    ) {
      if (
        cmd.includes("more") ||
        cmd.includes("github") ||
        cmd.includes("all")
      ) {
        setTimeout(
          () => window.open("https://github.com/anubhavsingh2027", "_blank"),
          100
        );
      }
      return "Anubhav has built several amazing projects: PhishShield for cybersecurity, Kashi Route for tourism, Airbnb Clone for bookings, Real-Time Chat app, Portfolio website, Typing Master, Weather App, and AI Tools Directory. Would you like to hear details about any specific project? Or should I open his GitHub to see all projects?";
    }

    // GitHub redirect - Enhanced matching
    if (
      matchesAny(cmd, [
        "github",
        "git hub",
        "more project",
        "more projects",
        "see all",
        "show all",
      ])
    ) {
      window.open("https://github.com/anubhavsingh2027", "_blank");
      return "Opening Anubhav's GitHub profile where you can explore all his projects and contributions!";
    }

    // Skills - Enhanced matching
    if (
      matchesAny(cmd, [
        "skill",
        "skills",
        "technology",
        "technologies",
        "tech stack",
        "what do you know",
        "what can you do",
      ])
    ) {
      return "Anubhav is skilled in full-stack development. Frontend: HTML, CSS, JavaScript, React, Tailwind CSS. Backend: Node.js, Express. Databases: MongoDB, MySQL. Programming: C++, Java, Python, C. Tools: VS Code, Git, GitHub.";
    }

    // Contact - Enhanced matching
    if (
      matchesAny(cmd, [
        "contact",
        "email",
        "phone",
        "reach",
        "call",
        "message",
        "get in touch",
      ])
    ) {
      return "You can reach Anubhav at anubhavsingh2027@gmail.com or call him at 7355026966. He typically responds within 24 hours.";
    }

    // About Anubhav - Enhanced matching
    if (
      matchesAny(cmd, [
        "about",
        "who is",
        "who's",
        "tell me about",
        "about anubhav",
        "about him",
      ])
    ) {
      return "Anubhav Singh is a 20-year-old Full Stack Developer from Varanasi, India. He's pursuing Computer Science with AI specialization. He has solved 500 plus LeetCode problems, achieved 5-Star rating in C++ on HackerRank, and built over 15 full-stack applications.";
    }

    // Exit - Enhanced matching
    if (
      matchesAny(cmd, [
        "stop",
        "close",
        "exit",
        "bye",
        "goodbye",
        "quit",
        "end",
      ])
    ) {
      stopListening();
      voiceAssistant.classList.add("hidden");
      return "Goodbye! Feel free to come back anytime.";
    }

    return "I can help you with information about Anubhav's projects, skills, education, and contact details. You can ask me about specific projects like PhishShield, Kashi Route, or Airbnb Clone. What would you like to know?";
  }

  // Mic circle click handler
  if (micCircle) {
    micCircle.addEventListener("click", () => {
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    });
  }

  // Close button
  if (voiceClose) {
    voiceClose.addEventListener("click", () => {
      stopListening();
      voiceAssistant.classList.add("hidden");
      synthesis.cancel();
    });
  }

  // Load voices when they're ready
  if (synthesis.onvoiceschanged !== undefined) {
    synthesis.onvoiceschanged = () => {
      synthesis.getVoices();
    };
  }
}
