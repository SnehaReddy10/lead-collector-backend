import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { leadRouter } from './routes/leads.router';
import { authRouter } from './routes/auth.router';
import { HTTP_STATUS } from './constants/status-codes';
import { ErrorMessages } from './constants/error-messages';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from './config/database';
import { interactionRouter } from './routes/interactions.model';
import { courseRouter } from './routes/course.router';
import { seedData } from './seed/seed-data';

sequelize
  .authenticate()
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Failed connecting to DB', err));

sequelize
  .sync({ alter: true, force: true })
  .then(() => {
    console.log('Database synced successfully');
    seedData();
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;

app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/leads', leadRouter);
app.use('/interactions', interactionRouter);
app.use('/courses', courseRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error', err);
  res
    .status(HTTP_STATUS.SERVICE_UNAVAILABLE)
    .json({ message: ErrorMessages.SERVICE_UNAVAILABLE });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
