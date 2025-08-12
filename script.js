function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

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
