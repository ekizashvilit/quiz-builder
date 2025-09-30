'use client';

import { Quiz } from '@/types';
import QuestionDisplay from './QuestionDisplay';
import DeleteQuizButton from './buttons/DeleteQuizButton';

interface QuizDetailProps {
  quiz: Quiz;
}

function QuizDetail({ quiz }: QuizDetailProps) {
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {quiz.title}
            </h1>
            <p className="text-gray-600">
              {quiz.questions.length} question
              {quiz.questions.length !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Created: {new Date(quiz.createdAt).toLocaleDateString()}
            </p>
          </div>
          <DeleteQuizButton
            quizId={quiz.id}
            quizTitle={quiz.title}
            redirectAfterDelete={true}
          />
        </div>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question, index) => (
          <QuestionDisplay
            key={question.id || index}
            question={question}
            questionNumber={index + 1}
          />
        ))}
      </div>
    </>
  );
}

export default QuizDetail;
