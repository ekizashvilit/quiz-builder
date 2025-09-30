interface TextInputAnswerProps {
  value: string;
  onChange: (value: string) => void;
}

function TextInputAnswer({ value, onChange }: TextInputAnswerProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        Correct Answer
      </label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter the correct answer"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

export default TextInputAnswer;
