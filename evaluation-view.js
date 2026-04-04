/**
 * Evaluation View Module
 * Handles displaying community evaluation reports in othersEvaluationReport.html
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const evaluationId = urlParams.get('id');

  // Get evaluation data from localStorage
  const evaluation = JSON.parse(localStorage.getItem('currentEvaluation'));

  // If no data, redirect to home
  if (!evaluation) {
    console.error('No evaluation data found');
    window.location.href = 'index.html';
    return;
  }

  // Verify ID matches (for security/consistency)
  if (evaluationId && evaluation.id !== evaluationId) {
    console.warn('ID mismatch - URL ID does not match stored evaluation');
  }

  // Display answer images
  displayImages(evaluation);

  // Display evaluation cards
  displayEvaluationCards(evaluation);
});

function displayImages(evaluation) {
  const imagesContainer = document.getElementById('uploadedImages');

  // Get images from nested posts.images structure
  const images = evaluation.posts?.images || [];

  if (images.length === 0) {
    imagesContainer.style.display = 'none';
    return;
  }

  imagesContainer.innerHTML = '';
  images.forEach(url => {
    const img = document.createElement('img');
    img.className = 'uploaded-image';
    img.src = url;
    img.alt = 'Answer sheet';

    // Add click handler to open image viewer
    img.addEventListener('click', () => openImageViewer(url));

    imagesContainer.appendChild(img);
  });
}

function openImageViewer(imageUrl) {
  const modal = document.getElementById('imageViewerModal');
  const img = document.getElementById('imageViewerImg');
  const closeBtn = document.getElementById('imageViewerClose');

  // Set image source
  img.src = imageUrl;

  // Show modal
  modal.classList.add('active');

  // Close on button click
  closeBtn.onclick = () => {
    modal.classList.remove('active');
  };

  // Close on background click
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  };

  // Close on Escape key
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape') {
      modal.classList.remove('active');
      document.removeEventListener('keydown', escapeHandler);
    }
  });
}

function displayEvaluationCards(evaluation) {
  const cardsContainer = document.getElementById('evaluationCards');

  // Use existing EvaluationManager to build cards
  const evaluationManager = new EvaluationManager();
  const cardsHTML = evaluationManager.buildCardsHTML(evaluation);

  cardsContainer.innerHTML = cardsHTML;

  // Bind toggle breakdown button
  setTimeout(() => {
    const toggleBtn = document.getElementById('toggleBreakdown');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const breakdownDetails = document.getElementById('breakdownDetails');
        const isActive = breakdownDetails.classList.contains('active');

        if (isActive) {
          breakdownDetails.classList.remove('active');
          toggleBtn.textContent = '▼ View Detailed Breakdown';
        } else {
          breakdownDetails.classList.add('active');
          toggleBtn.textContent = '▲ Close Detailed Breakdown';
        }
      });
    }
  }, 100);
}

