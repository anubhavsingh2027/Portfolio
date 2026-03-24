import React from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import ServiceCard from "../components/ServiceCard";
import { FaCode, FaBolt, FaServer } from "react-icons/fa";

const servicesData = [
  {
    icon: FaCode,
    title: "Web Development",
    description:
      "Full-stack web development using modern technologies like React, Node.js, and MongoDB. From concept to deployment, I create responsive, user-friendly, and cloud-native applications.",
    features: [
      "React & Modern Frontend",
      "Scalable Backend Architecture",
      "Database Integration",
      "Cloud Deployment",
    ],
  },
  {
    icon: FaBolt,
    title: "Performance & Scalability",
    description:
      "Redis caching, load balancing, and optimization for high-traffic applications. Code optimization and performance tuning for enterprise-grade systems.",
    features: [
      "Redis Caching",
      "Load Balancing",
      "Performance Tuning",
      "Scalable Design",
    ],
  },
  {
    icon: FaServer,
    title: "Cloud & Deployment",
    description:
      "Design scalable systems deployed on cloud infrastructure (Vercel, Render, Custom Hosting). Build robust systems that ensure reliability, uptime, and exceptional performance.",
    features: [
      "Cloud Deployment",
      "Scalable Architecture",
      "High Availability",
      "System Security",
    ],
  },
];

function Services() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={ref}
      id="services"
      className="min-h-screen flex items-center py-20 px-4 md:px-6 bg-gradient-to-b from-dark-secondary to-dark-bg"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Services I Provide
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
        </div>

        {/* Services Grid */}
        {isVisible && (
          <div className="grid md:grid-cols-3 gap-8">
            {servicesData.map((service, idx) => (
              <ServiceCard
                key={idx}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;
