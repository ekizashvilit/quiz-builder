import Link from 'next/link';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Quiz Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The quiz you're looking for doesn't exist or has been deleted.
          </p>
          <Link
            href="/quizzes"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Back to All Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
