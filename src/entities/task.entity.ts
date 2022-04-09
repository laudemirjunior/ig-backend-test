import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  done: boolean;

  @Column({ nullable: false })
  date: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
