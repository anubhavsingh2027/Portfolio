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

// Render Icon Component
const RenderIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 110 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Render"
    className="fill-current"
  >
    <path d="M38.1801 3.45902C41.7067 3.45902 43.9994 5.45905 43.9994 8.67133C43.9994 11.0232 42.6512 12.7708 40.5375 13.5165L44.6811 20.6218H41.6077L37.7421 13.8798H33.4728V20.6218H30.8259V3.45902H38.1801ZM33.469 5.84911V11.5165H38.0544C40.1567 11.5165 41.2421 10.3387 41.2421 8.67133C41.2421 6.96576 40.1605 5.84911 38.0544 5.84911H33.469Z"></path>
    <path d="M51.4145 8.22773C54.9412 8.22773 57.2339 10.8587 57.2339 14.1093C57.2339 14.4878 57.2073 14.8817 57.1349 15.2718H47.7508C47.865 17.0921 49.4151 18.5223 51.506 18.5223C53.0179 18.5223 54.2252 17.876 55.1316 16.4496L56.9711 17.7919C55.8514 19.8149 53.6463 20.878 51.506 20.878C47.8536 20.878 45.1686 18.1705 45.1686 14.5682C45.1686 10.9467 47.7508 8.22773 51.4145 8.22773ZM54.7013 13.398C54.5489 11.6924 53.1284 10.4878 51.3879 10.4878C49.537 10.4878 48.124 11.6886 47.8117 13.398H54.7013Z"></path>
    <path d="M59.5495 20.6218V8.48012H62.0555V10.0098C62.4592 9.39027 63.6055 8.22773 65.7725 8.22773C69.0973 8.22773 70.8492 10.3004 70.8492 13.2488V20.6218H68.3547V13.7804C68.3547 11.7689 67.2578 10.6063 65.3803 10.6063C63.5408 10.6063 62.044 11.7689 62.044 13.7804V20.6218H59.5495Z"></path>
    <path d="M78.9766 8.22773C81.0293 8.22773 82.389 8.98491 83.284 10.136V2.81274H85.7785V20.6218H83.284V18.9659C82.389 20.117 81.0293 20.8742 78.9766 20.8742C75.5375 20.8742 72.9058 18.2164 72.9058 14.4878C72.9058 10.7555 75.5375 8.22773 78.9766 8.22773ZM75.3966 14.4878C75.3966 16.725 76.9466 18.6217 79.2774 18.6217C81.6082 18.6217 83.2687 16.725 83.2687 14.4878C83.2687 12.2507 81.593 10.4801 79.2774 10.4801C76.9466 10.4763 75.3966 12.2469 75.3966 14.4878Z"></path>
    <path d="M94.1382 8.22773C97.6648 8.22773 99.9575 10.8587 99.9575 14.1093C99.9575 14.4878 99.9309 14.8817 99.8585 15.2718H90.4744C90.5886 17.0921 92.1387 18.5223 94.2295 18.5223C95.7415 18.5223 96.9488 17.876 97.8552 16.4496L99.6947 17.7919C98.575 19.8149 96.3699 20.878 94.2295 20.878C90.5772 20.878 87.8922 18.1705 87.8922 14.5682C87.8884 10.9467 90.4706 8.22773 94.1382 8.22773ZM97.4249 13.398C97.2725 11.6924 95.852 10.4878 94.1115 10.4878C92.2606 10.4878 90.8476 11.6886 90.5353 13.398H97.4249Z"></path>
    <path d="M102.368 20.6218V8.48012H104.874V10.136C105.556 8.809 106.702 8.22773 108.024 8.22773C108.968 8.22773 109.688 8.52983 109.688 8.52983L109.425 10.832C109.288 10.7823 108.744 10.5528 107.952 10.5528C106.615 10.5528 104.878 11.2603 104.878 14.006V20.6218H102.368Z"></path>
    <path d="M15.6491 0.00582604C12.9679 -0.120371 10.7133 1.81847 10.3286 4.373C10.3134 4.49154 10.2905 4.60627 10.2715 4.72099C9.67356 7.90268 6.88955 10.3119 3.5457 10.3119C2.35364 10.3119 1.23395 10.006 0.258977 9.47058C0.140914 9.40557 0 9.4897 0 9.62354V10.3081V20.6218H10.2677V12.8894C10.2677 11.4668 11.4178 10.3119 12.8346 10.3119H15.4015C18.3074 10.3119 20.6458 7.89121 20.5315 4.94662C20.4287 2.29649 18.2884 0.132023 15.6491 0.00582604Z"></path>
  </svg>
);

const skillsData = {
  frontend: {
    icon: FaPaintBrush,
    title: "Frontend",
    skills: [
      {
        name: "HTML5",
        icon: "https://img.icons8.com/color/40/000000/html-5--v1.png",
        level: 90,
      },
      {
        name: "CSS3",
        icon: "https://img.icons8.com/color/40/000000/css3.png",
        level: 85,
      },
      {
        name: "JavaScript",
        icon: "https://img.icons8.com/color/40/000000/javascript--v1.png",
        level: 88,
      },
      {
        name: "React",
        icon: "https://th.bing.com/th/id/OIP.SFJOBdZ2TeuwEfAxXXhuyQHaGl?w=208&h=185&c=7&r=0&o=7&dpr=1.2&pid=1.7&rm=3",
        level: 82,
      },
      {
        name: "Tailwind",
        icon: "https://img.icons8.com/color/40/000000/tailwindcss.png",
        level: 82,
      },
    ],
  },
  backend: {
    icon: FaServer,
    title: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: "https://img.icons8.com/color/40/000000/nodejs.png",
        level: 95,
      },
      {
        name: "Express",
        icon: "https://img.icons8.com/color/40/000000/express-js.png",
        level: 95,
      },
      {
        name: "REST APIs",
        icon: "https://img.icons8.com/color/40/000000/api-settings.png",
        level: 85,
      },
      {
        name: "Redis",
        icon: "https://img.icons8.com/color/40/000000/redis.png",
        level: 90,
      },
      {
        name: "WebSocket",
        icon: "https://img.icons8.com/color/40/000000/network.png",
        level: 88,
      },
    ],
  },
  database: {
    icon: FaDatabase,
    title: "Database",
    skills: [
      {
        name: "MongoDB",
        icon: "https://img.icons8.com/color/40/000000/mongodb.png",
        level: 88,
      },
      {
        name: "MySQL",
        icon: "https://img.icons8.com/color/40/000000/mysql-logo.png",
        level: 80,
      },
      {
        name: "Mongoose",
        icon: "https://img.icons8.com/color/40/000000/mongoose.png",
        level: 85,
      },
    ],
  },
  languages: {
    icon: FaCode,
    title: "Languages",
    skills: [
      {
        name: "C",
        icon: "https://img.icons8.com/color/40/000000/c-programming.png",
        level: 90,
      },
      {
        name: "C++",
        icon: "https://img.icons8.com/color/40/000000/c-plus-plus-logo.png",
        level: 95,
      },
      {
        name: "Java",
        icon: "https://img.icons8.com/color/40/000000/java-coffee-cup-logo--v1.png",
        level: 85,
      },
      {
        name: "Python",
        icon: "https://img.icons8.com/color/40/000000/python--v1.png",
        level: 80,
      },
      {
        name: "JavaScript",
        icon: "https://img.icons8.com/color/40/000000/javascript--v1.png",
        level: 85,
      },
    ],
  },
  tools: {
    icon: FaTools,
    title: "Tools",
    skills: [
      {
        name: "Git",
        icon: "https://img.icons8.com/color/40/000000/git.png",
        level: 95,
      },
      {
        name: "GitHub",
        icon: "https://img.icons8.com/color/40/000000/github.png",
        level: 90,
      },
      {
        name: "Docker",
        icon: "https://img.icons8.com/color/40/000000/docker.png",
        level: 90,
      },
      {
        name: "Postman",
        icon: "https://logodix.com/logo/2062772.jpg",
        level: 88,
      },
      {
        name: "VS Code",
        icon: "https://img.icons8.com/color/40/000000/visual-studio-code-2019.png",
        level: 95,
      },
      {
        name: "npm/yarn",
        icon: "https://img.icons8.com/color/40/000000/npm.png",
        level: 82,
      },
      {
        name: "JWT",
        icon: "https://img.icons8.com/color/40/000000/key.png",
        level: 92,
      },
      {
        name: "Session Auth",
        icon: "https://img.icons8.com/color/40/000000/lock.png",
        level: 90,
      },
    ],
  },
  cloud: {
    icon: FaCloud,
    title: "Cloud",
    skills: [
      {
        name: "AWS",
        icon: "https://img.icons8.com/color/40/000000/amazon-web-services.png",
        level: 92,
      },
      {
        name: "Vercel",
        icon: "https://img.icons8.com/color/40/000000/vercel.png",
        level: 90,
      },
      {
        name: "Render",
        icon: RenderIcon,
        level: 88,
      },
      {
        name: "Railway",
        icon: "https://th.bing.com/th/id/OIP.-FaSflhBsZlyHy69Ab1bcgHaCC?w=325&h=96&c=7&r=0&o=7&dpr=1.2&pid=1.7&rm=3",
        level: 85,
      },
      {
        name: "Netlify",
        icon: "https://img.icons8.com/color/40/000000/netlify.png",
        level: 82,
      },
      {
        name: "MongoDB Atlas",
        icon: "https://img.icons8.com/color/40/000000/mongodb.png",
        level: 80,
      },
      {
        name: "Redis Cache",
        icon: "https://img.icons8.com/color/40/000000/redis.png",
        level: 90,
      },
      {
        name: "Load Balancing",
        icon: "https://img.icons8.com/color/40/000000/server.png",
        level: 85,
      },
    ],
  },
};

function Skills() {
  const [ref, isVisible] = useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState("frontend");

  const categories = Object.keys(skillsData);
  const activeCategoryData = skillsData[activeCategory];

  return (
    <section
      ref={ref}
      id="skills"
      className="min-h-screen flex items-center py-20 px-4 md:px-6 bg-gradient-to-b from-dark-bg via-dark-secondary to-dark-bg relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-clip-text text-transparent gradient-shift">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-black text-lg md:text-xl max-w-3xl mx-auto">
            Expertise across Full Stack Development, MERN Stack, Cloud
            Deployment, and Modern DevOps. Continuously learning and adapting to
            new technologies.
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mt-6 rounded-full" />
        </div>

        {/* Category Tabs - Modern Design */}
        <div className="flex flex-wrap gap-3 justify-center mb-16 px-4">
          {categories.map((category, index) => {
            const Icon = skillsData[category].icon;
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`tab-enter flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-gradient-to-r from-neon-cyan to-neon-purple text-white shadow-lg shadow-neon-cyan/50 scale-105"
                    : "bg-dark-secondary/50 text-black border-dark-tertiary hover:border-neon-cyan/40 hover:text-neon-cyan hover:bg-dark-secondary"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon size={18} />
                <span className="capitalize hidden sm:inline text-sm md:text-base">
                  {category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Title & Description */}
        {isVisible && (
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-3xl md:text-4xl font-bold text-neon-cyan mb-2">
              {activeCategoryData.title}
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full" />
          </div>
        )}

        {/* Skills Grid - Enhanced Layout */}
        {isVisible && (
          <div
            key={activeCategory}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-fade-in"
          >
            {activeCategoryData.skills.map((skill, index) => (
              <SkillChip
                key={skill.name}
                icon={skill.icon}
                name={skill.name}
                level={skill.level}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mt-20 pt-12 border-t border-neon-cyan/20">
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text group-hover:scale-110 transition-transform duration-300">
              6+
            </div>
            <p className="text-black text-sm mt-2">Categories</p>
          </div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text group-hover:scale-110 transition-transform duration-300">
              25+
            </div>
            <p className="text-black text-sm mt-2">Technologies</p>
          </div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text group-hover:scale-110 transition-transform duration-300">
              90%+
            </div>
            <p className="text-black text-sm mt-2">Proficiency</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
