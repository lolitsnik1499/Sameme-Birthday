[cite_start]document.addEventListener('DOMContentLoaded', () => { [cite: 23]

    // --- CUSTOMIZATION AREA ---
    // SET HER BIRTHDAY DATE AND TIME HERE (e.g., "October 15, 2025 00:00:00")
    const targetDateString = "September 25, 2025 19:00:00"; 
    // --- END CUSTOMIZATION AREA ---


    // --- Elements ---
    const lockScreen = document.getElementById('lock-screen');
    const mainContent = document.getElementById('main-content');
    const introVideoContainer = document.getElementById('surprise-video');
    const introVideo = document.getElementById('intro-video');
    const skipButton = document.getElementById('skip-video-btn');
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const targetDate = new Date(targetDateString).getTime();

    // --- Countdown Timer Logic ---
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            [cite_start]clearInterval(countdownInterval); [cite: 24, 25]
            lockScreen.classList.add('hidden');
            playIntroVideo();
            return;
        }

        [cite_start]const days = Math.floor(distance / (1000 * 60 * 60 * 24)); [cite: 25]
        [cite_start]const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); [cite: 26]
        [cite_start]const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); [cite: 27]
        [cite_start]const seconds = Math.floor((distance % (1000 * 60)) / 1000); [cite: 28]

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        [cite_start]minutesEl.innerText = String(minutes).padStart(2, '0'); [cite: 29]
        [cite_start]secondsEl.innerText = String(seconds).padStart(2, '0'); [cite: 29]
    };

    [cite_start]const countdownInterval = setInterval(updateCountdown, 1000); [cite: 29]
    updateCountdown(); 
    
    // --- Video Logic ---
    const playIntroVideo = () => {
        introVideoContainer.classList.remove('hidden');
        skipButton.classList.remove('hidden');
        
        introVideo.play().catch(error => {
            console.error("Video autoplay blocked, showing site immediately:", error);
            showMainContent(); 
        });
    };
    
    const showMainContent = () => {
        introVideo.pause(); 
        introVideoContainer.classList.add('hidden');
        mainContent.classList.remove('hidden');
    };

    skipButton.addEventListener('click', showMainContent);
    introVideo.addEventListener('ended', showMainContent);


    // --- Placeholder/Cleanup for Music Logic ---
    [cite_start]const music = document.getElementById('background-music'); [cite: 30]
    [cite_start]const musicToggle = document.getElementById('music-toggle'); [cite: 30]
    if (music && musicToggle) {
        [cite_start]// Browsers require user interaction to play audio. [cite: 31]
        [cite_start]musicToggle.addEventListener('click', () => { [cite: 32]
            if (music.paused) {
                music.play();
                musicToggle.classList.add('playing');
            } else {
                music.pause();
                musicToggle.classList.remove('playing');
            }
        });
    }

    // --- tsParticles Configuration ---
    [cite_start]tsParticles.load("tsparticles", { [cite: 34]
        fpsLimit: 60,
        particles: {
            [cite_start]number: { value: 60, density: { enable: true, value_area: 800 } }, [cite: 34]
            [cite_start]color: { value: ["#f3a6ff", "#a787ff", "#ffffff"] }, [cite: 34]
            shape: {
                [cite_start]type: "char", [cite: 35]
                character: [{
                    fill: true,
                    font: "Verdana",
                    style: "",
                    [cite_start]value: ["\u2764\ufe0f", "\u2665"], // Unicode hearts replacing the original empty string [cite: 36]
                    weight: "400"
                }]
            },
            opacity: {
                value: {min: 0.3, max: 0.8},
                [cite_start]animation: { enable: true, speed: 1, minimumValue: 0.3, sync: false } [cite: 37]
            },
            size: {
                value: {min: 5, max: 15},
                random: true,
                animation: { enable: true, speed: 2, minimumValue: 5, sync: false }
            }
        },
    });
});
