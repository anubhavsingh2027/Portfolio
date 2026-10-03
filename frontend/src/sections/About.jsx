import React, { useRef, useEffect } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { gsap } from "gsap";
import { FaCode, FaRocket, FaHeart } from "react-icons/fa";

function About() {
  const [ref, isVisible] = useIntersectionObserver();
  const numbersRef = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    if (!isVisible) return;

    const targets = [15, 800];
    targets.forEach((target, idx) => {
      if (numbersRef.current[idx]) {
        gsap.to(numbersRef.current[idx], {
          textContent: target,
          duration: 2,
          ease: "power1.out",
          snap: { textContent: 1 },
          onUpdate: function () {
            const value = Math.ceil(this.targets()[0].textContent);
            numbersRef.current[idx].textContent = value + (idx === 0 ? "+" : "+");
          },
        });
      }
    });

    textRefs.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: idx * 0.18,
            ease: "power2.out",
          },
        );
      }
    });
  }, [isVisible]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-dark-bg via-dark-secondary to-dark-bg px-4 py-20 md:px-6"
    >
      <div className="absolute left-10 top-20 h-80 w-80 rounded-full bg-neon-cyan/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-neon-purple/5 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-base text-slate-300 md:text-xl">
            Backend & Full-Stack Developer • B.Tech CSE (AI) student • AI-focused problem solver
          </p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple" />
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <div className="order-2 space-y-6 md:order-1">
            <div ref={(el) => (textRefs.current[0] = el)} className="opacity-0">
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-neon-cyan/50 bg-neon-cyan/20">
                  <FaCode className="text-lg text-neon-cyan" />
                </div>
                <p className="text-lg leading-relaxed text-slate-200">
                  I’m <span className="font-bold text-white">Anubhav Singh</span>, a B.Tech CSE (AI) student building software that connects user experiences, APIs, and reliable backend systems.
                </p>
              </div>
            </div>

            <div ref={(el) => (textRefs.current[1] = el)} className="opacity-0">
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-neon-purple/50 bg-neon-purple/20">
                  <FaRocket className="text-lg text-neon-purple" />
                </div>
                <p className="text-lg leading-relaxed text-slate-200">
                  My focus is backend development, full-stack product engineering, REST APIs, databases, authentication, and real-time systems. I enjoy turning ideas into maintainable builds that are practical, fast, and production-minded.
                </p>
              </div>
            </div>

            <div ref={(el) => (textRefs.current[2] = el)} className="opacity-0">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-cyan-400/50 bg-cyan-400/10">
                  <FaHeart className="text-lg text-cyan-300" />
                </div>
                <p className="text-lg leading-relaxed text-slate-200">
                  I’m currently growing through a Backend AI Engineering internship and building projects around real APIs, scalable services, and AI-enabled workflows, with a strong interest in DSA and problem solving.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-neon-cyan/30 pt-8">
              <div className="text-center md:text-left">
                <p className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  <span ref={(el) => (numbersRef.current[0] = el)}>15+</span>
                </p>
                <p className="mt-2 text-sm font-medium text-slate-300">Projects shipped</p>
              </div>
              <div className="text-center md:text-left">
                <p className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  <span ref={(el) => (numbersRef.current[1] = el)}>800+</span>
                </p>
                <p className="mt-2 text-sm font-medium text-slate-300">DSA problems</p>
              </div>
            </div>
          </div>

          <div className="order-1 flex items-center justify-center md:order-2">
            <div className="group relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-neon-cyan/30 via-neon-purple/25 to-neon-cyan/30 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
              <div className="relative h-[380px] w-72 overflow-hidden rounded-[2rem] border border-cyan-400/30 bg-slate-900 shadow-2xl shadow-cyan-500/10 md:h-[480px] md:w-80">
                <img
                  src="/assets/images/anubhavsingh.png"
                  alt="Anubhav Singh"
                  className="h-full w-full object-cover"
                  onError={(e) => (e.target.src = "/assets/images/anubhavsingh.png")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
