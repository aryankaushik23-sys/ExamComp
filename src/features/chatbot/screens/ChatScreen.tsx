// AI Chatbot Screen - Math doubt solving with step-by-step solutions
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
    SlideInRight,
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Typography, Card, Button } from '../../../shared/components';
import { colors, spacing, borderRadius, shadows, typography } from '../../../theme';
import { useAppSelector } from '../../../store';
import { RootStackNavigationProp } from '../../../app/navigation/types';

interface Message {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    isLoading?: boolean;
}

interface SuggestionChipProps {
    text: string;
    onPress: () => void;
}

const SuggestionChip: React.FC<SuggestionChipProps> = ({ text, onPress }) => (
    <TouchableOpacity style={styles.suggestionChip} onPress={onPress}>
        <Typography variant="caption" color={colors.primary[700]}>{text}</Typography>
    </TouchableOpacity>
);

interface ChatBubbleProps {
    message: Message;
    language: 'en' | 'hi';
    index: number;
}

const TypingIndicator: React.FC = () => {
    const opacity = useSharedValue(1);

    useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(0.3, { duration: 500 }),
                withTiming(1, { duration: 500 })
            ),
            -1
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[styles.typingContainer, animatedStyle]}>
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
        </Animated.View>
    );
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, language, index }) => {
    const isUser = message.type === 'user';

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 50).springify()}
            style={[
                styles.bubbleContainer,
                isUser ? styles.bubbleContainerUser : styles.bubbleContainerAssistant,
            ]}
        >
            {!isUser && (
                <View style={styles.avatarContainer}>
                    <Typography variant="h3">🤖</Typography>
                </View>
            )}
            <View
                style={[
                    styles.bubble,
                    isUser ? styles.bubbleUser : styles.bubbleAssistant,
                ]}
            >
                {message.isLoading ? (
                    <TypingIndicator />
                ) : (
                    <Typography
                        variant="bodyMedium"
                        color={isUser ? colors.neutral[0] : colors.text.primary}
                    >
                        {message.content}
                    </Typography>
                )}
            </View>
            {isUser && (
                <View style={styles.avatarContainer}>
                    <Typography variant="h3">👤</Typography>
                </View>
            )}
        </Animated.View>
    );
};

// Simulated AI responses for math queries
const getAIResponse = async (query: string, language: 'en' | 'hi'): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses: Record<string, { en: string; hi: string }> = {
        'quadratic': {
            en: `Great question! Let me explain how to solve quadratic equations step by step:

**Standard Form:** ax² + bx + c = 0

**Methods to Solve:**

1. **Factoring Method**
   - Factor the quadratic expression
   - Set each factor equal to zero
   - Solve for x

2. **Quadratic Formula**
   x = (-b ± √(b² - 4ac)) / 2a
   
3. **Completing the Square**
   - Move constant to right side
   - Add (b/2a)² to both sides
   - Take square root

**Example:** Solve x² + 5x + 6 = 0

Step 1: Factor: (x + 2)(x + 3) = 0
Step 2: Set each factor to zero:
   x + 2 = 0  →  x = -2
   x + 3 = 0  →  x = -3

**Answer:** x = -2 or x = -3

Would you like me to explain any specific method in more detail?`,
            hi: `बहुत अच्छा प्रश्न! मैं द्विघात समीकरणों को हल करने के तरीके समझाता हूं:

**मानक रूप:** ax² + bx + c = 0

**हल करने की विधियां:**

1. **गुणनखंड विधि**
   - द्विघात व्यंजक का गुणनखंड करें
   - प्रत्येक गुणनखंड को शून्य के बराबर रखें
   - x का मान ज्ञात करें

2. **द्विघात सूत्र**
   x = (-b ± √(b² - 4ac)) / 2a

**उदाहरण:** x² + 5x + 6 = 0 हल करें

चरण 1: गुणनखंड: (x + 2)(x + 3) = 0
चरण 2: प्रत्येक गुणनखंड को शून्य रखें:
   x + 2 = 0  →  x = -2
   x + 3 = 0  →  x = -3

**उत्तर:** x = -2 या x = -3

क्या आप किसी विशेष विधि के बारे में और जानना चाहते हैं?`,
        },
        'integration': {
            en: `Let me explain integration concepts:

**Basic Integration Rules:**

1. **Power Rule:** ∫xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ -1)

2. **Constant Rule:** ∫k dx = kx + C

3. **Sum Rule:** ∫(f + g) dx = ∫f dx + ∫g dx

4. **Common Integrals:**
   - ∫sin x dx = -cos x + C
   - ∫cos x dx = sin x + C
   - ∫eˣ dx = eˣ + C
   - ∫1/x dx = ln|x| + C

**Example:** Find ∫(3x² + 2x - 5) dx

Step 1: Apply sum rule and integrate each term
   = 3(x³/3) + 2(x²/2) - 5x + C
   = x³ + x² - 5x + C

Would you like to practice with more examples?`,
            hi: `मैं समाकलन की अवधारणाएं समझाता हूं:

**बुनियादी समाकलन नियम:**

1. **घात नियम:** ∫xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ -1)

2. **स्थिरांक नियम:** ∫k dx = kx + C

3. **योग नियम:** ∫(f + g) dx = ∫f dx + ∫g dx

**उदाहरण:** ∫(3x² + 2x - 5) dx ज्ञात करें

चरण 1: योग नियम लागू करें और प्रत्येक पद का समाकलन करें
   = 3(x³/3) + 2(x²/2) - 5x + C
   = x³ + x² - 5x + C

क्या आप और उदाहरणों के साथ अभ्यास करना चाहते हैं?`,
        },
        'default': {
            en: `I'm here to help you with JEE Mathematics! 📚

You can ask me about:
• Algebra (Complex Numbers, Matrices, etc.)
• Calculus (Limits, Differentiation, Integration)
• Coordinate Geometry (Straight Lines, Circles, Conics)
• Trigonometry
• Vectors & 3D Geometry
• Probability & Statistics

Just type your question, and I'll provide step-by-step solutions!

For example:
- "How do I solve quadratic equations?"
- "Explain integration by parts"
- "What is the formula for distance between two points in 3D?"`,
            hi: `मैं JEE गणित में आपकी मदद के लिए यहां हूं! 📚

आप मुझसे पूछ सकते हैं:
• बीजगणित (सम्मिश्र संख्याएं, आव्यूह, आदि)
• कलन (सीमा, अवकलन, समाकलन)
• निर्देशांक ज्यामिति
• त्रिकोणमिति
• सदिश और 3D ज्यामिति
• प्रायिकता और सांख्यिकी

बस अपना प्रश्न टाइप करें, और मैं चरण-दर-चरण समाधान दूंगा!`,
        },
    };

    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('quadratic') || lowerQuery.includes('द्विघात')) {
        return responses.quadratic[language];
    } else if (lowerQuery.includes('integra') || lowerQuery.includes('समाकल')) {
        return responses.integration[language];
    }

    return responses.default[language];
};

const suggestedQuestions = [
    { en: 'Solve x² + 5x + 6 = 0', hi: 'x² + 5x + 6 = 0 हल करें' },
    { en: 'Explain differentiation', hi: 'अवकलन समझाएं' },
    { en: 'Integration by parts', hi: 'खंडशः समाकलन' },
    { en: 'Properties of triangles', hi: 'त्रिभुज के गुण' },
];

export const ChatScreen: React.FC = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const language = useAppSelector((state) => state.settings.language);
    const scrollViewRef = useRef<FlatList>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'assistant',
            content: language === 'hi'
                ? 'नमस्ते! 👋 मैं आपका JEE गणित AI ट्यूटर हूं। आज मैं आपकी क्या मदद कर सकता हूं?'
                : 'Hello! 👋 I\'m your JEE Mathematics AI Tutor. How can I help you today?',
            timestamp: new Date(),
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = useCallback(async () => {
        if (!inputText.trim() || isTyping) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: inputText.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Add loading message
        const loadingMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: '',
            timestamp: new Date(),
            isLoading: true,
        };
        setMessages(prev => [...prev, loadingMessage]);

        // Get AI response
        try {
            const response = await getAIResponse(userMessage.content, language);

            setMessages(prev => {
                const filtered = prev.filter(m => !m.isLoading);
                return [...filtered, {
                    id: (Date.now() + 2).toString(),
                    type: 'assistant',
                    content: response,
                    timestamp: new Date(),
                }];
            });
        } catch (error) {
            setMessages(prev => {
                const filtered = prev.filter(m => !m.isLoading);
                return [...filtered, {
                    id: (Date.now() + 2).toString(),
                    type: 'assistant',
                    content: language === 'hi'
                        ? 'क्षमा करें, कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।'
                        : 'Sorry, something went wrong. Please try again.',
                    timestamp: new Date(),
                }];
            });
        } finally {
            setIsTyping(false);
        }
    }, [inputText, isTyping, language]);

    const handleSuggestionPress = useCallback((suggestion: { en: string; hi: string }) => {
        setInputText(language === 'hi' ? suggestion.hi : suggestion.en);
    }, [language]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Typography variant="h3">←</Typography>
                    </TouchableOpacity>
                    <View style={styles.headerTitle}>
                        <Typography variant="h3">🤖 {language === 'hi' ? 'AI ट्यूटर' : 'AI Tutor'}</Typography>
                        <Typography variant="caption" color={colors.success}>
                            {language === 'hi' ? 'ऑनलाइन' : 'Online'}
                        </Typography>
                    </View>
                    <TouchableOpacity onPress={() => setMessages([{
                        id: '1',
                        type: 'assistant',
                        content: language === 'hi'
                            ? 'नमस्ते! 👋 मैं आपका JEE गणित AI ट्यूटर हूं। आज मैं आपकी क्या मदद कर सकता हूं?'
                            : 'Hello! 👋 I\'m your JEE Mathematics AI Tutor. How can I help you today?',
                        timestamp: new Date(),
                    }])}>
                        <Typography variant="bodyMedium">🗑️</Typography>
                    </TouchableOpacity>
                </View>

                {/* Chat Messages */}
                <FlatList
                    ref={scrollViewRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <ChatBubble message={item} language={language} index={index} />
                    )}
                    contentContainerStyle={styles.messagesContainer}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                />

                {/* Suggestions */}
                {messages.length === 1 && (
                    <Animated.View
                        entering={FadeInUp.delay(300)}
                        style={styles.suggestionsContainer}
                    >
                        <Typography variant="labelMedium" color={colors.text.secondary} style={styles.suggestionsTitle}>
                            {language === 'hi' ? 'सुझाए गए प्रश्न' : 'Suggested Questions'}
                        </Typography>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {suggestedQuestions.map((suggestion, index) => (
                                <SuggestionChip
                                    key={index}
                                    text={language === 'hi' ? suggestion.hi : suggestion.en}
                                    onPress={() => handleSuggestionPress(suggestion)}
                                />
                            ))}
                        </ScrollView>
                    </Animated.View>
                )}

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={language === 'hi' ? 'अपना गणित का प्रश्न टाइप करें...' : 'Type your math question...'}
                        placeholderTextColor={colors.text.tertiary}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        maxLength={1000}
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, (!inputText.trim() || isTyping) && styles.sendButtonDisabled]}
                        onPress={handleSend}
                        disabled={!inputText.trim() || isTyping}
                    >
                        <Typography variant="h3" color={!inputText.trim() || isTyping ? colors.neutral[400] : colors.neutral[0]}>
                            →
                        </Typography>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.light,
        backgroundColor: colors.surface.primary,
    },
    headerTitle: {
        alignItems: 'center',
    },
    messagesContainer: {
        padding: spacing.md,
    },
    bubbleContainer: {
        flexDirection: 'row',
        marginBottom: spacing.md,
        alignItems: 'flex-end',
    },
    bubbleContainerUser: {
        justifyContent: 'flex-end',
    },
    bubbleContainerAssistant: {
        justifyContent: 'flex-start',
    },
    avatarContainer: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.full,
        backgroundColor: colors.neutral[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: spacing.xs,
    },
    bubble: {
        maxWidth: '75%',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        ...shadows.sm,
    },
    bubbleUser: {
        backgroundColor: colors.primary[500],
        borderBottomRightRadius: borderRadius.xs,
    },
    bubbleAssistant: {
        backgroundColor: colors.surface.primary,
        borderBottomLeftRadius: borderRadius.xs,
    },
    typingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    typingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.neutral[400],
        marginHorizontal: 2,
    },
    suggestionsContainer: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.border.light,
    },
    suggestionsTitle: {
        marginBottom: spacing.sm,
    },
    suggestionChip: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.primary[50],
        borderRadius: borderRadius.full,
        marginRight: spacing.sm,
        borderWidth: 1,
        borderColor: colors.primary[200],
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: spacing.md,
        backgroundColor: colors.surface.primary,
        borderTopWidth: 1,
        borderTopColor: colors.border.light,
    },
    textInput: {
        flex: 1,
        minHeight: 44,
        maxHeight: 120,
        backgroundColor: colors.neutral[100],
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        ...typography.bodyMedium,
        color: colors.text.primary,
        marginRight: spacing.sm,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.full,
        backgroundColor: colors.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: colors.neutral[200],
    },
});

export default ChatScreen;
