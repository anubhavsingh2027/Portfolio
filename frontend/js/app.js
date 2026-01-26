import { wakeup, contact, speedResponse } from "./service.js";
import { initChatbot } from "./chat-assistant.js";
let currentSection = "home";
let isScrolling = false;
let networkAnimation = null;
let projectsAnimation = null;
let serverAwake = false;

// Global wakeup indicator
window.serverAwake = false;

// Resume Modal Functions
function openResumeModal() {
  const modal = document.getElementById("resumeModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Trigger animation
    gsap.fromTo(
      modal.querySelector(".resume-modal-content"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }
}

function closeResumeModal() {
  const modal = document.getElementById("resumeModal");
  if (modal) {
    gsap.to(modal.querySelector(".resume-modal-content"), {
      opacity: 0,
      y: 30,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      },
    });
  }
}

// Expose functions to global scope for onclick handlers
window.openResumeModal = openResumeModal;
window.closeResumeModal = closeResumeModal;

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeResumeModal();
  }
});

// Scroll to Section Function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Update active section after scroll
    setTimeout(() => {
      currentSection = sectionId;
    }, 500);
  }
}

// Expose to global scope for onclick handlers
window.scrollToSection = scrollToSection;

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize navbar
  gsap.set("nav.navbar", { opacity: 1 });

  // Initialize wakeup first
  initWakeup();

  // Initialize other features
  initLoader();
  initNavigation();
  initHeroVideoAnimations();
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

// Initialize server wakeup
async function initWakeup() {
  const activeOnBadge = document.getElementById("activeon");
  const statusText = activeOnBadge?.querySelector(".status-text");

  try {
    const response = await wakeup();
    if (response && response.success) {
      window.serverAwake = true;
      serverAwake = true;
      if (activeOnBadge) {
        activeOnBadge.style.backgroundColor = "#7cf77c";
        if (statusText) statusText.textContent = "Active";
      }
    } else {
      window.serverAwake = false;
      if (activeOnBadge) {
        activeOnBadge.style.backgroundColor = "red";
        if (statusText) statusText.textContent = "Server Loading...";
      }
    }
  } catch (error) {
    console.error("Wakeup error:", error);
    window.serverAwake = false;
    if (activeOnBadge) {
      activeOnBadge.style.backgroundColor = "red";
      if (statusText) statusText.textContent = "Server Loading...";
    }
  }
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
  const navItems = document.querySelectorAll(".nav-item");
  const navLinks = document.querySelectorAll(".nav-link");
  const ctaButton = document.querySelector(".cta-button");
  let isMenuOpen = false;

  // Helper function to close menu
  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      navToggle?.classList.remove("active");
      navMenu?.classList.remove("active");
    }
  }

  // Helper function to open menu
  function openMenu() {
    if (!isMenuOpen) {
      isMenuOpen = true;
      navToggle?.classList.add("active");
      navMenu?.classList.add("active");

      // Staggered entrance animation for nav items
      navItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: index * 0.08,
            ease: "power2.out",
          },
        );
      });
    }
  }

  // Toggle menu on button click
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      isMenuOpen ? closeMenu() : openMenu();
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        isMenuOpen &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  // Navigation link click handlers with smooth scroll
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) {
        // Close mobile menu
        closeMenu();

        const targetId = href.substring(1);
        const section = document.getElementById(targetId);

        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // CTA Button interaction
  if (ctaButton) {
    ctaButton.addEventListener("click", () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Navbar scroll detection with hide/show animation
  let hideNavTimer;
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(hideNavTimer);
      const scrollPos = window.scrollY;

      // Update navbar scrolled state
      if (scrollPos > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // Update active nav link based on section
      updateActiveNavLink();
    },
    { passive: true },
  );

  // Initialize active link
  updateActiveNavLink();
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const scrollPosition = window.scrollY + 150;
  let activeSection = "";

  // Find current section
  for (const section of sections) {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      activeSection = section.getAttribute("id");
      break;
    }
  }

  // Update active link with glow animation
  navLinks.forEach((link) => {
    const linkSection = link.getAttribute("data-section");
    const isActive = linkSection === activeSection;

    if (isActive && !link.classList.contains("active")) {
      link.classList.add("active");
      // Trigger glow animation
      gsap.to(link.querySelector(".link-glow"), {
        duration: 0.4,
        ease: "power2.out",
      });
    } else if (!isActive && link.classList.contains("active")) {
      link.classList.remove("active");
    }
  });
}

function initHeroVideoAnimations() {
  const heroVideo = document.querySelector(".hero-video");
  if (!heroVideo) return;

  // Ensure video plays on all devices
  const videoElement = document.querySelector(".hero-video-element");
  if (videoElement) {
    videoElement.play().catch(function (error) {
      console.log("Autoplay prevented:", error);
    });
  }

  // Scroll indicator animation
  const scrollArrow = document.querySelector(".scroll-arrow");
  if (scrollArrow) {
    document.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        scrollArrow.style.opacity = "0";
        scrollArrow.style.pointerEvents = "none";
      } else {
        scrollArrow.style.opacity = "1";
        scrollArrow.style.pointerEvents = "auto";
      }
    });
  }

  // Add parallax effect to video
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrolled = window.scrollY;
        const heroContainer = document.querySelector(".hero-video-container");
        if (heroContainer) {
          heroContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
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
        particle.radius * 3,
      );
      gradient.addColorStop(
        0,
        `hsla(${particle.hue}, 70%, 60%, ${particle.alpha})`,
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
    }, 250),
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
    },
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
        p.radius * 3,
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
    localStorage.getItem("contactFormMessageCount") || "0",
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
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    showNotification("sending....", "send");

    try {
      const response = await contact({ name, email, phone, subject, message });
      if (response) {
        setTimeout(() => {
          const form = document.getElementById("contactForm");
          form.reset();
          const inputs = form.querySelectorAll(".input");
          inputs.forEach((input) => {
            input.parentNode.classList.remove("focus");
          });
          showNotification("Message sent successfully!", "success");
          updateMessageCounter();
        }, 10);
      }
    } catch (err) {
      showNotification("Error Occurred!", "error");
    }
  }
  document
    .getElementById("contactForm")
    .addEventListener("submit", handleContactForm);

  async function handlefastmessage(e) {
    e.preventDefault();
    const email = document.getElementById("fastemail").value;

    showNotification("sending....", "send");

    try {
      const response = await speedResponse({ email });
      if (response) {
        setTimeout(() => {
          const form = document.getElementById("newsletter-form");
          form.reset();
          showNotification("Message sent successfully!", "success");
        }, 10);
      }
    } catch (err) {
      showNotification("Error Occurred!", "error");
    }
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
  }, 16),
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
  const requiredElements = ["navbar", "nav-toggle", "nav-menu", "scroll-top"];
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
  },
);
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const revealElements = document.querySelectorAll(
      ".stat-card, .contact-card, .link-tile",
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

/* ===== PREMIUM FUTURISTIC SKILLS SECTION - ADVANCED INTERACTIONS ===== */

function initializeSkillsSection() {
  const skillsSection = document.querySelector(".skills-futuristic");
  const skillPanels = document.querySelectorAll(".skill-category-panel");
  const skillChips = document.querySelectorAll(".skill-chip");

  if (!skillsSection) return;

  // ─── Intersection Observer for Panel Fade-in & Animation ───
  const panelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("animated")
        ) {
          entry.target.classList.add("animated");

          // Staggered chip animations
          const chips = entry.target.querySelectorAll(".skill-chip");
          chips.forEach((chip, chipIndex) => {
            // Reset animation state
            chip.style.opacity = "0";
            chip.style.transform = "translateY(20px)";

            // Trigger animation with delay
            setTimeout(
              () => {
                chip.style.transition =
                  "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
                chip.style.opacity = "1";
                chip.style.transform = "translateY(0)";
              },
              50 + chipIndex * 80,
            );
          });
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -100px 0px" },
  );

  skillPanels.forEach((panel) => {
    panelObserver.observe(panel);
    // Add index for animation delays
    panel.style.setProperty("--index", Array.from(skillPanels).indexOf(panel));
  });

  // ─── Advanced 3D Tilt Effect on Panel Hover ───
  skillPanels.forEach((panel) => {
    let tiltTimeout;

    panel.addEventListener("mousemove", (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate tilt angles (more aggressive for premium feel)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / rect.height) * 15;
      const rotateY = ((centerX - x) / rect.width) * 15;

      panel.style.transform = `
        perspective(1000px)
        translateY(-10px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
      `;

      // Update glow position variables
      const mouseX = (x / rect.width) * 100;
      const mouseY = (y / rect.height) * 100;
      panel.style.setProperty("--mouse-x", `${mouseX}%`);
      panel.style.setProperty("--mouse-y", `${mouseY}%`);
    });

    panel.addEventListener("mouseleave", () => {
      panel.style.transform =
        "perspective(1000px) translateY(0) rotateX(0) rotateY(0) scale(1)";

      // Smooth transition back
      clearTimeout(tiltTimeout);
      tiltTimeout = setTimeout(() => {
        panel.style.transform = "none";
      }, 400);
    });

    // Touch support for mobile
    panel.addEventListener("touchstart", () => {
      panel.style.transform = "scale(0.98)";
    });

    panel.addEventListener("touchend", () => {
      panel.style.transform = "scale(1)";
    });
  });

  // ─── Skill Chip Interactive Effects ───
  skillChips.forEach((chip, index) => {
    const glowRing = chip.querySelector(".glow-ring");
    const skillLevel = chip.getAttribute("data-skill-level");

    // Set animation delay for staggered effect
    chip.style.setProperty("--index", index);

    // Hover Enter Effect
    chip.addEventListener("mouseenter", () => {
      if (glowRing) {
        // Pulse the glow ring faster on hover
        glowRing.style.animation = "glow-pulse 0.6s ease-in-out infinite";
        glowRing.style.boxShadow = `
          0 0 20px rgba(0, 240, 255, 1),
          0 0 40px rgba(183, 68, 255, 0.8)
        `;
      }

      // Icon pulse effect
      const icon = chip.querySelector(".chip-icon");
      if (icon) {
        icon.style.animation = "float 0.6s ease-in-out infinite";
      }
    });

    // Hover Leave Effect
    chip.addEventListener("mouseleave", () => {
      if (glowRing) {
        glowRing.style.animation = "none";
        glowRing.style.boxShadow = `0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(183, 68, 255, 0.6)`;
      }

      const icon = chip.querySelector(".chip-icon");
      if (icon) {
        icon.style.animation = "none";
      }
    });

    // Click Effect for Mobile & Tap Feedback
    chip.addEventListener("click", (e) => {
      e.stopPropagation();
      const skillName = chip.getAttribute("data-skill-name");
      const skillLevel = chip.getAttribute("data-skill-level");

      // Ripple/pulse effect on click
      chip.style.animation = "none";
      chip.offsetHeight; // Trigger reflow
      chip.style.animation =
        "scale-pulse 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";

      // Optional: Add feedback (could integrate with toast notification)
      console.log(`Hovered: ${skillName} (${skillLevel}%)`);
    });
  });

  // ─── Glow Ring Animation Enhancement ───
  skillChips.forEach((chip) => {
    const glowRing = chip.querySelector(".glow-ring");
    if (glowRing) {
      const skillPercent = chip.getAttribute("data-skill-level");
      glowRing.style.setProperty("--skill-percent", `${skillPercent}%`);

      // Ensure animation triggers on scroll into view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              glowRing.style.animation =
                "slideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards";
            }
          });
        },
        { threshold: 0.5 },
      );

      observer.observe(glowRing);
    }
  });

  // ─── Smooth scroll spy for section tracking ───
  const skillsSection_element = document.getElementById("skills");
  if (skillsSection_element) {
    window.addEventListener("scroll", () => {
      const rect = skillsSection_element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !skillsSection_element.classList.contains("in-view")) {
        skillsSection_element.classList.add("in-view");
      }
    });
  }
}

// Add scale-pulse keyframe to existing style element
const scalePulseStyle = document.createElement("style");
scalePulseStyle.textContent = `
  @keyframes scale-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(scalePulseStyle);

// Helper function to check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Initialize skills on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initializeSkillsSection();
});

// Also initialize if DOM is already ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSkillsSection);
} else {
  initializeSkillsSection();
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