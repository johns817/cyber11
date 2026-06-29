import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user.entity";

@Entity("teams")
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  tag: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  banner: string;

  @Column({ default: 0 })
  points: number;

  @Column({ nullable: true })
  region: string;

  @Column({ default: 20 })
  maxMembers: number;

  @Column({ default: false })
  isVerified: boolean;

  @ManyToOne(() => User)
  captain: User;

  @Column()
  captainId: string;

  @ManyToMany(() => User)
  @JoinTable({ name: "team_members" })
  members: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
