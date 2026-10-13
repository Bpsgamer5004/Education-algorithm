// Creator Forge — Neural Collaboration Matrix
// 1. Hashtag / URL Anchor Routing (Prevents state breakdown; works via browser history & direct links)
// 2. Persistent Animated Starfield: Canvas is z-index: 1 on pure pitch-black body; panes are translucent glass (never obscuring the stars!)
// 3. Prompt Chat Room: Live creator dialogue discussing prompt tokens, sampler settings, and combinations
// 4. Shared Works Feed: Creators showcase creations; click "Send to Contact" to send directly to any added contact via modal
// 5. Recruiter Studio Reviews: Authentically simulated conversations between enterprise studios evaluating creators
// 6. Explicit "Add to Contacts" (Deduplicated) & Recruiter Deal Acceptance into Agent Group Workspace

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initInteractiveStarfield();
  initRippleTitle();
  initModeSwitcher();
  initSelfBuildingCrystal();
  initCircularMeniscusWithMouseFacingCurve();
  initCreatorsDirectory();
  initContactsAndChat();
  initWorkspaceAndPublishing();
  initExploreSections();
  initProfileEditor();
  initPhotoLightbox();
  initAnchorRouting();
});

/* =========================================================
   24 DISTINCT AI CREATORS DATABASE
   ========================================================= */
const CREATORS_DATA = [
  { id: 1, name: "Vanguard Studio", handle: "@0xVanguard", spec: "diffusion", role: "SDXL & Flux Photorealism", avatar: "VG", color: "#a3e635", desc: "Crafting hyper-detailed cinematic LoRAs with zero plastic skin artifacts.", rating: "4.9★", worksCount: 42, rate: "Ξ 0.85/task",
    template: { name: "Cinematic Lighting Pipeline v4", features: ["16-Step High Dynamic Range", "Custom Contrast Latent Guide", "Photoreal Skin Micro-Texture"] },
    portfolio: ["https://picsum.photos/seed/vanguard1/300/200", "https://picsum.photos/seed/vanguard2/300/200", "https://picsum.photos/seed/vanguard3/300/200"]
  },
  { id: 2, name: "Kore Autonomous", handle: "@kore_ai", spec: "agent", role: "Multi-Agent Video Pipeline", avatar: "KA", color: "#f43f5e", desc: "Autonomous content swarms converting raw ideas into rendered viral video clips.", rating: "4.8★", worksCount: 29, rate: "Ξ 1.40/task",
    template: { name: "Autonoma Viral Script Engine", features: ["Audience Retention Loop", "Automated CapCut Export", "Multi-Language Hook Synthesizer"] },
    portfolio: ["https://picsum.photos/seed/kore1/300/200", "https://picsum.photos/seed/kore2/300/200", "https://picsum.photos/seed/kore3/300/200"]
  },
  { id: 3, name: "Sonic Resonance", handle: "@sonic_res", spec: "audio", role: "96kHz Zero-Shot Voice Synth", avatar: "SR", color: "#06b6d4", desc: "Studio broadcast expressive neural voice models tuned for immersive game dialogue.", rating: "5.0★", worksCount: 18, rate: "Ξ 0.50/task",
    template: { name: "Emotional Resonator V2", features: ["Pitch Variance Slider", "Whisper-to-Shout Trajectory", "Zero Latency Streaming API"] },
    portfolio: ["https://picsum.photos/seed/sonic1/300/200", "https://picsum.photos/seed/sonic2/300/200", "https://picsum.photos/seed/sonic3/300/200"]
  },
  { id: 4, name: "Luma Nexus", handle: "@lumanexus", spec: "diffusion", role: "Glassmorphism & 3D Shaders", avatar: "LN", color: "#f59e0b", desc: "Ray-marched neural splats and refractive UI elements rendered in pure latent space.", rating: "4.9★", worksCount: 35, rate: "Ξ 0.70/task",
    template: { name: "Meniscus Refraction Preset", features: ["Dual-Sided Glass Caustics", "Volumetric Fog Scattering", "Ultra Clean Spectral Rim"] },
    portfolio: ["https://picsum.photos/seed/luma1/300/200", "https://picsum.photos/seed/luma2/300/200", "https://picsum.photos/seed/luma3/300/200"]
  },
  { id: 5, name: "Hyperion Motion", handle: "@hyperion_mo", spec: "video", role: "60 FPS Temporal Consistency", avatar: "HM", color: "#10b981", desc: "Defeating morph flicker in generative video using optical flow latent anchoring.", rating: "4.7★", worksCount: 22, rate: "Ξ 1.10/task",
    template: { name: "Temporal Anchor AnimateDiff", features: ["Zero-Flicker Interp", "Camera Dolly Path Lock", "Character Consistent Garments"] },
    portfolio: ["https://picsum.photos/seed/motion1/300/200", "https://picsum.photos/seed/motion2/300/200", "https://picsum.photos/seed/motion3/300/200"]
  },
  { id: 6, name: "Neural Glitch", handle: "@neuralglitch", spec: "diffusion", role: "Cyberpunk & Brutalist Art", avatar: "NG", color: "#8b5cf6", desc: "High contrast neon brutality inspired by retro-futurism and dystopian aesthetics.", rating: "4.9★", worksCount: 64, rate: "Ξ 0.60/task",
    template: { name: "Neo-Brutalism LoRA Pack", features: ["Hard Edge Contrast", "Offset Neon Outlines", "Analog Film Halation"] },
    portfolio: ["https://picsum.photos/seed/glitch1/300/200", "https://picsum.photos/seed/glitch2/300/200", "https://picsum.photos/seed/glitch3/300/200"]
  },
  { id: 7, name: "Echo Agentica", handle: "@echo_agent", spec: "agent", role: "Automated Research Agent", avatar: "EA", color: "#f97316", desc: "Autonomous browser swarm that scrapes market signals and drafts viral threads.", rating: "4.6★", worksCount: 15, rate: "Ξ 0.90/task",
    template: { name: "TrendScrape Intelligence", features: ["X / Reddit Sentiment Map", "Auto-Fact Checking Node", "Markdown Report Synthesis"] },
    portfolio: ["https://picsum.photos/seed/echo1/300/200", "https://picsum.photos/seed/echo2/300/200", "https://picsum.photos/seed/echo3/300/200"]
  },
  { id: 8, name: "Spectra Sound", handle: "@spectrasnd", spec: "audio", role: "Generative EDM & Dark Ambient", avatar: "SS", color: "#0ea5e9", desc: "Trained checkpoints for generating modular synthesizer loops and organic textures.", rating: "4.8★", worksCount: 31, rate: "Ξ 0.45/task",
    template: { name: "Sub-Bass Warp Generator", features: ["Stems Separation Engine", "BPM Elastic Grid", "WAV 24-bit Lossless Export"] },
    portfolio: ["https://picsum.photos/seed/spectra1/300/200", "https://picsum.photos/seed/spectra2/300/200", "https://picsum.photos/seed/spectra3/300/200"]
  },
  { id: 9, name: "Chrono Frame", handle: "@chronoframe", spec: "video", role: "Generative VFX & Particles", avatar: "CF", color: "#a3e635", desc: "Liquid simulation and magical spell rendering nodes for Unreal Engine 5 workflows.", rating: "4.9★", worksCount: 19, rate: "Ξ 1.25/task",
    template: { name: "Liquid Simulation Node", features: ["Viscosity Morph Curves", "GPU Surface Tension", "Alpha Channel Clean Cut"] },
    portfolio: ["https://picsum.photos/seed/chrono1/300/200", "https://picsum.photos/seed/chrono2/300/200", "https://picsum.photos/seed/chrono3/300/200"]
  },
  { id: 10, name: "Aether Archetype", handle: "@aether_arch", spec: "diffusion", role: "Minimalist Architectural AI", avatar: "AA", color: "#f43f5e", desc: "Translating architectural blueprints into photorealistic twilight renders.", rating: "4.9★", worksCount: 47, rate: "Ξ 0.80/task",
    template: { name: "Twilight Elevation Blueprint", features: ["CAD DWG Vector Support", "Realistic Sun Position", "Material Roughness Accuracy"] },
    portfolio: ["https://picsum.photos/seed/aether1/300/200", "https://picsum.photos/seed/aether2/300/200", "https://picsum.photos/seed/aether3/300/200"]
  },
  { id: 11, name: "Omni Swarm", handle: "@omniswarm", spec: "agent", role: "Autonomous Code Refactorers", avatar: "OS", color: "#06b6d4", desc: "Deploy swarms of developer agents to fix memory leaks and refactor legacy code.", rating: "5.0★", worksCount: 12, rate: "Ξ 2.10/task",
    template: { name: "AST Bug Smasher v3", features: ["Automated Unit Test Gen", "PR Review Commentator", "TypeScript Strict Adherence"] },
    portfolio: ["https://picsum.photos/seed/omni1/300/200", "https://picsum.photos/seed/omni2/300/200", "https://picsum.photos/seed/omni3/300/200"]
  },
  { id: 12, name: "Velvet Vocal", handle: "@velvet_vox", spec: "audio", role: "ASMR & Whispering Checkpoints", avatar: "VV", color: "#f59e0b", desc: "Binaural microphone voice cloning that simulates ultra-close ear proximity.", rating: "4.7★", worksCount: 26, rate: "Ξ 0.55/task",
    template: { name: "Binaural Spatializer", features: ["HRTF 3D Panning", "Breath Infusion Slider", "Proximity Map"] },
    portfolio: ["https://picsum.photos/seed/velvet1/300/200", "https://picsum.photos/seed/velvet2/300/200", "https://picsum.photos/seed/velvet3/300/200"]
  }
];

// App State
let currentAppMode = 'buyer';
let currentPageId = 'hub';
const savedFavorites = new Set();
const savedFavoritePosts = new Set();
const savedContacts = new Map();
const acceptedDeals = new Set();
let activeChatCreatorId = null;
let currentPostToShare = null;

// Explore Shared Works Database
const SHARED_WORKS = [
  { id: 'sw-1', title: "Refractive Meniscus Orb v2", creator: "@LumaNexus", img: "https://picsum.photos/seed/orb1/600/400", desc: "Ray-marched glass refraction test rendered on Flux.1 latent core." },
  { id: 'sw-2', title: "Cyber-Brutalist Exoskeleton", creator: "@NeuralGlitch", img: "https://picsum.photos/seed/mech2/600/400", desc: "Hard-surface edge contrast model tuned for dystopian concept art." },
  { id: 'sw-3', title: "Hyper-Real Voice Model Sample", creator: "@SonicRes", img: "https://picsum.photos/seed/voice3/600/400", desc: "Emotional speech synthesizer with breath latency reduction." },
  { id: 'sw-4', title: "Astral Nebula Dust Clouds", creator: "@NebulaDreams", img: "https://picsum.photos/seed/nebula4/600/400", desc: "Volumetric space gas and planetary rings rendered at 8K resolution." },
  { id: 'sw-5', title: "Liquid Chrono Simulation Frame", creator: "@ChronoFrame", img: "https://picsum.photos/seed/chrono1/600/400", desc: "Zero-flicker liquid metal morphing node with specular refraction." },
  { id: 'sw-6', title: "Twilight Monolith Blueprint", creator: "@AetherArch", img: "https://picsum.photos/seed/aether1/600/400", desc: "Raytraced architectural elevation render with twilight sky dynamics." }
];

// User's Published Works (Editable in Profile)
let publishedWorks = [
  { id: 'pw-1', title: "Hyper-Refraction Glass LoRA", cat: "diffusion", price: "Ξ 0.75", desc: "Ray-marched glass caustics model for cinematic bottles." },
  { id: 'pw-2', title: "Autonoma Audio Splicer", cat: "audio", price: "Ξ 0.40", desc: "Splits stems into quantized 128 BPM WAV segments." }
];

// Colors for starfield
const PAGE_COLOR_MAP = {
  'hub': ['rgba(163, 230, 53, ', 'rgba(168, 85, 247, ', 'rgba(16, 185, 129, '],
  'homepage': ['rgba(163, 230, 53, ', 'rgba(217, 249, 157, ', 'rgba(77, 124, 15, '],
  'favorites': ['rgba(244, 63, 94, ', 'rgba(254, 205, 211, ', 'rgba(136, 19, 55, '],
  'explore': ['rgba(6, 182, 212, ', 'rgba(207, 250, 254, ', 'rgba(22, 78, 99, '],
  'credits': ['rgba(245, 158, 11, ', 'rgba(254, 243, 199, ', 'rgba(120, 53, 15, '],
  'contacts': ['rgba(16, 185, 129, ', 'rgba(209, 250, 229, ', 'rgba(6, 78, 59, '],
  'workspace': ['rgba(139, 92, 246, ', 'rgba(237, 233, 254, ', 'rgba(76, 29, 149, '],
  'profile': ['rgba(249, 115, 22, ', 'rgba(255, 237, 213, ', 'rgba(124, 45, 18, '],
  'invite': ['rgba(14, 165, 233, ', 'rgba(224, 242, 254, ', 'rgba(12, 74, 110, ']
};

/* =========================================================
   1. HASHTAG ANCHOR ROUTING (FIXES BACKGROUND AND ROUTING)
   ========================================================= */
function initAnchorRouting() {
  function handleHash() {
    const hash = window.location.hash.replace('#', '') || 'hub';
    warpTo(hash);
  }

  window.addEventListener('hashchange', handleHash);

  // If page loaded with an existing hash, route to it
  if (window.location.hash) {
    handleHash();
  }
}

function warpTo(targetId) {
  const validPages = ['hub', 'homepage', 'favorites', 'explore', 'credits', 'contacts', 'workspace', 'profile', 'invite'];
  if (!validPages.includes(targetId)) targetId = 'hub';

  currentPageId = targetId;
  document.body.setAttribute('data-page', targetId);

  // Hide all panels
  document.querySelectorAll('.view-panel, .destination-panel').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  // Activate target
  if (targetId === 'hub') {
    const hub = document.getElementById('main-hub');
    if (hub) {
      hub.style.display = 'flex';
      hub.classList.add('active');
    }
  } else {
    const panel = document.getElementById(`page-${targetId}`);
    if (panel) {
      panel.style.display = 'flex';
      panel.classList.add('active');
    }
    if (targetId === 'explore') {
      applyExploreModeDefaults(currentAppMode);
    }
    if (targetId === 'favorites') {
      updateFavoritesTab();
    }
  }

  // Sync active bead in circular meniscus
  const beads = document.querySelectorAll('.bead-button');
  beads.forEach(b => {
    if (b.dataset.target === targetId) {
      b.classList.add('active-bead');
    } else {
      b.classList.remove('active-bead');
    }
  });

  if (window.lucide) window.lucide.createIcons();
}

/* =========================================================
   2. CONTINUOUS ANIMATED STARFIELD (ALWAYS VISIBLE & ANIMATED)
   ========================================================= */
function initInteractiveStarfield() {
  const canvas = document.getElementById('interactive-star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const starCount = 140;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.2 + 0.8,
      colorIndex: Math.floor(Math.random() * 3),
      pulse: Math.random() * Math.PI * 2
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function drawStars() {
    requestAnimationFrame(drawStars);
    ctx.clearRect(0, 0, width, height);

    const pageColors = PAGE_COLOR_MAP[currentPageId] || PAGE_COLOR_MAP['hub'];

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      s.pulse += 0.025;

      if (s.x < 0) s.x = width;
      if (s.x > width) s.x = 0;
      if (s.y < 0) s.y = height;
      if (s.y > height) s.y = 0;

      const dx = mouseX - s.x;
      const dy = mouseY - s.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / 300);
      const baseAlpha = 0.28 + 0.15 * Math.sin(s.pulse);
      const starAlpha = Math.min(1.0, proximity * 0.7 + baseAlpha);

      const starColor = pageColors[s.colorIndex % pageColors.length];

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius * (1 + proximity * 0.6), 0, Math.PI * 2);
      ctx.fillStyle = starColor + starAlpha + ')';
      ctx.shadowBlur = 10 * proximity;
      ctx.shadowColor = starColor + '0.7)';
      ctx.fill();

      for (let j = i + 1; j < stars.length; j++) {
        const s2 = stars[j];
        const distP = Math.hypot(s.x - s2.x, s.y - s2.y);
        if (distP < 80) {
          const lineAlpha = (1 - distP / 80) * 0.25 * (proximity + 0.3);
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.strokeStyle = starColor + lineAlpha + ')';
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }
  }

  drawStars();
}

/* =========================================================
   3. RIPPLE TITLE (FLEXBOX WORDS PREVENTS SPLIT TEXT)
   ========================================================= */
function initRippleTitle() {
  const title = document.getElementById('ripple-brand-title');
  if (!title) return;

  const chars = title.querySelectorAll('.title-char');
  const rippleRadius = 130;
  const rippleColors = ['#a3e635', '#22d3ee', '#f43f5e', '#a855f7', '#f59e0b', '#34d399'];

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    chars.forEach((span, idx) => {
      const rect = span.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const dx = mouseX - charCenterX;
      const dy = mouseY - charCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < rippleRadius) {
        const factor = 1 - (dist / rippleRadius);
        const col = rippleColors[(idx + Math.floor(performance.now() * 0.003)) % rippleColors.length];
        span.style.color = col;
        span.style.transform = `translateY(${-6 * factor}px) scale(${1 + 0.15 * factor})`;
        span.style.textShadow = `0 0 ${16 * factor}px ${col}`;
      } else {
        span.style.color = '#ffffff';
        span.style.transform = 'translateY(0px) scale(1)';
        span.style.textShadow = '0 10px 40px rgba(0, 0, 0, 0.9)';
      }
    });
  });
}

/* =========================================================
   4. MODE SWITCHER
   ========================================================= */
function initModeSwitcher() {
  const btnBuyer = document.getElementById('btn-mode-buyer');
  const btnRecruiter = document.getElementById('btn-mode-recruiter');
  const desc = document.getElementById('mode-text-desc');
  const wsModePill = document.getElementById('ws-mode-pill');
  const wsRecruiterView = document.getElementById('ws-recruiter-view');
  const wsCreatorView = document.getElementById('ws-creator-view');

  function setMode(mode) {
    currentAppMode = mode;
    document.body.setAttribute('data-mode', mode);

    if (mode === 'buyer') {
      btnBuyer.classList.add('active');
      btnRecruiter.classList.remove('active');
      if (desc) desc.innerText = "EXPLORER & PROMPT CHAT MODE";
      if (wsModePill) wsModePill.innerText = "CREATOR WORKSPACE • PUBLISH ASSETS";
      if (wsRecruiterView) wsRecruiterView.style.display = 'none';
      if (wsCreatorView) wsCreatorView.style.display = 'block';
      applyExploreModeDefaults('buyer');
      showToast("Switched to Buyer / Creator Mode");
    } else {
      btnRecruiter.classList.add('active');
      btnBuyer.classList.remove('active');
      if (desc) desc.innerText = "RECRUITER MODE (ACCEPT DEALS & AGENT WORKSPACE)";
      if (wsModePill) wsModePill.innerText = "RECRUITER WORKSPACE • AGENT GROUP COLLABORATION";
      if (wsRecruiterView) wsRecruiterView.style.display = 'block';
      if (wsCreatorView) wsCreatorView.style.display = 'none';
      applyExploreModeDefaults('recruiter');
      showToast("Switched to Recruiter Mode (Enlist Agents to Workspace)");
    }

    updateChatDealButton();
  }

  if (btnBuyer && btnRecruiter) {
    btnBuyer.addEventListener('click', () => setMode('buyer'));
    btnRecruiter.addEventListener('click', () => setMode('recruiter'));
  }

  setMode('buyer');
}

/* =========================================================
   5. THREE.JS 3D CRYSTAL
   ========================================================= */
function initSelfBuildingCrystal() {
  const canvas = document.getElementById('crystal-canvas');
  if (!canvas) return;

  const width = 130;
  const height = 130;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 4.2;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.OctahedronGeometry(1.25, 0);
  const pos = geometry.attributes.position;
  const colors = [];
  const topPurple = new THREE.Color(0xa855f7);
  const bottomGreen = new THREE.Color(0x059669);

  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y > 0.05) {
      colors.push(topPurple.r, topPurple.g, topPurple.b);
    } else if (y < -0.05) {
      colors.push(bottomGreen.r, bottomGreen.g, bottomGreen.b);
    } else {
      const blended = topPurple.clone().lerp(bottomGreen, 0.5);
      colors.push(blended.r, blended.g, blended.b);
    }
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.MeshPhysicalMaterial({
    vertexColors: true, roughness: 0.1, transmission: 0.72, thickness: 1.1,
    reflectivity: 0.95, clearcoat: 1.0, clearcoatRoughness: 0.1, flatShading: true,
    transparent: true, opacity: 0.94
  });

  const crystalMesh = new THREE.Mesh(geometry, material);
  scene.add(crystalMesh);

  const wireGeo = new THREE.OctahedronGeometry(1.27, 0);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.4 });
  crystalMesh.add(new THREE.Mesh(wireGeo, wireMat));

  const sparkGeo = new THREE.OctahedronGeometry(0.45, 0);
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xd8b4fe, wireframe: true, transparent: true, opacity: 0.85 });
  const sparkMesh = new THREE.Mesh(sparkGeo, sparkMat);
  crystalMesh.add(sparkMesh);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const topLight = new THREE.PointLight(0xa855f7, 4.5, 10);
  topLight.position.set(2, 4, 3);
  scene.add(topLight);

  const bottomLight = new THREE.PointLight(0x10b981, 4.5, 10);
  bottomLight.position.set(-2, -4, 2);
  scene.add(bottomLight);

  let isDragging = false;
  let prevX = 0, prevY = 0, velX = 0, velY = 0;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
  });
  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    velX = dx * 0.007;
    velY = dy * 0.007;
    crystalMesh.rotation.y += velX;
    crystalMesh.rotation.x += velY;
    prevX = e.clientX;
    prevY = e.clientY;
  });

  function render(time) {
    requestAnimationFrame(render);
    if (!isDragging) {
      crystalMesh.rotation.y += 0.008;
      crystalMesh.rotation.x = Math.sin(time * 0.001) * 0.12;
      sparkMesh.rotation.y -= 0.015;
    } else {
      velX *= 0.94;
      velY *= 0.94;
      crystalMesh.rotation.y += velX;
      crystalMesh.rotation.x += velY;
    }
    renderer.render(scene, camera);
  }
  requestAnimationFrame(render);
}

/* =========================================================
   6. CIRCULAR MENISCUS NOTCH FACING MOUSE
   ========================================================= */
function initCircularMeniscusWithMouseFacingCurve() {
  const stage = document.getElementById('circularMeniscusStage');
  const bead = document.getElementById('orbitalDraggableBead');
  const notchPath = document.getElementById('orbitalMeniscusPath');
  const buttons = document.querySelectorAll('.bead-button');
  if (!stage || !bead || !notchPath) return;

  const cx = 230;
  const cy = 230;
  const radius = 147;

  let currentBeadAngle = 270;
  let targetCurveAngle = 270;
  let currentCurveAngle = 270;
  let isDraggingOrbitalBead = false;

  function renderFacingCurve(deg) {
    const rad = (deg * Math.PI) / 180;
    const arcSpan = 45;
    const startDeg = deg - arcSpan;
    const endDeg = deg + arcSpan;

    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const xMid = cx + (radius + 16) * Math.cos(rad);
    const yMid = cy + (radius + 16) * Math.sin(rad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    notchPath.setAttribute('d', `M ${x1} ${y1} Q ${xMid} ${yMid} ${x2} ${y2}`);
  }

  function animateCurveFacing() {
    let diff = targetCurveAngle - currentCurveAngle;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    currentCurveAngle += diff * 0.12;
    renderFacingCurve(currentCurveAngle);
    requestAnimationFrame(animateCurveFacing);
  }
  animateCurveFacing();

  window.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const stageCenterX = rect.left + rect.width / 2;
    const stageCenterY = rect.top + rect.height / 2;
    const dx = e.clientX - stageCenterX;
    const dy = e.clientY - stageCenterY;
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (deg < 0) deg += 360;
    targetCurveAngle = deg;

    if (isDraggingOrbitalBead) {
      setBeadAngle(deg, false);
    }
  });

  function setBeadAngle(deg, animated = true) {
    currentBeadAngle = deg;
    const rad = (deg * Math.PI) / 180;
    const x = cx + radius * Math.cos(rad);
    const y = cy + radius * Math.sin(rad);

    bead.style.transition = animated ? 'left 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2), top 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2), background 0.3s ease' : 'none';
    bead.style.left = `${x}px`;
    bead.style.top = `${y}px`;
  }

  setBeadAngle(270, false);

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Let anchor navigation take over; update bead styling
      buttons.forEach(b => b.classList.remove('active-bead'));
      btn.classList.add('active-bead');

      const targetAngle = parseFloat(btn.dataset.angle);
      const color = btn.dataset.color || '#a3e635';
      const icon = btn.dataset.icon || 'home';

      bead.style.background = `radial-gradient(circle at 35% 35%, #ffffff 0%, ${color} 48%, #000000 100%)`;
      bead.style.boxShadow = `0 0 35px ${color}, 0 0 60px ${color}88, inset 0 2px 5px #fff`;

      const activeIcon = document.getElementById('orbitalActiveIcon');
      if (activeIcon) {
        activeIcon.setAttribute('data-lucide', icon);
        if (window.lucide) window.lucide.createIcons();
      }

      setBeadAngle(targetAngle, true);
    });
  });

  bead.addEventListener('mousedown', (e) => {
    isDraggingOrbitalBead = true;
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    if (isDraggingOrbitalBead) {
      isDraggingOrbitalBead = false;
      let closestBtn = buttons[0];
      let minDiff = 999;

      buttons.forEach(btn => {
        const btnAngle = parseFloat(btn.dataset.angle);
        let diff = Math.abs(currentBeadAngle - btnAngle);
        if (diff > 180) diff = 360 - diff;
        if (diff < minDiff) {
          minDiff = diff;
          closestBtn = btn;
        }
      });

      if (closestBtn) {
        window.location.hash = closestBtn.getAttribute('href');
      }
    }
  });
}

/* =========================================================
   7. CREATORS DIRECTORY WITH EXPLICIT "ADD TO CONTACTS"
   ========================================================= */
function initCreatorsDirectory() {
  const grid = document.getElementById('creators-grid');
  const searchInput = document.getElementById('creator-search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  function renderCreators(filter = 'all', query = '') {
    grid.innerHTML = '';
    const q = query.toLowerCase();

    const filtered = CREATORS_DATA.filter(c => {
      const matchFilter = filter === 'all' || c.spec === filter;
      const matchQuery = !q || c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q) || c.role.toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });

    filtered.forEach(c => {
      const isLiked = savedFavorites.has(c.id);
      const isAdded = savedContacts.has(c.id);

      const card = document.createElement('div');
      card.className = 'creator-card';
      const avatarPhotoUrl = c.portfolio && c.portfolio.length > 0 ? c.portfolio[0] : `https://picsum.photos/seed/avatar${c.id}/500/500`;
      card.innerHTML = `
        <div class="creator-card-top">
          <div class="creator-avatar-wrap">
            <div class="creator-avatar glass-icon-box creator-photo-trigger" style="background: ${c.color}22 !important; border-color: ${c.color} !important; cursor: pointer;" title="Click photo to expand in glowing bubble lightbox" data-img="${avatarPhotoUrl}" data-title="${c.name} Avatar" data-author="${c.handle}">
              ${c.avatar}
            </div>
            <div class="creator-title-area">
              <h4>${c.name}</h4>
              <span class="creator-handle">${c.handle}</span>
            </div>
          </div>
          <button class="creator-heart-btn glass-icon-box ${isLiked ? 'liked' : ''}" data-id="${c.id}" title="Pin to Favorites">
            <i data-lucide="heart"></i>
          </button>
        </div>

        <span class="creator-spec-pill">${c.role}</span>
        <p class="creator-desc">${c.desc}</p>

        <div class="creator-card-action-bar">
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #a1a1aa;">${c.rating} &bull; ${c.rate}</span>
          <button class="btn-add-contact ${isAdded ? 'added' : ''}" data-id="${c.id}">
            <i data-lucide="${isAdded ? 'check' : 'user-plus'}"></i>
            <span>${isAdded ? 'In Contacts' : 'Add to Contacts'}</span>
          </button>
        </div>

        <div class="creator-template-overlay">
          <div class="overlay-template-title">SIGNATURE WORKFLOW TEMPLATE</div>
          <div class="overlay-template-name">${c.template.name}</div>
          <div class="overlay-template-features">
            ${c.template.features.map(f => `<div>&bull; ${f}</div>`).join('')}
          </div>
        </div>
      `;

      const addBtn = card.querySelector('.btn-add-contact');
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (savedContacts.has(c.id)) {
          showToast(`${c.name} is already in your Contacts! Opening chat...`);
          openChatWithCreator(c.id);
          window.location.hash = '#contacts';
        } else {
          savedContacts.set(c.id, c);
          addBtn.classList.add('added');
          addBtn.innerHTML = `<i data-lucide="check"></i> <span>In Contacts</span>`;
          if (window.lucide) window.lucide.createIcons();
          showToast(`Added ${c.name} to Contacts!`);
          renderContactsList();
        }
      });

      const heartBtn = card.querySelector('.creator-heart-btn');
      heartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(c, heartBtn);
      });

      const avatarTrigger = card.querySelector('.creator-photo-trigger');
      if (avatarTrigger) {
        avatarTrigger.addEventListener('click', (e) => {
          e.stopPropagation();
          openPhotoLightbox(avatarPhotoUrl, `${c.name} — Signature Portfolio`, c.handle);
        });
      }

      grid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  renderCreators();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
      renderCreators(activeFilter, e.target.value);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const query = searchInput ? searchInput.value : '';
      renderCreators(btn.dataset.filter, query);
    });
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast-notify');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

function toggleFavorite(creator, heartBtn) {
  if (savedFavorites.has(creator.id)) {
    savedFavorites.delete(creator.id);
    heartBtn.classList.remove('liked');
    showToast(`Removed ${creator.name} from Favorites.`);
  } else {
    savedFavorites.add(creator.id);
    heartBtn.classList.add('liked');
    showToast(`Added ${creator.name} to Favorites!`);
  }
  updateFavoritesTab();
}

function updateFavoritesTab() {
  const favGrid = document.getElementById('favorites-grid');
  const favPostsGrid = document.getElementById('favorites-posts-grid');
  const favMeta = document.getElementById('fav-count-meta');
  const tabCreatorsBtn = document.getElementById('fav-tab-creators-btn');
  const tabPostsBtn = document.getElementById('fav-tab-posts-btn');

  const totalItems = savedFavorites.size + savedFavoritePosts.size;
  if (favMeta) favMeta.innerText = `${totalItems} ITEMS PINNED (${savedFavorites.size} Creators, ${savedFavoritePosts.size} Posts)`;

  // Tab switching setup
  if (tabCreatorsBtn && tabPostsBtn && !tabCreatorsBtn.dataset.wired) {
    tabCreatorsBtn.dataset.wired = "true";
    tabCreatorsBtn.addEventListener('click', () => {
      tabCreatorsBtn.classList.add('active');
      tabPostsBtn.classList.remove('active');
      if (favGrid) favGrid.style.display = 'grid';
      if (favPostsGrid) favPostsGrid.style.display = 'none';
    });

    tabPostsBtn.addEventListener('click', () => {
      tabPostsBtn.classList.add('active');
      tabCreatorsBtn.classList.remove('active');
      if (favGrid) favGrid.style.display = 'none';
      if (favPostsGrid) favPostsGrid.style.display = 'grid';
    });
  }

  // 1. Render Favorited Creators
  if (favGrid) {
    favGrid.innerHTML = '';
    if (savedFavorites.size === 0) {
      favGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 4rem 2rem; color: #64748b;">
          <i data-lucide="heart" class="glass-icon-box" style="width: 44px; height: 44px; margin: 0 auto 1rem; color: #f43f5e;"></i>
          <h3>No Favorited Creators Yet</h3>
          <p>Click the heart icon on any creator card to bookmark them here.</p>
        </div>
      `;
    } else {
      savedFavorites.forEach(id => {
        const creator = CREATORS_DATA.find(c => c.id === id);
        if (!creator) return;

        const avatarPhotoUrl = creator.portfolio && creator.portfolio.length > 0 ? creator.portfolio[0] : `https://picsum.photos/seed/avatar${creator.id}/500/500`;

        const card = document.createElement('div');
        card.className = 'creator-card';
        card.innerHTML = `
          <div class="creator-card-top">
            <div class="creator-avatar-wrap">
              <div class="creator-avatar glass-icon-box creator-photo-trigger" style="background: ${creator.color}22 !important; border-color: ${creator.color} !important; cursor: pointer;" title="Click photo to expand in glowing bubble lightbox" data-img="${avatarPhotoUrl}" data-title="${creator.name} Avatar" data-author="${creator.handle}">
                ${creator.avatar}
              </div>
              <div class="creator-title-area">
                <h4>${creator.name}</h4>
                <span class="creator-handle">${creator.handle}</span>
              </div>
            </div>
            <button class="creator-heart-btn glass-icon-box liked" data-id="${creator.id}" title="Remove from Favorites">
              <i data-lucide="heart"></i>
            </button>
          </div>
          <span class="creator-spec-pill">${creator.role}</span>
          <p class="creator-desc">${creator.desc}</p>
          <div class="creator-card-action-bar">
            <span>Template: ${creator.template.name}</span>
            <button class="action-glass-btn btn-open-chat" style="padding: 0.25rem 0.6rem; font-size: 0.72rem;">Open Chat</button>
          </div>
        `;

        card.querySelector('.creator-photo-trigger')?.addEventListener('click', (e) => {
          e.stopPropagation();
          openPhotoLightbox(avatarPhotoUrl, `${creator.name} — Portfolio Asset`, creator.handle);
        });

        card.querySelector('.creator-heart-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleFavorite(creator, card.querySelector('.creator-heart-btn'));
        });

        card.querySelector('.btn-open-chat')?.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!savedContacts.has(creator.id)) {
            savedContacts.set(creator.id, creator);
            renderContactsList();
          }
          openChatWithCreator(creator.id);
          window.location.hash = '#contacts';
        });

        favGrid.appendChild(card);
      });
    }
  }

  // 2. Render Favorited Posts
  if (favPostsGrid) {
    favPostsGrid.innerHTML = '';
    if (savedFavoritePosts.size === 0) {
      favPostsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 4rem 2rem; color: #64748b;">
          <i data-lucide="sparkles" class="glass-icon-box" style="width: 44px; height: 44px; margin: 0 auto 1rem; color: #f43f5e;"></i>
          <h3>No Favorited Posts Yet</h3>
          <p>Click the heart icon on any post in the Explore "Shared Works Feed" to save them here.</p>
        </div>
      `;
    } else {
      savedFavoritePosts.forEach(postId => {
        const post = SHARED_WORKS.find(w => w.id === postId);
        if (!post) return;

        const card = document.createElement('div');
        card.className = 'shared-work-card';
        card.innerHTML = `
          <img src="${post.img}" alt="${post.title}" class="shared-work-thumb" loading="lazy" style="cursor: pointer;" title="Click photo to zoom in bubble lightbox" />
          <div class="shared-work-body">
            <div class="shared-work-head">
              <h4 style="font-size: 1rem; font-weight:700;">${post.title}</h4>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #06b6d4;">${post.creator}</span>
            </div>
            <p style="font-size: 0.82rem; color: #94a3b8; line-height: 1.45;">${post.desc}</p>
            <div class="shared-work-actions">
              <button class="btn-fav-post liked" data-id="${post.id}" title="Remove from favorites">
                <i data-lucide="heart"></i>
              </button>
              <button class="btn-send-to-contact" data-id="${post.id}">
                <i data-lucide="share"></i> Send to Contact
              </button>
            </div>
          </div>
        `;

        card.querySelector('.shared-work-thumb')?.addEventListener('click', () => {
          openPhotoLightbox(post.img, post.title, post.creator);
        });

        card.querySelector('.btn-fav-post')?.addEventListener('click', () => {
          togglePostFavorite(post);
        });

        card.querySelector('.btn-send-to-contact')?.addEventListener('click', () => {
          openShareModal(post);
        });

        favPostsGrid.appendChild(card);
      });
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

/* =========================================================
   8. EXPLORE: PROMPT CHAT ROOM, SHARED FEED, REVIEWS
   ========================================================= */
function initExploreSections() {
  const btnPrompts = document.getElementById('btn-exp-prompts');
  const btnWorks = document.getElementById('btn-exp-works');
  const btnReviews = document.getElementById('btn-exp-reviews');

  const panePrompts = document.getElementById('pane-prompts-room');
  const paneWorks = document.getElementById('pane-shared-works');
  const paneReviews = document.getElementById('pane-recruiter-reviews');

  function switchExplorePane(view) {
    [btnPrompts, btnWorks, btnReviews].forEach(b => b.classList.remove('active'));
    [panePrompts, paneWorks, paneReviews].forEach(p => p.style.display = 'none');

    if (view === 'prompts') {
      btnPrompts.classList.add('active');
      panePrompts.style.display = 'block';
    } else if (view === 'works') {
      btnWorks.classList.add('active');
      paneWorks.style.display = 'block';
    } else if (view === 'reviews') {
      btnReviews.classList.add('active');
      paneReviews.style.display = 'block';
    }
  }

  btnPrompts.addEventListener('click', () => switchExplorePane('prompts'));
  btnWorks.addEventListener('click', () => switchExplorePane('works'));
  btnReviews.addEventListener('click', () => switchExplorePane('reviews'));

  // 1. Live Creator Prompt Room Dialogue
  const promptStream = document.getElementById('prompt-chat-stream');
  const promptForm = document.getElementById('prompt-send-form');
  const promptInput = document.getElementById('prompt-input');

  const initialPrompts = [
    { author: "Vanguard Studio", handle: "@0xVanguard", avatar: "VG", color: "#a3e635", text: "Found an insane latent trick: putting (cinematic rim caustics:1.25) at the very front of the positive prompt forces the sampler to preserve edge specular highlights without burning skin tones.", tags: "#flux #lighting-tokens" },
    { author: "Luma Nexus", handle: "@lumanexus", avatar: "LN", color: "#f59e0b", text: "Agree! For glassmorphism, combining (dual-layered optical dispersion:1.15) with (ray-marched subsurface scattering:0.8) completely eliminates pixel jitter at 4K.", tags: "#glass #caustics" },
    { author: "Kore Autonomous", handle: "@kore_ai", avatar: "KA", color: "#f43f5e", text: "What negative token weights are you all using for video temporal stability? I've been running (temporal morphing, flicker, double exposure:1.4) on ComfyUI AnimateDiff.", tags: "#temporal #animatediff" }
  ];

  function renderPromptStream() {
    promptStream.innerHTML = '';
    initialPrompts.forEach(p => {
      const post = document.createElement('div');
      post.className = 'prompt-chat-post';
      post.innerHTML = `
        <div class="post-avatar glass-icon-box" style="background: ${p.color}22 !important; border-color: ${p.color} !important;">${p.avatar}</div>
        <div style="flex:1;">
          <div><span class="post-author">${p.author}</span><span class="post-handle">${p.handle}</span></div>
          <div class="post-text">${p.text}</div>
          <div class="post-tags">${p.tags}</div>
        </div>
      `;
      promptStream.appendChild(post);
    });
  }
  renderPromptStream();

  promptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = promptInput.value.trim();
    if (!val) return;

    initialPrompts.push({
      author: "Alex Vance (You)",
      handle: "@alex_vance",
      avatar: "CF",
      color: "#06b6d4",
      text: val,
      tags: "#custom-combo #community"
    });

    promptInput.value = '';
    renderPromptStream();
    promptStream.scrollTop = promptStream.scrollHeight;
    showToast("Shared prompt combo with community creators!");
  });

  // 2. Shared Works Feed (Favorite Posts + Lightbox Zoom + Send to Contact)
  renderSharedWorksFeed();

  // 3. Recruiter Studio Reviews
  const reviewsStream = document.getElementById('recruiter-reviews-stream');
  const recruiterReviews = [
    { creator: "Vanguard Studio (@0xVanguard)", studio: "Nexus Interactive (AAA Studio)", reviewer: "Marcus Thorne, Tech Art Director", rating: "5.0 ★", comment: "We enlisted Vanguard's team for 3 weeks on Project Chimera. Their LoRA turnaround time was under 4 hours per iteration with zero skin artifacting. Instant contract extension." },
    { creator: "Sonic Resonance (@sonic_res)", studio: "CyberSound Gaming", reviewer: "Elena Rostova, Audio Lead", rating: "4.9 ★", comment: "Their 96kHz zero-shot voice checkpoint saved our dialogue pipeline weeks of VO recording. Clear, zero robotic clipping, and handles emotional screams gracefully." },
    { creator: "Kore Autonomous (@kore_ai)", studio: "ViralScale Studios", reviewer: "Dave Chen, Head of Growth", rating: "4.8 ★", comment: "Enlisted Kore's agent swarm for YouTube Shorts creation. 40 autonomous videos produced in 48 hours. Phenomenal retention stats." }
  ];

  reviewsStream.innerHTML = '';
  recruiterReviews.forEach(r => {
    const rCard = document.createElement('div');
    rCard.className = 'review-thread-card';
    rCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="review-creator-tagged">${r.creator}</span>
        <span style="font-family:var(--font-mono); color:#10b981; font-weight:700;">${r.rating} Verified</span>
      </div>
      <div class="recruiter-comment">
        <div>
          <div><span class="rec-author">${r.studio}</span><span class="rec-meta">${r.reviewer}</span></div>
          <div class="rec-text">${r.comment}</div>
        </div>
      </div>
    `;
    reviewsStream.appendChild(rCard);
  });
}

function renderSharedWorksFeed() {
  const worksFeed = document.getElementById('shared-works-feed');
  if (!worksFeed) return;

  worksFeed.innerHTML = '';
  SHARED_WORKS.forEach(work => {
    const isLiked = savedFavoritePosts.has(work.id);
    const card = document.createElement('div');
    card.className = 'shared-work-card';
    card.innerHTML = `
      <img src="${work.img}" alt="${work.title}" class="shared-work-thumb" loading="lazy" style="cursor: pointer;" title="Click photo to zoom in bubble lightbox" />
      <div class="shared-work-body">
        <div class="shared-work-head">
          <h4 style="font-size: 1rem; font-weight:700;">${work.title}</h4>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #06b6d4;">${work.creator}</span>
        </div>
        <p style="font-size: 0.82rem; color: #94a3b8; line-height: 1.45;">${work.desc}</p>
        <div class="shared-work-actions">
          <button class="btn-fav-post ${isLiked ? 'liked' : ''}" data-id="${work.id}" title="${isLiked ? 'Remove from favorites' : 'Add to favorites'}">
            <i data-lucide="heart"></i>
          </button>
          <button class="btn-send-to-contact" data-id="${work.id}">
            <i data-lucide="share"></i> Send Post to Contact
          </button>
        </div>
      </div>
    `;

    // Click photo -> glowing bubble lightbox
    card.querySelector('.shared-work-thumb')?.addEventListener('click', () => {
      openPhotoLightbox(work.img, work.title, work.creator);
    });

    // Favorite heart button
    card.querySelector('.btn-fav-post')?.addEventListener('click', () => {
      togglePostFavorite(work);
    });

    // Send to contact button
    card.querySelector('.btn-send-to-contact')?.addEventListener('click', () => {
      openShareModal(work);
    });

    worksFeed.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

function togglePostFavorite(post) {
  if (savedFavoritePosts.has(post.id)) {
    savedFavoritePosts.delete(post.id);
    showToast(`Removed "${post.title}" from Favorited Posts.`);
  } else {
    savedFavoritePosts.add(post.id);
    showToast(`Added "${post.title}" to Favorited Posts!`);
  }
  renderSharedWorksFeed();
  updateFavoritesTab();
}

function applyExploreModeDefaults(mode) {
  const btnPrompts = document.getElementById('btn-exp-prompts');
  const btnReviews = document.getElementById('btn-exp-reviews');
  const btnWorks = document.getElementById('btn-exp-works');

  const panePrompts = document.getElementById('pane-prompts-room');
  const paneReviews = document.getElementById('pane-recruiter-reviews');
  const paneWorks = document.getElementById('pane-shared-works');

  const roleHint = document.getElementById('explore-role-hint');
  const roleSub = document.getElementById('explore-role-sub');

  if (!panePrompts || !paneReviews || !paneWorks) return;

  [btnPrompts, btnWorks, btnReviews].forEach(b => b?.classList.remove('active'));
  [panePrompts, paneWorks, paneReviews].forEach(p => { if (p) p.style.display = 'none'; });

  if (mode === 'recruiter') {
    // Recruiter persona sees Prompts Room by default
    btnPrompts?.classList.add('active');
    panePrompts.style.display = 'block';
    if (roleHint) roleHint.innerText = "RECRUITER VIEW • PROMPT ENGINEERING RADAR";
    if (roleSub) roleSub.innerText = "Recruiters inspect prompt channels and evaluate model token efficiencies before enlisting creators.";
  } else {
    // Creator / Explorer persona sees Reviews by default
    btnReviews?.classList.add('active');
    paneReviews.style.display = 'block';
    if (roleHint) roleHint.innerText = "CREATOR VIEW • VERIFIED STUDIO REVIEWS";
    if (roleSub) roleSub.innerText = "Creators inspect confidential enterprise studio reviews and peer intelligence to optimize rates and pipelines.";
  }
}

/* =========================================================
   GLOWING BUBBLE LIGHTBOX MODAL
   ========================================================= */
function initPhotoLightbox() {
  const modal = document.getElementById('photo-lightbox-modal');
  const closeBtn = document.getElementById('close-lightbox-btn');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closePhotoLightbox);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePhotoLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closePhotoLightbox();
    }
  });
}

function openPhotoLightbox(imgSrc, title, author) {
  const modal = document.getElementById('photo-lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const authorEl = document.getElementById('lightbox-author');
  if (!modal || !img) return;

  img.src = imgSrc;
  if (titleEl) titleEl.innerText = title || "Creator Asset";
  if (authorEl) authorEl.innerText = author || "@creator";

  modal.classList.add('open');
}

function closePhotoLightbox() {
  const modal = document.getElementById('photo-lightbox-modal');
  if (modal) modal.classList.remove('open');
}

// Share Modal Management
function openShareModal(work) {
  currentPostToShare = work;
  const modal = document.getElementById('share-modal');
  const title = document.getElementById('share-post-title');
  const list = document.getElementById('modal-contacts-list');

  title.innerText = `Sharing: "${work.title}"`;
  list.innerHTML = '';

  if (savedContacts.size === 0) {
    list.innerHTML = `
      <div style="padding: 1.5rem; text-align: center; color: #888899; font-size: 0.85rem;">
        No contacts added yet! Go to the Home tab and click "Add to Contacts" first.
      </div>
    `;
  } else {
    savedContacts.forEach(creator => {
      const row = document.createElement('div');
      row.className = 'modal-contact-row';
      row.innerHTML = `
        <div>
          <div style="font-weight:700; font-size: 0.9rem;">${creator.name}</div>
          <div style="font-family:var(--font-mono); font-size: 0.72rem; color: #06b6d4;">${creator.handle}</div>
        </div>
        <button class="action-glass-btn" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">Send Post</button>
      `;

      row.querySelector('button').addEventListener('click', () => {
        sendPostToContact(creator, work);
      });

      list.appendChild(row);
    });
  }

  modal.classList.add('open');
}

function sendPostToContact(creator, work) {
  // Push into creator's portfolio thumbnails and chat flow
  creator.portfolio.unshift(work.img);
  openChatWithCreator(creator.id);

  // Send an outgoing chat message
  const msgContainer = document.getElementById('chat-messages-container');
  if (msgContainer) {
    const postBubble = document.createElement('div');
    postBubble.className = 'message-bubble outgoing';
    postBubble.innerHTML = `[Shared Post: ${work.title}] Check out this shared work from the Explore Feed!`;
    msgContainer.appendChild(postBubble);
  }

  document.getElementById('share-modal').classList.remove('open');
  showToast(`Sent "${work.title}" to ${creator.name}! Opening chat...`);
  window.location.hash = '#contacts';
}

document.getElementById('close-share-modal')?.addEventListener('click', () => {
  document.getElementById('share-modal').classList.remove('open');
});

/* =========================================================
   9. CONTACTS & RECRUITER DEAL ACCEPTANCE
   ========================================================= */
function initContactsAndChat() {
  const form = document.getElementById('chat-send-form');
  const input = document.getElementById('chat-text-input');
  const messagesContainer = document.getElementById('chat-messages-container');
  const dealBtn = document.getElementById('btn-accept-deal');

  if (form && input && messagesContainer) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text || !activeChatCreatorId) return;

      const userMsg = document.createElement('div');
      userMsg.className = 'message-bubble outgoing';
      userMsg.innerText = text;
      messagesContainer.appendChild(userMsg);
      input.value = '';
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      setTimeout(() => {
        const creator = savedContacts.get(activeChatCreatorId);
        const replyMsg = document.createElement('div');
        replyMsg.className = 'message-bubble incoming';
        if (currentAppMode === 'recruiter') {
          replyMsg.innerText = `Awesome proposal! My pipeline rate is ${creator ? creator.rate : 'reasonable'}. If the terms work for your group workspace project, click 'Accept Deal' in the header to enlist me!`;
        } else {
          replyMsg.innerText = `Thanks for checking out my work! I'd love to share my latest checkpoints and LoRA weights with you.`;
        }
        messagesContainer.appendChild(replyMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 850);
    });
  }

  if (dealBtn) {
    dealBtn.addEventListener('click', () => {
      if (!activeChatCreatorId) return;
      const creator = savedContacts.get(activeChatCreatorId);
      if (!creator) return;

      if (acceptedDeals.has(creator.id)) {
        acceptedDeals.delete(creator.id);
        showToast(`Cancelled deal with ${creator.name}.`);
      } else {
        acceptedDeals.add(creator.id);
        showToast(`Deal finalized with ${creator.name}! Enlisted in Recruiter Group Workspace.`);
      }

      updateChatDealButton();
      renderContactsList();
      updateRecruiterWorkspace();
    });
  }
}

function updateChatDealButton() {
  const dealBtn = document.getElementById('btn-accept-deal');
  const dealLabel = document.getElementById('deal-btn-label');
  const dealBanner = document.getElementById('deal-enlisted-banner');
  if (!dealBtn || !dealLabel) return;

  if (currentAppMode !== 'recruiter') {
    dealBtn.style.display = 'none';
    if (dealBanner) dealBanner.style.display = 'none';
    return;
  }

  dealBtn.style.display = 'flex';

  if (activeChatCreatorId && acceptedDeals.has(activeChatCreatorId)) {
    dealBtn.classList.add('deal-accepted');
    dealLabel.innerText = "Deal Accepted (Enlisted)";
    if (dealBanner) dealBanner.style.display = 'flex';
  } else {
    dealBtn.classList.remove('deal-accepted');
    dealLabel.innerText = "Accept Deal & Enlist Agent";
    if (dealBanner) dealBanner.style.display = 'none';
  }
}

function renderContactsList() {
  const container = document.getElementById('contacts-list-container');
  const meta = document.getElementById('contacts-count-meta');
  const dealsMeta = document.getElementById('deals-accepted-count');
  if (!container) return;

  if (meta) meta.innerText = `${savedContacts.size} CONNECTED CREATORS`;
  if (dealsMeta) dealsMeta.innerText = `${acceptedDeals.size} Deals Accepted`;
  container.innerHTML = '';

  if (savedContacts.size === 0) {
    container.innerHTML = `
      <div style="padding: 2rem 1rem; text-align: center; color: #64748b; font-size: 0.8rem;">
        No contacts added yet.<br>Click "Add to Contacts" on any creator card on the Home page.
      </div>
    `;
    return;
  }

  savedContacts.forEach(creator => {
    const isEnlisted = acceptedDeals.has(creator.id);
    const item = document.createElement('div');
    item.className = `contact-item ${activeChatCreatorId === creator.id ? 'active' : ''}`;
    item.innerHTML = `
      <div class="contact-avatar-dot glass-icon-box" style="background: ${creator.color}22 !important; border-color: ${creator.color} !important;">${creator.avatar}</div>
      <div class="contact-item-info">
        <h5>${creator.name}</h5>
        <span>${creator.handle} &bull; ${creator.spec}</span>
      </div>
      ${isEnlisted ? '<span class="enlisted-badge">ENLISTED</span>' : ''}
    `;

    item.addEventListener('click', () => {
      openChatWithCreator(creator.id);
    });

    container.appendChild(item);
  });
}

function openChatWithCreator(id) {
  activeChatCreatorId = id;
  const creator = savedContacts.get(id);
  if (!creator) return;

  const placeholder = document.getElementById('chat-placeholder');
  const activeUI = document.getElementById('chat-active-ui');
  if (placeholder) placeholder.style.display = 'none';
  if (activeUI) activeUI.style.display = 'flex';

  const avatar = document.getElementById('active-chat-avatar');
  const name = document.getElementById('active-chat-name');
  const handle = document.getElementById('active-chat-handle');

  if (avatar) {
    avatar.innerText = creator.avatar;
    avatar.style.background = `${creator.color}22`;
    avatar.style.borderColor = creator.color;
  }
  if (name) name.innerText = creator.name;
  if (handle) handle.innerText = `${creator.handle} — ${creator.role} (${creator.rate})`;

  const thumbs = document.getElementById('portfolio-thumbnails');
  if (thumbs) {
    thumbs.innerHTML = '';
    creator.portfolio.forEach((imgUrl, idx) => {
      const thumb = document.createElement('div');
      thumb.className = 'thumb-card';
      thumb.style.cursor = 'pointer';
      thumb.title = 'Click photo to expand in glowing bubble lightbox';
      thumb.innerHTML = `
        <img src="${imgUrl}" alt="${creator.name} work" loading="lazy" />
        <span class="thumb-tag">Asset #${idx + 1}</span>
      `;
      thumb.addEventListener('click', () => {
        openPhotoLightbox(imgUrl, `${creator.name} — Asset #${idx + 1}`, creator.handle);
      });
      thumbs.appendChild(thumb);
    });
  }

  const msgContainer = document.getElementById('chat-messages-container');
  if (msgContainer) {
    msgContainer.innerHTML = `
      <div class="message-bubble incoming">
        Hello! You are connected with <strong>${creator.name}</strong> (${creator.role}). Rate: <em>${creator.rate}</em>. ${currentAppMode === 'recruiter' ? 'Discuss project scopes below and click Accept Deal to enlist me into your Workspace group!' : 'Feel free to chat and explore my neural assets.'}
      </div>
    `;
  }

  updateChatDealButton();
  renderContactsList();
}

/* =========================================================
   10. WORKSPACE & PROFILE PUBLISHED ASSETS MANAGER
   ========================================================= */
function initWorkspaceAndPublishing() {
  const pubForm = document.getElementById('creator-publish-form');
  const btnLaunch = document.getElementById('btn-launch-collab');
  const terminal = document.getElementById('group-terminal-body');

  if (pubForm) {
    pubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('pub-title').value.trim();
      const cat = document.getElementById('pub-cat').value;
      const price = document.getElementById('pub-price').value.trim() || 'Ξ 0.50';
      const desc = document.getElementById('pub-desc').value.trim();

      const newWork = {
        id: `pw-${Date.now()}`,
        title,
        cat,
        price,
        desc
      };

      publishedWorks.push(newWork);
      renderPublishedWorks();
      pubForm.reset();
      showToast(`Published "${title}" to Creator Forge marketplace!`);
      window.location.hash = '#profile';
    });
  }

  if (btnLaunch && terminal) {
    btnLaunch.addEventListener('click', () => {
      if (acceptedDeals.size === 0) {
        showToast("No accepted agents in group yet! Accept deals in Contacts first.");
        return;
      }
      terminal.innerHTML += `<p class="term-line">> [RUN] Synchronizing ${acceptedDeals.size} agents for joint pipeline...</p>`;
      terminal.innerHTML += `<p class="term-line" style="color: #34d399;">> Agents active. Synthesizing multimodal artifacts for Project Chimera-X...</p>`;
      showToast("Group Agent Inference Launched successfully!");
    });
  }

  updateRecruiterWorkspace();
  renderPublishedWorks();
}

function updateRecruiterWorkspace() {
  const grid = document.getElementById('enlisted-agents-grid');
  const terminal = document.getElementById('group-terminal-body');
  if (!grid) return;

  grid.innerHTML = '';

  if (acceptedDeals.size === 0) {
    grid.innerHTML = `
      <div style="padding: 1rem; color: #888899; font-size: 0.8rem; border: 1px dashed rgba(255,255,255,0.15); border-radius: 6px;">
        No agents enlisted yet. In Recruiter Mode, chat with creators in Contacts and click "Accept Deal" to add them to this group workspace.
      </div>
    `;
    return;
  }

  acceptedDeals.forEach(id => {
    const creator = CREATORS_DATA.find(c => c.id === id);
    if (!creator) return;

    const pill = document.createElement('div');
    pill.className = 'enlisted-agent-pill';
    pill.innerHTML = `
      <div>
        <div class="agent-name">${creator.name}</div>
        <div class="agent-role">${creator.role}</div>
      </div>
      <button class="pill-btn-sm" style="color: #ef4444; border-color: #ef4444;" data-remove="${creator.id}">Remove</button>
    `;

    pill.querySelector('button').addEventListener('click', () => {
      acceptedDeals.delete(creator.id);
      updateRecruiterWorkspace();
      updateChatDealButton();
      renderContactsList();
      showToast(`Removed ${creator.name} from Group Workspace.`);
    });

    grid.appendChild(pill);
  });

  if (terminal) {
    terminal.innerHTML += `<p class="term-line">> Enlisted Agents Count: ${acceptedDeals.size}</p>`;
  }
}

function renderPublishedWorks() {
  const list = document.getElementById('published-items-list');
  const countPill = document.getElementById('published-count-pill');
  if (!list) return;

  if (countPill) countPill.innerText = `${publishedWorks.length} Published`;
  list.innerHTML = '';

  publishedWorks.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'published-item-row';
    row.innerHTML = `
      <div class="pub-item-left">
        <h5>${item.title}</h5>
        <span>${item.cat.toUpperCase()} &bull; ${item.price}</span>
      </div>
      <div class="pub-item-actions">
        <button class="btn-pub-edit" data-idx="${index}">Edit</button>
        <button class="btn-pub-del" data-idx="${index}">Delete</button>
      </div>
    `;

    row.querySelector('.btn-pub-edit').addEventListener('click', () => {
      const newTitle = prompt("Edit item title:", item.title);
      if (newTitle) {
        item.title = newTitle;
        renderPublishedWorks();
        showToast("Published item updated!");
      }
    });

    row.querySelector('.btn-pub-del').addEventListener('click', () => {
      publishedWorks.splice(index, 1);
      renderPublishedWorks();
      showToast("Item removed from published list.");
    });

    list.appendChild(row);
  });
}

function initProfileEditor() {
  const form = document.getElementById('profile-edit-form');
  const inputName = document.getElementById('input-display-name');
  const inputHandle = document.getElementById('input-handle');
  const inputBio = document.getElementById('input-bio');
  const inputAvatar = document.getElementById('input-avatar-letters');
  const colorDots = document.querySelectorAll('.color-dot');

  const displayName = document.getElementById('profile-name-display');
  const displayHandle = document.getElementById('profile-handle-display');
  const displayBio = document.getElementById('profile-bio-display');
  const displayAvatar = document.getElementById('profile-avatar-display');

  let selectedAura = '#f97316';

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      selectedAura = dot.dataset.color;
      if (displayAvatar) {
        displayAvatar.style.background = selectedAura;
        displayAvatar.style.boxShadow = `0 0 25px ${selectedAura}99`;
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (displayName && inputName) displayName.innerText = inputName.value;
      if (displayHandle && inputHandle) displayHandle.innerText = `@${inputHandle.value.replace('@','')}`;
      if (displayBio && inputBio) displayBio.innerText = inputBio.value;
      if (displayAvatar && inputAvatar) {
        displayAvatar.innerText = inputAvatar.value.toUpperCase();
        displayAvatar.style.background = selectedAura;
      }
      showToast("Profile credentials updated successfully!");
    });
  }
}
