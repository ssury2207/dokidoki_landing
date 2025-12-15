// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when clicking a link
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    }),
  { threshold: 0.1 }
);

document.querySelectorAll(".card, .feature, .screenshot").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  observer.observe(el);
});

// Timeline items reveal on scroll
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".timeline-item").forEach((item) => {
  timelineObserver.observe(item);
});

// Animate progress bars in evaluation card
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".param-fill");

  progressBars.forEach((bar, index) => {
    const targetWidth = bar.style.width;
    bar.style.setProperty("--target-width", targetWidth);

    setTimeout(() => {
      bar.classList.add("animated");
    }, 1000 + index * 100);
  });
}

// Trigger animation when page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", animateProgressBars);
} else {
  animateProgressBars();
}

// FAQ Accordion functionality
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const isExpanded = question.getAttribute("aria-expanded") === "true";
    const answer = question.nextElementSibling;

    // Toggle current item
    question.setAttribute("aria-expanded", !isExpanded);
    answer.classList.toggle("open");
  });
});

(function () {
  const container = document.querySelector("#screenshots .screenshot-frame");
  if (!container) return;

  const slides = Array.from(container.querySelectorAll(".slide"));
  if (slides.length <= 1) return;

  let i = 0;
  const intervalMs = 2500; // time between slides

  setInterval(() => {
    slides[i].classList.remove("is-visible");
    i = (i + 1) % slides.length;
    slides[i].classList.add("is-visible");
  }, intervalMs);
})();

// Community Carousel Functionality
(function initCarousel() {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;

  // Create dots dynamically
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".carousel-dot");

  function updateCarousel() {
    const translateX = -currentIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateCarousel();
  }

  // Event listeners
  nextBtn?.addEventListener("click", nextSlide);
  prevBtn?.addEventListener("click", prevSlide);

  // Auto-play carousel
  let autoplayInterval = setInterval(nextSlide, 3000);

  // Pause autoplay on hover
  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer?.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval);
  });

  carouselContainer?.addEventListener("mouseleave", () => {
    autoplayInterval = setInterval(nextSlide, 4000);
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      nextSlide();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevSlide();
    }
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });
})();
