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
    this.inlineLoaderPreview = document.getElementById('inlineLoaderPreview');
    this.inlineLoaderStatus = document.getElementById('inlineLoaderStatus');
    this.inlineLoaderTime = document.getElementById('inlineLoaderTime');

    this.inlineLoaderMessages = [
      { at: 0, text: 'Reading your answer sheets' },
      { at: 4, text: 'Identifying the question and structure' },
      { at: 8, text: 'Reviewing relevance and answer flow' },
      { at: 12, text: 'Checking depth, examples, and coverage' },
      { at: 17, text: 'Scoring each evaluation parameter' },
      { at: 22, text: 'Preparing your final feedback' }
    ];
    this.inlineLoaderTimer = null;
    this.inlineLoaderElapsedSeconds = 0;
    this.isEvaluating = false;

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
    if (!this.uploadManager.hasFiles() || this.isEvaluating) {
      return;
    }

    // Get image URLs for display (these are data URIs)
    const imageURLs = await this.uploadManager.getImageURLs();

    this.beginInlineEvaluation();

    try {
      const evaluation = await this.fetchAIEvaluation(imageURLs);

      this.finishInlineEvaluation();
      this.evaluationManager.displayResults(imageURLs, evaluation);
    } catch (error) {
      console.error('Evaluation failed:', error);
      this.finishInlineEvaluation();
      this.evaluationManager.displayError(
        imageURLs,
        error.type || 'technical',
        error.message || 'An unexpected error occurred. Please try again.'
      );
    }
  }

  async fetchAIEvaluation(imageURLs) {
    console.log('Sending images for AI evaluation...');

    const response = await fetch(`${this.SUPABASE_URL}/functions/v1/web-evaluator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        images: imageURLs
      })
    });

    if (!response.ok) {
      throw new Error('Failed to evaluate images');
    }

    const result = await response.json();
    console.log('Evaluation result:', result);

    if (result.success && result.data) {
      return this.mapAPIResultToEvaluation(result.data);
    }

    if (result.validation_failed) {
      throw { type: 'validation', message: result.error };
    }

    throw new Error(result.error || 'Evaluation failed');
  }

  mapAPIResultToEvaluation(data) {
    return {
      total_score: data.scores?.total || 0,
      relevance_score: data.scores?.relevance || 0,
      structure_score: data.scores?.structure || 0,
      content_depth_score: data.scores?.content_depth || 0,
      presentation_score: data.scores?.presentation || 0,
      innovation_score: data.scores?.innovation || 0,
      summary: data.analysis?.summary || '',
      strengths: data.analysis?.strengths || [],
      improvements: data.analysis?.improvements || [],
      detailed_feedback: data.analysis?.detailed || '',
      suggestions: data.analysis?.suggestions || '',
      extracted_question: data.question?.extracted_text || '',
      created_at: new Date().toISOString()
    };
  }

  beginInlineEvaluation() {
    this.isEvaluating = true;
    this.uploadManager.setProcessingState(true);
    this.startInlineLoaderPreview();
  }

  finishInlineEvaluation() {
    this.isEvaluating = false;
    this.uploadManager.setProcessingState(false);
    this.stopInlineLoaderPreview();
  }

  uploadAnother() {
    this.finishInlineEvaluation();

    // Reset upload manager
    this.uploadManager.reset();

    // Hide results
    this.evaluationManager.hide();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  startInlineLoaderPreview() {
    if (!this.inlineLoaderPreview) return;

    this.stopInlineLoaderPreview();

    this.inlineLoaderElapsedSeconds = 0;
    this.setInlineLoaderMessage(this.getInlineLoaderMessage(0), false);
    this.inlineLoaderTime.textContent = '0s';
    this.inlineLoaderPreview.classList.add('active');

    this.inlineLoaderTimer = setInterval(() => {
      this.inlineLoaderElapsedSeconds += 1;
      this.setInlineLoaderMessage(this.getInlineLoaderMessage(this.inlineLoaderElapsedSeconds));
      this.inlineLoaderTime.textContent = `${this.inlineLoaderElapsedSeconds}s`;
    }, 1000);
  }

  stopInlineLoaderPreview() {
    if (this.inlineLoaderTimer) {
      clearInterval(this.inlineLoaderTimer);
      this.inlineLoaderTimer = null;
    }

    if (this.inlineLoaderPreview) {
      this.inlineLoaderPreview.classList.remove('active');
    }
  }

  getInlineLoaderMessage(elapsedSeconds) {
    let currentMessage = this.inlineLoaderMessages[0].text;

    this.inlineLoaderMessages.forEach((message) => {
      if (elapsedSeconds >= message.at) {
        currentMessage = message.text;
      }
    });

    return currentMessage;
  }

  setInlineLoaderMessage(message, shouldAnimate = true) {
    if (!this.inlineLoaderStatus) return;
    if (this.inlineLoaderStatus.textContent === message) return;

    this.inlineLoaderStatus.getAnimations?.().forEach((animation) => animation.cancel());

    if (!shouldAnimate || typeof this.inlineLoaderStatus.animate !== 'function') {
      this.inlineLoaderStatus.textContent = message;
      return;
    }

    const fadeOut = this.inlineLoaderStatus.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-10px)' }
      ],
      {
        duration: 170,
        easing: 'cubic-bezier(0.32, 0, 0.67, 0)'
      }
    );

    fadeOut.onfinish = () => {
      this.inlineLoaderStatus.textContent = message;

      this.inlineLoaderStatus.animate(
        [
          { opacity: 0, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        {
          duration: 220,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
        }
      );
    };
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new DokiDokiApp();
});
