import { Request, Response } from 'express';
import { Review } from '../../models/review.model';
import { Course } from '../../models/course.model';

export const AddCourseReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const { courseId, userId, rating, comment } = req.body;

    if (!courseId || !userId || !rating) {
      res
        .status(400)
        .json({ message: 'Course ID, student name, and rating are required.' });
      return;
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found.' });
      return;
    }

    const review = await Review.create({
      courseId,
      userId,
      rating,
      comment,
    });
    res.status(201).json({ message: 'Review added successfully!', review });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Failed to add review', error });
  }
};
