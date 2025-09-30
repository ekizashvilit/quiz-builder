'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { quizApi } from '@/services/api';
import { Quiz, Question } from '@/types';

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchQuiz(params.id as string);
    }
  }, [params.id]);

  const fetchQuiz = async (id: string) => {
    try {
      setLoading(true);
      const data = await quizApi.getQuizById(id);
      setQuiz(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!quiz) return;

    if (!confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
      return;
    }

    try {
      await quizApi.deleteQuiz(quiz.id);
      router.push('/quizzes');
    } catch (err) {
      alert('Failed to delete quiz');
      console.error(err);
    }
  };

  const renderQuestion = (question: Question, index: number) => {
    return (
      <div
        key={question.id || index}
        className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500"
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800">
            Question {index + 1}
          </h3>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {question.type}
          </span>
        </div>

        <p className="text-gray-700 mb-4 text-lg">{question.questionText}</p>

        {question.type === 'boolean' && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                disabled
                checked={question.correctAnswer === true}
                className="w-4 h-4"
              />
              <label className="text-gray-700">True</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                disabled
                checked={question.correctAnswer === false}
                className="w-4 h-4"
              />
              <label className="text-gray-700">False</label>
            </div>
            <p className="text-sm text-green-600 mt-2 font-medium">
              ✓ Correct Answer: {question.correctAnswer ? 'True' : 'False'}
            </p>
          </div>
        )}

        {question.type === 'input' && (
          <div>
            <input
              type="text"
              disabled
              placeholder="Answer field"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
            />
            <p className="text-sm text-green-600 mt-2 font-medium">
              ✓ Correct Answer: {question.correctAnswer}
            </p>
          </div>
        )}

        {question.type === 'checkbox' && question.options && (
          <div className="space-y-2">
            {question.options.map((option, idx) => {
              const correctAnswers = Array.isArray(question.correctAnswer)
                ? question.correctAnswer
                : [];
              const isCorrect = correctAnswers.includes(option);

              return (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    disabled
                    checked={isCorrect}
                    className="w-4 h-4"
                  />
                  <label
                    className={`${
                      isCorrect ? 'text-green-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {option} {isCorrect && '✓'}
                  </label>
                </div>
              );
            })}
            <p className="text-sm text-green-600 mt-3 font-medium">
              ✓ Correct Answers:{' '}
              {Array.isArray(question.correctAnswer)
                ? question.correctAnswer.join(', ')
                : 'None'}
            </p>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl text-gray-600">Loading quiz...</div>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error || 'Quiz not found'}
          </div>
          <Link
            href="/quizzes"
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition inline-block"
          >
            ← Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/quizzes"
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            ← Back to Quizzes
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete Quiz
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
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

        <div className="space-y-6">
          {quiz.questions.map((question, index) =>
            renderQuestion(question, index)
          )}
        </div>
      </div>
    </div>
  );
}
