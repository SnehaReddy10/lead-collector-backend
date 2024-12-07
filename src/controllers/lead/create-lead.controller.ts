import { Request, Response } from 'express';
import { Lead } from '../../models/lead.model';

export async function CreateLeadController(req: Request, res: Response) {
  try {
    const { email, firstName, lastName, phone, source, userCategory } =
      req.body;

    const newLead = await Lead.create({
      email,
      firstName,
      lastName,
      phone,
      source,
      userCategory,
    });

    res.status(201).json(newLead);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating lead', error: error.message });
  }
}
