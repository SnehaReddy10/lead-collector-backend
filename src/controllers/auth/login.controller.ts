import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ErrorMessages } from '../../constants/error-messages';
import { HTTP_STATUS } from '../../constants/status-codes';
import { User } from '../../models/user.model';
import { Lead } from '../../models/lead.model';

export const LoginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
      return;
    }

    const lead = await Lead.findOne({ where: { email: existingUser.email } });
    if (!lead) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Lead not found' });
      return;
    }

    if (!bcrypt.compareSync(password, existingUser.password)) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '1h',
      }
    );

    res.status(HTTP_STATUS.OK).json({
      token,
      lead: { id: lead.id },
    });
    return;
  } catch (error) {
    console.error('Error during user signin:', error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: ErrorMessages.INTERNAL_SERVER_ERROR });
    return;
  }
};
