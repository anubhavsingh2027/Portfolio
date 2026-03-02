import React, { useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import ProjectCard from "../components/ProjectCard";

const projectsData = [
  {
    id: 1,
    title: "Real Time Chatting",
    description:
      "A real-time chat application that enables instant messaging using WebSockets. It features a clean, responsive interface with smooth live updates.",
    image: "/src/assets/images/Real-time-chatting.png",
    technologies: [
      "HTML5",
      "Tailwind CSS",
      "JavaScript",
      "MongoDB",
      "Express",
      "WebSocket",
    ],
    liveLink: "https://real-time-chatting.nav-code.com/",
    codeLink: "https://github.com/anubhavsingh2027/Real-Time-Chatting",
    category: "mern",
    features: [
      "Real-Time Chat History View",
      "Customizable User Profiles",
      "Viewable Chat History",
      "Personalized User Profiles",
    ],
    completion: 100,
  },
  {
    id: 2,
    title: "Kashi Route",
    description:
      "Kashi Route is a responsive booking website for Varanasi, built with HTML, Tailwind CSS, JS, and Node.js. It offers seamless tour and travel bookings.",
    image: "/src/assets/images/kashiRoute.png",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Express",
    ],
    liveLink: "https://kashiroute.nav-code.com/",
    codeLink: "https://github.com/anubhavsingh2027/KashiRoute",
    category: "mern",
    features: [
      "Book Service",
      "Response time Fast",
      "Complete information",
      "Multiple Service",
      "Responsive Time",
    ],
    completion: 100,
  },
  {
    id: 3,
    title: "PhishShield",
    description:
      "PhishShield is a phishing detection platform that uses URL-scanning APIs for real-time threat analysis. It features user login and authentication powered by MongoDB.",
    image: "/src/assets/images/Phishshield.png",
    technologies: [
      "HTML5",
      "Tailwind CSS",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Express",
    ],
    liveLink: "https://phishshield.nav-code.com/",
    codeLink: "https://github.com/anubhavsingh2027/Phishsheild",
    category: "fullStack",
    features: [
      "Responsive Design",
      "Real-time Security",
      "Login And Registration",
      "Download Report",
    ],
    completion: 100,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "Portfolio website featuring an AI chatbot for interactive assistance, fully functional REST API for sending emails, and a sleek, user-friendly interface.",
    image: "/src/assets/images/websiteImg.png",
    technologies: ["HTML5", "CSS3", "JavaScript", "Canvas", "Rest Api"],
    liveLink: "https://anubhav.nav-code.com/",
    codeLink: "https://github.com/anubhavsingh2027/Portfolio",
    category: "frontend",
    features: [
      "Interactive Animations",
      "Responsive Design",
      "Modern UI",
      "Performance Optimized",
    ],
    completion: 100,
  },
  {
    id: 5,
    title: "Airbnb Clone",
    description:
      "Full-stack Airbnb clone with user and admin panels, featuring authentication, property listings with photos, search & filter, booking system, and reviews.",
    image: "/src/assets/images/Airbnb.png",
    technologies: [
      "HTML5",
      "Tailwind CSS",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Express",
    ],
    liveLink: "https://airbnb-clone-1u1y.onrender.com/",
    codeLink: "https://github.com/anubhavsingh2027/Airbnb-Clone",
    category: "fullStack",
    features: [
      "Responsive Design",
      "User experience",
      "Favourite",
      "Adding Home and Delete",
      "Booking System",
    ],
    completion: 95,
  },
  {
    id: 6,
    title: "Type Master",
    description:
      "TypeMaster is a front-end typing test website designed to improve typing speed and accuracy. Users can track their performance with detailed results shown at the end.",
    image: "/src/assets/images/typeMaster.png",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveLink: "https://typing-master-eta.vercel.app/",
    codeLink: "https://github.com/anubhavsingh2027/TypingMaster",
    category: "frontend",
    features: [
      "Real-Time Typing Speed & Accuracy Updates",
      "Clean and Distraction-Free Interface",
      "Instant WPM, Accuracy & Error Tracking",
      "Performance Summary After Each Test",
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
      label: "Full Stack",
      value: "fullStack",
      count: projectsData.filter((p) => p.category === "fullStack").length,
    },
    {
      label: "MERN Stack",
      value: "mern",
      count: projectsData.filter((p) => p.category === "mern").length,
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
