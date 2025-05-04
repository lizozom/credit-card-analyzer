interface BusinessMapping {
    pattern: RegExp | string;
    category: string;
}

const businessMappings: any[] = [
    { pattern: /שופרסל/, name: 'שופרסל' }, 
    { pattern: /טיב טעם/, name: 'טיב טעם' }, 
    { pattern: /רולדין/, name: 'רולדין' }, 
    { pattern: /רמי לוי/, name: 'רמי לוי' }, 
    { pattern: /AM:PM/, name: 'AM:PM' }, 
    { pattern: /קשת טעמים/, name: 'קשת טעמים' }, 
    { pattern: /סופרפארם/, name:  'סופרפארם' },
    { pattern: /סופר פארם/, name:  'סופרפארם' },
    { pattern: /בי דראגסטורס/, name:  'בי דראגסטורס' },
    { pattern: /אונליין BE/, name:  'בי דראגסטורס' },
    { pattern: /BIT/, name:  'BIT' },
];

export const businessToCategory: BusinessMapping[] = [
    // Add your business mappings here with regex support
    { pattern: /^AMAZON MKTPL/, category: 'קניות כללי' },  // Will match any business starting with שופרסל
    
    { pattern: /ALIPAYSINGA/, category: 'קניות כללי' }, 
    { pattern: /ALIEXPRESS/, category: 'קניות כללי' }, 
    { pattern: /aliexpress/, category: 'קניות כללי' }, 
    
    { pattern: "רד בוקס פארסל", category: 'קניות כללי' },
    { pattern: "הבורסה לתכשיטים בת ים", category: 'קניות כללי' },
    { pattern: /AWESOMEBOOKS/, category: 'קניות כללי' }, 

    { pattern: "תשלום ועד בית", category: 'תשתיות ושירותים' },  
    { pattern: /פרטנר/, category:  'תשתיות ושירותים' },  

    { pattern: /AWS/, category: 'דיגיטל' },  
    { pattern: /^ADOBE/, category: 'דיגיטל' },
    { pattern: /^CONFLUENT CLOUD/, category: 'דיגיטל' },
    { pattern: /TESTING EXAM/, category: 'דיגיטל' },
    { pattern: /COURSERA/, category: 'דיגיטל' },
    { pattern: /CODECADEMY/, category: 'דיגיטל' },
    { pattern: /OPENAI/, category: 'דיגיטל' },
    { pattern: /YOUTUBEPREMIUM/, category: 'דיגיטל' },
    { pattern: /AMAZON PRIME/, category: 'דיגיטל' },
    { pattern: /PRIME VIDEO/, category: 'דיגיטל' },
    { pattern: /GAMES WORKSHOP/, category:  'דיגיטל' },
    { pattern: /COHERE/, category:  'דיגיטל' },
    { pattern: /VERCEL/, category:  'דיגיטל' },
    { pattern: /MANUS/, category:  'דיגיטל' },
    { pattern: /PIXOP/, category:  'דיגיטל' },
    { pattern: /SQSP/, category:  'דיגיטל' },
    { pattern: /NETFLIX/, category:  'דיגיטל' },

    { pattern: /בהצדעה/, category: 'שוברים' },

    { pattern: /דלק/, category: 'תחבורה ורכבים' },
    { pattern: /חניון/, category: 'תחבורה ורכבים' },
    { pattern: /YELLOW/, category: 'תחבורה ורכבים' },
    { pattern: /פז אפליקציית יילו/, category: 'תחבורה ורכבים'  },
    { pattern: /סדש/, category: 'תחבורה ורכבים'  },

    { pattern: /סטודיו נעים/, category:  'פנאי, בידור וספורט' },
    { pattern: /פעלטון/, category:  'פנאי, בידור וספורט' },
    { pattern: /גאיהלנד/, category:  'פנאי, בידור וספורט' },

    { pattern: /מכבידנט/, category:  'רפואה ובתי מרקחת' },
    { pattern: /אונליין BE/, category:  'רפואה ובתי מרקחת' },
    { pattern: /דראגסטור/, category:  'רפואה ובתי מרקחת' },

    { pattern: /מט"ח/, category:  'שונות' },
    
];

export const categoryMapping: { [key: string]: string } = {
    // Restaurants & Food
    'מסעדות': 'מסעדות וקפה',
    'מסעדות, קפה וברים': 'מסעדות וקפה',
    'מזון ומשקאות': 'מזון וצריכה',
    'מזון וצריכה': 'מזון וצריכה',

    // Technology
    'חשמל ומחשבים': 'קניות כללי',
    'מחשבים': 'קניות כללי',
    'תקשורת ומחשבים': 'קניות כללי',
    'שירותי תקשורת': 'קניות כללי',

    // Beauty & Cosmetics
    'טיפוח ויופי': 'רפואה ובתי מרקחת',
    'קוסמטיקה וטיפוח': 'רפואה ובתי מרקחת',

    // Leisure & Entertainment
    'פנאי בילוי':  'רפואה ובתי מרקחת',
    'פנאי, בידור וספורט': 'רפואה ובתי מרקחת',
    'רפואה ובתי מרקחת': 'רפואה ובתי מרקחת',

    'עיצוב הבית': 'לבית' ,
    'ריהוט ובית': 'לבית' ,

    'מוסדות': 'תשתיות ושירותים',
    'עירייה וממשלה': 'תשתיות ושירותים',
    'דלק, חשמל וגז': 'תשתיות ושירותים',

    // Keep other categories as is
    'אופנה': 'קניות כללי' ,
    'ביטוח': 'ביטוח',
    'העברת כספים': 'העברת כספים',
    'חיות מחמד': 'חיות מחמד',
    'טיסות ותיירות': 'טיסות ותיירות',
    'מקצועות חופשיים': 'מקצועות חופשיים',
    'משיכת מזומן': 'משיכת מזומן',
    'ספרים ודפוס': 'קניות כללי',
    'ציוד ומשרד': 'ציוד ומשרד',
    'שונות': 'שונות',
    'תחבורה ורכבים': 'תחבורה ורכבים',
    'תעשיה ומכירות': 'שוברים'
};

export function getNormalizedBusinessName(businessName: string, memo?: string): string {
    // Check if the business name matches any of the patterns
    const mapping = businessMappings.find(mapping => {
        if (mapping.pattern instanceof RegExp) {
            return mapping.pattern.test(businessName);
        }
        return mapping.pattern === businessName;
    });

    // If a match is found and it's BIT, append the memo
    if (mapping && mapping.name === 'BIT' && memo) {
        return `${mapping.name} - ${memo}`;
    }

    // If a match is found, return the name; otherwise, return the original name
    return mapping ? mapping.name : businessName;
}

export function getNormalizedCategory(category: string, businessName?: string): string {
    // First check if we have a specific mapping for this business name
    if (businessName) {
        const businessMapping = businessToCategory.find(mapping => {
            if (mapping.pattern instanceof RegExp) {
                return mapping.pattern.test(businessName);
            }
            return mapping.pattern === businessName;
        });

        if (businessMapping) {
            console.log(`Business name "${businessName}" matched category "${businessMapping.category}"`);
            return businessMapping.category;
        }
    }
    
    // Otherwise use the category mapping
    return categoryMapping[category] || category;
}