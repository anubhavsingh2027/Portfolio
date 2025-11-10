// ===== MODE SELECTION AND VOICE ASSISTANT =====

document.addEventListener("DOMContentLoaded", function () {
  initModeSelection();
  initVoiceAssistant();
});

function initModeSelection() {
  const chatFab = document.getElementById("chatFab");
  const chatbot = document.getElementById("chatbot");

  if (!chatFab) return;

  // Show chatbot when chat button is clicked
  chatFab.addEventListener("click", (e) => {
    e.preventDefault();
    if (chatbot) {
      chatbot.classList.toggle("hidden");
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

    // Helper function for keyword matching
    const matchesAny = (text, keywords) => {
      return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
    };

    // Greeting
    if (matchesAny(cmd, ["hello", "hi", "hey", "greetings"])) {
      return "Certainly. I am NAV-JARVIS, Anubhav Singh's personal portfolio assistant. How may I be of service?";
    }

    // Identity
    if (matchesAny(cmd, ["who are you", "name", "who are", "what are you"])) {
      return "I am NAV-JARVIS. I was created by Anubhav Singh to serve as his personal portfolio assistant.";
    }

    // About Anubhav
    if (matchesAny(cmd, ["about", "who is", "tell me about", "profile", "background"])) {
      return "Anubhav Singh is a highly skilled Full Stack Developer and AI Enthusiast from Varanasi, India. He is pursuing a B.Tech in Computer Science with AI specialization from PSIT Kanpur. His accomplishments include solving over 600 problems on LeetCode and maintaining a 5-star rating in C++ on HackerRank. He has successfully developed and deployed more than 15 full-stack web applications.";
    }

    // Education
    if (matchesAny(cmd, ["education", "study", "college", "university", "degree"])) {
      return "Anubhav is currently pursuing a Bachelor of Technology in Computer Science and Engineering with a specialization in Artificial Intelligence from PSIT Kanpur, with expected graduation in 2027.";
    }

    // Skills - General
    if (matchesAny(cmd, ["skill", "skills", "technology", "technologies", "tech stack", "expertise"])) {
      return "Anubhav's technical strengths encompass: Frontend technologies including HTML5, CSS3, JavaScript, and React with Tailwind CSS. Backend technologies including Node.js and Express.js. Databases including MongoDB and Firebase. Programming languages including C++, Java, and Python. He specializes in full-stack web development using the MERN stack and possesses expertise in real-time systems and modern UI/UX animations.";
    }

    // Core Skills List
    if (matchesAny(cmd, ["what do you know", "what can you do", "capabilities"])) {
      return "I possess comprehensive knowledge of Anubhav's: Programming proficiency in C++, Java, Python, and JavaScript. Web technologies spanning HTML, CSS, React, Node.js, and Express.js. Database expertise with MongoDB and Firebase. Problem-solving abilities demonstrated through Data Structures and Algorithms. Full-stack development capabilities across the MERN stack.";
    }

    // LeetCode
    if (matchesAny(cmd, ["leetcode", "coding problems", "dsa", "algorithms"])) {
      return "Anubhav has solved over 600 problems on LeetCode, demonstrating exceptional proficiency in Data Structures and Algorithms across all difficulty levels. His GitHub profile contains detailed implementations of these solutions.";
    }

    // HackerRank
    if (matchesAny(cmd, ["hackerrank", "5 star", "rating"])) {
      return "Anubhav maintains a 5-star rating in C++ on HackerRank, validating his advanced expertise in the language and problem-solving capabilities.";
    }

    // Projects - General
    if (matchesAny(cmd, ["project", "projects", "work", "portfolio"])) {
      return "Anubhav has developed several significant projects. His primary projects include: Real-Time Chatting Application featuring WebSocket communication. PhishShield, an intelligent phishing detection system using machine learning. This portfolio website with interactive animations and personalized assistance. I can provide detailed information about any specific project if you would like.";
    }

    // Real-Time Chatting
    if (matchesAny(cmd, ["chatting", "chat app", "websocket", "real-time"])) {
      return "The Real-Time Chatting Web Application is a comprehensive messaging system featuring WebSocket-powered communication for instant message delivery. It includes secure JWT-based authentication, active user presence tracking, and a modern user interface built with HTML, CSS, and JavaScript. The architecture employs Node.js and Express.js for the backend, with MongoDB for persistent data storage.";
    }

    // PhishShield
    if (matchesAny(cmd, ["phishshield", "phishing", "security", "detection"])) {
      return "PhishShield is an intelligent cybersecurity platform employing machine learning to detect fraudulent URLs and phishing threats. It analyzes URL patterns and behavioral features to identify suspicious websites. The system includes secure user authentication, an interactive dashboard, and automated threat analysis capabilities. The technology stack comprises HTML, Tailwind CSS, JavaScript, Node.js, Express.js, and MongoDB.";
    }

    // This Portfolio
    if (matchesAny(cmd, ["this site", "this website", "portfolio website"])) {
      return "This portfolio website showcases Anubhav's professional capabilities through a modern, interactive interface. It features smooth animations, a personalized chatbot assistant—myself, NAV-JARVIS—and comprehensive REST API integration for direct communication. The design demonstrates responsive architecture and modern web development practices.";
    }

    // Contact Information
    if (matchesAny(cmd, ["contact", "email", "reach", "phone", "call", "message"])) {
      return "You may reach Anubhav through the following channels: Email: anubhavsingh2027@gmail.com. Phone and WhatsApp: 7355026966. He typically responds to inquiries within 24 hours and welcomes discussions regarding opportunities and collaborations.";
    }

    // GitHub
    if (matchesAny(cmd, ["github", "repository", "repositories", "code", "source"])) {
      return "Anubhav's GitHub profile, anubhavsingh2027, contains comprehensive repositories showcasing his projects and contributions. I can direct you to specific projects on request.";
    }

    // Social Media
    if (matchesAny(cmd, ["linkedin", "twitter", "instagram", "social"])) {
      return "Anubhav maintains a professional presence across multiple platforms. His LinkedIn, Twitter, and Instagram profiles contain additional insights into his work and professional journey.";
    }

    // Creator Question
    if (matchesAny(cmd, ["who created you", "who made you", "creator"])) {
      return "I am created by Anubhav Singh.";
    }

    // Closing
    if (matchesAny(cmd, ["stop", "close", "exit", "bye", "goodbye", "thank you"])) {
      return "Thank you for your inquiry. I remain available should you require further assistance regarding Anubhav's professional profile.";
    }

    // Default response
    return "I can assist you with inquiries regarding Anubhav's professional background, technical expertise, project portfolio, skills, education, and contact information. What specific information would you like to explore?";
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
