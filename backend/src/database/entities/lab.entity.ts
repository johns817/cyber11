import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum LabDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  INSANE = "insane",
}

export enum LabOS {
  LINUX = "linux",
  WINDOWS = "windows",
  CLOUD = "cloud",
}

export enum LabStatus {
  ACTIVE = "active",
  RETIRED = "retired",
  UNRELEASED = "unreleased",
}

@Entity("labs")
export class Lab {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column({ type: "enum", enum: LabDifficulty })
  difficulty: LabDifficulty;

  @Column({ type: "enum", enum: LabOS })
  os: LabOS;

  @Column({ type: "enum", enum: LabStatus, default: LabStatus.ACTIVE })
  status: LabStatus;

  @Column({ default: 0 })
  points: number;

  @Column("simple-array", { nullable: true })
  tags: string[];

  @Column({ nullable: true })
  dockerImage: string;

  @Column({ nullable: true })
  vpnConfig: string;

  @Column({ default: 0 })
  userFlag: number;

  @Column({ default: 0 })
  rootFlag: number;

  @Column({ nullable: true })
  userFlagHash: string;

  @Column({ nullable: true })
  rootFlagHash: string;

  @Column({ default: 0 })
  totalCompletions: number;

  @Column({ type: "float", default: 0 })
  rating: number;

  @Column({ default: 0 })
  ratingCount: number;

  @Column({ default: false })
  isPremium: boolean;

  @Column({ default: 120 })
  maxDurationMinutes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
