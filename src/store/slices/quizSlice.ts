// Quiz Slice - Manages practice quiz state and results
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Option {
    id: string;
    text: string;
    textHi: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    text: string;
    textHi: string;
    options: Option[];
    explanation: string;
    explanationHi: string;
    difficulty: Difficulty;
    topicId: string;
    subtopicId: string;
    imageUrl?: string;
}

export interface QuizAnswer {
    questionId: string;
    selectedOptionId: string | null;
    isCorrect: boolean;
    timeTaken: number; // in seconds
}

export interface QuizState {
    currentQuiz: {
        questions: Question[];
        currentQuestionIndex: number;
        answers: QuizAnswer[];
        startTime: number | null;
        isCompleted: boolean;
    } | null;
    quizHistory: {
        id: string;
        topicId: string;
        date: string;
        score: number;
        totalQuestions: number;
        difficulty: Difficulty;
        timeTaken: number;
    }[];
}

const initialState: QuizState = {
    currentQuiz: null,
    quizHistory: [],
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        startQuiz: (state, action: PayloadAction<Question[]>) => {
            state.currentQuiz = {
                questions: action.payload,
                currentQuestionIndex: 0,
                answers: [],
                startTime: Date.now(),
                isCompleted: false,
            };
        },

        answerQuestion: (state, action: PayloadAction<QuizAnswer>) => {
            if (state.currentQuiz) {
                state.currentQuiz.answers.push(action.payload);
            }
        },

        nextQuestion: (state) => {
            if (state.currentQuiz && state.currentQuiz.currentQuestionIndex < state.currentQuiz.questions.length - 1) {
                state.currentQuiz.currentQuestionIndex += 1;
            }
        },

        previousQuestion: (state) => {
            if (state.currentQuiz && state.currentQuiz.currentQuestionIndex > 0) {
                state.currentQuiz.currentQuestionIndex -= 1;
            }
        },

        completeQuiz: (state) => {
            if (state.currentQuiz) {
                state.currentQuiz.isCompleted = true;
            }
        },

        saveQuizResult: (state, action: PayloadAction<{
            id: string;
            topicId: string;
            score: number;
            totalQuestions: number;
            difficulty: Difficulty;
            timeTaken: number;
        }>) => {
            state.quizHistory.unshift({
                ...action.payload,
                date: new Date().toISOString(),
            });
            // Keep only last 50 quiz results
            if (state.quizHistory.length > 50) {
                state.quizHistory = state.quizHistory.slice(0, 50);
            }
        },

        resetQuiz: (state) => {
            state.currentQuiz = null;
        },
    },
});

export const {
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    saveQuizResult,
    resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
