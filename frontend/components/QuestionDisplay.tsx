'use client';

import { Question } from '@/types';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
}

function QuestionDisplay({ question, questionNumber }: QuestionDisplayProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Question {questionNumber}
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
              readOnly
            />
            <label className="text-gray-700">True</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              disabled
              checked={question.correctAnswer === false}
              className="w-4 h-4"
              readOnly
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
            readOnly
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
                  readOnly
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
}

export default QuestionDisplay;
