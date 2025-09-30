import Link from 'next/link';

import QuizzesList from '@/components/QuizzesList';
import { getAllQuizzesAction } from '@/services/actions';

async function QuizzesPage() {
  const quizzes = await getAllQuizzesAction();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">All Quizzes</h1>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            aria-label="Go to homepage"
          >
            ← Homepage
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
          <QuizzesList quizzes={quizzes} />
        )}
      </div>
    </div>
  );
}

export default QuizzesPage;
