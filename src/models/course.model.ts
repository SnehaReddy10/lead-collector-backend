import {
  Model,
  Column,
  Table,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Lead } from './lead.model';
import { Enrollment } from './enrollment.model';
import { Review } from './review.model';

@Table({ tableName: 'courses', schema: 'public' })
class Course extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  imageUrl!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  })
  price!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt!: Date | null;

  @BelongsToMany(() => Lead, () => Enrollment)
  leads!: Lead[];

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  curriculum!: object;

  @HasMany(() => Review)
  reviews!: Review[];
}

export { Course };
