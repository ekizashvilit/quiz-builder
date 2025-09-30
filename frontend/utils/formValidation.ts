import { Question } from '@/types';

export function validateQuizForm(
  title: string,
  questions: Question[]
): string | null {
  if (!title.trim()) {
    return 'Quiz title is required';
  }

  for (let i = 0; i < questions.length; i++) {
    const error = validateQuestion(questions[i], i + 1);
    if (error) return error;
  }

  return null;
}

function validateQuestion(question: Question, index: number): string | null {
  if (!question.questionText.trim()) {
    return `Question ${index}: Question text is required`;
  }

  if (question.type === 'checkbox') {
    return validateCheckboxQuestion(question, index);
  }

  if (question.type === 'input' && !question.correctAnswer) {
    return `Question ${index}: Correct answer is required`;
  }

  return null;
}

function validateCheckboxQuestion(
  question: Question,
  index: number
): string | null {
  if (!question.options || question.options.length < 2) {
    return `Question ${index}: Must have at least 2 options`;
  }

  if (question.options.some(opt => !opt.trim())) {
    return `Question ${index}: All options must be filled`;
  }

  if (
    !Array.isArray(question.correctAnswer) ||
    question.correctAnswer.length === 0
  ) {
    return `Question ${index}: Must select at least one correct answer`;
  }

  return null;
}
