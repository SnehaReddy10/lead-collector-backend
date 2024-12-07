import { Request, Response } from 'express';
import { Lead } from '../../models/lead.model';
import { Course } from '../../models/course.model';
import { HTTP_STATUS } from '../../constants/status-codes';
import { ErrorMessages } from '../../constants/error-messages';

export async function EnrollLeadInCourseController(
  req: Request,
  res: Response
) {
  try {
    const { leadId, courseId } = req.params;

    const lead = await Lead.findOne({ where: { id: leadId } });
    const course = await Course.findOne({ where: { id: courseId } });

    if (!lead || !course) {
      res.status(404).json({ message: 'Lead or Course not found' });
      return;
    }

    await lead.$add('courses', course.id);

    res.status(200).json({
      message: `${lead.firstName} successfully enrolled in course ${course.name}`,
    });
    return;
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error enrolling lead in course',
      error: ErrorMessages.INTERNAL_SERVER_ERROR,
    });
    return;
  }
}
