import { Request, Response } from 'express';
import { Lead } from '../../models/lead.model';
import { HTTP_STATUS } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export async function GetLeadController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);

    if (!lead) {
      res.status(404).json({ message: 'Lead not found' });
      return;
    }

    res.status(200).json(lead);
  } catch (error: any) {
    console.log('Error fetching leads', error.message);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching leads',
      error: ErrorMessages.INTERNAL_SERVER_ERROR,
    });
  }
}
