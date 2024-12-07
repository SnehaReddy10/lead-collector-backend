import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from './course.model';

@Table({ tableName: 'reviews' })
class Review extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId!: number;

  @BelongsTo(() => Course)
  course!: Course;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  rating!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment!: string;
}

export { Review };
