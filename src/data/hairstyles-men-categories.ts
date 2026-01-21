export interface MensHairstyleCategoryDetail {
    slug: string;
    name: string;
    nameZh: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    h1Zh: string;
    intro: string;
    introZh: string;

    // 筛选器默认值
    defaultFilters: {
        length?: 'Short' | 'Medium' | 'Long';
        style?: 'Classic' | 'Trendy' | 'Business' | 'Curly';
        hairType?: 'Curly' | 'Straight' | 'Wavy' | 'Thick' | 'Thin';
        ethnicity?: 'all' | 'black' | 'asian' | 'caucasian';
    };

    // 卖点（3-5条）
    benefits: string[];
    benefitsZh: string[];

    // CTA 文案
    ctaPrimary: string;
    ctaPrimaryZh: string;

    // 相关分类
    relatedCategories: string[];

    // 示例发型（用于快速展示）
    exampleStyles: string[];
}

export const MENS_HAIRSTYLE_CATEGORIES: MensHairstyleCategoryDetail[] = [
    {
        slug: 'medium-length',
        name: 'Medium Length Hairstyles for Men',
        nameZh: '中等长度男士发型',
        metaTitle: 'Medium Length Hairstyles for Men - AI Recommendations | Hairnova AI',
        metaDescription: 'Discover medium length hairstyles for men. AI analyzes your face shape and recommends the best medium hair styles. Versatile, professional, easy to style.',
        h1: 'Medium Length Hairstyles for Men',
        h1Zh: '中等长度男士发型 - AI 智能推荐',
        intro: 'Medium length hairstyles offer the perfect balance between style versatility and easy maintenance. Whether you have a round, square, or oval face, our AI analyzes your facial structure to recommend medium-length cuts that enhance your best features. From textured crops to side-swept styles, find your ideal look.',
        introZh: '中等长度发型在风格多样性和易打理之间达到完美平衡。无论你是圆脸、方脸还是椭圆脸，我们的 AI 会分析你的面部结构，推荐能提升你最佳特征的中长发造型。从纹理短发到侧分风格，找到最适合你的造型。',

        defaultFilters: {
            length: 'Medium'
        },

        benefits: [
            'More styling versatility than short hair',
            'Suitable for professional and casual settings',
            'Works well with most face shapes',
            'Easy to maintain with regular trims',
            'Perfect for transitioning between short and long'
        ],
        benefitsZh: [
            '比短发更多样化的造型选择',
            '适合专业和休闲场合',
            '适配大多数脸型',
            '定期修剪即可轻松维护',
            '完美过渡短发和长发'
        ],

        ctaPrimary: 'Upload Photo - AI Recommends Your Medium Length Style',
        ctaPrimaryZh: '上传照片，AI 推荐适合你的中长发男士发型',

        relatedCategories: ['low-maintenance', 'curly', 'business-styles'],

        exampleStyles: ['Textured Crop', 'Side Swept', 'Slick Back', 'Wavy Medium', 'Layered Cut']
    },
    {
        slug: 'curly',
        name: 'Curly Hairstyles for Men',
        nameZh: '卷发男士发型',
        metaTitle: 'Curly Hairstyles for Men - AI Face Shape Analysis | Hairnova AI',
        metaDescription: 'Find the best curly hairstyles for men. AI recommends styles based on your curl pattern, face shape, and hair density. Short, medium, or long curly hair.',
        h1: 'Curly Hairstyles for Men',
        h1Zh: '卷发男士发型 - AI 智能推荐',
        intro: 'Curly hair is unique and requires styles that work with your natural texture, not against it. Our AI considers your curl pattern, face shape, and hair density to recommend cuts that enhance your curls while maintaining easy styling. From tight curls to loose waves, discover what works best for you.',
        introZh: '卷发独一无二，需要顺应自然纹理而非对抗的造型。我们的 AI 考虑你的卷曲模式、脸型和发量，推荐既能展现卷发魅力又易于打理的发型。从紧密卷曲到松散波浪，发现最适合你的造型。',

        defaultFilters: {
            style: 'Curly',
            hairType: 'Curly'
        },

        benefits: [
            'AI analyzes curl pattern and density',
            'Styles that work with natural texture',
            'Suitable for short, medium, and long lengths',
            'Reduces frizz with proper cut recommendations',
            'Easy to maintain with right products'
        ],
        benefitsZh: [
            'AI 分析卷曲模式和发量',
            '顺应自然纹理的造型',
            '适合短、中、长各种长度',
            '通过正确的发型减少毛躁',
            '搭配合适产品易于打理'
        ],

        ctaPrimary: 'Upload Photo - Find Your Perfect Curly Style',
        ctaPrimaryZh: '上传照片，AI 推荐适合你的卷发造型',

        relatedCategories: ['medium-length', 'low-maintenance', 'black-men'],

        exampleStyles: ['Curly Fade', 'Curly Undercut', 'Curly Frohawk', 'Defined Curls', 'Curly Pompadour']
    },
    {
        slug: 'black-men',
        name: 'Black Men Hairstyles',
        nameZh: '黑人男士发型',
        metaTitle: 'Black Men Hairstyles - AI Recommendations | Hairnova AI',
        metaDescription: 'Discover hairstyles for black men. AI recommends styles that work with natural curls, from fades to braids, twists to afros. Face shape analysis included.',
        h1: 'Black Men Hairstyles',
        h1Zh: '黑人男士发型 - AI 智能推荐',
        intro: 'Black men\'s hair offers incredible versatility with natural curls and coils. Our AI specializes in analyzing face shapes and hair texture to recommend styles from classic fades to modern twists, braids, and afros. Whether you prefer clean-cut or bold statement looks, find styles that complement your unique features.',
        introZh: '黑人男士的自然卷发和螺旋发提供了令人难以置信的多样性。我们的 AI 专门分析脸型和发质，推荐从经典渐变到现代扭辫、辫子和爆炸头的造型。无论你偏好干净利落还是大胆风格，找到衬托你独特特征的造型。',

        defaultFilters: {
            ethnicity: 'black',
            hairType: 'Curly'
        },

        benefits: [
            'AI understands natural curl and coil patterns',
            'Styles for all face shapes and head sizes',
            'From low fades to high-top afros',
            'Braids, twists, and protective styles',
            'Recommendations based on hair density'
        ],
        benefitsZh: [
            'AI 理解自然卷曲和螺旋纹理',
            '适合所有脸型和头型',
            '从低渐变到高顶爆炸头',
            '辫子、扭辫和保护性造型',
            '基于发量的推荐'
        ],

        ctaPrimary: 'Upload Photo - AI Recommends Your Style',
        ctaPrimaryZh: '上传照片，AI 推荐适合你的黑人发型',

        relatedCategories: ['curly', 'fade', 'low-maintenance'],

        exampleStyles: ['Fade + Curls', 'High Top Fade', 'Twists', 'Braids', 'Afro', 'Taper Fade']
    },
    {
        slug: 'low-maintenance',
        name: 'Low Maintenance Hairstyles for Men',
        nameZh: '低维护男士发型',
        metaTitle: 'Low Maintenance Hairstyles for Men - Easy Styling | Hairnova AI',
        metaDescription: 'Find low maintenance men\'s hairstyles that look great with minimal effort. AI recommends easy-to-style cuts based on your face shape and lifestyle.',
        h1: 'Low Maintenance Hairstyles for Men',
        h1Zh: '低维护男士发型 - AI 智能推荐',
        intro: 'Busy lifestyle? Our AI recommends low-maintenance men\'s hairstyles that require minimal styling time while still looking sharp. From buzz cuts to textured crops, find cuts that work for your daily routine, face shape, and hair type—no complicated morning routines required.',
        introZh: '生活忙碌？我们的 AI 推荐低维护男士发型，只需最少的打理时间即可保持帅气。从寸头到纹理短发，找到适合你日常作息、脸型和发质的发型——无需复杂的早晨打理流程。',

        defaultFilters: {
            length: 'Short'
        },

        benefits: [
            'Minimal daily styling required',
            'Perfect for busy professionals',
            'Saves time and product costs',
            'Always looks neat with regular trims',
            'AI reduces trial-and-error risks'
        ],
        benefitsZh: [
            '日常打理需求极低',
            '完美适合忙碌的职场人士',
            '节省时间和产品成本',
            '定期修剪即可保持整洁',
            'AI 减少试错成本'
        ],

        ctaPrimary: 'Upload Photo - Find Your Easy-Care Style',
        ctaPrimaryZh: '上传照片，AI 推荐易打理发型',

        relatedCategories: ['buzz-cut', 'crew-cut', 'medium-length'],

        exampleStyles: ['Buzz Cut', 'Crew Cut', 'Ivy League', 'Short Textured', 'Clean Fade']
    }
];

// Helper functions
export function getCategoryBySlug(slug: string): MensHairstyleCategoryDetail | undefined {
    return MENS_HAIRSTYLE_CATEGORIES.find(c => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
    return MENS_HAIRSTYLE_CATEGORIES.map(c => c.slug);
}
