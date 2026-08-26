export type Screen = 
  | 'landing'
  | 'checkin'
  | 'chat'
  | 'triage'
  | 'saathi_match'
  | 'saathi_chat'
  | 'professional'
  | 'privacy'
  | 'dashboard'
  | 'impact';

export type TriageSeverity = 'MILD' | 'MODERATE' | 'SEVERE';

export interface ChatMessage {
  id: string;
  sender: 'student' | 'sahara' | 'saathi' | 'system';
  text: string;
  timestamp: string;
  isQuickResponse?: boolean;
}

export interface SaathiProfile {
  id: string;
  name: string;
  pronouns?: string;
  year: string;
  field: string;
  collegeType: string;
  vibeTags: { icon: string; label: string }[];
  bio: string;
  availability: string;
  languages: string[];
  badges: string[];
  avatarSeed: string;
  colorScheme: {
    bg: string;
    border: string;
    badgeBg: string;
    text: string;
  };
}

export interface Counsellor {
  id: string;
  name: string;
  credentials: string;
  title: string;
  specializations: string[];
  experience: string;
  languages: string[];
  fee: string;
  modalities: ('Text' | 'Voice' | 'Video')[];
  nextSlot: string;
  verified: boolean;
  avatarSeed: string;
}

export interface DemoScenario {
  id: TriageSeverity;
  title: string;
  triggerPhrase: string;
  previewDescription: string;
  conversationFlow: {
    studentIntro: string;
    saharaReply1: string;
    studentReply2: string;
    saharaReply2: string;
  };
  recommendedRouteTitle: string;
}
