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
      if (result.success && result.data) {
        // Map the API response to our frontend format
        const evaluation = result.data;
        const scores = {
          relevance_score: evaluation.scores.relevance,
          structure_score: evaluation.scores.structure,
          content_depth_score: evaluation.scores.content_depth,
          presentation_score: evaluation.scores.presentation,
          innovation_score: evaluation.scores.innovation,
          total_score: evaluation.scores.total,
          summary: evaluation.analysis.summary,
          detailed_feedback: evaluation.analysis.detailed,
          strengths: evaluation.analysis.strengths,
          improvements: evaluation.analysis.improvements
        };

        // Display results
        this.evaluationManager.displayResults(imageURLs, scores);
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

      // Display error card
      this.evaluationManager.displayError(
        imageURLs,
        error.type || 'technical',
        error.message || 'An unexpected error occurred. Please try again.'
      );
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
