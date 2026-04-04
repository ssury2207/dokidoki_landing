/**
 * Evaluation Module
 * Handles displaying evaluation results in card format
 */

class EvaluationManager {
  constructor() {
    // DOM elements
    this.resultsSection = document.getElementById('resultsSection');
    this.uploadedImagesContainer = document.getElementById('uploadedImages');

    this.init();
  }

  init() {
    // Initialization if needed
  }

  displayResults(imageURLs, data) {
    // Display uploaded images
    this.displayUploadedImages(imageURLs);

    // Build and inject HTML for all cards
    const cardsHTML = this.buildCardsHTML(data);
    const cardsContainer = document.getElementById('evaluationCards');
    cardsContainer.innerHTML = cardsHTML;

    // Bind toggle breakdown button after HTML is injected
    setTimeout(() => {
      const toggleBtn = document.getElementById('toggleBreakdown');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggleBreakdown());
      }
    }, 100);

    // Show results section
    this.resultsSection.classList.add('active');

    // Scroll to results
    this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  displayError(imageURLs, errorType, errorMessage) {
    // Display uploaded images
    this.displayUploadedImages(imageURLs);

    // Build error card
    const errorHTML = this.buildErrorHTML(errorType, errorMessage);
    const cardsContainer = document.getElementById('evaluationCards');
    cardsContainer.innerHTML = errorHTML;

    // Show results section
    this.resultsSection.classList.add('active');

    // Scroll to results
    this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  buildErrorHTML(errorType, errorMessage) {
    const title = errorType === 'validation' ? 'Validation Error' : 'Service Error';

    return `
      <div class="error-card">
        <div class="error-title">${title}</div>
        <div class="error-message">${errorMessage}</div>
      </div>
    `;
  }

  buildCardsHTML(data) {
    const scoreClass = data.total_score >= 40 ? 'high' : data.total_score >= 30 ? 'medium' : 'low';

    return `
      <!-- Overall Score Card -->
      <div class="result-card">
        <div class="card-title">Overall Score</div>
        <div class="score-container">
          <span class="score-text ${scoreClass}">${data.total_score.toFixed(1)}</span>
          <span class="score-out-of">/ 50</span>
        </div>

        <button class="toggle-breakdown" id="toggleBreakdown">
          ▼ View Detailed Breakdown
        </button>

        <div class="breakdown-details" id="breakdownDetails">
          <div class="breakdown-item">1. Relevance & Understanding: ${data.relevance_score.toFixed(1)}/10</div>
          <div class="breakdown-item">2. Structure & Organization: ${data.structure_score.toFixed(1)}/10</div>
          <div class="breakdown-item">3. Content Depth & Examples: ${data.content_depth_score.toFixed(1)}/10</div>
          <div class="breakdown-item">4. Presentation & Neatness: ${data.presentation_score.toFixed(1)}/10</div>
          <div class="breakdown-item">5. Innovation / Value Addition: ${data.innovation_score.toFixed(1)}/10</div>
        </div>
      </div>

      <!-- Overall Feedback Card -->
      <div class="result-card">
        <div class="card-title">Overall Feedback</div>
        <div class="feedback-text">${data.summary}</div>
      </div>

      <!-- Strengths Card -->
      <div class="result-card">
        <div class="card-title">Strengths ✓</div>
        ${data.strengths.map(strength => `
          <div class="list-item">
            <div class="bullet-point strength"></div>
            <div class="list-text">${strength}</div>
          </div>
        `).join('')}
      </div>

      <!-- Improvements Card -->
      <div class="result-card">
        <div class="card-title">Areas for Improvement</div>
        ${data.improvements.map(improvement => `
          <div class="list-item">
            <div class="bullet-point improvement"></div>
            <div class="list-text">${improvement}</div>
          </div>
        `).join('')}
      </div>

      <!-- Detailed Analysis Card -->
      <div class="result-card">
        <div class="card-title">Detailed Analysis</div>
        <div class="feedback-text">${data.detailed_feedback}</div>
      </div>

      <!-- Suggestions Card -->
      ${data.suggestions ? `
        <div class="result-card">
          <div class="card-title">Suggestions for Improvement</div>
          <div class="feedback-text">${data.suggestions}</div>
        </div>
      ` : ''}
    `;
  }

  displayUploadedImages(imageURLs) {
    this.uploadedImagesContainer.innerHTML = '';
    imageURLs.forEach(url => {
      const img = document.createElement('img');
      img.className = 'uploaded-image';
      img.src = url;
      this.uploadedImagesContainer.appendChild(img);
    });
  }

  toggleBreakdown() {
    const breakdownDetails = document.getElementById('breakdownDetails');
    const toggleBtn = document.getElementById('toggleBreakdown');

    if (!breakdownDetails || !toggleBtn) return;

    const isActive = breakdownDetails.classList.contains('active');
    if (isActive) {
      breakdownDetails.classList.remove('active');
      toggleBtn.textContent = '▼ View Detailed Breakdown';
    } else {
      breakdownDetails.classList.add('active');
      toggleBtn.textContent = '▲ Close Detailed Breakdown';
    }
  }

  hide() {
    this.resultsSection.classList.remove('active');

    // Clear uploaded images
    this.uploadedImagesContainer.innerHTML = '';

    // Clear evaluation cards
    const cardsContainer = document.getElementById('evaluationCards');
    if (cardsContainer) {
      cardsContainer.innerHTML = '';
    }
  }
}

// Export for use in other modules
window.EvaluationManager = EvaluationManager;
