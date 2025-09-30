import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

import prisma from './prisma';
import quizRoutes from './routes/quizRoutes';
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';

dotenv.config();

const app: Express = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/quizzes', quizRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
