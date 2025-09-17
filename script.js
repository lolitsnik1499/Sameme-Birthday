/* ---------------------------------- */
/* GLOBAL STYLES & LAYOUT             */
/* ---------------------------------- */
:root {
    --color-pink: #ffc0cb;       /* Pastel Pink */
    --color-lavender: #e6e6fa;   /* Pastel Lavender */
    --color-yellow: #fffacd;     /* Soft Yellow */
    --color-dark: #333;
    --font-cute: 'Cherry Bomb One', cursive; /* Kenji-style font */
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: sans-serif;
    color: var(--color-dark);
    min-height: 100vh;
    overflow-x: hidden;
    background-color: var(--color-lavender);
}

/* Base style for all sections for fixed full-screen layout and transition */
section {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    /* Smooth Transition Properties (Fade + Scale-Up) */
    transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 10; 
}

/* Hidden state: scaled down, transparent, and non-interactive */
.hidden {
    opacity: 0;
    transform: scale(0.95);
    pointer-events: none;
    z-index: 0;
}

/* Active state: full size, visible, and interactive */
.active {
    opacity: 1;
    transform: scale(1);
    pointer-events: all;
    z-index: 10;
}

/* ---------------------------------- */
/* 1. COUNTDOWN SECTION STYLES        */
/* ---------------------------------- */
#countdown-section {
    background: linear-gradient(135deg, var(--color-pink) 0%, var(--color-lavender) 100%);
    overflow: hidden;
    position: relative;
    color: white;
}

.countdown-content {
    z-index: 20;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}

#countdown-timer {
    font-size: clamp(2.5em, 8vw, 4em);
    font-weight: bold;
    margin-top: 20px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
}

/* Background Animation: Floating Hearts */
#hearts {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
    --heart-color: rgba(255, 255, 255, 0.6);
}

/* Generate multiple hearts using pseudo-elements for a soft animation */
#hearts::before, #hearts::after {
    content: '';
    position: absolute;
    background-color: var(--heart-color);
    transform: rotate(-45deg);
    border-radius: 50% 50% 0 0;
    animation: floatHeart 15s infinite linear;
}

#hearts::before {
    width: 20px; height: 20px;
    top: 100%; left: 20%;
    animation-duration: 12s;
    opacity: 0.7;
}
#hearts::after {
    width: 30px; height: 30px;
    top: 100%; left: 70%;
    animation-delay: 6s;
    animation-duration: 18s;
    opacity: 0.5;
}

@keyframes floatHeart {
    0% { transform: translateY(0vh) rotate(-45deg); opacity: 0; }
    50% { opacity: 0.8; }
    100% { transform: translateY(-100vh) rotate(-45deg); opacity: 0; }
}


/* ---------------------------------- */
/* 2. VIDEO SECTION STYLES            */
/* ---------------------------------- */
#video-section {
    background-color: black;
    z-index: 5;
}

#birthday-video {
    width: 100%;
    height: 100%;
    object-fit: contain; 
    background-color: black;
}

/* ---------------------------------- */
/* 3. FINAL MESSAGE SECTION STYLES    */
/* ---------------------------------- */
#message-section {
    background-color: var(--color-yellow);
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.message-content {
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 90%;
    max-width: 800px;
}

#final-message {
    font-family: var(--font-cute);
    font-size: clamp(3em, 10vw, 7em);
    color: #a00040; /* Darker Pink/Maroon for contrast */
    text-shadow: 5px 5px var(--color-pink), 8px 8px rgba(0,0,0,0.2);
    margin-bottom: 40px;
    white-space: nowrap; 
    user-select: none;
}

/* Kenji-style Letter Animation Classes (Added by JS) */
.bounce-wiggle {
    display: inline-block;
    position: relative;
    /* Initial state for slide-up/fade-in */
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.bounce-wiggle.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Infinite Bounce and Wiggle Keyframes */
@keyframes bounce {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    30% { transform: translateY(-15px) rotate(3deg); }
    70% { transform: translateY(-5px) rotate(-3deg); }
}

.bounce-wiggle.bouncing {
    animation: bounce 1.2s ease-in-out infinite;
}

/* Replay Button */
#replay-button {
    padding: 15px 30px;
    font-size: 1.2em;
    font-weight: bold;
    color: white;
    background-color: var(--color-pink);
    border: 3px solid var(--color-dark);
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 7px var(--color-dark);
    transition: transform 0.1s, box-shadow 0.1s;
    opacity: 0; 
    transform: translateY(40px);
}

#replay-button.slide-up.active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 1s ease-out 1.5s, transform 1s ease-out 1.5s; /* Delay to appear after text */
}

#replay-button:active {
    transform: translateY(10px);
    box-shadow: 0 0 var(--color-dark);
}

/* Confetti Container */
#confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 10;
    pointer-events: none;
}
/* Confetti/Balloon elements are generated and styled by JavaScript */
