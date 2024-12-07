import { Router } from 'express';
import { CreateCourseController } from '../controllers/course/create-course.controller';
import { GetCoursesController } from '../controllers/course/get-courses.controller';
import { EnrollLeadInCourseController } from '../controllers/course/enroll-course.controller';
import { GetLeadsInCourseController } from '../controllers/course/get-leads-in-course.controller';
import { SendCourseEmailController } from '../controllers/course/send-course.controller';
import { GetCourseController } from '../controllers/course/get-course.controller';
import { AddCourseReviewController } from '../controllers/course/add-course-review.controller';
import { GetCoursesWithInterestedUsersController } from '../controllers/interactions/get-courses-with-interested-users.controller';
import { GetDisplayCourseController } from '../controllers/course/display-course.controller';

export const courseRouter = Router();

courseRouter.post('/', CreateCourseController);
courseRouter.post('/:courseId/add-review', AddCourseReviewController);
courseRouter.get('/:courseId/leads', GetLeadsInCourseController);
courseRouter.post('/course-display', GetDisplayCourseController);
courseRouter.get('/interested-users', GetCoursesWithInterestedUsersController);
courseRouter.get('/', GetCoursesController);
courseRouter.get('/:id', GetCourseController);
courseRouter.post('/:courseId/enroll/:leadId', EnrollLeadInCourseController);
courseRouter.post('/:courseId/send-email/:leadId', SendCourseEmailController);
