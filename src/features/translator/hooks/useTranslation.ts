// Translation Hook - Bi-directional Hindi-English translation
import { useState, useCallback } from 'react';

type Language = 'en' | 'hi';

interface TranslationCache {
    [key: string]: { en: string; hi: string };
}

// Local cache for translations
const translationCache: TranslationCache = {};

// Common translations used throughout the app
export const commonTranslations: TranslationCache = {
    // Navigation
    home: { en: 'Home', hi: 'होम' },
    topics: { en: 'Topics', hi: 'विषय' },
    practice: { en: 'Practice', hi: 'अभ्यास' },
    tests: { en: 'Tests', hi: 'परीक्षा' },
    profile: { en: 'Profile', hi: 'प्रोफ़ाइल' },
    settings: { en: 'Settings', hi: 'सेटिंग्स' },

    // Common actions
    start: { en: 'Start', hi: 'शुरू करें' },
    continue: { en: 'Continue', hi: 'जारी रखें' },
    submit: { en: 'Submit', hi: 'जमा करें' },
    cancel: { en: 'Cancel', hi: 'रद्द करें' },
    save: { en: 'Save', hi: 'सहेजें' },
    next: { en: 'Next', hi: 'अगला' },
    previous: { en: 'Previous', hi: 'पिछला' },
    back: { en: 'Back', hi: 'वापस' },
    done: { en: 'Done', hi: 'पूर्ण' },
    retry: { en: 'Retry', hi: 'पुनः प्रयास' },

    // Quiz related
    question: { en: 'Question', hi: 'प्रश्न' },
    answer: { en: 'Answer', hi: 'उत्तर' },
    correct: { en: 'Correct', hi: 'सही' },
    incorrect: { en: 'Incorrect', hi: 'गलत' },
    score: { en: 'Score', hi: 'स्कोर' },
    time: { en: 'Time', hi: 'समय' },

    // Difficulty
    easy: { en: 'Easy', hi: 'आसान' },
    medium: { en: 'Medium', hi: 'मध्यम' },
    hard: { en: 'Hard', hi: 'कठिन' },

    // Status
    loading: { en: 'Loading...', hi: 'लोड हो रहा है...' },
    error: { en: 'Error occurred', hi: 'त्रुटि हुई' },
    success: { en: 'Success', hi: 'सफलता' },

    // Learning
    video: { en: 'Video', hi: 'वीडियो' },
    videos: { en: 'Videos', hi: 'वीडियो' },
    quiz: { en: 'Quiz', hi: 'प्रश्नोत्तरी' },
    quizzes: { en: 'Quizzes', hi: 'प्रश्नोत्तरी' },
    notes: { en: 'Notes', hi: 'नोट्स' },
    lesson: { en: 'Lesson', hi: 'पाठ' },
    chapter: { en: 'Chapter', hi: 'अध्याय' },
    completed: { en: 'Completed', hi: 'पूर्ण' },
    progress: { en: 'Progress', hi: 'प्रगति' },

    // Time
    minutes: { en: 'minutes', hi: 'मिनट' },
    hours: { en: 'hours', hi: 'घंटे' },
    days: { en: 'days', hi: 'दिन' },

    // Greetings
    goodMorning: { en: 'Good Morning', hi: 'सुप्रभात' },
    goodAfternoon: { en: 'Good Afternoon', hi: 'नमस्कार' },
    goodEvening: { en: 'Good Evening', hi: 'शुभ संध्या' },
};

export const useTranslation = (language: Language) => {
    const [isTranslating, setIsTranslating] = useState(false);

    // Get translation from cache or common translations
    const t = useCallback((key: string): string => {
        // Check common translations first
        if (commonTranslations[key]) {
            return commonTranslations[key][language];
        }

        // Check cache
        if (translationCache[key]) {
            return translationCache[key][language];
        }

        // Return original key if not found
        return key;
    }, [language]);

    // Translate a text dynamically (for user-generated content)
    const translateText = useCallback(async (text: string, from: Language, to: Language): Promise<string> => {
        const cacheKey = `${text}_${from}_${to}`;

        // Check cache first
        if (translationCache[cacheKey]) {
            return translationCache[cacheKey][to];
        }

        setIsTranslating(true);

        try {
            // In production, this would call Google Cloud Translation API or similar
            // For now, return the original text
            // const response = await fetch(`https://translation.googleapis.com/...`);
            // const translated = await response.json();

            // Simulated delay
            await new Promise(resolve => setTimeout(resolve, 100));

            // Cache the result
            translationCache[cacheKey] = {
                [from]: text,
                [to]: text, // In real implementation, this would be the translated text
            } as { en: string; hi: string };

            return text;
        } catch (error) {
            console.error('Translation error:', error);
            return text;
        } finally {
            setIsTranslating(false);
        }
    }, []);

    // Get translation with fallback
    const tWithFallback = useCallback((key: string, fallback: string): string => {
        const translation = t(key);
        return translation === key ? fallback : translation;
    }, [t]);

    return {
        t,
        tWithFallback,
        translateText,
        isTranslating,
        language,
    };
};

// Language toggle component helper
export const getOppositeLanguage = (current: Language): Language => {
    return current === 'en' ? 'hi' : 'en';
};

// Format number in Hindi or English
export const formatNumber = (num: number, language: Language): string => {
    if (language === 'hi') {
        const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return String(num).split('').map(digit =>
            /\d/.test(digit) ? hindiDigits[parseInt(digit)] : digit
        ).join('');
    }
    return String(num);
};

export default useTranslation;
