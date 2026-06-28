// JavaScript Functionality for Jeet Karkar's Digital Portfolio
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Typing Animation in Hero Section ---
    const typingContainer = document.querySelector('.typing-text');
    const phrases = [
        "Automation Engineer",
        "Industry 4.0 Solutions",
        "Industrial Dashboarding",
        "RFID Tracking & ID Systems",
        "Arduino & IoT Systems"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Remove character
            typingContainer.innerHTML = currentPhrase.substring(0, charIndex - 1) + '<span class="text-cursor"></span>';
            charIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            // Add character
            typingContainer.innerHTML = currentPhrase.substring(0, charIndex + 1) + '<span class="text-cursor"></span>';
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // Handle phrase completions
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Brief pause before typing next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing loop
    type();
    
    // --- 2. Interactive NFC Card Flip ---
    const nfcCard = document.getElementById('nfcCard');
    if (nfcCard) {
        nfcCard.addEventListener('click', () => {
            nfcCard.classList.toggle('flipped');
        });
    }
    
    // --- 3. Experience vs Education Timeline Toggle ---
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const timelines = {
        experience: document.getElementById('experience-timeline'),
        education: document.getElementById('education-timeline')
    };
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            
            // Toggle buttons activity
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Hide all timelines with transition
            Object.keys(timelines).forEach(key => {
                timelines[key].classList.remove('active');
            });
            
            // Show selected timeline
            if (timelines[target]) {
                timelines[target].classList.add('active');
            }
        });
    });
    
    // --- 4. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.12, // Reveal when 12% is visible
        rootMargin: "0px 0px -40px 0px"
    });
    
    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
    
    // --- 5. Mobile Navigation Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link, .btn-nav');
    
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Toggle hamburger icon state
            const bars = mobileToggle.querySelectorAll('.bar');
            if (navLinksContainer.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                
                // Reset toggle button
                const bars = mobileToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }
    
    // --- 6. Header Scrolled Styling ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // --- 7. Interactive Ambient Glowing Orbs ---
    const orb1 = document.getElementById('orb-1');
    const orb2 = document.getElementById('orb-2');
    
    window.addEventListener('mousemove', (e) => {
        // Move orbs subtly relative to cursor position
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        if (orb1) {
            orb1.style.transform = `translate(${mouseX * 40}px, ${mouseY * 40}px)`;
        }
        if (orb2) {
            orb2.style.transform = `translate(${mouseX * -40}px, ${mouseY * -40}px)`;
        }
    });
});