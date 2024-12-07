import { Request, Response } from 'express';
import { Interaction } from '../../models/interaction.model';
import { Lead } from '../../models/lead.model';
import { Course } from '../../models/course.model'; // assuming you have a Course model
import { InteractionType } from '../../constants/enums';
import { Op } from 'sequelize';

export async function GetCoursesWithInterestedUsersController(
  req: Request,
  res: Response
) {
  try {
    const courseInterestData = await Interaction.findAll({
      where: {
        interactionType: {
          [Op.in]: [
            InteractionType.COURSES,
            InteractionType.PURCHASE_COURSE,
            InteractionType.ENROLL_COURSE,
            InteractionType.INTEREST_COURSE,
          ],
        },
      },
      include: [
        {
          model: Lead,
          attributes: ['id', 'firstName', 'email'],
        },
        {
          model: Course,
          attributes: ['id', 'name'],
        },
      ],
    });

    const courseInterestMap: any = {};

    courseInterestData.forEach((interaction) => {
      const course = interaction.course;
      const lead = interaction.lead;

      if (!courseInterestMap[course.id]) {
        courseInterestMap[course.id] = {
          courseName: course.name,
          interestedUsers: [],
        };
      }
      courseInterestMap[course.id].interestedUsers.push({
        leadId: lead.id,
        leadName: lead.firstName,
        leadEmail: lead.email,
      });
    });

    const coursesWithInterestedUsers = Object.values(courseInterestMap);

    res.status(200).json(coursesWithInterestedUsers);
  } catch (error) {
    console.error('Error fetching course interest data:', error);
    res.status(500).json({
      message: 'Error fetching course interest data',
      error: 'Internal Server Error',
    });
  }
}
