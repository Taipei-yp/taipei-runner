import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "../models/user";

@Table({
  timestamps: false,
  paranoid: true,
  tableName: "user",
})
class UserTable extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  login!: string;
}

export default UserTable;
