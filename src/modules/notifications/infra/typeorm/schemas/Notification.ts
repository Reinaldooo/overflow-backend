import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
  ObjectIdColumn,
} from "typeorm";
//
import Class from "../../../../classes/infra/typeorm/entities/Class";

// This is a decorator, it works like a function and the class is as argument
// Something like: Entity(class)
@Entity("notifications")
export default class Notification {
  // Constructor is not needed since typeorm will do this behind the scenes
  @ObjectIdColumn()
  id: ObjectID;

  @Column("varchar")
  content: string;

  @Column({ default: false })
  read: boolean;

  @Column()
  recipient_id: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
