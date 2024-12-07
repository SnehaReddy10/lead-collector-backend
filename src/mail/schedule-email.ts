import { sendCourseEmail } from './send-course-email.service';
import cron from 'node-cron';

let userVisitTimestamp = null;

export const trackUserVisit = ({ lead, course }: any) => {
  const timestamp = new Date();
  userVisitTimestamp = timestamp;

  console.log(
    `User ${lead.firstName} visited course ${course.name} at ${timestamp}`
  );

  scheduleEmail({ lead, course, timestamp });
};

const scheduleEmail = ({ lead, course, timestamp }: any) => {
  const delay = 60 * 1000; // in prod scheule it to 4 hours or 2 hours = 2 * 60 * 60 * 1000

  const emailScheduleTime = new Date(timestamp.getTime() + delay);

  console.log(
    `Email for user ${lead.firstName} will be sent at ${emailScheduleTime}`
  );

  cron.schedule(
    `0 ${emailScheduleTime.getMinutes()} ${emailScheduleTime.getHours()} ${emailScheduleTime.getDate()} ${
      emailScheduleTime.getMonth() + 1
    } *`,
    () => {
      sendCourseEmail({
        recipientEmail: lead?.email,
        courseName: course?.name,
        courseDescription: course?.description || '',
        coursePrice: course?.price,
      });
    }
  );
};
