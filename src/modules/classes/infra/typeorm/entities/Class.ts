import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
//
import User from "../../../../users/infra/typeorm/entities/User";
import Tech from "../../../../techs/infra/typeorm/entities/Tech";

// This is a decorator, it works like a function and the class is as argument
// Something like: Entity(class)
@Entity("classes")
export default class Class {
  // Constructor is not needed since typeorm will do this behind the scenes
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  description: string;

  @Column()
  tutorId: string;
  // tutor field will return User obj. Check docs for more
  @ManyToOne(() => User, user => user.teaching)
  @JoinColumn({ name: "tutorId" })
  tutor: User;

  @ManyToMany(() => User, user => user.studying)
  students: User[];

  @ManyToMany(() => Tech, tech => tech.classes)
  techs: Tech[];

  @Column("timestamp with time zone")
  date: Date;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
