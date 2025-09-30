import { useState } from 'react';

import { Question } from '../types';

export function useQuizForm() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    {
      type: 'boolean',
      questionText: '',
      correctAnswer: true,
    },
  ]);

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        type: 'boolean',
        questionText: '',
        correctAnswer: true,
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[index] = updatedQuestion;
      return updated;
    });
  };

  return {
    title,
    setTitle,
    questions,
    addQuestion,
    removeQuestion,
    updateQuestion,
  };
}
