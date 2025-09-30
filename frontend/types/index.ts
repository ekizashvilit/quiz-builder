export type QuestionType = "boolean" | "input" | "checkbox";

export interface Question {
	id?: string;
	type: QuestionType;
	questionText: string;
	options?: string[];
	correctAnswer?: boolean | string | string[];
}

export interface Quiz {
	id: string;
	title: string;
	createdAt: string;
	questions: Question[];
}

export interface QuizListItem {
	id: string;
	title: string;
	createdAt: string;
	questionCount: number;
}

export interface CreateQuizData {
	title: string;
	questions: Question[];
}
