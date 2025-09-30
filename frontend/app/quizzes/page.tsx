'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { QuizListItem } from '@/types';
import { quizApi } from '@/services/api';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const data = await quizApi.getAllQuizzes();
      setQuizzes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch quizzes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await quizApi.deleteQuiz(id);
      setQuizzes(quizzes.filter(q => q.id !== id));
    } catch (err) {
      alert('Failed to delete quiz');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl text-gray-600">Loading quizzes...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">All Quizzes</h1>
          <Link
            href="/"
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            ← Home
          </Link>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No quizzes yet
            </h2>
            <p className="text-gray-600 mb-6">
              Create your first quiz to get started!
            </p>
            <Link
              href="/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Create Quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {quizzes.map(quiz => (
              <div
                key={quiz.id}
                className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition"
              >
                <Link
                  href={`/quizzes/${quiz.id}`}
                  className="flex-1 hover:text-blue-600"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {quiz.title}
                  </h2>
                  <p className="text-gray-600">
                    {quiz.questionCount} question
                    {quiz.questionCount !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Created: {new Date(quiz.createdAt).toLocaleDateString()}
                  </p>
                </Link>
                <button
                  onClick={() => handleDelete(quiz.id, quiz.title)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  title="Delete quiz"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
