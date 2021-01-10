import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
//
import Class from "../../../../classes/infra/typeorm/entities/Class";

// This is a decorator, it works like a function and the class is as argument
// Something like: Entity(class)
@Entity("users")
export default class User {
  // Constructor is not needed since typeorm will do this behind the scenes
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "bool", default: false })
  admin: boolean;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  passwd: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Class, _class => _class.tutor)
  teaching: Class[];

  @ManyToMany(() => Class, _class => _class.students)
  @JoinTable({ name: "classes_and_students" })
  studying: Class[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
