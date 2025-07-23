document.addEventListener('DOMContentLoaded', () => {

    // --- CUSTOMIZATION AREA ---
    // CUSTOMIZE: Set the date and time for your surprise here
    // Format: "Month Day, Year HH:MM:SS" (e.g., "August 1, 2025 20:00:00")
    const countdownDate = "September 25, 2025 19:00:00";
    // --- END CUSTOMIZATION AREA ---


    // --- Countdown Timer Logic ---
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownContainer = document.querySelector('.countdown-timer');
    const surpriseMessage = document.getElementById('surprise-message');

    const targetDate = new Date(countdownDate).getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownContainer.classList.add('hidden');
            surpriseMessage.classList.remove('hidden');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minutesEl.innerText = String(minutes).padStart(2, '0');
        secondsEl.innerText = String(seconds).padStart(2, '0');

    }, 1000);


    // --- Background Music Logic ---
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');

    // Browsers require user interaction to play audio.
    // We unmute it on the first click.
    musicToggle.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicToggle.classList.add('playing');
        } else {
            music.pause();
            musicToggle.classList.remove('playing');
        }
    });
    
    // Attempt to play muted on load (for background video effect)
    music.play().catch(() => {
        // Autoplay was blocked, user must click to start.
    });


    // --- tsParticles Configuration for glowing hearts/sparkles ---
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: ["#f3a6ff", "#a787ff", "#ffffff"] },
            shape: {
                type: "char",
                character: [{
                    fill: true,
                    font: "Verdana",
                    style: "",
                    value: ["💖", "✨"],
                    weight: "400"
                }]
            },
            opacity: {
                value: {min: 0.3, max: 0.8},
                animation: { enable: true, speed: 1, minimumValue: 0.3, sync: false }
            },
            size: {
                value: { min: 8, max: 16 },
                animation: { enable: true, speed: 3, minimumValue: 8, sync: false }
            },
            move: {
                enable: true,
                speed: 1,
                direction: "top",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "bubble" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                bubble: { distance: 200, duration: 2, opacity: 1, size: 20 },
                push: { particles_nb: 4 }
            }
        },
        detectRetina: true
    });
});