import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  timestamps: false,
  paranoid: true,
  tableName: "user",
})
class UserTable extends Model {
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

  @Column(DataType.STRING)
  first_name!: string;

  @Column(DataType.STRING)
  second_name!: string;

  @Column(DataType.STRING)
  avatar!: string;
}

export default UserTable;
