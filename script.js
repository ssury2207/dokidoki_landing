// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    }),
  { threshold: 0.1 }
);

document.querySelectorAll('.card, .feature, .screenshot').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});

// Timeline items reveal on scroll
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.timeline-item').forEach((item) => {
  timelineObserver.observe(item);
});

// Animate progress bars in evaluation card
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.param-fill');

  progressBars.forEach((bar, index) => {
    const targetWidth = bar.style.width;
    bar.style.setProperty('--target-width', targetWidth);

    setTimeout(() => {
      bar.classList.add('animated');
    }, 1000 + (index * 100));
  });
}

// Trigger animation when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateProgressBars);
} else {
  animateProgressBars();
}

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    const answer = question.nextElementSibling;

    // Toggle current item
    question.setAttribute('aria-expanded', !isExpanded);
    answer.classList.toggle('open');
  });
});

(function () {
  const container = document.querySelector('#screenshots .screenshot-frame');
  if (!container) return;

  const slides = Array.from(container.querySelectorAll('.slide'));
  if (slides.length <= 1) return;

  let i = 0;
  const intervalMs = 2500; // time between slides

  setInterval(() => {
    slides[i].classList.remove('is-visible');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-visible');
  }, intervalMs);
})();
