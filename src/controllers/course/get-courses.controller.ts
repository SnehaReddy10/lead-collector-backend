import { ErrorMessages } from '../../constants/error-messages';
import { HTTP_STATUS } from '../../constants/status-codes';
import { Course } from '../../models/course.model';
import { Request, Response } from 'express';

export async function GetCoursesController(req: Request, res: Response) {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error retrieving courses',
      error: ErrorMessages.INTERNAL_SERVER_ERROR,
    });
  }
}
