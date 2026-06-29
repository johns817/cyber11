import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ['ctf', 'koth', 'team_battle', 'seasonal', 'soc_challenge'] })
  eventType: string;

  @Column({ type: 'enum', enum: ['upcoming', 'registration', 'active', 'completed'], default: 'upcoming' })
  status: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ nullable: true })
  maxParticipants: number;

  @Column({ type: 'timestamp', nullable: true })
  registrationDeadline: Date;

  @Column({ type: 'text', nullable: true })
  prizeDescription: string;

  @Column({ type: 'text', nullable: true })
  rules: string;

  @CreateDateColumn()
  createdAt: Date;
}
