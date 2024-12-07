import { Request, Response } from 'express';
import { Lead } from '../../models/lead.model';
import { HTTP_STATUS } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export async function GetAllLeadsController(req: Request, res: Response) {
  try {
    const leads = await Lead.findAll();
    res.status(200).json(leads);
  } catch (error: any) {
    console.log('Error fetching leads', error.message);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching leads',
      error: ErrorMessages.INTERNAL_SERVER_ERROR,
    });
  }
}
