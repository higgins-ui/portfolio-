const phrases = [
  "JavaScript Developer",
  "React Native Builder",
  "Freelance Web Developer"
];

const typewriterText = document.getElementById("typewriter-text");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function tickTypewriter() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    charIndex++;
    typewriterText.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(tickTypewriter, 1400);
      return;
    }
  } else {
    charIndex--;
    typewriterText.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(tickTypewriter, isDeleting ? 48 : 90);
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  tickTypewriter();
} else {
  typewriterText.textContent = phrases[0];
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

const revealItems = document.querySelectorAll(".reveal");
revealItems.forEach((item) => observer.observe(item));

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  { threshold: 0.35 }
);

sections.forEach((section) => sectionObserver.observe(section));