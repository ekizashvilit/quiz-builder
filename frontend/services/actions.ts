'use server';

import { Quiz, QuizListItem, CreateQuizData } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function createQuizAction(
  data: CreateQuizData
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to create quiz' };
    }

    const quiz: Quiz = await response.json();
    return { success: true, id: quiz.id };
  } catch (error) {
    console.error('Create quiz error:', error);
    return { success: false, error: 'Something went wrong' };
  }
}

export async function getAllQuizzesAction(): Promise<QuizListItem[]> {
  try {
    const response = await fetch(`${API_URL}/quizzes`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quizzes');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch quizzes error:', error);
    return [];
  }
}

export async function getQuizByIdAction(id: string): Promise<Quiz | null> {
  try {
    const response = await fetch(`${API_URL}/quizzes/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Fetch quiz error:', error);
    return null;
  }
}

export async function deleteQuizAction(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/quizzes/${id}`, {
      method: 'DELETE',
    });

    return response.ok;
  } catch (error) {
    console.error('Delete quiz error:', error);
    return false;
  }
}
