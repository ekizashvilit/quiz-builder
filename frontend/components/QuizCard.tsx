'use client';

import Link from 'next/link';

import { QuizListItem } from '@/types';
import DeleteQuizButton from './buttons/DeleteQuizButton';

interface QuizCardProps {
  quiz: QuizListItem;
}

function QuizCard({ quiz }: QuizCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition">
      <Link href={`/quizzes/${quiz.id}`} className="flex-1 hover:text-blue-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h2>
        <p className="text-gray-600">
          {quiz.questionCount} question
          {quiz.questionCount !== 1 ? 's' : ''}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Created: {new Date(quiz.createdAt).toLocaleDateString()}
        </p>
      </Link>
      <DeleteQuizButton quizId={quiz.id} quizTitle={quiz.title} />
    </div>
  );
}

export default QuizCard;
