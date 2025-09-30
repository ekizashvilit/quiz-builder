interface BooleanInputProps {
  correctAnswer: boolean;
  onChange: (value: boolean) => void;
}

function BooleanInput({ correctAnswer, onChange }: BooleanInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        Correct Answer
      </label>
      <div className="space-y-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            checked={correctAnswer === true}
            onChange={() => onChange(true)}
            className="w-4 h-4"
          />
          <span>True</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            checked={correctAnswer === false}
            onChange={() => onChange(false)}
            className="w-4 h-4"
          />
          <span>False</span>
        </label>
      </div>
    </div>
  );
}

export default BooleanInput;
