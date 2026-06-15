/**
 * Happy 1st Anniversary Swetha ❤️
 * JavaScript Code (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- CANVAS BACKGROUND (FLOATING HEARTS) & CONFETTI ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let hearts = [];
    let confetti = [];
    let mouseX = null;
    let mouseY = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouseX = null;
        mouseY = null;
    });

    // Heart Particle Class
    class HeartParticle {
        constructor() {
            this.reset(true);
        }

        reset(isInitial = false) {
            this.size = Math.random() * 14 + 6;
            this.x = Math.random() * canvas.width;
            this.y = isInitial ? Math.random() * canvas.height : canvas.height + 20;
            this.speedY = -(Math.random() * 0.7 + 0.3);
            this.speedX = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.4 + 0.2;
            this.wiggleSpeed = Math.random() * 0.01 + 0.005;
            this.wiggleOffset = Math.random() * Math.PI * 2;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * this.wiggleSpeed + this.wiggleOffset) * 0.25;

            // Mouse avoidance force
            if (mouseX !== null && mouseY !== null) {
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const force = (100 - dist) / 100;
                    this.x += (dx / dist) * force * 2;
                    this.y += (dy / dist) * force * 2;
                }
            }

            // Recycle if off screen
            if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
                this.reset(false);
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = 'rgba(255, 105, 140, 0.4)';
            ctx.shadowBlur = 6;
            ctx.shadowColor = 'rgba(255, 182, 193, 0.5)';
            ctx.beginPath();
            
            const d = this.size;
            ctx.translate(this.x, this.y);
            ctx.moveTo(0, -d / 4);
            ctx.bezierCurveTo(-d / 2, -d, -d, -d / 3, 0, d);
            ctx.bezierCurveTo(d, -d / 3, d / 2, -d, 0, -d / 4);
            ctx.fill();
            ctx.restore();
        }
    }

    // Confetti Heart Particle Class (Used for bursts)
    class ConfettiHeart {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 12 + 6;
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 6 + 3;
            this.speedX = Math.cos(angle) * velocity;
            this.speedY = Math.sin(angle) * velocity - 2; // initial upward kick
            this.opacity = 1.0;
            this.decay = Math.random() * 0.015 + 0.008;
            this.color = `hsl(${Math.random() * 45 + 325}, 95%, ${Math.random() * 20 + 60}%)`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += 0.12; // gravity
            this.speedX *= 0.98; // air resistance
            this.opacity -= this.decay;
        }

        draw() {
            if (this.opacity <= 0) return;
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 4;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            
            const d = this.size;
            ctx.translate(this.x, this.y);
            ctx.moveTo(0, -d / 4);
            ctx.bezierCurveTo(-d / 2, -d, -d, -d / 3, 0, d);
            ctx.bezierCurveTo(d, -d / 3, d / 2, -d, 0, -d / 4);
            ctx.fill();
            ctx.restore();
        }
    }

    // Initialize background particles
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
        hearts.push(new HeartParticle());
    }

    // Trigger a heart confetti explosion
    function triggerConfetti(x, y, count = 50) {
        for (let i = 0; i < count; i++) {
            confetti.push(new ConfettiHeart(x, y));
        }
    }

    // Main Canvas Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update & Draw Background Hearts
        hearts.forEach(p => {
            p.update();
            p.draw();
        });

        // Update & Draw Confetti Hearts (reverse iterate to delete safely)
        for (let i = confetti.length - 1; i >= 0; i--) {
            confetti[i].update();
            confetti[i].draw();
            if (confetti[i].opacity <= 0) {
                confetti.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }
    animate();


    // --- ANNIVERSARY COUNTDOWN TIMER ---
    // Target date: June 17, 2026
    const targetDate = new Date('2026-06-17T00:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const celebrationMsgEl = document.getElementById('celebration-msg');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            // Target date reached or passed
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            celebrationMsgEl.classList.remove('hidden');
            
            // Periodically burst confetti if countdown finished
            if (Math.random() < 0.03) {
                triggerConfetti(Math.random() * canvas.width, Math.random() * canvas.height * 0.6, 25);
            }
            return;
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(d).padStart(2, '0');
        hoursEl.textContent = String(h).padStart(2, '0');
        minutesEl.textContent = String(m).padStart(2, '0');
        secondsEl.textContent = String(s).padStart(2, '0');
    }
    
    // Run countdown update
    setInterval(updateCountdown, 1000);
    updateCountdown();


    // --- DISTANCE SLIDER & UNLOCK ENVELOPE LOGIC ---
    const slider = document.getElementById('distance-slider');
    const distanceVal = document.getElementById('distance-val');
    const swethaHeart = document.getElementById('swetha-heart');
    const sliderLine = document.getElementById('slider-line');
    const letterSection = document.getElementById('letter-section');
    const envelope = document.getElementById('envelope');
    let isUnlocked = false;

    function updateSliderVisuals() {
        const val = parseInt(slider.value);
        distanceVal.textContent = val;

        // Position Swetha's heart node
        // Calculation maps 800-0 km slider value to right distance offset (0% to 100% merged)
        const percentLeft = ((800 - val) / 800) * 100;
        
        // Update Swetha Heart position
        // We use left offset: at val=800, left position = 100% (right edge minus margin), at val=0, left position = 0%
        swethaHeart.style.right = `calc(${100 - percentLeft}% - 10px)`;
        
        // Update line length connecting them
        sliderLine.style.right = `calc(${100 - percentLeft}% + 10px)`;

        // Check unlock condition (0 km)
        if (val === 0 && !isUnlocked) {
            isUnlocked = true;
            unlockLetter();
        }
    }

    function unlockLetter() {
        // Remove locked state on UI
        letterSection.classList.remove('locked');
        
        // Visual pulses and explosions!
        const rect = swethaHeart.getBoundingClientRect();
        triggerConfetti(rect.left + 15, rect.top + 15, 60);
        
        // Trigger multi explosions at center screen
        setTimeout(() => {
            triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 80);
        }, 500);

        // Auto scroll user gently to letter section
        setTimeout(() => {
            letterSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1200);
    }

    slider.addEventListener('input', updateSliderVisuals);
    // Call initial position setup
    updateSliderVisuals();


    // --- DIGITAL LOVE LETTER (ENVELOPE OPENING & STORAGE) ---
    const waxSeal = document.getElementById('wax-seal');
    const loveLetterText = document.getElementById('love-letter-text');

    // Load saved letter from localStorage if it exists
    const savedLetter = localStorage.getItem('swetha_anniversary_letter');
    if (savedLetter) {
        loveLetterText.innerHTML = savedLetter;
    }

    // Save edited letter to localStorage
    loveLetterText.addEventListener('blur', () => {
        localStorage.setItem('swetha_anniversary_letter', loveLetterText.innerHTML);
    });

    waxSeal.addEventListener('click', () => {
        if (!isUnlocked) return;
        
        envelope.classList.add('open');
        
        // Confetti burst on opening seal
        const sealRect = waxSeal.getBoundingClientRect();
        triggerConfetti(sealRect.left + 25, sealRect.top + 25, 40);
    });


    // --- POLAROID SCRAPBOOK MANAGER ---
    const scrapbookBoard = document.getElementById('scrapbook-board');
    const uploadBtnCard = document.getElementById('upload-polaroid-btn');
    const imageUploader = document.getElementById('image-uploader');
    let scrapbookData = [];

    // Helper SVG Data URLs for default placeholders
    const defaultSVGs = [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fff0f3"/><path d="M50 85 C-10 40 20 5 50 35 C80 5 110 40 50 85 Z" fill="%23ff698c"/></svg>`,
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f7e1d7"/><circle cx="50" cy="50" r="30" fill="%23ffc2d1"/><path d="M30 50 Q 50 30 70 50" stroke="%23ff8fa3" stroke-width="4" fill="none"/></svg>`,
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e8e8e4"/><path d="M20 70 L40 40 L60 60 L80 30 L95 70 Z" fill="%23ffd3e8"/><circle cx="75" cy="25" r="10" fill="%23ffb3c1"/></svg>`
    ];

    const defaultPolaroids = [
        {
            id: 'default-1',
            image: defaultSVGs[0],
            caption: "Our beautiful beginning ❤️",
            rotation: -4
        },
        {
            id: 'default-2',
            image: defaultSVGs[1],
            caption: "Countless hours talking 📞",
            rotation: 3
        },
        {
            id: 'default-3',
            image: defaultSVGs[2],
            caption: "Every day closer to you ✨",
            rotation: -2
        }
    ];

    function loadScrapbook() {
        const stored = localStorage.getItem('swetha_scrapbook_photos');
        if (stored) {
            scrapbookData = JSON.parse(stored);
        } else {
            scrapbookData = [...defaultPolaroids];
            saveScrapbookData();
        }
        renderScrapbook();
    }

    function saveScrapbookData() {
        localStorage.setItem('swetha_scrapbook_photos', JSON.stringify(scrapbookData));
    }

    function renderScrapbook() {
        // Clear all except the upload button card
        const cards = scrapbookBoard.querySelectorAll('.polaroid-card:not(.upload-card)');
        cards.forEach(c => c.remove());

        scrapbookData.forEach(item => {
            const cardEl = document.createElement('div');
            cardEl.className = 'polaroid-card';
            cardEl.style.transform = `rotate(${item.rotation}deg)`;
            cardEl.dataset.id = item.id;

            cardEl.innerHTML = `
                <div class="polaroid-tape"></div>
                <button class="delete-polaroid" aria-label="Delete photo"><i class="fa-solid fa-xmark"></i></button>
                <div class="polaroid-img-container">
                    <img class="polaroid-img" src="${item.image}" alt="Memory photo">
                </div>
                <div class="polaroid-caption" contenteditable="true" data-id="${item.id}">${item.caption}</div>
            `;

            // Delete event
            cardEl.querySelector('.delete-polaroid').addEventListener('click', (e) => {
                e.stopPropagation();
                deletePolaroid(item.id);
            });

            // Editable Caption event
            const captionEl = cardEl.querySelector('.polaroid-caption');
            captionEl.addEventListener('blur', () => {
                const newCaption = captionEl.textContent.trim();
                updateCaption(item.id, newCaption);
            });

            // Insert before the upload button card
            scrapbookBoard.insertBefore(cardEl, uploadBtnCard);
        });
    }

    function deletePolaroid(id) {
        scrapbookData = scrapbookData.filter(item => item.id !== id);
        saveScrapbookData();
        renderScrapbook();
    }

    function updateCaption(id, text) {
        const item = scrapbookData.find(item => item.id === id);
        if (item) {
            item.caption = text || "Untitled Memory";
            saveScrapbookData();
        }
    }

    // Trigger file input
    uploadBtnCard.addEventListener('click', () => {
        imageUploader.click();
    });

    // Handle photo uploading
    imageUploader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            const base64Img = event.target.result;
            const randomRotation = Math.floor(Math.random() * 10) - 5; // -5 to +5 deg
            
            const newPhoto = {
                id: 'photo-' + Date.now(),
                image: base64Img,
                caption: "Write a message...",
                rotation: randomRotation === 0 ? 2 : randomRotation
            };

            scrapbookData.push(newPhoto);
            saveScrapbookData();
            renderScrapbook();

            // Heart Confetti explosion around upload button
            const rect = uploadBtnCard.getBoundingClientRect();
            triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
        };
        reader.readAsDataURL(file);
        
        // Reset file uploader value
        imageUploader.value = '';
    });

    loadScrapbook();


    // --- WEB AUDIO API ROMANTIC PIANO SYNTHESIZER ---
    class PianoSynth {
        constructor() {
            this.audioCtx = null;
            this.isPlaying = false;
            this.timerId = null;
            
            // Chord sequences (frequencies for Fmaj7, G6, Em7, Am7 chords)
            this.chords = [
                [174.61, 220.00, 261.63, 329.63], // F3, A3, C4, E4 (Fmaj7)
                [196.00, 246.94, 293.66, 392.00], // G3, B3, D4, G4 (G6)
                [164.81, 196.00, 246.94, 293.66], // E3, G3, B3, D4 (Em7)
                [220.00, 261.63, 329.63, 392.00]  // A3, C4, E4, G4 (Am7)
            ];
            this.chordIndex = 0;
            this.noteIndex = 0;
        }

        init() {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        start() {
            if (!this.audioCtx) this.init();
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            this.isPlaying = true;
            this.chordIndex = 0;
            this.noteIndex = 0;
            this.playNext();
        }

        stop() {
            this.isPlaying = false;
            if (this.timerId) {
                clearTimeout(this.timerId);
                this.timerId = null;
            }
        }

        playTone(freq, time, duration) {
            if (!this.audioCtx) return;

            // Warm sine wave fundamental
            const osc1 = this.audioCtx.createOscillator();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(freq, time);

            // Subdued harmonic triangle wave
            const osc2 = this.audioCtx.createOscillator();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(freq * 2, time);

            // Level node for mixing
            const gainNode = this.audioCtx.createGain();
            gainNode.gain.setValueAtTime(0, time);
            gainNode.gain.linearRampToValueAtTime(0.12, time + 0.02); // attack
            gainNode.gain.exponentialRampToValueAtTime(0.04, time + 0.3); // decay
            gainNode.gain.setValueAtTime(0.04, time + duration - 0.4);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration); // release

            // Harmonic balance
            const harmGain = this.audioCtx.createGain();
            harmGain.gain.setValueAtTime(0.03, time);
            harmGain.gain.exponentialRampToValueAtTime(0.0001, time + duration - 0.2);

            // Soft filter
            const filter = this.audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(900, time);

            // Wiring
            osc1.connect(gainNode);
            osc2.connect(harmGain);
            harmGain.connect(gainNode);
            
            gainNode.connect(filter);
            filter.connect(this.audioCtx.destination);

            osc1.start(time);
            osc2.start(time);
            osc1.stop(time + duration);
            osc2.stop(time + duration);
        }

        playNext() {
            if (!this.isPlaying) return;

            const now = this.audioCtx.currentTime;
            const currentChord = this.chords[this.chordIndex];
            const freq = currentChord[this.noteIndex];

            // Play the arpeggiated piano note
            this.playTone(freq, now, 2.5);

            // Advance index
            this.noteIndex++;
            if (this.noteIndex >= currentChord.length) {
                this.noteIndex = 0;
                this.chordIndex = (this.chordIndex + 1) % this.chords.length;
                // Add pause before next chord
                this.timerId = setTimeout(() => this.playNext(), 1400);
            } else {
                // Pluck speed
                this.timerId = setTimeout(() => this.playNext(), 450);
            }
        }
    }

    const synth = new PianoSynth();
    const musicToggle = document.getElementById('music-toggle');
    const toggleIcon = musicToggle.querySelector('i');
    const toggleTooltip = musicToggle.querySelector('.btn-tooltip');

    musicToggle.addEventListener('click', () => {
        if (synth.isPlaying) {
            synth.stop();
            toggleIcon.classList.remove('pulse-icon');
            toggleIcon.classList.replace('fa-heart-circle-check', 'fa-heart');
            toggleTooltip.textContent = 'Play Melody';
            musicToggle.style.backgroundColor = '';
        } else {
            synth.start();
            toggleIcon.classList.add('pulse-icon');
            toggleIcon.classList.replace('fa-heart', 'fa-heart-circle-check');
            toggleTooltip.textContent = 'Stop Melody';
            musicToggle.style.backgroundColor = 'var(--primary-dark)';
            
            // Initial blast of hearts around audio button
            const rect = musicToggle.getBoundingClientRect();
            triggerConfetti(rect.left + rect.width/2, rect.top + rect.height/2, 20);
        }
    });
});
