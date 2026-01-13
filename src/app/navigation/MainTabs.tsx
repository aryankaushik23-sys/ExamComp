// Main Tab Navigator - Bottom tabs for primary navigation
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
} from 'react-native-reanimated';
import { Typography } from '../../shared/components';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import { MainTabParamList } from './types';

// Screen imports
import { HomeScreen } from '../../features/home/screens/HomeScreen';
import { TopicsScreen } from '../../features/topics/screens/TopicsScreen';
import { PracticeScreen } from '../../features/quizzes/screens/PracticeScreen';
import { MockTestsListScreen } from '../../features/mockTests/screens/MockTestsListScreen';
import { ProfileScreen } from '../../features/profile/screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

interface TabIconProps {
    icon: string;
    label: string;
    isFocused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, label, isFocused }) => {
    const scale = useSharedValue(isFocused ? 1 : 0.9);

    React.useEffect(() => {
        scale.value = withSpring(isFocused ? 1.1 : 0.95, { damping: 15 });
    }, [isFocused]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View style={[styles.tabIconContainer, animatedStyle]}>
            <Typography variant="h2">{icon}</Typography>
            <Typography
                variant="labelSmall"
                color={isFocused ? colors.primary[500] : colors.text.tertiary}
                style={styles.tabLabel}
            >
                {label}
            </Typography>
        </Animated.View>
    );
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const { icon, label } = getTabConfig(route.name);

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        <TabIcon icon={icon} label={label} isFocused={isFocused} />
                        {isFocused && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const getTabConfig = (routeName: string): { icon: string; label: string } => {
    switch (routeName) {
        case 'HomeTab':
            return { icon: '🏠', label: 'Home' };
        case 'TopicsTab':
            return { icon: '📚', label: 'Topics' };
        case 'PracticeTab':
            return { icon: '✏️', label: 'Practice' };
        case 'MockTestsTab':
            return { icon: '📋', label: 'Tests' };
        case 'ProfileTab':
            return { icon: '👤', label: 'Profile' };
        default:
            return { icon: '•', label: '' };
    }
};

export const MainTabs: React.FC = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="HomeTab" component={HomeScreen} />
            <Tab.Screen name="TopicsTab" component={TopicsScreen} />
            <Tab.Screen name="PracticeTab" component={PracticeScreen} />
            <Tab.Screen name="MockTestsTab" component={MockTestsListScreen} />
            <Tab.Screen name="ProfileTab" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: colors.surface.primary,
        borderTopWidth: 1,
        borderTopColor: colors.border.light,
        paddingBottom: spacing.sm,
        paddingTop: spacing.xs,
        ...shadows.md,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xs,
    },
    tabIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        marginTop: spacing.xs,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        width: 20,
        height: 3,
        backgroundColor: colors.primary[500],
        borderRadius: borderRadius.full,
    },
});

export default MainTabs;
