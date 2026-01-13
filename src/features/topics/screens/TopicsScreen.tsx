// Topics Screen - JEE Mathematics topic navigation
import React, { useState, useMemo, useCallback } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TextInput,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInRight,
    LinearTransition,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Typography, Card } from '../../../shared/components';
import { colors, spacing, borderRadius, shadows, typography } from '../../../theme';
import { jeeMathsSyllabus, getTotalSubtopics, Topic, SubTopic } from '../data/syllabus';
import { useAppSelector } from '../../../store';
import { RootStackNavigationProp } from '../../../app/navigation/types';

interface TopicCardProps {
    topic: Topic;
    index: number;
    isExpanded: boolean;
    onPress: () => void;
    onSubtopicPress: (subtopic: SubTopic) => void;
    language: 'en' | 'hi';
}

const TopicCard: React.FC<TopicCardProps> = ({
    topic,
    index,
    isExpanded,
    onPress,
    onSubtopicPress,
    language,
}) => {
    const completedCount = topic.subtopics.filter(s => s.isCompleted).length;
    const totalCount = topic.subtopics.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            layout={LinearTransition.springify()}
        >
            <Card
                variant="elevated"
                style={styles.topicCard}
                onPress={onPress}
            >
                <View style={styles.topicHeader}>
                    <View style={[styles.topicIcon, { backgroundColor: topic.color + '20' }]}>
                        <Typography variant="h1" color={topic.color}>{topic.icon}</Typography>
                    </View>
                    <View style={styles.topicInfo}>
                        <Typography variant="h3">
                            {language === 'hi' ? topic.nameHi : topic.name}
                        </Typography>
                        <Typography variant="caption" color={colors.text.secondary}>
                            {completedCount}/{totalCount} {language === 'hi' ? 'पूर्ण' : 'completed'}
                        </Typography>
                    </View>
                    <View style={styles.progressCircle}>
                        <Typography variant="labelSmall" color={topic.color}>
                            {Math.round(progress)}%
                        </Typography>
                    </View>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressTrack}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${progress}%`, backgroundColor: topic.color }
                            ]}
                        />
                    </View>
                </View>

                {/* Expanded Subtopics */}
                {isExpanded && (
                    <Animated.View
                        entering={FadeInDown.springify()}
                        style={styles.subtopicsContainer}
                    >
                        {topic.subtopics.map((subtopic, subIndex) => (
                            <Animated.View
                                key={subtopic.id}
                                entering={FadeInRight.delay(subIndex * 50)}
                            >
                                <TouchableOpacity
                                    style={[
                                        styles.subtopicItem,
                                        subtopic.isCompleted && styles.subtopicCompleted,
                                    ]}
                                    onPress={() => onSubtopicPress(subtopic)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.subtopicLeft}>
                                        <View style={[
                                            styles.subtopicCheck,
                                            subtopic.isCompleted && { backgroundColor: colors.success }
                                        ]}>
                                            {subtopic.isCompleted && (
                                                <Typography variant="caption" color={colors.neutral[0]}>✓</Typography>
                                            )}
                                        </View>
                                        <View>
                                            <Typography
                                                variant="bodyMedium"
                                                color={subtopic.isCompleted ? colors.text.secondary : colors.text.primary}
                                            >
                                                {language === 'hi' ? subtopic.nameHi : subtopic.name}
                                            </Typography>
                                            <Typography variant="caption" color={colors.text.tertiary}>
                                                {subtopic.videoCount} {language === 'hi' ? 'वीडियो' : 'videos'} • {subtopic.quizCount} {language === 'hi' ? 'प्रश्नोत्तरी' : 'quizzes'}
                                            </Typography>
                                        </View>
                                    </View>
                                    <Typography variant="bodyMedium" color={colors.text.tertiary}>›</Typography>
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </Animated.View>
                )}
            </Card>
        </Animated.View>
    );
};

export const TopicsScreen: React.FC = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
    const language = useAppSelector((state) => state.settings.language);

    const filteredTopics = useMemo(() => {
        if (!searchQuery.trim()) return jeeMathsSyllabus;

        const query = searchQuery.toLowerCase();
        return jeeMathsSyllabus.filter(topic => {
            const matchesTopic =
                topic.name.toLowerCase().includes(query) ||
                topic.nameHi.includes(query);
            const matchesSubtopic = topic.subtopics.some(sub =>
                sub.name.toLowerCase().includes(query) ||
                sub.nameHi.includes(query)
            );
            return matchesTopic || matchesSubtopic;
        });
    }, [searchQuery]);

    const handleTopicPress = useCallback((topicId: string) => {
        setExpandedTopicId(prev => prev === topicId ? null : topicId);
    }, []);

    const handleSubtopicPress = useCallback((topic: Topic, subtopic: SubTopic) => {
        navigation.navigate('TopicDetail', {
            topicId: topic.id,
            topicName: language === 'hi' ? topic.nameHi : topic.name
        });
    }, [navigation, language]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Typography variant="h1">
                        {language === 'hi' ? 'विषय' : 'Topics'}
                    </Typography>
                    <Typography variant="bodyMedium" color={colors.text.secondary}>
                        {getTotalSubtopics()} {language === 'hi' ? 'उपविषय' : 'subtopics'} • JEE Mathematics
                    </Typography>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Typography variant="bodyMedium" style={styles.searchIcon}>🔍</Typography>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={language === 'hi' ? 'विषय खोजें...' : 'Search topics...'}
                        placeholderTextColor={colors.text.tertiary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Typography variant="bodyMedium" color={colors.text.tertiary}>✕</Typography>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Topics List */}
                <FlatList
                    data={filteredTopics}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <TopicCard
                            topic={item}
                            index={index}
                            isExpanded={expandedTopicId === item.id}
                            onPress={() => handleTopicPress(item.id)}
                            onSubtopicPress={(subtopic) => handleSubtopicPress(item, subtopic)}
                            language={language}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
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
        paddingHorizontal: spacing.md,
    },
    header: {
        paddingVertical: spacing.lg,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface.primary,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        marginBottom: spacing.md,
        ...shadows.sm,
    },
    searchIcon: {
        marginRight: spacing.sm,
    },
    searchInput: {
        flex: 1,
        ...typography.bodyMedium,
        color: colors.text.primary,
    },
    listContent: {
        paddingBottom: spacing['3xl'],
    },
    separator: {
        height: spacing.md,
    },
    topicCard: {
        padding: spacing.md,
    },
    topicHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topicIcon: {
        width: 56,
        height: 56,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    topicInfo: {
        flex: 1,
    },
    progressCircle: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.full,
        backgroundColor: colors.neutral[100],
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBarContainer: {
        marginTop: spacing.md,
    },
    progressTrack: {
        height: 4,
        backgroundColor: colors.neutral[200],
        borderRadius: borderRadius.full,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: borderRadius.full,
    },
    subtopicsContainer: {
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border.light,
    },
    subtopicItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.sm,
        borderRadius: borderRadius.md,
    },
    subtopicCompleted: {
        backgroundColor: colors.successLight,
    },
    subtopicLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtopicCheck: {
        width: 24,
        height: 24,
        borderRadius: borderRadius.full,
        borderWidth: 2,
        borderColor: colors.border.medium,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
});

export default TopicsScreen;
