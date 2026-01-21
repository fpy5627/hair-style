export interface HairstyleMenDetail {
    slug: string;
    name: string;
    nameZh: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    introZh: string;

    // AI Recommendation
    suitableFaceShapes: string[];
    notSuitableFaceShapes: string[];

    // Features
    features: {
        difficulty: string;
        maintenance: string;
        style: string;
    };

    // FAQ
    faqs: {
        question: string;
        answer: string;
    }[];

    // Related hairstyles
    relatedHairstyles: string[];

    // Images
    imageUrl: string;
    exampleImages: string[];
}

export const HAIRSTYLES_MEN_DATA: HairstyleMenDetail[] = [
    {
        slug: 'buzz-cut',
        name: 'Buzz Cut',
        nameZh: '寸头',
        metaTitle: 'Buzz Cut for Men - AI Hairstyle Recommendation | Hairnova AI',
        metaDescription: 'Buzz Cut hairstyle for men - Upload your photo, AI analyzes if this short military-style haircut fits your face shape. Best for oval, square faces. Try it now!',
        h1: 'Buzz Cut – AI Recommendation Based on Face Shape',
        intro: 'The Buzz Cut is a ultra-short military-style haircut where hair is clipped very close to the scalp using clippers. It\'s low-maintenance, masculine, and works best for men with strong facial features and well-defined head shapes.',
        introZh: '寸头是一种极短的军事风格发型，使用推剪将头发剪至贴近头皮。低维护、阳刚，最适合五官立体、头型饱满的男士。',

        suitableFaceShapes: ['Oval', 'Square', 'Diamond'],
        notSuitableFaceShapes: ['Round', 'Long'],

        features: {
            difficulty: 'Easy',
            maintenance: 'Very Low',
            style: 'Military / Athletic / Minimalist'
        },

        faqs: [
            {
                question: 'Does Buzz Cut fit round face?',
                answer: 'Buzz Cut is generally NOT recommended for round faces as it lacks height and volume on top, which can make the face appear rounder. If you have a round face, consider styles with more length on top like Crew Cut or Quiff.'
            },
            {
                question: 'Is Buzz Cut good for thin hair?',
                answer: 'Yes! Buzz Cut is excellent for thin hair or receding hairlines because it evenly distributes what hair you have and creates a clean, intentional look rather than trying to cover thinning areas.'
            },
            {
                question: 'Will AI change my face?',
                answer: 'No. Hairnova AI only simulates the hairstyle on your existing face structure. Your facial features remain completely unchanged - we only modify the hair area.'
            }
        ],

        relatedHairstyles: ['crew-cut', 'fade', 'undercut', 'side-part'],

        imageUrl: 'https://images.unsplash.com/photo-1552046122-03184de85e08?w=800&h=1000&fit=crop',
        exampleImages: [
            'https://images.unsplash.com/photo-1552046122-03184de85e08?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1552046122-03184de85e08?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1552046122-03184de85e08?w=400&h=500&fit=crop'
        ]
    },
    {
        slug: 'fade',
        name: 'Fade',
        nameZh: '渐变',
        metaTitle: 'Fade Haircut for Men - AI Face Shape Analysis | Hairnova AI',
        metaDescription: 'Fade haircut for men - AI analyzes if this tapered hairstyle suits your face shape. Popular taper fade, low fade, high fade styles. Upload photo now!',
        h1: 'Fade Haircut – AI Recommendation Based on Face Shape',
        intro: 'The Fade is a modern tapered haircut where hair gradually transitions from longer on top to very short or skin-close on the sides and back. Variations include Low Fade, Mid Fade, High Fade, and Taper Fade - all offering a clean, sharp, professional look.',
        introZh: '渐变发型是现代锥形发型，头发从顶部较长逐渐过渡到两侧和后部极短或贴皮。包括低渐变、中渐变、高渐变和锥度渐变等变体，呈现干净、锐利、专业的外观。',

        suitableFaceShapes: ['All face shapes'],
        notSuitableFaceShapes: [],

        features: {
            difficulty: 'Medium',
            maintenance: 'Medium (requires regular trim every 2-3 weeks)',
            style: 'Modern / Professional / Versatile'
        },

        faqs: [
            {
                question: 'Does Fade haircut fit round face?',
                answer: 'Yes! Fade haircuts work great for round faces, especially when paired with more volume on top. The tapered sides create vertical lines that help elongate the face visually.'
            },
            {
                question: 'What\'s the difference between Fade and Taper Fade?',
                answer: 'A Taper Fade gradually shortens hair but doesn\'t go down to skin. A regular Fade can go all the way to skin (bald fade). Taper Fade is more subtle and conservative, while skin fades are bolder and more dramatic.'
            },
            {
                question: 'Will AI change my face?',
                answer: 'Absolutely not. Hairnova AI only simulates the hairstyle and keeps your facial features 100% unchanged.'
            }
        ],

        relatedHairstyles: ['buzz-cut', 'undercut', 'pompadour', 'quiff'],

        imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&h=1000&fit=crop',
        exampleImages: [
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=500&fit=crop'
        ]
    },
    {
        slug: 'pompadour',
        name: 'Pompadour',
        nameZh: '背头/油头',
        metaTitle: 'Pompadour Hairstyle for Men - AI Analysis | Hairnova AI',
        metaDescription: 'Classic Pompadour hairstyle for men - AI determines if this voluminous swept-back look suits your face. Best for oval, square faces. Try it virtually!',
        h1: 'Pompadour – AI Recommendation Based on Face Shape',
        intro: 'The Pompadour is a classic men\'s hairstyle featuring voluminous hair swept upwards from the forehead and back from the sides. Originally popularized in the 1950s, the modern pompadour combines vintage sophistication with contemporary edge - perfect for formal and casual settings.',
        introZh: '背头是经典男士发型，特征是从额头向上梳起、两侧向后梳的蓬松头发。最初流行于1950年代，现代背头将复古精致与当代前卫相结合，适合正式和休闲场合。',

        suitableFaceShapes: ['Oval', 'Square', 'Diamond'],
        notSuitableFaceShapes: ['Long', 'Oblong'],

        features: {
            difficulty: 'Hard',
            maintenance: 'High (requires daily styling with pomade)',
            style: 'Classic / Formal / Sophisticated'
        },

        faqs: [
            {
                question: 'Does Pompadour fit round face?',
                answer: 'Pompadour can work for round faces IF styled correctly. The key is to add significant height on top to create vertical length and balance the face width. However, it requires more effort than styles naturally suited to round faces.'
            },
            {
                question: 'Is Pompadour good for thin hair?',
                answer: 'It can be challenging. Pompadour requires enough hair density to create volume. If you have thinning hair, consider using volumizing products or opt for a less voluminous style like Side Part or Textured Crop.'
            },
            {
                question: 'Will AI change my face?',
                answer: 'No. Hairnova AI only modifies the hairstyle area, never your facial features.'
            }
        ],

        relatedHairstyles: ['quiff', 'slick-back', 'side-part', 'undercut'],

        imageUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=800&h=1000&fit=crop',
        exampleImages: [
            'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=500&fit=crop'
        ]
    },
    {
        slug: 'undercut',
        name: 'Undercut',
        nameZh: '铲青/Undercut',
        metaTitle: 'Undercut Hairstyle for Men - AI Recommendation | Hairnova AI',
        metaDescription: 'Undercut hairstyle for men - Upload photo, AI analyzes if this bold disconnected cut fits you. Works for most face shapes. Virtual try-on available!',
        h1: 'Undercut – AI Recommendation Based on Face Shape',
        intro: 'The Undercut is a bold hairstyle where the sides and back are cut very short or shaved, while the top remains significantly longer - creating a strong "disconnected" contrast. This edgy, modern look offers incredible styling versatility and works particularly well for men with thick hair.',
        introZh: 'Undercut 是一种大胆的发型，两侧和后部剪得很短或剃光，而顶部保持明显较长，形成强烈的"断层"对比。这种前卫、现代的外观提供了极大的造型多样性，特别适合头发浓密的男士。',

        suitableFaceShapes: ['Oval', 'Square', 'Heart', 'Diamond'],
        notSuitableFaceShapes: [],

        features: {
            difficulty: 'Medium',
            maintenance: 'Medium-High (sides need frequent trimming)',
            style: 'Modern / Edgy / Versatile'
        },

        faqs: [
            {
                question: 'Does Undercut fit round face?',
                answer: 'Yes! Undercut can work well for round faces when the top is styled with volume and height. This creates vertical visual length that balances the face width. Avoid slicking it completely flat.'
            },
            {
                question: 'Is Undercut good for thin hair?',
                answer: 'Undercut can be tricky for thin hair because it concentrates all visible hair on top. If you have thinning hair, you might need volumizing products or consider a less dramatic length difference between top and sides.'
            },
            {
                question: 'Will AI change my face?',
                answer: 'No. Our AI only simulates the hairstyle, your facial structure stays exactly the same.'
            }
        ],

        relatedHairstyles: ['fade', 'pompadour', 'quiff', 'slick-back'],

        imageUrl: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=800&h=1000&fit=crop',
        exampleImages: [
            'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=400&h=500&fit=crop'
        ]
    },
    {
        slug: 'side-part',
        name: 'Side Part',
        nameZh: '侧分',
        metaTitle: 'Side Part Hairstyle for Men - AI Face Analysis | Hairnova AI',
        metaDescription: 'Classic Side Part hairstyle - AI checks if this timeless professional look suits your face shape. Perfect for business settings. Try virtually now!',
        h1: 'Side Part – AI Recommendation Based on Face Shape',
        intro: 'The Side Part is a timeless, professional hairstyle where hair is parted to one side and combed neatly. This versatile classic works in boardrooms and casual settings alike, offering a polished, put-together appearance that never goes out of style.',
        introZh: '侧分是永恒的专业发型，头发从一侧分开并整齐梳理。这种多功能经典发型适用于会议室和休闲场合，呈现出永不过时的优雅、得体外观。',

        suitableFaceShapes: ['All face shapes'],
        notSuitableFaceShapes: [],

        features: {
            difficulty: 'Easy',
            maintenance: 'Low-Medium',
            style: 'Classic / Professional / Timeless'
        },

        faqs: [
            {
                question: 'Does Side Part fit round face?',
                answer: 'Absolutely! Side Part works great for round faces. The asymmetrical parting creates visual angles that help counteract facial roundness. For best results, add some volume on top.'
            },
            {
                question: 'Is Side Part good for thin hair?',
                answer: 'Yes! Side Part is excellent for thin hair. The parting itself creates the illusion of more structure, and you can use light styling products to add volume without weighing hair down.'
            },
            {
                question: 'Will AI change my face?',
                answer: 'Never. Hairnova AI only changes the hairstyle, keeping all your facial features intact.'
            }
        ],

        relatedHairstyles: ['pompadour', 'crew-cut', 'slick-back', 'quiff'],

        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop',
        exampleImages: [
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop'
        ]
    }
];

// Helper function to get hairstyle by slug
export function getHairstyleBySlug(slug: string): HairstyleMenDetail | undefined {
    return HAIRSTYLES_MEN_DATA.find(h => h.slug === slug);
}

// Get all slugs for static generation
export function getAllHairstyleSlugs(): string[] {
    return HAIRSTYLES_MEN_DATA.map(h => h.slug);
}
