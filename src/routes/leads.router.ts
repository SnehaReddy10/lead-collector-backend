import { Router } from 'express';
import { CreateLeadController } from '../controllers/lead/create-lead.controller';
import { GetLeadController } from '../controllers/lead/get-lead.controller';
import { GetAllLeadsController } from '../controllers/lead/get-all-leads.controller';
import { GetLeadSourceCountsController } from '../controllers/lead/get-leads-source.controller';

export const leadRouter = Router();

leadRouter.get('/source', GetLeadSourceCountsController);
leadRouter.get('/:id', GetLeadController);
leadRouter.get('/', GetAllLeadsController);
leadRouter.post('/', CreateLeadController);
