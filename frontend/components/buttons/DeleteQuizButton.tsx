'use client';

import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { deleteQuizAction } from '@/services/actions';

interface DeleteQuizButtonProps {
  quizId: string;
  quizTitle: string;
  redirectAfterDelete?: boolean;
}

function DeleteQuizButton({
  quizId,
  quizTitle,
  redirectAfterDelete = false,
}: DeleteQuizButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${quizTitle}"?`)) {
      return;
    }

    try {
      const success = await deleteQuizAction(quizId);

      if (success) {
        toast.success('Quiz deleted successfully');

        if (redirectAfterDelete) {
          router.push('/quizzes');
        } else {
          router.refresh();
        }
      } else {
        toast.error('Failed to delete quiz');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      title="Delete quiz"
    >
      Delete Quiz
    </button>
  );
}

export default DeleteQuizButton;
