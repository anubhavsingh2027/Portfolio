// NAV-JARVIS Bot Response Function
// This is the updated getBotResponse function for app.js

function getBotResponse(message) {
  const msg = message.toLowerCase().trim();

  // Helper function for keyword matching
  const matchesAny = (text, keywords) => {
    return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
  };

  // Greeting responses
  if (matchesAny(msg, ["hello", "hi", "hey", "greetings", "welcome"])) {
    return "Certainly. I am NAV-JARVIS, Anubhav Singh's personal portfolio assistant. How may I assist you today?";
  }

  // Identity
  if (matchesAny(msg, ["who are you", "your name", "identity", "who"])) {
    return "I am NAV-JARVIS. I was created by Anubhav Singh to serve as his personal portfolio assistant and provide information about his professional profile.";
  }

  // Profile/About
  if (matchesAny(msg, ["anubhav", "about", "who is", "profile", "background"])) {
    return "Anubhav Singh is a distinguished Full Stack Developer and AI Enthusiast based in Varanasi, India. Currently pursuing B.Tech in Computer Science with AI specialization from PSIT Kanpur (Expected: 2027). <br><br><strong>Key Achievements:</strong> 600+ LeetCode problems solved, 5-star rating in C++ on HackerRank, 15+ full-stack applications deployed. His expertise spans MERN stack development, real-time systems, and modern UI/UX design.";
  }

  // Education
  if (matchesAny(msg, ["education", "college", "study", "university", "degree", "school"])) {
    return "Anubhav is pursuing a Bachelor of Technology in Computer Science and Engineering with Artificial Intelligence specialization from PSIT Kanpur, Batch 2027. His academic focus includes advanced algorithms, machine learning, and full-stack development methodologies.";
  }

  // Skills - Comprehensive
  if (matchesAny(msg, ["skill", "skills", "expertise", "technology", "technologies", "what can you do"])) {
    return "<strong>Technical Stack:</strong><br><strong>Frontend:</strong> HTML5, CSS3, JavaScript, React, Tailwind CSS<br><strong>Backend:</strong> Node.js, Express.js, WebSocket<br><strong>Databases:</strong> MongoDB, Firebase<br><strong>Programming Languages:</strong> C++, Java, Python, JavaScript<br><strong>Specializations:</strong> Full-stack MERN development, Data Structures &amp; Algorithms, Real-time systems, JWT Authentication, REST APIs, UI/UX Animations";
  }

  // Programming Languages
  if (matchesAny(msg, ["c++", "cpp", "java", "python", "programming language"])) {
    return "Anubhav demonstrates advanced proficiency in:<br>• <strong>C++</strong>: 5-star HackerRank rating, 600+ problems solved<br>• <strong>Java</strong>: Object-oriented design and backend development<br>• <strong>Python</strong>: Data science and automation scripts<br>• <strong>JavaScript</strong>: Full-stack web development with modern ES6+ standards";
  }

  // LeetCode
  if (matchesAny(msg, ["leetcode", "600", "problems", "dsa", "algorithms"])) {
    return "Anubhav has solved <strong>600+ problems on LeetCode</strong>, demonstrating mastery across all difficulty levels. His solutions showcase proficiency in Data Structures, Algorithms, Dynamic Programming, and optimization techniques. His consistent practice reflects a deep commitment to computational excellence.";
  }

  // HackerRank
  if (matchesAny(msg, ["hackerrank", "5 star", "rating", "5-star"])) {
    return "Anubhav maintains a <strong>5-star rating in C++ on HackerRank</strong>, validating his advanced expertise in the language, competitive programming, and problem-solving capabilities. This achievement reflects his commitment to technical excellence.";
  }

  // Projects - Overview
  if (matchesAny(msg, ["project", "projects", "what have you built", "portfolio"])) {
    return "<strong>Featured Projects:</strong><br>• <strong>Real-Time Chatting App</strong> - WebSocket communication system<br>• <strong>PhishShield</strong> - ML-based phishing detection platform<br>• <strong>This Portfolio</strong> - Interactive showcase with NAV-JARVIS assistant<br><br>I can provide detailed information about any project. Which would interest you?";
  }

  // Real-Time Chatting
  if (matchesAny(msg, ["chatting", "chat app", "websocket", "real-time", "messenger"])) {
    return "<strong>Real-Time Chatting Application</strong><br><br>A comprehensive WebSocket-powered messaging system featuring:<br>• Instant message delivery with live user presence<br>• JWT-based secure authentication<br>• Room-based messaging architecture<br>• Modern, responsive user interface<br><br><strong>Technologies:</strong> WebSocket, Node.js, Express.js, MongoDB, HTML, CSS, JavaScript";
  }

  // PhishShield
  if (matchesAny(msg, ["phishshield", "phishing", "security", "threat", "detection"])) {
    return "<strong>PhishShield - Intelligent Phishing Detection</strong><br><br>An advanced cybersecurity platform employing machine learning to detect fraudulent URLs and phishing threats:<br>• URL pattern analysis and behavioral feature detection<br>• Secure JWT-based user authentication<br>• Interactive security dashboard<br>• Automated threat analysis engine<br><br><strong>Technologies:</strong> HTML, Tailwind CSS, JavaScript, Node.js, Express.js, MongoDB";
  }

  // This Portfolio Website
  if (matchesAny(msg, ["this site", "this website", "portfolio website", "my portfolio"])) {
    return "<strong>Portfolio Website</strong><br><br>This interactive platform showcases Anubhav's professional capabilities through:<br>• Smooth GSAP animations and canvas-based network effects<br>• NAV-JARVIS intelligent assistant (myself)<br>• Fully functional REST API for direct communication<br>• Responsive, modern design demonstrating web development expertise<br><br>Built with HTML, CSS, JavaScript, and advanced animation libraries.";
  }

  // Contact Information
  if (matchesAny(msg, ["contact", "email", "phone", "reach", "call", "message", "how to contact"])) {
    return "<strong>Contact Information:</strong><br><br>📧 <strong>Email:</strong> anubhavsingh2027@gmail.com<br>📱 <strong>Phone/WhatsApp:</strong> 7355026966<br><br>Response time: Typically within 24 hours. Anubhav welcomes inquiries regarding opportunities and professional collaborations.";
  }

  // Direct Contact Number
  if (matchesAny(msg, ["number", "mobile", "whatsapp", "direct"])) {
    return "You can reach Anubhav directly at: <strong>7355026966</strong> via phone or WhatsApp.";
  }

  // GitHub
  if (matchesAny(msg, ["github", "repository", "repositories", "code", "source code"])) {
    return "Anubhav's GitHub profile: <strong>anubhavsingh2027</strong><br><br>His repositories contain comprehensive implementations of projects, algorithms, and open-source contributions. You can explore his complete portfolio at: <a href='https://github.com/anubhavsingh2027' target='_blank' style='color: #0066cc;'>github.com/anubhavsingh2027</a>";
  }

  // Social Media
  if (matchesAny(msg, ["linkedin", "twitter", "instagram", "social", "social media"])) {
    return "<strong>Professional Presence:</strong><br>• LinkedIn - Professional network and endorsements<br>• Twitter - Tech insights and updates<br>• Instagram - Personal and professional content<br><br>These platforms provide additional context into Anubhav's professional journey and expertise.";
  }

  // Creator Question
  if (matchesAny(msg, ["who created you", "who made you", "creator", "developed"])) {
    return "I am created by Anubhav Singh.";
  }

  // Services/Hire
  if (matchesAny(msg, ["hire", "service", "freelance", "work", "collaborate", "opportunity"])) {
    return "<strong>Services &amp; Collaboration:</strong><br>• Full-Stack Web Development<br>• Backend Architecture &amp; Optimization<br>• Algorithm Problem Solving<br>• UI/UX Implementation<br><br>For project inquiries and collaborations, contact: anubhavsingh2027@gmail.com";
  }

  // General fallback
  return "I can assist with inquiries regarding Anubhav's professional profile, technical expertise, projects, education, skills, and contact information. Please ask me about any specific topic of interest.";
}
