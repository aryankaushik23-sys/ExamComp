// Navigation Types - Type-safe navigation for the app
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

// Root Stack Navigator
export type RootStackParamList = {
    MainTabs: undefined;
    TopicDetail: { topicId: string; topicName: string };
    VideoPlayer: { videoId: string; title: string };
    Quiz: { topicId: string; subtopicId?: string; difficulty?: 'easy' | 'medium' | 'hard' };
    QuizResult: { quizId: string; score: number; total: number };
    MockTest: { testId: string };
    MockTestResult: { resultId: string };
    Chat: undefined;
    Settings: undefined;
    Language: undefined;
    Downloads: undefined;
    Profile: undefined;
};

// Tab Navigator
export type MainTabParamList = {
    HomeTab: undefined;
    TopicsTab: undefined;
    PracticeTab: undefined;
    MockTestsTab: undefined;
    ProfileTab: undefined;
};

// Navigation Props for each screen
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type MainTabNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList>,
    NativeStackNavigationProp<RootStackParamList>
>;

// Route Props
export type TopicDetailRouteProp = RouteProp<RootStackParamList, 'TopicDetail'>;
export type VideoPlayerRouteProp = RouteProp<RootStackParamList, 'VideoPlayer'>;
export type QuizRouteProp = RouteProp<RootStackParamList, 'Quiz'>;
export type QuizResultRouteProp = RouteProp<RootStackParamList, 'QuizResult'>;
export type MockTestRouteProp = RouteProp<RootStackParamList, 'MockTest'>;
export type MockTestResultRouteProp = RouteProp<RootStackParamList, 'MockTestResult'>;

// Screen Props
export interface TopicDetailScreenProps {
    route: TopicDetailRouteProp;
    navigation: RootStackNavigationProp;
}

export interface VideoPlayerScreenProps {
    route: VideoPlayerRouteProp;
    navigation: RootStackNavigationProp;
}

export interface QuizScreenProps {
    route: QuizRouteProp;
    navigation: RootStackNavigationProp;
}

export interface QuizResultScreenProps {
    route: QuizResultRouteProp;
    navigation: RootStackNavigationProp;
}

export interface MockTestScreenProps {
    route: MockTestRouteProp;
    navigation: RootStackNavigationProp;
}

export interface MockTestResultScreenProps {
    route: MockTestResultRouteProp;
    navigation: RootStackNavigationProp;
}
