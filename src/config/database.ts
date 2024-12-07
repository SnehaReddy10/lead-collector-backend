import { Sequelize } from 'sequelize-typescript';
import { Lead } from '../models/lead.model';
import { Interaction } from '../models/interaction.model';
import { Course } from '../models/course.model';
import { Enrollment } from '../models/enrollment.model';
import { User } from '../models/user.model';
import { Review } from '../models/review.model';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.POSTGRES_DBNAME,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  schema: 'public',
  models: [User, Lead, Interaction, Course, Enrollment, Review],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
