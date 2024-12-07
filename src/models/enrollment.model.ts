import {
  Model,
  Column,
  Table,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Lead } from './lead.model';
import { Course } from './course.model';

@Table({ tableName: 'enrollments', schema: 'public' })
class Enrollment extends Model {
  @ForeignKey(() => Lead)
  @Column(DataType.INTEGER)
  leadId!: number;

  @ForeignKey(() => Course)
  @Column(DataType.INTEGER)
  courseId!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  enrollmentDate!: Date;
}

export { Enrollment };
