'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { quizApi } from '@/services/api';
import { Question, QuestionType } from '@/types';

export default function CreateQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    {
      type: 'boolean',
      questionText: '',
      correctAnswer: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: 'boolean',
        questionText: '',
        correctAnswer: true,
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) {
      alert('Quiz must have at least one question');
      return;
    }
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (
    index: number,
    field: keyof Question,
    value: string | boolean | string[]
  ) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };

    if (field === 'type') {
      const newType = value as QuestionType;
      if (newType === 'boolean') {
        updated[index].correctAnswer = true;
        delete updated[index].options;
      } else if (newType === 'input') {
        updated[index].correctAnswer = '';
        delete updated[index].options;
      } else if (newType === 'checkbox') {
        updated[index].options = ['', ''];
        updated[index].correctAnswer = [];
      }
    }

    setQuestions(updated);
  };

  const addCheckboxOption = (questionIndex: number) => {
    const updated = [...questions];
    const options = updated[questionIndex].options || [];
    updated[questionIndex].options = [...options, ''];
    setQuestions(updated);
  };

  const removeCheckboxOption = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    const options = updated[questionIndex].options || [];
    if (options.length <= 2) {
      alert('Must have at least 2 options');
      return;
    }
    updated[questionIndex].options = options.filter(
      (_, i) => i !== optionIndex
    );

    const correctAnswers =
      (updated[questionIndex].correctAnswer as string[]) || [];
    const removedOption = options[optionIndex];
    updated[questionIndex].correctAnswer = correctAnswers.filter(
      ans => ans !== removedOption
    );

    setQuestions(updated);
  };

  const updateCheckboxOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    const options = [...(updated[questionIndex].options || [])];
    const oldValue = options[optionIndex];
    options[optionIndex] = value;
    updated[questionIndex].options = options;

    const correctAnswers =
      (updated[questionIndex].correctAnswer as string[]) || [];
    const updatedCorrectAnswers = correctAnswers.map(ans =>
      ans === oldValue ? value : ans
    );
    updated[questionIndex].correctAnswer = updatedCorrectAnswers;

    setQuestions(updated);
  };

  const toggleCheckboxAnswer = (questionIndex: number, option: string) => {
    const updated = [...questions];
    const correctAnswers =
      (updated[questionIndex].correctAnswer as string[]) || [];

    if (correctAnswers.includes(option)) {
      updated[questionIndex].correctAnswer = correctAnswers.filter(
        ans => ans !== option
      );
    } else {
      updated[questionIndex].correctAnswer = [...correctAnswers, option];
    }

    setQuestions(updated);
  };

  const validateForm = (): boolean => {
    if (!title.trim()) {
      setError('Quiz title is required');
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.questionText.trim()) {
        setError(`Question ${i + 1}: Question text is required`);
        return false;
      }

      if (q.type === 'checkbox') {
        if (!q.options || q.options.length < 2) {
          setError(`Question ${i + 1}: Must have at least 2 options`);
          return false;
        }

        if (q.options.some(opt => !opt.trim())) {
          setError(`Question ${i + 1}: All options must be filled`);
          return false;
        }

        if (!Array.isArray(q.correctAnswer) || q.correctAnswer.length === 0) {
          setError(
            `Question ${i + 1}: Must select at least one correct answer`
          );
          return false;
        }
      }

      if (q.type === 'input' && !q.correctAnswer) {
        setError(`Question ${i + 1}: Correct answer is required`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const quiz = await quizApi.createQuiz({ title, questions });
      router.push(`/quizzes/${quiz.id}`);
    } catch (err) {
      setError('Failed to create quiz');
      console.error(err);
      setLoading(false);
    }
  };

  const renderQuestionForm = (question: Question, index: number) => {
    return (
      <div
        key={index}
        className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Question {index + 1}
          </h3>
          <button
            type="button"
            onClick={() => removeQuestion(index)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
          >
            Remove
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Question Type
          </label>
          <select
            value={question.type}
            onChange={e => updateQuestion(index, 'type', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="boolean">Boolean (True/False)</option>
            <option value="input">Input (Short Answer)</option>
            <option value="checkbox">Checkbox (Multiple Choice)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Question Text
          </label>
          <input
            type="text"
            value={question.questionText}
            onChange={e =>
              updateQuestion(index, 'questionText', e.target.value)
            }
            placeholder="Enter your question"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {question.type === 'boolean' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Correct Answer
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={question.correctAnswer === true}
                  onChange={() => updateQuestion(index, 'correctAnswer', true)}
                  className="w-4 h-4"
                />
                <span>True</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={question.correctAnswer === false}
                  onChange={() => updateQuestion(index, 'correctAnswer', false)}
                  className="w-4 h-4"
                />
                <span>False</span>
              </label>
            </div>
          </div>
        )}

        {question.type === 'input' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Correct Answer
            </label>
            <input
              type="text"
              value={(question.correctAnswer as string) || ''}
              onChange={e =>
                updateQuestion(index, 'correctAnswer', e.target.value)
              }
              placeholder="Enter the correct answer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {question.type === 'checkbox' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Options
            </label>
            <div className="space-y-3">
              {(question.options || []).map((option, optIdx) => (
                <div key={optIdx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={(
                      (question.correctAnswer as string[]) || []
                    ).includes(option)}
                    onChange={() => toggleCheckboxAnswer(index, option)}
                    className="w-4 h-4"
                    title="Mark as correct answer"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={e =>
                      updateCheckboxOption(index, optIdx, e.target.value)
                    }
                    placeholder={`Option ${optIdx + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeCheckboxOption(index, optIdx)}
                    className="bg-red-400 text-white px-3 py-2 rounded-lg hover:bg-red-500 transition text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addCheckboxOption(index)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
              >
                + Add Option
              </button>
              <p className="text-sm text-gray-600 italic">
                Check the boxes next to the correct answer(s)
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Create New Quiz</h1>
          <Link
            href="/"
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            ← Home
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

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
            {questions.map((question, index) =>
              renderQuestionForm(question, index)
            )}
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

          <div className="flex justify-end space-x-4">
            <Link
              href="/"
              className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition text-lg font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition text-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
