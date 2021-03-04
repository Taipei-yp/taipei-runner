import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import SiteThemeTable from "./site-theme";
import UserTable from "./user";

@Table({
  timestamps: false,
  paranoid: true,
  tableName: "user_theme",
})
class UserThemeTable extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => UserTable)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: "user_id",
  })
  user_id!: number;

  @ForeignKey(() => SiteThemeTable)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  theme_id!: number;

  @Column(DataType.STRING)
  device!: string;

  @BelongsTo(() => SiteThemeTable, "theme_id")
  theme!: SiteThemeTable;
}

export default UserThemeTable;
