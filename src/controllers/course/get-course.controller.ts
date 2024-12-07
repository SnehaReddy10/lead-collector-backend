import { where } from 'sequelize';
import { ErrorMessages } from '../../constants/error-messages';
import { HTTP_STATUS } from '../../constants/status-codes';
import { Course } from '../../models/course.model';
import { Request, Response } from 'express';
import { Review } from '../../models/review.model';

export async function GetCourseController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ where: { id }, include: [Review] });
    res.status(200).json(course);
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error retrieving courses',
      error: ErrorMessages.INTERNAL_SERVER_ERROR,
    });
  }
}
