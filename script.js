
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