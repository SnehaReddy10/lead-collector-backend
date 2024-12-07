import { Request, Response } from 'express';
import { Interaction } from '../../models/interaction.model';
import { Lead } from '../../models/lead.model';
import { InteractionType, InteractionScore } from '../../constants/enums';
import { ErrorMessages } from '../../constants/error-messages';
import { HTTP_STATUS } from '../../constants/status-codes';
import { trackUserVisit } from '../../mail/schedule-email';
import { Course } from '../../models/course.model';

function calculateInteractionScore(interactionType: InteractionType): number {
  switch (interactionType) {
    case InteractionType.SIGNUP:
      return InteractionScore.SIGNUP;
    case InteractionType.LOGIN:
      return InteractionScore.LOGIN;
    case InteractionType.COURSES:
      return InteractionScore.COURSES;
    case InteractionType.ABOUT:
      return InteractionScore.ABOUT;
    case InteractionType.PURCHASE_COURSE:
      return InteractionScore.PURCHASE_COURSE;
    case InteractionType.ENROLL_COURSE:
      return InteractionScore.ENROLL_COURSE;
    case InteractionType.SUBSCRIBE:
      return InteractionScore.SUBSCRIBE;
    case InteractionType.INTEREST_COURSE:
      return InteractionScore.INTEREST_COURSE;
    default:
      return 0;
  }
}

export async function CreateInteractionController(req: Request, res: Response) {
  try {
    const { interactionType, coursePurchased, leadId, courseId } = req.body;

    const lead = await Lead.findByPk(leadId);
    if (!lead) {
      res.status(404).json({ message: 'Lead not found' });
      return;
    }

    const score = calculateInteractionScore(interactionType);

    const newInteraction = await Interaction.create({
      leadId,
      interactionType,
      score,
      date: new Date(),
      coursePurchased,
      courseId,
    });

    lead.score = lead.score + score;
    await lead.save();

    if (interactionType == InteractionType.INTEREST_COURSE && courseId) {
      const course = await Course.findOne({ where: { id: courseId } });
      trackUserVisit({ lead: lead.dataValues, course: course?.dataValues });
    }

    res.status(201).json({
      message: 'Interaction created successfully',
      interaction: newInteraction,
      updatedLead: lead,
    });
  } catch (error: any) {
    console.log('Error creating interaction', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error creating interaction',
      error: ErrorMessages.INTERNAL_SERVER_ERROR,
    });
  }
}
