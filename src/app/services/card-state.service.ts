import { Injectable, signal, computed } from '@angular/core';
import { 
  UserProfile, 
  CardOccasion, 
  CardFormat, 
  CardTheme, 
  CanvasElement, 
  SavedCard, 
  OccasionType 
} from '../models/card.models';
import { 
  CARD_OCCASIONS, 
  CARD_FORMATS, 
  CARD_THEMES, 
  STICKER_LIBRARY, 
  SAMPLE_PHOTOS 
} from '../constants/card-data.constants';

@Injectable({
  providedIn: 'root'
})
export class CardStateService {
  // --- Auth & Profile State ---
  readonly userProfile = signal<UserProfile>({
    name: 'Guest User',
    email: '',
    avatar: '',
    isLoggedIn: false,
    authProvider: 'none'
  });

  // --- Theme State (Dark / Light) ---
  readonly isDarkMode = signal<boolean>(false);

  // --- Sidebar Collapse State ---
  readonly isSidebarMinimized = signal<boolean>(false);

  // --- Current Active View ---
  // 'wizard' | 'editor' | 'collections' | 'login'
  readonly currentView = signal<'wizard' | 'editor' | 'collections' | 'login'>('login');

  // --- Wizard Step (1: Occasion, 2: Format, 3: Theme) ---
  readonly wizardStep = signal<number>(1);

  // --- Active Card Selection ---
  readonly selectedOccasion = signal<CardOccasion>(CARD_OCCASIONS[0]);
  readonly selectedFormat = signal<CardFormat>(CARD_FORMATS[0]);
  readonly selectedTheme = signal<CardTheme>(CARD_THEMES[0]);
  readonly cardTitle = signal<string>('My Special Card');

  // --- Active Card Canvas Elements ---
  readonly canvasElements = signal<CanvasElement[]>([]);
  readonly selectedElementId = signal<string | null>(null);

  // --- Saved Collections (Drafts & Final Cards) ---
  readonly savedCards = signal<SavedCard[]>([]);

  // --- AI Chatbot Drawer State ---
  readonly isAiDrawerOpen = signal<boolean>(false);
  readonly aiMessages = signal<Array<{ sender: 'user' | 'ai'; text: string; actionType?: string }>>([
    {
      sender: 'ai',
      text: "👋 Hi! I'm your AI Writing Assistant. I can help refine, rephrase, shorten, elongate, or tune the tone of your card message."
    }
  ]);
  readonly isAiThinking = signal<boolean>(false);

  constructor() {
    this.loadInitialState();
  }

  private loadInitialState() {
    // 1. Load Theme preference
    const savedTheme = localStorage.getItem('bloomnote_theme');
    if (savedTheme === 'dark') {
      this.setDarkMode(true);
    } else {
      this.setDarkMode(false);
    }

    // 2. Load Saved Cards from LocalStorage
    const savedCardsJson = localStorage.getItem('bloomnote_collections');
    if (savedCardsJson) {
      try {
        const cards: SavedCard[] = JSON.parse(savedCardsJson);
        this.savedCards.set(cards);
      } catch (e) {
        this.savedCards.set(this.getDemoCollections());
      }
    } else {
      const demo = this.getDemoCollections();
      this.savedCards.set(demo);
      this.saveCollectionsToStorage(demo);
    }

    // Initialize Default Canvas Elements based on initial occasion
    this.resetCanvasToDefaults();
  }

  // --- Theme Toggle ---
  toggleDarkMode() {
    this.setDarkMode(!this.isDarkMode());
  }

  setDarkMode(isDark: boolean) {
    this.isDarkMode.set(isDark);
    localStorage.setItem('bloomnote_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }

  // --- Sidebar Collapse ---
  toggleSidebar() {
    this.isSidebarMinimized.update(val => !val);
  }

  // --- Auth Actions ---
  loginWithGoogle() {
    this.userProfile.set({
      name: 'Elena Rostova',
      email: 'elena.rostova@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      isLoggedIn: true,
      authProvider: 'google'
    });
  }

  logout() {
    this.userProfile.set({
      name: 'Guest User',
      email: '',
      avatar: '',
      isLoggedIn: false,
      authProvider: 'email'
    });
    this.currentView.set('login');
  }

  // --- Navigation & Wizard Flow ---
  startNewCard() {
    this.wizardStep.set(1);
    this.currentView.set('wizard');
    this.resetCanvasToDefaults();
  }

  openCollectionsView() {
    this.currentView.set('collections');
  }

  selectOccasion(occ: CardOccasion) {
    this.selectedOccasion.set(occ);
    this.cardTitle.set(`${occ.title} for a Friend`);
    this.wizardStep.set(2);
  }

  selectFormat(fmt: CardFormat) {
    this.selectedFormat.set(fmt);
    this.wizardStep.set(3);
  }

  selectThemeAndProceed(theme: CardTheme) {
    this.selectedTheme.set(theme);
    this.resetCanvasToDefaults();
    this.currentView.set('editor');
  }

  goToStep(step: number) {
    this.wizardStep.set(step);
    this.currentView.set('wizard');
  }

  // --- Canvas Manipulation ---
  resetCanvasToDefaults() {
    const occ = this.selectedOccasion();
    const th = this.selectedTheme();

    const initialElements: CanvasElement[] = [
      {
        id: 'el-badge',
        type: 'text',
        content: `~ ${occ.badge.toUpperCase()} ~`,
        x: 50,
        y: 18,
        width: 320,
        height: 40,
        fontSize: 14,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: th.accentColor,
        align: 'center',
        fontWeight: '700',
        zIndex: 2
      },
      {
        id: 'el-heading',
        type: 'text',
        content: occ.title,
        x: 50,
        y: 32,
        width: 380,
        height: 60,
        fontSize: 32,
        fontFamily: th.fontFamily,
        color: th.textColor,
        align: 'center',
        fontWeight: '700',
        zIndex: 3
      },
      {
        id: 'el-body',
        type: 'text',
        content: occ.defaultText,
        x: 50,
        y: 54,
        width: 360,
        height: 120,
        fontSize: 18,
        fontFamily: th.fontFamily,
        color: th.textColor,
        align: 'center',
        fontWeight: '400',
        zIndex: 4
      },
      {
        id: 'el-stk-1',
        type: 'sticker',
        content: '🌸',
        x: 20,
        y: 82,
        width: 50,
        height: 50,
        fontSize: 36,
        zIndex: 5
      },
      {
        id: 'el-stk-2',
        type: 'sticker',
        content: '✨',
        x: 80,
        y: 82,
        width: 50,
        height: 50,
        fontSize: 36,
        zIndex: 5
      }
    ];

    this.canvasElements.set(initialElements);
    this.selectedElementId.set('el-body');
  }

  addTextElement() {
    const th = this.selectedTheme();
    const newEl: CanvasElement = {
      id: 'el-' + Date.now(),
      type: 'text',
      content: 'Click here to edit text...',
      x: 50,
      y: 70,
      width: 300,
      height: 50,
      fontSize: 18,
      fontFamily: th.fontFamily,
      color: th.textColor,
      align: 'center',
      zIndex: this.canvasElements().length + 1
    };
    this.canvasElements.update(list => [...list, newEl]);
    this.selectedElementId.set(newEl.id);
  }

  addSticker(icon: string) {
    const newStk: CanvasElement = {
      id: 'el-' + Date.now(),
      type: 'sticker',
      content: icon,
      x: 50 + (Math.random() * 20 - 10),
      y: 50 + (Math.random() * 20 - 10),
      width: 60,
      height: 60,
      fontSize: 42,
      zIndex: this.canvasElements().length + 1
    };
    this.canvasElements.update(list => [...list, newStk]);
    this.selectedElementId.set(newStk.id);
  }

  addPhoto(imageUrl: string) {
    const newPic: CanvasElement = {
      id: 'el-' + Date.now(),
      type: 'photo',
      content: imageUrl,
      x: 50,
      y: 50,
      width: 220,
      height: 180,
      zIndex: this.canvasElements().length + 1
    };
    this.canvasElements.update(list => [...list, newPic]);
    this.selectedElementId.set(newPic.id);
  }

  updateElement(id: string, partial: Partial<CanvasElement>) {
    this.canvasElements.update(list =>
      list.map(el => (el.id === id ? { ...el, ...partial } : el))
    );
  }

  deleteElement(id: string) {
    this.canvasElements.update(list => list.filter(el => el.id !== id));
    if (this.selectedElementId() === id) {
      this.selectedElementId.set(null);
    }
  }

  moveLayer(id: string, direction: 'up' | 'down') {
    const list = [...this.canvasElements()];
    const idx = list.findIndex(el => el.id === id);
    if (idx < 0) return;

    if (direction === 'up' && idx < list.length - 1) {
      const temp = list[idx];
      list[idx] = list[idx + 1];
      list[idx + 1] = temp;
    } else if (direction === 'down' && idx > 0) {
      const temp = list[idx];
      list[idx] = list[idx - 1];
      list[idx - 1] = temp;
    }
    // Update zIndex numbers sequentially
    list.forEach((el, i) => (el.zIndex = i + 1));
    this.canvasElements.set(list);
  }

  // --- Grammarly-Style AI Copywriting Chatbot ---
  toggleAiDrawer() {
    this.isAiDrawerOpen.update(v => !v);
  }

  transformSelectedTextWithAi(action: 'grammar' | 'shorten' | 'elongate' | 'heartfelt' | 'funny' | 'formal') {
    const selectedId = this.selectedElementId();
    const list = this.canvasElements();
    const selectedEl = list.find(el => el.id === selectedId && el.type === 'text');
    const sourceText = selectedEl ? selectedEl.content : this.selectedOccasion().defaultText;

    let userPromptText = '';
    switch (action) {
      case 'grammar':
        userPromptText = `Fix grammar & polish: "${sourceText}"`;
        break;
      case 'shorten':
        userPromptText = `Shorten message: "${sourceText}"`;
        break;
      case 'elongate':
        userPromptText = `Elongate & expand: "${sourceText}"`;
        break;
      case 'heartfelt':
        userPromptText = `Make heartwarming: "${sourceText}"`;
        break;
      case 'funny':
        userPromptText = `Add witty humor to: "${sourceText}"`;
        break;
      case 'formal':
        userPromptText = `Make elegant & formal: "${sourceText}"`;
        break;
    }

    this.aiMessages.update(msgs => [...msgs, { sender: 'user', text: userPromptText }]);
    this.isAiThinking.set(true);

    setTimeout(() => {
      let aiResultText = '';
      switch (action) {
        case 'grammar':
          aiResultText = sourceText.replace(/\b(u|ur)\b/gi, 'you').trim();
          if (!aiResultText.endsWith('.')) aiResultText += '.';
          break;
        case 'shorten':
          aiResultText = 'Sending you all my love, warmth, and warmest wishes today! ✨';
          break;
        case 'elongate':
          aiResultText = `Words cannot fully express how deeply grateful I am to have you in my life. Thank you for your warmth, constant kindness, and unwavering support. May your day be filled with peace, love, and sweet moments! 🌿💚`;
          break;
        case 'heartfelt':
          aiResultText = `From the quietest moments to our brightest memories, your presence is a true blessing. Thank you for filling every day with warmth and light! 🌸✨`;
          break;
        case 'funny':
          aiResultText = `Another year wiser (or just another year older!). Either way, you deserve all the cake, laughs, and extra coffee today! 🍰☕`;
          break;
        case 'formal':
          aiResultText = `Please accept my warmest compliments and sincere best wishes. May success, good health, and prosperous endeavors attend your path.`;
          break;
      }

      this.isAiThinking.set(false);
      this.aiMessages.update(msgs => [
        ...msgs,
        { sender: 'ai', text: aiResultText, actionType: action }
      ]);
    }, 900);
  }

  sendCustomAiPrompt(customText: string) {
    if (!customText.trim()) return;

    this.aiMessages.update(msgs => [...msgs, { sender: 'user', text: customText }]);
    this.isAiThinking.set(true);

    setTimeout(() => {
      this.isAiThinking.set(false);
      const generated = `Here is a custom touch for your card: "${customText.trim()}" — Wishing you boundless joy, serenity, and beautiful moments that bloom forever! 🌸`;
      this.aiMessages.update(msgs => [...msgs, { sender: 'ai', text: generated }]);
    }, 1000);
  }

  applyAiTextToSelected(text: string) {
    const selectedId = this.selectedElementId();
    if (!selectedId) {
      // Find body or heading text
      const bodyTextEl = this.canvasElements().find(el => el.id === 'el-body');
      if (bodyTextEl) {
        this.updateElement('el-body', { content: text });
      }
      return;
    }
    this.updateElement(selectedId, { content: text });
  }

  // --- Draft Persistence & Collections Management ---
  saveCardDraft(isFinished: boolean = false) {
    const card: SavedCard = {
      id: 'card-' + Date.now(),
      title: this.cardTitle(),
      occasionId: this.selectedOccasion().id,
      formatId: this.selectedFormat().id,
      themeId: this.selectedTheme().id,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      updatedAt: 'Just now',
      elements: JSON.parse(JSON.stringify(this.canvasElements())),
      isDraft: !isFinished,
      aspectRatio: this.selectedFormat().ratio,
      cardWidth: this.selectedFormat().width,
      cardHeight: this.selectedFormat().height
    };

    const currentList = this.savedCards();
    const updatedList = [card, ...currentList];
    this.savedCards.set(updatedList);
    this.saveCollectionsToStorage(updatedList);
  }

  loadDraftIntoEditor(card: SavedCard) {
    const occ = CARD_OCCASIONS.find(o => o.id === card.occasionId) || CARD_OCCASIONS[0];
    const fmt = CARD_FORMATS.find(f => f.id === card.formatId) || CARD_FORMATS[0];
    const th = CARD_THEMES.find(t => t.id === card.themeId) || CARD_THEMES[0];

    this.selectedOccasion.set(occ);
    this.selectedFormat.set(fmt);
    this.selectedTheme.set(th);
    this.cardTitle.set(card.title);
    this.canvasElements.set(card.elements);
    this.currentView.set('editor');
  }

  deleteSavedCard(id: string) {
    const updated = this.savedCards().filter(c => c.id !== id);
    this.savedCards.set(updated);
    this.saveCollectionsToStorage(updated);
  }

  private saveCollectionsToStorage(cards: SavedCard[]) {
    localStorage.setItem('bloomnote_collections', JSON.stringify(cards));
  }

  private getDemoCollections(): SavedCard[] {
    return [
      {
        id: 'card-demo-1',
        title: 'Thank You for Everything',
        occasionId: 'gratitude',
        formatId: 'portrait',
        themeId: 'minimal_pastel',
        createdAt: 'Aug 10, 2026',
        updatedAt: '2 days ago',
        elements: [],
        isDraft: false,
        aspectRatio: '4:5',
        cardWidth: 480,
        cardHeight: 600
      },
      {
        id: 'card-demo-2',
        title: 'Happy 25th Birthday!',
        occasionId: 'birthday',
        formatId: 'square',
        themeId: 'modern_retro',
        createdAt: 'Aug 11, 2026',
        updatedAt: 'Yesterday',
        elements: [],
        isDraft: true,
        aspectRatio: '1:1',
        cardWidth: 500,
        cardHeight: 500
      }
    ];
  }
}
