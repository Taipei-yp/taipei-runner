import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";

@Table({
  timestamps: false,
  paranoid: true,
  tableName: "site_theme",
})
class SiteThemeTable extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  deleted!: boolean;
}

export default SiteThemeTable;
