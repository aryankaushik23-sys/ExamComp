// JEE Mathematics Syllabus Data - Complete topic structure

export interface SubTopic {
    id: string;
    name: string;
    nameHi: string;
    isCompleted: boolean;
    videoCount: number;
    quizCount: number;
}

export interface Topic {
    id: string;
    name: string;
    nameHi: string;
    icon: string;
    color: string;
    description: string;
    descriptionHi: string;
    subtopics: SubTopic[];
    order: number;
}

export const jeeMathsSyllabus: Topic[] = [
    {
        id: 'algebra',
        name: 'Algebra',
        nameHi: 'बीजगणित',
        icon: '🔢',
        color: '#2196F3',
        description: 'Fundamentals of algebra including complex numbers, sequences, and matrices',
        descriptionHi: 'सम्मिश्र संख्याओं, अनुक्रमों और मैट्रिक्स सहित बीजगणित की मूल बातें',
        order: 1,
        subtopics: [
            { id: 'complex-numbers', name: 'Complex Numbers', nameHi: 'सम्मिश्र संख्याएं', isCompleted: false, videoCount: 8, quizCount: 5 },
            { id: 'quadratic-equations', name: 'Quadratic Equations', nameHi: 'द्विघात समीकरण', isCompleted: false, videoCount: 6, quizCount: 4 },
            { id: 'sequences-series', name: 'Sequences & Series', nameHi: 'अनुक्रम और श्रेणी', isCompleted: false, videoCount: 10, quizCount: 6 },
            { id: 'permutations-combinations', name: 'Permutations & Combinations', nameHi: 'क्रमचय और संचय', isCompleted: false, videoCount: 7, quizCount: 5 },
            { id: 'binomial-theorem', name: 'Binomial Theorem', nameHi: 'द्विपद प्रमेय', isCompleted: false, videoCount: 5, quizCount: 4 },
            { id: 'matrices-determinants', name: 'Matrices & Determinants', nameHi: 'आव्यूह और सारणिक', isCompleted: false, videoCount: 12, quizCount: 8 },
        ],
    },
    {
        id: 'calculus',
        name: 'Calculus',
        nameHi: 'कलन',
        icon: '∫',
        color: '#009688',
        description: 'Differential and integral calculus with applications',
        descriptionHi: 'अवकल और समाकल कलन अनुप्रयोगों के साथ',
        order: 2,
        subtopics: [
            { id: 'limits-continuity', name: 'Limits & Continuity', nameHi: 'सीमा और सांतत्य', isCompleted: false, videoCount: 8, quizCount: 5 },
            { id: 'differentiation', name: 'Differentiation', nameHi: 'अवकलन', isCompleted: false, videoCount: 10, quizCount: 7 },
            { id: 'application-derivatives', name: 'Application of Derivatives', nameHi: 'अवकलज के अनुप्रयोग', isCompleted: false, videoCount: 9, quizCount: 6 },
            { id: 'indefinite-integrals', name: 'Indefinite Integrals', nameHi: 'अनिश्चित समाकल', isCompleted: false, videoCount: 8, quizCount: 5 },
            { id: 'definite-integrals', name: 'Definite Integrals', nameHi: 'निश्चित समाकल', isCompleted: false, videoCount: 7, quizCount: 5 },
            { id: 'differential-equations', name: 'Differential Equations', nameHi: 'अवकल समीकरण', isCompleted: false, videoCount: 8, quizCount: 6 },
        ],
    },
    {
        id: 'coordinate-geometry',
        name: 'Coordinate Geometry',
        nameHi: 'निर्देशांक ज्यामिति',
        icon: '📐',
        color: '#FF9800',
        description: 'Straight lines, circles, conics, and 3D geometry',
        descriptionHi: 'सरल रेखाएं, वृत्त, शंकु और 3D ज्यामिति',
        order: 3,
        subtopics: [
            { id: 'straight-lines', name: 'Straight Lines', nameHi: 'सरल रेखाएं', isCompleted: false, videoCount: 6, quizCount: 4 },
            { id: 'circles', name: 'Circles', nameHi: 'वृत्त', isCompleted: false, videoCount: 8, quizCount: 5 },
            { id: 'parabola', name: 'Parabola', nameHi: 'परवलय', isCompleted: false, videoCount: 6, quizCount: 4 },
            { id: 'ellipse', name: 'Ellipse', nameHi: 'दीर्घवृत्त', isCompleted: false, videoCount: 6, quizCount: 4 },
            { id: 'hyperbola', name: 'Hyperbola', nameHi: 'अतिपरवलय', isCompleted: false, videoCount: 5, quizCount: 4 },
            { id: '3d-geometry', name: '3D Geometry', nameHi: '3D ज्यामिति', isCompleted: false, videoCount: 10, quizCount: 6 },
        ],
    },
    {
        id: 'trigonometry',
        name: 'Trigonometry',
        nameHi: 'त्रिकोणमिति',
        icon: '📊',
        color: '#9C27B0',
        description: 'Trigonometric functions, equations, and their applications',
        descriptionHi: 'त्रिकोणमितीय फलन, समीकरण और उनके अनुप्रयोग',
        order: 4,
        subtopics: [
            { id: 'trig-ratios', name: 'Trigonometric Ratios', nameHi: 'त्रिकोणमितीय अनुपात', isCompleted: false, videoCount: 6, quizCount: 4 },
            { id: 'trig-equations', name: 'Trigonometric Equations', nameHi: 'त्रिकोणमितीय समीकरण', isCompleted: false, videoCount: 7, quizCount: 5 },
            { id: 'inverse-trig', name: 'Inverse Trigonometry', nameHi: 'प्रतिलोम त्रिकोणमिति', isCompleted: false, videoCount: 6, quizCount: 4 },
            { id: 'properties-triangles', name: 'Properties of Triangles', nameHi: 'त्रिभुजों के गुण', isCompleted: false, videoCount: 5, quizCount: 4 },
        ],
    },
    {
        id: 'vectors',
        name: 'Vectors & 3D',
        nameHi: 'सदिश और 3D',
        icon: '➡️',
        color: '#F44336',
        description: 'Vector algebra and three-dimensional geometry',
        descriptionHi: 'सदिश बीजगणित और त्रि-आयामी ज्यामिति',
        order: 5,
        subtopics: [
            { id: 'vector-algebra', name: 'Vector Algebra', nameHi: 'सदिश बीजगणित', isCompleted: false, videoCount: 8, quizCount: 5 },
            { id: 'vector-products', name: 'Scalar & Vector Products', nameHi: 'अदिश और सदिश गुणनफल', isCompleted: false, videoCount: 7, quizCount: 5 },
            { id: 'lines-planes-3d', name: 'Lines & Planes in 3D', nameHi: '3D में रेखाएं और समतल', isCompleted: false, videoCount: 9, quizCount: 6 },
        ],
    },
    {
        id: 'probability-statistics',
        name: 'Probability & Statistics',
        nameHi: 'प्रायिकता और सांख्यिकी',
        icon: '🎲',
        color: '#4CAF50',
        description: 'Probability theory, random variables, and statistics',
        descriptionHi: 'प्रायिकता सिद्धांत, यादृच्छिक चर और सांख्यिकी',
        order: 6,
        subtopics: [
            { id: 'probability-basics', name: 'Probability Basics', nameHi: 'प्रायिकता मूल बातें', isCompleted: false, videoCount: 6, quizCount: 4 },
            { id: 'conditional-probability', name: 'Conditional Probability', nameHi: 'सशर्त प्रायिकता', isCompleted: false, videoCount: 5, quizCount: 4 },
            { id: 'random-variables', name: 'Random Variables', nameHi: 'यादृच्छिक चर', isCompleted: false, videoCount: 6, quizCount: 4 },
            { id: 'statistics', name: 'Statistics', nameHi: 'सांख्यिकी', isCompleted: false, videoCount: 5, quizCount: 4 },
        ],
    },
    {
        id: 'mathematical-reasoning',
        name: 'Mathematical Reasoning',
        nameHi: 'गणितीय तर्क',
        icon: '🧠',
        color: '#795548',
        description: 'Sets, relations, functions, and mathematical logic',
        descriptionHi: 'समुच्चय, संबंध, फलन और गणितीय तर्क',
        order: 7,
        subtopics: [
            { id: 'sets-relations', name: 'Sets & Relations', nameHi: 'समुच्चय और संबंध', isCompleted: false, videoCount: 5, quizCount: 4 },
            { id: 'functions', name: 'Functions', nameHi: 'फलन', isCompleted: false, videoCount: 7, quizCount: 5 },
            { id: 'mathematical-induction', name: 'Mathematical Induction', nameHi: 'गणितीय आगमन', isCompleted: false, videoCount: 4, quizCount: 3 },
        ],
    },
];

export const getTotalTopics = (): number => jeeMathsSyllabus.length;

export const getTotalSubtopics = (): number =>
    jeeMathsSyllabus.reduce((acc, topic) => acc + topic.subtopics.length, 0);

export const getTopicById = (id: string): Topic | undefined =>
    jeeMathsSyllabus.find(topic => topic.id === id);

export const getSubtopicById = (topicId: string, subtopicId: string): SubTopic | undefined => {
    const topic = getTopicById(topicId);
    return topic?.subtopics.find((sub: SubTopic) => sub.id === subtopicId);
};
