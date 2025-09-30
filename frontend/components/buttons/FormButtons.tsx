interface FormButtonsProps {
  isLoading: boolean;
  onCancel: () => void;
}

function FormButtons({ isLoading, onCancel }: FormButtonsProps) {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition text-lg font-medium"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition text-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating...' : 'Create Quiz'}
      </button>
    </div>
  );
}

export default FormButtons;
