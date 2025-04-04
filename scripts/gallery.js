// Gallery and QR Photo Upload JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initQRUpload();
});

// Photo Gallery Functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;
    
    // Create a modal for showing full-size images
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="Full size image" id="modal-image">
            <div class="navigation-buttons">
                <button class="nav-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                <button class="nav-btn next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Get modal elements
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    // Click on gallery item to open modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            modalImg.src = imgSrc;
            modal.style.display = 'flex';
            currentIndex = index;
            updateNavButtons();
            
            // Add animation class
            modalImg.classList.add('scale-in');
            setTimeout(() => {
                modalImg.classList.remove('scale-in');
            }, 500);
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Navigate through images
    prevBtn.addEventListener('click', function() {
        navigateGallery('prev');
    });
    
    nextBtn.addEventListener('click', function() {
        navigateGallery('next');
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'flex') {
            if (event.key === 'ArrowLeft') {
                navigateGallery('prev');
            } else if (event.key === 'ArrowRight') {
                navigateGallery('next');
            } else if (event.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
    
    function navigateGallery(direction) {
        if (direction === 'prev') {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
        } else {
            currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
        }
        
        const imgSrc = galleryItems[currentIndex].querySelector('img').src;
        
        // Add animation class
        modalImg.classList.add('fade-in');
        setTimeout(() => {
            modalImg.classList.remove('fade-in');
        }, 500);
        
        modalImg.src = imgSrc;
        updateNavButtons();
    }
    
    function updateNavButtons() {
        // Always show both buttons for circular navigation
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
}

// QR Code Photo Upload Functionality
function initQRUpload() {
    const uploadSection = document.getElementById('upload-section');
    
    if (!uploadSection) return;
    
    // Create file input and upload button
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'photo-upload';
    fileInput.accept = 'image/*';
    fileInput.multiple = true;
    fileInput.style.display = 'none';
    
    const uploadBtn = document.createElement('button');
    uploadBtn.className = 'btn';
    uploadBtn.innerHTML = 'Select Photos to Upload';
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Add camera capture option for mobile devices
    const captureBtn = document.createElement('button');
    captureBtn.className = 'btn';
    captureBtn.innerHTML = '<i class="fas fa-camera"></i> Take Photo';
    captureBtn.style.marginLeft = '10px';
    captureBtn.addEventListener('click', function() {
        // Create a temporary input with camera capture
        const captureInput = document.createElement('input');
        captureInput.type = 'file';
        captureInput.accept = 'image/*';
        captureInput.capture = 'camera';
        captureInput.style.display = 'none';
        document.body.appendChild(captureInput);
        
        captureInput.addEventListener('change', function(e) {
            handleFiles(e.target.files);
            document.body.removeChild(captureInput);
        });
        
        captureInput.click();
    });
    
    // Create upload status container
    const statusContainer = document.createElement('div');
    statusContainer.className = 'upload-status';
    statusContainer.style.marginTop = '20px';
    
    // Add elements to the upload section
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'upload-buttons';
    buttonContainer.appendChild(uploadBtn);
    buttonContainer.appendChild(captureBtn);
    
    uploadSection.appendChild(buttonContainer);
    uploadSection.appendChild(fileInput);
    uploadSection.appendChild(statusContainer);
    
    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        handleFiles(e.target.files);
    });
    
    function handleFiles(files) {
        if (files.length === 0) return;
        
        statusContainer.innerHTML = '';
        
        // Create a heading for the status
        const heading = document.createElement('h3');
        heading.textContent = 'Uploading Photos...';
        statusContainer.appendChild(heading);
        
        // Process each file
        Array.from(files).forEach((file, index) => {
            // Create status item for each file
            const statusItem = document.createElement('div');
            statusItem.className = 'status-item';
            statusItem.innerHTML = `
                <p>${file.name}</p>
                <div class="progress-bar">
                    <div class="progress" id="progress-${index}" style="width: 0%"></div>
                </div>
            `;
            statusContainer.appendChild(statusItem);
            
            // Simulate upload process
            simulateUpload(index);
        });
    }
    
    function simulateUpload(index) {
        const progressBar = document.getElementById(`progress-${index}`);
        let width = 0;
        
        // Simulate progress updates
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                // Change color when complete
                progressBar.style.backgroundColor = '#4CAF50';
            } else {
                width += Math.random() * 10;
                if (width > 100) width = 100;
                progressBar.style.width = width + '%';
            }
        }, 200);
        
        // After "upload" is complete, update status
        setTimeout(() => {
            if (document.querySelectorAll('.progress[style*="width: 100%"]').length === 
                document.querySelectorAll('.progress').length) {
                
                const heading = statusContainer.querySelector('h3');
                if (heading) {
                    heading.textContent = 'All Photos Uploaded Successfully!';
                }
                
                // Add a thank you message
                const thankYou = document.createElement('p');
                thankYou.textContent = 'Thank you for sharing your photos with us!';
                statusContainer.appendChild(thankYou);
            }
        }, 3000);
    }
}