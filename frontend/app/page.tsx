import Link from 'next/link';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
            Quiz <span className="text-blue-600">Builder</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create custom quizzes with multiple question types. Build engaging
            assessments with true/false, short answer, and multiple choice
            questions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            href="/create"
            className="bg-white rounded-lg shadow-lg p-10 hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500 group"
          >
            <div className="text-5xl mb-4 text-center">📝</div>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition">
              Create Quiz
            </h2>
            <p className="text-center text-gray-600">
              Build a new quiz with custom questions and answer types
            </p>
          </Link>

          <Link
            href="/quizzes"
            className="bg-white rounded-lg shadow-lg p-10 hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500 group"
          >
            <div className="text-5xl mb-4 text-center">📚</div>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition">
              View Quizzes
            </h2>
            <p className="text-center text-gray-600">
              Browse and manage all your existing quizzes
            </p>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-lg shadow-md px-8 py-4">
            <p className="text-sm text-gray-600 mb-2">
              Supported Question Types
            </p>
            <div className="flex gap-4 text-sm font-medium text-gray-700">
              <span className="bg-blue-100 px-3 py-1 rounded-full">
                Boolean
              </span>
              <span className="bg-green-100 px-3 py-1 rounded-full">Input</span>
              <span className="bg-purple-100 px-3 py-1 rounded-full">
                Checkbox
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
