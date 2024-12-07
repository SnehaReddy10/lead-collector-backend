import { Request, Response } from 'express';
import { Lead } from '../../models/lead.model';
import { Course } from '../../models/course.model';
import { ErrorMessages } from '../../constants/error-messages';
import { HTTP_STATUS } from '../../constants/status-codes';

export async function GetLeadsInCourseController(req: Request, res: Response) {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({
      where: { id: courseId },
      include: [Lead],
    });

    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    const leads = course.leads;

    res.status(200).json(leads);
    return;
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error retrieving leads in course',
      error: ErrorMessages.INTERNAL_SERVER_ERROR,
    });
  }
}
