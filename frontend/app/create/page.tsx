import Link from 'next/link';

import CreateQuizForm from '@/components/forms/CreateQuizForm';

function CreateQuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Create New Quiz</h1>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            aria-label="Go to homepage"
          >
            ← Homepage
          </Link>
        </div>
        <CreateQuizForm />
      </div>
    </div>
  );
}

export default CreateQuizPage;
