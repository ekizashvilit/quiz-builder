import Link from 'next/link';
import { notFound } from 'next/navigation';

import QuizDetail from '@/components/QuizDetail';
import { getQuizByIdAction } from '@/services/actions';

async function QuizDetailPage({ params }: { params: { id: string } }) {
  const quiz = await getQuizByIdAction(params.id);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/quizzes"
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition inline-block"
          >
            ← Back to Quizzes
          </Link>
        </div>
        <QuizDetail quiz={quiz} />
      </div>
    </div>
  );
}

export default QuizDetailPage;
