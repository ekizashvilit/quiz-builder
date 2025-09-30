import axios from "axios";
import { Quiz, QuizListItem, CreateQuizData } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const quizApi = {
	getAllQuizzes: async (): Promise<QuizListItem[]> => {
		const response = await api.get("/quizzes");
		return response.data;
	},

	getQuizById: async (id: string): Promise<Quiz> => {
		const response = await api.get(`/quizzes/${id}`);
		return response.data;
	},

	createQuiz: async (data: CreateQuizData): Promise<Quiz> => {
		const response = await api.post("/quizzes", data);
		return response.data;
	},

	deleteQuiz: async (id: string): Promise<void> => {
		await api.delete(`/quizzes/${id}`);
	},
};

export default api;
