// Home Screen - Main dashboard with progress overview
import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../store';
import { Typography, Card, Button } from '../../../shared/components';
import { colors, spacing, borderRadius, gradients, shadows } from '../../../theme';
import { MainTabNavigationProp } from '../../../app/navigation/types';

interface QuickActionProps {
    icon: string;
    title: string;
    subtitle: string;
    color: string;
    onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, subtitle, color, onPress }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.7}>
        <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
            <Typography variant="h2" color={colors.neutral[0]}>{icon}</Typography>
        </View>
        <Typography variant="labelLarge" style={styles.quickActionTitle}>{title}</Typography>
        <Typography variant="caption" color={colors.text.secondary}>{subtitle}</Typography>
    </TouchableOpacity>
);

interface StatCardProps {
    value: string | number;
    label: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
        <Typography variant="h2" color={color}>{value}</Typography>
        <Typography variant="caption" color={colors.text.secondary}>{label}</Typography>
    </View>
);

export const HomeScreen: React.FC = () => {
    const navigation = useNavigation<MainTabNavigationProp>();
    const user = useAppSelector((state) => state.user);
    const language = useAppSelector((state) => state.settings.language);

    const greeting = getGreeting();
    const userName = user.name || 'Student';

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header with Gradient */}
                <LinearGradient
                    colors={gradients.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.header}
                >
                    <View style={styles.headerContent}>
                        <View>
                            <Typography variant="bodyMedium" color={colors.neutral[100]}>
                                {greeting}
                            </Typography>
                            <Typography variant="h1" color={colors.neutral[0]}>
                                {userName} 👋
                            </Typography>
                        </View>
                        <TouchableOpacity
                            style={styles.profileButton}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <Typography variant="h2">👤</Typography>
                        </TouchableOpacity>
                    </View>

                    {/* Streak Card */}
                    <View style={styles.streakCard}>
                        <View style={styles.streakIcon}>
                            <Typography variant="h1">🔥</Typography>
                        </View>
                        <View style={styles.streakInfo}>
                            <Typography variant="h3" color={colors.neutral[0]}>
                                {user.streak} Day Streak!
                            </Typography>
                            <Typography variant="caption" color={colors.neutral[200]}>
                                Keep learning to maintain your streak
                            </Typography>
                        </View>
                    </View>
                </LinearGradient>

                {/* Stats Section */}
                <View style={styles.section}>
                    <Typography variant="h3" style={styles.sectionTitle}>
                        Your Progress
                    </Typography>
                    <View style={styles.statsRow}>
                        <StatCard
                            value={Math.floor(user.totalStudyTime / 60)}
                            label="Hours Studied"
                            color={colors.primary[500]}
                        />
                        <StatCard
                            value={user.progress.length}
                            label="Topics Started"
                            color={colors.secondary[500]}
                        />
                        <StatCard
                            value={calculateOverallProgress(user.progress)}
                            label="Completion"
                            color={colors.accent[500]}
                        />
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Typography variant="h3" style={styles.sectionTitle}>
                        Quick Actions
                    </Typography>
                    <View style={styles.quickActionsGrid}>
                        <QuickAction
                            icon="📚"
                            title="Topics"
                            subtitle="Browse syllabus"
                            color={colors.primary[500]}
                            onPress={() => navigation.navigate('TopicsTab')}
                        />
                        <QuickAction
                            icon="📝"
                            title="Practice"
                            subtitle="Daily quiz"
                            color={colors.secondary[500]}
                            onPress={() => navigation.navigate('PracticeTab')}
                        />
                        <QuickAction
                            icon="🎯"
                            title="Mock Test"
                            subtitle="Full length"
                            color={colors.accent[500]}
                            onPress={() => navigation.navigate('MockTestsTab')}
                        />
                        <QuickAction
                            icon="🤖"
                            title="AI Tutor"
                            subtitle="Ask doubts"
                            color={colors.purple[500]}
                            onPress={() => navigation.navigate('Chat')}
                        />
                    </View>
                </View>

                {/* Continue Learning */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Typography variant="h3">Continue Learning</Typography>
                        <TouchableOpacity onPress={() => navigation.navigate('TopicsTab')}>
                            <Typography variant="labelMedium" color={colors.primary[500]}>
                                View All
                            </Typography>
                        </TouchableOpacity>
                    </View>

                    <Card variant="elevated" style={styles.continueCard}>
                        <View style={styles.continueContent}>
                            <View style={styles.continueIcon}>
                                <Typography variant="h1">∫</Typography>
                            </View>
                            <View style={styles.continueInfo}>
                                <Typography variant="h4">Integral Calculus</Typography>
                                <Typography variant="caption" color={colors.text.secondary}>
                                    5 of 12 lessons completed
                                </Typography>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '42%' }]} />
                                </View>
                            </View>
                        </View>
                        <Button
                            title="Continue"
                            variant="primary"
                            size="sm"
                            onPress={() => navigation.navigate('TopicDetail', {
                                topicId: 'integral-calculus',
                                topicName: 'Integral Calculus'
                            })}
                        />
                    </Card>
                </View>

                {/* Today's Recommended */}
                <View style={styles.section}>
                    <Typography variant="h3" style={styles.sectionTitle}>
                        Today's Recommended
                    </Typography>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <RecommendedCard
                            type="video"
                            title="Definite Integrals"
                            subtitle="15 min • Medium"
                            color={colors.primary[100]}
                            onPress={() => { }}
                        />
                        <RecommendedCard
                            type="quiz"
                            title="Differentiation Quiz"
                            subtitle="10 questions"
                            color={colors.secondary[100]}
                            onPress={() => navigation.navigate('Quiz', { topicId: 'differentiation' })}
                        />
                        <RecommendedCard
                            type="test"
                            title="Mini Mock Test"
                            subtitle="30 min • 25 questions"
                            color={colors.accent[100]}
                            onPress={() => { }}
                        />
                    </ScrollView>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>
        </SafeAreaView>
    );
};

interface RecommendedCardProps {
    type: 'video' | 'quiz' | 'test';
    title: string;
    subtitle: string;
    color: string;
    onPress: () => void;
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({ type, title, subtitle, color, onPress }) => (
    <TouchableOpacity
        style={[styles.recommendedCard, { backgroundColor: color }]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <Typography variant="h2">
            {type === 'video' ? '🎬' : type === 'quiz' ? '✏️' : '📋'}
        </Typography>
        <Typography variant="labelLarge" style={styles.recommendedTitle}>{title}</Typography>
        <Typography variant="caption" color={colors.text.secondary}>{subtitle}</Typography>
    </TouchableOpacity>
);

const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
};

const calculateOverallProgress = (progress: { completedLessons: number; totalLessons: number }[]): string => {
    if (progress.length === 0) return '0%';
    const total = progress.reduce((acc, p) => acc + p.totalLessons, 0);
    const completed = progress.reduce((acc, p) => acc + p.completedLessons, 0);
    return `${Math.round((completed / total) * 100)}%`;
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
        paddingHorizontal: spacing.md,
        paddingTop: spacing.lg,
        paddingBottom: spacing['2xl'],
        borderBottomLeftRadius: borderRadius['2xl'],
        borderBottomRightRadius: borderRadius['2xl'],
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.lg,
    },
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.full,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    streakCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: borderRadius.lg,
        padding: spacing.md,
    },
    streakIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    streakInfo: {
        flex: 1,
    },
    section: {
        paddingHorizontal: spacing.md,
        marginTop: spacing.lg,
    },
    sectionTitle: {
        marginBottom: spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        flex: 1,
        backgroundColor: colors.surface.primary,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        marginHorizontal: spacing.xs,
        borderLeftWidth: 3,
        ...shadows.sm,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    quickAction: {
        width: '48%',
        backgroundColor: colors.surface.primary,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        alignItems: 'center',
        ...shadows.sm,
    },
    quickActionIcon: {
        width: 56,
        height: 56,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    quickActionTitle: {
        marginTop: spacing.xs,
    },
    continueCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    continueContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    continueIcon: {
        width: 56,
        height: 56,
        borderRadius: borderRadius.md,
        backgroundColor: colors.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    continueInfo: {
        flex: 1,
    },
    progressBar: {
        height: 4,
        backgroundColor: colors.neutral[200],
        borderRadius: borderRadius.full,
        marginTop: spacing.xs,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary[500],
        borderRadius: borderRadius.full,
    },
    recommendedCard: {
        width: 150,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        marginRight: spacing.md,
        ...shadows.sm,
    },
    recommendedTitle: {
        marginTop: spacing.sm,
        marginBottom: spacing.xs,
    },
    bottomPadding: {
        height: spacing['3xl'],
    },
});

export default HomeScreen;
