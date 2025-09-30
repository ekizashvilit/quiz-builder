import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-5xl font-bold text-gray-800 mb-10">
          Quiz Builder
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/create"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-500"
          >
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
              Create Quiz
            </h2>
          </Link>

          <Link
            href="/quizzes"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-green-500"
          >
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
              View Quizzes
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
