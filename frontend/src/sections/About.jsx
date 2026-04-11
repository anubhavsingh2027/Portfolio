import React, { useRef, useEffect } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { gsap } from "gsap";
import { FaCode, FaRocket, FaHeart } from "react-icons/fa";

function About() {
  const [ref, isVisible] = useIntersectionObserver();
  const numbersRef = useRef([]);
  const imageRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    if (!isVisible) return;

    // Animate numbers
    const targets = [
      { num: 15, symbol: "+" },
      { num: 3, symbol: "+" },
    ];

    targets.forEach((target, idx) => {
      if (numbersRef.current[idx]) {
        gsap.to(numbersRef.current[idx], {
          textContent: target.num,
          duration: 2,
          ease: "power1.out",
          snap: { textContent: 1 },
          onUpdate: function () {
            numbersRef.current[idx].textContent =
              Math.ceil(this.targets()[0].textContent) + target.symbol;
          },
        });
      }
    });

    // Animate text paragraphs
    textRefs.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: idx * 0.2,
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
      className="min-h-screen flex items-center py-20 px-4 md:px-6 bg-gradient-to-b from-dark-bg via-dark-secondary to-dark-bg relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Full Stack Developer | MERN Specialist | Cloud Architect | Scalable
            Backend Expert
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mt-6 rounded-full" />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 order-2 md:order-1">
            {/* Paragraph 1 */}
            <div ref={(el) => (textRefs.current[0] = el)} className="opacity-0">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-neon-cyan/20 border border-neon-cyan/50">
                    <FaCode className="text-neon-cyan text-lg" />
                  </div>
                </div>
                <p className="text-black text-lg leading-relaxed">
                  Hi, I'm{" "}
                  <span className="font-bold text-white">Anubhav Singh</span> —
                  a passionate developer from Varanasi, India. I am a skilled
                  web developer with years of experience in crafting responsive,
                  high-performance websites. My focus lies in delivering quality
                  solutions using the latest web technologies.
                </p>
              </div>
            </div>

            {/* Paragraph 2 */}
            <div ref={(el) => (textRefs.current[1] = el)} className="opacity-0">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-neon-purple/20 border border-neon-purple/50">
                    <FaRocket className="text-neon-purple text-lg" />
                  </div>
                </div>
                <p className="text-black text-lg leading-relaxed">
                  I have a strong foundation in HTML, CSS, JavaScript, React,
                  Node.js, Express, and MongoDB. Recently, I've expanded my
                  expertise to include{" "}
                  <span className="font-semibold text-white">
                    Redis caching, load balancing, and production-grade scalable
                    architectures
                  </span>
                  . I'm passionate about clean code, performance optimization,
                  and building cloud-native applications that scale seamlessly.
                </p>
              </div>
            </div>

            {/* Paragraph 3 */}
            <div ref={(el) => (textRefs.current[2] = el)} className="opacity-0">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-neon-cyan/20 border border-neon-cyan/50">
                    <FaHeart className="text-neon-cyan text-lg" />
                  </div>
                </div>
                <p className="text-black text-lg leading-relaxed">
                  My journey has evolved into mastering{" "}
                  <span className="font-semibold text-white">
                    cloud deployment (Vercel, Render, Custom Hosting)
                  </span>
                  , backend scalability with{" "}
                  <span className="font-semibold text-white">
                    Redis and load balancing
                  </span>
                  , and real-time features using WebSockets. All my projects are
                  now cloud-deployed with production-ready infrastructure,
                  ensuring reliability and performance at scale.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-neon-cyan/30">
              <div className="text-reveal">
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text">
                  <span ref={(el) => (numbersRef.current[0] = el)}>15+</span>
                </p>
                <p className="text-black mt-2 font-semibold">
                  Projects Completed
                </p>
              </div>
              <div className="text-reveal">
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text">
                  <span ref={(el) => (numbersRef.current[1] = el)}>3+</span>
                </p>
                <p className="text-black mt-2 font-semibold">
                  Years Experience
                </p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center items-center order-1 md:order-2">
            <div className="relative group">
              {/* Outer glow circle */}
              <div className="absolute -inset-6 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Rotation circle background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-[2.5rem] opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500" />

              {/* Main Image Container */}
              <div className="relative w-80 h-96 md:w-96 md:h-[500px] rounded-3xl overflow-hidden image-reveal image-glow image-float">
                <img
                  ref={imageRef}
                  src="/assets/images/anubhavsingh.png"
                  alt="Anubhav Singh"
                  className="w-full h-full object-cover object-center shimmer relative z-10"
                  onError={(e) =>
                    (e.target.src = "/assets/images/anubhavsingh.png")
                  }
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent z-20" />

                {/* Inner accent lines */}
                <div className="absolute inset-0 border-2 border-neon-cyan/30 rounded-3xl" />
                <div className="absolute inset-2 border border-neon-purple/20 rounded-3xl" />
              </div>

              {/* Bottom right accent */}
              <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-neon-purple/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </div>
          </div>
        </div>

        {/* Bottom accent decorations */}
        <div className="mt-16 pt-12 border-t border-neon-cyan/20 flex justify-center gap-6 md:gap-12 flex-wrap">
          <div className="text-center">
            <p className="text-neon-cyan font-semibold text-sm uppercase tracking-widest">
              Skills
            </p>
            <p className="text-black text-sm mt-1">25+ Technologies</p>
          </div>
          <div className="text-center border-l border-r border-neon-cyan/20 px-6 md:px-12">
            <p className="text-neon-purple font-semibold text-sm uppercase tracking-widest">
              Passion
            </p>
            <p className="text-black text-sm mt-1">Problem Solving</p>
          </div>
          <div className="text-center">
            <p className="text-neon-cyan font-semibold text-sm uppercase tracking-widest">
              Expertise
            </p>
            <p className="text-black text-sm mt-1">Full Stack Development</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
