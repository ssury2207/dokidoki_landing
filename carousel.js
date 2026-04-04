/**
 * Carousel Module
 * Handles fetching and displaying AI evaluations carousel
 */

class CarouselManager {
  constructor() {
    this.API_URL = 'https://pweigtkozqgybekvadaz.supabase.co/functions/v1/getAIEvaluations';
    this.carouselTrack = document.getElementById('evalCarouselTrack');

    this.init();
  }

  init() {
    // Show shimmer cards initially
    this.showShimmerCards();

    // Fetch and display real data
    this.fetchEvaluations();
  }

  showShimmerCards() {
    // Create 10 shimmer skeleton cards
    const shimmerHTML = Array(10).fill(null).map(() => this.createShimmerCard()).join('');
    this.carouselTrack.innerHTML = shimmerHTML;
  }

  createShimmerCard() {
    return `
      <div class="eval-card shimmer-card">
        <div class="eval-card-header">
          <span class="shimmer-box shimmer-date"></span>
          <span class="shimmer-box shimmer-score"></span>
        </div>
        <div class="eval-card-divider"></div>
        <div class="eval-card-question">
          <div class="shimmer-box shimmer-text-line"></div>
          <div class="shimmer-box shimmer-text-line"></div>
        </div>
        <div class="eval-card-divider"></div>
        <div class="eval-card-summary">
          <div class="shimmer-box shimmer-text-line"></div>
          <div class="shimmer-box shimmer-text-line"></div>
        </div>
      </div>
    `;
  }

  async fetchEvaluations() {
    try {
      const response = await fetch(this.API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch evaluations');
      }

      const data = await response.json();
      const evaluations = data.existingEvaluations || [];

      // Display actual cards
      this.displayEvaluations(evaluations);

    } catch (error) {
      console.error('Error fetching evaluations:', error);
      // Keep shimmer cards on error
    }
  }

  displayEvaluations(evaluations) {
    // Store evaluations for later access
    this.evaluations = evaluations;

    // Clear shimmer cards
    this.carouselTrack.innerHTML = '';

    // Display only the number of cards received
    evaluations.forEach(evaluation => {
      const cardHTML = this.createEvaluationCard(evaluation);
      this.carouselTrack.innerHTML += cardHTML;
    });
  }

  createEvaluationCard(evaluation) {
    const formattedDate = this.formatDate(evaluation.created_at);
    const score = `${evaluation.total_score}/50`;
    const question = this.truncateText(evaluation.extracted_question, 150);
    const summary = this.truncateText(evaluation.summary, 120);

    return `
      <div class="eval-card" onclick="window.carouselManager.openEvaluation('${evaluation.id}')" style="cursor: pointer;">
        <div class="eval-card-header">
          <span class="eval-date">
            <img src="assets/calander.svg" alt="calendar" class="calendar-icon" />
            ${formattedDate}
          </span>
          <span class="eval-score">${score}</span>
        </div>
        <div class="eval-card-divider"></div>
        <div class="eval-card-question">
          <p>${question}</p>
        </div>
        <div class="eval-card-divider"></div>
        <div class="eval-card-summary">
          <p>${summary}</p>
        </div>
      </div>
    `;
  }

  openEvaluation(evaluationId) {
    // Find evaluation by ID
    const evaluation = this.evaluations.find(e => e.id === evaluationId);

    if (!evaluation) {
      console.error('Evaluation not found');
      return;
    }

    // Store in localStorage to pass to new page
    localStorage.setItem('currentEvaluation', JSON.stringify(evaluation));

    // Open in new tab with ID in URL
    window.open(`othersEvaluationReport.html?id=${evaluationId}`, '_blank');
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.carouselManager = new CarouselManager();
});
