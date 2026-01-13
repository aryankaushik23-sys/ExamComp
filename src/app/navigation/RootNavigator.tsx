// Root Navigator - Stack navigation for the entire app
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../../theme';
import { RootStackParamList } from './types';

// Navigation screens
import { MainTabs } from './MainTabs';
import { TopicDetailScreen } from '../../features/topics/screens/TopicDetailScreen';
import { QuizScreen } from '../../features/quizzes/screens/QuizScreen';
import { QuizResultScreen } from '../../features/quizzes/screens/QuizResultScreen';
import { MockTestScreen } from '../../features/mockTests/screens/MockTestScreen';
import { MockTestResultScreen } from '../../features/mockTests/screens/MockTestResultScreen';
import { ChatScreen } from '../../features/chatbot/screens/ChatScreen';
import { SettingsScreen } from '../../features/settings/screens/SettingsScreen';
import { ProfileScreen } from '../../features/profile/screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.background.primary },
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="TopicDetail" component={TopicDetailScreen} />
                <Stack.Screen name="Quiz" component={QuizScreen} />
                <Stack.Screen name="QuizResult" component={QuizResultScreen} />
                <Stack.Screen name="MockTest" component={MockTestScreen} />
                <Stack.Screen name="MockTestResult" component={MockTestResultScreen} />
                <Stack.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{
                        animation: 'slide_from_bottom',
                    }}
                />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
