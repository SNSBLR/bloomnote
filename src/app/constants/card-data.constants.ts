import { CardOccasion, CardFormat, CardTheme } from '../models/card.models';

export const CARD_OCCASIONS: CardOccasion[] = [
  {
    id: 'gratitude',
    title: 'Gratitude Card',
    description: 'Express sincere thanks, warm appreciation, and heartfelt gratitude.',
    icon: 'ri-heart-pulse-fill',
    badge: 'Thank You',
    defaultText: 'Thank you from the bottom of my heart for your constant warmth & support! 🌿',
    accentBg: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)'
  },
  {
    id: 'apology',
    title: 'Apology Card',
    description: 'Send sincere amends, thoughtful regrets, and gentle reconciliation messages.',
    icon: 'ri-hand-heart-fill',
    badge: 'I am Sorry',
    defaultText: 'I am truly sorry for my mistake. I value your friendship deeply and hope we can heal together.',
    accentBg: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)'
  },
  {
    id: 'invitation',
    title: 'Invitation Card',
    description: 'Invite loved ones to dinner, tea parties, baby showers, or celebrations.',
    icon: 'ri-mail-open-fill',
    badge: 'Join Us',
    defaultText: 'You are cordially invited to celebrate our special day! Join us for drinks, laughter & sweet memories.',
    accentBg: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)'
  },
  {
    id: 'birthday',
    title: 'Birthday Card',
    description: 'Wish joyful moments, happy memories, and magical year ahead for friends & family.',
    icon: 'ri-cake-3-fill',
    badge: 'Happy Birthday',
    defaultText: 'Wishing you the happiest of birthdays filled with laughter, love, cake & endless joy! 🎂✨',
    accentBg: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)'
  },
  {
    id: 'get_well_soon',
    title: 'Get Well Soon Card',
    description: 'Send comforting wishes, gentle healing thoughts, and bright sunshine.',
    icon: 'ri-sun-fill',
    badge: 'Feel Better',
    defaultText: 'Sending you gentle hugs, peaceful rest, and sunshine for a speedy & complete recovery! 🌸',
    accentBg: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)'
  },
  {
    id: 'general_occasion',
    title: 'Occasion Cards',
    description: 'Celebrate achievements, anniversaries, promotions, holidays, or simple notes.',
    icon: 'ri-sparkles-fill',
    badge: 'Celebration',
    defaultText: 'Congratulations on this milestone moment! May this new chapter bring you endless success.',
    accentBg: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)'
  }
];

export const CARD_FORMATS: CardFormat[] = [
  {
    id: 'portrait',
    name: 'Classic Portrait',
    description: 'Standard card format (4:5 ratio). Ideal for classic printed cards & framed notes.',
    ratio: '4:5',
    width: 480,
    height: 600,
    icon: 'ri-layout-4-fill'
  },
  {
    id: 'landscape',
    name: 'Panoramic Landscape',
    description: 'Wide format (16:9 ratio). Great for rich scenic photos & invitations.',
    ratio: '16:9',
    width: 640,
    height: 360,
    icon: 'ri-layout-3-fill'
  },
  {
    id: 'square',
    name: 'Social Square',
    description: 'Balanced square ratio (1:1). Perfect for Instagram, digital sharing & modern aesthetic.',
    ratio: '1:1',
    width: 500,
    height: 500,
    icon: 'ri-checkbox-blank-line'
  },
  {
    id: 'folded',
    name: 'Folded Dual-Panel',
    description: 'Traditional 2-panel fold format with front cover and inner message view.',
    ratio: '2:3',
    width: 440,
    height: 620,
    icon: 'ri-book-open-fill'
  },
  {
    id: 'story',
    name: 'Mobile Story Format',
    description: 'Tall mobile aspect ratio (9:16). Optimized for mobile messaging & story posts.',
    ratio: '9:16',
    width: 360,
    height: 640,
    icon: 'ri-smartphone-fill'
  }
];

export const CARD_THEMES: CardTheme[] = [
  {
    id: 'minimal_pastel',
    name: 'Minimalist Mint',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    bgGradient: 'linear-gradient(135deg, #F4F9F5 0%, #E2F1E5 100%)',
    textColor: '#15281B',
    accentColor: '#4EA86A',
    description: 'Soft pastel mint tones with clean sans-serif typography.',
    previewBg: '#E8F5EB'
  },
  {
    id: 'botanical_floral',
    name: 'Botanical Sage',
    fontFamily: "'Caveat', cursive",
    bgGradient: 'linear-gradient(135deg, #EBF5ED 0%, #D4EADB 100%)',
    textColor: '#1B3D25',
    accentColor: '#3A8C52',
    description: 'Earthy botanical sage background paired with warm handwritten cursive.',
    previewBg: '#D4EADB'
  },
  {
    id: 'modern_retro',
    name: 'Warm Sunburst',
    fontFamily: "'Outfit', sans-serif",
    bgGradient: 'linear-gradient(135deg, #FFF9E6 0%, #FFEFC2 100%)',
    textColor: '#3A2E12',
    accentColor: '#D98A2B',
    description: 'Warm golden hues with bold retro typography and joyful warmth.',
    previewBg: '#FFEFC2'
  },
  {
    id: 'golden_festive',
    name: 'Rose Romance',
    fontFamily: "'Playfair Display', serif",
    bgGradient: 'linear-gradient(135deg, #FDF0ED 0%, #F8DCD6 100%)',
    textColor: '#4A1D24',
    accentColor: '#C85267',
    description: 'Elegant blush rose tones with sophisticated serif typography.',
    previewBg: '#F8DCD6'
  },
  {
    id: 'gentle_watercolor',
    name: 'Ocean Whisper',
    fontFamily: "'Dancing Script', cursive",
    bgGradient: 'linear-gradient(135deg, #EAF4F8 0%, #CEE6F2 100%)',
    textColor: '#103247',
    accentColor: '#2B84B4',
    description: 'Calm aqua watercolor gradients with flowing elegant script.',
    previewBg: '#CEE6F2'
  },
  {
    id: 'whimsical_doodles',
    name: 'Whimsical Garden',
    fontFamily: "'Pacifico', cursive",
    bgGradient: 'linear-gradient(135deg, #F5F7EC 0%, #E5EBCB 100%)',
    textColor: '#2C3B12',
    accentColor: '#6B8E23',
    description: 'Playful olive pastel garden tones with fun handwritten lettering.',
    previewBg: '#E5EBCB'
  }
];

export const STICKER_LIBRARY = [
  { id: 'stk-1', category: 'Nature & Flowers', icon: '🌸', name: 'Cherry Blossom' },
  { id: 'stk-2', category: 'Nature & Flowers', icon: '🌿', name: 'Sage Branch' },
  { id: 'stk-3', category: 'Nature & Flowers', icon: '🌻', name: 'Sunflower' },
  { id: 'stk-4', category: 'Nature & Flowers', icon: '🌷', name: 'Tulip' },
  { id: 'stk-5', category: 'Love & Hearts', icon: '💖', name: 'Sparkle Heart' },
  { id: 'stk-6', category: 'Love & Hearts', icon: '💌', name: 'Love Letter' },
  { id: 'stk-7', category: 'Love & Hearts', icon: '🎀', name: 'Pastel Ribbon' },
  { id: 'stk-8', category: 'Celebration', icon: '🎂', name: 'Birthday Cake' },
  { id: 'stk-9', category: 'Celebration', icon: '🎉', name: 'Party Popper' },
  { id: 'stk-10', category: 'Celebration', icon: '🎈', name: 'Pastel Balloon' },
  { id: 'stk-11', category: 'Badges & Magic', icon: '✨', name: 'Magic Sparkles' },
  { id: 'stk-12', category: 'Badges & Magic', icon: '⭐', name: 'Golden Star' },
  { id: 'stk-13', category: 'Badges & Magic', icon: '🕊️', name: 'Peace Dove' },
  { id: 'stk-14', category: 'Badges & Magic', icon: '🏷️', name: 'With Love Stamp' }
];

export const SAMPLE_PHOTOS = [
  { id: 'ph-1', name: 'Pastel Floral Bloom', url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80' },
  { id: 'ph-2', name: 'Earthy Dried Leaves', url: 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&w=600&q=80' },
  { id: 'ph-3', name: 'Gentle Sunlight', url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80' },
  { id: 'ph-4', name: 'Soft Eucalyptus', url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80' }
];
