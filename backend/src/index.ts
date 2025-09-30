import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./prisma";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "test message" });
});

app.get("/db", async (req: Request, res: Response) => {
	try {
		await prisma.$connect();
		res.json({ status: "ok", database: "connected" });
	} catch (error) {
		res.status(500).json({ status: "error", database: "disconnected" });
	}
});

app.listen(port, () => {
	console.log(`test message`);
});
