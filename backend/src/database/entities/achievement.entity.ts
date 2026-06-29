import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

export enum AchievementRarity {
  COMMON = "common",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
}

@Entity("achievements")
export class Achievement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ type: "enum", enum: AchievementRarity })
  rarity: AchievementRarity;

  @Column({ default: 0 })
  xpReward: number;

  @Column({ nullable: true })
  condition: string;

  @CreateDateColumn()
  createdAt: Date;
}

@Entity("user_achievements")
export class UserAchievement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  achievementId: string;

  @CreateDateColumn()
  unlockedAt: Date;
}
