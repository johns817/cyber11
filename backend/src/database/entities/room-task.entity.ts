import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity('room_tasks')
export class RoomTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Room, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  taskOrder: number;

  @Column({ type: 'enum', enum: ['question', 'flag', 'multiple_choice', 'file_upload', 'code_challenge'], default: 'question' })
  taskType: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ default: 10 })
  xpReward: number;

  @CreateDateColumn()
  createdAt: Date;
}
