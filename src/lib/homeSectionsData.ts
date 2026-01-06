/**
 * Homepage Section Data
 */

export const HERO_PREVIEW_DATA = [
  { 
    id: 1, 
    gender: 'male', 
    faceShape: 'Square',
    before: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop', 
    after: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=500&fit=crop' 
  },
  { 
    id: 2, 
    gender: 'male', 
    faceShape: 'Oval',
    before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop', 
    after: 'https://images.unsplash.com/photo-1552046122-03184de85e08?w=400&h=500&fit=crop' 
  },
  { 
    id: 3, 
    gender: 'male', 
    faceShape: 'Heart',
    before: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop', 
    after: 'https://images.unsplash.com/photo-1618833162733-4f2798e4f620?w=400&h=500&fit=crop' 
  },
  { 
    id: 4, 
    gender: 'female', 
    faceShape: 'Oval',
    before: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop', 
    after: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=500&fit=crop' 
  },
  { 
    id: 5, 
    gender: 'female', 
    faceShape: 'Heart',
    before: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop', 
    after: 'https://images.unsplash.com/photo-1605497745244-5c3456dd7ed9?w=400&h=500&fit=crop' 
  },
  { 
    id: 6, 
    gender: 'female', 
    faceShape: 'Round',
    before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop', 
    after: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=400&h=500&fit=crop' 
  },
];

export const MOCK_HAIRSTYLES = [
  { id: 'm1', gender: 'male', name: 'Buzz Cut', preview: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop', category: 'Short' },
  { id: 'm2', gender: 'male', name: 'Side Part', preview: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', category: 'Medium' },
  { id: 'f1', gender: 'female', name: 'Long Waves', preview: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop', category: 'Long' },
  { id: 'f2', gender: 'female', name: 'Bob', preview: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=200&h=200&fit=crop', category: 'Short' },
  { id: 'f3', gender: 'female', name: 'Pixie', preview: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', category: 'Short' },
  { id: 'm3', gender: 'male', name: 'Undercut', preview: 'https://images.unsplash.com/photo-1552046122-03184de85e08?w=200&h=200&fit=crop', category: 'Short' },
];

export const MOCK_RECOMMENDATIONS = {
  male: [
    { id: 'm1', name: 'Buzz Cut', face: 'Square' },
    { id: 'm3', name: 'Undercut', face: 'Oval' },
  ],
  female: [
    { id: 'f1', name: 'Long Waves', face: 'Oval' },
    { id: 'f2', name: 'Bob', face: 'Heart' },
  ]
};

export const MOCK_COLORS = [
  { id: 'c1', name: 'Warm Brown', hex: '#4a3728', tone: 'Warm' },
  { id: 'c2', name: 'Cool Blonde', hex: '#faf0be', tone: 'Cool' },
  { id: 'c3', name: 'Ash Grey', hex: '#c0c0c0', tone: 'Cool' },
  { id: 'c4', name: 'Copper Red', hex: '#8b0000', tone: 'Warm' },
  { id: 'c5', name: 'Honey Blonde', hex: '#e3b448', tone: 'Neutral' },
  { id: 'c6', name: 'Deep Black', hex: '#1a1a1a', tone: 'Neutral' },
];

export const USE_CASES = [
  { id: 'salon', icon: 'Scissors' },
  { id: 'social', icon: 'Camera' },
  { id: 'creators', icon: 'Palette' },
  { id: 'events', icon: 'Target' },
];

export const WHY_REASONS = [
  { id: 'reason1', icon: 'Sparkles' },
  { id: 'reason2', icon: 'Zap' },
  { id: 'reason3', icon: 'ShieldCheck' },
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    before: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop',
    tag: 'Long Waves',
    faceShape: 'Oval',
    reason: 'balance_ratio'
  },
  {
    id: 2,
    before: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop',
    tag: 'Buzz Cut',
    faceShape: 'Square',
    reason: 'soften_jawline'
  }
];

