import { Request, Response } from 'express';
import { Course } from '../../models/course.model';
import { Interaction } from '../../models/interaction.model';
import { Sequelize } from 'sequelize';

export async function GetDisplayCourseController(req: Request, res: Response) {
  const { leadId, isNewUser } = req.body;
  let courses;

  try {
    if (isNewUser && !leadId) {
      courses = await Course.findAll({
        order: [['createdAt', 'DESC']],
        limit: 3,
      });
    } else {
      const courseIds = await getMostInterestedCoursesForUser(leadId);

      courses = await Course.findAll({
        where: {
          id: courseIds,
        },
      });

      if (courses.length == 0) {
        courses = await Course.findAll({
          order: [['createdAt', 'DESC']],
          limit: 3,
        });
      }
    }

    res.json(courses);
  } catch (error: any) {
    console.error('Error fetching display courses:', error);
    res.status(500).json({
      message: 'Error fetching display courses',
      error: error.message,
    });
  }
}

async function getMostInterestedCoursesForUser(leadId: string) {
  try {
    const results = await Interaction.findAll({
      attributes: [
        'courseId',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'interaction_count'],
      ],
      where: { leadId },
      group: ['courseId'],
      order: [[Sequelize.literal('interaction_count'), 'DESC']],
      limit: 3,
    });

    if (!results || results.length === 0) {
      return [];
    }

    return results.map((interaction) => interaction.getDataValue('courseId'));
  } catch (error) {
    console.error('Error fetching most interacted courses:', error);
    return [];
  }
}

export { getMostInterestedCoursesForUser };
