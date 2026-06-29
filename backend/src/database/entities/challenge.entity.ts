import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum ChallengeDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  INSANE = "insane",
}

export enum ChallengeCategory {
  WEB = "web",
  CRYPTO = "crypto",
  FORENSICS = "forensics",
  REVERSE = "reverse",
  PWN = "pwn",
  MISC = "misc",
  OSINT = "osint",
  STEGANOGRAPHY = "steganography",
}

@Entity("challenges")
export class Challenge {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column({ type: "enum", enum: ChallengeCategory })
  category: ChallengeCategory;

  @Column({ type: "enum", enum: ChallengeDifficulty })
  difficulty: ChallengeDifficulty;

  @Column({ default: 0 })
  points: number;

  @Column()
  flagHash: string;

  @Column({ default: false })
  dynamicFlag: boolean;

  @Column("simple-array", { nullable: true })
  hints: string[];

  @Column("simple-array", { nullable: true })
  tags: string[];

  @Column({ default: 0 })
  solves: number;

  @Column({ default: 0 })
  attempts: number;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  attachmentUrl: string;

  @Column({ default: false })
  isPremium: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
