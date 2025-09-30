'use client';

import QuizCard from './QuizCard';
import { QuizListItem } from '@/types';

interface QuizzesListProps {
  quizzes: QuizListItem[];
}

function QuizzesList({ quizzes }: QuizzesListProps) {
  return (
    <div className="space-y-4">
      {quizzes.map(quiz => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}

export default QuizzesList;
