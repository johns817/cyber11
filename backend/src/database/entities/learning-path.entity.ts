import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum PathLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

@Entity("learning_paths")
export class LearningPath {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ type: "enum", enum: PathLevel })
  level: PathLevel;

  @Column({ default: 0 })
  totalModules: number;

  @Column({ default: 0 })
  estimatedHours: number;

  @Column({ default: 0 })
  enrolledCount: number;

  @Column({ default: false })
  isPremium: boolean;

  @Column("simple-array", { nullable: true })
  tags: string[];

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity("learning_modules")
export class LearningModule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  pathId: string;

  @Column()
  title: string;

  @Column("text", { nullable: true })
  content: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: 0 })
  xpReward: number;

  @Column({ default: 0 })
  estimatedMinutes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity("user_path_progress")
export class UserPathProgress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  pathId: string;

  @Column({ default: 0 })
  completedModules: number;

  @Column({ default: 0 })
  progressPercent: number;

  @Column({ nullable: true })
  lastModuleId: string;

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
