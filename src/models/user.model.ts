import { UserCategory } from './../constants/enums';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { Role } from '../constants/enums';

@Table({ tableName: 'users' })
class User extends Model {
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

  @Column({ type: DataType.STRING })
  password!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  firstName!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  lastName!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataType.ENUM,
    values: [Role.Admin.toString(), Role.User.toString()],
    defaultValue: Role.User,
  })
  role!: string;

  @Column({
    type: DataType.ENUM,
    values: [
      UserCategory.Student.toString(),
      UserCategory.Professional.toString(),
    ],
    allowNull: true,
  })
  userCategory!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;
}

export { User };
