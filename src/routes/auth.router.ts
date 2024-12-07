import { Router } from 'express';
import { RegisterUserController } from '../controllers/auth/register.controller';
import { LoginUserController } from '../controllers/auth/login.controller';

export const authRouter = Router();

authRouter.post('/register', RegisterUserController);
authRouter.post('/login', LoginUserController);
