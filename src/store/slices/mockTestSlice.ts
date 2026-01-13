// Mock Test Slice - Manages full-length mock tests with JEE pattern
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, Difficulty } from './quizSlice';

export type QuestionStatus = 'unanswered' | 'answered' | 'marked' | 'marked-answered';

export interface MockTestQuestion extends Question {
    marks: number; // Positive marks for correct
    negativeMarks: number; // Negative marks for wrong
    status: QuestionStatus;
    selectedOptionId: string | null;
}

export interface MockTestSection {
    id: string;
    name: string;
    nameHi: string;
    questions: MockTestQuestion[];
    timeLimit: number; // in minutes
}

export interface MockTestResult {
    id: string;
    testId: string;
    testName: string;
    date: string;
    totalMarks: number;
    obtainedMarks: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    unanswered: number;
    timeTaken: number; // in seconds
    sectionWise: {
        sectionId: string;
        sectionName: string;
        obtainedMarks: number;
        totalMarks: number;
        correctAnswers: number;
    }[];
    percentile?: number;
}

export interface MockTestState {
    currentTest: {
        id: string;
        name: string;
        sections: MockTestSection[];
        currentSectionIndex: number;
        currentQuestionIndex: number;
        timeRemaining: number; // in seconds
        startTime: number | null;
        isPaused: boolean;
        isSubmitted: boolean;
    } | null;
    testHistory: MockTestResult[];
    availableTests: {
        id: string;
        name: string;
        nameHi: string;
        totalQuestions: number;
        totalMarks: number;
        duration: number; // in minutes
        difficulty: Difficulty;
        isAttempted: boolean;
    }[];
}

const initialState: MockTestState = {
    currentTest: null,
    testHistory: [],
    availableTests: [],
};

const mockTestSlice = createSlice({
    name: 'mockTest',
    initialState,
    reducers: {
        setAvailableTests: (state, action: PayloadAction<MockTestState['availableTests']>) => {
            state.availableTests = action.payload;
        },

        startTest: (state, action: PayloadAction<{
            id: string;
            name: string;
            sections: MockTestSection[];
            totalTime: number;
        }>) => {
            state.currentTest = {
                id: action.payload.id,
                name: action.payload.name,
                sections: action.payload.sections,
                currentSectionIndex: 0,
                currentQuestionIndex: 0,
                timeRemaining: action.payload.totalTime * 60,
                startTime: Date.now(),
                isPaused: false,
                isSubmitted: false,
            };
        },

        selectAnswer: (state, action: PayloadAction<{
            sectionIndex: number;
            questionIndex: number;
            optionId: string;
        }>) => {
            if (state.currentTest) {
                const question = state.currentTest.sections[action.payload.sectionIndex]
                    .questions[action.payload.questionIndex];
                question.selectedOptionId = action.payload.optionId;
                question.status = question.status === 'marked' ? 'marked-answered' : 'answered';
            }
        },

        markQuestion: (state, action: PayloadAction<{
            sectionIndex: number;
            questionIndex: number;
        }>) => {
            if (state.currentTest) {
                const question = state.currentTest.sections[action.payload.sectionIndex]
                    .questions[action.payload.questionIndex];
                question.status = question.selectedOptionId ? 'marked-answered' : 'marked';
            }
        },

        clearAnswer: (state, action: PayloadAction<{
            sectionIndex: number;
            questionIndex: number;
        }>) => {
            if (state.currentTest) {
                const question = state.currentTest.sections[action.payload.sectionIndex]
                    .questions[action.payload.questionIndex];
                question.selectedOptionId = null;
                question.status = question.status === 'marked-answered' ? 'marked' : 'unanswered';
            }
        },

        navigateToQuestion: (state, action: PayloadAction<{
            sectionIndex: number;
            questionIndex: number;
        }>) => {
            if (state.currentTest) {
                state.currentTest.currentSectionIndex = action.payload.sectionIndex;
                state.currentTest.currentQuestionIndex = action.payload.questionIndex;
            }
        },

        updateTimeRemaining: (state, action: PayloadAction<number>) => {
            if (state.currentTest) {
                state.currentTest.timeRemaining = action.payload;
            }
        },

        pauseTest: (state) => {
            if (state.currentTest) {
                state.currentTest.isPaused = true;
            }
        },

        resumeTest: (state) => {
            if (state.currentTest) {
                state.currentTest.isPaused = false;
            }
        },

        submitTest: (state) => {
            if (state.currentTest) {
                state.currentTest.isSubmitted = true;
            }
        },

        saveTestResult: (state, action: PayloadAction<MockTestResult>) => {
            state.testHistory.unshift(action.payload);
            // Mark test as attempted
            const testIndex = state.availableTests.findIndex(t => t.id === action.payload.testId);
            if (testIndex >= 0) {
                state.availableTests[testIndex].isAttempted = true;
            }
        },

        resetTest: (state) => {
            state.currentTest = null;
        },
    },
});

export const {
    setAvailableTests,
    startTest,
    selectAnswer,
    markQuestion,
    clearAnswer,
    navigateToQuestion,
    updateTimeRemaining,
    pauseTest,
    resumeTest,
    submitTest,
    saveTestResult,
    resetTest,
} = mockTestSlice.actions;

export default mockTestSlice.reducer;
