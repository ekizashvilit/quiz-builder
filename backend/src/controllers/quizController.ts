import { Request, Response } from 'express';

import prisma from '../prisma';
import asyncHandler from '../utils/asyncHandler';

const createQuiz = asyncHandler(async (req: Request, res: Response) => {
  const { title, questions } = req.body;

  if (!title || !questions || !Array.isArray(questions)) {
    return res.status(400).json({
      msg: 'Title and questions array are required',
    });
  }

  const quiz = await prisma.quiz.create({
    data: {
      title,
      questions: {
        create: questions.map((q: any) => ({
          type: q.type,
          questionText: q.questionText,
          options: q.options ? JSON.stringify(q.options) : null,
          correctAnswer: q.correctAnswer
            ? JSON.stringify(q.correctAnswer)
            : null,
        })),
      },
    },
    include: {
      questions: true,
    },
  });

  const formattedQuiz = {
    ...quiz,
    questions: quiz.questions.map(q => ({
      ...q,
      options: q.options ? JSON.parse(q.options) : null,
      correctAnswer: q.correctAnswer ? JSON.parse(q.correctAnswer) : null,
    })),
  };

  res.status(201).json(formattedQuiz);
});

const getAllQuizzes = asyncHandler(async (req: Request, res: Response) => {
  const quizzes = await prisma.quiz.findMany({
    include: {
      _count: {
        select: { questions: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedQuizzes = quizzes.map(quiz => ({
    id: quiz.id,
    title: quiz.title,
    createdAt: quiz.createdAt,
    questionCount: quiz._count.questions,
  }));

  res.status(200).json(formattedQuizzes);
});

const getSingleQuiz = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: true,
    },
  });

  if (!quiz) {
    return res.status(404).json({ msg: 'Quiz not found' });
  }

  const formattedQuiz = {
    ...quiz,
    questions: quiz.questions.map(q => ({
      ...q,
      options: q.options ? JSON.parse(q.options) : null,
      correctAnswer: q.correctAnswer ? JSON.parse(q.correctAnswer) : null,
    })),
  };

  res.status(200).json(formattedQuiz);
});

const deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const quiz = await prisma.quiz.findUnique({
    where: { id },
  });

  if (!quiz) {
    return res.status(404).json({ msg: 'Quiz not found' });
  }

  await prisma.quiz.delete({
    where: { id },
  });

  res.status(200).json({ msg: 'Quiz deleted successfully' });
});

export { createQuiz, getAllQuizzes, getSingleQuiz, deleteQuiz };
