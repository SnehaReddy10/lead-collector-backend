import { Request, Response } from 'express';
import { Lead } from '../../models/lead.model';
import { Sequelize } from 'sequelize';
import { LeadSource } from '../../constants/enums';

export async function GetLeadSourceCountsController(
  req: Request,
  res: Response
) {
  try {
    const leadSourceCounts = await Lead.findAll({
      attributes: [
        'source',
        [Sequelize.fn('COUNT', Sequelize.col('source')), 'count'],
      ],
      group: ['source'],
    });

    const result = Object.values(LeadSource).map((source) => ({
      source,
      count:
        leadSourceCounts
          .find((data) => data.getDataValue('source') === source)
          ?.getDataValue('count') || 0,
    }));

    res.json(result);
  } catch (error: any) {
    console.error('Error fetching lead source counts:', error);
    res.status(500).json({
      message: 'Error fetching lead source counts',
      error: error.message,
    });
  }
}
