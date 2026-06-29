import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 200, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ['walkthrough', 'challenge', 'ctf', 'soc_simulator', 'pentest_simulator'], default: 'walkthrough' })
  roomType: string;

  @Column({ type: 'enum', enum: ['very_easy', 'easy', 'medium', 'hard', 'insane'], default: 'easy' })
  difficulty: string;

  @Column({ default: 60 })
  estimatedDuration: number;

  @ManyToOne(() => User, { nullable: true })
  author: User;

  @Column({ length: 500, nullable: true })
  thumbnail: string;

  @Column({ default: false })
  isPremium: boolean;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ default: 0 })
  totalUsers: number;

  @Column({ default: 0 })
  totalCompletions: number;

  @Column({ default: 50 })
  xpReward: number;

  @Column('text', { array: true, default: '{}' })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
