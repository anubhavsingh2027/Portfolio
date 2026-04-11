import React, { useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import ProjectCard from "../components/ProjectCard";

const projectsData = [
  {
    id: 1,
    title: "Real Time Chatting",
    description:
      "A scalable real-time chat application with modern React frontend (animations) and production-grade backend (Redis caching, load balancing). Enables instant messaging with WebSockets for seamless live updates. Cloud deployed with optimized performance.",
    image: "/assets/images/Real-time-chatting.png",
    technologies: [
      "React",
      "JavaScript",
      "MongoDB",
      "Express",
      "WebSocket",
      "Redis",
      "Cloud Deployment",
    ],
    liveLink: "https://real-time-chatting.nav-code.com/",
    codeLink: "https://github.com/anubhavsingh2027/Real-Time-Chatting",
    category: "mern",
    features: [
      "Real-Time Chat with WebSockets",
      "Redis-Cached Chat History",
      "Customizable User Profiles",
      "Scalable Backend Architecture",
      "Cloud Deployment Ready",
    ],
    completion: 100,
  },
  {
    id: 2,
    title: "PhishShield",
    description:
      "A phishing detection platform using advanced URL-scanning APIs for real-time threat analysis. Features secure user authentication and cloud deployment with reliable security infrastructure. Provides comprehensive security reports and threat analysis.",
    image: "/assets/images/Phishshield.png",
    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Express",
      "Cloud Security",
    ],
    liveLink: "https://phishshield.nav-code.com/",
    codeLink: "https://github.com/anubhavsingh2027/Phishsheild",
    category: "mern",
    features: [
      "Real-time Threat Detection",
      "Secure Authentication",
      "URL Scanning APIs",
      "Security Reports",
      "Cloud Deployed",
    ],
    completion: 100,
  },
  {
    id: 3,
    title: "Kashi Route",
    description:
      "A responsive booking website for Varanasi tours with seamless tour and travel bookings. Built with modern frontend stack and scalable backend. Cloud deployed with fast response times and optimized database queries.",
    image: "/assets/images/kashiRoute.png",
    technologies: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Express",
      "Cloud Hosting",
    ],
    liveLink: "https://kashiroute.nav-code.com/",
    codeLink: "https://github.com/anubhavsingh2027/KashiRoute",
    category: "fullStack",
    features: [
      "Seamless Booking Service",
      "Fast Response Times",
      "Complete Service Information",
      "Multiple Tour Packages",
      "Cloud Deployed",
    ],
    completion: 100,
  },
  {
    id: 4,
    title: "Advanced Portfolio",
    description:
      "Advanced portfolio featuring AI-powered voice & text chatbot, REST API email service, and modern animated UI. Cloud deployed with light/dark mode support, smooth animations, and fully responsive design for all devices.",
    image: "/assets/images/websiteImg.png",
    technologies: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB",
      "AI Chatbot",
      "Voice & Chat",
      "Cloud Deployment",
    ],
    liveLink: "https://anubhav.nav-code.com/",
    codeLink: "https://github.com/anubhavsingh2027/Portfolio",
    category: "mern",
    features: [
      "AI Voice & Text Chatbot",
      "Interactive Animations",
      "Light/Dark Mode",
      "Cloud Deployed",
      "Performance Optimized",
      "Modern UI",
      "Backend API Integration",
    ],
    completion: 100,
  },
  {
    id: 5,
    title: "Airbnb Clone",
    description:
      "Secure authentication, property listings with photos, advanced search & filter, complete booking system with reviews. Cloud deployed with scalable backend and optimized performance.",
    image: "/assets/images/Airbnb.png",
    technologies: [
      "HTML5",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Express",
      "Cloud Deployment",
    ],
    liveLink: "https://airbnb-clone-1u1y.onrender.com/",
    codeLink: "https://github.com/anubhavsingh2027/Airbnb-Clone",
    category: "fullStack",
    features: [
      "User & Admin Panels",
      "Property Listings",
      "Advanced Search",
      "Booking System",
      "Cloud Deployed",
    ],
    completion: 95,
  },
  {
    id: 6,
    title: "TypingMaster",
    description:
      "A typing test platform designed to improve typing speed and accuracy with real-time performance tracking. Features a clean, distraction-free interface with detailed analytics. Cloud deployed on Vercel for fast, reliable access.",
    image: "/assets/images/typeMaster.png",
    technologies: ["React", "CSS3", "JavaScript", "Vercel"],
    liveLink: "https://typing-master-eta.vercel.app/",
    codeLink: "https://github.com/anubhavsingh2027/TypingMaster",
    category: "frontend",
    features: [
      "Real-Time Performance Tracking",
      "WPM & Accuracy Metrics",
      "Detailed Analytics",
      "Cloud Deployed",
      "Fast Load Times",
    ],
    completion: 90,
  },
];

function Projects() {
  const [ref, isVisible] = useIntersectionObserver();
  const [selectedFilter, setSelectedFilter] = useState("*");

  const filters = [
    { label: "All Projects", value: "*", count: projectsData.length },

    {
      label: "MERN Stack",
      value: "mern",
      count: projectsData.filter((p) => p.category === "mern").length,
    },
    {
      label: "Full Stack",
      value: "fullStack",
      count: projectsData.filter((p) => p.category === "fullStack").length,
    },
    {
      label: "Frontend",
      value: "frontend",
      count: projectsData.filter((p) => p.category === "frontend").length,
    },
  ];

  const filteredProjects =
    selectedFilter === "*"
      ? projectsData
      : projectsData.filter((project) => project.category === selectedFilter);

  return (
    <section
      ref={ref}
      id="projects"
      className="min-h-screen flex items-center py-20 px-4 md:px-6 bg-gradient-to-b from-dark-bg to-dark-secondary"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-6 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                selectedFilter === filter.value
                  ? "bg-gradient-primary text-white shadow-lg"
                  : "bg-dark-secondary text-gray-800 hover:text-gray-900 hover:bg-dark-tertiary"
              }`}
            >
              <span>{filter.label}</span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded">
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {isVisible && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                liveLink={project.liveLink}
                codeLink={project.codeLink}
                features={project.features}
                completion={project.completion}
              />
            ))}
          </div>
        )}

        {/* More Projects Link */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            More Projects
          </h3>
          <a
            href="https://github.com/anubhavsingh2027"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-gradient-primary text-white font-bold rounded-lg hover:shadow-lg transition"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
