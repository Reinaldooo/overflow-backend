import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
//
import User from "./User";

// This is a decorator, it works like a function and the class is as argument
// Something like: Entity(class)
@Entity("events")
export default class Event {
  // Constructor is not needed since typeorm will do this behind the scenes
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  // user field will return User obj. Check docs for more
  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column("timestamp with time zone")
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
