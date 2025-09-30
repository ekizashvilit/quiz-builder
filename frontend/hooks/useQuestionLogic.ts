import { Question, QuestionType } from '../types';

export function useQuestionLogic(
  question: Question,
  onUpdate: (question: Question) => void
) {
  const updateField = (
    field: keyof Question,
    value: string | boolean | string[]
  ) => {
    const updated = { ...question, [field]: value };

    if (field === 'type') {
      const newType = value as QuestionType;
      if (newType === 'boolean') {
        updated.correctAnswer = true;
        delete updated.options;
      } else if (newType === 'input') {
        updated.correctAnswer = '';
        delete updated.options;
      } else if (newType === 'checkbox') {
        updated.options = ['', ''];
        updated.correctAnswer = [];
      }
    }

    onUpdate(updated);
  };

  const addOption = () => {
    const options = question.options || [];
    onUpdate({ ...question, options: [...options, ''] });
  };

  const removeOption = (optionIndex: number) => {
    const options = question.options || [];
    const removedOption = options[optionIndex];
    const newOptions = options.filter((_, i) => i !== optionIndex);

    const correctAnswers = (question.correctAnswer as string[]) || [];
    const newCorrectAnswers = correctAnswers.filter(
      ans => ans !== removedOption
    );

    onUpdate({
      ...question,
      options: newOptions,
      correctAnswer: newCorrectAnswers,
    });
  };

  const updateOption = (optionIndex: number, value: string) => {
    const options = [...(question.options || [])];
    const oldValue = options[optionIndex];
    options[optionIndex] = value;

    const correctAnswers = (question.correctAnswer as string[]) || [];
    const updatedCorrectAnswers = correctAnswers.map(ans =>
      ans === oldValue ? value : ans
    );

    onUpdate({
      ...question,
      options,
      correctAnswer: updatedCorrectAnswers,
    });
  };

  const toggleCorrectAnswer = (option: string) => {
    const correctAnswers = (question.correctAnswer as string[]) || [];

    if (correctAnswers.includes(option)) {
      onUpdate({
        ...question,
        correctAnswer: correctAnswers.filter(ans => ans !== option),
      });
    } else {
      onUpdate({
        ...question,
        correctAnswer: [...correctAnswers, option],
      });
    }
  };

  return {
    updateField,
    addOption,
    removeOption,
    updateOption,
    toggleCorrectAnswer,
  };
}
