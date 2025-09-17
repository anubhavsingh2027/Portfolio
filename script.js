
  const phrases = ["Problem Solver ", "Full Stack Developer ", "Software Engineer ", "Creative Thinker ", "Passionate Coder "];

    let i = 0; // current phrase index
    let j = 0; // current letter index
    let currentPhrase = [];
    let isDeleting = false;
    const speed = 50;
    const element = document.getElementById("typewriter");

    function loop() {
      element.innerHTML = currentPhrase.join("");

      if (!isDeleting && j < phrases[i].length) {
        currentPhrase.push(phrases[i][j]);
        j++;
      }

      if (isDeleting && j > 0) {
        currentPhrase.pop();
        j--;
      }

      if (j === phrases[i].length) {
        isDeleting = true;
        setTimeout(loop, 1500); // pause before deleting
        return;
      }

      if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
      }

      setTimeout(loop, speed);
    }

    loop();



      // Toggling Skill Tabs

      const tabs = document.querySelectorAll("[data-target]");
      const tabContent = document.querySelectorAll("[data-content]");

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const target = document.querySelector(tab.dataset.target);

          tabContent.forEach((tabContents) => {
            tabContents.classList.remove("skills-active");
          });

          target.classList.add("skills-active");

          tabs.forEach((tab) => {
            tab.classList.remove("skills-active");
          });

          tab.classList.add("skills-active");
        });
      });

      //Mix it up Sorting

      let mixerPortfolio = mixitup(".work-container", {
        selectors: {
          target: ".work-card",
        },
        animation: {
          duration: 300,
        },
      });



      // Active link changing

      const linkWork = document.querySelectorAll(".work-item");

      function activeWork() {
        linkWork.forEach((l) => l.classList.remove("active-work"));
        this.classList.add("active-work");
      }
      linkWork.forEach((l) => l.addEventListener("click", activeWork));

      //Portfolio Popup

      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("work-button")) {
          togglePortfolioPopup();
          portfolioItemDetails(e.target.parentElement);
        }
      });

      function togglePortfolioPopup() {
        document.querySelector(".portfolio-popup").classList.toggle("open");
      }

      document
        .querySelector(".portfolio-popup-close")
        .addEventListener("click", togglePortfolioPopup);

      function portfolioItemDetails(portfolioItem) {
        document.querySelector(".pp-thumbnail img").src =
          portfolioItem.querySelector(".work-img").src;
        document.querySelector(".portfolio-popup-subtitle span").innerHTML =
          portfolioItem.querySelector(".work-title").innerHTML;
        document.querySelector(".portfolio-popup-body").innerHTML =
          portfolioItem.querySelector(".portfolio-item-details").innerHTML;
      }

      //Services Popup
      const modalViews = document.querySelectorAll(".services-modal");
      const modelBtns = document.querySelectorAll(".services-button");
      const modalCloses = document.querySelectorAll(".services-modal-close");

      let modal = function (modalClick) {
        modalViews[modalClick].classList.add("active-modal");
      };

      modelBtns.forEach((modelBtn, i) => {
        modelBtn.addEventListener("click", () => {
          modal(i);
        });
      });

      modalCloses.forEach((modalClose) => {
        modalClose.addEventListener("click", () => {
          modalViews.forEach((modalView) => {
            modalView.classList.remove("active-modal");
          });
        });
      });


      // Input Animation

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
    parent.classList.add("focus"); // ✅ keep label floated if there is text
  }
}


      inputs.forEach((input) => {

        input.addEventListener("focus", focusFunc);
        input.addEventListener("blur", blurFunc);
      });

      // Scroll Section Active Link

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

     // Activating Sidebar
const navMenu = document.getElementById("sidebar");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav-link");

// Open sidebar
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-sidebar");
  });
}

// Close sidebar via X icon
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-sidebar");
  });
}

// Smooth scroll + animated sidebar close
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // prevent instant jump

    // Get the section ID from href
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Smooth scroll
      targetSection.scrollIntoView({ behavior: "smooth" });

      // Animate nav hide
      navMenu.classList.remove("show-sidebar");
    }
  });
});



let angle = 0;
function rotateBorder() {
    angle += 1;
    document.querySelector('.about-img').style.background = `linear-gradient(white, white) padding-box,
        linear-gradient(${angle}deg, #ff0000, #ff9900, #ffff00, #33cc33, #0099ff, #663399, #ff3399, #ff0000) border-box`;
    requestAnimationFrame(rotateBorder);
}
rotateBorder();
document.querySelectorAll('.card').forEach(card => {
card.addEventListener('mousemove', e => {
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
card.style.setProperty('--mouse-x', `${x}px`);
card.style.setProperty('--mouse-y', `${y}px`);
});
});
const contactItems = document.querySelectorAll('.contact-item');
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
    entry.target.classList.add('bounce');
}
});
}, { threshold: 0.5 });
contactItems.forEach(item => observer.observe(item));

function openPopup() {
  const popup = document.getElementById("sharePopup");
  const thankYouMsg = document.getElementById("thankYouMsg");
  popup.style.display = "flex"; // Show popup
  thankYouMsg.style.display = "block"; // Always show thank you
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function sharePortfolio() {
  const shareData = {
    title: 'Anubhav Singh Portfolio',
    text: 'Check out this awesome portfolio!',
    url: 'https://anubhavsingh2027.github.io/Portfolio'
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log('Portfolio shared successfully!'))
      .catch((error) => console.error('Sharing failed:', error));
  } else {
    alert("Web Share API not supported. Please copy and share the link manually.");
  }
}

function closePopup() {
  document.getElementById("sharePopup").style.display = "none";
  document.body.style.overflow = ""; // Restore scroll
}

window.addEventListener('click', function(event) {
  const popup = document.getElementById("sharePopup");
  const content = document.querySelector(".popup-content");
  if (event.target === popup) {
    closePopup();
  }
});


// const downloadLink = document.getElementById('downloadLink');

// downloadLink.addEventListener('click', async (e) => {
//   e.preventDefault();

//   if (downloadLink.classList.contains('disabled')) return;
//   downloadLink.classList.add('disabled', 'downloading');

//   const url = downloadLink.getAttribute('href'); // Document/resume.pdf
//   try {
//     // 1) Grab the file without IDM interception
//     const res = await fetch(url, { cache: 'no-store' });
//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     const blob = await res.blob();

//     // 2) Create a temporary object URL and save
//     const objectUrl = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = objectUrl;
//     a.download = 'Anubhav_resume.pdf'; // final filename shown to user
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(objectUrl);
//   } catch (err) {
//     console.error('Download failed, falling back:', err);
//     // Fallback: let the browser/IDM handle it normally
//     window.location.href = url;
//   } finally {
//     downloadLink.classList.remove('disabled', 'downloading');
//   }
// });

  const downloadLink = document.getElementById("downloadLink");

  downloadLink.addEventListener("click", (e) => {
  e.preventDefault();

  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  subjectInput.value = "Resume Request";
  messageInput.value = "I want your Resume Anubhav Singh";

  subjectInput.parentNode.classList.add("focus");
  messageInput.parentNode.classList.add("focus");

  // ✅ Manually scroll to contact section
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }

  console.log("Form auto-filled ✅ and scrolled to contact section");
});


  //anubhav api call

  document.getElementById("contactForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("username").value;
      const to = document.getElementById("email").value;
      const phone= document.getElementById("phone").value;
      const subject = document.getElementById("subject").value;
      const messagev = document.getElementById("message").value;
      const responseMsg = document.getElementById("responseMsg");
      responseMsg.textContent = "Sending...";
      const hostEmail = "anubhavsingh2027@gmail.com";
      const customerSubject = "Thank you for visiting!";
      const customerMessage = `Thank you for visiting, ${name}. We will respond to you shortly.`;
      const hostSubject = "New customer enquiry";
      const hostMessage = `
        New customer details:
        Name: ${name}
        Email: ${to}
        Phone no :${phone}
        Subject: ${subject}
        Message: ${messagev}
      `;

      try {
        const res = await fetch("https://anubhav-api-vkce.onrender.com/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to, subject: customerSubject, message: customerMessage }),
        });

        const hostRes = await fetch("https://anubhav-api-vkce.onrender.com/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to: hostEmail, subject: hostSubject, message: hostMessage }),
        });

        const data = await res.json();
        const hostData = await hostRes.json();

        if (data.success && hostData.success) {
            responseMsg.textContent = "✅ Emails sent successfully!";
            responseMsg.className = "success";

            setTimeout(() => {
              const form = document.getElementById("contactForm");
              form.reset();

              // ✅ remove floating labels after reset
              const inputs = form.querySelectorAll(".input");
              inputs.forEach((input) => {
                input.parentNode.classList.remove("focus");
              });

              responseMsg.textContent = "";
            }, 2000);
          }   else {
            responseMsg.textContent = "❌ Failed to send email(s).";
            responseMsg.className = "error";
          }
      } catch (error) {
        responseMsg.textContent = "❌ Error: " + error.message;
        responseMsg.className = "error";
      }
    });

        document.addEventListener('DOMContentLoaded', function() {

    // Initialize all components


    initChatbot();

    // Advanced AI Chatbot - Fixed
    function initChatbot() {
        const chatFab = document.getElementById('chatFab');
        const chatbot = document.getElementById('chatbot');
        const chatbotClose = document.getElementById('chatbotClose');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const sendMessage = document.getElementById('sendMessage');
        const quickBtns = document.querySelectorAll('.quick-btn');

        if (!chatFab || !chatbot) {
            console.log('Chatbot elements not found');
            return;
        }

        // Comprehensive knowledge base
        const knowledgeBase = {
            personal: {
                name: "Anubhav Singh",
                age: 20,
                dob: "June 5, 2005",
                location: "Varanasi, India",
                education: "Computer Science and Engineering with AI specialization (2023-2027)",
                email: "anubhavsingh2027@gmail.com"
            },
            achievements: [
                "Solved 500+ LeetCode problems across all difficulty levels",
                "Achieved 5-Star rating in C++ on HackerRank platform",
                "Built and deployed 15+ full-stack web applications",
                "Specialized in AI and Machine Learning technologies"
            ],
            skills: {
                frontend: {
                    "HTML": "95% - Expert level with semantic markup",
                    "CSS": "90% - Advanced styling and animations",
                    "JavaScript": "85% - Modern ES6+ and async programming",
                    "React": "80% - Component-based architecture"
                },
                backend: {
                    "C++": "90% - Data structures and algorithms",
                    "Node.js": "85% - Server-side JavaScript",
                    "MongoDB": "80% - NoSQL database operations",
                    "Python": "75% - AI/ML and web development"
                }
            },
            projects: {
                phishshield: {
                    name: "PhishShield",
                    description: "Advanced cybersecurity platform with real-time phishing detection using URL-scanning APIs. Features comprehensive user authentication system.",
                    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
                    github: "https://github.com/anubhavsingh2027/PhishShield"
                },
                kashika: {
                    name: "Kashika Tour & Travel",
                    description: "Complete tourism platform for Varanasi offering car rental services and personalized tour packages.",
                    technologies: ["HTML", "CSS", "JavaScript"],
                    github: "https://github.com/anubhavsingh2027/Kashika-Travel"
                },
                weather: {
                    name: "Weather Forecasting App",
                    description: "Responsive weather application with real-time forecasts using OpenWeather API.",
                    technologies: ["JavaScript", "OpenWeather API", "Responsive Design"],
                    github: "https://github.com/anubhavsingh2027/Weather-App"
                },
                aitools: {
                    name: "AI Tools Directory",
                    description: "Comprehensive directory featuring 600+ categorized AI tools with advanced search filtering.",
                    technologies: ["HTML", "CSS", "JavaScript", "Search Algorithms"],
                    github: "https://github.com/anubhavsingh2027/AI-Tools"
                },
                typing: {
                    name: "Typing Speed Test",
                    description: "Interactive typing speed test with real-time WPM tracking and accuracy measurement.",
                    technologies: ["JavaScript", "Real-time Tracking"],
                    github: "https://github.com/anubhavsingh2027/Typing-Test"
                },
                stress: {
                    name: "Stress Relief Website",
                    description: "Interactive wellness platform with animations and sounds designed to help users relax.",
                    technologies: ["JavaScript", "CSS Animations", "Audio API"],
                    github: "https://github.com/anubhavsingh2027/Stress-Relief"
                },
                cpp: {
                    name: "C++ String Methods Project",
                    description: "Educational resource demonstrating C++ string methods and functions for DSA preparation.",
                    technologies: ["C++", "String Manipulation", "Algorithm Design"],
                    github: "https://github.com/anubhavsingh2027/CPP-Strings"
                }
            }
        };

        // Chat functionality - Fixed
        chatFab.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Chat FAB clicked'); // Debug log
            chatbot.classList.toggle('hidden');
        });

        if (chatbotClose) {
            chatbotClose.addEventListener('click', (e) => {
                e.preventDefault();
                chatbot.classList.add('hidden');
            });
        }

        // Send message functionality - Fixed
        if (sendMessage) {
            sendMessage.addEventListener('click', (e) => {
                e.preventDefault();
                sendChatMessage();
            });
        }

        if (chatInput) {
            // Ensure chat input is working
            chatInput.removeAttribute('readonly');
            chatInput.removeAttribute('disabled');

            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendChatMessage();
                }
            });

            chatInput.addEventListener('input', (e) => {
                console.log('Chat input:', e.target.value); // Debug log
            });
        }

        // Quick questions - Fixed
        quickBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const question = btn.getAttribute('data-question');
                console.log('Quick question:', question); // Debug log
                addChatMessage(question, 'user');
                setTimeout(() => {
                    const response = getBotResponse(question);
                    addChatMessage(response, 'bot');
                }, 500);
            });
        });

        function sendChatMessage() {
            if (!chatInput) return;

            const message = chatInput.value.trim();
            if (!message) return;

            console.log('Sending message:', message); // Debug log

            addChatMessage(message, 'user');
            chatInput.value = '';

            setTimeout(() => {
                const response = getBotResponse(message);
                addChatMessage(response, 'bot');
            }, 500);
        }

       function addChatMessage(message, sender) {
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'bot-avatar';
    avatar.textContent = sender === 'user' ? '👤' : '🤖';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = message;
    bubble.style.color='black'
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

        function getBotResponse(message) {
            const msg = message.toLowerCase();

            if(msg.includes('anubhav')){
                return `I'm Anubhav Singh, Full Stack Developer & AI Enthusiast from the historic city of Varanasi, India. Currently pursuing Computer Science and Engineering with AI specialization (2023-2027) from a prestigious institution.

My journey in programming started with curiosity and has evolved into a passion for creating impactful digital solutions. From solving complex algorithms to building full-stack applications, I enjoy every aspect of software development.`
            }

            // Personal information
            if (msg.includes('age') || msg.includes('old')) {
                return `Anubhav is ${knowledgeBase.personal.age} years old, born on ${knowledgeBase.personal.dob}. Despite his young age, he has achieved remarkable milestones in programming!`;
            }

            if (msg.includes('where') || msg.includes('location') || msg.includes('from')) {
                return `Anubhav is from ${knowledgeBase.personal.location}. Varanasi is one of India's oldest and most spiritual cities, known for its rich cultural heritage.`;
            }

            if (msg.includes('education') || msg.includes('study') || msg.includes('college')) {
                return `Anubhav is currently pursuing ${knowledgeBase.personal.education} from PSIT Kanpur. His AI specialization reflects his passion for cutting-edge technology.`;
            }

            if (msg.includes('email') || msg.includes('contact') || msg.includes('reach')) {
                return `You can reach Anubhav at ${knowledgeBase.personal.email}. He typically responds within 24 hours and is always excited to discuss new opportunities!`;
            }
            if(msg.includes('direct')){
                return `Here is my personal Mobile & WhatsApp No: 7355026966`;
            }
            // Skills inquiries
            if (msg.includes('skill')) {
                return `Anubhav has strong skills are \n\n
                Frontend Languages: \n1. HTML\n 2. CSS \n 3.  JavaScript \n 4.  React \n
                 Backend Languages: \n 1. Node.js \n 2. Express Js\n
                 Databse languages:\n 1. Mongo Db \n 2.MySql  \n
                  Programming Language :\n1. Cpp\n2. C  \n 3. Java \n 4. Python`;
            }
            if(msg.includes('leetcode')){
                return `Anubhav Singh Solve 500+ Leetcode Solve Question which ShowCase the Problem Solving Skills \n\n Link For Profile View :<a href="https://leetcode.com/u/anubhav_singh_6966/">LeetCode Profile</a>`;
            }
            if(msg.includes('hackerrank')){
                return `Anubhav Singh is Currently 5 Star Coder on HackerRank which ShowCase the Problem Solving Skills \n\n Link For Profile View :<a href="https://www.hackerrank.com/profile/anubhavsingh2027">Hackerrank Profile</a>`;
            }
            if(msg.includes('technology') || msg.includes('tech')){
                return `Anubhav Singh technology knows are :- \n
                1. Blockchain \n
                2. Artificial Intelligence \n
                3. cyber Security`
            }
            if(msg.includes('contest')){
                return`Anubhav singh regurly Participate all the contest on leetcode `
            }
            // Achievements
            if (msg.includes('achievement') ) {
                return `Anubhav's achievements include:\n\n🏆 ${knowledgeBase.achievements.join('\n🏆 ')}\n\n Hacker rank `;
            }

            // Projects
            if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) {
                return `Anubhav has built 7 major projects:\n\n🛡️ PhishShield - Cybersecurity Platform\n🚗 Kashika Travel - Tourism Website\n🌤️ Weather App - API Integration\n🤖 AI Tools Directory - 600+ Tools\n⌨️ Typing Speed Test\n😌 Stress Relief Platform\n📚 C++ String Methods Guide\n\nWhich project interests you most?`;
            }
            if (msg.includes('number') || msg.includes('mobile') || msg.includes('whatsapp')) {
                return `Anubhav singh Mob no is 7355026966`;
            }

            // Specific projects
            if (msg.includes('phishshield') || msg.includes('security')) {
                const project = knowledgeBase.projects.phishshield;
                return `${project.name}: ${project.description}\n\nTech: ${project.technologies.join(', ')}\n\nGitHub: ${project.github}\n\nLink:<a href="https://phishshield-5lym.onrender.com">PhishShield On Render</a>`;
            }

            if (msg.includes('kashika') || msg.includes('travel')) {
                const project = knowledgeBase.projects.kashika;
                return `${project.name}: ${project.description}\n\nTech: ${project.technologies.join(', ')}\n\nGitHub: ${project.github}`;
            }

            if (msg.includes('weather')) {
                const project = knowledgeBase.projects.weather;
                return `${project.name}: ${project.description}\n\nTech: ${project.technologies.join(', ')}\n\nGitHub: ${project.github}`;
            }

            // Services
            if (msg.includes('service') || msg.includes('hire') || msg.includes('freelance')) {
                return `Anubhav offers:\n\n💻 Web Development - Full-stack solutions\n⚙️ Backend Development - Server architecture\n🧩 Problem Solving - Algorithm optimization\n\nContact him at ${knowledgeBase.personal.email} for collaborations!`;
            }
            if(msg.includes('dob')|| msg.includes('birth')){
                return `Anubhav singh Born ${knowledgeBase.personal.dob}. In 2025 is he was 20 year old.`
            }
            if(msg.includes('date')){
                return `current Date is ${new Date()};
}`
            }
            // Default response
            return `I can help you learn about Anubhav's:\n\n🚀  projects\n⚡ Technical skills\n🏆 Achievements\n🎓 Education\n📞 Contact info\n\n Ask Anubhav I Will Try To Tell \n\nWhat interests you most?`;
        }
    }



    });
