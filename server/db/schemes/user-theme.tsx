import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import SiteTheme from "./site-theme";
import User from "./user";

@Table({
  timestamps: false,
  paranoid: true,
  tableName: "user_theme",
})
class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: "id",
  })
  themeId!: number;

  @Column(DataType.STRING)
  device!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: "user_id",
  })
  user_id!: number;
}

export default UserTheme;
