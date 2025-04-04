// Countdown Timer JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
});

function initCountdown() {
    // Set the wedding date - format: year, month (0-11), day, hour, minute, second
    const weddingDate = new Date(2025, 11, 23, 9, 0, 0); // November 23, 2025 at 9:00 AM
    
    // Get countdown elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error("Countdown elements not found");
        return;
    }
    
    function updateCountdown() {
        const currentDate = new Date();
        const difference = weddingDate - currentDate;
        
        // If the wedding date has passed
        if (difference < 0) {
            daysElement.innerText = "00";
            hoursElement.innerText = "00";
            minutesElement.innerText = "00";
            secondsElement.innerText = "00";
            return;
        }
        
        // Calculate time units
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update the countdown elements
        daysElement.innerText = days < 10 ? `0${days}` : days;
        hoursElement.innerText = hours < 10 ? `0${hours}` : hours;
        minutesElement.innerText = minutes < 10 ? `0${minutes}` : minutes;
        secondsElement.innerText = seconds < 10 ? `0${seconds}` : seconds;
        
        // Add pulse animation on seconds change
        secondsElement.classList.add('pulse');
        setTimeout(() => {
            secondsElement.classList.remove('pulse');
        }, 900);
    }
    
    // Initial update
    updateCountdown();
    
    // Update the countdown every second
    setInterval(updateCountdown, 1000);
}