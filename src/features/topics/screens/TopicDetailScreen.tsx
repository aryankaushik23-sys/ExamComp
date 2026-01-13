// Topic Detail Screen - Detailed view of a topic with subtopics, videos, and quizzes
import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Typography, Card, Button } from '../../../shared/components';
import { colors, spacing, borderRadius, shadows } from '../../../theme';
import { TopicDetailScreenProps } from '../../../app/navigation/types';
import { useAppSelector } from '../../../store';
import { getTopicById } from '../data/syllabus';

export const TopicDetailScreen: React.FC = () => {
    const route = useRoute<TopicDetailScreenProps['route']>();
    const navigation = useNavigation<TopicDetailScreenProps['navigation']>();
    const language = useAppSelector((state) => state.settings.language);

    const { topicId, topicName } = route.params;
    const topic = getTopicById(topicId);

    if (!topic) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Typography variant="h3">Topic not found</Typography>
            </SafeAreaView>
        );
    }

    const completedSubtopics = topic.subtopics.filter(s => s.isCompleted).length;
    const progress = (completedSubtopics / topic.subtopics.length) * 100;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <LinearGradient
                    colors={[topic.color, topic.color + 'CC']}
                    style={styles.header}
                >
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Typography variant="h3" color={colors.neutral[0]}>←</Typography>
                    </TouchableOpacity>

                    <View style={styles.headerContent}>
                        <Typography variant="displayMedium" color={colors.neutral[0]}>{topic.icon}</Typography>
                        <Typography variant="h1" color={colors.neutral[0]} style={styles.topicTitle}>
                            {language === 'hi' ? topic.nameHi : topic.name}
                        </Typography>
                        <Typography variant="bodyMedium" color={colors.neutral[100]}>
                            {language === 'hi' ? topic.descriptionHi : topic.description}
                        </Typography>

                        {/* Progress */}
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <View style={[styles.progressFill, { width: `${progress}%` }]} />
                            </View>
                            <Typography variant="labelMedium" color={colors.neutral[0]}>
                                {completedSubtopics}/{topic.subtopics.length} {language === 'hi' ? 'पूर्ण' : 'completed'}
                            </Typography>
                        </View>
                    </View>
                </LinearGradient>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={styles.quickActionButton}
                        onPress={() => navigation.navigate('Quiz', { topicId: topic.id })}
                    >
                        <Typography variant="h3">📝</Typography>
                        <Typography variant="labelSmall">{language === 'hi' ? 'प्रश्नोत्तरी' : 'Quiz'}</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickActionButton}>
                        <Typography variant="h3">🎬</Typography>
                        <Typography variant="labelSmall">{language === 'hi' ? 'वीडियो' : 'Videos'}</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickActionButton}>
                        <Typography variant="h3">📄</Typography>
                        <Typography variant="labelSmall">{language === 'hi' ? 'नोट्स' : 'Notes'}</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quickActionButton}
                        onPress={() => navigation.navigate('Chat')}
                    >
                        <Typography variant="h3">🤖</Typography>
                        <Typography variant="labelSmall">{language === 'hi' ? 'AI' : 'AI Help'}</Typography>
                    </TouchableOpacity>
                </View>

                {/* Subtopics */}
                <View style={styles.section}>
                    <Typography variant="h3" style={styles.sectionTitle}>
                        {language === 'hi' ? 'उपविषय' : 'Subtopics'}
                    </Typography>

                    {topic.subtopics.map((subtopic, index) => (
                        <Animated.View
                            key={subtopic.id}
                            entering={FadeInDown.delay(index * 50)}
                        >
                            <Card variant="elevated" style={styles.subtopicCard}>
                                <View style={styles.subtopicHeader}>
                                    <View style={[
                                        styles.checkCircle,
                                        subtopic.isCompleted && styles.checkCircleCompleted
                                    ]}>
                                        {subtopic.isCompleted && (
                                            <Typography variant="labelSmall" color={colors.neutral[0]}>✓</Typography>
                                        )}
                                    </View>
                                    <View style={styles.subtopicInfo}>
                                        <Typography variant="h4">
                                            {language === 'hi' ? subtopic.nameHi : subtopic.name}
                                        </Typography>
                                        <Typography variant="caption" color={colors.text.secondary}>
                                            {subtopic.videoCount} {language === 'hi' ? 'वीडियो' : 'videos'} • {subtopic.quizCount} {language === 'hi' ? 'प्रश्नोत्तरी' : 'quizzes'}
                                        </Typography>
                                    </View>
                                </View>

                                <View style={styles.subtopicActions}>
                                    <Button
                                        title={language === 'hi' ? 'अभ्यास' : 'Practice'}
                                        variant="outline"
                                        size="sm"
                                        onPress={() => navigation.navigate('Quiz', { topicId: topic.id, subtopicId: subtopic.id })}
                                    />
                                </View>
                            </Card>
                        </Animated.View>
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
    },
    header: {
        paddingTop: spacing.md,
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.md,
        borderBottomLeftRadius: borderRadius['2xl'],
        borderBottomRightRadius: borderRadius['2xl'],
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.full,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    headerContent: {
        alignItems: 'center',
    },
    topicTitle: {
        marginTop: spacing.sm,
        marginBottom: spacing.xs,
    },
    progressContainer: {
        width: '100%',
        marginTop: spacing.lg,
        alignItems: 'center',
    },
    progressBar: {
        width: '80%',
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: borderRadius.full,
        overflow: 'hidden',
        marginBottom: spacing.sm,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.neutral[0],
        borderRadius: borderRadius.full,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.md,
        marginTop: -spacing.lg,
        marginHorizontal: spacing.md,
        backgroundColor: colors.surface.primary,
        borderRadius: borderRadius.lg,
        ...shadows.md,
    },
    quickActionButton: {
        alignItems: 'center',
        padding: spacing.sm,
    },
    section: {
        paddingHorizontal: spacing.md,
        marginTop: spacing.lg,
    },
    sectionTitle: {
        marginBottom: spacing.md,
    },
    subtopicCard: {
        marginBottom: spacing.sm,
        padding: spacing.md,
    },
    subtopicHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    checkCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: colors.border.medium,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    checkCircleCompleted: {
        backgroundColor: colors.success,
        borderColor: colors.success,
    },
    subtopicInfo: {
        flex: 1,
    },
    subtopicActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    bottomPadding: {
        height: spacing['3xl'],
    },
});

export default TopicDetailScreen;
