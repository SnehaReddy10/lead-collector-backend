import { Request, Response } from 'express';
import { ErrorMessages } from '../../constants/error-messages';
import { HTTP_STATUS } from '../../constants/status-codes';
import { Lead } from '../../models/lead.model';
import { Course } from '../../models/course.model';
import { sendCourseEmail } from '../../mail/send-course-email.service';

export async function SendCourseEmailController(req: Request, res: Response) {
  try {
    const { courseId, leadId } = req.params;

    const course = await Course.findOne({
      where: { id: courseId },
      include: [Lead],
    });

    const lead = await Lead.findOne({
      where: { id: leadId },
    });

    if (!lead) {
      res.status(404).json({ message: 'Lead not found' });
      return;
    }

    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    sendCourseEmail({
      recipientEmail: lead?.email,
      courseName: course?.name,
      courseDescription: course?.description || '',
      coursePrice: course?.price,
    });

    res.json({ message: 'Email Sent' });
    return;
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error retrieving leads in course',
      error: ErrorMessages.INTERNAL_SERVER_ERROR,
    });
    return;
  }
}
