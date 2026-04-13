/**
 * My Evaluation View Module
 * Handles displaying user's own evaluation reports in myEvaluationReport.html
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const evaluationId = urlParams.get('id');
  const isError = urlParams.get('error');

  // Check if this is an error state
  if (isError === 'true') {
    displayError();
    return;
  }

  // Get evaluation data from localStorage
  const evaluationData = JSON.parse(localStorage.getItem('myEvaluation'));

  // If no data, redirect to home
  if (!evaluationData) {
    console.error('No evaluation data found');
    window.location.href = 'index.html';
    return;
  }

  // Verify ID matches (for security/consistency)
  if (evaluationId && evaluationData.post_id !== evaluationId) {
    console.warn('ID mismatch - URL ID does not match stored evaluation');
  }

  // Display uploaded images
  displayImages(evaluationData);

  // Display evaluation cards
  displayEvaluationCards(evaluationData);
});

function displayImages(evaluationData) {
  const imagesContainer = document.getElementById('uploadedImages');

  // Get images from response
  const images = evaluationData.images || [];

  if (images.length === 0) {
    imagesContainer.style.display = 'none';
    return;
  }

  imagesContainer.innerHTML = '';
  images.forEach(imageObj => {
    const img = document.createElement('img');
    img.className = 'uploaded-image';

    // Handle different image formats from API
    if (imageObj.fileData?.fileUri) {
      img.src = imageObj.fileData.fileUri;
    } else if (imageObj.inlineData?.data) {
      img.src = `data:${imageObj.inlineData.mimeType};base64,${imageObj.inlineData.data}`;
    } else if (typeof imageObj === 'string') {
      img.src = imageObj;
    }

    img.alt = 'Answer sheet';

    // Add click handler to open image viewer
    img.addEventListener('click', () => openImageViewer(img.src));

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

function displayEvaluationCards(evaluationData) {
  const cardsContainer = document.getElementById('evaluationCards');

  // Transform API response to match EvaluationManager format
  const evaluation = transformEvaluationData(evaluationData);

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

function transformEvaluationData(evaluationData) {
  const data = evaluationData.data || {};

  // Transform API response structure to match expected format
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
    created_at: evaluationData.created_at || ''
  };
}

function displayError() {
  const imagesContainer = document.getElementById('uploadedImages');
  const cardsContainer = document.getElementById('evaluationCards');

  // Hide images section
  imagesContainer.style.display = 'none';

  // Get error data from localStorage
  const errorData = JSON.parse(localStorage.getItem('myEvaluationError'));

  const errorTitle = errorData?.type === 'validation' ? 'Validation Error' : 'Service Error';
  const errorMessage = errorData?.message || 'An unexpected error occurred. Please try again.';

  // Display error card
  cardsContainer.innerHTML = `
    <div class="error-card">
      <div class="error-title">${errorTitle}</div>
      <div class="error-message">${errorMessage}</div>
      <button class="error-button" onclick="window.location.href='index.html'">
        Try Again
      </button>
    </div>
  `;
}
