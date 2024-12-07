import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserCategory } from '../constants/enums';
import { LeadSource } from '../constants/enums';
import 'reflect-metadata';
import { Interaction } from './interaction.model';
import { Course } from './course.model';
import { Enrollment } from './enrollment.model';

@Table({ tableName: 'leads', schema: 'public' })
class Lead extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  firstName!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  lastName!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone!: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(LeadSource),
    allowNull: true,
  })
  source!: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(UserCategory),
    allowNull: true,
  })
  userCategory!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isConverted!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  conversionDate!: Date | null;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  score!: number;

  @HasMany(() => Interaction)
  interactions!: Interaction[];

  @BelongsToMany(() => Course, () => Enrollment)
  courses!: Course[];
}

export { Lead };
