// Mock Test Screen - Full-length JEE-pattern mock test interface
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    Alert,
    Dimensions,
} from 'react-native';
import Animated, {
    FadeIn,
    SlideInUp,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
} from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Typography, Button, Card } from '../../../shared/components';
import { colors, spacing, borderRadius, shadows } from '../../../theme';
import { MockTestScreenProps } from '../../../app/navigation/types';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
    updateTimeRemaining,
    selectAnswer,
    markQuestion,
    clearAnswer,
    navigateToQuestion,
    submitTest,
    saveTestResult,
    QuestionStatus,
} from '../../../store/slices/mockTestSlice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface TimerProps {
    timeRemaining: number;
    onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, onTimeUp }) => {
    const dispatch = useAppDispatch();
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    const isWarning = timeRemaining < 300; // 5 minutes warning
    const pulseAnim = useSharedValue(1);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeRemaining > 0) {
                dispatch(updateTimeRemaining(timeRemaining - 1));
            } else {
                clearInterval(interval);
                onTimeUp();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeRemaining, dispatch, onTimeUp]);

    useEffect(() => {
        if (isWarning) {
            pulseAnim.value = withRepeat(
                withSequence(
                    withTiming(1.1, { duration: 500 }),
                    withTiming(1, { duration: 500 })
                ),
                -1
            );
        }
    }, [isWarning]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseAnim.value }],
    }));

    return (
        <Animated.View
            style={[
                styles.timer,
                isWarning && styles.timerWarning,
                animatedStyle,
            ]}
        >
            <Typography variant="h3" color={isWarning ? colors.error : colors.text.primary}>
                ⏱️ {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </Typography>
        </Animated.View>
    );
};

interface QuestionPaletteProps {
    questions: { status: QuestionStatus; selectedOptionId: string | null }[];
    currentIndex: number;
    onQuestionSelect: (index: number) => void;
    isVisible: boolean;
    onClose: () => void;
}

const QuestionPalette: React.FC<QuestionPaletteProps> = ({
    questions,
    currentIndex,
    onQuestionSelect,
    isVisible,
    onClose,
}) => {
    const getStatusColor = (status: QuestionStatus, isSelected: boolean) => {
        if (status === 'answered') return colors.success;
        if (status === 'marked') return colors.purple[500];
        if (status === 'marked-answered') return colors.purple[300];
        return isSelected ? colors.primary[500] : colors.neutral[200];
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.paletteOverlay}>
                <Animated.View
                    entering={SlideInUp}
                    style={styles.paletteContainer}
                >
                    <View style={styles.paletteHeader}>
                        <Typography variant="h3">Question Palette</Typography>
                        <TouchableOpacity onPress={onClose}>
                            <Typography variant="h3">✕</Typography>
                        </TouchableOpacity>
                    </View>

                    {/* Legend */}
                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
                            <Typography variant="caption">Answered</Typography>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.purple[500] }]} />
                            <Typography variant="caption">Marked</Typography>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.neutral[200] }]} />
                            <Typography variant="caption">Not Visited</Typography>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={styles.paletteGrid}>
                        {questions.map((q, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.paletteItem,
                                    { backgroundColor: getStatusColor(q.status, index === currentIndex) },
                                    index === currentIndex && styles.paletteItemCurrent,
                                ]}
                                onPress={() => {
                                    onQuestionSelect(index);
                                    onClose();
                                }}
                            >
                                <Typography
                                    variant="labelMedium"
                                    color={q.status !== 'unanswered' || index === currentIndex ? colors.neutral[0] : colors.text.primary}
                                >
                                    {index + 1}
                                </Typography>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <Button
                        title="Close"
                        variant="outline"
                        fullWidth
                        onPress={onClose}
                    />
                </Animated.View>
            </View>
        </Modal>
    );
};

// Sample mock test data
const mockTestData = {
    id: 'mock-1',
    name: 'JEE Main Mock Test 1',
    sections: [{
        id: 'section-1',
        name: 'Mathematics',
        nameHi: 'गणित',
        timeLimit: 60,
        questions: Array.from({ length: 25 }, (_, i) => ({
            id: `q${i + 1}`,
            text: `Sample question ${i + 1}: If f(x) = x² + ${i}x + ${i + 1}, find f'(1).`,
            textHi: `नमूना प्रश्न ${i + 1}: यदि f(x) = x² + ${i}x + ${i + 1}, तो f'(1) ज्ञात करें।`,
            options: [
                { id: 'a', text: `${2 + i}`, textHi: `${2 + i}`, isCorrect: true },
                { id: 'b', text: `${3 + i}`, textHi: `${3 + i}`, isCorrect: false },
                { id: 'c', text: `${1 + i}`, textHi: `${1 + i}`, isCorrect: false },
                { id: 'd', text: `${4 + i}`, textHi: `${4 + i}`, isCorrect: false },
            ],
            explanation: `f'(x) = 2x + ${i}, so f'(1) = 2 + ${i} = ${2 + i}`,
            explanationHi: `f'(x) = 2x + ${i}, इसलिए f'(1) = 2 + ${i} = ${2 + i}`,
            difficulty: ['easy', 'medium', 'hard'][i % 3] as 'easy' | 'medium' | 'hard',
            topicId: 'calculus',
            subtopicId: 'differentiation',
            marks: 4,
            negativeMarks: 1,
            status: 'unanswered' as QuestionStatus,
            selectedOptionId: null,
        })),
    }],
};

export const MockTestScreen: React.FC = () => {
    const route = useRoute<MockTestScreenProps['route']>();
    const navigation = useNavigation<MockTestScreenProps['navigation']>();
    const dispatch = useAppDispatch();
    const language = useAppSelector((state) => state.settings.language);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 1 hour
    const [showPalette, setShowPalette] = useState(false);
    const [questions, setQuestions] = useState(mockTestData.sections[0].questions);

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionSelect = useCallback((optionId: string) => {
        setSelectedOptionId(optionId);
        setQuestions(prev => {
            const updated = [...prev];
            updated[currentQuestionIndex] = {
                ...updated[currentQuestionIndex],
                selectedOptionId: optionId,
                status: updated[currentQuestionIndex].status === 'marked' ? 'marked-answered' : 'answered',
            };
            return updated;
        });
    }, [currentQuestionIndex]);

    const handleMarkForReview = useCallback(() => {
        setQuestions(prev => {
            const updated = [...prev];
            const current = updated[currentQuestionIndex];
            updated[currentQuestionIndex] = {
                ...current,
                status: current.selectedOptionId ? 'marked-answered' : 'marked',
            };
            return updated;
        });
    }, [currentQuestionIndex]);

    const handleClearResponse = useCallback(() => {
        setSelectedOptionId(null);
        setQuestions(prev => {
            const updated = [...prev];
            updated[currentQuestionIndex] = {
                ...updated[currentQuestionIndex],
                selectedOptionId: null,
                status: updated[currentQuestionIndex].status === 'marked-answered' ? 'marked' : 'unanswered',
            };
            return updated;
        });
    }, [currentQuestionIndex]);

    const handleNavigate = useCallback((direction: 'prev' | 'next') => {
        if (direction === 'prev' && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        } else if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    }, [currentQuestionIndex, questions.length]);

    const handleSubmit = useCallback(() => {
        const answered = questions.filter(q => q.selectedOptionId !== null).length;
        const unanswered = questions.length - answered;

        Alert.alert(
            'Submit Test?',
            `You have answered ${answered} questions. ${unanswered} questions are unanswered. Are you sure you want to submit?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Submit',
                    style: 'destructive',
                    onPress: () => {
                        // Calculate score
                        let correct = 0;
                        let wrong = 0;
                        questions.forEach(q => {
                            if (q.selectedOptionId) {
                                const selectedOption = q.options.find(o => o.id === q.selectedOptionId);
                                if (selectedOption?.isCorrect) {
                                    correct++;
                                } else {
                                    wrong++;
                                }
                            }
                        });

                        const totalMarks = correct * 4 - wrong * 1;

                        navigation.navigate('MockTestResult', {
                            resultId: 'result-1',
                        });
                    },
                },
            ]
        );
    }, [questions, navigation]);

    const handleTimeUp = useCallback(() => {
        Alert.alert('Time Up!', 'Your test has been auto-submitted.', [
            { text: 'View Results', onPress: handleSubmit },
        ]);
    }, [handleSubmit]);

    useEffect(() => {
        // Update selected option when navigating to a different question
        setSelectedOptionId(currentQuestion?.selectedOptionId || null);
    }, [currentQuestionIndex, currentQuestion?.selectedOptionId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Typography variant="h3">←</Typography>
                    </TouchableOpacity>
                    <Timer timeRemaining={timeRemaining} onTimeUp={handleTimeUp} />
                    <TouchableOpacity onPress={() => setShowPalette(true)}>
                        <View style={styles.paletteButton}>
                            <Typography variant="labelMedium">📋</Typography>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Question Info Bar */}
                <View style={styles.questionInfo}>
                    <Typography variant="labelMedium" color={colors.text.secondary}>
                        Q.{currentQuestionIndex + 1} of {questions.length}
                    </Typography>
                    <View style={styles.marksInfo}>
                        <Typography variant="caption" color={colors.success}>+{currentQuestion.marks}</Typography>
                        <Typography variant="caption" color={colors.text.tertiary}> / </Typography>
                        <Typography variant="caption" color={colors.error}>-{currentQuestion.negativeMarks}</Typography>
                    </View>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Question */}
                    <Card variant="elevated" style={styles.questionCard}>
                        <Typography variant="bodyLarge">
                            {language === 'hi' ? currentQuestion.textHi : currentQuestion.text}
                        </Typography>
                    </Card>

                    {/* Options */}
                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.optionButton,
                                    selectedOptionId === option.id && styles.optionSelected,
                                ]}
                                onPress={() => handleOptionSelect(option.id)}
                                activeOpacity={0.7}
                            >
                                <View style={[
                                    styles.optionLabel,
                                    selectedOptionId === option.id && styles.optionLabelSelected,
                                ]}>
                                    <Typography
                                        variant="labelMedium"
                                        color={selectedOptionId === option.id ? colors.neutral[0] : colors.text.primary}
                                    >
                                        {option.id.toUpperCase()}
                                    </Typography>
                                </View>
                                <Typography variant="bodyMedium">
                                    {language === 'hi' ? option.textHi : option.text}
                                </Typography>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <Button
                            title="Mark for Review"
                            variant={questions[currentQuestionIndex].status.includes('marked') ? 'secondary' : 'outline'}
                            size="sm"
                            onPress={handleMarkForReview}
                            style={styles.actionButton}
                        />
                        <Button
                            title="Clear Response"
                            variant="ghost"
                            size="sm"
                            onPress={handleClearResponse}
                            disabled={!selectedOptionId}
                            style={styles.actionButton}
                        />
                    </View>
                </ScrollView>

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <Button
                        title="← Previous"
                        variant="outline"
                        size="md"
                        disabled={currentQuestionIndex === 0}
                        onPress={() => handleNavigate('prev')}
                        style={styles.navButton}
                    />
                    {currentQuestionIndex < questions.length - 1 ? (
                        <Button
                            title="Next →"
                            variant="primary"
                            size="md"
                            onPress={() => handleNavigate('next')}
                            style={styles.navButton}
                        />
                    ) : (
                        <Button
                            title="Submit Test"
                            variant="danger"
                            size="md"
                            onPress={handleSubmit}
                            style={styles.navButton}
                        />
                    )}
                </View>

                {/* Question Palette Modal */}
                <QuestionPalette
                    questions={questions}
                    currentIndex={currentQuestionIndex}
                    onQuestionSelect={setCurrentQuestionIndex}
                    isVisible={showPalette}
                    onClose={() => setShowPalette(false)}
                />
            </View>
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
    },
    timer: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.neutral[100],
        borderRadius: borderRadius.lg,
    },
    timerWarning: {
        backgroundColor: colors.errorLight,
    },
    paletteButton: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.md,
        backgroundColor: colors.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.neutral[50],
    },
    marksInfo: {
        flexDirection: 'row',
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
    },
    questionCard: {
        marginBottom: spacing.lg,
    },
    optionsContainer: {
        gap: spacing.sm,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 2,
        borderColor: colors.border.light,
        backgroundColor: colors.surface.primary,
        marginBottom: spacing.sm,
    },
    optionSelected: {
        borderColor: colors.primary[500],
        backgroundColor: colors.primary[50],
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
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.lg,
        marginBottom: spacing.xl,
        gap: spacing.md,
    },
    actionButton: {
        flex: 1,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        backgroundColor: colors.surface.primary,
        borderTopWidth: 1,
        borderTopColor: colors.border.light,
        gap: spacing.md,
    },
    navButton: {
        flex: 1,
    },
    paletteOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    paletteContainer: {
        backgroundColor: colors.surface.primary,
        borderTopLeftRadius: borderRadius['2xl'],
        borderTopRightRadius: borderRadius['2xl'],
        padding: spacing.lg,
        maxHeight: '70%',
    },
    paletteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: spacing.lg,
        paddingVertical: spacing.sm,
        backgroundColor: colors.neutral[50],
        borderRadius: borderRadius.md,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: spacing.xs,
    },
    paletteGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingBottom: spacing.lg,
    },
    paletteItem: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        margin: spacing.xs,
    },
    paletteItemCurrent: {
        borderWidth: 2,
        borderColor: colors.primary[700],
    },
});

export default MockTestScreen;
