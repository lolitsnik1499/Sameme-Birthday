document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    // Target date: 20th September at 00:00 (local time)
    // NOTE: This will be based on the local time of the user viewing the page.
    const TARGET_DATE = new Date('September 20, 2025 00:00:00').getTime();
    const BIRTHDAY_PERSON_NAME = "Jotaro"; // <-- **CHANGE THIS NAME**
    const TRANSITION_DURATION = 1000; // Must match the CSS transition time

    // --- DOM Elements ---
    const countdownSection = document.getElementById('countdown-section');
    const videoSection = document.getElementById('video-section');
    const messageSection = document.getElementById('message-section');
    const countdownTimer = document.getElementById('countdown-timer');
    const birthdayVideo = document.getElementById('birthday-video');
    const finalMessageElement = document.getElementById('final-message');
    const backgroundMusic = document.getElementById('background-music');
    const replayButton = document.getElementById('replay-button');
    const confettiContainer = document.getElementById('confetti-container');

    // --- State & Handlers ---
    let countdownInterval;
    let musicStarted = false;

    /**
     * Hides the current section and smoothly transitions to the next one.
     */
    const smoothTransition = (hideSection, showSection, callback) => {
        // 1. Hide the current section
        hideSection.classList.remove('active');
        hideSection.classList.add('hidden');

        // 2. Prepare next section for showing
        showSection.classList.remove('hidden');

        // Wait for the hide transition to mostly finish
        setTimeout(() => {
            // 3. Activate the new section (fade in + scale up)
            showSection.classList.add('active');
            
            // Ensure the previous section is completely disabled to avoid clicks
            hideSection.style.zIndex = '0';
            showSection.style.zIndex = '10';

            if (callback) {
                callback();
            }
        }, TRANSITION_DURATION * 0.5); // Start the next section transition slightly early
    };


    // ==========================================================
    // SECTION 1: COUNTDOWN TIMER LOGIC
    // ==========================================================

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = TARGET_DATE - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result with leading zeros for single digits
        const formatTime = (t) => String(t).padStart(2, '0');
        
        countdownTimer.innerHTML = distance > 0 
            ? `${days}d ${formatTime(hours)}h ${formatTime(minutes)}m ${formatTime(seconds)}s`
            : "Surprise Initiated!";

        // When the countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            startVideoSurprise();
        }
    };

    const startCountdown = () => {
        updateCountdown(); // Run once immediately
        countdownInterval = setInterval(updateCountdown, 1000);
    };

    // ==========================================================
    // SECTION 2: VIDEO LOGIC
    // ==========================================================

    const startVideoSurprise = () => {
        // Transition from countdown to video
        smoothTransition(countdownSection, videoSection, () => {
            // Video setup: ensure it autoplays and unmutes (needed for most modern browsers)
            birthdayVideo.muted = false;
            birthdayVideo.play().catch(error => {
                console.warn("Autoplay failed. User interaction may be required.", error);
            });

            // Listen for video end to transition to the final message
            birthdayVideo.addEventListener('ended', startMessageSection, { once: true });
        });
    };

    // ==========================================================
    // SECTION 3: MESSAGE LOGIC
    // ==========================================================

    const startMessageSection = () => {
        // Transition from video to message
        smoothTransition(videoSection, messageSection, () => {
            // Setup and start cute animations
            setupFinalMessage();
            startConfettiAnimation();
            
            // Show replay button with its delayed slide-up animation
            replayButton.classList.add('active'); 

            // Optional: Start background music
            if (!musicStarted && backgroundMusic.src) {
                backgroundMusic.volume = 0.4; // Soft volume
                backgroundMusic.play().catch(error => {
                    console.warn("Background music autoplay failed.", error);
                });
                musicStarted = true;
            }
        });
    };

    /**
     * Wraps each character for the Kenji-style animation.
     */
    const setupFinalMessage = () => {
        const messageText = `Happy Birthday ${BIRTHDAY_PERSON_NAME} 💖`;
        finalMessageElement.innerHTML = ''; // Clear existing content

        messageText.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
            span.classList.add('bounce-wiggle');

            // 1. Staggered fade-in/slide-up
            setTimeout(() => {
                span.classList.add('animate-in');
            }, index * 60); 

            // 2. Start the infinite bounce/wiggle after the initial slide-in finishes
            setTimeout(() => {
                span.classList.add('bouncing');
            }, (messageText.length * 60) + 500 + index * 50); 

            finalMessageElement.appendChild(span);
        });
    };

    /**
     * Creates and animates floating balloons/confetti.
     */
    const startConfettiAnimation = () => {
        // Clear previous confetti
        confettiContainer.innerHTML = ''; 
        const colors = ['var(--color-pink)', 'var(--color-lavender)', 'var(--color-yellow)', '#fff'];

        for (let i = 0; i < 40; i++) {
            const element = document.createElement('div');
            // Randomly choose between a round balloon or a square confetti
            const isBalloon = Math.random() > 0.5;
            
            element.style.width = isBalloon ? `${Math.random() * 15 + 15}px` : `${Math.random() * 8 + 4}px`;
            element.style.height = element.style.width;
            element.style.borderRadius = isBalloon ? '50%' : '2px';
            element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            element.style.opacity = Math.random() * 0.7 + 0.3;
            element.style.position = 'absolute';

            // Random start position at the bottom
            element.style.left = `${Math.random() * 100}vw`;
            element.style.bottom = `${-(Math.random() * 100)}px`;

            // Random animation duration and delay
            const duration = Math.random() * 15 + 10; // 10s to 25s
            const delay = Math.random() * 10;
            const rotation = Math.random() > 0.5 ? '360deg' : '-360deg';

            element.style.animation = `floatAndTwirl ${duration}s linear infinite`;
            element.style.animationDelay = `-${delay}s`; 

            confettiContainer.appendChild(element);
        }

        // Add CSS keyframe for confetti animation dynamically
        const styleId = 'confetti-keyframes';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
                @keyframes floatAndTwirl {
                    0% { transform: translateY(0vh) rotate(0deg) translateX(0); opacity: 0; }
                    50% { opacity: 0.7; transform: translateY(-50vh) rotate(180deg) translateX(${Math.random() * 30 - 15}vw); }
                    100% { transform: translateY(-100vh) rotate(${Math.random() > 0.5 ? '360deg' : '-360deg'}) translateX(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    };


    // --- Optional: Replay Button Handler ---

    const handleReplay = () => {
        // 1. Prepare elements for restart
        birthdayVideo.currentTime = 0;
        birthdayVideo.muted = false; // Ensure sound is on for replay
        
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        musicStarted = false;
        
        // 2. Clear message animations and confetti
        confettiContainer.innerHTML = '';
        finalMessageElement.innerHTML = '';
        replayButton.classList.remove('active');

        // 3. Transition from message back to video
        smoothTransition(messageSection, videoSection, () => {
            birthdayVideo.play().catch(error => {
                console.warn("Autoplay failed on replay.", error);
            });
            // Re-add listener for when the video ends again
            birthdayVideo.addEventListener('ended', startMessageSection, { once: true });
        });
    };

    // Attach replay handler
    replayButton.addEventListener('click', handleReplay);


    // --- Initialization ---

    // Check if the target date has already passed
    if (new Date().getTime() >= TARGET_DATE) {
        // If it's already past the time, skip the countdown and go to the video
        countdownSection.classList.remove('active');
        countdownSection.classList.add('hidden');
        videoSection.classList.remove('hidden');
        videoSection.classList.add('active');
        startVideoSurprise();
    } else {
        // Otherwise, start the main countdown
        startCountdown();
    }
});
