import React, { useMemo, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import ProjectCard from "../components/ProjectCard";
import { FaSearch, FaSlidersH } from "react-icons/fa";

const projectsData = [
  {
    id: 1,
    title: "Kashiroute",
    description:
      "Kashiroute is a full-stack travel discovery platform with an intent-aware chatbot that helps users explore Varanasi experiences and plan trips around verified local offerings.",
    image: "/assets/images/kashiRoute.png",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind CSS",
      "REST APIs",
      "JWT",
      "Cloudinary",
      "MVC Architecture",
      "Conversational AI",
      "NLP",
      "Intent Detection",
      "Entity Extraction",
      "Chatbot Context Management",
    ],
    liveLink: "https://kashiroute.nav-code.com/?source=portfolio",
    codeLink: "https://github.com/anubhavsingh2027/KashiRoute",
    category: "fullStack",
    features: [
      "Travel discovery UI with destination-focused browsing",
      "Backend APIs for service and booking flows",
      "Database-backed trip and listing data",
      "Responsive design for mobile and desktop",
      "RESTful service boundaries with controller and service layers",
      "JWT-based authentication with role-aware access control",
      "Indexed MongoDB queries for destination and listing discovery",
      "Cloud media storage and defensive input validation",
      "Intent classification for travel search, booking, and support queries",
      "Entity extraction for destinations, dates, budgets, and traveler preferences",
      "Context-aware conversation flow with fallback handling for unknown intents",
      "Chatbot orchestration layer connecting natural-language requests to travel APIs",
    ],
  },
  {
    id: 2,
    title: "PhishShield",
    description:
      "PhishShield is a security-focused application for identifying potentially malicious or phishing content by combining URL analysis, machine-learning classification, and structured result handling.",
    image: "/assets/images/Phishshield.png",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Security APIs",
      "URL Parsing",
      "JWT",
      "Rate Limiting",
      "OWASP Practices",
      "Machine Learning",
      "NLP",
      "Feature Engineering",
      "Classification Model",
      "Model Inference",
      "Threat Scoring",
    ],
    liveLink: "https://phishshield.nav-code.com/?source=portfolio",
    codeLink: "https://github.com/anubhavsingh2027/Phishsheild",
    category: "mern",
    features: [
      "Threat-analysis workflow for suspicious links",
      "Authentication and protected user sessions",
      "Structured backend result processing and reporting",
      "Responsive UI for security checks and outcomes",
      "Layered threat-analysis pipeline for normalization and scoring",
      "Allowlist and blocklist evaluation with external security APIs",
      "Rate-limited analysis endpoints to prevent request abuse",
      "Sanitized URL parsing and validation at the API boundary",
      "Feature engineering from URL structure, domain signals, and message content",
      "ML classification pipeline for phishing and benign threat categories",
      "Model inference service with confidence scores for explainable results",
      "Threat scoring layer combining model predictions with rule-based signals",
    ],
  },
  {
    id: 3,
    title: "Real-Time Chat App",
    description:
      "This real-time chat application enables instant messaging with persistent conversation data, live updates, and backend support for scalable communication flows.",
    image: "/assets/images/Real-time-chatting.png",
    technologies: [
      "React",
      "JavaScript",
      "MongoDB",
      "Express",
      "WebSocket",
      "Redis",
    ],
    liveLink: "https://real-time-chatting.nav-code.com/?source=portfolio",
    codeLink: "https://github.com/anubhavsingh2027/Real-Time-Chatting",
    category: "mern",
    features: [
      "Live messaging using WebSockets for real-time updates",
      "Redis-backed caching for chat history and performance",
      "User profiles and persistent conversation storage",
      "Scalable backend architecture for interactive communication",
      "WebSocket connection lifecycle and room-based message routing",
      "Redis pub/sub patterns for coordinating real-time events",
      "Optimistic UI updates with durable MongoDB message persistence",
      "Pagination and indexed conversation queries for large histories",
    ],
  },
  {
    id: 4,
    title: "Advanced Portfolio",
    description:
      "This portfolio combines a polished frontend experience with AI-assisted interactions, API-driven communication, and a clean recruiter-focused presentation.",
    image: "/assets/images/websiteImg.png",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "AI Chatbot",
      "Tailwind CSS",
    ],
    liveLink: "https://anubhav.nav-code.com/?source=portfolio",
    codeLink: "https://github.com/anubhavsingh2027/Portfolio",
    category: "mern",
    features: [
      "AI assistant and voice/chat workflow integration",
      "Backend contact and email API flows",
      "Responsive portfolio experience with custom UI patterns",
      "Production-ready deployment and frontend polish",
      "Service-oriented API integration with centralized error handling",
      "AI request orchestration with prompt context and fallback responses",
      "Voice pipeline using speech recognition and text-to-speech boundaries",
      "Environment-based configuration for frontend and backend deployments",
    ],
  },
  {
    id: 5,
    title: "Airbnb Clone",
    description:
      "A booking-focused property marketplace with listing data, user flow, and search-driven browsing built as a full-stack learning project.",
    image: "/assets/images/Airbnb.png",
    technologies: [
      "HTML5",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Express",
      "REST APIs",
      "Sessions",
      "MVC Architecture",
      "Cloud Deployment",
    ],
    liveLink: "https://airbnb-clone-1u1y.onrender.com/",
    codeLink: "https://github.com/anubhavsingh2027/Airbnb-Clone",
    category: "fullStack",
    features: [
      "Property listings and booking-oriented workflows",
      "Search and filter patterns for discovery",
      "Authentication and user session handling",
      "Cloud deployment and full-stack integration",
      "Listing, booking, and user domains separated at the API layer",
      "Session-based authentication with protected booking operations",
      "MongoDB indexes for location, price, and availability queries",
      "Server-side validation for listing and reservation data",
    ],
  },
  {
    id: 6,
    title: "TypingMaster",
    description:
      "A typing challenge app focused on practice, speed tracking, and a clean user experience for improving keyboard performance.",
    image: "/assets/images/typeMaster.png",
    technologies: [
      "React",
      "CSS3",
      "JavaScript",
      "Vercel",
      "Web APIs",
      "Local Storage",
      "State Management",
      "Performance Optimization",
    ],
    liveLink: "https://typing-master-eta.vercel.app/",
    codeLink: "https://github.com/anubhavsingh2027/TypingMaster",
    category: "frontend",
    features: [
      "Real-time typing metrics and scoring",
      "Responsive front-end interaction design",
      "Fast deployment and lightweight UX",
      "Client-side state transitions for timer, input, and scoring flows",
      "Derived metrics for words per minute, accuracy, and error rate",
      "Persistent high-score storage with resilient browser-side state",
      "Low-overhead rendering strategy for responsive keystroke feedback",
    ],
  },
  {
    id: 7,
    title: "Token Bucket Rate Limiter",
    description:
      "A backend rate-limiting project that applies token bucket logic to protect APIs from overload and control request bursts.",
    technologies: [
      "Node.js",
      "Express",
      "Rate Limiting",
      "Algorithms",
      "Token Bucket",
      "Middleware",
      "Redis",
      "Distributed Systems",
      "HTTP 429",
    ],
    codeLink: "https://github.com/anubhavsingh2027/token_Bucket_rateLimit",
    category: "algorithms",
    features: [
      "Per-client request throttling",
      "Burst tolerance with controlled refill timing",
      "429 responses for exhausted buckets",
      "O(1) token accounting per client request",
      "Middleware-based enforcement before protected route handlers",
      "Configurable refill rate, bucket capacity, and client identity keys",
      "Redis-compatible design for shared limits across API instances",
    ],
  },
  {
    id: 8,
    title: "Gossip Protocol",
    description:
      "A distributed-system simulation that demonstrates node communication patterns using Redis and MongoDB for propagation and persistence.",
    technologies: [
      "Node.js",
      "Express",
      "Redis",
      "MongoDB",
      "Algorithms",
      "Pub/Sub",
      "Eventual Consistency",
      "Retry Logic",
      "Distributed Systems",
    ],
    codeLink: "https://github.com/anubhavsingh2027/Gossip_protocol",
    category: "algorithms",
    features: [
      "Decentralized node communication model",
      "Redis-based message propagation",
      "MongoDB-backed persistence for simulation data",
      "Gossip fan-out with bounded propagation across peer nodes",
      "Eventual consistency model for eventually convergent node state",
      "Message identifiers and deduplication for idempotent delivery",
      "Retry and failure-tolerance behavior for unavailable peers",
    ],
  },
];

function Projects() {
  const [ref, isVisible] = useIntersectionObserver();
  const [selectedFilter, setSelectedFilter] = useState("*");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechnology, setSelectedTechnology] =
    useState("All technologies");
  const [sortOrder, setSortOrder] = useState("featured");

  const filters = [
    { label: "All Projects", value: "*" },
    { label: "Full Stack", value: "fullStack" },
    { label: "MERN Stack", value: "mern" },
    { label: "Algorithms", value: "algorithms" },
    { label: "Frontend", value: "frontend" },
  ].map((filter) => ({
    ...filter,
    count:
      filter.value === "*"
        ? projectsData.length
        : projectsData.filter((project) => project.category === filter.value)
            .length,
  }));
  const technologies = [
    "All technologies",
    ...new Set(projectsData.flatMap((project) => project.technologies)),
  ];
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matches = projectsData.filter((project) => {
      const searchableText =
        `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase();
      return (
        (selectedFilter === "*" || project.category === selectedFilter) &&
        (selectedTechnology === "All technologies" ||
          project.technologies.includes(selectedTechnology)) &&
        (!query || searchableText.includes(query))
      );
    });
    return [...matches].sort((first, second) =>
      sortOrder === "az"
        ? first.title.localeCompare(second.title)
        : first.id - second.id,
    );
  }, [searchQuery, selectedFilter, selectedTechnology, sortOrder]);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative flex min-h-screen items-center bg-gradient-to-b from-dark-bg via-dark-secondary to-dark-bg px-4 py-20 md:px-6"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-base text-slate-300 md:text-xl">
            Core product work focused on backend systems, real-time
            communication, security workflows, and practical AI-enabled
            engineering.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple" />
        </div>
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-cyan-400/15 bg-slate-900/40 p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition ${selectedFilter === filter.value ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white" : "border border-slate-600 bg-slate-950/40 text-slate-200 hover:border-cyan-400 hover:text-cyan-300"}`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative">
              <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search projects"
                aria-label="Search projects"
                className="w-full rounded-lg border border-slate-600 bg-slate-950/60 py-2 pl-10 pr-3 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none sm:w-52"
              />
            </label>
            <label className="relative">
              <FaSlidersH className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={selectedTechnology}
                onChange={(event) => setSelectedTechnology(event.target.value)}
                aria-label="Filter by technology"
                className="w-full appearance-none rounded-lg border border-slate-600 bg-slate-950/60 py-2 pl-10 pr-8 text-sm text-white focus:border-cyan-400 focus:outline-none sm:w-52"
              >
                {technologies.map((technology) => (
                  <option key={technology}>{technology}</option>
                ))}
              </select>
            </label>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              aria-label="Sort projects"
              className="rounded-lg border border-slate-600 bg-slate-950/60 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="az">Sort: A to Z</option>
            </select>
          </div>
        </div>
        {isVisible && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
            {!filteredProjects.length && (
              <div className="col-span-full rounded-2xl border border-dashed border-neon-cyan/30 px-6 py-16 text-center text-slate-300">
                <p className="text-lg font-semibold">
                  No projects match those filters.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Try a broader search or reset the project explorer.
                </p>
              </div>
            )}
          </div>
        )}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/anubhavsingh2027"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-neon-cyan hover:text-neon-purple"
          >
            View more projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
