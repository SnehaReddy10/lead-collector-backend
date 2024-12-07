import { Router } from 'express';
import { CreateInteractionController } from '../controllers/interactions/create-interaction.controller';

export const interactionRouter = Router();

interactionRouter.post('/', CreateInteractionController);
