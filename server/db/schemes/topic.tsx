import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasOne,
  Index,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import MessageTable from "./message";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "topic",
})
class TopicTable extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Index
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @HasOne(() => MessageTable, "topic_id")
  message!: MessageTable;
}

export default TopicTable;
