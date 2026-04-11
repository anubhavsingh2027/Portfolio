export const myDB = `
{
  "personalInfo": {
    "name": "Anubhav Singh",
    "title": "Full Stack Developer | MERN Specialist | AI Enthusiast",
    "tagline": "Crafting innovative digital solutions with cutting-edge technology and creative design",
    "location": "Varanasi, India",
    "experienceYears": 3,
    "projectsCompleted": 20,
    "problemsSolvedInLeetcode": 700,
    "availability": "Available for Projects",
    "DOB": "05 June 2005",
    "currentAge": "20 years"
  },

  "about": {
    "summary": "I am a passionate Full Stack Developer specializing in MERN stack and AI-driven applications. I focus on building scalable, clean, and high-performance web solutions that provide real-world value.",
    "highlights": [
      "15+ full-stack projects deployed",
      "700+ coding problems solved",
      "5-Star C++ rating on HackerRank",
      "Strong frontend & backend expertise",
      "Focus on scalability, performance, and clean code"
    ]
  },

  "education": [
    {
      "degree": "Bachelor of Technology (B.Tech)",
      "field": "Computer Science and Engineering",
      "specialization": "Artificial Intelligence",
      "institution": "Pranveer Singh Institute of Technology (PSIT)",
      "university": "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
      "location": "Kanpur, Uttar Pradesh, India",
      "status": "Currently Pursuing",
      "expectedCompletionYear": 2027,
      "lastSemesterCGPA": 7.8
    },
    {
      "degree": "Intermediate (12th)",
      "stream": "pcm",
      "board": "CBSE",
      "institution": "Varanasi Public School",
      "location": "Varanasi, Uttar Pradesh, India",
      "status": "Completed"
    }
  ],

  "skills": {
    "frontend": ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
    "backend": ["Node.js", "Express.js", "REST APIs"],
    "database": ["MongoDB", "MySQL", "Mongoose"],
    "languages": ["C", "C++", "Java", "Python", "JavaScript"],
    "tools": ["Git", "GitHub", "Docker", "Postman", "VS Code", "npm/yarn"],
    "cloud": ["AWS", "Vercel", "Render", "Railway", "Netlify", "MongoDB Atlas"]
  },

  "projects": [
    {
      "name": "Real Time Chatting",
      "category": ["Full Stack", "Real-Time", "MERN"],
      "description": "A real-time chat application using WebSockets with instant messaging and live updates. Features Redis caching for optimized performance.",
      "techStack": ["React", "JavaScript", "MongoDB", "Express", "WebSocket", "Redis", "Node.js"],
      "features": [
        "Real-time messaging",
        "Redis-cached chat history",
        "Custom user profiles",
        "Responsive UI",
        "Scalable backend"
      ],
      "problemFaced": "Connection establishment between users via WebSocket, handling concurrent connections",
      "status": "100% Complete",
      "liveUrl": "https://real-time-chatting.nav-code.com/",
      "sourceCode": "https://github.com/anubhavsingh2027/Real-Time-Chatting"
    },
    {
      "name": "PhishShield",
      "category": ["Cyber Security", "MERN"],
      "description": "A phishing detection platform using real-time URL scanning APIs for threat analysis.",
      "techStack": ["React", "JavaScript", "Node.js", "MongoDB", "Express"],
      "features": [
        "Real-time phishing detection",
        "User authentication",
        "Report download",
        "Secure system",
        "Advanced threat analysis"
      ],
      "problemFaced": "Pagination implementation, answer preparation and validation",
      "status": "100% Complete",
      "liveUrl": "https://phishshield.nav-code.com/",
      "sourceCode": "https://github.com/anubhavsingh2027/Phishsheild"
    },
    {
      "name": "Kashi Route",
      "category": ["Full Stack", "Booking Platform"],
      "description": "A responsive travel and tour booking website for Varanasi with seamless service bookings.",
      "techStack": ["React", "Tailwind CSS", "JavaScript", "Node.js", "MongoDB", "Express"],
      "features": [
        "Service booking",
        "Multiple services",
        "Fast response time",
        "Fully responsive",
        "Pagination system"
      ],
      "problemFaced": "Pagination of history, creating different pages, implementing different routing logic",
      "status": "100% Complete",
      "liveUrl": "https://kashiroute.nav-code.com/",
      "sourceCode": "https://github.com/anubhavsingh2027/KashiRoute"
    },
    {
      "name": "Advanced Portfolio",
      "category": ["Full Stack", "MERN", "AI-Powered"],
      "description": "Personal portfolio with AI-powered voice & text chatbot, REST API email service, and modern animated UI.",
      "techStack": ["React", "Tailwind CSS", "JavaScript", "Node.js", "Express", "MongoDB", "AI Chatbot"],
      "features": [
        "AI voice & text chatbot",
        "Email integration via REST API",
        "Modern UI with animations",
        "Light/Dark mode",
        "Performance optimized"
      ],
      "problemFaced": "UI animations and chatbot integration, voice recognition handling",
      "status": "100% Complete",
      "liveUrl": "https://anubhav.nav-code.com/",
      "sourceCode": "https://github.com/anubhavsingh2027/Portfolio"
    },
    {
      "name": "Airbnb Clone",
      "category": ["Full Stack"],
      "description": "A full-stack Airbnb clone with authentication, property listings, booking system, reviews, and admin panel.",
      "techStack": ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB", "Express"],
      "features": [
        "User & admin panels",
        "Property listing",
        "Booking system",
        "Search & filters",
        "Review system"
      ],
      "problemFaced": "Booking system workflow, implementing favourite/wishlist logic",
      "status": "95% Complete",
      "liveUrl": "https://airbnb-clone-1u1y.onrender.com/",
      "sourceCode": "https://github.com/anubhavsingh2027/Airbnb-Clone"
    },
    {
      "name": "Type Master",
      "category": ["Frontend"],
      "description": "Typing speed test application with real-time WPM and accuracy tracking.",
      "techStack": ["HTML5", "CSS3", "JavaScript"],
      "features": [
        "Live WPM & accuracy",
        "Error tracking",
        "Performance summary",
        "Minimal UI",
        "Results analytics"
      ],
      "problemFaced": "Data visualization of typing speed graphs in real-time",
      "status": "90% Complete",
      "liveUrl": "https://typing-master-eta.vercel.app/",
      "sourceCode": "https://github.com/anubhavsingh2027/TypingMaster"
    }
  ],

  "services": [
    {
      "name": "Web Development",
      "description": "End-to-end full stack web development.",
      "features": [
        "Responsive design",
        "Modern frameworks",
        "Database integration",
        "API development"
      ]
    },
    {
      "name": "Algorithm Optimization",
      "description": "Performance optimization and clean code solutions.",
      "features": [
        "Performance analysis",
        "Code optimization",
        "Scalable architecture",
        "Best practices"
      ]
    }
  ],

  "contact": {
    "phone": "7355026966",
    "whatsappNo": "7355026966",
    "email": "anubhavsingh2027@gmail.com",
    "whatsappLink": "https://api.whatsapp.com/send?phone=7355026966"
  },

  "socialLinks": {
    "linkedin": "https://www.linkedin.com/in/anubhav-singh-09b71829b/",
    "github": "https://github.com/anubhavsingh2027",
    "twitter": "https://x.com/Anubhav7355",
    "telegram": "https://t.me/Anubhav_singh7355",
    "instagram": "https://instagram.com/anubhav_singh0506",
    "hackerrank": "https://www.hackerrank.com/profile/anubhavsingh2027"
  },
  "moreInformation": {
    "bestProjectCurrently": "Real Time Chatting",
    "moreProjectsLocation": "Visit GitHub for more projects",
    "currentProjectWorking": "DSA Visualization"
  }
}

`;
