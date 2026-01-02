let currentSection = "home";
let isScrolling = false;
let networkAnimation = null;
document.addEventListener("readystatechange", function () {
  // Create GSAP timeline for intro animation
  const tl = gsap.timeline();

  // Initial state - hide navbar initially
  gsap.set("nav.navbar", { opacity: 0 });

  // Intro animation sequence
  tl.to(".intro-overlay", {
    opacity: 0,
    duration: 1.5,
    ease: "power2.inOut",
  })
    .to(
      ".intro-section",
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=1"
    )
    .to(
      ".greeting",
      {
        opacity: 1,
        filter: "blur(0px)",
        transform: "scale(1)",
        duration: 1,
        ease: "expo.out",
      },
      "-=0.5"
    )
    .to(
      ".name",
      {
        opacity: 1,
        filter: "blur(0px)",
        transform: "scale(1)",
        duration: 1,
        ease: "expo.out",
      },
      "-=0.7"
    )
    .to(
      ".roles",
      {
        opacity: 1,
        filter: "blur(0px)",
        transform: "scale(1)",
        duration: 1,
        ease: "expo.out",
      },
      "-=0.7"
    )
    .to(
      ".name-underline",
      {
        width: "100%",
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out",
      },
      "-=0.5"
    )
    .to(
      "nav.navbar",
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    );

  // After 5 seconds, fade out the intro section
  setTimeout(() => {
    gsap.to(".intro-section", {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        document.querySelector(".intro-section").classList.add("hidden");
        document.querySelector(".intro-overlay").classList.add("hidden");
      },
    });
  }, 5000);

  // Initialize other features
  initThemeToggle();
  initLoader();
  initNavigation();
  initNetworkAnimation();
  initTypingAnimation();
  initScrollAnimations();
  initEnhancedProjectFilters();
  initEnhancedContactForm();
  initScrollToTop();
  initCounters();
  initEnhancedFooter();
  initProjectsCanvasAnimation();
  initProjectCardAnimations();
  initChatbot();
});
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  if (!themeToggle) {
    console.warn("Theme toggle button not found");
    return;
  }
  const savedTheme = localStorage.getItem("portfolio-theme") || "light";
  applyTheme(savedTheme);
  themeToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const currentTheme = htmlElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    themeToggle.style.transform = "scale(0.95)";
    setTimeout(() => {
      themeToggle.style.transform = "scale(1)";
    }, 150);
  });
}
function applyTheme(theme) {
  const htmlElement = document.documentElement;
  htmlElement.removeAttribute("data-theme");
  setTimeout(() => {
    htmlElement.setAttribute("data-theme", theme);
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      const track = themeToggle.querySelector(".theme-toggle-track");
      const thumb = themeToggle.querySelector(".theme-toggle-thumb");
      const divColour = document.querySelectorAll(".skill-item");
      const txtColor = document.querySelectorAll(".skill-name");
      const serviceCard = document.querySelectorAll(".service-card");
      const form = document.querySelector(".contact-form-container");
      const contact = document.querySelector(".contact");
      const Ccard = document.querySelectorAll(".contact-card");
      const social = document.querySelector(".social-media-hub");
      const projectS = document.querySelector(".projects");
      const serviceS = document.querySelector(".services");
      const skillsS = document.querySelector(".skills");
      const aboutDes = document.querySelector(".about-description");
      if (track && thumb) {
        if (theme === "dark") {
          track.style.backgroundColor = "var(--color-primary)";
          track.style.borderColor = "var(--color-primary)";
          thumb.style.transform = "translateX(28px)";
          form.style.background = "white";
          contact.style.background = "black";
          social.style.background = "white";
          projectS.style.background = "black";
          serviceS.style.background = "black";
          aboutDes.style.color = "white";
          skillsS.style.background = "black";
          divColour.forEach((div) => {
            div.style.backgroundColor = "white";
          });
          serviceCard.forEach((div) => {
            div.style.backgroundColor = "white";
          });
          txtColor.forEach((txt) => {
            txt.style.color = "black";
          });
          Ccard.forEach((C) => {
            C.style.backgroundColor = "#01e6ff2b";
          });
        } else {
          track.style.backgroundColor = "var(--color-border)";
          track.style.borderColor = "var(--color-border)";
          thumb.style.transform = "translateX(0px)";
          form.style.background = "var(--colour-surface";
          contact.style.background = "var(--color-bg-6)";
          social.style.background = "white";
          projectS.style.background = "var(--color-bg-3)";
          serviceS.style.background = "var(--colour-surface";
          skillsS.style.background = "var(--colour-surface";
          aboutDes.style.color = "black";
          divColour.forEach((div) => {
            div.style.background = "var(--color-bg-2)";
          });
          serviceCard.forEach((div) => {
            div.style.background = "var(--color-bg-4)";
          });
          txtColor.forEach((txt) => {
            txt.style.color = "black";
          });
          Ccard.forEach((C) => {
            C.style.backgroundColor = "var(--color-bg-6";
          });
        }
      }
    }
    document.body.style.display = "none";
    document.body.offsetHeight;
    document.body.style.display = "";
  }, 10);
}
function initLoader() {
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add("hidden");
        setTimeout(() => {
          startHeroAnimations();
        }, 500);
      }
    }, 2000);
  });
}
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", (e) => {
      e.preventDefault();
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (navMenu && navToggle) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const targetId = href.substring(1);
        if (typeof window.scrollToSection === "function") {
          window.scrollToSection(targetId);
        } else {
          const section = document.getElementById(targetId);
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    });
  });
  let lastScrollTop = 0;
  window.addEventListener(
    "scroll",
    debounce(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (navbar) {
        if (scrollTop > 100) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
      updateActiveNavLink();
      if (typeof updateScrollProgress === "function") {
        updateScrollProgress();
      }
      lastScrollTop = scrollTop;
    }, 10)
  );
}
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (sections.length === 0 || navLinks.length === 0) return;
  let current = "";
  const scrollPosition = window.pageYOffset + 150;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute("id");
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = sectionId;
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href && href.substring(1) === current) {
      link.classList.add("active");
    }
  });
}
function initNetworkAnimation() {
  const canvas = document.getElementById("networkCanvas");
  if (!canvas) {
    console.warn("Network canvas not found");
    return;
  }
  const ctx = canvas.getContext("2d");
  let animationId;
  const nodes = [];
  const nodeCount = 120;
  const maxDistance = 200;
  let mouse = { x: 0, y: 0 };
  let time = 0;
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  function initNodes() {
    nodes.length = 0;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        jitterTime: Math.random() * 1000,
      });
    }
  }
  function updateNodes() {
    time += 0.02;
    nodes.forEach((node, index) => {
      const jitterStrength = 0.005;
      node.vx += (Math.random() - 0.5) * jitterStrength;
      node.vy += (Math.random() - 0.5) * jitterStrength;
      node.vx *= 0.999;
      node.vy *= 0.999;
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > canvas.width) {
        node.vx *= -1;
        node.vx += (Math.random() - 0.5) * 0.1;
      }
      if (node.y < 0 || node.y > canvas.height) {
        node.vy *= -1;
        node.vy += (Math.random() - 0.5) * 0.1;
      }
      node.x = Math.max(0, Math.min(canvas.width, node.x));
      node.y = Math.max(0, Math.min(canvas.height, node.y));
      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150) {
        const force = (150 - distance) / 150;
        const forceMultiplier = 0.002;
        const attractionMode = index % 3 === 0 ? -1 : 1;
        node.vx += dx * force * forceMultiplier * attractionMode;
        node.vy += dy * force * forceMultiplier * attractionMode;
      }
      node.alpha = 0.3 + Math.sin(time * 2 + node.pulsePhase) * 0.2;
      const maxSpeed = 2;
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed > maxSpeed) {
        node.vx = (node.vx / speed) * maxSpeed;
        node.vy = (node.vy / speed) * maxSpeed;
      }
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < maxDistance) {
          const baseOpacity = (1 - distance / maxDistance) * 0.4;
          const pulseEffect = Math.sin(time * 3 + (i + j) * 0.1) * 0.1 + 1;
          const finalOpacity = baseOpacity * pulseEffect;
          const baseWidth = (1 - distance / maxDistance) * 2 + 0.5;
          const pulseWidth = Math.sin(time * 4 + distance * 0.01) * 0.3 + 1;
          const finalWidth = Math.max(0.1, baseWidth * pulseWidth);
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(
            0,
            Math.min(1, finalOpacity)
          )})`;
          ctx.lineWidth = finalWidth;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach((node, index) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${node.alpha})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
      const glowIntensity = Math.sin(time * 3 + index * 0.1) * 0.3 + 0.7;
      ctx.shadowColor = `rgba(255, 255, 255, ${0.5 * glowIntensity})`;
      ctx.shadowBlur = 8 * glowIntensity;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      if (index % 7 === 0) {
        const sparkleAlpha = Math.sin(time * 5 + index) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${sparkleAlpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }
  function animate() {
    updateNodes();
    draw();
    animationId = requestAnimationFrame(animate);
  }
  let mouseTarget = { x: 0, y: 0 };
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseTarget.x = e.clientX - rect.left;
    mouseTarget.y = e.clientY - rect.top;
  });
  function updateMouse() {
    mouse.x += (mouseTarget.x - mouse.x) * 0.1;
    mouse.y += (mouseTarget.y - mouse.y) * 0.1;
  }
  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouseTarget.x = touch.clientX - rect.left;
    mouseTarget.y = touch.clientY - rect.top;
  });
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouseTarget.x = touch.clientX - rect.left;
    mouseTarget.y = touch.clientY - rect.top;
  });
  canvas.addEventListener("mouseleave", () => {
    mouseTarget.x = canvas.width / 2;
    mouseTarget.y = canvas.height / 2;
  });
  resizeCanvas();
  initNodes();
  mouse.x = canvas.width / 2;
  mouse.y = canvas.height / 2;
  mouseTarget.x = canvas.width / 2;
  mouseTarget.y = canvas.height / 2;
  function enhancedAnimate() {
    updateMouse();
    updateNodes();
    draw();
    animationId = requestAnimationFrame(enhancedAnimate);
  }
  enhancedAnimate();
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
      initNodes();
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
      mouseTarget.x = canvas.width / 2;
      mouseTarget.y = canvas.height / 2;
    }, 250);
  });
  networkAnimation = {
    canvas,
    animationId,
    cleanup: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    },
  };
}
function initTypingAnimation() {
  const typingText = document.getElementById("typing-text");
  if (!typingText) return;
  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ];
  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;
  let isAnimating = false;
  function type() {
    if (isAnimating) return;
    isAnimating = true;
    const currentRole = roles[currentRoleIndex];
    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 75;
    } else {
      typingText.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 150;
    }
    if (!isDeleting && currentCharIndex === currentRole.length) {
      setTimeout(() => {
        isDeleting = true;
        isAnimating = false;
        type();
      }, 2000);
      return;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      typingSpeed = 500;
    }
    setTimeout(() => {
      isAnimating = false;
      type();
    }, typingSpeed);
  }
  setTimeout(() => {
    type();
  }, 1500);
}
function startHeroAnimations() {
  const heroElements = document.querySelectorAll(".hero-text > *");
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200);
  });
}
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        if (entry.target.classList.contains("skills")) {
          setTimeout(() => {
            animateSkills();
          }, 300);
        }
        if (entry.target.classList.contains("about")) {
          setTimeout(() => {
            animateCounters();
          }, 300);
        }
        if (entry.target.classList.contains("contact")) {
          setTimeout(() => {
            animateContactStats();
          }, 300);
        }
      }
    });
  }, observerOptions);
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item, index) => {
    setTimeout(() => {
      observer.observe(item);
    }, index * 100);
  });
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      observer.observe(card);
    }, index * 200);
  });
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    setTimeout(() => {
      observer.observe(card);
    }, index * 300);
  });
}
function animateSkills() {
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("animate");
      const progressFill = item.querySelector(".progress-fill");
      const skillLevel = item.getAttribute("data-skill");
      if (progressFill && skillLevel) {
        setTimeout(() => {
          progressFill.style.width = skillLevel + "%";
        }, 200);
      }
    }, index * 150);
  });
}
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    if (isNaN(target)) return;
    const increment = target / 50;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = `${Math.floor(current)} +`;
    }, 50);
  });
}
function animateContactStats() {
  const statValues = document.querySelectorAll(".stat-value[data-target]");
  statValues.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    if (isNaN(target)) return;
    const increment = target / 30;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current);
    }, 100);
  });
}
function initCounters() {}
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      projectCards.forEach((card, index) => {
        const category = card.getAttribute("data-category");
        setTimeout(() => {
          if (filter === "all" || category === filter) {
            card.classList.remove("hidden");
            card.style.animation = "fadeInUp 0.5s ease forwards";
          } else {
            card.classList.add("hidden");
          }
        }, index * 100);
      });
    });
  });
}
function initProjectsCanvasAnimation() {
  const canvas = document.getElementById("projectsCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let animationId;
  const particles = [];
  const particleCount = 40;
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 4 + 2,
        alpha: Math.random() * 0.4 + 0.2,
        hue: Math.random() * 60 + 30,
        pulse: Math.random() * 0.02 + 0.01,
      });
    }
  }
  function updateParticles() {
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      particle.alpha += Math.sin(Date.now() * particle.pulse) * 0.01;
      particle.alpha = Math.max(0.1, Math.min(0.6, particle.alpha));
    });
  }
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 3
      );
      gradient.addColorStop(
        0,
        `hsla(${particle.hue}, 70%, 60%, ${particle.alpha})`
      );
      gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, ${
        particle.alpha * 0.8
      })`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          const opacity = (1 - distance / 120) * 0.15;
          ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  function animate() {
    updateParticles();
    drawParticles();
    animationId = requestAnimationFrame(animate);
  }
  resizeCanvas();
  initParticles();
  animate();
  window.addEventListener(
    "resize",
    debounce(() => {
      resizeCanvas();
      initParticles();
    }, 250)
  );
  projectsAnimation = {
    canvas,
    animationId,
    cleanup: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    },
  };
}
function initProjectCardAnimations() {
  const projectCards = document.querySelectorAll(".enhanced-card");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("revealed");
            animateCompletionBar(entry.target);
            setupCardInteractions(entry.target);
          }, index * 200);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );
  projectCards.forEach((card) => {
    revealObserver.observe(card);
  });
}
function setupCardInteractions(card) {
  card.addEventListener("mouseenter", () => {
    if (!card.classList.contains("flipped")) {
      setTimeout(() => {
        card.classList.add("flipped");
      }, 200);
    }
  });
  card.addEventListener("mouseleave", () => {
    card.classList.remove("flipped");
  });
  setupMagneticHover(card);
  setupClickRipple(card);
  setupParallaxLayers(card);
  setupCardParticles(card);
  setupGlowEffect(card);
}
function setupMagneticHover(card) {
  let isHovering = false;
  card.addEventListener("mouseenter", () => {
    isHovering = true;
  });
  card.addEventListener("mouseleave", () => {
    isHovering = false;
    card.style.transform = "";
  });
  card.addEventListener("mousemove", (e) => {
    if (!isHovering) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / 30;
    const deltaY = (e.clientY - centerY) / 30;
    card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale(1.02)`;
  });
}
function setupClickRipple(card) {
  card.addEventListener("click", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const ripple = document.createElement("div");
        ripple.style.cssText = `
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    transform: scale(0);
                    animation: cardRipple 1.2s ease-out;
                    left: ${x}px;
                    top: ${y}px;
                    z-index: 10;
                `;
        card.style.position = "relative";
        card.appendChild(ripple);
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.remove();
          }
        }, 1200);
      }, i * 100);
    }
  });
}
function setupParallaxLayers(card) {
  const layers = card.querySelectorAll(".parallax-layer");
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const deltaX = (mouseX - centerX) / centerX;
    const deltaY = (mouseY - centerY) / centerY;
    layers.forEach((layer, index) => {
      const multiplier = (index + 1) * 15;
      const translateX = deltaX * multiplier;
      const translateY = deltaY * multiplier;
      layer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${
        1 + index * 0.1
      })`;
    });
  });
  card.addEventListener("mouseleave", () => {
    layers.forEach((layer) => {
      layer.style.transform = "translate(0px, 0px) scale(1)";
    });
  });
}
function setupCardParticles(card) {
  const particleContainer = card.querySelector(".card-particles");
  if (!particleContainer) return;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = card.offsetWidth;
  canvas.height = card.offsetHeight;
  canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-radius: inherit;
        z-index: 1;
    `;
  particleContainer.appendChild(canvas);
  const particles = [];
  let animationId;
  card.addEventListener("mouseenter", () => {
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: Math.random() * 3 + 1,
        alpha: Math.random() * 0.8 + 0.2,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.01,
        hue: Math.random() * 60 + 30,
      });
    }
    animate();
  });
  card.addEventListener("mouseleave", () => {});
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      p.alpha = p.life * 0.8;
      p.vy += 0.02;
      p.vx *= 0.99;
      p.vy *= 0.99;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.radius * 3
      );
      gradient.addColorStop(0, `hsla(${p.hue}, 70%, 60%, ${p.alpha})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 70%, 60%, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    if (particles.length > 0) {
      animationId = requestAnimationFrame(animate);
    }
  }
}
function setupGlowEffect(card) {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow =
      "0 0 30px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.2)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "";
  });
}
function animateCompletionBar(card) {
  const completionBar = card.querySelector(".completion-fill");
  const completion = card.getAttribute("data-completion");
  if (completionBar && completion) {
    setTimeout(() => {
      completionBar.style.width = completion + "%";
    }, 800);
  }
}
function initTypingAnimation() {
  const typingText = document.getElementById("typing-text");
  if (!typingText) return;
  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ];
  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;
  let isAnimating = false;
  function type() {
    if (isAnimating) return;
    isAnimating = true;
    const currentRole = roles[currentRoleIndex];
    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 75;
    } else {
      typingText.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 150;
    }
    if (!isDeleting && currentCharIndex === currentRole.length) {
      setTimeout(() => {
        isDeleting = true;
        isAnimating = false;
        type();
      }, 2000);
      return;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      typingSpeed = 500;
    }
    setTimeout(() => {
      isAnimating = false;
      type();
    }, typingSpeed);
  }
  setTimeout(() => {
    type();
  }, 1500);
}
function initEnhancedProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".enhanced-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      btn.style.transform = "scale(0.95)";
      btn.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.6)";
      setTimeout(() => {
        btn.style.transform = "scale(1.05)";
        setTimeout(() => {
          btn.style.transform = "";
          btn.style.boxShadow = "";
        }, 200);
      }, 150);
      animateProjectFilter(projectCards, filter);
    });
  });
}
function animateProjectFilter(cards, filter) {
  cards.forEach((card, index) => {
    const category = card.getAttribute("data-category");
    const shouldShow = filter === "*" || category === filter;
    if (!shouldShow) {
      card.style.transform = "scale(0.8) rotateY(90deg)";
      card.style.opacity = "0";
      setTimeout(() => {
        card.style.display = "none";
      }, 500);
    }
  });
  setTimeout(() => {
    let visibleIndex = 0;
    cards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const shouldShow = filter === "*" || category === filter;
      if (shouldShow) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.transform = "scale(1) rotateY(0deg)";
          card.style.opacity = "1";
          setTimeout(() => {
            card.style.transform = "scale(1.05) rotateY(0deg)";
            setTimeout(() => {
              card.style.transform = "scale(1) rotateY(0deg)";
            }, 100);
          }, 200);
        }, visibleIndex * 150);
        visibleIndex++;
      }
    });
  }, 300);
}
function startHeroAnimations() {
  const heroElements = document.querySelectorAll(".hero-text > *");
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200);
  });
}
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        if (entry.target.classList.contains("skills")) {
          setTimeout(() => {
            animateSkills();
          }, 300);
        }
        if (entry.target.classList.contains("about")) {
          setTimeout(() => {
            animateCounters();
          }, 300);
        }
        if (entry.target.classList.contains("contact")) {
          setTimeout(() => {
            animateContactStats();
          }, 300);
        }
      }
    });
  }, observerOptions);
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item, index) => {
    setTimeout(() => {
      observer.observe(item);
    }, index * 100);
  });
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    setTimeout(() => {
      observer.observe(card);
    }, index * 300);
  });
}
function initFloatingLabels() {
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((group) => {
    const input = group.querySelector(".form-control");
    if (!input) return;
    input.addEventListener("focus", () => {
      group.classList.add("focused");
    });
    input.addEventListener("blur", () => {
      if (!input.value.trim()) {
        group.classList.remove("focused");
      }
    });
    if (input.value.trim()) {
      group.classList.add("focused");
    }
  });
}
function resetFloatingLabels() {
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((group) => {
    group.classList.remove("focused");
  });
}
function validateForm(data) {
  const { name, email, subject, message } = data;
  if (!name || !email || !subject || !message) {
    showNotification("Please fill in all fields", "error");
    return false;
  }
  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return false;
  }
  return true;
}
function animateSubmitButton(btn, callback) {
  if (!btn) return;
  btn.classList.add("loading");
  btn.disabled = true;
  setTimeout(() => {
    btn.classList.remove("loading");
    btn.disabled = false;
    callback();
  }, 2000);
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification--${type}`;
  const icon =
    type === "success" ? "check" : type === "error" ? "times" : "info";
  const color =
    type === "success" ? "#10B981" : type === "error" ? "#EF4444" : "#3B82F6";
  notification.innerHTML = `
        <i class="fas fa-${icon}-circle"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 350px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        background: ${color};
        backdrop-filter: blur(10px);
    `;
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 14px;
        opacity: 0.8;
        padding: 4px;
        border-radius: 50%;
        transition: all 0.2s ease;
    `;
  closeBtn.addEventListener("click", () => {
    removeNotification(notification);
  });
  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.opacity = "1";
    closeBtn.style.background = "rgba(255, 255, 255, 0.2)";
  });
  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.opacity = "0.8";
    closeBtn.style.background = "none";
  });
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);
}
function removeNotification(notification) {
  if (!notification.parentNode) return;
  notification.style.transform = "translateX(400px)";
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}
function initEnhancedFooter() {
  const linkTiles = document.querySelectorAll(".link-tile");
  linkTiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {
      e.preventDefault();
      const href = tile.getAttribute("href");
      if (href && href.startsWith("#")) {
        const sectionId = href.substring(1);
        scrollToSection(sectionId);
      }
    });
  });
  const socialOrbits = document.querySelectorAll(".social-orbit");
  socialOrbits.forEach((orbit) => {
    orbit.addEventListener("mouseenter", () => {
      orbit.style.animationPlayState = "paused";
    });
    orbit.addEventListener("mouseleave", () => {
      orbit.style.animationPlayState = "running";
    });
  });
  initFooterTypingAnimation();
}
function initFooterTypingAnimation() {
  const typingName = document.querySelector(".typing-name");
  if (!typingName) return;
  const text = "Anubhav Singh";
  let index = 0;
  let isTyping = true;
  function typeFooterName() {
    if (isTyping) {
      if (index < text.length) {
        typingName.textContent = text.substring(0, index + 1);
        index++;
        setTimeout(typeFooterName, 150);
      } else {
        setTimeout(() => {
          isTyping = false;
          typeFooterName();
        }, 2000);
      }
    } else {
      if (index > 0) {
        typingName.textContent = text.substring(0, index - 1);
        index--;
        setTimeout(typeFooterName, 100);
      } else {
        setTimeout(() => {
          isTyping = true;
          typeFooterName();
        }, 1000);
      }
    }
  }
  setTimeout(() => {
    typeFooterName();
  }, 3000);
}
function initEnhancedContactForm() {
  // Initialize message counter from localStorage
  let messageCount = parseInt(
    localStorage.getItem("contactFormMessageCount") || "0"
  );

  // Function to update message counter
  function updateMessageCounter() {
    messageCount++;
    localStorage.setItem("contactFormMessageCount", messageCount.toString());

    const counterElement = document.getElementById("messageCounter");
    const counterBadge = document.getElementById("counterBadge");

    if (counterElement && counterBadge) {
      counterBadge.textContent = messageCount;
      counterBadge.classList.add("new-message");

      // Show counter if hidden
      if (counterElement.style.display === "none") {
        counterElement.style.display = "inline-flex";
      }

      // Remove animation class after animation completes
      setTimeout(() => {
        counterBadge.classList.remove("new-message");
      }, 1000);
    }
  }

  // Restore counter on page load
  if (messageCount > 0) {
    const counterElement = document.getElementById("messageCounter");
    const counterBadge = document.getElementById("counterBadge");
    if (counterElement && counterBadge) {
      counterBadge.textContent = messageCount;
      counterElement.style.display = "inline-flex";
    }
  }

  async function handleContactForm(e) {
    e.preventDefault();
    const customerEmail = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const userSubject = document.getElementById("subject").value;
    const userMessage = document.getElementById("message").value;
    showNotification("sending....", "send");
    const getCustomerMessage = () => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff; color: #333;">
    <h2 style="color: #6d28d9; margin-bottom: 18px; font-size: 22px;">Hello ${username}, 👋</h2>

    <p style="line-height: 1.7; font-size: 15px; margin-bottom: 14px;">
      Thank you for reaching out — your message has been successfully received!
    </p>

    <p style="line-height: 1.7; font-size: 15px; margin-bottom: 14px;">
      I truly appreciate your interest, and I'll get back to you as soon as possible.
    </p>

    <p style="line-height: 1.7; font-size: 15px; margin-bottom: 14px;">
      While you wait, feel free to take a look at my work and online presence:
    </p>

    <ul style="padding-left: 18px; margin-bottom: 18px; font-size: 15px; line-height: 1.7;">
      <li><a href="https://github.com/anubhavsingh2027" target="_blank" style="color: #6d28d9; text-decoration: none;">GitHub Projects</a></li>
      <li><a href="https://www.linkedin.com/in/anubhav-singh-09b71829b/" target="_blank" style="color: #6d28d9; text-decoration: none;">LinkedIn</a></li>
      <li><a href="https://anubhav.nav-code.com/" target="_blank" style="color: #6d28d9; text-decoration: none;">Portfolio Website</a></li>
    </ul>

    <p style="line-height: 1.7; font-size: 15px;">
      Thanks again for getting in touch — talk soon!
    </p>

    <p style="line-height: 1.7; font-size: 15px; margin-top: 24px;">
      Warm regards,<br/>
      <strong style="color:#000;">Anubhav Singh</strong>
    </p>

    <div style="margin-top: 28px; padding: 12px; background: #f9f9f9; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee;">
      ✉️ Sent from <strong>Anubhav Portfolio</strong>
    </div>
  </div>
`;

    const getHostMessage = () => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #ffffff; color: #333;">
    <h2 style="color: #6d28d9; margin-bottom: 16px;">📩 New Customer Enquiry</h2>
    <p style="line-height: 1.6; font-size: 15px; margin-bottom: 8px;">
      <strong>Name:</strong> ${username}
    </p>
    <p style="line-height: 1.6; font-size: 15px; margin-bottom: 8px;">
      <strong>Email:</strong> <a href="mailto:${customerEmail}" style="color: #6d28d9; text-decoration: none;">${customerEmail}</a>
    </p>
    <p style="line-height: 1.6; font-size: 15px; margin-bottom: 8px;">
      <strong>Phone:</strong> ${phone}
    </p>
    <p style="line-height: 1.6; font-size: 15px; margin-bottom: 8px;">
      <strong>Subject:</strong> ${userSubject}
    </p>
    <p style="line-height: 1.6; font-size: 15px; margin-top: 16px;"><strong>Message:</strong></p>
    <blockquote style="border-left: 4px solid #6d28d9; margin: 12px 0; padding-left: 12px; color: #444; font-style: italic; background: #fafafa; border-radius: 4px;">
      ${userMessage}
    </blockquote>
    <div style="margin-top: 25px; padding: 10px; background: #f9f9f9; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee;">
      🚀 Sent from Contact Form
    </div>
  </div>
`;
    async function sendEmail(payload) {
      try {
        const response = await fetch(
          "https://mail-api-iuw1zw.fly.dev/sendMail",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();
        if (data.success) {
          setTimeout(() => {
            const form = document.getElementById("contactForm");
            form.reset();
            const inputs = form.querySelectorAll(".input");
            inputs.forEach((input) => {
              input.parentNode.classList.remove("focus");
            });
            showNotification("Message sent successfully!", "success");

            // Update message counter
            updateMessageCounter();
          }, 10);
        }
      } catch (err) {
        showNotification("Error Occurred !", "error");
      }
    }
    await sendEmail({
      to: customerEmail,
      subject: "🎉 Thank you for contacting us!",
      websiteName: "Anubhav singh Portfolio ",
      message: getCustomerMessage(),
    });
    await sendEmail({
      to: "anubhavsinghcustomer@gmail.com",
      subject: "📩 New Customer Enquiry",
      websiteName: "Anubhav singh Portfolio ",
      message: getHostMessage(),
    });
  }
  document
    .getElementById("contactForm")
    .addEventListener("submit", handleContactForm);

  async function handlefastmessage(e) {
    e.preventDefault();
    const fastEmail = document.getElementById("fastemail").value;
    showNotification("sending....", "send");
    const getCustomerMessage = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #ffffff; color: #333;">
    <h1 style="color: #dc2626; margin-bottom: 20px; font-size: 22px; text-align: center;">
      🚀 Fast Response Request
    </h1>
    <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
      You can reply directly via email:
    </p>
    <p style="text-align: center; margin-bottom: 20px;">
      <a href="mailto:${fastEmail}" style="display: inline-block; padding: 12px 20px; background: #dc2626; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
        📧 Reply Now
      </a>
    </p>
    <div style="margin-top: 25px; padding: 10px; background: #f9f9f9; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee;">
      ⚡ Fast-response system notification
    </div>
  </div>
`;
    async function sendEmail(payload) {
      try {
        const response = await fetch(
          "https://mail-api-iuw1zw.fly.dev/sendMail",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();
        if (data.success) {
          setTimeout(() => {
            const form = document.getElementById("newsletter-form");
            form.reset();
            showNotification("Message sent successfully!", "success");
          }, 10);
        }
      } catch (err) {
        showNotification("Error Occurred !", "error");
      }
    }
    await sendEmail({
      to: "anubhavsinghcustomer@gmail.com",
      subject: "Urget Message ",
      websiteName: "Anubhav singh Portfolio ",
      message: getCustomerMessage(username),
    });
  }
  document
    .getElementById("newsletter-form")
    .addEventListener("submit", handlefastmessage);
  const inputs = document.querySelectorAll(".input");
  function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
  }
  function blurFunc() {
    let parent = this.parentNode;
    if (this.value === "") {
      parent.classList.remove("focus");
    } else {
      parent.classList.add("focus");
    }
  }
  inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
  });
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", navHighlighter);
  function navHighlighter() {
    let scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(".nav-menu a[href*=" + sectionId + "]")
          .classList.add("active-link");
      } else {
        document
          .querySelector(".nav-menu a[href*=" + sectionId + "]")
          .classList.remove("active-link");
      }
    });
  }
  const textarea = document.getElementById("message");
  const shadow = document.createElement("div");
  shadow.style.position = "absolute";
  shadow.style.visibility = "hidden";
  shadow.style.whiteSpace = "pre-wrap";
  shadow.style.wordWrap = "break-word";
  shadow.style.width = textarea.offsetWidth + "px";
  shadow.style.font = window.getComputedStyle(textarea).font;
  document.body.appendChild(shadow);
  textarea.addEventListener("input", () => {
    shadow.textContent = textarea.value + "\u200b";
    textarea.style.height = shadow.scrollHeight + "px";
  });
}
function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scroll-top");
  if (!scrollTopBtn) return;
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
function updateScrollProgress() {
  const scrollTopBtn = document.getElementById("scroll-top");
  const progressRing = scrollTopBtn?.querySelector(".scroll-progress");
  if (!progressRing) return;
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
  const circumference = 2 * Math.PI * 27;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (scrollPercent / 100) * circumference;
  progressRing.style.strokeDasharray = strokeDasharray;
  progressRing.style.strokeDashoffset = strokeDashoffset;
}
document.addEventListener(
  "mousemove",
  debounce((e) => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      const floatingElements = document.querySelectorAll(".floating-element");
      floatingElements.forEach((element, index) => {
        const modifier = (index + 1) * 0.5;
        element.style.transform = `translate(${x * modifier}px, ${
          y * modifier
        }px)`;
      });
    }
  }, 16)
);
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const socialButtons = document.querySelectorAll(".social-button");
    socialButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const ripple = document.createElement("div");
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripple.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    transform: scale(0);
                    animation: ripple-effect 0.6s ease-out;
                    left: ${x}px;
                    top: ${y}px;
                `;
        button.style.position = "relative";
        button.appendChild(ripple);
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.remove();
          }
        }, 600);
      });
    });
  }, 1000);
});
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    if (navMenu && navToggle && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
    const notifications = document.querySelectorAll(".notification");
    notifications.forEach((notification) => {
      removeNotification(notification);
    });
  }
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "1":
        e.preventDefault();
        scrollToSection("home");
        break;
      case "2":
        e.preventDefault();
        scrollToSection("about");
        break;
      case "3":
        e.preventDefault();
        scrollToSection("skills");
        break;
      case "4":
        e.preventDefault();
        scrollToSection("projects");
        break;
      case "5":
        e.preventDefault();
        scrollToSection("services");
        break;
      case "6":
        e.preventDefault();
        scrollToSection("contact");
        break;
    }
  }
});
function preloadImages() {
  const imageUrls = [
    "https://img.icons8.com/color/48/000000/html-5--v1.png",
    "https://img.icons8.com/color/48/000000/css3.png",
    "https://img.icons8.com/color/48/000000/javascript--v1.png",
    "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png",
    "https://img.icons8.com/color/48/000000/nodejs.png",
    "https://img.icons8.com/fluency/48/000000/node-js.png",
    "https://img.icons8.com/color/48/000000/mongodb.png",
    "https://img.icons8.com/color/48/000000/mysql-logo.png",
    "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png",
    "https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png",
    "https://img.icons8.com/color/48/000000/python--v1.png",
    "https://img.icons8.com/color/48/000000/c-programming.png",
    "https://img.icons8.com/color/48/000000/visual-studio-code-2019.png",
    "https://img.icons8.com/color/48/000000/git.png",
    "https://img.icons8.com/glyph-neue/48/ffffff/github.png",
  ];
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}
preloadImages();
function handleMissingElements() {
  const requiredElements = [
    "navbar",
    "nav-toggle",
    "nav-menu",
    "networkCanvas",
    "typing-text",
    "main-contact-form",
    "scroll-top",
    "theme-toggle",
  ];
  requiredElements.forEach((id) => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with id '${id}' not found`);
    }
  });
}
document.addEventListener("DOMContentLoaded", handleMissingElements);
function logPerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0];
        if (perfData) {
        }
      }, 0);
    });
  }
}
logPerformance();
window.addEventListener("beforeunload", () => {
  if (networkAnimation && networkAnimation.cleanup) {
    networkAnimation.cleanup();
  }
});
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const revealElements = document.querySelectorAll(
      ".stat-card, .contact-card, .link-tile"
    );
    revealElements.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${
        index * 0.1
      }s`;
      revealObserver.observe(el);
    });
  }, 1000);
});
function addSmoothTransitions() {
  const elements = document.querySelectorAll("*");
  elements.forEach((el) => {
    if (!el.style.transition && !el.classList.contains("no-transition")) {
      el.style.transition = "all 0.3s ease";
    }
  });
}
setTimeout(addSmoothTransitions, 2000);

function initChatbot() {
  const chatFab = document.getElementById("chatFab");
  const chatbot = document.getElementById("chatbot");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const sendMessage = document.getElementById("sendMessage");
  const quickBtns = document.querySelectorAll(".quick-btn");
  const knowledgeBase = {
    personal: {
      name: "Anubhav Singh",
      age: 20,
      dob: "June 5, 2005",
      location: "Varanasi, India",
      education:
        "Computer Science and Engineering with AI specialization (2023-2027)",
      email: "anubhavsingh2027@gmail.com",
    },
    achievements: [
      "Solved 500+ LeetCode problems across all difficulty levels",
      "Achieved 5-Star rating in C++ on HackerRank platform",
      "Built and deployed 15+ full-stack web applications",
      "Specialized in AI and Machine Learning technologies",
    ],
    skills: {
      frontend: {
        HTML: "95% - Expert level with semantic markup",
        CSS: "90% - Advanced styling and animations",
        JavaScript: "85% - Modern ES6+ and async programming",
        React: "80% - Component-based architecture",
      },
      backend: {
        "C++": "90% - Data structures and algorithms",
        "Node.js": "85% - Server-side JavaScript",
        MongoDB: "80% - NoSQL database operations",
        Python: "75% - AI/ML and web development",
      },
    },
    projects: {
      phishshield: {
        name: "PhishShield",
        description:
          "A cybersecurity platform with real-time phishing detection using advanced URL-scanning and blacklisted domain checks. Includes secure authentication, user dashboard, and automated threat analysis.",
        technologies: [
          "HTML",
          "CSS",
          "JavaScript",
          "Node.js",
          "Express.js",
          "MongoDB",
        ],
        sourceCode: "https://github.com/anubhavsingh2027/Phishsheild",
        liveLink: "https://phishshield.nav-code.com",
      },

      todo: {
        name: "Smart To-Do",
        description:
          "A MERN-based task manager application that allows users to add, update, and organize everyday tasks with clean UI and persistent database storage.",
        technologies: ["MongoDB", "Express.js", "React", "Node.js", "REST API"],
        github: "https://github.com/anubhavsingh2027/Todo-App",
        liveLink: "https://todo-app-jade-six-65.vercel.app",
      },

      kashika: {
        name: "Kashi Route",
        description:
          "Tourism and travel platform for Varanasi offering car rentals, guided tours, heritage highlights, and seamless navigation support.",
        technologies: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/anubhavsingh2027/KashiRoute",
        liveLink: "https://kashi-route.vercel.app/",
      },

      weather: {
        name: "Weather Forecasting App",
        description:
          "Responsive weather application providing real-time forecasts and climate insights using OpenWeather API.",
        technologies: ["JavaScript", "OpenWeather API", "Responsive UI"],
        github:
          "https://github.com/anubhavsingh2027/anubhavsingh2027-Weather-Website",
        liveLink: "https://weather-website-rosy.vercel.app/",
      },

      aitools: {
        name: "AI Tools Directory",
        description:
          "A categorized directory with 600+ AI tools featuring keyword-based search and filter for quick discovery.",
        technologies: ["HTML", "CSS", "JavaScript", "Search Algorithms"],
        github: "https://github.com/anubhavsingh2027/typeMaster",
        liveLink: "https://ai-tools-directory-seven-jade.vercel.app/",
      },

      typingMaster: {
        name: "Typing Master",
        description:
          "Interactive typing test platform that tracks typing speed (WPM) and accuracy in real-time.",
        technologies: ["JavaScript", "Real-time Calculation"],
        github: "https://github.com/anubhavsingh2027/TypingMaster",
        liveLink: "https://typingmaster.nav-code.com/",
      },

      stress: {
        name: "Stress Relief Website",
        description:
          "Relaxation experience website with calming animations and soothing audio interactions to reduce stress.",
        technologies: ["JavaScript", "CSS Animations", "Audio API"],
        github:
          "https://github.com/anubhavsingh2027/Stress-Relief-Game-Website",
        liveLink: "https://stress-relief-game-website.vercel.app/",
      },

      cpp: {
        name: "C++ String Methods Project",
        description:
          "Reference-based project demonstrating commonly used C++ string methods for DSA learners.",
        technologies: ["C++", "String Manipulation", "Algorithm Logic"],
        github:
          "https://github.com/anubhavsingh2027/String_method_and_function",
      },

      airbnb: {
        name: "Airbnb Clone",
        description:
          "Full-stack rental booking web application replicating Airbnb features — property listings, authentication, reviews, booking workflows, and responsive UI.",
        technologies: [
          "React.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "REST APIs",
        ],
        github: "https://github.com/anubhavsingh2027/Airbnb-Clone",
        liveLink: "https://airbnb-clone-1u1y.onrender.com/",
      },

      chatting: {
        name: "Real-Time Chatting App",
        description:
          "WebSocket-powered real-time chat platform with secure authentication, active user presence, and instant message delivery. Includes clean UI and room-based messaging.",
        technologies: [
          "WebSocket",
          "Node.js",
          "Express.js",
          "MongoDB",
          "HTML",
          "CSS",
          "JavaScript",
        ],
        github: "https://github.com/anubhavsingh2027/Real-Time-Chatting",
        liveLink: "https://real-time-chatting.nav-code.com/",
      },
    },
  };

  if (chatbotClose) {
    chatbotClose.addEventListener("click", (e) => {
      e.preventDefault();
      chatbot.classList.add("hidden");

      chatFab.style.display = "";
    });
  }
  if (sendMessage) {
    sendMessage.addEventListener("click", (e) => {
      e.preventDefault();
      sendChatMessage();
    });
  }
  if (chatInput) {
    chatInput.removeAttribute("readonly");
    chatInput.removeAttribute("disabled");
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendChatMessage();
      }
    });
    chatInput.addEventListener("input", (e) => {});
  }
  quickBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const question = btn.getAttribute("data-question");
      addChatMessage(question, "user");
      setTimeout(() => {
        const response = getBotResponse(question);
        addChatMessage(response, "bot");
      }, 500);
    });
  });
  function sendChatMessage() {
    if (!chatInput) return;
    const message = chatInput.value.trim();
    if (!message) return;
    addChatMessage(message, "user");
    chatInput.value = "";
    setTimeout(() => {
      const response = getBotResponse(message);
      addChatMessage(response, "bot");
    }, 500);
  }
  function addChatMessage(message, sender) {
    if (!chatMessages) return;
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${sender}`;
    const avatar = document.createElement("div");
    avatar.className = "bot-avatar";
    avatar.textContent = sender === "user" ? "👤" : "🤖";
    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.innerHTML = message;
    bubble.style.color = "black";
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function getBotResponse(message) {
    const msg = message.toLowerCase().trim();

    // Helper function for keyword matching
    const matchesAny = (text, keywords) => {
      return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
    };

    if (
      // Greeting responses
      matchesAny(msg, ["hello", "hey", "greetings", "welcome"])
    ) {
      return "Certainly. I am chat Bot, Anubhav Singh's personal portfolio assistant. How may I assist you today?";
    }

    // Identity
    if (matchesAny(msg, ["who are you", "your name", "identity", "who"])) {
      return "I am Chat Bot. I was created by Anubhav Singh to serve as his personal portfolio assistant and provide information about his professional profile.";
    }

    if (matchesAny(msg, ["anubhav", "singh", "profile", "background"])) {
      return "Anubhav Singh is a distinguished Full Stack Developer and AI Enthusiast based in Varanasi, India. Currently pursuing B.Tech in Computer Science with AI specialization from PSIT Kanpur (Expected: 2027). <br><br><strong>Key Achievements:</strong> 600+ LeetCode problems solved, 5-star rating in C++ on HackerRank, 15+ full-stack applications deployed. His expertise spans MERN stack development, real-time systems, and modern UI/UX design.";
    }

    // Education
    if (
      matchesAny(msg, [
        "education",
        "college",
        "study",
        "university",
        "degree",
        "school",
      ])
    ) {
      return "Anubhav is pursuing a Bachelor of Technology in Computer Science and Engineering with Artificial Intelligence specialization from PSIT Kanpur, Batch 2027. His academic focus includes advanced algorithms, machine learning, and full-stack development methodologies.";
    }

    // Skills - Comprehensive
    if (
      matchesAny(msg, [
        "skill",
        "skills",
        "expertise",
        "technology",
        "technologies",
        "what can you do",
      ])
    ) {
      return "<strong>Technical Stack:</strong><br><strong>Frontend:</strong> HTML5, CSS3, JavaScript, React, Tailwind CSS<br><strong>Backend:</strong> Node.js, Express.js, WebSocket<br><strong>Databases:</strong> MongoDB, Firebase<br><strong>Programming Languages:</strong> C++, Java, Python, JavaScript<br><strong>Specializations:</strong> Full-stack MERN development, Data Structures &amp; Algorithms, Real-time systems, JWT Authentication, REST APIs, UI/UX Animations";
    }

    // Programming Languages
    if (
      matchesAny(msg, ["c++", "cpp", "java", "python", "programming language"])
    ) {
      return "Anubhav demonstrates advanced proficiency in:<br> <strong>C++</strong>: 5-star HackerRank rating, 600+ problems solved<br> <strong>Java</strong>: Object-oriented design and backend development<br> <strong>Python</strong>: Data science and automation scripts<br> <strong>JavaScript</strong>: Full-stack web development with modern ES6+ standards";
    }

    // LeetCode
    if (matchesAny(msg, ["leetcode", "600", "problems", "dsa", "algorithms"])) {
      return "Anubhav has solved <strong>600+ problems on LeetCode</strong>, demonstrating mastery across all difficulty levels. His solutions showcase proficiency in Data Structures, Algorithms, Dynamic Programming, and optimization techniques. His consistent practice reflects a deep commitment to computational excellence.";
    }

    // HackerRank
    if (matchesAny(msg, ["hackerrank", "5 star", "rating", "5-star"])) {
      return "Anubhav maintains a <strong>5-star rating in C++ on HackerRank</strong>, validating his advanced expertise in the language, competitive programming, and problem-solving capabilities. This achievement reflects his commitment to technical excellence.";
    }

    // Projects - Overview
    if (
      matchesAny(msg, [
        "project",
        "projects",
        "what have you built",
        "portfolio",
      ])
    ) {
      return "<strong>Featured Projects:</strong><br> <strong>Real-Time Chatting App</strong> - WebSocket communication system<br> <strong>PhishShield</strong> - ML-based phishing detection platform<br> <strong>This Portfolio</strong> - Interactive showcase with NAV-JARVIS assistant<br><br>I can provide detailed information about any project. Which would interest you?";
    }

    if (
      matchesAny(msg, [
        "chatting",
        "chat app",
        "websocket",
        "real-time",
        "messenger",
      ])
    ) {
      return "<strong>Real-Time Chatting Application</strong><br><br>A comprehensive WebSocket-powered messaging system featuring:<br> Instant message delivery with live user presence<br> JWT-based secure authentication<br> Room-based messaging architecture<br> Modern, responsive user interface<br><br><strong>Technologies:</strong> WebSocket, Node.js, Express.js, MongoDB, HTML, CSS, JavaScript";
    }

    // PhishShield
    if (
      matchesAny(msg, [
        "phishshield",
        "phishing",
        "security",
        "threat",
        "detection",
      ])
    ) {
      return "<strong>PhishShield - Intelligent Phishing Detection</strong><br><br>An advanced cybersecurity platform employing machine learning to detect fraudulent URLs and phishing threats:<br> URL pattern analysis and behavioral feature detection<br> Secure JWT-based user authentication<br> Interactive security dashboard<br> Automated threat analysis engine<br><br><strong>Technologies:</strong> HTML, Tailwind CSS, JavaScript, Node.js, Express.js, MongoDB";
    }

    // This Portfolio Website
    if (
      matchesAny(msg, [
        "this site",
        "this website",
        "portfolio website",
        "my portfolio",
      ])
    ) {
      return "<strong>Portfolio Website</strong><br><br>This interactive platform showcases Anubhav's professional capabilities through:<br> Smooth GSAP animations and canvas-based network effects<br> NAV-JARVIS intelligent assistant (myself)<br> Fully functional REST API for direct communication<br> Responsive, modern design demonstrating web development expertise<br><br>Built with HTML, CSS, JavaScript, and advanced animation libraries.";
    }

    // Contact Information
    if (
      matchesAny(msg, [
        "contact",
        "email",
        "phone",
        "reach",
        "call",
        "message",
        "how to contact",
      ])
    ) {
      return "<strong>Contact Information:</strong><br><br> <strong>Email:</strong> anubhavsingh2027@gmail.com<br> <strong>Phone/WhatsApp:</strong> 7355026966<br><br>Response time: Typically within 24 hours. Anubhav welcomes inquiries regarding opportunities and professional collaborations.";
    }

    // Direct Contact Number
    if (matchesAny(msg, ["number", "mobile", "whatsapp", "direct"])) {
      return "You can reach Anubhav directly at: <strong>7355026966</strong> via phone or WhatsApp.";
    }

    // GitHub
    if (
      matchesAny(msg, [
        "github",
        "repository",
        "repositories",
        "code",
        "source code",
      ])
    ) {
      return "Anubhav's GitHub profile: <strong>anubhavsingh2027</strong><br><br>His repositories contain comprehensive implementations of projects, algorithms, and open-source contributions. You can explore his complete portfolio at: <a href='https://github.com/anubhavsingh2027' target='_blank' style='color: #0066cc;'>github.com/anubhavsingh2027</a>";
    }

    // Social Media
    if (
      matchesAny(msg, [
        "linkedin",
        "twitter",
        "instagram",
        "social",
        "social media",
      ])
    ) {
      return "<strong>Professional Presence:</strong><br> LinkedIn - Professional network and endorsements<br> Twitter - Tech insights and updates<br> Instagram - Personal and professional content<br><br>These platforms provide additional context into Anubhav's professional journey and expertise.";
    }

    // Creator Question
    if (
      matchesAny(msg, [
        "who created you",
        "who made you",
        "creator",
        "developed",
      ])
    ) {
      return "I am created by Anubhav Singh.";
    }
    if (
      matchesAny(msg, [
        "hire",
        "service",
        "freelance",
        "work",
        "collaborate",
        "opportunity",
      ])
    ) {
      return "<strong>Services &amp; Collaboration:</strong><br> Full-Stack Web Development<br> Backend Architecture &amp; Optimization<br> Algorithm Problem Solving<br> UI/UX Implementation<br><br>For project inquiries and collaborations, contact: anubhavsingh2027@gmail.com";
    }

    return "I can assist with inquiries regarding Anubhav's professional profile, technical expertise, projects, education, skills, and contact information. Please ask me about any specific topic of interest.";
  }
}

// when user visit website it tell me

window.addEventListener("load", () => {
  fetch("https://app.chatting.nav-code.com/detector/newUser/portfolio", {
    method: "GET"
  })
    .then(res => res.json())
    .then(data => {
      console.log("Thank YOU For Visit");
    })
    .catch(err => {
      console.error("Thank YOU For Visiting My Portfolio ");
    });
});
