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
import Class from "../../../../classes/infra/typeorm/entities/Class";

// This is a decorator, it works like a function and the class is as argument
// Something like: Entity(class)
@Entity("techs")
export default class Tech {
  // Constructor is not needed since typeorm will do this behind the scenes
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Class, _class => _class.techs)
  @JoinTable({ name: "classes_and_techs" })
  classes: Class[];

  @Column("varchar")
  name: string;

  @Column({ type: "varchar", nullable: true })
  image: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
