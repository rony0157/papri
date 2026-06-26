// Date handling
document.getElementById('currentDate').innerText = new Date().toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// Create Floating Hearts in Background
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💖', '🌸', '🌹', '💕', '💗', '💝', '🌹'];
    
    // Spawn a heart every 300ms
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        
        // Random symbol
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Random horizontal position
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Random size
        const size = Math.random() * 20 + 15;
        heart.style.fontSize = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 3 + 4; // 4s to 7s
        heart.style.animationDuration = duration + 's';
        
        // Random opacity
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(heart);
        
        // Remove after animation finishes
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }, 450);
}

// Initialise Background Animation
createFloatingHearts();

// Screen Navigation & Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const letterScreen = document.getElementById('letterScreen');
const successScreen = document.getElementById('successScreen');

const envelopeWrapper = document.getElementById('envelopeWrapper');
const openBtn = document.getElementById('openBtn');

const apologyText = document.getElementById('apologyText');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const restartBtn = document.getElementById('restartBtn');

// Letter Content (in Bengali, highly romantic, apologetic, and customized)
const apologyLetter = `প্রিয় পাপড়ি, আমার লাল গোলাপ... 🌹🥺
জানি আমার ওপর তোমার অনেক রাগ আর অভিমান জমে আছে। কিন্তু বিশ্বাস করো, তোমাকে কষ্ট দেওয়া বা তোমার চোখে জল আনার কোনো ইচ্ছে আমার কখনোই ছিল না। তুমি ছাড়া আমার এই ছোট্ট পৃথিবীটা একদম অর্থহীন। 

তুমি রাগ করে থাকলে আমার দিনগুলো কেমন যেন ধূসর আর মেঘলা হয়ে যায়। তোমার ওই মিষ্টি মুখের এক চিলতে হাসি আমার কাছে হাজারটা গোলাপের চেয়েও সুন্দর। 

আমি জানি আমার কিছু আচরণ ভুল ছিল, আর তার জন্য আমি হাজার বার সরি বলতেও রাজি! আমার ওপর থেকে তোমার অভিমানের মেঘ সরিয়ে দাও প্লিজ? চল না, আবার আগের মতো এক সাথে হাত মিলিয়ে হেসে উঠি! আই অ্যাম সো সরি, লাভ... ❤️🌸`;

// Typing effect variables
let typingIdx = 0;
let typingSpeed = 50; // ms per letter

function typeLetter() {
    if (typingIdx < apologyLetter.length) {
        apologyText.innerHTML += apologyLetter.charAt(typingIdx);
        typingIdx++;
        setTimeout(typeLetter, typingSpeed);
    }
}

// Open Envelope Action
function openEnvelope() {
    envelopeWrapper.classList.add('open');
    
    // Smooth transition to the letter screen after envelope opens
    setTimeout(() => {
        welcomeScreen.classList.remove('active');
        letterScreen.classList.add('active');
        
        // Start typing letter content
        setTimeout(typeLetter, 400);
    }, 1200);
}

envelopeWrapper.addEventListener('click', openEnvelope);
openBtn.addEventListener('click', openEnvelope);

// Runaway "No" button logic
function moveNoButton() {
    // Get window dimensions or container dimensions to keep it within screen
    const padding = 20;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // We want the button to stay visible inside the screen viewport, but not overlapping the Yes button too much.
    const maxX = window.innerWidth - btnWidth - padding * 2;
    const maxY = window.innerHeight - btnHeight - padding * 2;
    
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));
    
    // Detach from normal flow and position absolute on the screen
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Trigger move on both mouse enter (desktop) and touch start (mobile)
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents clicking it on mobile
    moveNoButton();
});

// Confetti burst effect
function burstConfetti() {
    const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7', '#2ec4b6', '#ffffff'];
    const totalConfetti = 150;
    
    for (let i = 0; i < totalConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random styles
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 8 + 6 + 'px';
        confetti.style.height = Math.random() * 15 + 8 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0px';
        
        // Random falling properties
        const duration = Math.random() * 2 + 1.5; // 1.5s to 3.5s
        confetti.style.animationDuration = duration + 's';
        
        // Apply transform scale and rotation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        // Remove after animation finishes
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Yes button action
yesBtn.addEventListener('click', () => {
    burstConfetti();
    
    // Pulse animation or confetti shower
    let burstInterval = setInterval(burstConfetti, 400);
    
    setTimeout(() => {
        clearInterval(burstInterval);
    }, 2000);

    // Switch to success screen
    setTimeout(() => {
        letterScreen.classList.remove('active');
        successScreen.classList.add('active');
    }, 1000);
});

// Restart button action
restartBtn.addEventListener('click', () => {
    // Reset positions and values
    noBtn.style.position = 'absolute';
    noBtn.style.left = 'unset';
    noBtn.style.right = 'unset';
    noBtn.style.top = 'unset';
    
    typingIdx = 0;
    apologyText.innerHTML = '';
    envelopeWrapper.classList.remove('open');
    
    // Reset sorry counter
    sorryCount = 0;
    sorryCountEl.innerText = toBengaliNumber(0);
    
    successScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
});

// Sorry Rose & Sorry Rain Logic
let sorryCount = 0;
const sorryCountEl = document.getElementById('sorryCount');
const sorryRainBtn = document.getElementById('sorryRainBtn');

// Convert digits to Bengali numbers
function toBengaliNumber(num) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(digit => banglaDigits[digit] || digit).join('');
}

const sorryMessages = [
    'Sorry Papri 🥺',
    'সরি পাপড়ি ❤️',
    'আই অ্যাম সরি 🌹',
    'ক্ষমা করে দাও 🌸',
    'আর রাগ করে থেকো না 😭',
    'সরি! সরি! সরি! 🙏',
    '১০০ বার সরি! 💕',
    'Forgive me, please! 🧸'
];

function triggerSorryRain() {
    sorryCount += 10;
    sorryCountEl.innerText = toBengaliNumber(sorryCount);
    
    // Custom messaging based on sorry count thresholds
    if (sorryCount === 50) {
        alert('পাপড়ি, তুমি তো ৫০ বার সরি শুনলে! এবার রাগটা একটু কমাও? 🥺');
    } else if (sorryCount === 100) {
        alert('১০০ বার সরি বলা শেষ! এবার তো একটু হাসতেই হয়! 😊🌸');
    } else if (sorryCount === 200) {
        alert('বাপরে! ২০০ বার সরি! তুমি আসলেই আমার সবচেয়ে প্রিয়! ❤️');
    }

    // Spawn 20 falling elements (mix of sorry text and roses)
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        
        // Alternate between text message and rose
        if (Math.random() > 0.5) {
            particle.classList.add('sorry-text-particle');
            particle.innerText = sorryMessages[Math.floor(Math.random() * sorryMessages.length)];
            particle.style.color = `hsl(${Math.random() * 20 + 340}, 100%, ${Math.random() * 20 + 40}%)`; // Pink/red shades
            particle.style.fontSize = Math.random() * 6 + 14 + 'px';
            particle.style.background = 'rgba(255, 255, 255, 0.85)';
            particle.style.padding = '4px 10px';
            particle.style.borderRadius = '20px';
            particle.style.boxShadow = '0 2px 8px rgba(251, 111, 146, 0.2)';
            particle.style.border = '1px solid rgba(251, 111, 146, 0.2)';
        } else {
            particle.classList.add('heart-particle');
            particle.innerText = '🌹';
            particle.style.fontSize = Math.random() * 15 + 20 + 'px';
        }

        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '-50px';
        
        const duration = Math.random() * 2 + 2; // 2s to 4s
        particle.style.animationName = particle.classList.contains('sorry-text-particle') ? 'sorry-fall' : 'floatUp';
        particle.style.animationDuration = duration + 's';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

sorryRainBtn.addEventListener('click', triggerSorryRain);
