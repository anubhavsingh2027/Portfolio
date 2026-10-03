import React, { useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import SkillChip from "../components/SkillChip";
import {
  FaPaintBrush,
  FaServer,
  FaDatabase,
  FaCode,
  FaTools,
  FaCloud,
} from "react-icons/fa";

const skillsData = {
  frontend: {
    icon: FaPaintBrush,
    title: "Frontend",
    skills: [
      { name: "React", icon: "https://img.icons8.com/color/40/000000/react-native.png", badge: "Primary" },
      { name: "JavaScript", icon: "https://img.icons8.com/color/40/000000/javascript--v1.png", badge: "Primary" },
      { name: "HTML5", icon: "https://img.icons8.com/color/40/000000/html-5--v1.png", badge: "Working" },
      { name: "CSS3", icon: "https://img.icons8.com/color/40/000000/css3.png", badge: "Working" },
      { name: "Tailwind CSS", icon: "https://img.icons8.com/color/40/000000/tailwindcss.png", badge: "Primary" },
    ],
  },
  backend: {
    icon: FaServer,
    title: "Backend & APIs",
    skills: [
      { name: "Node.js", icon: "https://img.icons8.com/color/40/000000/nodejs.png", badge: "Primary" },
      { name: "Express.js", icon: "https://img.icons8.com/color/40/000000/express-js.png", badge: "Primary" },
      { name: "REST APIs", icon: "https://img.icons8.com/color/40/000000/api-settings.png", badge: "Primary" },
      { name: "JWT", icon: "https://img.icons8.com/color/40/000000/key.png", badge: "Primary" },
      { name: "Redis", icon: "https://img.icons8.com/color/40/000000/redis.png", badge: "Working" },
      { name: "WebSocket", icon: "https://img.icons8.com/color/40/000000/network.png", badge: "Working" },
    ],
  },
  database: {
    icon: FaDatabase,
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: "https://img.icons8.com/color/40/000000/mongodb.png", badge: "Primary" },
      { name: "SQL", icon: "https://img.icons8.com/color/40/000000/sql.png", badge: "Working" },
      { name: "Mongoose", icon: "https://img.icons8.com/color/40/000000/mongoose.png", badge: "Working" },
      { name: "Authentication", icon: "https://img.icons8.com/color/40/000000/lock.png", badge: "Primary" },
    ],
  },
  languages: {
    icon: FaCode,
    title: "Languages",
    skills: [
      { name: "C++", icon: "https://img.icons8.com/color/40/000000/c-plus-plus-logo.png", badge: "Primary" },
      { name: "C", icon: "https://img.icons8.com/color/40/000000/c-programming.png", badge: "Working" },
      { name: "JavaScript", icon: "https://img.icons8.com/color/40/000000/javascript--v1.png", badge: "Primary" },
      { name: "Python", icon: "https://img.icons8.com/color/40/000000/python--v1.png", badge: "Working" },
      { name: "TypeScript", icon: "https://img.icons8.com/color/40/000000/typescript.png", badge: "Learning" },
    ],
  },
  tools: {
    icon: FaTools,
    title: "Tools & Workflow",
    skills: [
      { name: "Git", icon: "https://img.icons8.com/color/40/000000/git.png", badge: "Primary" },
      { name: "GitHub", icon: "https://img.icons8.com/color/40/000000/github.png", badge: "Primary" },
      { name: "Docker", icon: "https://img.icons8.com/color/40/000000/docker.png", badge: "Working" },
      { name: "Postman", icon: "https://logodix.com/logo/2062772.jpg", badge: "Primary" },
      { name: "VS Code", icon: "https://img.icons8.com/color/40/000000/visual-studio-code-2019.png", badge: "Primary" },
    ],
  },
  cloud: {
    icon: FaCloud,
    title: "Deployment",
    skills: [
      { name: "Vercel", icon: "https://img.icons8.com/color/40/000000/vercel.png", badge: "Working" },
      { name: "Render", icon: "https://img.icons8.com/color/40/000000/render.png", badge: "Working" },
      { name: "MongoDB Atlas", icon: "https://img.icons8.com/color/40/000000/mongodb.png", badge: "Working" },
      { name: "Cloud Hosting", icon: "https://img.icons8.com/color/40/000000/server.png", badge: "Working" },
    ],
  },
};

function Skills() {
  const [ref, isVisible] = useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState("backend");

  const categories = Object.keys(skillsData);
  const activeCategoryData = skillsData[activeCategory];

  return (
    <section
      ref={ref}
      id="skills"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-dark-bg via-dark-secondary to-dark-bg px-4 py-20 md:px-6"
    >
      <div className="absolute left-10 top-0 h-72 w-72 rounded-full bg-neon-cyan/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-neon-purple/5 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-base text-slate-300 md:text-xl">
            I build with the technologies that matter for backend systems, full-stack products, APIs, and AI-enabled features.
          </p>
          <div className="mx-auto mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple" />
        </div>

        <div className="mb-16 flex flex-wrap justify-center gap-3 px-4">
          {categories.map((category, index) => {
            const Icon = skillsData[category].icon;
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-3 font-semibold transition-all duration-300 ${
                  isActive
                    ? "scale-[1.02] border-transparent bg-gradient-to-r from-neon-cyan to-neon-purple text-white shadow-lg shadow-cyan-500/30"
                    : "border-slate-600 bg-slate-900/50 text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
                }`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <Icon size={16} />
                <span className="text-sm capitalize md:text-base">{category}</span>
              </button>
            );
          })}
        </div>

        {isVisible && (
          <div className="mb-12 text-center">
            <h3 className="mb-2 text-3xl font-bold text-neon-cyan md:text-4xl">
              {activeCategoryData.title}
            </h3>
            <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple" />
          </div>
        )}

        {isVisible && (
          <div key={activeCategory} className="grid grid-cols-2 gap-5 animate-fade-in sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {activeCategoryData.skills.map((skill, index) => (
              <SkillChip
                key={skill.name}
                icon={skill.icon}
                name={skill.name}
                badge={skill.badge}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;
