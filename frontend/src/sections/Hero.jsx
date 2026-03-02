import React, { useEffect, useRef } from "react";
import { FaArrowDown, FaDownload } from "react-icons/fa";
import { useScrollIntoView } from "../hooks/useScrollIntoView";
import { gsap } from "gsap";

function Hero({ onResumeClick, onAssistantClick }) {
  const scrollTo = useScrollIntoView();
  const titleRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Intro animation with GSAP
    const tl = gsap.timeline();

    if (titleRef.current) {
      const titleWords = titleRef.current.querySelectorAll(".title-word");
      tl.fromTo(
        titleWords,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        0,
      );
    }

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current.querySelectorAll("button"),
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 },
        "-=0.3",
      );
    }

    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.querySelectorAll(".stat-item"),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1 },
        "-=0.3",
      );
    }

    // Scroll indicator bounce animation
    const scrollIndicator = document.querySelector(".scroll-indicator i");
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        y: 10,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  useEffect(() => {
    // Debug: Check if video exists
    const video = document.querySelector("video");
    if (video) {
      video.addEventListener("loadstart", () =>{

      }
        
      );
      video.addEventListener("canplay", () => {

    });
      video.addEventListener("error", (e) =>{

    });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{
        width: "100%",
        minHeight: "100vh",
        zIndex: 10,
        position: "relative",
      }}
    >
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 text-center z-20 relative pt-20 pb-32 md:pb-40">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
        >
          <span className="title-word block text-white drop-shadow-lg">
            Welcome
          </span>
          <span className="title-word block text-neon-cyan drop-shadow-lg">
            to My
          </span>
          <span className="title-word block bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent drop-shadow-lg">
            Portfolio
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-neon-cyan font-medium mb-4 drop-shadow-lg">
          Full Stack Developer | MERN Specialist | AI Enthusiast
        </p>

        <p className="text-lg text-white mb-8 max-w-2xl mx-auto drop-shadow-lg">
          Crafting innovative digital solutions with cutting-edge technology and
          creative design
        </p>

        {/* Call-to-Action Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="px-8 py-3 bg-gradient-primary text-white font-bold rounded-lg hover:shadow-lg transition flex items-center gap-2"
          >
            Explore Work <FaArrowDown />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-8 py-3 bg-neon-cyan text-white font-bold rounded-lg hover:shadow-lg transition"
          >
            Get In Touch
          </button>
          <button
            onClick={onResumeClick}
            className="px-8 py-3 bg-neon-purple text-white font-bold rounded-lg hover:shadow-lg transition flex items-center gap-2"
          >
            Download <FaDownload />
          </button>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="flex justify-center gap-8 md:gap-16 flex-wrap"
        >
          <div className="stat-item text-center">
            <p className="text-4xl font-bold text-cyan-400">15+</p>
            <p className="text-white drop-shadow-lg">Projects</p>
          </div>
          <div className="stat-item text-center">
            <p className="text-4xl font-bold text-cyan-400">3+</p>
            <p className="text-white drop-shadow-lg">Years Exp</p>
          </div>
          <div className="stat-item text-center">
            <p className="text-4xl font-bold text-cyan-400">700+</p>
            <p className="text-white drop-shadow-lg">Problems Solved</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Prominent & Responsive */}
      <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 md:gap-4">
        {/* Background glow container */}
        <div className="relative flex flex-col items-center">
          {/* Glow effect background */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent rounded-full blur-xl"
            style={{ width: "100px", height: "100px" }}
          ></div>

          {/* Content */}
          <div className="relative flex flex-col items-center gap-2 md:gap-3">
            {/* Mouse Animation */}
            <div className="relative" style={{ width: "28px", height: "48px" }}>
              {/* Mouse body */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-8 border-2 border-cyan-400 rounded-full flex justify-center items-start pt-1 drop-shadow-lg"
                style={{ borderRadius: "12px" }}
              >
                {/* Scroll wheel animation */}
                <div
                  className="w-1 h-1.5 bg-cyan-400 rounded-full"
                  style={{
                    animation: "mouse-scroll 1.5s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Mouse cable/connector */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-8 border-l-2 border-cyan-400/50"></div>
            </div>

            {/* Animated dots below mouse */}
            <div className="flex gap-1 items-center mt-4">
              <span
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full drop-shadow-lg"
                style={{ animation: "dot-bounce-1 1.5s ease-in-out infinite" }}
              ></span>
              <span
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full drop-shadow-lg"
                style={{ animation: "dot-bounce-2 1.5s ease-in-out infinite" }}
              ></span>
              <span
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full drop-shadow-lg"
                style={{ animation: "dot-bounce-3 1.5s ease-in-out infinite" }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
