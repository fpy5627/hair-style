export const HAIR_TYPES = ['curly', 'straight', 'wavy', 'braids', 'buzz-cut', 'fade'] as const;
export const HAIR_LENGTHS = ['short', 'medium', 'long'] as const;

export type HairType = typeof HAIR_TYPES[number];
export type HairLength = typeof HAIR_LENGTHS[number];

export const HAIR_TYPE_LABELS: Record<HairType, { en: string; zh: string }> = {
    curly: { en: 'Curly', zh: '卷发' },
    straight: { en: 'Straight', zh: '直发' },
    wavy: { en: 'Wavy', zh: '波浪发' },
    braids: { en: 'Braids', zh: '脏辫' },
    'buzz-cut': { en: 'Buzz Cut', zh: '寸头' },
    fade: { en: 'Fade', zh: '渐变' },
};

export const HAIR_LENGTH_LABELS: Record<HairLength, { en: string; zh: string }> = {
    short: { en: 'Short', zh: '短发' },
    medium: { en: 'Medium', zh: '中等长度' },
    long: { en: 'Long', zh: '长发' },
};

export function getSegmentSEO(segment: HairType | HairLength) {
    const isType = HAIR_TYPES.includes(segment as any);
    const label = isType
        ? HAIR_TYPE_LABELS[segment as HairType]
        : HAIR_LENGTH_LABELS[segment as HairLength];

    const name = label.en;
    const nameZh = label.zh;

    return {
        title: `${name} Hairstyles for Men - AI Recommended ${name} Cuts | Hairnova AI`,
        description: `Explore the best ${name} hairstyles for men. Our AI analyzes your face shape to recommend the perfect ${name} cut for your features. Try 500+ ${name} styles virtually now!`,
        h1: `${name} Hairstyles for Men`,
        h1Zh: `${nameZh}男士发型 - AI 智能推荐`,
        intro: `Discover top-rated ${name} hairstyles tailored for your face shape. Using advanced AI analysis, we help you find the most flattering ${name} styles that enhance your natural features without the guesswork.`,
        introZh: `探索为您脸型量身定制的顶尖${nameZh}。利用先进的 AI 分析，我们帮您找到最能提升自然特质的${nameZh}，免去犹豫。`,
    };
}

export function getCombinationSEO(type: HairType, length: HairLength) {
    const typeLabelEn = HAIR_TYPE_LABELS[type].en;
    const lengthLabelEn = HAIR_LENGTH_LABELS[length].en;
    const typeLabelZh = HAIR_TYPE_LABELS[type].zh;
    const lengthLabelZh = HAIR_LENGTH_LABELS[length].zh;

    return {
        title: `${lengthLabelEn} Length ${typeLabelEn} Hairstyles for Men - AI Try-on | Hairnova AI`,
        description: `Explore the best ${lengthLabelEn} length ${typeLabelEn} hairstyles for men. Our AI analyzes your face shape to recommend the perfect ${typeLabelEn} haircut. Try it virtually now!`,
        h1: `${lengthLabelEn} Length ${typeLabelEn} Hairstyles for Men`,
        h1Zh: `${lengthLabelZh}${typeLabelZh}男士发型 - AI 智能尝试`,
        intro: `Finding the right style for ${lengthLabelEn} ${typeLabelEn} hair can be challenging. Our AI specialized in ${typeLabelEn} textures and ${lengthLabelEn} lengths to provide personalized recommendations that suit your face shape and personal style.`,
        introZh: `为${lengthLabelZh}${typeLabelZh}找到合适的发型可能具有挑战性。我们的 AI 专门针对${typeLabelZh}纹理和${lengthLabelZh}长度，提供适合您脸型和个人风格的个性化建议。`,
        faqs: [
            {
                question: `Does ${lengthLabelEn} ${typeLabelEn} hair suit my face shape?`,
                answer: `It depends on your specific features! Generally, ${lengthLabelEn} styles with ${typeLabelEn} texture work well to balance round or square faces by adding either volume or softening angles. Use our AI tool above to see exactly how it looks on you.`
            },
            {
                question: `How to maintain ${lengthLabelEn} ${typeLabelEn} hairstyles?`,
                answer: `${typeLabelEn} hair often requires more moisture. For ${lengthLabelEn} lengths, we recommend using a curl-defining cream or light pomade and getting regular trims every 4-6 weeks to maintain the shape.`
            },
            {
                question: `Can I try these styles virtually?`,
                answer: `Yes! Our AI Hairstyle Changer allows you to upload a photo and see these ${lengthLabelEn} ${typeLabelEn} styles on your own face immediately.`
            }
        ]
    };
}
