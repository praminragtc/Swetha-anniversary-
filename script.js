/* ========== script.js ========== */

// ── State ──────────────────────────────────────────────────
const state = {
  herName: 'My Love',
  yourName: 'Forever Yours 💗',
  candlesBlown: 0,
  totalCandles: 5,
  giftOpened: false,
  envelopeOpened: false,
  photos: [],
  counterValues: { days: 0, msgs: 0, laughs: 0, memories: 0 },
  currentModalContext: null,
  reasons: [
    { icon: '💗', text: 'Your smile' },
    { icon: '🌸', text: 'Your kindness' },
    { icon: '😂', text: 'The way you make me laugh' },
    { icon: '🦋', text: 'How you make ordinary days magical' },
    { icon: '💕', text: 'The way you understand me' },
    { icon: '🥰', text: 'Simply because you\'re YOU' },
  ],
  timeline: [
    { date: 'The Beginning 🌸', title: 'When We First Met', desc: 'The day everything changed for the better.', emoji: '💕' },
    { date: 'Our First Date 🥂', title: 'A Day I\'ll Never Forget', desc: 'Nervous, excited, and completely certain about you.', emoji: '💗' },
    { date: 'Together 🦋', title: 'When We Became Us', desc: 'The best decision I ever made.', emoji: '💖' },
    { date: 'Today 🎂', title: 'Your Birthday 🩷', desc: 'Celebrating the most wonderful person in my world.', emoji: '🌷' },
  ],
  defaultPhotos: [
    { caption: 'My Favorite Smile 😊', emoji: '💗' },
    { caption: 'Our Favorite Place 🌸', emoji: '🌷' },
    { caption: 'Pure Happiness 😂', emoji: '💕' },
    { caption: 'Us 🥰', emoji: '💖' },
  ],
};

// ── DOM refs ──────────────────────────────────────────────
const openingScreen = document.getElementById('opening-screen');
const mainSite = document.getElementById('main-site');
const heroName = document.getElementById('hero-name');
const audio = document.getElementById('birthday-audio');
const audioSource = document.getElementById('audio-source');

// ── Cursor ────────────────────────────────────────────────
const cursorHeart = document.getElementById('cursor-heart');
document.addEventListener('mousemove', (e) => {
  cursorHeart.style.left = e.clientX + 'px';
  cursorHeart.style.top  = e.clientY + 'px';
});

// ── Opening Canvas – sparkles & stars ─────────────────────
(function initOpeningCanvas() {
  const canvas = document.getElementById('opening-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function spawnParticle() {
    const glyphs = ['✨','🌸','💕','⭐','💫','🌷','💗'];
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      size: Math.random() * 14 + 10,
      alpha: 0,
      alphaDir: 1,
      speed: Math.random() * 0.5 + 0.2,
      drift: (Math.random() - 0.5) * 0.3,
    };
  }
  for (let i = 0; i < 30; i++) {
    const p = spawnParticle();
    p.alpha = Math.random();
    particles.push(p);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.glyph, p.x, p.y);
      p.alpha += p.alphaDir * 0.008;
      p.x += p.drift;
      p.y -= p.speed;
      if (p.alpha > 1)  { p.alpha = 1; p.alphaDir = -1; }
      if (p.alpha < 0 || p.y < -20) {
        const np = spawnParticle();
        np.y = canvas.height + 20;
        Object.assign(p, np);
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Open Surprise ──────────────────────────────────────────
document.getElementById('open-surprise-btn').addEventListener('click', function() {
  burstHeartsAt(window.innerWidth / 2, window.innerHeight / 2, 30);
  spawnPinkSparkles();

  openingScreen.classList.add('fade-out');
  setTimeout(() => {
    openingScreen.style.display = 'none';
    mainSite.classList.remove('hidden');
    initMainSite();
    tryAutoPlay();
  }, 1200);
});

function tryAutoPlay() {
  if (audio.src && audio.src !== window.location.href) {
    audio.volume = 0.8;
    audio.play().catch(() => {});
  }
}

// ── Init Main Site ─────────────────────────────────────────
function initMainSite() {
  startFloatingHearts();
  initFinalCanvas();
  buildReasons();
  buildTimeline();
  buildGallery();
  buildCake();
  initScrollObserver();
  animateCounters();
  setTimeout(() => {
    const fill = document.getElementById('love-meter-fill');
    if (fill) fill.style.width = '100%';
    setTimeout(() => {
      const overflow = document.getElementById('love-overflow');
      if (overflow) { overflow.style.opacity = '1'; }
    }, 2200);
  }, 1800);
}

// ── Floating Hearts ────────────────────────────────────────
function startFloatingHearts() {
  const container = document.getElementById('floating-hearts-container');
  const hearts = ['💕','💗','💖','💓','💞','💘','🩷','❤️','🌸'];
  function spawn() {
    const el = document.createElement('div');
    el.className = 'flt-heart';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    const size = Math.random() * 1.2 + 0.7;
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = size + 'rem';
    el.style.animationDuration = (Math.random() * 12 + 10) + 's';
    el.style.animationDelay = Math.random() * 4 + 's';
    el.style.opacity = Math.random() * 0.5 + 0.2;
    container.appendChild(el);
    setTimeout(() => el.remove(), 20000);
  }
  for (let i = 0; i < 20; i++) setTimeout(spawn, i * 400);
  setInterval(spawn, 1500);
}

// ── Final Canvas – sunset flowers ─────────────────────────
function initFinalCanvas() {
  const canvas = document.getElementById('final-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);

  const glyphs = ['🌸','💕','✨','🌷','💗','⭐','💫','🦋'];
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      size: Math.random() * 16 + 10,
      alpha: Math.random(),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      vy: -(Math.random() * 0.4 + 0.1),
      vx: (Math.random() - 0.5) * 0.2,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.glyph, p.x, p.y);
      p.alpha += p.alphaDir * 0.006;
      p.y += p.vy;
      p.x += p.vx;
      if (p.alpha > 1)  { p.alphaDir = -1; }
      if (p.alpha < 0)  { p.alphaDir =  1; }
      if (p.y < -20)    { p.y = canvas.height + 20; }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Scroll Observer ────────────────────────────────────────
function initScrollObserver() {
  const sections = document.querySelectorAll('.section');
  sections.forEach(s => s.classList.add('fade-in-section'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  sections.forEach(s => obs.observe(s));
}

// ── Name ──────────────────────────────────────────────────
function updateName(val) {
  state.herName = val || 'My Love';
  document.querySelectorAll('.her-name, #hero-name').forEach(el => el.textContent = state.herName);
  document.querySelectorAll('.her-name-ref').forEach(el => el.textContent = state.herName);
}
function updateYourName(val) {
  state.yourName = val || 'Forever Yours 💗';
  const el = document.getElementById('letter-sign-name');
  if (el) el.textContent = state.yourName;
}

// ── Hero Photo ────────────────────────────────────────────
function loadHeroPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = document.getElementById('hero-photo');
  const placeholder = document.getElementById('hero-photo-placeholder');
  img.src = url;
  img.style.display = 'block';
  if (placeholder) placeholder.style.display = 'none';
  const musicPhoto = document.getElementById('music-photo');
  if (musicPhoto) { musicPhoto.src = url; musicPhoto.style.display = 'block'; }
  const mpHolder = document.getElementById('music-placeholder');
  if (mpHolder) mpHolder.style.display = 'none';
}

// ── Music ──────────────────────────────────────────────────
let isPlaying = false;
let isMuted = false;

function loadAudio(input) {
  const file = input.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  audio.src = url;
  const nameEl = document.getElementById('song-name');
  if (nameEl) nameEl.textContent = file.name.replace(/\.[^.]+$/, '');
  audio.load();
}
function togglePlay() {
  if (!audio.src || audio.src === window.location.href) return;
  if (isPlaying) { audio.pause(); } else { audio.play(); }
}
function toggleMute() {
  isMuted = !isMuted;
  audio.muted = isMuted;
  document.getElementById('mute-btn').textContent = isMuted ? '🔇' : '🔊';
}
function setVolume(val) {
  audio.volume = val;
  if (parseFloat(val) === 0) { audio.muted = true; document.getElementById('mute-btn').textContent = '🔇'; }
  else { audio.muted = false; document.getElementById('mute-btn').textContent = '🔊'; }
}

audio.addEventListener('play', () => {
  isPlaying = true;
  document.getElementById('play-pause-btn').textContent = '⏸️';
  document.getElementById('music-notes').classList.remove('hidden');
  document.getElementById('music-album').classList.add('spinning');
});
audio.addEventListener('pause', () => {
  isPlaying = false;
  document.getElementById('play-pause-btn').textContent = '▶️';
  document.getElementById('music-notes').classList.add('hidden');
  document.getElementById('music-album').classList.remove('spinning');
});
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  document.getElementById('music-progress-fill').style.width = pct + '%';
  const mins = Math.floor(audio.currentTime / 60);
  const secs = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  document.getElementById('music-time').textContent = `${mins}:${secs}`;
});

// ── Envelope ───────────────────────────────────────────────
function openEnvelope() {
  if (state.envelopeOpened) return;
  state.envelopeOpened = true;
  const env = document.getElementById('envelope');
  env.classList.add('opened');
  setTimeout(() => {
    document.getElementById('letter-paper').classList.remove('hidden');
    burstHeartsAt(window.innerWidth / 2, window.innerHeight / 2, 15);
  }, 600);
}

function editLetter() {
  state.currentModalContext = 'letter';
  const body = document.getElementById('letter-body').innerHTML
    .replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
  showModal('Edit Your Love Letter 💌', `
    <p style="font-size:0.85rem;color:var(--text-light);margin-bottom:0.5rem;">Your message to her:</p>
    <textarea id="modal-letter-input">${body}</textarea>
  `);
}
function saveModal() {
  if (state.currentModalContext === 'letter') {
    const val = document.getElementById('modal-letter-input').value;
    document.getElementById('letter-body').innerHTML = val.replace(/\n/g, '<br>');
  } else if (state.currentModalContext === 'reason') {
    const icon = document.getElementById('modal-reason-icon').value || '💕';
    const text = document.getElementById('modal-reason-text').value;
    if (text) {
      state.reasons.push({ icon, text });
      buildReasons();
    }
  } else if (state.currentModalContext === 'memory') {
    const date = document.getElementById('modal-mem-date').value || 'A special day';
    const title = document.getElementById('modal-mem-title').value || 'Our Memory';
    const desc  = document.getElementById('modal-mem-desc').value || '';
    state.timeline.push({ date, title, desc, emoji: '💕' });
    buildTimeline();
  } else if (state.currentModalContext === 'counter-edit') {
    const days  = parseInt(document.getElementById('cedit-days').value) || 0;
    const msgs  = parseInt(document.getElementById('cedit-msgs').value) || 0;
    const laughs = parseInt(document.getElementById('cedit-laughs').value) || 0;
    const mems  = parseInt(document.getElementById('cedit-mems').value) || 0;
    state.counterValues = { days, msgs, laughs, memories: mems };
    animateCounter('counter-days', days);
    animateCounter('counter-msgs', msgs);
    animateCounter('counter-laughs', laughs);
    animateCounter('counter-memories', mems);
  }
  closeModal();
}

// ── Reasons ────────────────────────────────────────────────
function buildReasons() {
  const grid = document.getElementById('reasons-grid');
  grid.innerHTML = '';
  state.reasons.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `<div class="reason-icon">${r.icon}</div><div class="reason-text">${r.text}</div>`;
    card.onclick = () => popCard(card);
    grid.appendChild(card);
  });
  const final = document.createElement('div');
  final.className = 'reason-card reason-final';
  final.innerHTML = `<div class="reason-icon">💗</div><div class="reason-text">I could write a thousand more... 💗</div>`;
  final.onclick = () => popCard(final);
  grid.appendChild(final);
}

function popCard(card) {
  card.classList.add('popped');
  burstHeartsAt(
    card.getBoundingClientRect().left + card.offsetWidth / 2,
    card.getBoundingClientRect().top  + card.offsetHeight / 2,
    8
  );
  setTimeout(() => card.classList.remove('popped'), 500);
}

function addReason() {
  state.currentModalContext = 'reason';
  showModal('Add a Reason 💕', `
    <div style="display:flex;flex-direction:column;gap:0.75rem">
      <div>
        <label style="font-size:0.85rem;color:var(--text-light)">Emoji</label>
        <input type="text" id="modal-reason-icon" placeholder="💕" maxlength="4" style="width:60px;text-align:center" />
      </div>
      <div>
        <label style="font-size:0.85rem;color:var(--text-light)">Reason</label>
        <input type="text" id="modal-reason-text" placeholder="e.g. Your laugh" />
      </div>
    </div>
  `);
}

// ── Birthday Cake ──────────────────────────────────────────
function buildCake() {
  const container = document.getElementById('cake-candles');
  container.innerHTML = '';
  for (let i = 0; i < state.totalCandles; i++) {
    const candle = document.createElement('div');
    candle.className = 'candle';
    candle.id = 'candle-' + i;
    candle.innerHTML = `<div class="flame" id="flame-${i}">🔥</div><div class="candle-stick"></div>`;
    candle.onclick = () => blowCandle(i);
    container.appendChild(candle);
  }
}

function blowCandle(i) {
  const candle = document.getElementById('candle-' + i);
  if (candle.classList.contains('blown')) return;
  candle.classList.add('blown');
  state.candlesBlown++;
  burstHeartsAt(
    candle.getBoundingClientRect().left + 6,
    candle.getBoundingClientRect().top,
    5
  );
  if (state.candlesBlown >= state.totalCandles) {
    setTimeout(onAllCandlesBlown, 500);
  }
}

function onAllCandlesBlown() {
  launchConfetti();
  burstHeartsAt(window.innerWidth / 2, window.innerHeight / 2, 40);
  document.getElementById('cake-hint').classList.add('hidden');
  document.getElementById('wish-message').classList.remove('hidden');
}

// ── Timeline ───────────────────────────────────────────────
function buildTimeline() {
  const tl = document.getElementById('timeline');
  tl.innerHTML = '';
  state.timeline.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-item fade-in-section';
    el.innerHTML = `
      <div class="timeline-dot">${item.emoji || '💕'}</div>
      <div class="timeline-card">
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.desc}</div>
      </div>`;
    tl.appendChild(el);
  });
  // Re-observe new items
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.timeline-item').forEach(el => obs.observe(el));
}

function addMemory() {
  state.currentModalContext = 'memory';
  showModal('Add A Memory 🦋', `
    <div style="display:flex;flex-direction:column;gap:0.75rem">
      <div><label style="font-size:0.85rem;color:var(--text-light)">Date / Title (shown above card)</label>
        <input type="text" id="modal-mem-date" placeholder="e.g. Summer 2024 🌸" /></div>
      <div><label style="font-size:0.85rem;color:var(--text-light)">Memory Title</label>
        <input type="text" id="modal-mem-title" placeholder="e.g. Our First Trip" /></div>
      <div><label style="font-size:0.85rem;color:var(--text-light)">Description</label>
        <input type="text" id="modal-mem-desc" placeholder="e.g. A day I'll never forget..." /></div>
    </div>
  `);
}

// ── Gallery ────────────────────────────────────────────────
function buildGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  // Add default placeholder cards
  state.defaultPhotos.forEach((p, i) => {
    addPolaroid(null, p.caption, p.emoji, i % 2 === 0 ? -2 : 2);
  });
}

function addPhotos(input) {
  const files = Array.from(input.files);
  files.forEach((file, i) => {
    const url = URL.createObjectURL(file);
    const angle = (Math.random() - 0.5) * 6;
    addPolaroid(url, 'Our Memory 💕', '💗', angle);
  });
}

function addPolaroid(src, caption, heart, angle) {
  const grid = document.getElementById('gallery-grid');
  const card = document.createElement('div');
  card.className = 'polaroid';
  card.style.transform = `rotate(${angle}deg)`;
  card.style.cursor = 'none';

  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = caption;
    card.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'placeholder-img';
    ph.textContent = '📸';
    card.appendChild(ph);
  }

  const cap = document.createElement('div');
  cap.className = 'polaroid-caption';
  cap.textContent = caption;
  card.appendChild(cap);

  const heartEl = document.createElement('span');
  heartEl.className = 'polaroid-heart';
  heartEl.textContent = heart;
  card.appendChild(heartEl);

  card.onclick = () => openLightbox(src, caption);
  grid.appendChild(card);
}

function openLightbox(src, caption) {
  if (!src) return;
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = caption;
  lb.classList.remove('hidden');
  burstHeartsAt(window.innerWidth / 2, window.innerHeight / 2, 12);
}
function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}

// ── Gift Box ───────────────────────────────────────────────
function openGift() {
  if (state.giftOpened) return;
  state.giftOpened = true;
  const box = document.getElementById('gift-box');
  box.classList.add('opened');
  box.style.animation = 'none';
  setTimeout(() => {
    document.getElementById('gift-hint').classList.add('hidden');
    document.getElementById('gift-message').classList.remove('hidden');
    burstHeartsAt(box.getBoundingClientRect().left + 60, box.getBoundingClientRect().top + 60, 30);
    launchConfetti();
  }, 700);
}

// ── Counters ───────────────────────────────────────────────
function animateCounters() {
  const targets = [
    { id: 'counter-days',      val: state.counterValues.days    || 365  },
    { id: 'counter-msgs',      val: state.counterValues.msgs    || 10000 },
    { id: 'counter-laughs',    val: state.counterValues.laughs  || 5000 },
    { id: 'counter-memories',  val: state.counterValues.memories || 200 },
  ];
  targets.forEach(t => animateCounter(t.id, t.val));
}

function animateCounter(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  const interval = duration / steps;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current).toLocaleString();
  }, interval);
}

function updateCounter(key, val) {
  state.counterValues[key] = parseInt(val) || 0;
  const map = { days: 'counter-days', msgs: 'counter-msgs', laughs: 'counter-laughs', memories: 'counter-memories' };
  animateCounter(map[key], state.counterValues[key]);
}

function editCounters() {
  state.currentModalContext = 'counter-edit';
  showModal('Edit Your Numbers 💕', `
    <div style="display:flex;flex-direction:column;gap:0.75rem">
      <div><label style="font-size:0.85rem;color:var(--text-light)">💕 Days Together</label>
        <input type="text" id="cedit-days" placeholder="365" /></div>
      <div><label style="font-size:0.85rem;color:var(--text-light)">💬 Messages Sent</label>
        <input type="text" id="cedit-msgs" placeholder="10000" /></div>
      <div><label style="font-size:0.85rem;color:var(--text-light)">😂 Laughs Shared</label>
        <input type="text" id="cedit-laughs" placeholder="5000" /></div>
      <div><label style="font-size:0.85rem;color:var(--text-light)">📸 Memories Made</label>
        <input type="text" id="cedit-mems" placeholder="200" /></div>
    </div>
  `);
}

// ── Modal ──────────────────────────────────────────────────
function showModal(title, bodyHtml) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.getElementById('edit-modal').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('edit-modal').classList.add('hidden');
  state.currentModalContext = null;
}

// ── Customizer Panel ───────────────────────────────────────
function toggleCustomizer() {
  document.getElementById('customizer-panel').classList.toggle('hidden');
}

// ── Replay ────────────────────────────────────────────────
function replayStory() {
  audio.pause();
  audio.currentTime = 0;
  state.candlesBlown = 0;
  state.giftOpened = false;
  state.envelopeOpened = false;
  // Reset cake
  buildCake();
  document.getElementById('wish-message').classList.add('hidden');
  document.getElementById('cake-hint').classList.remove('hidden');
  // Reset envelope
  const env = document.getElementById('envelope');
  env.classList.remove('opened');
  document.getElementById('letter-paper').classList.add('hidden');
  // Reset gift
  document.getElementById('gift-box').classList.remove('opened');
  document.getElementById('gift-box').style.animation = '';
  document.getElementById('gift-message').classList.add('hidden');
  document.getElementById('gift-hint').classList.remove('hidden');

  // Scroll to top – show opening again
  openingScreen.style.display = 'flex';
  openingScreen.classList.remove('fade-out');
  mainSite.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Heart burst ────────────────────────────────────────────
function burstHeartsAt(x, y, count) {
  const hearts = ['💕','💗','💖','💓','💞','💘','🩷','🌸','✨'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed;
      left:${x}px;
      top:${y}px;
      font-size:${Math.random() * 14 + 12}px;
      pointer-events:none;
      z-index:99998;
      transform:translate(-50%,-50%);
      transition: none;
    `;
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const dist  = Math.random() * 120 + 40;
    const vx = Math.cos(angle) * dist;
    const vy = Math.sin(angle) * dist - 60;
    el.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) scale(0)`, opacity: 0 }
    ], { duration: 900 + Math.random() * 600, easing: 'cubic-bezier(0,0.9,0.5,1)', fill: 'forwards' })
    .onfinish = () => el.remove();
  }
}

// ── Pink Sparkles (on open) ────────────────────────────────
function spawnPinkSparkles() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      burstHeartsAt(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 3);
    }, i * 40);
  }
}

// ── Confetti ───────────────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const colors = ['#ff8fab','#ffb3ce','#ffd6e7','#e8d5f5','#c9b1e8','#ff6b9d','#fff'];
  const pieces = [];
  for (let i = 0; i < 200; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20,
      r: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 2,
      spin: Math.random() * 0.2 - 0.1,
      angle: Math.random() * Math.PI * 2,
      alpha: 1,
    });
  }
  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx.restore();
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;
      p.vy += 0.05;
      if (p.y > canvas.height) p.alpha -= 0.05;
    });
    if (pieces.some(p => p.alpha > 0)) {
      frame = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  draw();
  setTimeout(() => { cancelAnimationFrame(frame); ctx.clearRect(0, 0, canvas.width, canvas.height); }, 5000);
}
