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
import { Exclude, Expose } from "class-transformer";
//
import uploadConfig from "@config/upload";
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
  @Exclude()
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

  // This, plus the Exclude decorator are used to remodel the entity using the
  // classToClass function
  @Expose({ name: "avatarUrl" })
  getAvatarUrl(): string {
    if (!this.avatar) {
      return null;
    }

    return uploadConfig.driver === "s3"
      ? `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${this.avatar}`
      : `${process.env.BACKEND_URL}/files/${this.avatar}`;
  }
}
