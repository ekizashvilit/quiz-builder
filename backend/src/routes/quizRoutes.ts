import { Router } from "express";

import {
	createQuiz,
	getAllQuizzes,
	getSingleQuiz,
	deleteQuiz,
} from "../controllers/quizController";

const router = Router();

router.route("/").post(createQuiz).get(getAllQuizzes);
router.route("/:id").get(getSingleQuiz).delete(deleteQuiz);

export default router;
