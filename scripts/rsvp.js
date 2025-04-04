// RSVP Form Functionality

document.addEventListener('DOMContentLoaded', function() {
    initRSVPForm();
});

function initRSVPForm() {
    const rsvpForm = document.getElementById('rsvp-form');
    
    if (!rsvpForm) return;
    
    // Form validation and submission
    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('guest-name').value.trim();
        const email = document.getElementById('guest-email').value.trim();
        const attending = document.querySelector('input[name="attending"]:checked')?.value;
        const guests = document.getElementById('guest-count').value;
        const dietaryRestrictions = document.getElementById('dietary-restrictions').value.trim();
        const events = [];
        
        document.querySelectorAll('input[name="events"]:checked').forEach(checkbox => {
            events.push(checkbox.value);
        });
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        if (!name) {
            isValid = false;
            errorMessage += 'Please enter your name.\n';
            highlightError('guest-name');
        } else {
            removeHighlight('guest-name');
        }
        
        if (!email) {
            isValid = false;
            errorMessage += 'Please enter your email.\n';
            highlightError('guest-email');
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
            highlightError('guest-email');
        } else {
            removeHighlight('guest-email');
        }
        
        if (!attending) {
            isValid = false;
            errorMessage += 'Please select whether you are attending.\n';
            document.querySelector('.radio-group').classList.add('error');
        } else {
            document.querySelector('.radio-group').classList.remove('error');
        }
        
        if (attending === 'yes' && events.length === 0) {
            isValid = false;
            errorMessage += 'Please select at least one event you will attend.\n';
            document.querySelector('.checkbox-group').classList.add('error');
        } else {
            document.querySelector('.checkbox-group').classList.remove('error');
        }
        
        // If form is not valid, show error message
        if (!isValid) {
            showMessage(errorMessage, 'error');
            return;
        }
        
        // Prepare form data
        const formData = {
            name,
            email,
            attending,
            guests: attending === 'yes' ? guests : 0,
            dietaryRestrictions,
            events: attending === 'yes' ? events : []
        };
        
        // Show loading state
        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="spinner"></div> Submitting...';
        submitBtn.disabled = true;
        
        // Simulate form submission (would be replaced with actual API call)
        setTimeout(() => {
            // Reset form
            rsvpForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessScreen(formData);
            
            // Log data (would be sent to server in real implementation)
            console.log('RSVP Form Data:', formData);
        }, 1500);
    });
    
    // Toggle additional fields based on attendance
    const attendingRadios = document.querySelectorAll('input[name="attending"]');
    const additionalFields = document.getElementById('additional-fields');
    
    attendingRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                additionalFields.style.display = 'block';
                additionalFields.classList.add('fade-in');
            } else {
                additionalFields.style.display = 'none';
            }
        });
    });
    
    // Update guest count display
    const guestCountInput = document.getElementById('guest-count');
    const guestCountDisplay = document.getElementById('guest-count-display');
    
    if (guestCountInput && guestCountDisplay) {
        guestCountInput.addEventListener('input', function() {
            guestCountDisplay.textContent = this.value;
        });
    }
}

// Validate email format
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Highlight error fields
function highlightError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('error');
    }
}

// Remove highlight
function removeHighlight(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('error');
    }
}

// Show message
function showMessage(message, type = 'info') {
    const messageContainer = document.getElementById('message-container');
    
    if (!messageContainer) return;
    
    messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
    messageContainer.style.display = 'block';
    
    // Scroll to message
    messageContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Clear message after timeout for success and info messages
    if (type !== 'error') {
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 5000);
    }
}

// Show success screen
function showSuccessScreen(formData) {
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpContainer = rsvpForm.parentElement;
    
    // Create success message
    const successScreen = document.createElement('div');
    successScreen.className = 'success-screen scale-in';
    
    let messageContent = `
        <h2><i class="fas fa-check-circle"></i> Thank You!</h2>
        <p>We have received your RSVP.</p>
    `;
    
    if (formData.attending === 'yes') {
        messageContent += `
            <p>We're excited to celebrate with you, ${formData.name}!</p>
            <div class="rsvp-details">
                <p><strong>Number of Guests:</strong> ${parseInt(formData.guests) + 1}</p>
                <p><strong>Events:</strong> ${formData.events.join(', ')}</p>
            </div>
            <p>A confirmation email will be sent to <strong>${formData.email}</strong></p>
        `;
    } else {
        messageContent += `
            <p>We're sorry you can't make it, ${formData.name}.</p>
            <p>Thank you for letting us know.</p>
        `;
    }
    
    messageContent += `
        <button id="back-to-form" class="btn">Back to Form</button>
    `;
    
    successScreen.innerHTML = messageContent;
    
    // Hide form and show success screen
    rsvpForm.style.display = 'none';
    rsvpContainer.appendChild(successScreen);
    
    // Back to form button
    document.getElementById('back-to-form').addEventListener('click', function() {
        rsvpForm.style.display = 'block';
        rsvpContainer.removeChild(successScreen);
    });
}