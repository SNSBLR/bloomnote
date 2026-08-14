/**
 * CardCraft AI — script.js
 * Vanilla JS ES6+ Application Logic
 *
 * Architecture:
 *  1. Data / State
 *  2. DOM Selectors
 *  3. Navigation & View Management
 *  4. Sidebar
 *  5. Theme (Dark / Light)
 *  6. Authentication
 *  7. Wizard: Card Type, Format, Theme
 *  8. Studio Editor (Step 4)
 *  9. Canvas Live Updates
 * 10. AI Writing Assistant Drawer
 * 11. Export (JPEG / PNG via html2canvas)
 * 12. My Collections
 * 13. Document Views (PRD, Current Plan)
 * 14. Toast Notification
 * 15. Undo / Redo History
 * 16. Keyboard Shortcuts
 * 17. Initialisation
 */

/* ================================================================
   1. DATA & STATE
================================================================ */

/** Application state — single source of truth */
const state = {
  // Auth
  user: null,

  // Navigation
  currentView: 'create',

  // Wizard
  wizardStep: 1,

  // Card configuration (what gets rendered on the canvas)
  card: {
    id: null,
    category: 'Gratitude',
    format: 'Folding Vertical',
    theme: 'Soft Botanical',
    heading: 'A Heartfelt Thank You',
    message: 'Thank you for your warmth, guidance, and endless kindness. You make the world a brighter place every day!',
    font: 'playfair',
    fontSize: 28,
    textColor: '#325d3f',
    bgColor: '#e1efe5',
    textAlign: 'center',
    stickers: ['🌿', '✨'],
    photoDataUrl: null,
    isDraft: true,
  },

  // My Collections (persisted to localStorage)
  collections: [],

  // Sidebar
  sidebarOpen: true,

  // Theme
  darkMode: false,

  // Undo / Redo history stacks (snapshots of card state)
  undoStack: [],
  redoStack: [],

  // AI drawer
  aiSuggestion: null,
};

/** Card type options */
const CARD_TYPES = [
  { id: 'Gratitude',      icon: '🙏',  title: 'Gratitude Card',     desc: 'Express heartfelt thanks and warm appreciation' },
  { id: 'Apology',        icon: '🕊️',  title: 'Apology Card',        desc: 'Send sincere & gentle heartfelt apologies' },
  { id: 'Invitation',     icon: '💌',  title: 'Invitation Card',     desc: 'Invite loved ones to weddings, parties & events' },
  { id: 'Birthday',       icon: '🎂',  title: 'Birthday Card',       desc: 'Celebrate joyous birthdays with cheerful wishes' },
  { id: 'Get Well Soon',  icon: '🌸',  title: 'Get Well Soon',       desc: 'Send healing thoughts, warmth and comfort' },
  { id: 'Occasion',       icon: '🎉',  title: 'Special Occasions',   desc: 'Anniversaries, graduations & milestones' },
];

/** Format options */
const FORMATS = [
  { id: 'Folding Vertical',    name: 'Folding Vertical',    w: 100, h: 140, desc: 'Traditional folded greeting card (5" × 7")' },
  { id: 'Portrait Single',     name: 'Portrait Single Page', w: 100, h: 140, desc: 'Single-sided elegant postcard layout' },
  { id: 'Landscape Panoramic', name: 'Landscape Panoramic', w: 140, h: 100, desc: 'Wide horizontal orientation for photos' },
  { id: 'Square Social',       name: 'Square Social Card',   w: 120, h: 120, desc: 'Modern 1:1 square ratio for digital sharing' },
];

/** Theme options */
const THEMES = [
  { id: 'Soft Botanical',  name: 'Soft Botanical',  swatchBg: '#e1efe5', swatchColor: '#2a4b34', font: 'playfair',   desc: 'Earthy sage, olive leaves & calming greens',   bgColor: '#e1efe5', textColor: '#2a4b34' },
  { id: 'Pastel Floral',   name: 'Pastel Floral',   swatchBg: '#fde2e4', swatchColor: '#800f2f', font: 'dancing',    desc: 'Soft blush pink, subtle roses & gentle tones',  bgColor: '#fde2e4', textColor: '#800f2f' },
  { id: 'Warm Sunset',     name: 'Warm Sunset',     swatchBg: '#ffedd8', swatchColor: '#7c2d12', font: 'caveat',     desc: 'Cozy peaches, soft oranges & warm cream',       bgColor: '#ffedd8', textColor: '#7c2d12' },
  { id: 'Celestial Gold',  name: 'Celestial Gold',  swatchBg: '#e0e7ff', swatchColor: '#1e1b4b', font: 'playfair',   desc: 'Soft pastel night sky with subtle gold stars',   bgColor: '#e0e7ff', textColor: '#1e1b4b' },
  { id: 'Mint Geometric',  name: 'Mint Geometric',  swatchBg: '#ccfbf1', swatchColor: '#134e4a', font: 'montserrat', desc: 'Modern minimal mint shapes & clean typography',  bgColor: '#ccfbf1', textColor: '#134e4a' },
  { id: 'Cozy Watercolor', name: 'Cozy Watercolor', swatchBg: '#f3e8ff', swatchColor: '#581c87', font: 'pacifico',   desc: 'Hand-painted pastel watercolor wash effects',    bgColor: '#f3e8ff', textColor: '#581c87' },
];

/** Font options with their CSS font-family values */
const FONTS = [
  { id: 'playfair',   label: 'Playfair',   sample: 'Serif',   family: "'Playfair Display', Georgia, serif" },
  { id: 'dancing',    label: 'Dancing',    sample: 'Cursive',  family: "'Dancing Script', cursive" },
  { id: 'caveat',     label: 'Caveat',     sample: 'Hand',     family: "'Caveat', cursive" },
  { id: 'pacifico',   label: 'Pacifico',   sample: 'Fun',      family: "'Pacifico', cursive" },
  { id: 'montserrat', label: 'Montserrat', sample: 'Clean',    family: "'Montserrat', sans-serif" },
  { id: 'poppins',    label: 'Poppins',    sample: 'Modern',   family: "'Poppins', system-ui, sans-serif" },
];

/** Sticker options */
const STICKERS = ['🌿','✨','🌸','🕊️','💌','💖','🎈','🎉','🍵','🎀','⭐','🦋','🌺','🌼','🎵'];

/** AI transformation actions */
const AI_ACTIONS = [
  { id: 'grammar',   label: '✨ Fix Grammar',      fn: fixGrammar },
  { id: 'shorten',   label: '✂️ Shorten',           fn: shortenText },
  { id: 'elongate',  label: '📝 Elongate',          fn: elongateText },
  { id: 'heartfelt', label: '💖 Make Heartfelt',    fn: makeHeartfelt },
  { id: 'funny',     label: '😄 Make Funny',        fn: makeFunny },
  { id: 'formal',    label: '🎩 Make Formal',       fn: makeFormal },
  { id: 'poetic',    label: '🌙 Make Poetic',       fn: makePoetic },
];

/** Sprint 1 task list for Current Plan view */
const SPRINT_TASKS = [
  { id: 'TSK-101', task: 'Implement Pastel Green Theme CSS System & Light/Dark Mode Toggle', status: 'done',     owner: 'UI Lead' },
  { id: 'TSK-102', task: 'Build Collapsible Left Sidebar Navigation', status: 'done',     owner: 'Frontend' },
  { id: 'TSK-103', task: 'Develop 3-Step Wizard Flow (Category → Format → Theme)', status: 'done',     owner: 'Frontend' },
  { id: 'TSK-104', task: 'Integrate Live Card Editor Canvas with Fonts, Colors & Stickers', status: 'done',     owner: 'Frontend' },
  { id: 'TSK-105', task: 'Create AI Assistant Drawer (Shorten, Elongate, Tone shifts)', status: 'done',     owner: 'AI Dev' },
  { id: 'TSK-106', task: 'Undo / Redo History Stack for Card Edits', status: 'done',     owner: 'Frontend' },
  { id: 'TSK-107', task: 'JPEG / PNG Export via html2canvas', status: 'done',     owner: 'Fullstack' },
  { id: 'TSK-108', task: 'My Collections: Save, Edit, Duplicate, Delete Cards', status: 'done',     owner: 'Frontend' },
  { id: 'TSK-109', task: 'Google OAuth Authentication Mock Flow', status: 'review',  owner: 'Backend' },
  { id: 'TSK-110', task: 'Responsive Mobile & Tablet Layouts', status: 'progress', owner: 'UI Lead' },
];

/** Phase breakdown for Current Plan view */
const PLAN_PHASES = [
  { title: 'Phase 1: Environment Initialization & Layout Architecture', week: 'Weeks 1–2', desc: 'Configure flexible two-region studio layout, collapsible sidebar, theme context toggle, HTML5 canvas container with DPI scaling, and aspect-ratio constraints.' },
  { title: 'Phase 2: Typography Engine & Inline Text Editing', week: 'Weeks 2–3', desc: 'Dynamic web-font loading, floating typography toolbar with font family/size/color controls, inline double-click text editing, auto line-wrapping with bounding box recalculation.' },
  { title: 'Phase 3: Graphic Asset Pipeline — Stickers & Photo Uploads', week: 'Weeks 3–4', desc: 'Categorized sticker gallery, click/drag placement, transform handles. Local photo upload with validation (max 10 MB), canvas instantiation with scaling.' },
  { title: 'Phase 4: Grammarly-Style AI Writing Assistant Integration', week: 'Weeks 4–5', desc: 'Selection listener triggering AI drawer, structured action chips (Fix Grammar, Shorten, Elongate, Heartfelt, Funny, Formal, Poetic), streamed backend responses, diff comparison, Apply/Discard actions.' },
  { title: 'Phase 5: State Persistence, Draft Management & Undo History', week: 'Weeks 5–6', desc: 'Canvas serialisation to JSON, debounced auto-save to localStorage, multi-level undo/redo snapshot stack, offline persistence with sync-on-reconnect indicator.' },
  { title: 'Phase 6: High-Resolution Rendering & Export Engine', week: 'Weeks 6–7', desc: 'Export modal with format selection (PNG, JPEG), html2canvas 2× DPI rasterization, descriptive filenames, blob download trigger.' },
];

/* ================================================================
   2. DOM SELECTORS
================================================================ */

const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

const dom = {
  // Sidebar
  sidebar:           $('#sidebar'),
  btnSidebarToggle:  $('#btn-sidebar-toggle'),
  btnGoHome:         $('#btn-go-home'),
  navItems:          () => $$('.sidebar__nav-item'),
  collectionBadge:   $('#collection-badge'),

  // Theme
  btnThemeToggle:    $('#btn-theme-toggle'),
  themeIcon:         $('#theme-icon'),
  themeLabel:        $('#theme-label'),

  // Topbar
  topbarTitle:       $('#topbar-title'),
  saveStatus:        $('#save-status'),
  undoRedoControls:  $('#undo-redo-controls'),
  btnUndo:           $('#btn-undo'),
  btnRedo:           $('#btn-redo'),

  // Profile / Auth
  btnShowLogin:      $('#btn-show-login'),
  profileMenuWrapper:$('#profile-menu-wrapper'),
  btnProfileMenu:    $('#btn-profile-menu'),
  profileDropdown:   $('#profile-dropdown'),
  profileAvatar:     $('#profile-avatar'),
  profileName:       $('#profile-name'),
  dropdownName:      $('#dropdown-name'),
  dropdownEmail:     $('#dropdown-email'),
  btnSignOut:        $('#btn-sign-out'),

  // Views
  viewCreate:        $('#view-create'),
  viewLogin:         $('#view-login'),
  viewCollections:   $('#view-collections'),
  viewPrd:           $('#view-prd'),
  viewCurrentPlan:   $('#view-current-plan'),

  // Login form
  loginForm:         $('#login-form'),
  loginEmail:        $('#login-email'),
  loginPassword:     $('#login-password'),
  emailError:        $('#email-error'),
  passwordError:     $('#password-error'),
  btnGoogleLogin:    $('#btn-google-login'),

  // Wizard
  wizardBar:         $('#wizard-bar'),
  wizardTabs:        () => $$('.wizard-step[data-step]'),
  wizardCategoryDisplay: $('#wizard-category-display'),
  step1:             $('#step-1'),
  step2:             $('#step-2'),
  step3:             $('#step-3'),
  step4:             $('#step-4'),
  cardTypeGrid:      $('#card-type-grid'),
  formatGrid:        $('#format-grid'),
  themeGrid:         $('#theme-grid'),

  // Studio Toolbar
  cardHeading:       $('#card-heading'),
  cardMessage:       $('#card-message'),
  msgCharCount:      $('#msg-char-count'),
  fontPicker:        $('#font-picker'),
  fontSizeSlider:    $('#font-size-slider'),
  fontSizeValue:     $('#font-size-value'),
  textColor:         $('#text-color'),
  bgColor:           $('#bg-color'),
  alignBtns:         () => $$('.align-btn'),
  stickerGrid:       $('#sticker-grid'),
  uploadZone:        $('#upload-zone'),
  photoUpload:       $('#photo-upload'),
  uploadZoneText:    $('#upload-zone-text'),
  btnRemovePhoto:    $('#btn-remove-photo'),
  btnSaveDraft:      $('#btn-save-draft'),
  btnDownload:       $('#btn-download'),
  btnChangeCategory: $('#btn-change-category'),

  // AI Drawer
  btnAiOpen:         $('#btn-ai-open'),
  aiDrawer:          $('#ai-drawer'),
  btnAiClose:        $('#btn-ai-close'),
  aiSelectedText:    $('#ai-selected-text'),
  aiChips:           $('#ai-chips'),
  aiCustomInput:     $('#ai-custom-input'),
  btnAiCustom:       $('#btn-ai-custom'),
  aiLoading:         $('#ai-loading'),
  aiSuggestion:      $('#ai-suggestion'),
  aiSuggestionText:  $('#ai-suggestion-text'),
  btnAiApply:        $('#btn-ai-apply'),
  btnAiDiscard:      $('#btn-ai-discard'),

  // Export Modal
  exportModal:       $('#export-modal'),
  btnExportConfirm:  $('#btn-export-confirm'),
  btnExportCancel:   $('#btn-export-cancel'),

  // Card Canvas
  canvasContainer:   $('#canvas-container'),
  cardCanvas:        $('#card-canvas'),
  canvasStickers:    $('#canvas-stickers'),
  canvasCategory:    $('#canvas-category'),
  canvasHeading:     $('#canvas-heading'),
  canvasPhotoSlot:   $('#canvas-photo-slot'),
  canvasPhoto:       $('#canvas-photo'),
  canvasMessage:     $('#canvas-message'),

  // Collections
  collectionsGrid:   $('#collections-grid'),
  collectionsEmpty:  $('#collections-empty'),
  btnNewCard:        $('#btn-new-card'),

  // Docs
  btnPrintPrd:       $('#btn-print-prd'),
  btnPrintPlan:      $('#btn-print-plan'),
  planTasks:         $('#plan-tasks'),
  planPhases:        $('#plan-phases'),

  // Toast
  toast:             $('#toast'),
  toastMessage:      $('#toast-message'),
};

/* ================================================================
   3. NAVIGATION & VIEW MANAGEMENT
================================================================ */

/**
 * Navigate to a named view, updating the URL hash and active nav state.
 * @param {string} view - View identifier
 */
function navigateTo(view) {
  state.currentView = view;

  // Hide all views
  const views = {
    'create':        dom.viewCreate,
    'login':         dom.viewLogin,
    'collections':   dom.viewCollections,
    'prd':           dom.viewPrd,
    'current-plan':  dom.viewCurrentPlan,
  };

  Object.entries(views).forEach(([key, el]) => {
    if (!el) return;
    el.hidden = (key !== view);
  });

  // Update topbar title
  const titles = {
    'create':        wizardStepTitle(),
    'login':         'User Authentication',
    'collections':   'My Saved Cards & Drafts',
    'prd':           'Product Requirements Document',
    'current-plan':  'Current Plan (Sprint 1)',
  };
  dom.topbarTitle.textContent = titles[view] || '';

  // Update active sidebar nav item
  dom.navItems().forEach(btn => {
    const isActive = btn.dataset.view === view;
    btn.classList.toggle('sidebar__nav-item--active', isActive);
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  // Show undo/redo only in create view
  if (dom.undoRedoControls) {
    dom.undoRedoControls.style.display = (view === 'create' && state.wizardStep === 4) ? '' : 'none';
  }

  // Close profile dropdown
  closeProfileDropdown();
}

function wizardStepTitle() {
  if (state.wizardStep < 4) return `Card Builder (Step ${state.wizardStep} of 3)`;
  return 'Card Studio';
}

/* ================================================================
   4. SIDEBAR
================================================================ */

function initSidebar() {
  dom.btnSidebarToggle.addEventListener('click', toggleSidebar);
  dom.btnGoHome.addEventListener('click', () => navigateTo('create'));

  // Nav item click delegation
  dom.navItems().forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view) navigateTo(view);
    });
  });
}

function toggleSidebar() {
  state.sidebarOpen = !state.sidebarOpen;
  dom.sidebar.classList.toggle('sidebar--collapsed', !state.sidebarOpen);
  dom.sidebar.classList.toggle('sidebar--open', state.sidebarOpen);
  dom.btnSidebarToggle.setAttribute('title', state.sidebarOpen ? 'Collapse menu' : 'Expand menu');
  dom.btnSidebarToggle.setAttribute('aria-label', state.sidebarOpen ? 'Collapse menu' : 'Expand menu');
}

/* ================================================================
   5. THEME (DARK / LIGHT)
================================================================ */

function initTheme() {
  // Restore preference from localStorage
  const saved = localStorage.getItem('cc-theme');
  if (saved === 'dark') applyTheme(true, false);

  dom.btnThemeToggle.addEventListener('click', () => applyTheme(!state.darkMode));
}

function applyTheme(dark, save = true) {
  state.darkMode = dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  dom.themeIcon.textContent = dark ? '🌙' : '☀️';
  dom.themeLabel.textContent = dark ? 'Dark Theme' : 'Light Theme';
  if (save) localStorage.setItem('cc-theme', dark ? 'dark' : 'light');
}

/* ================================================================
   6. AUTHENTICATION
================================================================ */

const MOCK_USER = {
  name: 'Sophia Martinez',
  email: 'sophia.m@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Sophia+Martinez&background=81c784&color=fff&size=72',
};

function initAuth() {
  // Check if already "logged in" via localStorage
  const savedUser = localStorage.getItem('cc-user');
  if (savedUser) {
    try {
      loginUser(JSON.parse(savedUser), false);
    } catch (_) { /* ignore */ }
  }

  dom.btnShowLogin.addEventListener('click', () => navigateTo('login'));

  // Google OAuth mock
  dom.btnGoogleLogin.addEventListener('click', () => {
    loginUser(MOCK_USER);
    showToast('🍃 Signed in with Google successfully!');
    navigateTo('create');
  });

  // Email / Password login form
  dom.loginForm.addEventListener('submit', e => {
    e.preventDefault();
    if (validateLoginForm()) {
      loginUser({ ...MOCK_USER, email: dom.loginEmail.value });
      showToast('🍃 Welcome back! Logged in successfully.');
      navigateTo('create');
    }
  });

  // Profile menu toggle
  dom.btnProfileMenu.addEventListener('click', toggleProfileDropdown);
  document.addEventListener('click', e => {
    if (!dom.profileMenuWrapper.contains(e.target)) closeProfileDropdown();
  });

  // Sign out
  dom.btnSignOut.addEventListener('click', logoutUser);

  // Profile dropdown nav links
  dom.profileDropdown.addEventListener('click', e => {
    const btn = e.target.closest('[data-view]');
    if (btn) navigateTo(btn.dataset.view);
  });
}

function validateLoginForm() {
  let valid = true;

  // Email
  const email = dom.loginEmail.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    dom.emailError.textContent = 'Please enter a valid email address.';
    dom.loginEmail.classList.add('invalid');
    valid = false;
  } else {
    dom.emailError.textContent = '';
    dom.loginEmail.classList.remove('invalid');
  }

  // Password
  const password = dom.loginPassword.value;
  if (!password || password.length < 6) {
    dom.passwordError.textContent = 'Password must be at least 6 characters.';
    dom.loginPassword.classList.add('invalid');
    valid = false;
  } else {
    dom.passwordError.textContent = '';
    dom.loginPassword.classList.remove('invalid');
  }

  return valid;
}

function loginUser(user, save = true) {
  state.user = user;
  if (save) localStorage.setItem('cc-user', JSON.stringify(user));

  // Show profile, hide login button
  dom.btnShowLogin.hidden = true;
  dom.profileMenuWrapper.hidden = false;

  // Populate profile UI
  dom.profileAvatar.src = user.avatar;
  dom.profileAvatar.alt = user.name;
  dom.profileName.textContent = user.name;
  dom.dropdownName.textContent = user.name;
  dom.dropdownEmail.textContent = user.email;
}

function logoutUser() {
  state.user = null;
  localStorage.removeItem('cc-user');

  dom.btnShowLogin.hidden = false;
  dom.profileMenuWrapper.hidden = true;
  closeProfileDropdown();

  showToast('You have been signed out.');
  navigateTo('login');
}

function toggleProfileDropdown() {
  const open = dom.profileDropdown.hidden;
  dom.profileDropdown.hidden = !open;
  dom.btnProfileMenu.setAttribute('aria-expanded', String(!open));
}

function closeProfileDropdown() {
  dom.profileDropdown.hidden = true;
  dom.btnProfileMenu.setAttribute('aria-expanded', 'false');
}

/* ================================================================
   7. WIZARD: CARD TYPE, FORMAT, THEME
================================================================ */

function initWizard() {
  renderCardTypes();
  renderFormats();
  renderThemes();

  // Wizard tab click navigation
  dom.wizardTabs().forEach(tab => {
    tab.addEventListener('click', () => {
      const step = parseInt(tab.dataset.step, 10);
      // Only allow navigating to already-visited or current step
      if (step <= state.wizardStep) goToWizardStep(step);
    });
  });
}

function renderCardTypes() {
  dom.cardTypeGrid.innerHTML = CARD_TYPES.map(ct => `
    <div
      class="card-type-item${state.card.category === ct.id ? ' card-type-item--selected' : ''}"
      role="listitem"
      tabindex="0"
      data-type-id="${ct.id}"
      aria-label="${ct.title}"
    >
      <span class="card-type-item__icon" aria-hidden="true">${ct.icon}</span>
      <h3 class="card-type-item__title">${ct.title}</h3>
      <p class="card-type-item__desc">${ct.desc}</p>
    </div>
  `).join('');

  dom.cardTypeGrid.querySelectorAll('.card-type-item').forEach(item => {
    const handler = () => {
      const id = item.dataset.typeId;
      updateCard({ category: id, id: 'card_' + Date.now() }, false);
      // Update selection highlight
      dom.cardTypeGrid.querySelectorAll('.card-type-item').forEach(i => i.classList.remove('card-type-item--selected'));
      item.classList.add('card-type-item--selected');
      updateWizardCategoryDisplay();
      goToWizardStep(2);
    };
    item.addEventListener('click', handler);
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}

function renderFormats() {
  dom.formatGrid.innerHTML = FORMATS.map(fmt => `
    <div
      class="format-item${state.card.format === fmt.id ? ' format-item--selected' : ''}"
      role="listitem"
      tabindex="0"
      data-format-id="${fmt.id}"
      aria-label="${fmt.name}"
    >
      <div class="format-item__preview" style="width:${fmt.w}px;height:${fmt.h}px;" aria-hidden="true">Preview</div>
      <h3 class="format-item__title">${fmt.name}</h3>
      <p class="format-item__desc">${fmt.desc}</p>
    </div>
  `).join('');

  dom.formatGrid.querySelectorAll('.format-item').forEach(item => {
    const handler = () => {
      const id = item.dataset.formatId;
      updateCard({ format: id }, false);
      dom.formatGrid.querySelectorAll('.format-item').forEach(i => i.classList.remove('format-item--selected'));
      item.classList.add('format-item--selected');
      goToWizardStep(3);
    };
    item.addEventListener('click', handler);
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}

function renderThemes() {
  dom.themeGrid.innerHTML = THEMES.map(thm => `
    <div
      class="theme-item${state.card.theme === thm.id ? ' theme-item--selected' : ''}"
      role="listitem"
      tabindex="0"
      data-theme-id="${thm.id}"
      aria-label="${thm.name}"
    >
      <div class="theme-item__swatch" style="background:${thm.swatchBg};color:${thm.swatchColor};font-family:var(--font-${thm.font})" aria-hidden="true">
        Sample Text
      </div>
      <h3 class="theme-item__name">${thm.name}</h3>
      <p class="theme-item__desc">${thm.desc}</p>
      <button class="theme-item__select-btn" tabindex="-1" aria-hidden="true">Select Theme</button>
    </div>
  `).join('');

  dom.themeGrid.querySelectorAll('.theme-item').forEach(item => {
    const handler = () => {
      const id = item.dataset.themeId;
      const thm = THEMES.find(t => t.id === id);
      if (!thm) return;

      pushHistory();
      updateCard({ theme: thm.id, bgColor: thm.bgColor, textColor: thm.textColor, font: thm.font }, false);

      dom.themeGrid.querySelectorAll('.theme-item').forEach(i => i.classList.remove('theme-item--selected'));
      item.classList.add('theme-item--selected');

      // Sync toolbar inputs
      syncToolbarFromState();
      goToWizardStep(4);
    };
    item.addEventListener('click', handler);
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });
}

function goToWizardStep(step) {
  state.wizardStep = step;

  // Panel visibility
  [dom.step1, dom.step2, dom.step3, dom.step4].forEach((panel, i) => {
    panel.hidden = (i + 1 !== step);
  });

  // Wizard tabs styling
  dom.wizardTabs().forEach(tab => {
    const tabStep = parseInt(tab.dataset.step, 10);
    tab.classList.toggle('wizard-step--active', tabStep === step);
    tab.classList.toggle('wizard-step--done', tabStep < step);
    tab.setAttribute('aria-current', tabStep === step ? 'step' : 'false');
  });

  // Update topbar title
  dom.topbarTitle.textContent = wizardStepTitle();

  // Show undo/redo in studio
  if (dom.undoRedoControls) {
    dom.undoRedoControls.style.display = step === 4 ? '' : 'none';
  }
}

function updateWizardCategoryDisplay() {
  dom.wizardCategoryDisplay.innerHTML = `Category: <strong>${state.card.category}</strong>`;
}

/* ================================================================
   8. STUDIO EDITOR (Step 4)
================================================================ */

function initStudio() {
  renderFontPicker();
  renderStickerGrid();

  // Heading
  dom.cardHeading.addEventListener('input', () => {
    pushHistory();
    updateCard({ heading: dom.cardHeading.value });
  });

  // Message
  dom.cardMessage.addEventListener('input', () => {
    pushHistory();
    const val = dom.cardMessage.value;
    updateCard({ message: val });
    dom.msgCharCount.textContent = `${val.length} / 500`;
    // Update AI drawer preview
    dom.aiSelectedText.textContent = val;
  });

  // Font size slider
  dom.fontSizeSlider.addEventListener('input', () => {
    const size = parseInt(dom.fontSizeSlider.value, 10);
    dom.fontSizeValue.textContent = size;
    pushHistory();
    updateCard({ fontSize: size });
  });

  // Text color
  dom.textColor.addEventListener('input', () => {
    pushHistory();
    updateCard({ textColor: dom.textColor.value });
  });

  // Background color
  dom.bgColor.addEventListener('input', () => {
    pushHistory();
    updateCard({ bgColor: dom.bgColor.value });
  });

  // Text alignment
  dom.alignBtns().forEach(btn => {
    btn.addEventListener('click', () => {
      const align = btn.dataset.align;
      dom.alignBtns().forEach(b => {
        b.classList.toggle('align-btn--active', b.dataset.align === align);
        b.setAttribute('aria-pressed', String(b.dataset.align === align));
      });
      pushHistory();
      updateCard({ textAlign: align });
    });
  });

  // Photo upload
  dom.photoUpload.addEventListener('change', handlePhotoUpload);
  dom.btnRemovePhoto.addEventListener('click', removePhoto);

  // Save draft
  dom.btnSaveDraft.addEventListener('click', saveDraft);

  // Download
  dom.btnDownload.addEventListener('click', openExportModal);

  // Change category (go back to step 1)
  dom.btnChangeCategory.addEventListener('click', () => goToWizardStep(1));

  // Collections new card
  if (dom.btnNewCard) dom.btnNewCard.addEventListener('click', startNewCard);
}

function renderFontPicker() {
  dom.fontPicker.innerHTML = FONTS.map(f => `
    <button
      class="font-btn${state.card.font === f.id ? ' font-btn--active' : ''}"
      data-font-id="${f.id}"
      aria-pressed="${state.card.font === f.id}"
      title="${f.label}"
      style="font-family: ${f.family}"
    >
      <span class="font-btn__sample">${f.sample}</span>
      <span class="font-btn__name">${f.label}</span>
    </button>
  `).join('');

  dom.fontPicker.querySelectorAll('.font-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.fontId;
      dom.fontPicker.querySelectorAll('.font-btn').forEach(b => {
        b.classList.toggle('font-btn--active', b.dataset.fontId === id);
        b.setAttribute('aria-pressed', String(b.dataset.fontId === id));
      });
      pushHistory();
      updateCard({ font: id });
    });
  });
}

function renderStickerGrid() {
  dom.stickerGrid.innerHTML = STICKERS.map(stk => `
    <button
      class="sticker-btn${state.card.stickers.includes(stk) ? ' sticker-btn--active' : ''}"
      data-sticker="${stk}"
      title="${state.card.stickers.includes(stk) ? 'Remove sticker' : 'Add sticker'}"
      aria-pressed="${state.card.stickers.includes(stk)}"
    >${stk}</button>
  `).join('');

  dom.stickerGrid.querySelectorAll('.sticker-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const stk = btn.dataset.sticker;
      const isActive = state.card.stickers.includes(stk);
      pushHistory();
      const newStickers = isActive
        ? state.card.stickers.filter(s => s !== stk)
        : [...state.card.stickers, stk];
      updateCard({ stickers: newStickers });
      btn.classList.toggle('sticker-btn--active', !isActive);
      btn.setAttribute('aria-pressed', String(!isActive));
      btn.title = !isActive ? 'Remove sticker' : 'Add sticker';
      showToast(isActive ? `Removed ${stk}` : `Added ${stk}`);
    });
  });
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  // Validate type
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    showToast('⚠️ Unsupported file type. Please upload PNG, JPEG, or WebP.');
    return;
  }

  // Validate size (10 MB max)
  if (file.size > 10 * 1024 * 1024) {
    showToast('⚠️ Photo is too large. Maximum allowed size is 10 MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = ev => {
    pushHistory();
    updateCard({ photoDataUrl: ev.target.result });
    dom.uploadZoneText.textContent = file.name;
    dom.btnRemovePhoto.hidden = false;
    showToast('📷 Photo attached to your card!');
  };
  reader.readAsDataURL(file);
}

function removePhoto() {
  pushHistory();
  updateCard({ photoDataUrl: null });
  dom.photoUpload.value = '';
  dom.uploadZoneText.textContent = 'Click to attach a photo';
  dom.btnRemovePhoto.hidden = true;
  showToast('Photo removed.');
}

/**
 * Sync toolbar input values from current state
 * (called when loading a draft or switching theme)
 */
function syncToolbarFromState() {
  const c = state.card;
  dom.cardHeading.value = c.heading;
  dom.cardMessage.value = c.message;
  dom.msgCharCount.textContent = `${c.message.length} / 500`;
  dom.fontSizeSlider.value = c.fontSize;
  dom.fontSizeValue.textContent = c.fontSize;
  dom.textColor.value = c.textColor;
  dom.bgColor.value = c.bgColor;
  dom.aiSelectedText.textContent = c.message;

  // Alignment
  dom.alignBtns().forEach(btn => {
    const active = btn.dataset.align === c.textAlign;
    btn.classList.toggle('align-btn--active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  // Font picker re-render
  renderFontPicker();

  // Sticker grid re-render
  renderStickerGrid();

  // Photo
  if (c.photoDataUrl) {
    dom.uploadZoneText.textContent = 'Photo attached';
    dom.btnRemovePhoto.hidden = false;
  } else {
    dom.uploadZoneText.textContent = 'Click to attach a photo';
    dom.btnRemovePhoto.hidden = true;
  }
}

/* ================================================================
   9. CANVAS LIVE UPDATES
================================================================ */

/**
 * Update state.card properties and re-render the canvas.
 * @param {Object} patch - Partial card state to merge
 * @param {boolean} render - Whether to re-render canvas (default: true)
 */
function updateCard(patch, render = true) {
  Object.assign(state.card, patch);
  if (render) renderCanvas();
  updateWizardCategoryDisplay();
  scheduleAutoSave();
}

function renderCanvas() {
  const c = state.card;

  // Background
  dom.cardCanvas.style.backgroundColor = c.bgColor;

  // Get font family from FONTS list
  const fontObj = FONTS.find(f => f.id === c.font) || FONTS[0];
  const fontFamily = fontObj.family;

  // Heading
  dom.canvasHeading.textContent = c.heading;
  dom.canvasHeading.style.color = c.textColor;
  dom.canvasHeading.style.fontFamily = fontFamily;
  dom.canvasHeading.style.fontSize = `${Math.round(c.fontSize * 1.1)}px`;
  dom.canvasHeading.style.textAlign = c.textAlign;

  // Message
  dom.canvasMessage.textContent = `"${c.message}"`;
  dom.canvasMessage.style.color = c.textColor;
  dom.canvasMessage.style.fontFamily = fontFamily;
  dom.canvasMessage.style.fontSize = `${c.fontSize * 0.55}px`;
  dom.canvasMessage.style.textAlign = c.textAlign;

  // Category badge
  dom.canvasCategory.textContent = c.category;

  // Stickers
  dom.canvasStickers.innerHTML = c.stickers.map((stk, i) =>
    `<span class="canvas-sticker" style="animation-delay:${i * 0.2}s" aria-hidden="true">${stk}</span>`
  ).join('');

  // Photo
  if (c.photoDataUrl) {
    dom.canvasPhoto.src = c.photoDataUrl;
    dom.canvasPhotoSlot.hidden = false;
  } else {
    dom.canvasPhotoSlot.hidden = true;
    dom.canvasPhoto.src = '';
  }

  // Canvas footer color
  const footer = dom.cardCanvas.querySelector('.card-canvas__footer');
  if (footer) footer.style.color = c.textColor;
}

/* ================================================================
   10. AI WRITING ASSISTANT
================================================================ */

function initAiDrawer() {
  // Build AI chips
  dom.aiChips.innerHTML = AI_ACTIONS.map(a => `
    <button class="ai-chip" data-ai-action="${a.id}" aria-label="${a.label.replace(/[^\w\s]/g, '')}">${a.label}</button>
  `).join('');

  dom.aiChips.querySelectorAll('.ai-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const action = AI_ACTIONS.find(a => a.id === chip.dataset.aiAction);
      if (action) triggerAiAction(action.fn);
    });
  });

  // Open / close
  dom.btnAiOpen.addEventListener('click', openAiDrawer);
  dom.btnAiClose.addEventListener('click', closeAiDrawer);

  // Custom instruction
  dom.btnAiCustom.addEventListener('click', () => {
    const instruction = dom.aiCustomInput.value.trim();
    if (!instruction) return;
    triggerAiAction(() => customInstruction(instruction));
  });
  dom.aiCustomInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dom.btnAiCustom.click();
    }
  });

  // Apply / Discard
  dom.btnAiApply.addEventListener('click', applyAiSuggestion);
  dom.btnAiDiscard.addEventListener('click', discardAiSuggestion);
}

function openAiDrawer() {
  dom.aiDrawer.hidden = false;
  dom.aiSelectedText.textContent = state.card.message;
  // Reset suggestion panel
  discardAiSuggestion();
}

function closeAiDrawer() {
  dom.aiDrawer.hidden = true;
  discardAiSuggestion();
}

/**
 * Simulate an AI transformation with a short delay (streaming effect).
 * @param {Function} transformFn - Function(text) => string
 */
function triggerAiAction(transformFn) {
  dom.aiLoading.hidden = false;
  dom.aiSuggestion.hidden = true;
  state.aiSuggestion = null;

  // Simulate network latency (200–800 ms)
  const delay = 200 + Math.random() * 600;
  setTimeout(() => {
    const result = transformFn(state.card.message);
    state.aiSuggestion = result;
    dom.aiLoading.hidden = true;
    dom.aiSuggestion.hidden = false;
    dom.aiSuggestionText.textContent = result;
    showToast('✨ AI suggestion ready! Review below.');
  }, delay);
}

function applyAiSuggestion() {
  if (!state.aiSuggestion) return;
  pushHistory();
  updateCard({ message: state.aiSuggestion });
  dom.cardMessage.value = state.aiSuggestion;
  dom.msgCharCount.textContent = `${state.aiSuggestion.length} / 500`;
  dom.aiSelectedText.textContent = state.aiSuggestion;
  discardAiSuggestion();
  showToast('✅ AI suggestion applied to your card!');
}

function discardAiSuggestion() {
  state.aiSuggestion = null;
  dom.aiSuggestion.hidden = true;
  dom.aiLoading.hidden = true;
  dom.aiSuggestionText.textContent = '';
}

/* --- AI Transformation Functions ---
   These would connect to an LLM backend in production.
   For this frontend sprint, they use carefully crafted heuristics.
*/

function fixGrammar(text) {
  // Capitalise first letter of each sentence, fix common issues
  return text
    .replace(/\s{2,}/g, ' ')
    .replace(/([.!?])\s*([a-z])/g, (_, p, c) => `${p} ${c.toUpperCase()}`)
    .replace(/^[a-z]/, c => c.toUpperCase())
    .trim();
}

function shortenText(text) {
  const words = text.trim().split(/\s+/);
  if (words.length <= 8) return text;
  // Keep roughly first 40% of words, add ellipsis
  const kept = words.slice(0, Math.max(8, Math.floor(words.length * 0.4)));
  // Remove trailing prepositions/conjunctions
  const stopWords = ['and','or','but','for','with','the','a','an','in','of','to'];
  while (kept.length > 1 && stopWords.includes(kept[kept.length - 1].toLowerCase())) kept.pop();
  return kept.join(' ') + (kept[kept.length - 1].endsWith('!') || kept[kept.length - 1].endsWith('.') ? '' : '!');
}

function elongateText(text) {
  const openers = [
    'Words truly cannot express how deeply ',
    'From the bottom of my heart, ',
    'With the warmest sincerity and gratitude, ',
    'Each day I am reminded how wonderful it is that ',
  ];
  const closers = [
    ' Your kindness brightens every corner of my world.',
    ' I am forever grateful for your presence in my life.',
    ' Thank you for being such an extraordinary light.',
    ' May this small message carry my deepest appreciation.',
  ];
  const opener = openers[Math.floor(Math.random() * openers.length)];
  const closer = closers[Math.floor(Math.random() * closers.length)];
  return opener + text.replace(/^[A-Z]/, c => c.toLowerCase()) + closer;
}

function makeHeartfelt(text) {
  return `💛 Sending you my warmest embrace and deepest gratitude. ${text} You mean more than words can say.`;
}

function makeFunny(text) {
  const quips = [
    ` P.S. You owe me a coffee now! ☕😄`,
    ` Seriously though, you're the best — and I'm not just saying that! 🎉`,
    ` (Also, I'm totally not bribing you with this card. Totally.) 😏`,
    ` Warning: excessive awesomeness detected in the recipient of this card. 🚀`,
  ];
  const quip = quips[Math.floor(Math.random() * quips.length)];
  return text + quip;
}

function makeFormal(text) {
  return `Please accept my most sincere regards and warmest appreciation. ${
    text.replace(/!/g, '.').replace(/\s+/g, ' ').trim()
  } I remain, with the utmost respect, yours faithfully.`;
}

function makePoetic(text) {
  const lines = [
    `In the quiet language of the heart,`,
    `where words become the wings of feeling —`,
    `${text}`,
    `And so this card carries what words alone cannot:`,
    `a moment of warmth, folded just for you. 🌿`,
  ];
  return lines.join('\n');
}

function customInstruction(instruction) {
  // Simulate: prefix the instruction as if the AI followed it
  const prefixes = [
    `Following your instruction ("${instruction}"): `,
    `As requested — "${instruction}": `,
  ];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  return prefix + state.card.message;
}

/* ================================================================
   11. EXPORT (JPEG / PNG via html2canvas)
================================================================ */

function initExport() {
  dom.btnExportConfirm.addEventListener('click', confirmExport);
  dom.btnExportCancel.addEventListener('click', () => { dom.exportModal.hidden = true; });
}

function openExportModal() {
  dom.exportModal.hidden = false;
}

function confirmExport() {
  dom.exportModal.hidden = true;
  const fmt = document.querySelector('input[name="export-format"]:checked')?.value || 'jpeg';
  exportCard(fmt);
}

function exportCard(format) {
  showToast('⏳ Generating your card image…');

  // Temporarily remove decorative animations for clean capture
  const stickers = dom.canvasStickers.querySelectorAll('.canvas-sticker');
  stickers.forEach(s => s.style.animation = 'none');

  // Use 2× scale for higher DPI output
  html2canvas(dom.cardCanvas, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  }).then(canvas => {
    // Restore animations
    stickers.forEach(s => s.style.animation = '');

    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
    const ext = format === 'png' ? 'png' : 'jpg';
    const quality = format === 'jpeg' ? 0.92 : undefined;

    const category = state.card.category.replace(/\s+/g, '_');
    const filename = `My_${category}_Card_CardCraft.${ext}`;

    canvas.toBlob(blob => {
      if (!blob) {
        showToast('⚠️ Export failed. Please try again.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      showToast(`✅ Card downloaded as ${filename}!`);
    }, mimeType, quality);
  }).catch(err => {
    console.error('Export failed:', err);
    stickers.forEach(s => s.style.animation = '');
    showToast('⚠️ Export failed. Please try again.');
  });
}

/* ================================================================
   12. MY COLLECTIONS
================================================================ */

function initCollections() {
  // Load from localStorage
  const saved = localStorage.getItem('cc-collections');
  if (saved) {
    try {
      state.collections = JSON.parse(saved);
    } catch (_) {
      state.collections = [];
    }
  }
  updateCollectionBadge();
}

function saveCollections() {
  localStorage.setItem('cc-collections', JSON.stringify(state.collections));
  updateCollectionBadge();
}

function saveDraft() {
  const c = state.card;
  const existing = state.collections.findIndex(x => x.id === c.id);
  const entry = {
    id: c.id || ('card_' + Date.now()),
    title: c.heading || 'Untitled Card',
    category: c.category,
    format: c.format,
    theme: c.theme,
    message: c.message,
    font: c.font,
    fontSize: c.fontSize,
    textColor: c.textColor,
    bgColor: c.bgColor,
    textAlign: c.textAlign,
    stickers: [...c.stickers],
    photoDataUrl: c.photoDataUrl,
    updatedAt: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
    isDraft: true,
  };

  if (existing >= 0) {
    state.collections[existing] = entry;
  } else {
    state.card.id = entry.id;
    state.collections.unshift(entry);
  }

  saveCollections();
  showToast('💾 Draft saved in My Collections!');
}

function startNewCard() {
  state.card = {
    id: 'card_' + Date.now(),
    category: 'Gratitude',
    format: 'Folding Vertical',
    theme: 'Soft Botanical',
    heading: 'A Heartfelt Thank You',
    message: 'Thank you for your warmth, guidance, and endless kindness. You make the world a brighter place every day!',
    font: 'playfair',
    fontSize: 28,
    textColor: '#325d3f',
    bgColor: '#e1efe5',
    textAlign: 'center',
    stickers: ['🌿', '✨'],
    photoDataUrl: null,
    isDraft: true,
  };
  state.undoStack = [];
  state.redoStack = [];
  updateUndoRedoButtons();

  syncToolbarFromState();
  renderCanvas();
  updateWizardCategoryDisplay();
  goToWizardStep(1);
  navigateTo('create');
}

function loadCard(card) {
  state.card = { ...card, stickers: [...(card.stickers || [])] };
  state.undoStack = [];
  state.redoStack = [];
  updateUndoRedoButtons();

  syncToolbarFromState();
  renderCanvas();
  updateWizardCategoryDisplay();
  goToWizardStep(4);
  navigateTo('create');
}

function duplicateCard(cardId) {
  const original = state.collections.find(c => c.id === cardId);
  if (!original) return;
  const dup = {
    ...original,
    id: 'card_' + Date.now(),
    title: original.title + ' (Copy)',
    updatedAt: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
  };
  state.collections.unshift(dup);
  saveCollections();
  renderCollections();
  showToast('📋 Card duplicated in Collections!');
}

function deleteCard(cardId) {
  state.collections = state.collections.filter(c => c.id !== cardId);
  saveCollections();
  renderCollections();
  showToast('🗑️ Card deleted from collection.');
}

function renderCollections() {
  const cols = state.collections;

  if (cols.length === 0) {
    dom.collectionsGrid.innerHTML = '';
    dom.collectionsEmpty.hidden = false;
    return;
  }

  dom.collectionsEmpty.hidden = true;
  dom.collectionsGrid.innerHTML = cols.map(card => `
    <article class="collection-card" role="listitem" aria-label="${escapeHtml(card.title)}">
      <div class="collection-card__header">
        <span class="collection-card__tag">${escapeHtml(card.category)}</span>
        <span class="collection-card__status ${card.isDraft ? 'collection-card__status--draft' : 'collection-card__status--done'}">
          ${card.isDraft ? 'Draft' : 'Completed'}
        </span>
      </div>
      <h3 class="collection-card__title">${escapeHtml(card.title)}</h3>
      <p class="collection-card__message">"${escapeHtml(card.message)}"</p>
      <div class="collection-card__stickers" aria-hidden="true">${(card.stickers || []).join('')}</div>
      <div class="collection-card__footer">
        <span class="collection-card__date">Edited: ${escapeHtml(card.updatedAt)}</span>
        <div class="collection-card__actions">
          <button class="btn btn--secondary btn--sm" data-action="edit" data-id="${card.id}" aria-label="Edit ${escapeHtml(card.title)}">Edit / Open</button>
          <button class="btn btn--ghost btn--sm" data-action="dup" data-id="${card.id}" aria-label="Duplicate ${escapeHtml(card.title)}">📋</button>
          <button class="btn btn--ghost btn--sm" style="color:var(--danger-text)" data-action="del" data-id="${card.id}" aria-label="Delete ${escapeHtml(card.title)}">🗑️</button>
        </div>
      </div>
    </article>
  `).join('');

  // Event delegation for collection actions
  dom.collectionsGrid.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const { action, id } = btn.dataset;
      const card = state.collections.find(c => c.id === id);
      if (action === 'edit' && card) loadCard(card);
      if (action === 'dup') duplicateCard(id);
      if (action === 'del') deleteCard(id);
    });
  });
}

function updateCollectionBadge() {
  dom.collectionBadge.textContent = state.collections.length;
}

// Auto-save debounce
let autoSaveTimer = null;
function scheduleAutoSave() {
  if (state.wizardStep !== 4) return;
  clearTimeout(autoSaveTimer);
  dom.saveStatus.textContent = 'Saving…';
  autoSaveTimer = setTimeout(() => {
    // Only auto-save if user has entered something meaningful
    if (state.card.heading || state.card.message) {
      // Silently update or add to collections
      const existing = state.collections.findIndex(x => x.id === state.card.id);
      const entry = {
        ...state.card,
        id: state.card.id || ('card_' + Date.now()),
        title: state.card.heading || 'Untitled Card',
        updatedAt: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
        stickers: [...state.card.stickers],
        isDraft: true,
      };
      if (existing >= 0) {
        state.collections[existing] = entry;
      } else {
        state.card.id = entry.id;
        state.collections.unshift(entry);
      }
      saveCollections();
    }
    dom.saveStatus.textContent = 'All changes saved ✓';
    setTimeout(() => { dom.saveStatus.textContent = ''; }, 3000);
  }, 3000);
}

/* ================================================================
   13. DOCUMENT VIEWS
================================================================ */

function initDocViews() {
  // PRD print
  dom.btnPrintPrd.addEventListener('click', () => window.print());

  // Current Plan print
  dom.btnPrintPlan.addEventListener('click', () => window.print());

  // Populate sprint tasks
  if (dom.planTasks) {
    dom.planTasks.innerHTML = SPRINT_TASKS.map(t => `
      <div class="plan-task-row">
        <div class="plan-task-left">
          <span class="plan-task-id">${t.id}</span>
          <span>${escapeHtml(t.task)}</span>
        </div>
        <div class="plan-task-right">
          <span class="plan-task-owner">${t.owner}</span>
          <span class="plan-task-status plan-task-status--${t.status}">
            ${t.status === 'done' ? 'Completed' : t.status === 'progress' ? 'In Progress' : 'Ready for Review'}
          </span>
        </div>
      </div>
    `).join('');
  }

  // Populate plan phases
  if (dom.planPhases) {
    dom.planPhases.innerHTML = PLAN_PHASES.map(p => `
      <div class="plan-phase">
        <div class="plan-phase__header">
          <span>${escapeHtml(p.title)}</span>
          <span class="plan-phase__week">${p.week}</span>
        </div>
        <p class="plan-phase__desc">${escapeHtml(p.desc)}</p>
      </div>
    `).join('');
  }
}

/* ================================================================
   14. TOAST NOTIFICATION
================================================================ */

let toastTimer = null;

function showToast(message) {
  dom.toastMessage.textContent = message;
  dom.toast.hidden = false;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    dom.toast.hidden = true;
  }, 3200);
}

/* ================================================================
   15. UNDO / REDO HISTORY
================================================================ */

function pushHistory() {
  // Deep clone the current card state
  state.undoStack.push(JSON.stringify(state.card));
  // Cap stack at 50 entries to avoid memory bloat
  if (state.undoStack.length > 50) state.undoStack.shift();
  // Any new action clears the redo stack
  state.redoStack = [];
  updateUndoRedoButtons();
}

function undo() {
  if (state.undoStack.length === 0) return;
  state.redoStack.push(JSON.stringify(state.card));
  const previous = state.undoStack.pop();
  state.card = JSON.parse(previous);
  syncToolbarFromState();
  renderCanvas();
  updateUndoRedoButtons();
  showToast('↩️ Undone');
}

function redo() {
  if (state.redoStack.length === 0) return;
  state.undoStack.push(JSON.stringify(state.card));
  const next = state.redoStack.pop();
  state.card = JSON.parse(next);
  syncToolbarFromState();
  renderCanvas();
  updateUndoRedoButtons();
  showToast('↪️ Redone');
}

function updateUndoRedoButtons() {
  dom.btnUndo.disabled = state.undoStack.length === 0;
  dom.btnRedo.disabled = state.redoStack.length === 0;
}

function initUndoRedo() {
  dom.btnUndo.addEventListener('click', undo);
  dom.btnRedo.addEventListener('click', redo);
}

/* ================================================================
   16. KEYBOARD SHORTCUTS
================================================================ */

function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    // Ctrl+Z / Cmd+Z — Undo
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
      if (state.wizardStep === 4 && state.currentView === 'create') {
        e.preventDefault();
        undo();
      }
    }

    // Ctrl+Y / Ctrl+Shift+Z / Cmd+Shift+Z — Redo
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
      if (state.wizardStep === 4 && state.currentView === 'create') {
        e.preventDefault();
        redo();
      }
    }

    // Escape — close export modal or AI drawer
    if (e.key === 'Escape') {
      if (!dom.exportModal.hidden) dom.exportModal.hidden = true;
      if (!dom.aiDrawer.hidden) closeAiDrawer();
      if (!dom.profileDropdown.hidden) closeProfileDropdown();
    }
  });
}

/* ================================================================
   17. UTILITY
================================================================ */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ================================================================
   18. INITIALISATION
================================================================ */

/**
 * Bootstraps the entire application when DOM is ready.
 */
function init() {
  initTheme();
  initSidebar();
  initAuth();
  initWizard();
  initStudio();
  initAiDrawer();
  initExport();
  initCollections();
  initDocViews();
  initUndoRedo();
  initKeyboardShortcuts();

  // Wire up view navigation for collections view render-on-show
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-view]');
    if (btn && btn.dataset.view === 'collections') {
      renderCollections();
    }
  });

  // Set initial canvas state
  syncToolbarFromState();
  renderCanvas();
  updateWizardCategoryDisplay();

  // Navigate to home view
  navigateTo('create');
  goToWizardStep(1);

  // Update undo/redo visibility
  updateUndoRedoButtons();
}

// Boot when DOM is fully parsed
document.addEventListener('DOMContentLoaded', init);
