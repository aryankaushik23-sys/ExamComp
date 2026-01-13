// Quiz Screen - Interactive practice quiz with instant feedback
import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    Dimensions,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    SlideInRight,
    SlideOutLeft,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Typography, Button, Card } from '../../../shared/components';
import { colors, spacing, borderRadius, shadows } from '../../../theme';
import { QuizScreenProps } from '../../../app/navigation/types';
import { useAppDispatch, useAppSelector } from '../../../store';
import { startQuiz, answerQuestion, nextQuestion, completeQuiz, saveQuizResult } from '../../../store/slices/quizSlice';
import type { Question, Option, Difficulty } from '../../../store/slices/quizSlice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Sample quiz questions (in production, these would come from API)
const sampleQuestions: Question[] = [
    {
        id: '1',
        text: 'If z = x + iy and |z - 2| = |z + 2|, then z lies on:',
        textHi: 'यदि z = x + iy और |z - 2| = |z + 2|, तो z किस पर स्थित है:',
        options: [
            { id: 'a', text: 'Real axis', textHi: 'वास्तविक अक्ष', isCorrect: false },
            { id: 'b', text: 'Imaginary axis', textHi: 'काल्पनिक अक्ष', isCorrect: true },
            { id: 'c', text: 'A circle', textHi: 'एक वृत्त', isCorrect: false },
            { id: 'd', text: 'A parabola', textHi: 'एक परवलय', isCorrect: false },
        ],
        explanation: 'The equation |z - 2| = |z + 2| means the point z is equidistant from 2 and -2, which is the imaginary axis (x = 0).',
        explanationHi: 'समीकरण |z - 2| = |z + 2| का अर्थ है कि बिंदु z, 2 और -2 से समान दूरी पर है, जो काल्पनिक अक्ष (x = 0) है।',
        difficulty: 'medium',
        topicId: 'algebra',
        subtopicId: 'complex-numbers',
    },
    {
        id: '2',
        text: 'The value of ∫₀^π sin³x dx is:',
        textHi: '∫₀^π sin³x dx का मान है:',
        options: [
            { id: 'a', text: '0', textHi: '0', isCorrect: false },
            { id: 'b', text: '4/3', textHi: '4/3', isCorrect: true },
            { id: 'c', text: '2/3', textHi: '2/3', isCorrect: false },
            { id: 'd', text: '1', textHi: '1', isCorrect: false },
        ],
        explanation: 'Using the reduction formula or substitution, ∫₀^π sin³x dx = 4/3.',
        explanationHi: 'रिडक्शन सूत्र या प्रतिस्थापन का उपयोग करके, ∫₀^π sin³x dx = 4/3।',
        difficulty: 'medium',
        topicId: 'calculus',
        subtopicId: 'definite-integrals',
    },
    {
        id: '3',
        text: 'If the sum to infinity of the series 1 + 4x + 7x² + 10x³ + ... is 35/16, then x equals:',
        textHi: 'यदि श्रेणी 1 + 4x + 7x² + 10x³ + ... का अनंत तक योग 35/16 है, तो x बराबर है:',
        options: [
            { id: 'a', text: '1/2', textHi: '1/2', isCorrect: true },
            { id: 'b', text: '1/4', textHi: '1/4', isCorrect: false },
            { id: 'c', text: '1/3', textHi: '1/3', isCorrect: false },
            { id: 'd', text: '2/3', textHi: '2/3', isCorrect: false },
        ],
        explanation: 'This is an AGP series. Using the formula for sum of AGP, we get x = 1/2.',
        explanationHi: 'यह एक AGP श्रेणी है। AGP के योग के सूत्र का उपयोग करके, हमें x = 1/2 मिलता है।',
        difficulty: 'hard',
        topicId: 'algebra',
        subtopicId: 'sequences-series',
    },
];

interface OptionButtonProps {
    option: Option;
    isSelected: boolean;
    isCorrect?: boolean;
    showResult: boolean;
    onPress: () => void;
    language: 'en' | 'hi';
}

const OptionButton: React.FC<OptionButtonProps> = ({
    option,
    isSelected,
    isCorrect,
    showResult,
    onPress,
    language,
}) => {
    const animatedValue = useSharedValue(0);

    useEffect(() => {
        if (showResult) {
            animatedValue.value = withTiming(1, { duration: 300 });
        }
    }, [showResult]);

    const animatedStyle = useAnimatedStyle(() => {
        if (!showResult) {
            return {
                backgroundColor: isSelected ? colors.primary[100] : colors.surface.primary,
                borderColor: isSelected ? colors.primary[500] : colors.border.light,
            };
        }

        if (option.isCorrect) {
            return {
                backgroundColor: interpolateColor(
                    animatedValue.value,
                    [0, 1],
                    [colors.surface.primary, colors.successLight]
                ),
                borderColor: colors.success,
            };
        }

        if (isSelected && !option.isCorrect) {
            return {
                backgroundColor: interpolateColor(
                    animatedValue.value,
                    [0, 1],
                    [colors.surface.primary, colors.errorLight]
                ),
                borderColor: colors.error,
            };
        }

        return {
            backgroundColor: colors.surface.primary,
            borderColor: colors.border.light,
        };
    });

    return (
        <TouchableOpacity onPress={onPress} disabled={showResult} activeOpacity={0.7}>
            <Animated.View style={[styles.optionButton, animatedStyle]}>
                <View style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    <Typography
                        variant="labelMedium"
                        color={isSelected ? colors.neutral[0] : colors.text.primary}
                    >
                        {option.id.toUpperCase()}
                    </Typography>
                </View>
                <Typography variant="bodyMedium" style={styles.optionText}>
                    {language === 'hi' ? option.textHi : option.text}
                </Typography>
                {showResult && option.isCorrect && (
                    <Typography variant="labelMedium" color={colors.success}>✓</Typography>
                )}
                {showResult && isSelected && !option.isCorrect && (
                    <Typography variant="labelMedium" color={colors.error}>✗</Typography>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};

export const QuizScreen: React.FC = () => {
    const route = useRoute<QuizScreenProps['route']>();
    const navigation = useNavigation<QuizScreenProps['navigation']>();
    const dispatch = useAppDispatch();
    const language = useAppSelector((state) => state.settings.language);
    const currentQuiz = useAppSelector((state) => state.quiz.currentQuiz);

    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [score, setScore] = useState(0);

    // Initialize quiz
    useEffect(() => {
        dispatch(startQuiz(sampleQuestions));
        setQuestionStartTime(Date.now());
    }, [dispatch]);

    const questions = currentQuiz?.questions || [];
    const currentIndex = currentQuiz?.currentQuestionIndex || 0;
    const currentQuestion = questions[currentIndex];

    const handleOptionSelect = useCallback((optionId: string) => {
        if (showResult) return;
        setSelectedOptionId(optionId);
    }, [showResult]);

    const handleSubmitAnswer = useCallback(() => {
        if (!selectedOptionId || !currentQuestion) return;

        const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
        const selectedOption = currentQuestion.options.find(o => o.id === selectedOptionId);
        const isCorrect = selectedOption?.isCorrect || false;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        dispatch(answerQuestion({
            questionId: currentQuestion.id,
            selectedOptionId,
            isCorrect,
            timeTaken,
        }));

        setShowResult(true);
    }, [selectedOptionId, currentQuestion, questionStartTime, dispatch]);

    const handleNextQuestion = useCallback(() => {
        if (currentIndex < questions.length - 1) {
            dispatch(nextQuestion());
            setSelectedOptionId(null);
            setShowResult(false);
            setQuestionStartTime(Date.now());
        } else {
            // Quiz completed
            dispatch(completeQuiz());
            dispatch(saveQuizResult({
                id: Date.now().toString(),
                topicId: route.params.topicId,
                score,
                totalQuestions: questions.length,
                difficulty: 'medium',
                timeTaken: 0,
            }));
            navigation.navigate('QuizResult', {
                quizId: Date.now().toString(),
                score,
                total: questions.length,
            });
        }
    }, [currentIndex, questions.length, dispatch, score, navigation, route.params.topicId]);

    if (!currentQuestion) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <Typography variant="h3">Loading quiz...</Typography>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Typography variant="h3">←</Typography>
                    </TouchableOpacity>
                    <View style={styles.progressInfo}>
                        <Typography variant="labelMedium" color={colors.text.secondary}>
                            Question {currentIndex + 1} of {questions.length}
                        </Typography>
                    </View>
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(currentQuestion.difficulty) + '20' }]}>
                        <Typography
                            variant="labelSmall"
                            color={getDifficultyColor(currentQuestion.difficulty)}
                        >
                            {currentQuestion.difficulty.toUpperCase()}
                        </Typography>
                    </View>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${((currentIndex + 1) / questions.length) * 100}%` }]} />
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Question */}
                    <Animated.View
                        key={currentQuestion.id}
                        entering={SlideInRight}
                        exiting={SlideOutLeft}
                    >
                        <Card variant="elevated" style={styles.questionCard}>
                            <Typography variant="h3" style={styles.questionText}>
                                {language === 'hi' ? currentQuestion.textHi : currentQuestion.text}
                            </Typography>
                        </Card>
                    </Animated.View>

                    {/* Options */}
                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option) => (
                            <OptionButton
                                key={option.id}
                                option={option}
                                isSelected={selectedOptionId === option.id}
                                showResult={showResult}
                                onPress={() => handleOptionSelect(option.id)}
                                language={language}
                            />
                        ))}
                    </View>

                    {/* Explanation (shown after answer) */}
                    {showResult && (
                        <Animated.View entering={FadeIn.delay(300)}>
                            <Card variant="filled" style={styles.explanationCard}>
                                <Typography variant="labelMedium" color={colors.primary[700]} style={styles.explanationTitle}>
                                    💡 {language === 'hi' ? 'व्याख्या' : 'Explanation'}
                                </Typography>
                                <Typography variant="bodyMedium" color={colors.text.secondary}>
                                    {language === 'hi' ? currentQuestion.explanationHi : currentQuestion.explanation}
                                </Typography>
                            </Card>
                        </Animated.View>
                    )}
                </ScrollView>

                {/* Bottom Actions */}
                <View style={styles.bottomActions}>
                    {!showResult ? (
                        <Button
                            title={language === 'hi' ? 'उत्तर जमा करें' : 'Submit Answer'}
                            variant="primary"
                            size="lg"
                            fullWidth
                            disabled={!selectedOptionId}
                            onPress={handleSubmitAnswer}
                        />
                    ) : (
                        <Button
                            title={currentIndex < questions.length - 1
                                ? (language === 'hi' ? 'अगला प्रश्न' : 'Next Question')
                                : (language === 'hi' ? 'परिणाम देखें' : 'View Results')
                            }
                            variant="primary"
                            size="lg"
                            fullWidth
                            onPress={handleNextQuestion}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const getDifficultyColor = (difficulty: Difficulty): string => {
    switch (difficulty) {
        case 'easy': return colors.success;
        case 'medium': return colors.warning;
        case 'hard': return colors.error;
        default: return colors.primary[500];
    }
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
    },
    progressInfo: {
        flex: 1,
        alignItems: 'center',
    },
    difficultyBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    progressBar: {
        height: 4,
        backgroundColor: colors.neutral[200],
        marginHorizontal: spacing.md,
        borderRadius: borderRadius.full,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary[500],
        borderRadius: borderRadius.full,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.lg,
    },
    questionCard: {
        marginBottom: spacing.lg,
    },
    questionText: {
        lineHeight: 32,
    },
    optionsContainer: {
        gap: spacing.md,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 2,
        marginBottom: spacing.sm,
        ...shadows.sm,
    },
    optionLabel: {
        width: 32,
        height: 32,
        borderRadius: borderRadius.full,
        backgroundColor: colors.neutral[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    optionLabelSelected: {
        backgroundColor: colors.primary[500],
    },
    optionText: {
        flex: 1,
    },
    explanationCard: {
        marginTop: spacing.lg,
        marginBottom: spacing.lg,
        backgroundColor: colors.primary[50],
    },
    explanationTitle: {
        marginBottom: spacing.sm,
    },
    bottomActions: {
        padding: spacing.md,
        backgroundColor: colors.surface.primary,
        borderTopWidth: 1,
        borderTopColor: colors.border.light,
    },
});

export default QuizScreen;
