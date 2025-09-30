'use client';

import { toast } from 'react-hot-toast';

interface CheckboxOptionsProps {
  options: string[];
  correctAnswers: string[];
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
  onUpdateOption: (index: number, value: string) => void;
  onToggleCorrect: (option: string) => void;
}

function CheckboxOptions({
  options,
  correctAnswers,
  onAddOption,
  onRemoveOption,
  onUpdateOption,
  onToggleCorrect,
}: CheckboxOptionsProps) {
  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) {
      toast.error('Must have at least 2 options');
      return;
    }
    onRemoveOption(index);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Options</label>
      <div className="space-y-3">
        {options.map((option, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={correctAnswers.includes(option)}
              onChange={() => onToggleCorrect(option)}
              className="w-4 h-4"
              title="Mark as correct answer"
            />
            <input
              type="text"
              value={option}
              onChange={e => onUpdateOption(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => handleRemoveOption(idx)}
              className="bg-red-400 text-white px-3 py-2 rounded-lg hover:bg-red-500 transition text-sm"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddOption}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
        >
          + Add Option
        </button>
        <p className="text-sm text-gray-600 italic">
          Check the boxes next to the correct answer(s)
        </p>
      </div>
    </div>
  );
}

export default CheckboxOptions;
