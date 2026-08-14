export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
  authProvider: 'google' | 'email' | 'none';
}

export type OccasionType = 
  | 'gratitude' 
  | 'apology' 
  | 'invitation' 
  | 'birthday' 
  | 'get_well_soon' 
  | 'general_occasion';

export interface CardOccasion {
  id: OccasionType;
  title: string;
  description: string;
  icon: string;
  badge: string;
  defaultText: string;
  accentBg: string;
}

export interface CardFormat {
  id: 'portrait' | 'landscape' | 'square' | 'folded' | 'story';
  name: string;
  description: string;
  ratio: string;
  width: number;
  height: number;
  icon: string;
}

export interface CardTheme {
  id: string;
  name: string;
  fontFamily: string;
  bgGradient: string;
  textColor: string;
  accentColor: string;
  description: string;
  previewBg: string;
}

export interface CanvasElement {
  id: string;
  type: 'text' | 'sticker' | 'photo';
  content: string; // text string, sticker emoji/symbol/icon name, or image data URL
  x: number; // percentage or px
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  fontWeight?: string;
  zIndex: number;
  rotation?: number;
}

export interface SavedCard {
  id: string;
  title: string;
  occasionId: OccasionType;
  formatId: string;
  themeId: string;
  createdAt: string;
  updatedAt: string;
  elements: CanvasElement[];
  isDraft: boolean;
  previewThumbnail?: string;
  aspectRatio: string;
  cardWidth: number;
  cardHeight: number;
}
