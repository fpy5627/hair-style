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
  // 女性发型
  { id: 'f1', gender: 'female', name: 'Long Waves', preview: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=500&fit=crop', category: 'Long', badge: 'BEST MATCH' },
  { id: 'f2', gender: 'female', name: 'Bob Cut', preview: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=500&fit=crop', category: 'Short', badge: 'RECOMMENDED' },
  { id: 'f3', gender: 'female', name: 'Pixie Cut', preview: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop', category: 'Short', badge: 'TRENDING' },
  { id: 'f4', gender: 'female', name: 'Shag Haircut', preview: 'https://images.unsplash.com/photo-1605497745244-5c3456dd7ed9?w=400&h=500&fit=crop', category: 'Medium', badge: 'NEW' },
  { id: 'f5', gender: 'female', name: 'Braid', preview: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=400&h=500&fit=crop', category: 'Long', badge: 'BEST MATCH' },
  { id: 'f6', gender: 'female', name: 'Curtain Bangs', preview: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop', category: 'Medium', badge: 'RECOMMENDED' },
  { id: 'f7', gender: 'female', name: 'French Bob', preview: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop', category: 'Short', badge: 'TRENDING' },
  { id: 'f8', gender: 'female', name: 'Soft Curls', preview: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop', category: 'Long', badge: 'NEW' },
  { id: 'f9', gender: 'female', name: 'Side Braid', preview: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=500&fit=crop', category: 'Long' },
  { id: 'f10', gender: 'female', name: 'Straight Long', preview: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=500&fit=crop', category: 'Long' },
  { id: 'f11', gender: 'female', name: 'Layered Cut', preview: 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=400&h=500&fit=crop', category: 'Medium' },
  { id: 'f12', gender: 'female', name: 'Top Knot', preview: 'https://images.unsplash.com/photo-1584297117022-99d34104aa8a?w=400&h=500&fit=crop', category: 'Medium' },
  { id: 'f13', gender: 'female', name: 'Space Bun', preview: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop', category: 'Medium' },
  { id: 'f14', gender: 'female', name: 'Half Up', preview: 'https://images.unsplash.com/photo-1551711713-39be0d3f82a9?w=400&h=500&fit=crop', category: 'Long' },
  
  // 男性发型
  { id: 'm1', gender: 'male', name: 'Buzz Cut', preview: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop', category: 'Short', badge: 'BEST MATCH' },
  { id: 'm2', gender: 'male', name: 'Side Part', preview: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=400&h=500&fit=crop', category: 'Short', badge: 'RECOMMENDED' },
  { id: 'm3', gender: 'male', name: 'Undercut', preview: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=400&h=500&fit=crop', category: 'Short', badge: 'HOT' },
  { id: 'm4', gender: 'male', name: 'Pompadour', preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop', category: 'Medium', badge: 'TRENDING' },
  { id: 'm5', gender: 'male', name: 'Crew Cut', preview: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=400&h=500&fit=crop', category: 'Short' },
  { id: 'm6', gender: 'male', name: 'Man Bun', preview: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop', category: 'Long' },
  { id: 'm7', gender: 'male', name: 'Top Fade', preview: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop', category: 'Short' },
  { id: 'm8', gender: 'male', name: 'Curly Top', preview: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?w=400&h=500&fit=crop', category: 'Medium' },
  { id: 'm9', gender: 'male', name: 'Slick Back', preview: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=500&fit=crop', category: 'Short' },
  { id: 'm10', gender: 'male', name: 'Mohawk', preview: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=500&fit=crop', category: 'Short' },
  { id: 'm11', gender: 'male', name: 'Long Hair', preview: 'https://images.unsplash.com/photo-1520338801620-6b6ad529e1c2?w=400&h=500&fit=crop', category: 'Long' },
  { id: 'm12', gender: 'male', name: 'Ivy League', preview: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=500&fit=crop', category: 'Short' },
  { id: 'm13', gender: 'male', name: 'Taper Fade', preview: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?w=400&h=500&fit=crop', category: 'Short', badge: 'RECOMMENDED' },
  { id: 'm14', gender: 'male', name: 'Textured Quiff', preview: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=400&h=500&fit=crop', category: 'Medium' },
  { id: 'm15', gender: 'male', name: 'Caesar Cut', preview: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&h=500&fit=crop', category: 'Short' },
  { id: 'm16', gender: 'male', name: 'Faux Hawk', preview: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop', category: 'Medium', badge: 'TRENDING' },
  { id: 'm17', gender: 'male', name: 'Spiky Hair', preview: 'https://images.unsplash.com/photo-1480427712822-26b5863a1e90?w=400&h=500&fit=crop', category: 'Short' },
  { id: 'm18', gender: 'male', name: 'Afro', preview: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=500&fit=crop', category: 'Medium', badge: 'NEW' },
  { id: 'm19', gender: 'male', name: 'Mullet', preview: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=400&h=500&fit=crop', category: 'Medium' },
  { id: 'm20', gender: 'male', name: 'Bowl Cut', preview: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=500&fit=crop', category: 'Short' },
  { id: 'm21', gender: 'male', name: 'Side Swept', preview: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=500&fit=crop', category: 'Medium' },
  { id: 'm22', gender: 'male', name: 'Flat Top', preview: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=500&fit=crop', category: 'Short' },
  { id: 'm23', gender: 'male', name: 'High Top', preview: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=400&h=500&fit=crop', category: 'Medium' },
  { id: 'm24', gender: 'male', name: 'Dreadlocks', preview: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=500&fit=crop', category: 'Long', badge: 'HOT' },
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

/**
 * 发色数据结构
 * 分为三层：基础发色（默认展示）、风格发色（可展开）、高级发色（Advanced）
 */
export interface HairColor {
  id: string;
  name: string; // 人话名称
  hex: string; // 颜色值
  tone?: 'Warm' | 'Cool' | 'Neutral'; // 色调
  skinTone?: string; // 适合肤色提示
  style?: string; // 适合风格提示
}

export const HAIR_COLORS = {
  // 基础发色（默认展示）
  basic: [
    { id: 'natural-black', name: '自然黑', hex: '#1a1a1a', tone: 'Neutral', skinTone: '适合所有肤色', style: '经典百搭' },
    { id: 'dark-brown', name: '深棕色', hex: '#3d2817', tone: 'Warm', skinTone: '适合暖色调肌肤', style: '自然稳重' },
    { id: 'medium-brown', name: '中棕色', hex: '#6b4423', tone: 'Neutral', skinTone: '适合大多数肤色', style: '日常百搭' },
    { id: 'light-brown', name: '浅棕色', hex: '#8b6f47', tone: 'Warm', skinTone: '适合暖色调肌肤', style: '温柔自然' },
    { id: 'blonde', name: '金色', hex: '#d4a574', tone: 'Warm', skinTone: '适合白皙肌肤', style: '明亮活力' },
    { id: 'grey', name: '灰色', hex: '#808080', tone: 'Cool', skinTone: '适合冷色调肌肤', style: '成熟优雅' },
  ] as HairColor[],
  
  // 风格发色（可展开）
  style: [
    { id: 'cool-blonde', name: '冷金色', hex: '#f0e6d2', tone: 'Cool', skinTone: '适合冷色调肌肤', style: '清新时尚' },
    { id: 'honey-blonde', name: '蜂蜜金', hex: '#e3b448', tone: 'Warm', skinTone: '适合暖色调肌肤', style: '温暖甜美' },
    { id: 'copper-red', name: '铜红色', hex: '#b87333', tone: 'Warm', skinTone: '适合暖色调肌肤', style: '热情活力' },
    { id: 'auburn', name: '栗棕色', hex: '#8b4513', tone: 'Warm', skinTone: '适合暖色调肌肤', style: '复古优雅' },
    { id: 'rose-brown', name: '玫瑰棕', hex: '#a0522d', tone: 'Warm', skinTone: '适合暖色调肌肤', style: '浪漫温柔' },
  ] as HairColor[],
  
  // 高级发色（Advanced）
  advanced: [
    { id: 'ash-grey', name: '灰褐色', hex: '#c0c0c0', tone: 'Cool', skinTone: '适合冷色调肌肤', style: '高级质感' },
    { id: 'platinum-blonde', name: '铂金色', hex: '#faf0be', tone: 'Cool', skinTone: '适合冷色调肌肤', style: '前卫时尚' },
    { id: 'smoky-brown', name: '烟熏棕', hex: '#5c4a37', tone: 'Cool', skinTone: '适合冷色调肌肤', style: '神秘个性' },
    { id: 'chocolate-brown', name: '巧克力棕', hex: '#4a3728', tone: 'Warm', skinTone: '适合暖色调肌肤', style: '浓郁经典' },
    { id: 'burgundy', name: '酒红色', hex: '#800020', tone: 'Warm', skinTone: '适合暖色调肌肤', style: '成熟魅力' },
  ] as HairColor[],
};

// 兼容旧版本的扁平化数组（用于向后兼容）
export const MOCK_COLORS = [
  ...HAIR_COLORS.basic,
  ...HAIR_COLORS.style,
  ...HAIR_COLORS.advanced,
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

