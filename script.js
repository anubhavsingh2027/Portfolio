
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



let angle = 0;
function rotateBorder() {
    angle += 1;
    document.querySelector('.header img').style.background = `linear-gradient(white, white) padding-box, 
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
