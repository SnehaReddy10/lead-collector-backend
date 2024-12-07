import { Request, Response } from 'express';
import { Course } from '../../models/course.model';
import { ErrorMessages } from '../../constants/error-messages';
import { HTTP_STATUS } from '../../constants/status-codes';

export async function CreateCourseController(req: Request, res: Response) {
  try {
    const { name, description, price, imageUrl, curriculum } = req.body;

    if (!name || !price) {
      res.status(400).json({ message: 'Course name and price are required' });
      return;
    }

    const newCourse = await Course.create({
      name,
      description,
      price,
      imageUrl,
      curriculum,
    });

    res.status(201).json(newCourse);
    return;
  } catch (error: any) {
    console.log('Error', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error creating course',
      error: ErrorMessages.INTERNAL_SERVER_ERROR,
    });
  }
}
