/**
 * Upload Module
 * Handles file upload, thumbnail display, and upload bar interactions
 */

class UploadManager {
  constructor() {
    this.selectedFiles = [];
    this.uploadedImageURLs = [];
    this.MAX_FILES = 3;
    this.isProcessing = false;

    // DOM elements
    this.fileInput = document.getElementById('fileInput');
    this.thumbnailsContainer = document.getElementById('thumbnailsContainer');
    this.errorMessage = document.getElementById('errorMessage');
    this.uploadBar = document.getElementById('uploadBar');
    this.sendButton = document.getElementById('sendButton');
    this.attachLabel = document.getElementById('attachLabel');

    this.init();
  }

  init() {
    // Bind file input change event
    this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
  }

  handleFileSelect(e) {
    const newFiles = Array.from(e.target.files);

    // Add new files if under limit
    newFiles.forEach(file => {
      if (this.selectedFiles.length < this.MAX_FILES) {
        this.selectedFiles.push(file);
      }
    });

    // Update UI
    this.updateThumbnails();

    // Reset input
    this.fileInput.value = '';
  }

  updateThumbnails() {
    // Clear thumbnails
    this.thumbnailsContainer.innerHTML = '';

    if (this.isProcessing) {
      this.attachLabel.style.display = 'none';
      this.sendButton.style.display = 'none';
      this.errorMessage.textContent = '';
      this.fileInput.disabled = true;
      this.uploadBar.classList.add('is-processing');
    } else {
      this.uploadBar.classList.remove('is-processing');
    }

    // Show/hide buttons based on file count
    if (!this.isProcessing && this.selectedFiles.length === 0) {
      // No images: show attachment, hide send button
      this.attachLabel.style.display = 'block';
      this.sendButton.style.display = 'none';
      this.errorMessage.textContent = '';
      this.fileInput.disabled = false;
      this.uploadBar.classList.remove('max-files');
    } else if (!this.isProcessing && this.selectedFiles.length < this.MAX_FILES) {
      // 1-2 images: show both attachment and send button
      this.attachLabel.style.display = 'block';
      this.sendButton.style.display = 'flex';
      this.errorMessage.textContent = '';
      this.fileInput.disabled = false;
      this.uploadBar.classList.remove('max-files');
    } else if (!this.isProcessing && this.selectedFiles.length === this.MAX_FILES) {
      // 3 images: hide attachment, show send button, show error
      this.attachLabel.style.display = 'none';
      this.sendButton.style.display = 'flex';
      this.errorMessage.textContent = 'Maximum 3 images';
      this.fileInput.disabled = true;
      this.uploadBar.classList.add('max-files');
    }

    // Display thumbnails
    this.selectedFiles.forEach((file, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'thumbnail-wrapper';

      const img = document.createElement('img');
      img.className = 'thumbnail';

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);

      const removeBtn = document.createElement('button');
      removeBtn.className = 'thumbnail-remove';
      removeBtn.textContent = '✕';
      removeBtn.disabled = this.isProcessing;
      removeBtn.style.display = this.isProcessing ? 'none' : 'flex';
      removeBtn.onclick = (e) => {
        e.stopPropagation();
        this.removeFile(index);
      };

      wrapper.appendChild(img);
      wrapper.appendChild(removeBtn);
      this.thumbnailsContainer.appendChild(wrapper);
    });
  }

  removeFile(index) {
    this.selectedFiles.splice(index, 1);
    this.updateThumbnails();
  }

  getFiles() {
    return this.selectedFiles;
  }

  getImageURLs() {
    return new Promise((resolve) => {
      this.uploadedImageURLs = [];
      let loadedCount = 0;

      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImageURLs.push(e.target.result);
          loadedCount++;

          if (loadedCount === this.selectedFiles.length) {
            resolve(this.uploadedImageURLs);
          }
        };
        reader.readAsDataURL(file);
      });
    });
  }

  reset() {
    this.selectedFiles = [];
    this.uploadedImageURLs = [];
    this.isProcessing = false;
    this.updateThumbnails();
  }

  hasFiles() {
    return this.selectedFiles.length > 0;
  }

  setProcessingState(isProcessing) {
    this.isProcessing = isProcessing;
    this.updateThumbnails();
  }
}

// Export for use in other modules
window.UploadManager = UploadManager;
