import React from "react";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCode } from "react-icons/fa";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const experienceData = {
  role: "Backend AI Engineering Intern",
  company: "FlyRank AI",
  location: "Remote",
  period: "July 2026 – Present",
  summary:
    "Working as a Backend AI Engineering Intern at FlyRank AI, gaining hands-on experience in backend development, AI engineering, and modern software engineering through structured projects, technical assignments, mentorship, and industry-focused learning.",
  highlights: [
    "Participating in a structured Backend AI Engineering internship program.",
    "Building AI-powered backend applications and scalable REST APIs.",
    "Learning modern backend architecture, system design, and AI integration.",
    "Completing hands-on technical assignments and real-world engineering projects.",
    "Collaborating with mentors and a global community of interns from 130+ countries.",
    "Strengthening software engineering, problem-solving, and backend development skills.",
  ],
  techStack: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Redis",
    "Docker",
    "REST APIs",
    "Git",
    "GitHub",
    "JavaScript",
    "AI Tools",
  ],
};

function WorkExperience() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={ref}
      id="experience"
      className="min-h-screen flex items-center py-20 px-4 md:px-6 bg-gradient-to-b from-dark-secondary to-dark-bg"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
        </div>

        {isVisible && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 blur-3xl rounded-[2rem]" />
            <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-[35%]">
                  <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-sm font-medium text-neon-cyan">
                    <FaBriefcase />
                    Internship
                  </div>

                  <h3 className="mt-5 text-3xl font-bold text-white">
                    {experienceData.role}
                  </h3>

                  <div className="mt-6 space-y-3 text-gray-300">
                    <div className="flex items-center gap-3">
                      <FaBriefcase className="text-neon-cyan" />
                      <span className="text-lg font-semibold text-white">
                        {experienceData.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-neon-purple" />
                      <span>{experienceData.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-cyan-400" />
                      <span>{experienceData.period}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[65%]">
                  <p className="text-lg leading-8 text-gray-300">
                    {experienceData.summary}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {experienceData.highlights.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-gray-200"
                      >
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
                      <FaCode />
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {experienceData.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-neon-cyan/20 bg-neon-cyan/10 px-3 py-1.5 text-sm text-cyan-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default WorkExperience;
