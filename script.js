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

// Latest AI Evaluations Carousel
(function initEvaluationsCarousel() {
  let currentEvalIndex = 0;
  let evaluations = [];

  async function loadCarouselEvaluations() {
    try {
      console.log('Fetching evaluations from API...');
      const response = await fetch('https://seiwhmnvyrrhqkglovwo.supabase.co/functions/v1/get_ai_evaluations');
      console.log('Response status:', response.status);

      const result = await response.json();
      console.log('API Response:', result);

      const { data } = result;

      if (!data || data.length === 0) {
        console.log('No data returned from API');
        const track = document.getElementById('evalCarouselTrack');
        if (track) {
          track.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No evaluations yet</p>';
        }
        return;
      }

      console.log('Found evaluations:', data.length);
      evaluations = data;
      renderEvaluationsCarousel();
      setupEvaluationsCarouselControls();

    } catch (error) {
      console.error('Failed to load evaluations:', error);
      const track = document.getElementById('evalCarouselTrack');
      if (track) {
        track.innerHTML = '<p style="text-align: center; color: #f00; padding: 40px;">Error loading evaluations. Check console.</p>';
      }
    }
  }

  function renderEvaluationsCarousel() {
    const track = document.getElementById('evalCarouselTrack');
    if (!track) return;

    track.innerHTML = evaluations.map((evaluation, index) => `
      <div class="eval-carousel-card ${index === 0 ? 'active' : ''}">
        <div class="glass-eval-card">
          <div class="eval-card-score">${evaluation.total_score}/50</div>
          <div class="eval-card-summary">${evaluation.summary || 'No summary available'}</div>
          <div class="eval-card-time">${formatTime(evaluation.created_at)}</div>
        </div>
      </div>
    `).join('');
  }

  function setupEvaluationsCarouselControls() {
    const prevBtn = document.getElementById('evalPrevBtn');
    const nextBtn = document.getElementById('evalNextBtn');

    prevBtn?.addEventListener('click', () => navigateEvaluationsCarousel(-1));
    nextBtn?.addEventListener('click', () => navigateEvaluationsCarousel(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const track = document.getElementById('evalCarouselTrack');
      if (!track || !track.querySelector('.eval-carousel-card')) return;

      if (e.key === 'ArrowLeft') navigateEvaluationsCarousel(-1);
      if (e.key === 'ArrowRight') navigateEvaluationsCarousel(1);
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const track = document.getElementById('evalCarouselTrack');

    track?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    track?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleEvalSwipe();
    });

    function handleEvalSwipe() {
      if (touchEndX < touchStartX - 50) navigateEvaluationsCarousel(1);
      if (touchEndX > touchStartX + 50) navigateEvaluationsCarousel(-1);
    }
  }

  function navigateEvaluationsCarousel(direction) {
    const cards = document.querySelectorAll('.eval-carousel-card');
    if (cards.length === 0) return;

    cards[currentEvalIndex].classList.remove('active');
    cards[currentEvalIndex].classList.add(direction > 0 ? 'prev' : '');

    currentEvalIndex += direction;

    if (currentEvalIndex < 0) currentEvalIndex = evaluations.length - 1;
    if (currentEvalIndex >= evaluations.length) currentEvalIndex = 0;

    cards[currentEvalIndex].classList.remove('prev');
    cards[currentEvalIndex].classList.add('active');

    setTimeout(() => {
      cards.forEach(card => card.classList.remove('prev'));
    }, 500);
  }

  function formatTime(timestamp) {
    const now = new Date();
    const created = new Date(timestamp);
    const diffMs = now - created;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  // Load on button click
  const loadBtn = document.getElementById('loadEvaluationsBtn');
  loadBtn?.addEventListener('click', async () => {
    alert('Hello');
  });
})();
