/**
 * Carousel Module
 * Handles fetching and displaying AI evaluations carousel
 */

class CarouselManager {
  constructor() {
    this.API_URL = 'https://seiwhmnvyrrhqkglovwo.supabase.co/functions/v1/get_ai_evaluations';
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
        <div class="eval-card-top">
          <div class="eval-score-block">
            <span class="shimmer-box shimmer-score-large"></span>
            <span class="shimmer-box shimmer-score-label"></span>
          </div>
        </div>
        <div class="eval-card-verdict">
          <div class="shimmer-box shimmer-verdict-line"></div>
        </div>
        <div class="eval-card-question">
          <div class="shimmer-box shimmer-text-line"></div>
          <div class="shimmer-box shimmer-text-line"></div>
        </div>
        <div class="eval-card-footer">
          <span class="shimmer-box shimmer-date"></span>
          <span class="shimmer-box shimmer-link"></span>
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
    const totalScore = Number(evaluation.total_score || 0);
    const scoreClass = this.getScoreClass(totalScore);
    const question = this.truncateText(evaluation.extracted_question || 'Question unavailable', 88);
    const verdict = this.getVerdict(evaluation);

    return `
      <div class="eval-card eval-card-clickable" onclick="window.carouselManager.openEvaluation('${evaluation.id}')">
        <div class="eval-card-top">
          <div class="eval-score-block">
            <div class="eval-score-row">
              <span class="eval-score ${scoreClass}">${totalScore}</span>
              <span class="eval-score-out-of">/50</span>
            </div>
          </div>
        </div>
        <div class="eval-card-verdict">
          <p>${verdict}</p>
        </div>
        <div class="eval-card-question">
          <p>${question}</p>
        </div>
        <div class="eval-card-footer">
          <span class="eval-date">
            <img src="assets/calander.svg" alt="calendar" class="calendar-icon" />
            ${formattedDate}
          </span>
          <span class="eval-card-link">View report →</span>
        </div>
      </div>
    `;
  }

  getVerdict(evaluation) {
    const totalScore = Number(evaluation.total_score || 0);
    const summary = (evaluation.summary || '').trim();

    if (summary) {
      const firstSentence = summary.split(/[.!?]/).find((sentence) => sentence.trim().length > 0);
      if (firstSentence) {
        return this.truncateText(firstSentence.trim(), 56);
      }
    }

    if (totalScore >= 40) {
      return 'Strong answer with clear structure and depth';
    }

    if (totalScore >= 32) {
      return 'Balanced answer with room to sharpen analysis';
    }

    if (totalScore >= 24) {
      return 'Fair attempt with scope to improve depth';
    }

    return 'Basic attempt needing clearer structure and content';
  }

  getScoreClass(totalScore) {
    if (totalScore >= 40) return 'high';
    if (totalScore >= 30) return 'medium';
    return 'low';
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
    return text.substring(0, maxLength).trimEnd() + '...';
  }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.carouselManager = new CarouselManager();
});
