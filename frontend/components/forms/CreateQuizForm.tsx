'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import FormButtons from '../buttons/FormButtons';
import { useQuizForm } from '@/hooks/useQuizForm';
import QuestionInput from '../inputs/QuestionInput';
import { createQuizAction } from '@/services/actions';
import { validateQuizForm } from '@/utils/formValidation';

function CreateQuizForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    title,
    setTitle,
    questions,
    addQuestion,
    removeQuestion,
    updateQuestion,
  } = useQuizForm();

  const handleRemoveQuestion = (index: number) => {
    if (questions.length === 1) {
      toast.error('Quiz must have at least one question');
      return;
    }
    removeQuestion(index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateQuizForm(title, questions);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const result = await createQuizAction({ title, questions });

      if (result.success && result.id) {
        toast.success('Quiz created successfully!');
        router.push(`/quizzes/${result.id}`);
      } else {
        toast.error(result.error || 'Failed to create quiz');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <label className="block text-gray-700 font-medium mb-2 text-lg">
          Quiz Title
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter quiz title"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <QuestionInput
            key={index}
            question={question}
            questionNumber={index + 1}
            onUpdate={updatedQuestion => updateQuestion(index, updatedQuestion)}
            onRemove={() => handleRemoveQuestion(index)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition text-lg font-medium"
        >
          + Add Question
        </button>
      </div>

      <FormButtons isLoading={isLoading} onCancel={() => router.back()} />
    </form>
  );
}

export default CreateQuizForm;
