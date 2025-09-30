'use client';

import { Question } from '@/types';
import BooleanInput from './BooleanInput';
import TextInputAnswer from './TextInputAnswer';
import CheckboxOptions from './CheckboxOptions';
import { useQuestionLogic } from '@/hooks/useQuestionLogic';

interface QuestionInputProps {
  question: Question;
  questionNumber: number;
  onUpdate: (question: Question) => void;
  onRemove: () => void;
}

function QuestionInput({
  question,
  questionNumber,
  onUpdate,
  onRemove,
}: QuestionInputProps) {
  const {
    updateField,
    addOption,
    removeOption,
    updateOption,
    toggleCorrectAnswer,
  } = useQuestionLogic(question, onUpdate);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Question {questionNumber}
        </h3>
        <button
          type="button"
          onClick={onRemove}
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
          onChange={e => updateField('type', e.target.value)}
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
          onChange={e => updateField('questionText', e.target.value)}
          placeholder="Enter your question"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {question.type === 'boolean' && (
        <BooleanInput
          correctAnswer={question.correctAnswer as boolean}
          onChange={value => updateField('correctAnswer', value)}
        />
      )}

      {question.type === 'input' && (
        <TextInputAnswer
          value={(question.correctAnswer as string) || ''}
          onChange={value => updateField('correctAnswer', value)}
        />
      )}

      {question.type === 'checkbox' && (
        <CheckboxOptions
          options={question.options || []}
          correctAnswers={(question.correctAnswer as string[]) || []}
          onAddOption={addOption}
          onRemoveOption={removeOption}
          onUpdateOption={updateOption}
          onToggleCorrect={toggleCorrectAnswer}
        />
      )}
    </div>
  );
}

export default QuestionInput;
