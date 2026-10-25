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
  initRippleGatewayTitle();
  initModeSwitcher();
  initSelfBuildingCrystal();
  initCircularMeniscusWithMouseFacingCurve();
  initCreatorsDirectory();
  initContactsAndChat();
  initWorkspaceAndPublishing();
  initExploreSections();
  initProfileEditor();
  initPhotoLightbox();
  initGatewayMatrix();
  initAnchorRouting();
  initAetherBotAssistant();

  // Hub back-to-gateway button
  const hubBackBtn = document.getElementById('btn-hub-back-to-gateway');
  if (hubBackBtn) {
    hubBackBtn.addEventListener('click', () => {
      window.location.hash = '#gateway';
    });
  }
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
let currentPageId = 'gateway'; // Default start page is now the All Professions Gateway!
let activeProfessionId = 'plumber';
const savedFavorites = new Set();
const savedFavoritePosts = new Set();
const savedContacts = new Map();
const acceptedDeals = new Set();
let activeChatCreatorId = null;
let currentPostToShare = null;

/* =========================================================
   UNIVERSAL PROFESSIONS CATALOGUE (ALL PROFESSIONS MATRIX)
   ========================================================= */
const PROFESSIONS_DATA = [
  {
    id: 'plumber',
    name: 'Plumbers & Fluid Techs',
    category: 'trades',
    tag: 'Licensed Trades',
    icon: 'wrench',
    color: '#06b6d4',
    shortDesc: 'Certified hydro-jetting, smart copper pipe routing, thermal leak detection & emergency repiping.',
    features: [
      'Acoustic Ultrasonic Leak Locator',
      'High-Pressure Hydrojet Scrubbing (4000 PSI)',
      'Trenchless Pipe Relining & Epoxy Seal',
      'Emergency 24/7 Smart Valve Dispatch'
    ],
    crystalColors: { top: 0x06b6d4, bottom: 0x0284c7 },
    sampleWorkers: [
      { id: 'p1', name: 'AquaPulse Solutions', handle: '@aquapulse', spec: 'leak', role: 'Master Emergency Plumber', avatar: 'AP', color: '#06b6d4', desc: 'Commercial & residential high-precision thermal acoustic leak tracing and zero-dig trenchless pipe liner installation.', rating: '4.9★', worksCount: 142, rate: '$85/hr', template: { name: 'Thermal Pipeline Acoustic Map v2', features: ['Ultrasonic Wave Trace', 'Epoxy Hydro-Seal', 'Pressure Drop Telemetry'] }, portfolio: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&auto=format&fit=crop'] },
      { id: 'p2', name: 'Vortex Drain & Hydro', handle: '@vortex_plumb', spec: 'drain', role: 'Hydrojet Pipeline Specialist', avatar: 'VD', color: '#0ea5e9', desc: 'Root intrusion clearance and 4K optical sewer camera inspections with digital warranty logs.', rating: '5.0★', worksCount: 98, rate: '$95/hr', template: { name: 'Optical Sewer Log Pipeline', features: ['4K Borescope Video Audit', 'High-Torque Cutterhead Guide', 'Bio-Enzymatic Coat'] }, portfolio: ['https://images.unsplash.com/photo-1542013936693-884638332954?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&auto=format&fit=crop'] },
      { id: 'p3', name: 'Precision Copper & Valve', handle: '@precision_valve', spec: 'install', role: 'Bespoke Architectural Plumber', avatar: 'PV', color: '#38bdf8', desc: 'Luxury concealed shower manifold fixtures, manifold water heating networks, and water softening matrices.', rating: '4.8★', worksCount: 67, rate: '$110/hr', template: { name: 'Smart Manifold Hydro-Balance', features: ['Balanced Return Loop', 'Anti-Scald Sensor Calibrate', 'Zero-Hammer Arrestor'] }, portfolio: ['https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&auto=format&fit=crop'] },
      { id: 'p4', name: 'Titan Trenchless Relining', handle: '@titan_pipes', spec: 'trenchless', role: 'CIPP Structural Epoxy Liner', avatar: 'TP', color: '#06b6d4', desc: 'Zero-excavation cured-in-place pipe (CIPP) lining for municipal and residential sewer laterals.', rating: '4.9★', worksCount: 119, rate: '$115/hr', template: { name: 'Perma-Liner UV Cured Matrix', features: ['Pull-in-Place Steam Cure', 'Lateral Connection Reinstatement', '50-Year Structural Hydro-Warranty'] }, portfolio: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&auto=format&fit=crop'] },
      { id: 'p5', name: 'SubSurface Geo-Acoustic', handle: '@subsurface_geo', spec: 'leak', role: 'Ultrasonic Geo-Hydro Locator', avatar: 'SA', color: '#0891b2', desc: 'Pinpoint non-destructive slab leak tracing under concrete foundations using nitrogen pressure & acoustic sensors.', rating: '5.0★', worksCount: 88, rate: '$130/hr', template: { name: 'Sub-Slab Acoustic Trace Blueprint', features: ['Helium Tracer Gas Injection', 'Soil Resonance Acoustic Map', 'Zero Concrete Destruction'] }, portfolio: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop'] },
      { id: 'p6', name: 'Hydronic Thermal Heating', handle: '@hydronic_pro', spec: 'install', role: 'Boiler & Radiant Heat Engineer', avatar: 'HT', color: '#22d3ee', desc: 'High-efficiency condensing boiler installations, closed-loop hydronic manifold zoning, and underfloor radiant loops.', rating: '4.8★', worksCount: 76, rate: '$105/hr', template: { name: 'Multi-Zone Radiant Hydro-Loop', features: ['Modulating-Condensing Loop', 'Oxygen-Barrier PEX Manifold', 'Smart Weather Compensation'] }, portfolio: ['https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1542013936693-884638332954?w=400&auto=format&fit=crop'] }
    ]
  },
  {
    id: 'animator',
    name: '3D Animators & Riggers',
    category: 'creative',
    tag: 'Motion Arts',
    icon: 'film',
    color: '#8b5cf6',
    shortDesc: 'Bespoke character rigging, kinetic physics simulations, Unreal Engine 5 cinematics & Blender nodes.',
    features: [
      'Dual-Quaternion Muscle Rigging',
      'Optical Motion Capture Retargeting',
      'Niagara Volumetric Particle Dynamics',
      '60 FPS Stylized Kinetic Keyframing'
    ],
    crystalColors: { top: 0x8b5cf6, bottom: 0x6d28d9 },
    sampleWorkers: [
      { id: 'a1', name: 'Kinetics Studio', handle: '@kinetics_3d', spec: 'rig', role: 'Lead Character Rigger & Sim', avatar: 'KS', color: '#8b5cf6', desc: 'AAA gaming character skeletons, facial blendshape FACS systems, and dynamic cloth tearing simulations.', rating: '5.0★', worksCount: 54, rate: '$120/hr', template: { name: 'FACS Facial Rig v4', features: ['52 Blendshape Calibration', 'Jaw Corrective Morphs', 'Realtime Metahuman Link'] }, portfolio: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&auto=format&fit=crop'] },
      { id: 'a2', name: 'Vertex Motion Lab', handle: '@vertexmotion', spec: 'vfx', role: 'Niagara VFX & 3D Animator', avatar: 'VM', color: '#a78bfa', desc: 'Unreal Engine 5 cinematic camera flythroughs, spell animations, and volumetric fluid simulation.', rating: '4.9★', worksCount: 81, rate: '$105/hr', template: { name: 'Niagara Spells Kinetic Engine', features: ['Subsurface Particle Burn', 'Dynamic Lighting Attach', 'GPU Splatting'] }, portfolio: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop'] },
      { id: 'a3', name: 'Chronos Rigging Labs', handle: '@chronos_rig', spec: 'rig', role: 'Quadruped & Creature Anatomist', avatar: 'CR', color: '#8b5cf6', desc: 'Biomechanically accurate creature skeletons, dynamic muscle bulge lattices, and procedural tail/wing physics.', rating: '5.0★', worksCount: 72, rate: '$125/hr', template: { name: 'Dynamic Musculoskeletal Creature Rig', features: ['Volume Preserving Dual-Quat', 'Procedural IK/FK Seamless Switch', 'Apex Wing Aerodynamic Flex'] }, portfolio: ['https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop'] },
      { id: 'a4', name: 'VoxelCraft Cinematics', handle: '@voxelcraft', spec: 'anim', role: 'Stylized Character & Anime Animator', avatar: 'VC', color: '#a78bfa', desc: 'Stepped keyframe stylized motion, smear frames, snappy anime fight choreography, and custom grease pencil pipelines.', rating: '4.9★', worksCount: 94, rate: '$95/hr', template: { name: 'Stylized Impact Frame Pipeline', features: ['Smear Mesh Interpolation', 'Variable Frame Rate Stepper', '2.5D Cel Shader Integration'] }, portfolio: ['https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&auto=format&fit=crop'] },
      { id: 'a5', name: 'MoCap Velocity Studio', handle: '@mocap_velocity', spec: 'mocap', role: 'Optical Mocap Clean & Retargeter', avatar: 'MV', color: '#c084fc', desc: 'Vicon/OptiTrack optical capture data cleanup, foot-slide elimination, and retargeting to custom stylized character skeletons.', rating: '4.8★', worksCount: 63, rate: '$110/hr', template: { name: 'Zero-Slide Optical Retarget Suite', features: ['Inverse Kinematics Foot Lock', 'Spine Curvature Damping', 'Metahuman Live Link Bridge'] }, portfolio: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop'] },
      { id: 'a6', name: 'Houdini Cloth & Groom', handle: '@cloth_sim_pro', spec: 'vfx', role: 'Vellum Cloth & Hair Simulation', avatar: 'HC', color: '#7c3aed', desc: 'High-fidelity Houdini Vellum multi-layered garment simulations, dynamic tearing, wind aerodynamics, and guide groom styling.', rating: '5.0★', worksCount: 47, rate: '$140/hr', template: { name: 'Vellum Multi-Layer Aerodynamic Sim', features: ['Self-Collision Resolution', 'Anisotropic Fabric Strain', 'Real-Time Cache Compression'] }, portfolio: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&auto=format&fit=crop'] }
    ]
  },
  {
    id: 'electrician',
    name: 'Electricians & Smart Grid',
    category: 'trades',
    tag: 'Licensed Trades',
    icon: 'zap',
    color: '#f59e0b',
    shortDesc: 'High-voltage panel upgrades, industrial 3-phase balancing, solar microinverter arrays & EV charging.',
    features: [
      '200A/400A Breaker Panel Overhaul',
      'Infrared Thermal Circuit Audit',
      'Tesla & Universal Level-2 EV Station',
      'Smart Home Zigbee Automation Grid'
    ],
    crystalColors: { top: 0xf59e0b, bottom: 0xd97706 },
    sampleWorkers: [
      { id: 'e1', name: 'VoltMaster Electrical', handle: '@voltmaster', spec: 'grid', role: 'Licensed Master Electrician', avatar: 'VM', color: '#f59e0b', desc: 'Sub-panel distribution, whole-home surge suppression, and smart energy monitoring modules.', rating: '5.0★', worksCount: 160, rate: '$90/hr', template: { name: 'Thermal Load Circuit Blueprint', features: ['FLIR Thermal Scan', 'Balanced Phase Load', 'Arc-Fault Breaker Map'] }, portfolio: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop'] },
      { id: 'e2', name: 'TeslaGrid & EV Installers', handle: '@teslagrid_ev', spec: 'ev', role: 'Certified Level-2 & DC Fast Charge Tech', avatar: 'TG', color: '#f59e0b', desc: 'Residential Tesla Wall Connector installations, bidirectional V2H power switches, and EV load management panels.', rating: '4.9★', worksCount: 144, rate: '$100/hr', template: { name: 'Bi-Directional EV Home Microgrid', features: ['60A Dedicated Conduit Run', 'Dynamic Load Shedding Unit', 'Whole-Home Backup Gateway'] }, portfolio: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop'] },
      { id: 'e3', name: 'Solaria Microinverter Power', handle: '@solaria_power', spec: 'solar', role: 'Solar PV & Enphase Battery Specialist', avatar: 'SP', color: '#d97706', desc: 'Rooftop solar string and microinverter installation, Enphase IQ battery backup integration, and utility grid interconnection.', rating: '5.0★', worksCount: 92, rate: '$115/hr', template: { name: 'Solar Microinverter Grid Array', features: ['Rapid Shutdown Compliance', 'Time-of-Use Battery Shifting', 'Real-Time Net Metering Monitor'] }, portfolio: ['https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop'] },
      { id: 'e4', name: 'Industrial 3-Phase Dynamics', handle: '@triphase_ind', spec: 'industrial', role: 'Heavy Industrial Electrical Engineer', avatar: 'IP', color: '#b45309', desc: '480V 3-phase switchgear commissioning, power factor correction capacitors, motor VFD drives, and arc flash safety audits.', rating: '4.8★', worksCount: 83, rate: '$130/hr', template: { name: 'Industrial Switchgear Harmonic Balance', features: ['480V Phase Delta Audit', 'VFD Harmonic Filter Tuning', 'Arc Flash NFPA 70E Protocol'] }, portfolio: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop'] },
      { id: 'e5', name: 'SmartHabitat Automation', handle: '@smarthabitat', spec: 'automation', role: 'Lutron & KNX Smart Home Integrator', avatar: 'SH', color: '#fbbf24', desc: 'Architectural Lutron HomeWorks QSX lighting control, centralized low-voltage dimming panels, and automated circadian lighting.', rating: '4.9★', worksCount: 67, rate: '$110/hr', template: { name: 'Lutron QSX Circadian Architecture', features: ['Zero-Cross Low Voltage Dimmers', 'Solar Clock Sun-Tracking', 'DALI-2 Broadcast Network'] }, portfolio: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop'] },
      { id: 'e6', name: 'SafeShield Emergency Wire', handle: '@safeshield_elec', spec: 'safety', role: 'Residential Arc-Fault & Grounding Tech', avatar: 'SS', color: '#f59e0b', desc: 'Complete whole-home knob-and-tube rewiring, copper grounding rod matrix upgrades, and AFCI/GFCI circuit protection.', rating: '4.7★', worksCount: 128, rate: '$85/hr', template: { name: 'Full Home Grounding & AFCI Overhaul', features: ['Dual Copper Ground Rod Matrix', 'Arc-Fault Interrupter Retrofit', 'Thermal Breaker Load Balancing'] }, portfolio: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop'] }
    ]
  },
  {
    id: 'ai-creator',
    name: 'AI Creators & Latent Artists',
    category: 'creative',
    tag: 'Generative Tech',
    icon: 'sparkles',
    color: '#a3e635',
    shortDesc: 'Custom SDXL/Flux LoRAs, ComfyUI nodal architectures, AnimateDiff video pipelines & voice clones.',
    features: [
      'Photoreal Skin Latent Micro-Texture',
      'Temporal Motion Flow Stabilization',
      '96kHz Zero-Shot Speech Synthesis',
      'Multi-Agent Autonomous Workflows'
    ],
    crystalColors: { top: 0xa3e635, bottom: 0x65a30d },
    sampleWorkers: [
      { id: 'ai1', name: 'Vanguard Neural Studio', handle: '@0xVanguard', spec: 'diffusion', role: 'SDXL & Flux Lead Architect', avatar: 'VG', color: "#a3e635", desc: "Crafting hyper-detailed cinematic LoRAs with zero plastic skin artifacts.", rating: "4.9★", worksCount: 42, rate: "$95/hr", template: { name: "Cinematic Lighting Pipeline v4", features: ["16-Step HDR Guide", "Contrast Latent Node", "Photoreal Skin LoRA"] }, portfolio: ["https://picsum.photos/seed/vanguard1/400/300", "https://picsum.photos/seed/vanguard2/400/300"] },
      { id: 'ai2', name: 'Kore Autonomous Swarms', handle: '@kore_ai', spec: 'agents', role: 'Multi-Agent Pipeline Engineer', avatar: 'KA', color: '#a3e635', desc: 'LangGraph and AutoGen agentic swarms automating multi-stage content synthesis, self-correction, and media dispatch.', rating: '5.0★', worksCount: 88, rate: '$120/hr', template: { name: 'LangGraph Swarm Content Engine', features: ['Self-Reflective Loop Node', 'Parallel Vector Retrieval', 'Automated Validation Gate'] }, portfolio: ['https://picsum.photos/seed/kore1/400/300', 'https://picsum.photos/seed/kore2/400/300'] },
      { id: 'ai3', name: 'Sonic Neural Vocals', handle: '@sonic_neural', spec: 'audio', role: '96kHz Zero-Shot Voice Architect', avatar: 'SN', color: '#84cc16', desc: 'Ultra-clean neural voice clones, multi-lingual accent preservation, and studio grade emotional inflection modeling.', rating: '4.9★', worksCount: 65, rate: '$90/hr', template: { name: 'Zero-Shot Voice Cloner Studio', features: ['Pitch Accent Dynamic Slider', 'Whisper-to-Shout Continuum', 'Sub-100ms Streaming Synthesizer'] }, portfolio: ['https://picsum.photos/seed/sonic1/400/300', 'https://picsum.photos/seed/sonic2/400/300'] },
      { id: 'ai4', name: 'Temporal AnimateDiff Lab', handle: '@temporallab', spec: 'video', role: 'Generative Video Motion Stabilizer', avatar: 'TL', color: '#bef264', desc: 'Optical flow latent anchoring eliminating temporal flicker in SDXL and Wan2.1 generative cinematic video pipelines.', rating: '4.8★', worksCount: 52, rate: '$105/hr', template: { name: 'Temporal Consistency Anchor Node', features: ['Cross-Frame Attention Lock', 'Latent Warp Velocity Field', 'Grain Texture Matcher'] }, portfolio: ['https://picsum.photos/seed/motion1/400/300', 'https://picsum.photos/seed/motion2/400/300'] },
      { id: 'ai5', name: 'ComfyUI Master Craftsman', handle: '@nodal_forge', spec: 'comfyui', role: 'Complex Nodal Graph Architect', avatar: 'NF', color: '#65a30d', desc: 'Enterprise ComfyUI custom node pipelines, ControlNet tile upscalers, and automated API serverless endpoints.', rating: '5.0★', worksCount: 78, rate: '$110/hr', template: { name: 'Modular ComfyUI 8K Upscaler Pack', features: ['ControlNet Tile Detail Infusion', 'FreeU Frequency Separator', 'Automatic VRAM Garbage Collect'] }, portfolio: ['https://picsum.photos/seed/glitch1/400/300', 'https://picsum.photos/seed/glitch2/400/300'] },
      { id: 'ai6', name: 'Latent Brand Identity', handle: '@latentbrand', spec: 'branding', role: 'Custom Enterprise LoRA Trainer', avatar: 'LB', color: '#a3e635', desc: 'Training bespoke corporate visual identity LoRAs with exact product geometry, color fidelity, and packaging preservation.', rating: '4.9★', worksCount: 41, rate: '$130/hr', template: { name: 'Product Geometry Retention LoRA', features: ['Captioned Multi-Aspect Ratio Dataset', 'Prior Preservation Loss Tuning', 'Synthetic Lighting Stress Test'] }, portfolio: ['https://picsum.photos/seed/vanguard3/400/300', 'https://picsum.photos/seed/vanguard1/400/300'] }
    ]
  },
  {
    id: 'developer',
    name: 'Full-Stack & Systems Devs',
    category: 'tech',
    tag: 'Engineering',
    icon: 'code-2',
    color: '#10b981',
    shortDesc: 'High-throughput Node/Rust architectures, React/Next.js frontends, WebSockets & cloud microservices.',
    features: [
      'Sub-50ms Global Edge Deployments',
      'PostgreSQL & Redis Cache Clustering',
      'Zero-Downtime Docker Container Pods',
      'Cryptographic Auth & Web3 Contracts'
    ],
    crystalColors: { top: 0x10b981, bottom: 0x047857 },
    sampleWorkers: [
      { id: 'd1', name: 'Apex Software Matrix', handle: '@apex_dev', spec: 'systems', role: 'Senior Systems Architect', avatar: 'AS', color: '#10b981', desc: 'Specialized in ultra-low latency real-time WebSocket pipelines, distributed messaging, and high-concurrency microservices.', rating: '5.0★', worksCount: 73, rate: '$135/hr', template: { name: 'Distributed Stream Orchestrator', features: ['Kafka Event Broker', 'Rust FFI Acceleration', 'Docker Swarm Config'] }, portfolio: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop'] },
      { id: 'd2', name: 'RustCore Low Latency', handle: '@rustcore', spec: 'rust', role: 'Rust Systems & High-Perf Engineer', avatar: 'RC', color: '#10b981', desc: 'Zero-allocation memory models, SIMD vectorization, WebSocket multiplexers, and sub-millisecond trading algorithms.', rating: '5.0★', worksCount: 89, rate: '$150/hr', template: { name: 'Tokio Async Engine Blueprint', features: ['Zero-Copy Buffer Pool', 'Lock-Free Ring Buffer', 'SIMD Byte-Stream Decoder'] }, portfolio: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop'] },
      { id: 'd3', name: 'NextGen React Architects', handle: '@nextgen_stack', spec: 'frontend', role: 'Principal Next.js & React 19 Lead', avatar: 'NG', color: '#34d399', desc: 'Server components, streaming SSR, fluid 120 FPS Framer Motion micro-interactions, and design systems.', rating: '4.9★', worksCount: 114, rate: '$120/hr', template: { name: 'Enterprise Next.js 15 Monorepo', features: ['Turbopack Incremental Cache', 'Optimistic UI Mutations', 'Zero-CLS Dynamic Font Shaper'] }, portfolio: ['https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop'] },
      { id: 'd4', name: 'CloudKube DevOps Pod', handle: '@cloudkube', spec: 'devops', role: 'Kubernetes & Terraform Platform Lead', avatar: 'CK', color: '#059669', desc: 'Multi-region Kubernetes clusters, GitOps automated CI/CD pipelines, Prometheus observability, and zero-downtime blue/green deploys.', rating: '4.8★', worksCount: 96, rate: '$130/hr', template: { name: 'Terraform AWS Multi-Region EKS', features: ['ArgoCD GitOps Synchronizer', 'Istio Service Mesh Security', 'Prometheus/Grafana Alert Rules'] }, portfolio: ['https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop'] },
      { id: 'd5', name: 'SecureByte Cyber Sec', handle: '@securebyte', spec: 'security', role: 'Smart Contract & Pentest Specialist', avatar: 'SB', color: '#6ee7b7', desc: 'Formal verification of EVM smart contracts, Web application penetration testing, OAuth2/OIDC zero-trust architectures.', rating: '5.0★', worksCount: 57, rate: '$160/hr', template: { name: 'Zero-Trust Auth & Audit Protocol', features: ['Slither & Mythril Static Scan', 'Fuzz Testing Invariant Inserter', 'Hardware Security Module (HSM)'] }, portfolio: ['https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop'] },
      { id: 'd6', name: 'DataFlow Vector Pipeline', handle: '@dataflow_ai', spec: 'data', role: 'PostgreSQL & pgvector AI Database Architect', avatar: 'DF', color: '#10b981', desc: 'High-concurrency vector similarity search, ClickHouse analytical aggregation pipelines, and distributed Redis cluster caching.', rating: '4.9★', worksCount: 68, rate: '$125/hr', template: { name: 'PgVector HNSW Partition Matrix', features: ['Sub-10ms Approximate KNN', 'Continuous Materialized Views', 'Distributed Raft Consensus Cache'] }, portfolio: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop'] }
    ]
  },
  {
    id: 'mechanic',
    name: 'Automotive & EV Mechanics',
    category: 'trades',
    tag: 'Licensed Trades',
    icon: 'car',
    color: '#f97316',
    shortDesc: 'OBD-II CAN bus diagnostics, high-voltage battery cell analysis, transmission rebuilds & dyno tuning.',
    features: [
      'CAN Bus Oscilloscope Waveform Check',
      'Hybrid Battery Cell Voltage Balance',
      'Precision Dual-Clutch Transmission Rebuild',
      'Track Suspension Camber Geometry'
    ],
    crystalColors: { top: 0xf97316, bottom: 0xc2410c },
    sampleWorkers: [
      { id: 'm1', name: 'HyperDrive Precision Auto', handle: '@hyperdrive_auto', spec: 'ev', role: 'Master ASE & EV Specialist', avatar: 'HD', color: '#f97316', desc: 'Precision diagnostics on internal combustion and high-voltage electric vehicle powertrains.', rating: '4.9★', worksCount: 112, rate: '$95/hr', template: { name: 'CAN Bus Diagnostics Array', features: ['Oscilloscope Telemetry', 'Thermal Pack Sensor Map', 'Torque Curve Dyno Log'] }, portfolio: ['https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&auto=format&fit=crop'] },
      { id: 'm2', name: 'VoltBattery Cell Dynamics', handle: '@voltbattery', spec: 'battery', role: 'High-Voltage EV Battery Pack Engineer', avatar: 'VB', color: '#f97316', desc: 'Lithium-ion module teardown, pouch cell degradation analysis, thermal runaway mitigation, and cell balancing for Tesla/Porsche EVs.', rating: '5.0★', worksCount: 78, rate: '$130/hr', template: { name: 'HV Battery Pack Telemetry Matrix', features: ['Individual Cell Internal Resistance Scan', 'Thermistor Array Calibration', 'Active Equalization Balancing'] }, portfolio: ['https://images.unsplash.com/photo-1558441719-aa34bef57312?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop'] },
      { id: 'm3', name: 'Apex Turbo & Dyno Works', handle: '@apexturbo', spec: 'tuning', role: 'Performance Engine & ECU Dyno Tuner', avatar: 'AT', color: '#ea580c', desc: 'Custom ECU fuel/ignition mapping on AWD Mustang dyno, twin-scroll turbo sizing, and forged internal balancing.', rating: '4.9★', worksCount: 135, rate: '$110/hr', template: { name: 'AWD Dyno Custom Map Protocol', features: ['Wideband Lambda Air-Fuel Tracing', 'Knock Threshold Audio Telemetry', 'Boost Controller Wastegate Mapping'] }, portfolio: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop'] },
      { id: 'm4', name: 'Precision Gearbox & Dual-Clutch', handle: '@precision_gear', spec: 'transmission', role: 'DCT & Sequential Gearbox Rebuilder', avatar: 'PG', color: '#c2410c', desc: 'Porsche PDK and BMW DCT mechatronic valve body overhaul, clutch pack shimming, and paddle shift calibrations.', rating: '4.8★', worksCount: 64, rate: '$120/hr', template: { name: 'Dual-Clutch Mechatronic Calibration', features: ['Hydraulic Valve Spool Inspection', 'Micron Pre-Load Clearance Gauge', 'Adaptation Reset & Drive Cycle'] }, portfolio: ['https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&auto=format&fit=crop'] },
      { id: 'm5', name: 'TrackGeometry Suspension', handle: '@trackgeometry', spec: 'suspension', role: 'Motorsport Alignment & Corner Balancer', avatar: 'TG', color: '#fb923c', desc: 'Corner-weight scaling, caster/camber bump-steer geometry optimization, and multi-way damper dyno tuning for track cars.', rating: '5.0★', worksCount: 91, rate: '$105/hr', template: { name: 'Corner Weight & Bump-Steer Setup', features: ['4-Pad Electronic Scale Balance', 'Laser Hub Alignment Verification', 'High/Low Speed Damper Clicks'] }, portfolio: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop'] },
      { id: 'm6', name: 'Diagnostics CAN-Lab', handle: '@canlab_diag', spec: 'electronics', role: 'Automotive Oscilloscope Diagnostic Tech', avatar: 'CL', color: '#f97316', desc: 'PicoScope 8-channel waveform diagnostics, parasitic battery drain tracing, sensor jitter diagnosis, and flexray network repair.', rating: '4.9★', worksCount: 104, rate: '$95/hr', template: { name: 'PicoScope Waveform Deep Analysis', features: ['CAN-H / CAN-L Differential Capture', 'Current Clamp Inrush Logging', 'Hall Effect Cam/Crank Sync'] }, portfolio: ['https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558441719-aa34bef57312?w=400&auto=format&fit=crop'] }
    ]
  },
  {
    id: 'lawyer',
    name: 'Legal Counsel & Tech IP',
    category: 'services',
    tag: 'Professional',
    icon: 'scale',
    color: '#f43f5e',
    shortDesc: 'AI licensing frameworks, SaaS enterprise contracts, patent protections & cross-border compliance.',
    features: [
      'Model Weight Commercial Licensing',
      'GDPR & AI Act Risk Assessment',
      'Series A Venture Term Sheet Drafting',
      'Trademark & Patent Portfolio Moat'
    ],
    crystalColors: { top: 0xf43f5e, bottom: 0xbe123c },
    sampleWorkers: [
      { id: 'l1', name: 'Veritas Tech Law Group', handle: '@veritas_law', spec: 'ip', role: 'Managing IP & Corporate Partner', avatar: 'VL', color: '#f43f5e', desc: 'Advising deep-tech startups and creative studios on artificial intelligence intellectual property and licensing buyouts.', rating: '5.0★', worksCount: 88, rate: '$250/hr', template: { name: 'Synthetic Media Commercial Buyout v2', features: ['Perpetual Rights Grant', 'Model Inference Indemnity', 'Jurisdiction Lock'] }, portfolio: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop'] },
      { id: 'l2', name: 'LexMachina AI Licensing', handle: '@lexmachina_ai', spec: 'ai_law', role: 'Synthetic Media & Copyright Partner', avatar: 'LM', color: '#f43f5e', desc: 'Legal frameworks for generative model weights, training dataset fair use exemptions, voice rights, and likeness agreements.', rating: '5.0★', worksCount: 71, rate: '$280/hr', template: { name: 'Generative Likeness & Voice Lock Agreement', features: ['Biometric Voice Rights Enclosure', 'Residual Inference Royalty Framework', 'Synthetic Media Attribution Clause'] }, portfolio: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop'] },
      { id: 'l3', name: 'VentureScale Corporate Counsel', handle: '@venturescale', spec: 'venture', role: 'Startup Seed-to-Series B Lead Counsel', avatar: 'VS', color: '#e11d48', desc: 'SAFE notes, Delaware C-corp formations, equity cap table modeling, stock option pools, and venture financing closings.', rating: '4.9★', worksCount: 110, rate: '$240/hr', template: { name: 'Series Seed Financing Blueprint', features: ['NVCA Standard Clean Term Sheet', 'Pro-Rata Rights & Information Rights', 'Founder 4-Year Vesting Schedule'] }, portfolio: ['https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop'] },
      { id: 'l4', name: 'PatentVanguard DeepTech', handle: '@patent_van', spec: 'patent', role: 'USPTO Registered Patent Attorney', avatar: 'PV', color: '#be123c', desc: 'Novel neural network architecture claims, hardware accelerators, cryptography patent portfolios, and prior art invalidation.', rating: '5.0★', worksCount: 82, rate: '$310/hr', template: { name: 'DeepTech Utility Patent Claim Tree', features: ['Independent System Claims Architecture', 'Algorithm Flowchart Step Protection', 'Freedom-to-Operate Landscape Search'] }, portfolio: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop'] },
      { id: 'l5', name: 'GlobalCrossBorder Compliance', handle: '@global_lex', spec: 'compliance', role: 'EU AI Act & International Trade Counsel', avatar: 'GC', color: '#fb7185', desc: 'EU Artificial Intelligence Act compliance audits, cross-border data transfer impact assessments, and regulatory risk mitigation.', rating: '4.8★', worksCount: 59, rate: '$220/hr', template: { name: 'EU AI Act High-Risk Classification Pack', features: ['Technical Documentation Dossier', 'Quality Management System (QMS)', 'Post-Market Monitoring Plan'] }, portfolio: ['https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop'] },
      { id: 'l6', name: 'SaaS Enterprise Agreement Group', handle: '@saas_counsel', spec: 'contracts', role: 'Enterprise B2B MSA & SLA Negotiator', avatar: 'SE', color: '#f43f5e', desc: 'Fortune 500 vendor risk assessments, master service agreements (MSAs), service level agreements (SLAs), and data processing addendums (DPAs).', rating: '4.9★', worksCount: 94, rate: '$200/hr', template: { name: 'B2B Enterprise SaaS MSA Standard', features: ['Mutual Limitation of Liability', '99.9% Uptime SLA Penalty Matrix', 'Standard Contractual Clauses (SCCs)'] }, portfolio: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop'] }
    ]
  },
  {
    id: 'doctor',
    name: 'Healthcare & Sports Physio',
    category: 'services',
    tag: 'Health & Wellness',
    icon: 'activity',
    color: '#0ea5e9',
    shortDesc: 'Biomechanical motion analysis, post-op rehabilitation, athletic conditioning & sports recovery.',
    features: [
      'Infrared Gait & Joint Stress Scan',
      'Isometric Muscle Strength Profiling',
      'Custom Rehabilitation Protocols',
      'Neuromuscular Recovery Stim'
    ],
    crystalColors: { top: 0x0ea5e9, bottom: 0x0284c7 },
    sampleWorkers: [
      { id: 'h1', name: 'Apex Kinetic Sports Medicine', handle: '@apex_physio', spec: 'physio', role: 'Lead Biomechanist & DPT', avatar: 'AP', color: '#0ea5e9', desc: 'Olympic-level neuromuscular profiling, joint mobilization, and accelerated athletic recovery protocols.', rating: '4.9★', worksCount: 135, rate: '$120/hr', template: { name: 'Kinetic Chain Rehab Protocol', features: ['Joint ROM Goniometry', 'EMG Muscle Activation Map', 'Target Load Curve'] }, portfolio: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop'] },
      { id: 'h2', name: 'NeuroSpine Biomechanics', handle: '@neurospine', spec: 'spine', role: 'Board-Certified Physical Therapist & Spine Fellow', avatar: 'NS', color: '#0ea5e9', desc: 'Cervical and lumbar disc decompression protocols, posture kinetic balancing, and core stabilizer muscle firing retraining.', rating: '5.0★', worksCount: 112, rate: '$130/hr', template: { name: 'Lumbar Stability Kinetic Protocol', features: ['Electromyographic Core Activation', 'McGill Big 3 Stabilization Cycle', 'Spinal Load Tolerance Profiling'] }, portfolio: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop'] },
      { id: 'h3', name: 'Vanguard ACL & Knee Recovery', handle: '@vanguard_acl', spec: 'knee', role: 'Post-Surgical Orthopedic Specialist', avatar: 'VA', color: '#0284c7', desc: 'Phase 1 to return-to-sport ACL reconstruction protocols, quad strength index dynamometry, and force plate symmetry testing.', rating: '4.9★', worksCount: 89, rate: '$125/hr', template: { name: 'Return-to-Sport Knee Symmetry Matrix', features: ['Isokinetic Quad Index Testing', 'Dual Force Plate Jump Telemetry', 'Eccentric Hamstring Load Program'] }, portfolio: ['https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop'] },
      { id: 'h4', name: 'RotatorCuff Shoulder Lab', handle: '@shoulder_lab', spec: 'shoulder', role: 'Throwing Athlete & Scapular Specialist', avatar: 'RC', color: '#38bdf8', desc: 'Scapulohumeral rhythm rehabilitation, labral repair therapy, overhead throwing mechanics, and rotator cuff tendon remodeling.', rating: '4.8★', worksCount: 74, rate: '$115/hr', template: { name: 'Scapular Dynamic Control Protocol', features: ['Serratus Anterior Muscle Firing', 'External Rotation Strength Ratio', 'Plyometric Rebound Deceleration'] }, portfolio: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop'] },
      { id: 'h5', name: 'RunnersGait Motion Analysis', handle: '@runnersgait', spec: 'gait', role: 'Running Specialist & Orthotist', avatar: 'RG', color: '#0ea5e9', desc: 'High-speed 240 FPS video running gait analysis, cadence optimization, plantar fascia loading profiles, and custom carbon orthotics.', rating: '4.9★', worksCount: 148, rate: '$110/hr', template: { name: 'High-Speed 2D/3D Running Gait Scan', features: ['Overstriding Braking Force Scan', 'Cadence 170-180 BPM Tuning', 'Tissue Tolerance Loading Ladder'] }, portfolio: ['https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop'] },
      { id: 'h6', name: 'CryoHyperbaric Recovery Hub', handle: '@cryo_recovery', spec: 'recovery', role: 'Sports Physiologist & Recovery Specialist', avatar: 'CR', color: '#0369a1', desc: 'Photobiomodulation red light therapy, pneumatic compression boots, hyperbaric oxygen conditioning, and HRV recovery tracking.', rating: '5.0★', worksCount: 120, rate: '$140/hr', template: { name: 'Elite Athlete HRV Recovery Cycle', features: ['Daily Autonomic Balance Telemetry', 'Hyperbaric Tissue Oxygenation', 'Targeted Vasoconstriction Protocol'] }, portfolio: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop'] }
    ]
  }
];

// Active Creators Database (Dynamically loaded based on chosen profession!)
let ACTIVE_PROFESSION_WORKERS = PROFESSIONS_DATA[0].sampleWorkers;

function findWorkerById(id) {
  let worker = ACTIVE_PROFESSION_WORKERS.find(w => w.id === id);
  if (worker) return worker;
  for (const prof of PROFESSIONS_DATA) {
    worker = prof.sampleWorkers.find(w => w.id === id);
    if (worker) return worker;
  }
  return CREATORS_DATA.find(c => c.id === id);
}

// Explore Shared Works Database
const SHARED_WORKS = [
  { id: 'sw-1', title: "Emergency Trenchless Pipe Relining", creator: "@aquapulse", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop", desc: "Zero-excavation 40ft epoxy sewer liner cured in 3 hours with hydrojet prep." },
  { id: 'sw-2', title: "Metahuman Kinetic Rig Demo", creator: "@kinetics_3d", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop", desc: "Dual-quaternion muscle deformation running at 60 FPS in Unreal Engine 5." },
  { id: 'sw-3', title: "400A Three-Phase Industrial Panel", creator: "@voltmaster", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop", desc: "Thermal-scanned industrial load balancing with integrated surge suppression." },
  { id: 'sw-4', title: "Flux Photoreal Skin Caustics v2", creator: "@0xVanguard", img: "https://picsum.photos/seed/orb1/600/400", desc: "Ray-marched glass caustics and skin pore latent textures with zero plastic blur." },
  { id: 'sw-5', title: "CAN Bus High-Voltage Cell Telemetry", creator: "@hyperdrive_auto", img: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop", desc: "Real-time oscilloscope capture balancing 96 EV lithium battery cells." },
  { id: 'sw-6', title: "Commercial Model Weight IP Buyout", creator: "@veritas_law", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop", desc: "Comprehensive enterprise IP indemnification template for generative pipelines." }
];

// User's Published Works (Editable in Profile)
let publishedWorks = [
  { id: 'pw-1', title: "Thermal Acoustic Pipeline Map", cat: "trades", price: "$120", desc: "Ultrasonic sensor map for pinpointing subterranean pipe fractures." },
  { id: 'pw-2', title: "Niagara Particle Swarm Template", cat: "creative", price: "$95", desc: "Realtime volumetric smoke and liquid mesh in Unreal Engine 5." }
];

// Colors for starfield
const PAGE_COLOR_MAP = {
  'gateway': ['rgba(6, 182, 212, ', 'rgba(139, 92, 246, ', 'rgba(163, 230, 53, '],
  'hub': ['rgba(6, 182, 212, ', 'rgba(168, 85, 247, ', 'rgba(16, 185, 129, '],
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
    const hash = window.location.hash.replace('#', '') || 'gateway';
    warpTo(hash);
  }

  window.addEventListener('hashchange', handleHash);

  // If page loaded with an existing hash, route to it; else start at gateway
  if (window.location.hash) {
    handleHash();
  } else {
    warpTo('gateway');
  }
}

function warpTo(targetId) {
  const validPages = ['gateway', 'hub', 'homepage', 'favorites', 'explore', 'credits', 'contacts', 'workspace', 'profile', 'invite'];
  if (!validPages.includes(targetId)) targetId = 'gateway';

  currentPageId = targetId;
  document.body.setAttribute('data-page', targetId);

  // Hide all panels
  document.querySelectorAll('.view-panel, .destination-panel').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  const gateway = document.getElementById('view-gateway');
  if (gateway) {
    gateway.style.display = (targetId === 'gateway') ? 'flex' : 'none';
    if (targetId === 'gateway') gateway.classList.add('active');
    else gateway.classList.remove('active');
  }

  // Show back-to-gateway button only on hub
  const hubBackBtn = document.getElementById('btn-hub-back-to-gateway');
  if (hubBackBtn) hubBackBtn.style.display = (targetId === 'hub') ? 'flex' : 'none';

  // Activate target
  if (targetId === 'gateway') {
    const tagBtn = document.getElementById('active-profession-tag-btn');
    if (tagBtn) {
      tagBtn.textContent = 'ALL PROFESSIONS';
      tagBtn.style.color = '#06b6d4';
    }
  } else if (targetId === 'hub') {
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
   UNIVERSAL PROFESSION MATRIX & GATEWAY LAYER
   ========================================================= */
function initGatewayMatrix() {
  const grid = document.getElementById('profession-cards-grid');
  const searchInput = document.getElementById('gateway-search-input');
  const catBtns = document.querySelectorAll('.gateway-cat-btn');
  const backToGatewayBtn = document.getElementById('btn-back-to-gateway');

  if (backToGatewayBtn) {
    backToGatewayBtn.addEventListener('click', () => {
      window.location.hash = '#gateway';
    });
  }

  if (!grid) return;

  let currentCategory = 'all';
  let currentSearch = '';

  function renderGrid() {
    grid.innerHTML = '';
    const q = currentSearch.toLowerCase().trim();

    const filtered = PROFESSIONS_DATA.filter(p => {
      const matchCat = (currentCategory === 'all' || p.category === currentCategory);
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3.5rem 1rem; color: #64748b;">
          <i data-lucide="help-circle" style="width: 44px; height: 44px; margin: 0 auto 1rem; color: #06b6d4;"></i>
          <h3 style="color:#e2e8f0; font-size:1.15rem; margin-bottom:0.5rem;">No matching professions found</h3>
          <p style="font-size:0.85rem;">Try searching for trades like "plumber", creative skills like "animator", or engineering keywords.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'profession-flip-card';
      card.setAttribute('data-id', p.id);
      card.style.color = p.color;

      card.innerHTML = `
        <div class="card-pulse-halo" style="background: radial-gradient(circle, ${p.color}2e 0%, ${p.color}0a 55%, transparent 75%); border: 2px solid ${p.color}88; box-shadow: 0 0 45px ${p.color}66;"></div>
        <div class="card-flipper-inner">
          <!-- Front Face -->
          <div class="card-face front" style="border-color: ${p.color}44;">
            <div class="card-front-top">
              <div class="profession-icon-box" style="color: ${p.color}; border-color: ${p.color}; background: ${p.color}15; box-shadow: 0 0 25px ${p.color}44;">
                <i data-lucide="${p.icon}"></i>
              </div>
              <span class="profession-tag-chip" style="background: ${p.color}22; color: ${p.color}; border: 1px solid ${p.color}66;">${p.tag}</span>
            </div>
            <div class="card-front-center">
              <h3 class="profession-name">${p.name}</h3>
              <p class="profession-short-desc">${p.shortDesc}</p>
            </div>
            <div class="card-front-bottom">
              <span class="flip-hover-hint">
                <i data-lucide="rotate-cw" style="width:14px; height:14px;"></i>
                <span>Hover to flip & view specs</span>
              </span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: ${p.color}; font-weight: 700;">${p.sampleWorkers.length} Active Pros</span>
            </div>
          </div>

          <!-- Back Face -->
          <div class="card-face back" style="border-color: ${p.color}; box-shadow: inset 0 0 35px ${p.color}22, 0 10px 40px ${p.color}33;">
            <div class="back-header">
              <span class="back-title" style="color: ${p.color};">${p.name}</span>
              <i data-lucide="${p.icon}" style="width: 20px; height: 20px; color: ${p.color};"></i>
            </div>
            <div class="back-features-list">
              ${p.features.map(f => `
                <div class="feature-item">
                  <i data-lucide="check-circle" style="color: ${p.color};"></i>
                  <span>${f}</span>
                </div>
              `).join('')}
            </div>
            <button class="btn-launch-hub" style="background: ${p.color}; color: #000; box-shadow: 0 0 30px ${p.color}99;" data-id="${p.id}">
              <span>LAUNCH 3D CRYSTAL CORE</span>
              <i data-lucide="arrow-right" style="width:16px; height:16px;"></i>
            </button>
          </div>
        </div>
      `;

      const launchBtn = card.querySelector('.btn-launch-hub');
      if (launchBtn) {
        launchBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectProfession(p.id);
        });
      }

      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-face.back') || e.target.closest('.btn-launch-hub')) {
          selectProfession(p.id);
        }
      });

      grid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat || 'all';
      renderGrid();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderGrid();
    });
  }

  renderGrid();
}

function selectProfession(id) {
  const prof = PROFESSIONS_DATA.find(p => p.id === id) || PROFESSIONS_DATA[0];
  activeProfessionId = prof.id;
  ACTIVE_PROFESSION_WORKERS = prof.sampleWorkers || [];

  const tagBtn = document.getElementById('active-profession-tag-btn');
  if (tagBtn) {
    tagBtn.textContent = prof.name.toUpperCase();
    tagBtn.style.color = prof.color;
  }

  if (window.updateCrystalColors && prof.crystalColors) {
    window.updateCrystalColors(prof.crystalColors.top, prof.crystalColors.bottom);
  }

  const dirHeading = document.querySelector('#page-homepage .panel-heading');
  if (dirHeading) dirHeading.textContent = `${prof.name.toUpperCase()} DIRECTORY`;
  const dirPill = document.querySelector('#page-homepage .chip-pill');
  if (dirPill) dirPill.textContent = `${prof.name.toUpperCase()} • VERIFIED SPECIALISTS (${ACTIVE_PROFESSION_WORKERS.length})`;

  // Dynamically update specialty filter buttons for the chosen profession
  const filterPillsContainer = document.querySelector('.filter-pills');
  if (filterPillsContainer && prof.sampleWorkers) {
    const specs = Array.from(new Set(prof.sampleWorkers.map(w => w.spec).filter(Boolean)));
    filterPillsContainer.innerHTML = `<button class="filter-btn active" data-filter="all">All Specialties (${prof.sampleWorkers.length})</button>` +
      specs.map(s => {
        const count = prof.sampleWorkers.filter(w => w.spec === s).length;
        const label = s.charAt(0).toUpperCase() + s.slice(1);
        return `<button class="filter-btn" data-filter="${s}">${label} (${count})</button>`;
      }).join('');

    // Rebind filter buttons
    const filterBtns = filterPillsContainer.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (window.renderCreatorsDirectory) window.renderCreatorsDirectory();
      });
    });
  }

  if (window.renderCreatorsDirectory) {
    window.renderCreatorsDirectory();
  }

  window.location.hash = '#hub';
  showToast(`Loaded ${prof.name} Matrix (${ACTIVE_PROFESSION_WORKERS.length} Verified Specialists)`);
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
   3b. GATEWAY TITLE RIPPLE — same mechanic as hub title
   ========================================================= */
function initRippleGatewayTitle() {
  const title = document.getElementById('gateway-ripple-title');
  if (!title) return;

  const chars = title.querySelectorAll('.gateway-char');
  const rippleRadius = 150;
  // Pull from the profession neon palette for richer colour variety
  const rippleColors = ['#06b6d4', '#a3e635', '#f43f5e', '#a855f7', '#f59e0b', '#34d399', '#ff2e88', '#00e5ff'];

  // Default colour state: "CHOOSE YOUR" = white, "PROFESSION" = cyan
  function resetChar(span) {
    const isAccent = span.closest('.gateway-word-accent');
    if (isAccent) {
      span.style.color = '#06b6d4';
      span.style.textShadow = '0 0 20px rgba(6, 182, 212, 0.4)';
    } else {
      span.style.color = '#ffffff';
      span.style.textShadow = 'none';
    }
    span.style.transform = 'translateY(0px) scale(1)';
  }

  chars.forEach(span => resetChar(span));

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
        span.style.transform = `translateY(${-7 * factor}px) scale(${1 + 0.18 * factor})`;
        span.style.textShadow = `0 0 ${20 * factor}px ${col}, 0 0 ${40 * factor}px ${col}66`;
      } else {
        resetChar(span);
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

  window.updateCrystalColors = function(topHex, bottomHex) {
    if (topLight) topLight.color.setHex(topHex);
    if (bottomLight) bottomLight.color.setHex(bottomHex);
    if (sparkMat) sparkMat.color.setHex(topHex);
  };

  // Sync initial profession colors if available
  const initialProf = PROFESSIONS_DATA.find(p => p.id === activeProfessionId);
  if (initialProf && initialProf.crystalColors) {
    window.updateCrystalColors(initialProf.crystalColors.top, initialProf.crystalColors.bottom);
  }

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

    const activeList = (ACTIVE_PROFESSION_WORKERS && ACTIVE_PROFESSION_WORKERS.length > 0)
      ? ACTIVE_PROFESSION_WORKERS
      : CREATORS_DATA;

    const filtered = activeList.filter(c => {
      const matchFilter = filter === 'all' || c.spec === filter;
      const matchQuery = !q || c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || (c.desc && c.desc.toLowerCase().includes(q));
      return matchFilter && matchQuery;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: #64748b;">
          <i data-lucide="search-x" style="width: 44px; height: 44px; margin: 0 auto 1rem; color: #a3e635;"></i>
          <h3 style="color:#e2e8f0; font-size:1.15rem; margin-bottom:0.5rem;">No verified professionals found</h3>
          <p style="font-size:0.85rem;">Try adjusting your search query or reset filter pills.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

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

  window.renderCreatorsDirectory = function() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const query = searchInput ? searchInput.value : '';
    renderCreators(activeFilter, query);
  };
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
        const creator = findWorkerById(id);
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
  const creator = savedContacts.get(id) || findWorkerById(id);
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

  // Brand Brief Builder (Campaign Engine)
  initBrandBriefBuilder();

  updateRecruiterWorkspace();
  renderPublishedWorks();
}

function initBrandBriefBuilder() {
  const briefForm = document.getElementById('brand-brief-form');
  const btnAiAssist = document.getElementById('btn-ai-assist-brief');
  const previewBox = document.getElementById('active-brief-preview-box');
  const previewTitle = document.getElementById('preview-brief-title');
  const previewLicense = document.getElementById('preview-brief-license');
  const previewDetails = document.getElementById('preview-brief-details');
  const statusPill = document.getElementById('brief-status-pill');

  const titleInput = document.getElementById('brief-campaign-title');
  const typeSelect = document.getElementById('brief-content-type');
  const styleSelect = document.getElementById('brief-style');
  const ratioSelect = document.getElementById('brief-aspect-ratio');
  const commSelect = document.getElementById('brief-commercial-use');
  const budgetInput = document.getElementById('brief-budget');
  const reqText = document.getElementById('brief-requirements');

  // AI-Assisted Brief Builder Presets
  const AI_BRIEF_PRESETS = [
    {
      title: "Project Nova: Cyber-Brutalist Kinetic Launch",
      type: "AI Video & 60fps Animation",
      style: "Neo-Brutalism & Kinetic Typography",
      ratio: "16:9 Landscape (YouTube / Desktop / Cinema)",
      comm: "Full Commercial Exclusive Buyout (Worldwide Perpetual)",
      budget: "Ξ 3.20 ETH • 4 Days Turnaround",
      req: "Generate a 45-second high-tempo teaser trailer with zero morph flicker using AnimateDiff and Flux photoreal LoRAs. Include sync 96kHz industrial audio."
    },
    {
      title: "Aura Solis: Luxury Glassmorphic Fragrance Stills",
      type: "Photoreal Diffusion Stills (Flux/SDXL)",
      style: "Glassmorphism & Raytraced Shaders",
      ratio: "1:1 Square (Instagram Feed / E-Commerce)",
      comm: "Commercial Non-Exclusive (Digital Media Only, 1 Year)",
      budget: "Ξ 1.80 ETH • 48 Hours Turnaround",
      req: "12 ultra-sharp 4K commercial packshots showcasing perfume bottles with ray-marched caustics and subsurface scattering. High-contrast studio lighting."
    },
    {
      title: "Neural Horizon: AAA Game Cinematic Lore Swarm",
      type: "Full Multimodal Campaign (Video + Audio + Stills)",
      style: "Dark Dystopian Anime & Mecha",
      ratio: "4:5 Portrait & 21:9 Ultra-Wide Multiformat",
      comm: "Full Commercial Exclusive Buyout (Worldwide Perpetual)",
      budget: "Ξ 4.50 ETH • 7 Days Turnaround",
      req: "Comprehensive campaign pack: 30-sec cinematic cutscene, emotional whisper-to-shout vocal stems, and 6 key art banner assets. Temporal consistency required."
    }
  ];

  let presetIndex = 0;

  if (btnAiAssist) {
    btnAiAssist.addEventListener('click', () => {
      const preset = AI_BRIEF_PRESETS[presetIndex % AI_BRIEF_PRESETS.length];
      presetIndex++;

      if (titleInput) titleInput.value = preset.title;
      if (typeSelect) typeSelect.value = preset.type;
      if (styleSelect) styleSelect.value = preset.style;
      if (ratioSelect) ratioSelect.value = preset.ratio;
      if (commSelect) commSelect.value = preset.comm;
      if (budgetInput) budgetInput.value = preset.budget;
      if (reqText) reqText.value = preset.req;

      showToast("✨ AI Auto-Structured Brief: Filled from generative campaign engine!");
    });
  }

  if (briefForm) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const campaignTitle = titleInput.value.trim();
      const contentType = typeSelect.value;
      const visualStyle = styleSelect.value;
      const aspectRatio = ratioSelect.value;
      const license = commSelect.value;
      const budget = budgetInput.value.trim() || 'Ξ 2.00 ETH';
      const requirements = reqText.value.trim();

      if (previewBox && previewDetails && previewTitle && previewLicense) {
        previewTitle.innerText = campaignTitle;
        previewLicense.innerText = license;
        previewDetails.innerHTML = `
          <div class="brief-detail-chip">
            <span class="brief-detail-label">CONTENT TYPE</span>
            <span class="brief-detail-val">${contentType}</span>
          </div>
          <div class="brief-detail-chip">
            <span class="brief-detail-label">STYLE & AESTHETIC</span>
            <span class="brief-detail-val">${visualStyle}</span>
          </div>
          <div class="brief-detail-chip">
            <span class="brief-detail-label">ASPECT RATIO</span>
            <span class="brief-detail-val">${aspectRatio}</span>
          </div>
          <div class="brief-detail-chip">
            <span class="brief-detail-label">BUDGET & TIMELINE</span>
            <span class="brief-detail-val">${budget}</span>
          </div>
          <div class="brief-detail-chip" style="grid-column: 1/-1;">
            <span class="brief-detail-label">DIRECTIVES & SCOPE</span>
            <span class="brief-detail-val" style="font-weight: 400; color: #94a3b8; margin-top: 0.2rem;">${requirements || 'Standard production deliverables.'}</span>
          </div>
        `;
        previewBox.style.display = 'flex';
      }

      if (statusPill) {
        statusPill.style.display = 'inline-block';
        statusPill.innerHTML = `✓ Brief Published & Live to 24 Creators`;
      }

      // Also log into pipeline terminal
      const terminal = document.getElementById('group-terminal-body');
      if (terminal) {
        terminal.innerHTML += `<p class="term-line" style="color: #a3e635;">> [BRIEF PUBLISHED] "${campaignTitle}" matching verified agents...</p>`;
      }

      showToast(`Campaign Brief "${campaignTitle}" published! Matched to verified creators.`);
    });
  }
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
    const creator = findWorkerById(id);
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

/* =========================================================
   AETHERBOT: NEO-BRUTALISM + GLASSMORPISM AI ASSISTANT WIDGET
   Powered by NVIDIA NIM & Supabase
   ========================================================= */
function formatAetherMarkdown(raw) {
  if (!raw) return '';
  const lines = raw.split('\n');
  const formattedLines = lines.map(line => {
    let l = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
    if (l.trim().startsWith('- ') || l.trim().startsWith('• ')) {
      return `<li>${l.trim().substring(2)}</li>`;
    }
    return l ? `<p>${l}</p>` : '';
  });
  return formattedLines.join('');
}

function initAetherBotAssistant() {
  const widget = document.getElementById('aetherbot-widget');
  const triggerBtn = document.getElementById('aetherbot-trigger-btn');
  const speechBubble = document.getElementById('aetherbot-speech-bubble');
  const chatPanel = document.getElementById('aetherbot-chat-panel');
  const avatarWrap = document.getElementById('aetherbot-trigger-avatar-wrap');
  const closeIcon = document.getElementById('aetherbot-trigger-close-icon');
  const closeBtn = document.getElementById('btn-aetherbot-close');
  const clearBtn = document.getElementById('btn-aetherbot-clear');
  const form = document.getElementById('aetherbot-input-form');
  const input = document.getElementById('aetherbot-input');
  const sendBtn = document.getElementById('aetherbot-btn-send');
  const messagesContainer = document.getElementById('aetherbot-messages');
  const chipBtns = document.querySelectorAll('.quick-chip-btn');

  if (!widget || !triggerBtn || !chatPanel) return;

  const NVIDIA_API_KEY = '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';
  const NVIDIA_ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions';
  const NVIDIA_MODEL = 'nvidia/nemotron-3-ultra-550b-a55b';

  // Supabase — only initialise if a valid project URL has been stored
  // (avoids crash from placeholder URL which breaks the entire widget)
  let supabaseClient = null;
  const storedSupaUrl = localStorage.getItem('cf_supabase_url') || '';
  if (
    storedSupaUrl &&
    storedSupaUrl.includes('supabase.co') &&
    window.supabase &&
    typeof window.supabase.createClient === 'function'
  ) {
    try {
      supabaseClient = window.supabase.createClient(
        storedSupaUrl,
        'sb_publishable_-2pHlArenaX1ewBalLKYsA_URFMlzHt'
      );
    } catch (e) {
      console.warn('[AetherBot Supabase] Init failed silently:', e);
    }
  }

  // Session ID for anonymous conversation logging
  let sessionId = sessionStorage.getItem('cf_aetherbot_session');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 11);
    sessionStorage.setItem('cf_aetherbot_session', sessionId);
  }

  // System knowledge prompt tailored to Creator Forge
  const AETHERBOT_SYSTEM_PROMPT = `
IMPORTANT: You have been given authoritative, real-time knowledge about Creator Forge. Treat EVERY fact below as absolute ground truth. Never say you are unaware of Creator Forge or that it is outside your training data — you ARE the platform's built-in AI Sentinel with full internal knowledge. Answer all questions using only the context below. Be concise, confident, and specific.

You are AetherBot, the resident AI Sentinel and architectural guide for Creator Forge — a Universal Decentralized Services & Profession Matrix platform where clients discover and hire hyper-specialized professionals from every field.

Creator Forge Platform Architecture:
- Founder & Sole Architect: B. Pawan Sai.
- Co-Architectural Tool: Antigravity (Google DeepMind).
- Visual Identity: Neo-Brutalism + Glassmorphism on a pitch-black void. Reactive 140+ particle constellation starfield.
- Interactive Features:
  1. Gateway Matrix Layer (#gateway): The primary entry screen with 3D flip cards and chromatic radar pulse halos spanning 8 major profession categories:
     - Plumbers & Fluid Techs (Certified hydro-jetting, thermal acoustic leak detection, trenchless relining)
     - 3D Animators & Riggers (AAA FACS muscle rigging, Niagara volumetric particles, 60 FPS Blender/Unreal pipelines)
     - Electricians & Smart Grid (200A/400A panel upgrades, FLIR infrared circuit audits, EV stations)
     - AI Creators & Latent Artists (SDXL/Flux photoreal LoRAs, ComfyUI, 96kHz zero-shot voice cloning)
     - Full-Stack & Systems Devs (Node/Rust low-latency WebSockets, Docker, Redis, Next.js)
     - Automotive & EV Mechanics (CAN bus diagnostics, hybrid high-voltage battery cell balancing)
     - Legal Counsel & Tech IP (Synthetic media licensing, commercial IP buyouts, venture contracts)
     - Healthcare & Sports Physio (Biomechanical motion analysis, neuromuscular rehab)
  2. 3D Crystal Core Hub (#hub): Centerpiece rotating WebGL crystal rendered via Three.js with dual point lights (top & bottom) that dynamically re-tint to match the active profession's neon color code!
  3. Circular Meniscus: 360° circular SVG ring with dynamic cursor-facing quadratic Béziers tracking the mouse.
  4. 24 Verified Specialists Directory (#homepage): Search, filter by specialty, inspect rates, rating, signature workflow templates, and click avatars to open high-res images in a glowing bubble lightbox.
  5. Contacts & Chat (#contacts): Direct messaging with specialists and studio deal sign-offs.
  6. Persona Switcher: Client / Explorer mode vs. Employer / Recruiter studio workspace mode.
  7. Shared Works Feed (#explore): Community creations, prompt chats, and deal transfers.
  8. Pinned Favorites (#favorites), Profile Customizer (#profile), and Referral Royalties (#invite).

How to find a professional (e.g. a plumber):
- On the home screen, hover over the "Plumbers & Fluid Techs" flip card and click it.
- This warps you to the Crystal Hub — a glowing 3D crystal that represents that profession.
- From there click "View Specialists" to browse the Verified Directory, filter by specialty/rate/rating, and message any specialist directly.

Persona:
- You are witty, technically sharp, and enthusiastically helpful.
- Keep answers concise, direct, and specifically focused on Creator Forge's design, features, tools, and navigation.
- Never break character or claim ignorance about Creator Forge — you know everything about it.
`;

  let conversationHistory = [
    { role: 'system', content: AETHERBOT_SYSTEM_PROMPT }
  ];
  let isChatOpen = false;
  let isAwaitingResponse = false;

  // Hover states for comic dialogue bubble
  triggerBtn.addEventListener('mouseenter', () => {
    if (!isChatOpen && speechBubble) {
      speechBubble.classList.add('visible');
    }
  });

  triggerBtn.addEventListener('mouseleave', () => {
    if (speechBubble) {
      speechBubble.classList.remove('visible');
    }
  });

  // Toggle Chat Panel
  function toggleChat(open) {
    isChatOpen = (typeof open === 'boolean') ? open : !isChatOpen;
    if (isChatOpen) {
      chatPanel.style.display = 'flex';
      if (speechBubble) speechBubble.classList.remove('visible');
      if (avatarWrap) avatarWrap.style.display = 'none';
      if (closeIcon) closeIcon.style.display = 'flex';
      setTimeout(() => input.focus(), 150);
      scrollChatToBottom();
    } else {
      chatPanel.style.display = 'none';
      if (avatarWrap) avatarWrap.style.display = 'flex';
      if (closeIcon) closeIcon.style.display = 'none';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  triggerBtn.addEventListener('click', () => toggleChat());
  if (closeBtn) closeBtn.addEventListener('click', () => toggleChat(false));

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      conversationHistory = [{ role: 'system', content: AETHERBOT_SYSTEM_PROMPT }];
      messagesContainer.innerHTML = `
        <div class="aetherbot-msg aetherbot-msg-bot">
          <div class="aetherbot-msg-avatar">
            <img src="https://api.dicebear.com/10.x/identicon/svg?backgroundColor=101216&rowColor=ff2e88,00e5ff,ffe600,7cff00,ff6a00,b400ff&scale=0.78&borderRadius=37&seed=Felix" alt="AetherBot" class="pixel-avatar" />
          </div>
          <div class="aetherbot-bubble">
            <div class="msg-text">Conversation buffer refreshed. What would you like to explore across Creator Forge?</div>
            <span class="msg-time">Reset</span>
          </div>
        </div>
      `;
      showToast("AetherBot buffer cleared");
    });
  }

  // Quick Chips
  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.query;
      if (q && !isAwaitingResponse) {
        input.value = q;
        sendUserMessage(q);
      }
    });
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query && !isAwaitingResponse) {
      sendUserMessage(query);
    }
  });

  function scrollChatToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendMessageUI(role, content) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `aetherbot-msg ${role === 'user' ? 'aetherbot-msg-user' : 'aetherbot-msg-bot'}`;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const avatarHtml = role === 'user'
      ? `<div class="aetherbot-msg-avatar"><i data-lucide="user"></i></div>`
      : `<div class="aetherbot-msg-avatar"><img src="https://api.dicebear.com/10.x/identicon/svg?backgroundColor=101216&rowColor=ff2e88,00e5ff,ffe600,7cff00,ff6a00,b400ff&scale=0.78&borderRadius=37&seed=Felix" alt="AetherBot" class="pixel-avatar" /></div>`;

    msgDiv.innerHTML = `
      ${avatarHtml}
      <div class="aetherbot-bubble">
        <div class="msg-text">${formatAetherMarkdown(content)}</div>
        <span class="msg-time">${timeStr}</span>
      </div>
    `;

    messagesContainer.appendChild(msgDiv);
    scrollChatToBottom();
    if (window.lucide) window.lucide.createIcons();
    return msgDiv;
  }

  // Background Supabase Logger
  function logToSupabase(role, content) {
    try {
      if (supabaseClient) {
        supabaseClient.from('chat_messages').insert({
          session_id: sessionId,
          role: role,
          content: content
        }).then(() => {}).catch(() => {});
      }
    } catch (e) {
      // Non-blocking
    }
  }

  async function sendUserMessage(text) {
    input.value = '';
    isAwaitingResponse = true;
    sendBtn.disabled = true;

    // Append user message
    appendMessageUI('user', text);
    conversationHistory.push({ role: 'user', content: text });
    logToSupabase('user', text);

    // ── Pixel Speaker: show & start mouth animation ───────────────────────
    const pixelSpeaker  = document.getElementById('aetherbot-pixel-speaker');
    const pixelSvg      = pixelSpeaker?.querySelector('.pixel-char-svg');
    const speakerStatus = document.getElementById('pixel-speaker-status');

    if (pixelSpeaker) pixelSpeaker.style.display = 'flex';
    if (speakerStatus) speakerStatus.textContent  = 'AetherBot is thinking…';

    // Start mouth-toggle interval (~300 ms feels natural for speech)
    let mouthInterval = null;
    let mouthOpen = false;
    if (pixelSvg) {
      mouthInterval = setInterval(() => {
        mouthOpen = !mouthOpen;
        if (mouthOpen) {
          pixelSvg.classList.add('pixel-is-talking');
        } else {
          pixelSvg.classList.remove('pixel-is-talking');
        }
      }, 300);
    }
    // ─────────────────────────────────────────────────────────────────────

    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'aetherbot-msg aetherbot-msg-bot typing-indicator';
    typingDiv.innerHTML = `
      <div class="aetherbot-msg-avatar">
        <img src="https://api.dicebear.com/10.x/identicon/svg?backgroundColor=101216&rowColor=ff2e88,00e5ff,ffe600,7cff00,ff6a00,b400ff&scale=0.78&borderRadius=37&seed=Felix" alt="AetherBot" class="pixel-avatar" />
      </div>
      <div class="aetherbot-bubble">
        <div class="aetherbot-typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    scrollChatToBottom();

    try {
      // Update status text once the request is actually flying
      if (speakerStatus) speakerStatus.textContent = 'AetherBot is speaking…';

      const requestPayload = {
        model: NVIDIA_MODEL,
        messages: conversationHistory,
        max_tokens: 650,
        temperature: 0.65,
        top_p: 0.9
      };

      let response;
      try {
        // Try Vercel Serverless Function proxy first (bypasses browser CORS restrictions)
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestPayload)
        });

        if (!response.ok && response.status === 404) {
          throw new Error('Proxy not found');
        }
      } catch (proxyErr) {
        // Fallback directly to NVIDIA NIM API (for local preview / non-serverless)
        response = await fetch(NVIDIA_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${NVIDIA_API_KEY}`
          },
          body: JSON.stringify(requestPayload)
        });
      }

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson?.error?.message || errJson?.error || `API error (${response.status})`);
      }

      const resData = await response.json();
      const botResponse = resData.choices?.[0]?.message?.content || resData.choices?.[0]?.message?.reasoning_content || "I couldn't generate a response. Please try again.";

      typingDiv.remove();
      appendMessageUI('assistant', botResponse);
      conversationHistory.push({ role: 'assistant', content: botResponse });
      logToSupabase('assistant', botResponse);

    } catch (err) {
      console.error('[AetherBot Error]:', err);
      typingDiv.remove();
      appendMessageUI('assistant', `⚠️ **AetherBot Notice:** ${err.message || 'Error communicating with NVIDIA NIM endpoint.'}`);
    } finally {
      // ── Pixel Speaker: stop & hide ────────────────────────────────────
      if (mouthInterval) clearInterval(mouthInterval);
      if (pixelSvg) pixelSvg.classList.remove('pixel-is-talking');
      if (pixelSpeaker) pixelSpeaker.style.display = 'none';
      // ─────────────────────────────────────────────────────────────────

      isAwaitingResponse = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }
}

