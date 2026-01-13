// Mock Tests List Screen - Browse and start mock tests
import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Typography, Card, Button } from '../../../shared/components';
import { colors, spacing, borderRadius, shadows } from '../../../theme';
import { useAppSelector } from '../../../store';
import { RootStackNavigationProp } from '../../../app/navigation/types';

interface MockTestItem {
    id: string;
    name: string;
    nameHi: string;
    description: string;
    descriptionHi: string;
    totalQuestions: number;
    totalMarks: number;
    duration: number; // minutes
    difficulty: 'easy' | 'medium' | 'hard';
    isAttempted: boolean;
    bestScore?: number;
}

const mockTests: MockTestItem[] = [
    {
        id: 'mock-1',
        name: 'JEE Main Mock Test 1',
        nameHi: 'JEE मुख्य मॉक टेस्ट 1',
        description: 'Full syllabus test covering all topics',
        descriptionHi: 'सभी विषयों को कवर करने वाला पूर्ण पाठ्यक्रम परीक्षण',
        totalQuestions: 25,
        totalMarks: 100,
        duration: 60,
        difficulty: 'medium',
        isAttempted: false,
    },
    {
        id: 'mock-2',
        name: 'JEE Main Mock Test 2',
        nameHi: 'JEE मुख्य मॉक टेस्ट 2',
        description: 'Focus on Calculus and Algebra',
        descriptionHi: 'कलन और बीजगणित पर केंद्रित',
        totalQuestions: 25,
        totalMarks: 100,
        duration: 60,
        difficulty: 'medium',
        isAttempted: true,
        bestScore: 76,
    },
    {
        id: 'mock-3',
        name: 'JEE Advanced Mock Test 1',
        nameHi: 'JEE एडवांस्ड मॉक टेस्ट 1',
        description: 'Advanced level questions',
        descriptionHi: 'उन्नत स्तर के प्रश्न',
        totalQuestions: 30,
        totalMarks: 120,
        duration: 90,
        difficulty: 'hard',
        isAttempted: false,
    },
    {
        id: 'mock-4',
        name: 'Quick Practice Test',
        nameHi: 'त्वरित अभ्यास परीक्षा',
        description: 'Short test for quick revision',
        descriptionHi: 'त्वरित पुनरीक्षण के लिए छोटा परीक्षण',
        totalQuestions: 15,
        totalMarks: 60,
        duration: 30,
        difficulty: 'easy',
        isAttempted: true,
        bestScore: 48,
    },
];

interface TestCardProps {
    test: MockTestItem;
    onPress: () => void;
    language: 'en' | 'hi';
    index: number;
}

const TestCard: React.FC<TestCardProps> = ({ test, onPress, language, index }) => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return colors.success;
            case 'medium': return colors.warning;
            case 'hard': return colors.error;
            default: return colors.primary[500];
        }
    };

    const getDifficultyLabel = (difficulty: string) => {
        if (language === 'hi') {
            switch (difficulty) {
                case 'easy': return 'आसान';
                case 'medium': return 'मध्यम';
                case 'hard': return 'कठिन';
                default: return difficulty;
            }
        }
        return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    };

    return (
        <Animated.View entering={FadeInRight.delay(index * 100).springify()}>
            <Card variant="elevated" style={styles.testCard}>
                <View style={styles.testHeader}>
                    <View style={styles.testTitleRow}>
                        <Typography variant="h3">
                            {language === 'hi' ? test.nameHi : test.name}
                        </Typography>
                        {test.isAttempted && (
                            <View style={styles.attemptedBadge}>
                                <Typography variant="labelSmall" color={colors.success}>
                                    ✓ {language === 'hi' ? 'प्रयास किया' : 'Attempted'}
                                </Typography>
                            </View>
                        )}
                    </View>
                    <Typography variant="bodySmall" color={colors.text.secondary} style={styles.description}>
                        {language === 'hi' ? test.descriptionHi : test.description}
                    </Typography>
                </View>

                <View style={styles.testInfo}>
                    <View style={styles.infoItem}>
                        <Typography variant="h4" color={colors.primary[500]}>{test.totalQuestions}</Typography>
                        <Typography variant="caption" color={colors.text.tertiary}>
                            {language === 'hi' ? 'प्रश्न' : 'Questions'}
                        </Typography>
                    </View>
                    <View style={styles.infoDivider} />
                    <View style={styles.infoItem}>
                        <Typography variant="h4" color={colors.secondary[500]}>{test.totalMarks}</Typography>
                        <Typography variant="caption" color={colors.text.tertiary}>
                            {language === 'hi' ? 'अंक' : 'Marks'}
                        </Typography>
                    </View>
                    <View style={styles.infoDivider} />
                    <View style={styles.infoItem}>
                        <Typography variant="h4" color={colors.accent[500]}>{test.duration}</Typography>
                        <Typography variant="caption" color={colors.text.tertiary}>
                            {language === 'hi' ? 'मिनट' : 'Minutes'}
                        </Typography>
                    </View>
                    <View style={styles.infoDivider} />
                    <View style={styles.infoItem}>
                        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(test.difficulty) + '20' }]}>
                            <Typography variant="labelSmall" color={getDifficultyColor(test.difficulty)}>
                                {getDifficultyLabel(test.difficulty)}
                            </Typography>
                        </View>
                    </View>
                </View>

                {test.isAttempted && test.bestScore !== undefined && (
                    <View style={styles.scoreContainer}>
                        <Typography variant="bodySmall" color={colors.text.secondary}>
                            {language === 'hi' ? 'सर्वश्रेष्ठ स्कोर' : 'Best Score'}: {' '}
                        </Typography>
                        <Typography variant="labelLarge" color={colors.primary[500]}>
                            {test.bestScore}/{test.totalMarks}
                        </Typography>
                    </View>
                )}

                <Button
                    title={test.isAttempted
                        ? (language === 'hi' ? 'पुनः प्रयास करें' : 'Retry Test')
                        : (language === 'hi' ? 'टेस्ट शुरू करें' : 'Start Test')
                    }
                    variant={test.isAttempted ? 'outline' : 'primary'}
                    fullWidth
                    onPress={onPress}
                />
            </Card>
        </Animated.View>
    );
};

export const MockTestsListScreen: React.FC = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const language = useAppSelector((state) => state.settings.language);
    const testHistory = useAppSelector((state) => state.mockTest.testHistory);

    const totalTests = testHistory.length;
    const averagePercentile = totalTests > 0
        ? Math.round(testHistory.reduce((acc, t) => acc + (t.percentile || 0), 0) / totalTests)
        : 0;

    const handleStartTest = (testId: string) => {
        navigation.navigate('MockTest', { testId });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={mockTests}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TestCard
                        test={item}
                        onPress={() => handleStartTest(item.id)}
                        language={language}
                        index={index}
                    />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <Typography variant="h1">
                            {language === 'hi' ? 'मॉक टेस्ट' : 'Mock Tests'}
                        </Typography>
                        <Typography variant="bodyMedium" color={colors.text.secondary}>
                            {language === 'hi' ? 'JEE पैटर्न के अनुसार अभ्यास करें' : 'Practice with JEE pattern tests'}
                        </Typography>

                        {/* Stats Summary */}
                        <View style={styles.statsRow}>
                            <Card variant="filled" style={styles.statCard}>
                                <Typography variant="h2" color={colors.primary[500]}>{totalTests}</Typography>
                                <Typography variant="caption" color={colors.text.secondary}>
                                    {language === 'hi' ? 'परीक्षाएं दी गई' : 'Tests Taken'}
                                </Typography>
                            </Card>
                            <Card variant="filled" style={styles.statCard}>
                                <Typography variant="h2" color={colors.secondary[500]}>
                                    {averagePercentile > 0 ? `${averagePercentile}%` : '-'}
                                </Typography>
                                <Typography variant="caption" color={colors.text.secondary}>
                                    {language === 'hi' ? 'औसत प्रतिशत' : 'Avg Percentile'}
                                </Typography>
                            </Card>
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    listContent: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing['3xl'],
    },
    header: {
        paddingVertical: spacing.lg,
    },
    statsRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.lg,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: spacing.md,
    },
    separator: {
        height: spacing.md,
    },
    testCard: {
        padding: spacing.md,
    },
    testHeader: {
        marginBottom: spacing.md,
    },
    testTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.xs,
    },
    attemptedBadge: {
        backgroundColor: colors.successLight,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    description: {
        marginTop: spacing.xs,
    },
    testInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.neutral[50],
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
    },
    infoDivider: {
        width: 1,
        height: 30,
        backgroundColor: colors.border.light,
    },
    difficultyBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
});

export default MockTestsListScreen;
