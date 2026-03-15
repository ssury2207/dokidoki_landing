/**
 * Loader Module
 * Handles staged loading animation with timeline and timer
 */

class LoadingManager {
  constructor() {
    // DOM elements
    this.modalOverlay = document.getElementById('loadingModal');
    this.loaderCard = null;

    // State
    this.elapsedSeconds = 0;
    this.timer = null;
    this.currentStage = 0;

    // Loading stages
    this.loadingMessages = [
      "Processing your answer images...",
      "Reading your handwriting...",
      "Analyzing content quality...",
      "Evaluating answer structure...",
      "Finalizing evaluation report..."
    ];

    // Stage timing (in seconds)
    this.stageTiming = [0, 1, 3, 6, 10];
  }

  createLoaderHTML() {
    const timelineHTML = this.loadingMessages.map((message, index) => `
      <div class="timeline-item">
        <div class="icon-column">
          <span class="stage-icon" id="stageIcon${index}">○</span>
        </div>
        <div class="message-column">
          <div class="stage-message pending" id="stageMessage${index}">
            ${message}
          </div>
        </div>
      </div>
    `).join('');

    return `
      <div class="loader-card">
        <div class="loader-title">Evaluating Your Answer</div>
        <div class="timeline-container">
          ${timelineHTML}
        </div>
        <div class="timer-footer">
          <div class="timer-text" id="timerText">⏳ 0 s</div>
        </div>
      </div>
    `;
  }

  getCurrentStage() {
    for (let i = this.stageTiming.length - 1; i >= 0; i--) {
      if (this.elapsedSeconds >= this.stageTiming[i]) {
        return i;
      }
    }
    return 0;
  }

  updateStage() {
    const newStage = this.getCurrentStage();

    if (newStage !== this.currentStage) {
      this.currentStage = newStage;

      // Update all stages
      this.loadingMessages.forEach((_, index) => {
        const icon = document.getElementById(`stageIcon${index}`);
        const message = document.getElementById(`stageMessage${index}`);

        if (!icon || !message) return;

        if (index < this.currentStage) {
          // Completed stage
          icon.textContent = '✓';
          message.className = 'stage-message completed';
        } else if (index === this.currentStage) {
          // Active stage
          icon.textContent = '⚡';
          message.className = 'stage-message active';
        } else {
          // Pending stage
          icon.textContent = '○';
          message.className = 'stage-message pending';
        }
      });
    }
  }

  updateTimer() {
    const timerText = document.getElementById('timerText');
    if (timerText) {
      timerText.textContent = `⏳ ${this.elapsedSeconds} s`;
    }
  }

  show() {
    // Reset state
    this.elapsedSeconds = 0;
    this.currentStage = 0;

    // Inject HTML
    this.modalOverlay.innerHTML = this.createLoaderHTML();

    // Show modal
    this.modalOverlay.classList.add('active');

    // Start timer
    this.timer = setInterval(() => {
      this.elapsedSeconds++;
      this.updateStage();
      this.updateTimer();
    }, 1000);

    // Initialize first stage
    this.updateStage();
  }

  hide() {
    // Stop timer
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    // Hide modal
    this.modalOverlay.classList.remove('active');

    // Reset state
    this.elapsedSeconds = 0;
    this.currentStage = 0;
  }
}

// Export for use in other modules
window.LoadingManager = LoadingManager;
