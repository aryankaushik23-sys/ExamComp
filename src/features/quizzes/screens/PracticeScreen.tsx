// Practice Screen - Quiz selection and practice hub
import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Typography, Card, Button } from '../../../shared/components';
import { colors, spacing, borderRadius, shadows } from '../../../theme';
import { useAppSelector } from '../../../store';
import { RootStackNavigationProp } from '../../../app/navigation/types';
import { jeeMathsSyllabus } from '../../topics/data/syllabus';

type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

interface QuizOptionCardProps {
    title: string;
    titleHi: string;
    description: string;
    descriptionHi: string;
    icon: string;
    color: string;
    onPress: () => void;
    language: 'en' | 'hi';
    index: number;
}

const QuizOptionCard: React.FC<QuizOptionCardProps> = ({
    title,
    titleHi,
    description,
    descriptionHi,
    icon,
    color,
    onPress,
    language,
    index,
}) => (
    <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
        <Card variant="elevated" onPress={onPress} style={styles.optionCard}>
            <View style={[styles.optionIcon, { backgroundColor: color + '20' }]}>
                <Typography variant="h1">{icon}</Typography>
            </View>
            <View style={styles.optionInfo}>
                <Typography variant="h4">{language === 'hi' ? titleHi : title}</Typography>
                <Typography variant="caption" color={colors.text.secondary}>
                    {language === 'hi' ? descriptionHi : description}
                </Typography>
            </View>
            <Typography variant="h3" color={colors.text.tertiary}>›</Typography>
        </Card>
    </Animated.View>
);

export const PracticeScreen: React.FC = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const language = useAppSelector((state) => state.settings.language);
    const quizHistory = useAppSelector((state) => state.quiz.quizHistory);

    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('mixed');

    const totalQuizzes = quizHistory.length;
    const averageScore = totalQuizzes > 0
        ? Math.round(quizHistory.reduce((acc, q) => acc + (q.score / q.totalQuestions) * 100, 0) / totalQuizzes)
        : 0;

    const difficultyOptions: { value: Difficulty; label: string; labelHi: string; color: string }[] = [
        { value: 'easy', label: 'Easy', labelHi: 'आसान', color: colors.success },
        { value: 'medium', label: 'Medium', labelHi: 'मध्यम', color: colors.warning },
        { value: 'hard', label: 'Hard', labelHi: 'कठिन', color: colors.error },
        { value: 'mixed', label: 'Mixed', labelHi: 'मिश्रित', color: colors.primary[500] },
    ];

    const handleStartQuiz = (topicId: string) => {
        navigation.navigate('Quiz', {
            topicId,
            difficulty: selectedDifficulty === 'mixed' ? undefined : selectedDifficulty
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Typography variant="h1">
                        {language === 'hi' ? 'अभ्यास करें' : 'Practice'}
                    </Typography>
                    <Typography variant="bodyMedium" color={colors.text.secondary}>
                        {language === 'hi' ? 'रोज़ाना अभ्यास से बनेंगे चैंपियन!' : 'Daily practice makes you a champion!'}
                    </Typography>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <Card variant="elevated" style={styles.statCard}>
                        <Typography variant="h1" color={colors.primary[500]}>{totalQuizzes}</Typography>
                        <Typography variant="caption" color={colors.text.secondary}>
                            {language === 'hi' ? 'कुल प्रश्नोत्तरी' : 'Total Quizzes'}
                        </Typography>
                    </Card>
                    <Card variant="elevated" style={styles.statCard}>
                        <Typography variant="h1" color={colors.secondary[500]}>{averageScore}%</Typography>
                        <Typography variant="caption" color={colors.text.secondary}>
                            {language === 'hi' ? 'औसत स्कोर' : 'Avg Score'}
                        </Typography>
                    </Card>
                </View>

                {/* Difficulty Selector */}
                <View style={styles.section}>
                    <Typography variant="h3" style={styles.sectionTitle}>
                        {language === 'hi' ? 'कठिनाई स्तर चुनें' : 'Select Difficulty'}
                    </Typography>
                    <View style={styles.difficultyContainer}>
                        {difficultyOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.difficultyChip,
                                    selectedDifficulty === option.value && {
                                        backgroundColor: option.color,
                                        borderColor: option.color,
                                    },
                                ]}
                                onPress={() => setSelectedDifficulty(option.value)}
                            >
                                <Typography
                                    variant="labelMedium"
                                    color={selectedDifficulty === option.value ? colors.neutral[0] : colors.text.primary}
                                >
                                    {language === 'hi' ? option.labelHi : option.label}
                                </Typography>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Quick Practice Options */}
                <View style={styles.section}>
                    <Typography variant="h3" style={styles.sectionTitle}>
                        {language === 'hi' ? 'त्वरित अभ्यास' : 'Quick Practice'}
                    </Typography>

                    <QuizOptionCard
                        title="Daily Challenge"
                        titleHi="दैनिक चुनौती"
                        description="5 random questions from all topics"
                        descriptionHi="सभी विषयों से 5 यादृच्छिक प्रश्न"
                        icon="🎯"
                        color={colors.accent[500]}
                        onPress={() => handleStartQuiz('daily')}
                        language={language}
                        index={0}
                    />

                    <QuizOptionCard
                        title="Previous Year Questions"
                        titleHi="पिछले वर्ष के प्रश्न"
                        description="Practice with actual JEE questions"
                        descriptionHi="वास्तविक JEE प्रश्नों के साथ अभ्यास करें"
                        icon="📜"
                        color={colors.purple[500]}
                        onPress={() => handleStartQuiz('pyq')}
                        language={language}
                        index={1}
                    />
                </View>

                {/* Topic-wise Practice */}
                <View style={styles.section}>
                    <Typography variant="h3" style={styles.sectionTitle}>
                        {language === 'hi' ? 'विषय के अनुसार अभ्यास' : 'Practice by Topic'}
                    </Typography>

                    {jeeMathsSyllabus.slice(0, 4).map((topic, index) => (
                        <QuizOptionCard
                            key={topic.id}
                            title={topic.name}
                            titleHi={topic.nameHi}
                            description={`${topic.subtopics.length} subtopics`}
                            descriptionHi={`${topic.subtopics.length} उपविषय`}
                            icon={topic.icon}
                            color={topic.color}
                            onPress={() => handleStartQuiz(topic.id)}
                            language={language}
                            index={index + 2}
                        />
                    ))}
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>
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
        paddingHorizontal: spacing.md,
    },
    header: {
        paddingVertical: spacing.lg,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: spacing.md,
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        marginBottom: spacing.md,
    },
    difficultyContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    difficultyChip: {
        flex: 1,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.full,
        borderWidth: 2,
        borderColor: colors.border.medium,
        alignItems: 'center',
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    optionIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    optionInfo: {
        flex: 1,
    },
    bottomPadding: {
        height: spacing['3xl'],
    },
});

export default PracticeScreen;
