import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("passRecoveryTokens")
export default class PassRecoveryToken {
  // Constructor is not needed since typeorm will do this behind the scenes
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
