import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
//
import User from "../../../../users/infra/typeorm/entities/User";

// This is a decorator, it works like a function and the class is as argument
// Something like: Entity(class)
@Entity("calendars")
export default class Calendar {
  // Constructor is not needed since typeorm will do this behind the scenes
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @ManyToMany(() => User, user => user.calendars)
  users: User[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
