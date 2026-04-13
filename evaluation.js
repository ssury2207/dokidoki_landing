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
    const isValidationError = errorType === 'validation';
    const label = isValidationError ? 'Validation Issue' : 'Service Issue';
    const title = isValidationError
      ? 'We could not evaluate this answer yet.'
      : 'The evaluation could not be completed.';
    const helperText = isValidationError
      ? 'Try clearer photos with the full page visible and minimal glare.'
      : 'Your upload is safe. Please try again after a short while.';

    return `
      <div class="error-card">
        <div class="error-title">${label}</div>
        <div class="error-heading">${title}</div>
        <div class="error-message">${errorMessage}</div>
        <div class="error-helper">${helperText}</div>
      </div>
    `;
  }

  buildCardsHTML(data) {
    const scoreClass = data.total_score >= 40 ? 'high' : data.total_score >= 30 ? 'medium' : 'low';
    const formattedDate = data.created_at ? this.formatDate(data.created_at) : '';
    const verdict = this.buildVerdict(data);
    const question = data.extracted_question || data.question_text || '';
    const strengths = Array.isArray(data.strengths) ? data.strengths : [];
    const improvements = Array.isArray(data.improvements) ? data.improvements : [];

    return `
      <div class="result-card report-overview-card">
        <div class="report-overview-top">
          <div class="score-container score-container-left">
            <span class="score-text ${scoreClass}">${data.total_score.toFixed(1)}</span>
            <span class="score-out-of">/ 50</span>
          </div>
          <div class="report-verdict">${verdict}</div>
        </div>

        ${(question || formattedDate) ? `
          <div class="report-meta">
            ${question ? `
              <div class="report-meta-item">
                <span class="report-meta-label">Question</span>
                <span class="report-meta-value">${question}</span>
              </div>
            ` : ''}
            ${formattedDate ? `
              <div class="report-meta-item">
                <span class="report-meta-label">Evaluated On</span>
                <span class="report-meta-value">${formattedDate}</span>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>

      <div class="result-card">
        <div class="card-title">Evaluation Breakdown</div>
        ${this.buildBreakdownRow('Relevance & Understanding', data.relevance_score)}
        ${this.buildBreakdownRow('Structure & Organization', data.structure_score)}
        ${this.buildBreakdownRow('Content Depth & Examples', data.content_depth_score)}
        ${this.buildBreakdownRow('Presentation & Neatness', data.presentation_score)}
        ${this.buildBreakdownRow('Innovation / Value Addition', data.innovation_score)}
      </div>

      <div class="result-card">
        <div class="card-title">Overall Feedback</div>
        <div class="feedback-text">${data.summary || 'No summary available.'}</div>
      </div>

      <div class="report-grid">
        <div class="result-card report-list-card">
          <div class="card-title">What Worked</div>
          ${strengths.map(strength => `
            <div class="list-item">
              <div class="bullet-point strength"></div>
              <div class="list-text">${strength}</div>
            </div>
          `).join('') || `
            <div class="list-empty">No strengths available.</div>
          `}
        </div>

        <div class="result-card report-list-card">
          <div class="card-title">What To Improve</div>
          ${improvements.map(improvement => `
            <div class="list-item">
              <div class="bullet-point improvement"></div>
              <div class="list-text">${improvement}</div>
            </div>
          `).join('') || `
            <div class="list-empty">No improvement notes available.</div>
          `}
        </div>
      </div>

      <div class="result-card">
        <div class="card-title">Detailed Analysis</div>
        <div class="feedback-text">${data.detailed_feedback || 'No detailed analysis available.'}</div>
      </div>

      ${data.suggestions ? `
        <div class="result-card report-next-steps-card">
          <div class="card-title">Next Steps</div>
          <div class="feedback-text">${data.suggestions}</div>
        </div>
      ` : ''}
    `;
  }

  buildBreakdownRow(label, score) {
    const normalizedScore = Number(score || 0);
    const width = Math.max(0, Math.min(100, normalizedScore * 10));

    return `
      <div class="report-breakdown-row">
        <div class="report-breakdown-header">
          <span class="report-breakdown-label">${label}</span>
          <span class="report-breakdown-score">${normalizedScore.toFixed(1)}/10</span>
        </div>
        <div class="report-breakdown-bar">
          <div class="report-breakdown-fill" style="width: ${width}%"></div>
        </div>
      </div>
    `;
  }

  buildVerdict(data) {
    if (data.summary) {
      const firstSentence = data.summary
        .split(/[.!?]/)
        .map((sentence) => sentence.trim())
        .find(Boolean);

      if (firstSentence) {
        return firstSentence;
      }
    }

    if (data.total_score >= 40) {
      return 'Strong answer with clear structure and depth.';
    }

    if (data.total_score >= 30) {
      return 'Reasonably structured answer, but limited depth.';
    }

    return 'Basic attempt that needs stronger structure and content.';
  }

  formatDate(dateString) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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
