import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ErrorMessages } from '../../constants/error-messages';
import { HTTP_STATUS } from '../../constants/status-codes';
import {
  InteractionScore,
  LeadSource,
  Role,
  UserCategory,
} from '../../constants/enums';
import { Lead } from '../../models/lead.model';
import { User } from '../../models/user.model';

export const RegisterUserController = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      username,
      firstName,
      lastName,
      phone,
      role,
      source,
      userCategory,
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      firstName,
      lastName,
      phone,
      role: role || Role.User,
      userCategory: userCategory || UserCategory.Student,
      isActive: true,
    });

    const lead = await Lead.create({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      userCategory: user.userCategory,
      source: source ?? LeadSource.Organic,
      score: InteractionScore.SIGNUP,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '1h',
      }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        userCategory: user.userCategory,
        isActive: user.isActive,
      },
      lead: {
        id: lead.id,
        email: lead.email,
        score: 0,
        userCategory: lead.userCategory,
        phone: lead.phone,
        source: lead.source,
        isConverted: lead.isConverted,
        conversionDate: lead.conversionDate,
      },
    });
    return;
  } catch (error) {
    console.error('Error during user registration:', error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMessages.INTERNAL_SERVER_ERROR });
    return;
  }
};
