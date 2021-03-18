import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "message",
})
class MessageTable extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Index
  @AllowNull(false)
  @Column(DataType.STRING)
  text!: string;

  @Default(0)
  @Column(DataType.INTEGER)
  likes!: number;

  @HasMany(() => MessageTable, "parent_id")
  reply!: MessageTable;

  // @HasMany(() => MessageTable, "children_id")
  // children!: MessageTable;
}

export default MessageTable;
