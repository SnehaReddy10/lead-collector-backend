import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Lead } from './lead.model';
import { Course, InteractionType } from '../constants/enums';
import { Course as CourseModel } from '../models/course.model';

@Table({ tableName: 'interactions', schema: 'public' })
class Interaction extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Lead)
  @Column(DataType.INTEGER)
  leadId!: number;

  @ForeignKey(() => CourseModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  courseId!: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(InteractionType),
  })
  interactionType!: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(Course),
    allowNull: true,
  })
  coursePurchased!: string;

  @Column({
    type: DataType.INTEGER,
  })
  score!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date!: Date;

  @BelongsTo(() => Lead)
  lead!: Lead;

  @BelongsTo(() => CourseModel)
  course!: CourseModel;
}

export { Interaction };
