/**
 * Main Application
 * Orchestrates upload, evaluation, and UI state management
 */

class DokiDokiApp {
  constructor() {
    // Initialize modules
    this.uploadManager = new UploadManager();
    this.evaluationManager = new EvaluationManager();
    this.loadingManager = new LoadingManager();

    // Supabase config
    this.SUPABASE_URL = 'https://seiwhmnvyrrhqkglovwo.supabase.co';
    this.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlaXdobW52eXJyaHFrZ2xvdndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNTI1MDAsImV4cCI6MjA3NzgyODUwMH0.bdbx4Y595Np78NNMHwF7lxMwDO4CSPnudG1TZ6eTjMM';

    // DOM elements
    this.uploadSection = document.getElementById('uploadSection');
    this.sendButton = document.getElementById('sendButton');

    this.init();
  }

  init() {
    // Bind send button
    this.sendButton.addEventListener('click', () => this.handleSend());

    // Make uploadAnother available globally
    window.uploadAnother = () => this.uploadAnother();

    // Bind load evaluations button
    const loadEvalBtn = document.getElementById('loadEvaluationsBtn');
    if (loadEvalBtn) {
      loadEvalBtn.addEventListener('click', async () => {
        try {
          const response = await fetch('https://seiwhmnvyrrhqkglovwo.supabase.co/functions/v1/get_ai_evaluations');
          const text = await response.text();
          console.log('Raw response:', text);

          try {
            const data = JSON.parse(text);
            console.log('API Data:', data);
          } catch (e) {
            console.error('Response is not JSON:', text);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }

    // Carousel navigation
    this.initCarousel();
  }

  initCarousel() {
    const track = document.getElementById('evalCarouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 245; // Card width (220px) + gap (25px)

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  async handleSend() {
    if (!this.uploadManager.hasFiles()) {
      return;
    }

    // Get image URLs for display (these are data URIs)
    const imageURLs = await this.uploadManager.getImageURLs();

    // Show loading modal
    this.showLoading();

    // Hide upload section
    this.uploadSection.style.display = 'none';

    // Call edge function for AI evaluation
    try {
      console.log('Sending images for AI evaluation...');

      const response = await fetch(`${this.SUPABASE_URL}/functions/v1/web-evaluator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          images: imageURLs  // These are base64 data URIs
        })
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate images');
      }

      const result = await response.json();
      console.log('Evaluation result:', result);

      // Hide loading
      this.hideLoading();

      // Check if evaluation was successful
      if (result.success && result.data && result.post_id) {
        // Store evaluation data in localStorage
        localStorage.setItem('myEvaluation', JSON.stringify(result));

        // Open new tab with post_id
        window.open(`myEvaluationReport.html?id=${result.post_id}`, '_blank');

        // Reset for next upload
        this.uploadAnother();
      } else if (result.validation_failed) {
        // Show validation error
        throw { type: 'validation', message: result.error };
      } else {
        throw new Error(result.error || 'Evaluation failed');
      }
    } catch (error) {
      console.error('Evaluation failed:', error);

      // Hide loading
      this.hideLoading();

      // Store error data in localStorage
      localStorage.setItem('myEvaluationError', JSON.stringify({
        type: error.type || 'technical',
        message: error.message || 'An unexpected error occurred. Please try again.'
      }));

      // Open new tab with error state
      window.open('myEvaluationReport.html?error=true', '_blank');

      // Reset for next upload
      this.uploadAnother();
    }
  }

  showLoading() {
    this.loadingManager.show();
  }

  hideLoading() {
    this.loadingManager.hide();
  }

  uploadAnother() {
    // Reset upload manager
    this.uploadManager.reset();

    // Hide results
    this.evaluationManager.hide();

    // Show upload section
    this.uploadSection.style.display = 'block';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new DokiDokiApp();
});
