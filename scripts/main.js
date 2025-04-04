// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initMusicPlayer();
    initAnimations();
});

// Navigation Menu Toggle
function initNavigation() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate the menu icon
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            });
        });
    }
}

// Background Music Player
function initMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const volumeIcon = document.getElementById('volume-icon');
    
    if (musicToggle && backgroundMusic && volumeIcon) {
        let isPlaying = false;
        
        // Auto-play is often blocked by browsers, so we default to paused
        // backgroundMusic.pause();
        
        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                backgroundMusic.pause();
                volumeIcon.className = 'fas fa-volume-mute';
            } else {
                backgroundMusic.play()
                    .then(() => {
                        volumeIcon.className = 'fas fa-volume-up';
                    })
                    .catch(error => {
                        console.error("Audio playback failed: ", error);
                        volumeIcon.className = 'fas fa-volume-mute';
                    });
            }
            
            isPlaying = !isPlaying;
        });
    }
}

// Animations on Scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Add Animation Classes to Elements
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => title.classList.add('fade-in'));
    
    // Add slide-up class to event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => card.classList.add('slide-up'));
    
    // Add scale-in class to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => item.classList.add('scale-in'));
});

const people = [
    {
      name: "Jagruti",
      role: "Bridesmaid (करवली)",
      bio: "Shivani’s partner in crime and go-to dance partner. She brings laughter, love, and emergency snacks. The spark of the family, Jagruti is the unofficial wedding planner.",
      image: "assets/images/wedding-party/jagruti.jpg"
    },
    {
      name: "Shubhi",
      role: "Bridesmaid (करवली)",
      bio: "Shivani’s bestie, college roommate, and the one who cared the most—basically her second mom, therapist, and alarm clock combined.",
      image: "assets/images/wedding-party/shubhi.jpg"
    },
    {
      name: "Mrs. Ranjana",
      role: "Bride’s Mom",
      bio: "The most caring and supportive mom—who can switch from ‘You’re my everything’ to ‘No one will marry you if you keep living like this’ in record time.",
      image: "assets/images/wedding-party/mum.jpg"
    },
    {
      name: "Harry",
      role: "Groomsmen",
      bio: "Shivani’s college buddy and the unpaid photographer because every gang needs someone who brings a DSLR and zero complaints.",
      image: "assets/images/wedding-party/harry.jpg"
    }
    // {
    //   name: "Jagruti",
    //   role: "Bride’s Sister",
    //   bio: "The spark of the family, Jagruti is the unofficial wedding planner.",
    //   image: "assets/images/wedding-party/person5.jpg"
    // }
  ];
  
  let currentIndex = 0;
  
  function showNextPerson() {
    const display = document.getElementById("person-display");
    const person = people[currentIndex];
  
    display.innerHTML = `
      <img src="${person.image}" alt="${person.name}" class="person-photo">
      <h3 class="person-name">${person.name}</h3>
      <p class="person-role">${person.role}</p>
      <p class="person-bio">${person.bio}</p>
    `;
  
    currentIndex = (currentIndex + 1) % people.length;
  }
  
  // Start rotating every 2 seconds
  setInterval(showNextPerson, 2000);
  
  // Initial display
  document.addEventListener("DOMContentLoaded", showNextPerson);